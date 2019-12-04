import { Theme } from '../utils/injectGlobals';

declare module 'styled-components' {
    interface IDefaultTheme extends Theme {}
}
