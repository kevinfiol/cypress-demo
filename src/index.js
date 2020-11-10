import './styles/index.css';

import { h, render } from 'preact';
import { useReducer, useRef } from 'preact/hooks';
import Counter from './components/Counter';

const State = () => ({ count: 0 });

const Actions = dispatch => ({
    increment: () => dispatch(state => {
        return { ...state, count: state.count + 1 };
    }),

    decrement: () => dispatch(state => {
        return { ...state, count: state.count - 1 };
    })
});

const useGlobalState = (createActions, initialState) => {
    const [state, dispatch] = useReducer((x, f) => f(x), initialState);
    const actionsRef = useRef();

    if (!actionsRef.current)
        actionsRef.current = createActions(dispatch);
    return [state, actionsRef.current];
};

const App = () => {
    const [state, actions] = useGlobalState(Actions, State());

    return (
        <div className="max-width-3 mx-auto p3">
            <h1>Preact Starter</h1>
            <p>This is a sample Preact application.</p>
            <Counter
                num={state.count}
                increment={actions.increment}
                decrement={actions.decrement}
            />
        </div>
    );
};

render(<App />, document.getElementById('app'));