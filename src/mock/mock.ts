import Mock from 'mockjs'
import {getUuid} from "@/utils/common.ts";

// 获取用户信息
Mock.mock('/api/user', 'get', () => {
    return {
        code: 200,
        success: true,
        message: '请求成功。',
        data: {
            id: '1',
            username: 'admin',
            password:getUuid(),
            avatar: '',
            token:getUuid()
        }
    }
})
