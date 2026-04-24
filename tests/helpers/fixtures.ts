import type { Show } from '@/types/show'

export function makeShow(overrides: Partial<Show> = {}): Show {
  return {
    id: 1,
    name: 'Test Show',
    genres: [],
    status: 'Running',
    premiered: null,
    ended: null,
    runtime: null,
    language: 'English',
    type: 'Scripted',
    rating: { average: null },
    image: null,
    summary: null,
    network: null,
    schedule: { time: '', days: [] },
    officialSite: null,
    ...overrides,
  }
}
