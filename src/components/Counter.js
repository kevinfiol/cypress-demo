import { h } from 'preact';
import Btn from './Btn';

const Counter = ({ num, increment }) => (
    <div>
        <h2 className="counter-number">{num}</h2>

        <div className="counter-controls">
            <Btn
                className="increment-btn"
                onClick={() => increment(1)}
            >
                Increment
            </Btn>

            <Btn
                className="decrement-btn"
                onClick={() => increment(-1)}
            >
                Decrement
            </Btn>
        </div>
    </div>
);

export default Counter;