import NoteList from '@/components/NoteList/NoteList';
import { fetchNoteByTag } from '@/lib/api';
import { log } from 'console';

type NotesByTagProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByTag({ params }: NotesByTagProps) {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];
  const response = await fetchNoteByTag(category);

  return (
    <div>
      {response?.notes?.length > 0 && <NoteList noteList={response.notes} />}
    </div>
  );
}
