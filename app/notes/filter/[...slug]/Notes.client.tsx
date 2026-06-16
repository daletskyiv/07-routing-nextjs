'use client';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import LoadingMessage from '@/components/LoadingMessage/LoadingMessage';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from './NotesPage.module.css';

export default function NotesClient() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string[] }>();
  const searchParams = useSearchParams();

  const category = slug?.[0] === 'all' ? undefined : slug?.[0];
  const query = searchParams.get('query') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchParams = {
    ...(query && { query }),
    ...(page && { page }),
    ...(category && { tag: category }),
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', fetchParams],
    queryFn: () => fetchNotes(fetchParams),
    placeholderData: keepPreviousData,
  });

  const noteList = data?.notes || [];
  const totalPages = data?.totalPages ?? 0;

  function updateURL(params: Record<string, string | number>) {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (!value) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    router.push(`?${newParams.toString()}`);
  }

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateURL({ query: e.target.value, page: 1 });
    },
    500,
  );

  function handleChangePage(newPage: number) {
    updateURL({ page: newPage });
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className={css.app}>
      <Toaster position="top-center" />

      <header className={css.toolbar}>
        <SearchBox query={query} updateSearchQuery={updateSearchQuery} />

        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={handleChangePage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <LoadingMessage />}
      {isError && <ErrorMessage />}
      {noteList.length > 0 && <NoteList noteList={noteList} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
