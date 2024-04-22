
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

export interface IActionTheme {
  type: string,
  payload: boolean
}

export interface IRootReducer {

  useTheme: {
    theme?: boolean;

    state: IState;
    action: IActionTheme;
  }
}

export interface IBoard {
  id: string;
  name: string;
}