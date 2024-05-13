
export interface DocumentData {
  data: {
    token: string;
  };
  status: number;
  statusText: string;
  headers: {
    [key: string]: string;
  };
  config: {
    transitional: {
      silentJSONParsing: boolean;
      forcedJSONParsing: boolean;
      clarifyTimeoutError: boolean;
    };
    adapter: string[];
    transformRequest: [];
    transformResponse: [];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: {
      [key: string]: string;
    };
    headers: {
      Accept: string;
      'Content-Type': string;
      [key: string]: string;
    };
    method: string;
    url: string;
    data: string;
  };
  request: string;
}

export interface IToken {
  token: string;
}

export interface IState {
  theme: boolean;
}

export interface IVisibleMenu {
  visible: boolean;
}

export interface IActionVisibleMenu {
  type: string;
  payload: boolean;
}

export interface IActionTheme {
  type: string;
  payload: boolean;
}

export interface IActionBoard {
  type: string,
  payload: { board: IBoard }
}

export interface IRootReducer {

  useCard: {
    card: "del" | "edit" | "void";

    state: ICardTask;
    action: IActionCardTask;
  }

  useBoard: {
    board: { board: IBoard };

    state: { board: IBoard };
    action: IActionBoard;
  }

  useTheme: {
    theme?: boolean;

    state: IState;
    action: IActionTheme;
  }

  useVisibleMenu: {
    visible?: boolean;

    state: IVisibleMenu;
    action: IActionVisibleMenu;
  }
}

export interface IBoard {
  id: string;
  name: string;
}

export interface IColumn {
  id: string,
  cor: string,
  name: string,
  tasks: ITask[]
}

export interface ISubTask {
  id: string;
  checkbox: boolean;
  title: string;
}

export interface ITask {
  id?: string;
  title: string,
  description: string,
  subtasks?: ISubTask[]

  pending?: number;
  feats?: number;
}

export interface ICardTask {
  card: "del" | "edit" | "void";
}

export interface IActionCardTask {
  type: string,
  payload: ICardTask
}
