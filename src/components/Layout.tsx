import "../styles/Layout.css"

import { Breadcrumb, Layout as BasicLayout, Menu } from "antd"
import React from "react"
import { Link, Location, Outlet, useLocation } from "react-router-dom"

const { Header, Content, Footer } = BasicLayout

function resolveLocation(location: Location) {
  return location.pathname.split("/")
}

export default function Layout() {
  const location = useLocation()

  const paths = resolveLocation(location)

  return (
    <BasicLayout>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[paths[paths.length - 1]]}
        >
          <Menu.Item key="home">
            <Link to="/posts">Home</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>App</Breadcrumb.Item>
          {paths.map((it, key) => (
            <Breadcrumb.Item key={key}>
              {it.replace(/^\S/, s => s.toUpperCase())}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </BasicLayout>
  )
}
