import * as Styled from './styled';

import spinnerImg from '../../assets/icons/spinner.svg';

export default function Spinner() {

    return (
        <>
            <Styled.Spinner src={spinnerImg} alt="carregando" />
        </>
    )
}