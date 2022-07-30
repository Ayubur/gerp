import React, { useState, useLayoutEffect, createElement } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    PieChartOutlined,
    DesktopOutlined,
    FileOutlined,
    BellOutlined
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
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                        // position: 'fixed',
                        // width: '100vw'
                    }}
                >
                    <div className="site-layout-header">
                        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            style: { marginLeft: 24 },
                            onClick: () => setCollapsed(!collapsed),
                        })}

                        <div>
                            <BellOutlined className="trigger" style={{ marginRight: 26 }} />
                            <>
                                <UserOutlined className="trigger" style={{ marginRight: 10 }}/>
                                <span><b>Gononet ERP</b></span>
                            </>

                        </div>
                    </div>
                </Header>
                <Content className="site-layout-background site-layout-content">
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default HomeLayout;