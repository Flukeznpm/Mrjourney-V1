import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HookProvider } from './store/HookProvider'
import momentjs from 'moment'
import { createGlobalStyle } from "styled-components";
import 'moment/locale/th';
import { Theme } from "./static/Theme";
momentjs.locale('th')

const GlobalStyle = createGlobalStyle`
.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        border-radius: 4px;
        height: 40px;
        font-size: 16px;
        align-items: center;
        &:hover , &:active {
            border-color: rgb(230, 111, 15);
        }
    }
    .ant-picker {
        height: 40px;
        border-radius: 4px;
        &:hover , &:active {
            border-color: rgb(230, 111, 15);
        }
    }
    textarea.ant-input {
        font-size: 16px;
        border-radius: 4px;
        &:hover , &:active {
            border-color: rgb(230, 111, 15);
        }
    }
    .ant-steps-item-custom .ant-steps-item-icon > .ant-steps-icon {
        line-height: 0px;
        top: -2px;
    }
`

ReactDOM.render(
    <HookProvider>
        <GlobalStyle />
        <Theme>
            <App />
        </Theme>
    </HookProvider>
    , document.getElementById('root')
);

