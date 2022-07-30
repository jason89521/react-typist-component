import Main from './Main';
import Delay from './Delay';
import Backspace from './Backspace';
import Paste from './Paste';

const Typist = Object.assign(Main, { Delay, Backspace, Paste });

export default Typist;
