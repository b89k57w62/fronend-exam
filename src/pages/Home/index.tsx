import { PlusOutlined } from "@ant-design/icons"
import {
  Button,
  Form,
  Input,
  List,
  message,
  Modal,
  Pagination,
  Select,
  Tag,
} from "antd"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Category, Post } from "types/types"
import { createPost, deletePost, fetchCategories, fetchPosts } from "utils/api"

const { Option } = Select

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    loadPosts(currentPage)
    loadCategories()
  }, [currentPage])

  const loadPosts = async (page: number) => {
    setLoading(true)
    try {
      const { data, total: totalCount } = await fetchPosts({
        _page: page,
        _limit: 10,
        _sort: "date",
        _order: "desc",
      })
      setPosts(data)
      setTotal(totalCount)
    } catch (error) {
      message.error("loading posts fail")
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const data = await fetchCategories()
      setCategories(data)
    } catch (error) {
      message.error("loading catecories fail")
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handlePosted = async () => {
    try {
      const values = await form.validateFields()
      await createPost({
        ...values,
        date: new Date().toISOString(),
        author: "TEST",
      })
      message.success("Posted")
      setIsModalVisible(false)
      form.resetFields()
      loadPosts(currentPage)
    } catch (error) {
      message.error("Post fail")
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id)
      message.success("Deleted Post")
      loadPosts(currentPage)
    } catch (error) {
      message.error("Delete Post fail")
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div style={{ padding: "20px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginBottom: 16 }}
      >
        Create Post
      </Button>
      <List
        loading={loading}
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <Button
                key={`delete-${item.id}`}
                type="link"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={<Link to={`/post/${item.id}`}>{item.title}</Link>}
              description={`Author: ${item.author} | Date: ${new Date(
                item.date
              ).toLocaleDateString()}`}
            />
            <div>
              {item.summary}
              <div style={{ marginTop: "10px" }}>
                {item.tags.split(" ").map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={10}
        total={total}
        onChange={handlePageChange}
        style={{ textAlign: "right", marginTop: 16 }}
      />

      <Modal
        title="Create new Post"
        visible={isModalVisible}
        onOk={handlePosted}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="title"
            rules={[{ required: true, message: "Please type title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="summary"
            label="summary"
            rules={[{ required: true, message: "Please type summary" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="content"
            rules={[{ required: true, message: "Please type content" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="tags"
            label="tags"
            rules={[{ required: true, message: "Please type tag" }]}
          >
            <Input placeholder="multiple tag use space to seperate" />
          </Form.Item>
          <Form.Item
            name="category"
            label="category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Please select category">
              {categories.map(category => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Home
