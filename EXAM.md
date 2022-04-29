# 题目要求

## 代码要求

- 代码语言必须为 **Typescript** (即文件后缀名为 `.ts`/`.tsx`)
- 尽可能不使用 `Any` 类型。如 any 无法避免，请显示使用 `Any`
- 不能使用额外的第三方库，组件库使用的是 antd，文档请参考[antd](https://ant.design/), Http 请求使用的是 umi-request, 文档请参考[umi-request](https://github.com/umijs/umi-request)
- 代码需要使用 **Prettier** 进行格式化。题目已经集成 **Prettier** 的配置文件，无需对其修改，直接使用就行
- 代码需要通过 **Eslint** 的格式审核。题目已经集成 **Eslint** 的配置文件，无需对其修改。请在编辑器上安装相应的插件来自动集成 Eslint 审核。（Vscode 请安装 Eslint 插件）
- 所有 React 组件需要使用函数式组件来编写(`React.FC`)

## 题目内容

本题目是一个简单的博客系统，博客系统拥有简单的列表页以及详情页

使用 Antd 完成以下两个页面，项目基础设施已经搭好，只需要完成业务逻辑页面

### Home 页面 `pages/Home`

Home 页面为博客系统的列表页, 需要展示所有的博客文章，后端的返回的数据除 `content` 外请尽可能的使用到

然后请做好分页功能，一页只展示 10 篇文章

尽可能在使用 icon 的地方使用 icon

可能用到的组件

`List` , `Tag`

### Post 详情页面 `pages/Post`

Post 页面需要展示 Post 的详情页，需要展示后端返回所有的数据

## 题目前置说明

后端 endpoint 如下

`/api/profile` : 返回用户信息

```json
{
  "name": "User Name",
  "email": "User email"
}
```

`/api/categories` : 返回所有的分类

```json
string[]
```

/api/posts: 返回所有的文章

```json
[
  {
    "id": 0,
    "title": "标题",
    "summary": "概览",
    "date": "编写时间",
    "content": "文章主体内容",
    "author": "作者",
    "tags": "标签",
    "category": "分类"
  }
]
```

`tags` ：tags 包含了**多个**标签，多个标签使用空格隔开

`content`：content 是文章的主体，其中有多个段落，每个**段落**使用 `\n` 间隔

这个路由支持分页、排序、筛选

#### 分页
使用 `_page`, `_limit` 两个 query paramter 来实现分页功能
`_page`: 页码
`_limit`: 每页的数量

#### 排序
使用 `_sort`, `_order` 两个 query parameter 来实现排序
`_sort`: field, 如根据 date 排序 => `_sort=date`
`_order`: 排序方向, 正序 `asc`, 倒序 `desc`

#### 筛选
使用 field 来直接进行筛选
例如，我要筛选出 author 为 Arias 文章，则可使用 `author=Arias`

`/api/posts/:id` : 返回具体文章的内容

```json
{
  "id": 0,
  "title": "标题",
  "summary": "概览",
  "date": "编写时间",
  "content": "文章主体内容",
  "author": "作者",
  "tags": "标签",
  "category": "分类"
}
```
