import { Tag, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Post as PostType } from "types/types"
import { fetchPostById } from "utils/api"

const { Title, Paragraph } = Typography

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<PostType | null>(null)

  useEffect(() => {
    loadPost()
  }, [id])

  const loadPost = async () => {
    const data = await fetchPostById(Number(id))
    setPost(data)
  }

  if (!post) {
    return <div style={{ padding: "20px" }}>no post data</div>
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title>{post.title}</Title>
      <div style={{ marginBottom: "10px" }}>
        Author : {post.author} | date :{" "}
        {new Date(post.date).toLocaleDateString()}
      </div>
      <div style={{ marginBottom: "10px" }}>
        Category :{" "}
        {post.tags.split(" ").map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <Paragraph>
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index} style={{ textIndent: "2em", marginBottom: "1em" }}>
            {paragraph}
          </p>
        ))}
      </Paragraph>
    </div>
  )
}

export default Post
