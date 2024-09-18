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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortField, setSortField] = useState<string>("date")
  const [sortOrder, setSortOrder] = useState<string>("desc")
  const [filterAuthor, setFilterAuthor] = useState<string>("")

  useEffect(() => {
    loadPosts()
    loadCategories()
  }, [currentPage, sortField, sortOrder, filterAuthor])

  const loadPosts = async () => {
    const { data, total: totalCount } = await fetchPosts({
      _page: currentPage,
      _limit: 10,
      _sort: sortField,
      _order: sortOrder,
      ...(filterAuthor && { author: filterAuthor }),
    })
    setPosts(data)
    setTotal(totalCount)
  }

  const loadCategories = async () => {
    const data = await fetchCategories()
    setCategories(data)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handlePosted = async () => {
    const values = await form.validateFields()
    await createPost({
      ...values,
      date: new Date().toISOString(),
      author: "TEST",
    })
    message.success("Posted")
    setIsModalVisible(false)
    form.resetFields()
    loadPosts()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleDelete = async (id: number) => {
    await deletePost(id)
    message.success("Deleted Post")
    loadPosts()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSortChange = (field: string) => {
    if (field == sortField) {
      setSortOrder(sortOrder == "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const handleFilterChange = (value: string) => {
    setFilterAuthor(value)
    setCurrentPage(1)
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

      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Filter by author"
          onChange={e => handleFilterChange(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Button onClick={() => handleSortChange("date")}>Sort by date</Button>
      </div>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <Button
                key={`delete-${item.id}`}
                type="dashed"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={<Link to={`/posts/${item.id}`}>{item.title}</Link>}
              description={
                <>
                  <span
                    onKeyPress={() => handleSortChange("author")}
                    role="button"
                    tabIndex={0}
                  >
                    Author: {item.author}
                  </span>
                  <br />
                  <span>Date: {new Date(item.date).toLocaleDateString()}</span>
                </>
              }
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
