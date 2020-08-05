import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HookProvider } from './store/HookProvider'
import momentjs from 'moment'
import 'moment/locale/th'
momentjs.locale('th')

ReactDOM.render(
    <HookProvider>
        <App></App>
    </HookProvider>
    , document.getElementById('root')
);

