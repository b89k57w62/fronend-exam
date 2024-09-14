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
