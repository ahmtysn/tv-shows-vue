export interface Show {
  id: number
  name: string
  genres: string[]
  status: string
  premiered: string | null
  ended: string | null
  runtime: number | null
  language: string
  type: string
  rating: Rating
  image: Image | null
  summary: string | null
  network: Network | null
  schedule: Schedule
  officialSite: string | null
}

export interface Rating {
  average: number | null
}

export interface Image {
  medium: string
  original: string
}

export interface Network {
  id: number
  name: string
  country: Country | null
}

export interface Country {
  name: string
  code: string
}

export interface Schedule {
  time: string
  days: string[]
}

export interface CastMember {
  person: Person
  character: Character
}

export interface Person {
  id: number
  name: string
  image: Image | null
}

export interface Character {
  id: number
  name: string
}

export interface ShowWithCast extends Show {
  _embedded?: {
    cast: CastMember[]
  }
}

export interface SearchResult {
  score: number
  show: Show
}
