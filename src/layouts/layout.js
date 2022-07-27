import React, { useState, useLayoutEffect, createElement } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    PieChartOutlined,
    DesktopOutlined,
    FileOutlined
} from '@ant-design/icons';

import '../App.scss'
import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

const HomeLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    useLayoutEffect(() => {
        function updateSize() {
            if (window.innerWidth <= 768) {
                setCollapsed(true);
            }
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
        getItem('Option 1', '1', <PieChartOutlined />),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('Option 3', 'sub1', <UserOutlined />, [
            getItem('sub 3', '3'),
            getItem('sub 4', '4'),
            getItem('sub 5', '5'),
        ]),
        getItem('Option 4', '9', <FileOutlined />),
    ];


    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    overflow: 'auto',
                    minHeight: '100vh'
                }}
            >
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        position:'fixed',
                        width:'100vw'
                    }}
                >
                    {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content className="site-layout-background site-layout-content">
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default HomeLayout;