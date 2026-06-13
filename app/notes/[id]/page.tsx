import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetails from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const queryClient = new QueryClient();
  const id = (await params).id;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
