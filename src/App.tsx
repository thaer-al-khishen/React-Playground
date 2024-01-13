import React from 'react';
import {configureStore, createSlice} from '@reduxjs/toolkit';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./store/Store";
import {ColorSwitcherComponent} from "./features/ColorSwitcher/ColorSwitcherComponent";
import {CounterComponent} from "./features/Counter/CounterComponent";

//npm install redux react-redux
//npm install @reduxjs/toolkit

function App() {
    // return <ReduxCounterComponent/>;
    return (
        <Provider store={store}>
            <div>
                <CounterComponent />
                <ColorSwitcherComponent />
            </div>
        </Provider>
    );
}

export default App;
