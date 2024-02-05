import type { ReactNode } from 'react';
import React from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: Props) {
  return (
    <section className='py-8 px-4'>
      <h1 className='mb-4 text-2xl text-rose-400'>{title}</h1>
      {children}
    </section>
  );
}
