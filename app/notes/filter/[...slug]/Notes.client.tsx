'use client';

import NoteList from '@/components/NoteList/NoteList';
import { fetchNoteByTag } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function NotesClient() {
  const { slug } = useParams<{ slug: string[] }>();

  const category = slug[0] === 'all' ? undefined : slug[0];

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { category }],
    queryFn: () => fetchNoteByTag(category),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return null;

  return (
    <div>{data.notes.length > 0 && <NoteList noteList={data.notes} />}</div>
  );
}
