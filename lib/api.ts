import axios from 'axios';
import type { Note } from '../types/note';
import type { FormValues } from '../components/NoteForm/NoteForm';
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  query?: string;
  page?: number;
  tag?: string;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const { query, page, tag } = params;

  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      ...(query && { search: query }),
      ...(page && { page }),
      ...(tag && { tag }),
      perPage: 12,
    },
  });
  return data;
}

export async function createNote(values: FormValues): Promise<Note> {
  const { data } = await axios.post<Note>('/notes', values);
  return data;
}
export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
}
