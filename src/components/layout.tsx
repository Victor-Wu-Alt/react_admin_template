import React, {Suspense, useState} from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import {Button, Layout, Menu, MenuProps, Spin, theme} from 'antd';
import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'
import routes from "@/router";
import HeaderComp from "@/components/header.tsx";


const {Header, Sider, Content} = Layout;
type RouteType = {
    children: any;
    path: any;
    index: any;
    title: string;
    icon: React.ReactElement;
};

const LayoutRoute: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const getItems: any = (children: RouteType[]) => {
        return children.map((item) => {
            return {
                key: item.index
                    ? "/"
                    : item.path?.startsWith("/")
                        ? item.path
                        : `/${item.path}`,
                icon: item.icon,
                label: item.title,
                children: item.children ? getItems(item.children) : null,
            };
        });
    };

    // @ts-ignore
    const menuItems: MenuProps["items"] = getItems(
        routes[0].children && routes[0].children.filter((item) => item.path !== "*")
    );

    //菜单点击时候的跳转
    const onMenuClick: MenuProps["onClick"] = ({key}) => {
        navigate(key);
    };
   //如果没登录 跳到登录页
    const isAuth = localStorage.getItem('token')
    if (!isAuth) {
        return <Navigate to="/login" replace={true}/>;
    }

    //菜单高亮
    const renderOpenKeys = () => {
        const arr = pathname.split("/").slice(0, -1);
        return arr.map(
            (_: any, index: any) => "/" + arr.slice(1, index + 1).join("/")
        );
    };


    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    <img
                        src='https://v1.fastlink-aff02.com/theme/malio/assets/img/stisla-fill.svg' alt='logo'
                        width={30}/>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    defaultOpenKeys={renderOpenKeys()}
                    items={menuItems}
                    onClick={onMenuClick}
                />
            </Sider>
            <Layout>
                <Header style={{padding: '0 10px 0 0', background: colorBgContainer}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            float: 'left'
                        }}
                    />
                    <HeaderComp/>
                </Header>
                <Content
                    style={{
                        margin: '15px',
                        height: 'calc(100vh - 112px)',
                    }}
                >
                    <Suspense fallback={<Spin size="large" className="content_spin"/>}>
                        <Outlet/>
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutRoute;
