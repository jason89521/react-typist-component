import type { ReactNode } from 'react';
import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}

const PORTAL_ID = 'react-date-time-picker-component__portal';

function ClientPortal({ children }: Props) {
  const [container, setContainer] = useState<HTMLElement>();

  useLayoutEffect(() => {
    const body = document.body;
    const existed = document.getElementById(PORTAL_ID);
    if (existed) {
      setContainer(existed);
    } else {
      const element = document.createElement('div');
      element.id = PORTAL_ID;
      body.append(element);
      setContainer(element);
    }
  }, []);

  return container ? createPortal(children, container) : null;
}

export default function Portal({ children }: Props) {
  if (typeof window === 'undefined') return null;

  return <ClientPortal>{children}</ClientPortal>;
}
