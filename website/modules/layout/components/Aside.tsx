import type { Doc } from 'contentlayer/generated';
import Link from 'next/link';

interface Props {
  docs?: Doc[];
}

export default function Aside({ docs }: Props) {
  return (
    <aside
      style={{ height: 'calc(100vh - 5rem)' }}
      className='sticky top-20 flex-shrink-0 border-r border-r-black py-5 pr-5'>
      <ul>
        {docs?.map(doc => {
          return (
            <li key={doc._id} className='text-lg text-primary hover:underline'>
              <Link href={`/${doc.name}`}>{doc.title}</Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
