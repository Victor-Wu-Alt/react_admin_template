import React from 'react'
import './index.scss'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getUserInfo } from '@/api/user.ts'

interface LoginFormValues {
    username: string
    password: string
}

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const formLayout = 'vertical'
    const formItemLayout =
        formLayout === 'vertical' ? { labelCol: { span: 5 }, wrapperCol: { span: 19 } } : null

    const onFinish = async (values: LoginFormValues) => {
        try {
            const res: any = await getUserInfo()
            if (res) {
                console.log('Success:', values)
                localStorage.setItem('token', res.token)
                navigate('/dashboard')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <div className='login-wrap'>
            {/*顶部波浪 */}
            <div className='top'>
                <img alt='' src='/assets/images/top.png' />
            </div>
            <div className='main'>
                {/*左边*/}
                <div className='left'>
                    <img alt='' width={500} src='/assets/images/login.gif' />
                </div>
                {/*右边*/}
                <div className='right'>
                    <Form
                        {...formItemLayout}
                        layout={formLayout}
                        form={form}
                        initialValues={{ layout: formLayout }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <Form.Item>
                            <h1>Welcome To Selevt</h1>
                            <h2 style={{ fontWeight: 400 }}>Sign in your account</h2>
                        </Form.Item>
                        <Form.Item
                            label='Username'
                            name='username'
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input placeholder='please input your username' />
                        </Form.Item>
                        <Form.Item
                            label='Password'
                            name='password'
                            rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password placeholder='please input your password' />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' className='login-button' htmlType='submit'>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className='bottom'>
                <img alt='' src='/assets/images/bottom.png' />
            </div>
        </div>
    )
}

export default Login
