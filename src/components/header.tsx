import React, {ChangeEvent} from "react";
import {Avatar, Button, Col, Dropdown, MenuProps, Row, Space, Input} from "antd";
import {SkinOutlined} from "@ant-design/icons";
import useGlobalStore from "@/store/global.ts";
import {useNavigate} from "react-router-dom";
import debounce from "@/utils/debounce.ts";
import  '@/styles/header.scss'

const HeaderComp: React.FC = () => {
    const {setColor, primaryColor} = useGlobalStore();
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/login')
    };

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: <span onClick={handleLogout}>退出登录</span>,
        },
        {
            key: "2",
            label: "个人中心",
        },
    ];

    //修改主题色
    const changeMainColor = (e: ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };

    return (
        <Row justify="end" align="middle">
            <Col>
                <Space size={20}>
                    <div className='skin'>
                        <Button type="primary" shape="circle" icon={<SkinOutlined/>}/>
                        <Input
                            type="color"
                            defaultValue={primaryColor}
                            className='skin_input'
                            onChange={debounce(changeMainColor, 500)}
                        ></Input>
                    </div>
                    <Dropdown menu={{items}} placement="bottomRight">
                        <Avatar
                            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                            style={{cursor: "pointer",marginTop:'-5px'}}
                        />
                    </Dropdown>
                </Space>
            </Col>
        </Row>
    );
};

export default HeaderComp;
