import { fetchNoteByTag } from '@/lib/api';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';

type NotesByTagProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByTag({ params }: NotesByTagProps) {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { category }],
    queryFn: () => fetchNoteByTag(category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
