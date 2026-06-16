import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type Props = {
  params?: { slug?: string[] };
  searchParams?: { query?: string; page?: string };
};

export default async function Page({ params, searchParams }: Props) {
  const queryClient = new QueryClient();

  const slug = params?.slug;
  const category = slug?.[0] === 'all' ? undefined : slug?.[0];

  const query = searchParams?.query ?? '';
  const page = Number(searchParams?.page) || 1;

  const fetchParams = {
    ...(query && { query }),
    ...(page && { page }),
    ...(category && { tag: category }),
  };

  await queryClient.prefetchQuery({
    queryKey: ['notes', fetchParams],
    queryFn: () => fetchNotes(fetchParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
