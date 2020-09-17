import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HookProvider } from './store/HookProvider'
import momentjs from 'moment'
import { createGlobalStyle } from "styled-components";
import 'moment/locale/en-gb';
import { Theme } from "./static/Theme";
momentjs.locale('en-gb')

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0;
    font-family: 'Kanit', sans-serif;
  }
.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        border-radius: 4px;
        height: 40px;
        font-size: 16px;
        align-items: center;
        &:hover , &:active {
            border-color: rgb(230, 111, 15);
        }
    }
.edit-profile {
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        border-radius: 4px;
        font-size: 14px;
        align-items: center;
        &:hover , &:active {
            border-color: rgb(230, 111, 15);
        }
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
    .ant-progress-success-bg, .ant-progress-bg {
        background-color: rgb(230, 111, 15);
    }
    div.ant-typography, .ant-typography p {
        margin: 0px;
    }
    .ant-btn-icon-only {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
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

