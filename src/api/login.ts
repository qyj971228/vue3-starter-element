import { request } from "@/utils/request"

export function reqLoginApi(params: { username: string; password: string }) {
  return request<any>({
    url: "/user/login",
    method: "get",
    params
  })
}
