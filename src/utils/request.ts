import { extend } from "umi-request"

export default extend({
  credentials: "include", // 默认请求是否带上cookie
})
