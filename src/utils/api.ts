import { Category, Post, Profile } from "types/types"

const API_BASE = "/api"

export const fetchPosts = async (
  params?: Record<string, string | number>
): Promise<{ data: Post[]; total: number }> => {
  const url = new URL(`${API_BASE}/posts`, window.location.origin)
  if (params) {
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, String(params[key]))
    )
  }
  const response = await fetch(url.toString())
  const total = Number(response.headers.get("Total-Count")) || 0
  const data = await response.json()
  return { data, total }
}

export const fetchPostById = async (id: number): Promise<Post> => {
  const response = await fetch(`${API_BASE}/posts/${id}`)
  return response.json()
}

export const createPost = async (post: Omit<Post, id>): Promise<Post> => {
  const response = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
  return response.json()
}

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`${API_BASE}/posts/${id}`, {
    method: "DELETE",
  })
}

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE}/categories`)
  return response.json()
}

export const fetchProfile = async (): Promise<Profile> => {
  const response = await fetch(`${API_BASE}/profile`)
  return response.json()
}
