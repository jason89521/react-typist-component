import { useState } from 'react';

import Single from './components/Examples/Single';

type ExampleType = 'single';

const exampleMap = {
  single: <Single />,
};

export default function App() {
  const [value, setValue] = useState<ExampleType>('single');

  return (
    <div className='flex flex-col items-center gap-10 pt-10 min-h-screen bg-slate-500'>
      <select
        value={value}
        onChange={e => setValue(e.currentTarget.value as ExampleType)}>
        <option value='single'>single</option>
      </select>
      {exampleMap[value]}
    </div>
  );
}
