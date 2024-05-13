import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

import * as Styled from './styled';

import base_url from '../../Config/BaseUrl';
import themeJson from '../../assets/theme'
import { IColumn, IRootReducer, ISubTask, ITask } from '../../Config/interface';

import Checkedbox from '../Checkedbox';
import Dropdown from '../Dropdown';
import BoxLoading from '../BoxLoading';
import CardOptionTask from '../CardOptionTask';

interface IProps {
  idtask: string;
  columns: IColumn[];
  currentColumn: IColumn;
}

export default function Task({ idtask, columns, currentColumn }: IProps) {

  const { theme } = useSelector((rootReducer: IRootReducer) => rootReducer.useTheme);

  const [subtasksStatus, setSubtasksStatus] = useState<{ pending: number, feats: number }>({ pending: 0, feats: 0 });
  const [taskCurrent, setTaskCurrent] = useState<ITask>({id: "", description: "", title: "", feats: 0, pending: 0, subtasks: []});

  const [loadingTask, setLoadingTask] = useState<boolean>(true);

  const [toggleCard, setToggleCard] = useState<boolean>(false);

  useEffect(() => {

    async function getData() {
      const auth = localStorage.getItem("authentication");

      if (auth) {
        const token = JSON.parse(auth);

        const data = await axios.get(`${base_url}/api/v1/tasks/${idtask}`, {
          headers: {
            'Authorization': `Bearer ${token.token}`
          }
        });

        setTaskCurrent(data.data ? data.data : {});
        updateStatusSubtasks(data?.data)
      }

      setLoadingTask(false)

    }

    getData();

  }, [])

  function updateStatusSubtasks(value: ITask | null) {

    if (value?.subtasks) {

      let pending: number = 0;
      let feats: number = 0;

      for (let i = 0; i < value.subtasks.length; i++) {
        if (value.subtasks[i].checkbox) {
          feats = feats + 1;
        } else {
          pending = pending + 1;
        }
      }

      setSubtasksStatus({ pending: pending, feats: feats })
    }

  }

  async function handleSelectColumn(value: IColumn) {
    const auth = localStorage.getItem("authentication");
    auth;

    const index = currentColumn.tasks.findIndex(tk => tk.id === taskCurrent.id);
    const list = columns.find(cl => cl.id === value.id) 

    list?.tasks.push(currentColumn.tasks[index]);

    const listOld = currentColumn;

    listOld.tasks.splice(1, index)

    if (auth) {
      const token = JSON.parse(auth).token;

      await axios.post(`${base_url}/api/v1/tasks`, {
        idColumn: value.id,
        idTask: idtask,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).catch((e) => {
        console.error("Error > ", e);
        toast.error("Erro ao mover tarefa, tente novamente mais tarde");
      })

      toast.success("Tarefa movida com sucesso", { autoClose: 800 });
    }

    return null;
  }

  function handleSelectSubtask(subtask: ISubTask) {
    updateStatusSubtasks(taskCurrent);

    const auth = localStorage.getItem("authentication");

    if (auth) {
      const token = JSON.parse(auth);

      axios.patch(`${base_url}/api/v1/tasks/subtasks/${subtask.id}`, { checkbox: subtask.checkbox }, {
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
      }).catch((e) => {

        console.error("Error subtask > ", e);
        toast.warn("erro ao atualizar a subtask");

      });

    }

    return null;
  }

  function handleToggleCard() {

    setToggleCard(!toggleCard);
    return null;
  }

  return (
    <Styled.Container bg={theme ? themeJson.white : themeJson.darkGray} cl={theme ? "black" : "white"} clspan={theme ? themeJson.mediumGray : themeJson.white} >

      <Styled.ContainerHeader>

        {loadingTask ? (
          <>
            <strong><BoxLoading width='150px' heigth='30px' /></strong>
          </>) : (
          <>
            <strong>{taskCurrent?.title}</strong>
          </>
        )}

        <Styled.ContainerCard>
          {toggleCard && (
            <>
              <CardOptionTask task={taskCurrent} onSelect={handleToggleCard} />
            </>
          )}

          {!loadingTask && (
            <Styled.ThreeDots onClick={() => setToggleCard(!toggleCard)} >
              <div />
              <div />
              <div />
            </Styled.ThreeDots>
          )}

        </Styled.ContainerCard>

      </Styled.ContainerHeader>

      {loadingTask ? (
        <Styled.Description>
          <BoxLoading width='100%' heigth='100px' />
        </Styled.Description>
      ) : (
        <Styled.Description>{taskCurrent?.description}</Styled.Description>
      )}

      <label htmlFor="checked">
        <span>SubTasks ({subtasksStatus.feats} de {subtasksStatus.pending})</span>
        <ul>
          {taskCurrent?.subtasks && taskCurrent.subtasks.map((resp: ISubTask) => (
            <li><Checkedbox subtask={resp} onSelect={handleSelectSubtask} /></li>
          ))}

          {loadingTask && (
            <>
              <li><BoxLoading width='100%' heigth='35px' /></li>
              <li><BoxLoading width='100%' heigth='35px' /></li>
            </>
          )}

        </ul>
      </label>

      <Dropdown current={currentColumn} list={columns} onSelect={handleSelectColumn} />

    </Styled.Container>
  )
}
