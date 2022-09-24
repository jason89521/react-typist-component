import { useState } from 'react';
import Typist from 'react-typist-component';

import NotProse from '~/modules/common/components/NotProse';

export function Loop() {
  return (
    <NotProse>
      <Typist loop={true} cursor='|'>
        The typing animation can be looped infinitely.
      </Typist>
    </NotProse>
  );
}

export function Pause() {
  const [pause, setPause] = useState(false);

  return (
    <NotProse>
      <div className='flex gap-2'>
        <input
          type='checkbox'
          checked={pause}
          onChange={e => setPause(e.target.checked)}
        />
        Pause
      </div>
      <Typist pause={pause} loop={true} cursor='_'>
        You can pause the typing animation whenever you want.
      </Typist>
    </NotProse>
  );
}

const TypistExamples = {
  Loop,
  Pause,
};

export default TypistExamples;
