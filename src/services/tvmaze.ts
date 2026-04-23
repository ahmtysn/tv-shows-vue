import type { Show, ShowWithCast, SearchResult } from '@/types/show'

const BASE_URL = 'https://api.tvmaze.com'

export async function fetchShows(page = 0): Promise<Show[]> {
  const response = await fetch(`${BASE_URL}/shows?page=${page}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch shows: ${response.status}`)
  }

  return response.json()
}

export async function fetchShowById(id: number): Promise<ShowWithCast> {
  const response = await fetch(`${BASE_URL}/shows/${id}?embed=cast`)

  if (!response.ok) {
    throw new Error(`Failed to fetch show ${id}: ${response.status}`)
  }

  return response.json()
}

export async function searchShows(query: string): Promise<SearchResult[]> {
  const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new Error(`Failed to search shows: ${response.status}`)
  }

  return response.json()
}
