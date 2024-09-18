import { Empty } from "antd"
import Layout from "components/Layout"
import Home from "pages/Home"
import Post from "pages/Post"
import Profile from "pages/Profile"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="posts" element={<Home />} />
            <Route path="posts/:id" element={<Post />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Empty />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
