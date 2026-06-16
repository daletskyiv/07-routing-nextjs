'use client';

import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();
  const close = () => {
    router.back();
  };

  if (isLoading)
    return (
      <Modal onClose={close}>
        <div>Loading...</div>
      </Modal>
    );
  if (isError)
    return (
      <Modal onClose={close}>
        <div>Error!</div>
      </Modal>
    );
  if (!data) return null;

  return (
    <Modal onClose={close}>
      <button type="button" onClick={close} className={css.backBtn}>
        X
      </button>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}
