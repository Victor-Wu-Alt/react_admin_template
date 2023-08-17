import {Navigate} from 'react-router-dom';
import LayoutRoute from "@/components/layout.tsx";
import {lazy} from "react";
import {FormOutlined, HomeOutlined, SettingOutlined, TableOutlined} from '@ant-design/icons'
import Login from '@/views/Login'

const Dashboard = lazy(() => import('@/views/Dashboard'))
const FormDisabledDemo = lazy(() => import('@/views/Form'))
const User = lazy(() => import('@/views/Setting/User'))
const TableDemo=lazy(()=>import('@/views/Table'))


const routes = [
    {
        path: '/',
        element: <LayoutRoute/>,
        children: [
            {path: 'dashboard', element: <Dashboard/>, title: 'Dashboard', icon: <HomeOutlined/>},
            {path: 'form', element: <FormDisabledDemo/>, title: 'Form', icon: <FormOutlined/>},
            {
                path: 'setting', title: 'Setting', icon: <SettingOutlined/>, children: [
                    {path: '/setting/user', element: <User/>, title: 'User'},
                ]
            },
            {path: 'table', element: <TableDemo/>, title: 'Table', icon: <TableOutlined />},
            {path: '*', element: <Navigate to="/"/>},
        ],
    },
    {path: 'login', element: <Login/>},
];

export default routes;
