/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface IProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PUBLIC_URL: string;
        REACT_APP_HASH: string;
        REACT_APP_API_URI: string;
        REACT_APP_WS_URI: string;
        EXTEND_ESLINT: string;
    }
}
