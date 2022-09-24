import type { Doc } from 'contentlayer/generated';
import Link from 'next/link';

interface Props {
  docs?: Doc[];
}

export default function Aside({ docs }: Props) {
  const titles = docs?.map(doc => doc.title) || [];

  return (
    <aside
      style={{ height: 'calc(100vh - 5rem)' }}
      className='sticky top-20 flex-shrink-0 border-r border-r-black py-5 pr-5'>
      <ul>
        {titles.map(title => {
          return (
            <li key={title} className='text-lg text-primary hover:underline'>
              <Link href={`/${title}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
