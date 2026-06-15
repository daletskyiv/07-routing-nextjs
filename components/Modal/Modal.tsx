'use client';

import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface NoteModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: NoteModalProps) {
  const router = useRouter();
  const close = () => {
    router.back();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [router]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <button type="button" onClick={close}>
        X
      </button>
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}
