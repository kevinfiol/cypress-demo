/**
* Meiosis Pattern Implementation
* See: https://meiosis.js.org/
**/

import merge from 'mergerino';
import { useReducer, useRef } from 'preact/hooks';

const State = () => ({
    count: 0,
    inputValue: '',
});

const Actions = update => ({
    increment: num => update({
        count: x => x + num
    }),

    setInputValue: inputValue => update({
        inputValue
    })
});

const useGlobalState = (createActions, initialState) => {
    const [state, update] = useReducer(merge, initialState);
    const actionsRef = useRef();

    if (!actionsRef.current)
        actionsRef.current = createActions(update);
    return [state, actionsRef.current];
};

export { State, Actions, useGlobalState };