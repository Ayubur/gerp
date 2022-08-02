import React, { useState } from "react";
import { Button, Table, Dropdown, Menu, Space, Row, Col, Divider, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import "./contactList.css";
import { AddRoundFillIcon, RightArrowIcon } from "../../assets/icon";

interface DataType {
    key: React.Key;
    business_name: string;
    job_title: string;
    first_name: string;
    last_name: string;
    address: String;
    city: string;
    mobile_number: string;
    email: string;
    contact_type: string;
    location_group: string;
    status: string;
}

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <a>
                        Details
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    <a >
                        Edit
                    </a>
                ),
            },
            {
                key: '3',
                label: (
                    <a>
                        Delete
                    </a>
                ),
            }
        ]}
    />
);

const columns: ColumnsType<DataType> = [
    {
        title: 'Business Name',
        dataIndex: 'business_name',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.business_name.toUpperCase() < b.business_name.toUpperCase() ? -1 : 1,
    },
    {
        title: 'Job Title',
        dataIndex: 'job_title',
        sorter: (a, b) => a.job_title.toUpperCase() < b.job_title.toUpperCase() ? -1 : 1,
    },
    {
        title: 'First Name',
        dataIndex: 'first_name',
        sorter: (a, b) => a.first_name.toUpperCase() < b.first_name.toUpperCase() ? -1 : 1,
        render(value, record, index) {
            return (
                <b>{value}</b>
            )
        },
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
        sorter: (a, b) => a.last_name.toUpperCase() < b.last_name.toUpperCase() ? -1 : 1,
        render(value, record, index) {
            return (
                <b>{value}</b>
            )
        },
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'City',
        dataIndex: 'city',
        sorter: (a, b) => a.city.toUpperCase() < b.city.toUpperCase() ? -1 : 1,
        filters: [
            {
                text: 'Gulshan',
                value: 'Gulshan',
            },
            {
                text: 'Mirpur',
                value: 'Mirpur',
            },
        ],
    },
    {
        title: 'Mobile No.',
        dataIndex: 'mobile_number',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Contact Type',
        dataIndex: 'contact_type',
        sorter: (a, b) => a.contact_type.toUpperCase() < b.contact_type.toUpperCase() ? -1 : 1,
    },
    {
        title: 'Location Group',
        dataIndex: 'location_group',
        sorter: (a, b) => a.location_group.toUpperCase() < b.location_group.toUpperCase() ? -1 : 1,
    },
    {
        title: '',
        dataIndex: 'status',
        render(value, record, index) {
            return (
                <div style={{ height: "10px", width: "10px", background: "#00C489", borderRadius: "50%" }}>

                </div>
            )
        },
    },
    {

        dataIndex: 'action',
        render(value, record, index) {
            return (
                <Dropdown overlay={menu}>
                    <a>...</a>
                </Dropdown>
            )
        },
    },
];


const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        business_name: `Gononet LLC`,
        job_title: `Store Manager`,
        first_name: `Mohammad`,
        last_name: `Hossain`,
        address: `London, Park Lane no. ${i}`,
        city: `Gulshan ${i}`,
        mobile_number: `01755590478`,
        email: `nevaeh@example.com`,
        contact_type: `Consignment`,
        location_group: `GROUP 0${i}`,
        status: ``,
    });
}


const ContactLists: React.FC = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isMobile, setisMobile] = useState(false);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


    React.useLayoutEffect(() => {
        function updateSize() {

            if (window.innerWidth < 900) {
                setisMobile(true);
            } else {
                setisMobile(false);
            }
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>

            {isMobile ? (
                <div className="card">
                    <Row align="middle" justify="space-between">
                        <Col>
                            <b>Store Manager</b>
                        </Col>
                        <Col>
                            Gulshan
                        </Col>
                    </Row>
                    <Divider style={{ margin: "10px 0" }} />
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Row align="middle" justify="center" gutter={20}>
                            <Col>
                                <AddRoundFillIcon />
                            </Col>
                            <Col span={20}>
                                <Space direction="horizontal" align="start">
                                    <div>
                                        <b>Mohammad Hossain</b>
                                        <div>01755590478</div>
                                    </div>
                                    <div style={{ height: "10px", width: "10px", background: "#00C489", borderRadius: "50%" }}></div>
                                </Space>
                            </Col>
                        </Row>

                        <div className="cardExpanded">
                            <Space direction="vertical">

                                <div>
                                    <b>Address: </b>
                                    Arhitektu iela 25 - 55, Daugavpils, LV-5410
                                </div>

                                <div>
                                    <b>Email: </b>
                                    nevaeh@example.com
                                </div>

                                <div>
                                    <b>Contact Type: </b>
                                    Consignment
                                </div>

                                <div>
                                    <b>Location Group: </b>
                                    GROUP 001
                                </div>

                            </Space>
                        </div>
                    </Space>
                </div>
            ) : (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    scroll={{ y: "55vh" }}
                    pagination={{ pageSize: 50 }}
                />
            )}


        </div>
    );

}


export default ContactLists;