import { allDocs, Doc } from 'contentlayer/generated';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Head from 'next/head';
import { useRouter } from 'next/router';

import components from '~/modules/docs/components';

interface Props {
  docs: Doc[];
}

export default function Component({ docs }: Props) {
  const { query } = useRouter();
  const doc = docs.find(d => d.name === query.component);

  const MDXComponent = useMDXComponent(doc?.body.code || '');

  if (!doc) return null;

  return (
    <div className='p-10'>
      <Head>
        <title>{doc.title}</title>
        <meta name='description' content={doc.intro} />
      </Head>
      <article className='prose max-w-none'>
        <h1>{doc.title}</h1>
        <p>{doc.intro}</p>
        <MDXComponent components={components[doc.name]} />
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
    params: { component: doc.name },
  }));

  return {
    paths,
    fallback: false,
  };
};
