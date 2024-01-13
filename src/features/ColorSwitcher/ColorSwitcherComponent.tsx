//ColorSwitcherComponent.tsx
import React from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {setColor} from './colorSwitcherSlice';
import {AppDispatch, store} from "../../store/Store";
import {selectColorSwitcher} from './colorSwitcherSelectors';

export const ColorSwitcherComponent = () => {
    const color = useSelector(selectColorSwitcher);
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch here

    return (
        <div>
            <div style={{backgroundColor: color, width: '100px', height: '100px'}}/>
            <button onClick={() => dispatch(setColor('red'))}>Red</button>
            <button onClick={() => dispatch(setColor('green'))}>Green</button>
            <button onClick={() => dispatch(setColor('blue'))}>Blue</button>
            <button onClick={() => dispatch(setColor('yellow'))}>Yellow</button>
        </div>
    );
};
