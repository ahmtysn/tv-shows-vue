import type { Show, ShowWithCast, SearchResult } from '@/types/show'

const BASE_URL = import.meta.env.VITE_TVMAZE_BASE_URL ?? 'https://api.tvmaze.com'

// to avoid repeating fetch and error-check in every endpoint.
async function request<T>(path: string, context: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Failed to ${context}: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// page parameter is removed (page 0 is the default).
// if pagination is needed later, we can add a `page` parameter
export function fetchShows(): Promise<Show[]> {
  return request('/shows', 'fetch shows')
}

export function fetchShowById(id: number): Promise<ShowWithCast> {
  return request(`/shows/${id}?embed=cast`, `fetch show ${id}`)
}

export function searchShows(query: string): Promise<SearchResult[]> {
  return request(`/search/shows?q=${encodeURIComponent(query)}`, 'search shows')
}
