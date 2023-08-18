import request from "@/utils/request.ts";
import type {UserInfo} from "@/types/login.ts";

// 获取当前用户信息
export const getUserInfo = () => {
    return request<UserInfo>({
        method: 'GET',
        url: '/user'
    })
}
