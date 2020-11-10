import { h } from 'preact';
import Btn from './Btn';

const Counter = props => (
    <div>
        <h2>{props.num}</h2>

        <div className="center">
            <Btn onClick={props.increment}>Increment</Btn>
            <Btn onClick={props.decrement}>Decrement</Btn>
        </div>
    </div>
);

export default Counter;