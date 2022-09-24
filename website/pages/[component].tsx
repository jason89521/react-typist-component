import { allDocs, Doc } from 'contentlayer/generated';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { useRouter } from 'next/router';

interface Props {
  docs: Doc[];
}

export default function Component({ docs }: Props) {
  const { query } = useRouter();
  const doc = docs.find(d => d.title === query.component);
  const MDXComponent = useMDXComponent(doc?.body.code || '');

  if (!doc) return null;

  return (
    <div className='p-10'>
      <article className='prose max-w-none'>
        <MDXComponent />
      </article>
    </div>
  );
}

export const getStaticProps: GetStaticProps<
  Props,
  { component: string }
> = () => {
  const docs = allDocs;

  return { props: { docs } };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allDocs.map(doc => ({
    params: { component: doc.title },
  }));

  return {
    paths,
    fallback: false,
  };
};
