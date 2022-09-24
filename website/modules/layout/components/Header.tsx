import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='sticky bg-white top-0 z-10 flex h-20 items-center justify-between border-b border-b-black px-10'>
      <div>
        <Link href='/'>
          <a className='text-2xl text-primary hover:underline'>
            React Components
          </a>
        </Link>
      </div>
      <div>
        <div className='transition hover:scale-110'>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://github.com/jason89521/react-components-monorepo'>
            <Image
              src='/github.svg'
              alt='GitHub repository of this library'
              height={24}
              width={24}
            />
          </a>
        </div>
      </div>
    </header>
  );
}
