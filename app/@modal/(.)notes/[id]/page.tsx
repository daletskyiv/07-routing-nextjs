import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

type NotePreviewProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: NotePreviewProps) {
  const { id } = await params;
  const data = await fetchNoteById(id);

  return (
    <Modal>
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
