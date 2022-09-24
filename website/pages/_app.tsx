import type { Doc } from 'contentlayer/generated';
import type { AppProps } from 'next/app';

import Aside from '~/modules/layout/components/Aside';
import Header from '~/modules/layout/components/Header';

import '../styles/globals.css';
import '../styles/syntax-highlight.css';
import '../styles/variables.css';

interface PageProps {
  docs: Doc[];
}

function MyApp({
  Component,
  pageProps: { docs, ...rest },
}: AppProps<PageProps>) {
  return (
    <div>
      <Header />
      <section className='flex px-10'>
        <Aside docs={docs} />
        <Component docs={docs} {...rest} />
      </section>
    </div>
  );
}

export default MyApp;
