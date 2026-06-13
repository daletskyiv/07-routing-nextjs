'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '../../lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface NoteListProps {
  noteList: Note[];
}

export default function NoteList({ noteList }: NoteListProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note delete successfully!');
    },
    onError: () => {
      toast.error('Oops, something went wrong. Note not deleted');
    },
  });

  function handleDelete(id: string) {
    mutate(id);
  }

  return (
    <ul className={css.list}>
      {noteList.map((note: Note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.link} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
