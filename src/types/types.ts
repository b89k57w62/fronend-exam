export interface Post {
  id: number
  title: string
  summary: string
  date: string
  content: string
  author: string
  tags: string
  category: string
}

export interface Profile {
  name: string
  email: string
}

export type Category = string
