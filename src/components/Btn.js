import { h } from 'preact';
import { btn } from './styles/Btn.css';

const Btn = props => (
    <button className={btn} {...props} />
);

export default Btn;