type Fn = () => void;
type OnRegister = (clearId: number) => void;

const registerInterval = (fn: Fn, delay: number, onRegister: OnRegister) => {
  const clearId = setInterval(fn, delay);
  onRegister(clearId);
};

export default registerInterval;
