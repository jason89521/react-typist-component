import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function NotProse({ children }: Props) {
  return <div className='not-prose'>{children}</div>;
}
