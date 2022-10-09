import { useState } from 'react';

import Multiple from './components/Examples/Multiple';
import Single from './components/Examples/Single';

type ExampleType = 'single' | 'multiple';

const exampleMap = {
  single: <Single />,
  multiple: <Multiple />,
};

export default function App() {
  const [value, setValue] = useState<ExampleType>('single');

  return (
    <div className='flex flex-col items-center gap-10 pt-10 min-h-screen bg-slate-500'>
      <select
        value={value}
        onChange={e => setValue(e.currentTarget.value as ExampleType)}>
        <option value='single'>single</option>
        <option value='multiple'>multiple</option>
      </select>
      {exampleMap[value]}
    </div>
  );
}
