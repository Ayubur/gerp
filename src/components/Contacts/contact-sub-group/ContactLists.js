import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { Col, Container, FormGroup, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import Select from "react-select";
import { getContactGroup, getContactType, getLocationGroup } from 'services/dropdown';
import { getContact } from 'services/contact';

const ContactLists = () => {

    const [contactGroup, setContactGroup] = useState([]);
    const [contactTypeList, setContactTypeList] = useState([]);
    const [contactTypeDropdownList, setContactTypeDropdownList] = useState([]);
    const [locationGroupList, setLocationGroupList] = useState([]);
    const [locationGroupDropdownList, setLocationGroupDropdownList] = useState([]);
    const [contactSubGroupList, setContactSubGroupList] = useState([]);
    const [contactSubGroupDropdownList, setContactSubGroupDropdownList] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);


    const [contactFilterData, setContactFilterData] = useState({
        location_group_id: null,
        contact_type_id: null,
        contact_group_id: null
    });
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [contactGroupModal, setContactGroupModal] = useState(false);
    const [columnList, setColumnList] = useState([
        {
            text: "Id",
            dataField: "contact_id",
            hidden: true
        },
        {
            text: "Location Group",
            dataField: "location_group",
            sort: false
        },
        {
            text: "Contact Type",
            dataField: "contact_type",
            sort: false
        },
        {
            text: "Sub Group",
            dataField: "contact_group_name",
            sort: false
        },
        {
            text: "Business Name",
            dataField: "business_name",
            sort: false
        },
        {
            text: "Job Title",
            dataField: "job_title",
            sort: false
        },
        {
            text: "Name",
            dataField: "first_name",
            sort: false
        },
        {
            text: "Address",
            dataField: "address",
            sort: false
        },
        {
            text: "Mobile",
            dataField: "mobile",
            sort: false
        },
        {
            text: "Email",
            dataField: "email",
            sort: false
        },
        {
            text: "Description",
            dataField: "description",
            sort: false
        },
        {
            dataField: "menu",
            isDummyField: true,
            editable: false,
            text: "Action",
            formatter: (cellContent, contactSubGroup) => (
                <div className="d-flex gap-3">
                    <Link className="text-success" to="#">
                        <i
                            className="mdi mdi-pencil font-size-18"
                            id="edittooltip"
                            onClick={() => handleUserClick(contactSubGroup)}
                        ></i>
                    </Link>
                    <Link className="text-danger" to="#">
                        <i
                            className="mdi mdi-delete font-size-18"
                            id="deletetooltip"
                            onClick={() => onClickDelete(contactSubGroup)}
                        ></i>
                    </Link>
                </div>
            ),
        }
    ]);
    const node = React.createRef();

    useEffect(() => {
        _initFunc();
    }, [])


    const _initFunc = async () => {
        setLoading(true);
        let promise_arr = [];
        let contactTypeData = [];
        let contactGroupData = [];
        let locationGroupData = [];
        let contactData = [];

        let locationGroups = await getLocationGroup();
        promise_arr?.push({ key: 'locationGroup', data: locationGroups })

        let contactTypes = await getContactType();
        promise_arr?.push({ key: 'contactType', data: contactTypes })

        let contactGroups = await getContactGroup();
        promise_arr?.push({ key: 'contactGroup', data: contactGroups })

        let contacts = await getContact(1);
        promise_arr?.push({ key: 'contact', data: contacts })

        Promise.all(promise_arr).then(res => {
            res?.map(el => {
                if (el?.key == 'contactType') {
                    contactTypeData = el?.data;
                    let data = [];

                    contactTypeData.map(e => {
                        data?.push({
                            label: e?.contact_type_name,
                            value: e?.contact_type_id
                        })
                    })
                    setContactTypeList(contactTypeData)
                    setContactTypeDropdownList(data);
                } else if (el?.key == 'locationGroup') {
                    locationGroupData = el?.data?.location_groups;
                    let data = [];
                    locationGroupData.map(e => {
                        data?.push({
                            label: e?.location_group_name,
                            value: e?.location_group_id
                        })
                    })
                    setLocationGroupList(locationGroupData);
                    setLocationGroupDropdownList(data);
                } else if (el?.key == 'contactGroup') {
                    contactGroupData = el?.data;
                    setContactSubGroupList(contactGroupData)
                    setContactSubGroupDropdownList([]);
                } else {
                    contactData = el?.data?.contacts;
                    setTotalPage(el?.data?.pages);
                    contactData = contactData?.map(el => ({
                        ...el,
                        location_group: locationGroupList?.filter(e => e?.location_group_id == el?.location_group_id)[0]?.location_group_name,
                        contact_type: contactTypeData?.filter(o => o.contact_type_id == contactGroupData?.filter(e => e?.contact_group_id == el?.contact_group_id)[0]?.contact_type_id)[0]?.contact_type_name,
                        contact_group_name: contactGroupData?.filter(e => e?.contact_group_id == el?.contact_group_id)[0]?.contact_group_name
                    }))
                    setContacts(contactData);
                }
                setLoading(false);
            })
        })
    }

    const optionGroup = [
        { label: "Mustard", value: "Mustard" },
        { label: "Ketchup", value: "Ketchup" },
        { label: "Relish", value: "Relish" },
    ]

    const createContactGroup = async () => {
        delete contactSubGroup.contact_group_id;
        delete contactSubGroup.contact_type_name;
        try {
            const saveContactGroupResponse = await saveContactGroupData(contactSubGroup);
            if (saveContactGroupResponse?.success) {
                _initFunc();
                setContactGroupModal(false)
            } else {
                alert('Error occurs while saving contact group!')
            }
        } catch (error) {
            console.log('saveContactGroupResponseError', error);
        }
    }

    const updateContactGroup = async () => {
        delete contactSubGroup.contact_type_name;
        try {
            const updateContactGroupResponse = await updateContactGroupData(contactSubGroup.contact_group_id, contactSubGroup);
            if (updateContactGroupResponse?.success) {
                _initFunc();
                setContactGroupModal(false)
            } else {
                alert('Error occurs while updating contact group!')
            }
        } catch (error) {
            console.log('saveContactGroupResponseError', error);
        }
    }

    const pageOptions = {
        sizePerPage: 10,
        totalSize: 20, // replace later with size(contactGroup),
        custom: true,
        onPageChange: (e) => console.log(e)
    };

    const handleUserClick = (arg) => {
        setContactSubGroup(arg)
        setIsEdit(true);
        setContactGroupModal(true);
    };

    const onClickDelete = (contactSubGroup) => {
        alert('DELETE contactSubGroup: ' + contactSubGroup.name + '!!!!!!!!!!!!')
    }

    // const onPaginationPageChange = page => {
    //     if (
    //         node &&
    //         node.current &&
    //         node.current.props &&
    //         node.current.props.pagination &&
    //         node.current.props.pagination.options
    //     ) {
    //         node.current.props.pagination.options.onPageChange(page);
    //     }
    // };

    const selectRow = {
        mode: "checkbox",
    };

    const defaultSorted = [
        {
            dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
            order: "desc", // desc or asc
        },
    ];

    const toggle = () => {
        setContactGroupModal(!contactGroupModal);
    }

    return (
        <>
            <Row>
                <Col lg={12}>
                    <Row>
                        <Col sm={9} md={10} lg={10}>
                            <Row>
                                <Col sm={4} md={4} lg={4}>
                                    <FormGroup>
                                        <label className="form-label">Location Group</label>
                                        <Select
                                            className="select2"
                                            placeholder="Select Location Group"
                                            options={locationGroupDropdownList}
                                            classNamePrefix="select2 select2-selection"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={4} md={4} lg={4}>
                                    <FormGroup>
                                        <label className="form-label">Contact Type</label>
                                        <Select
                                            className="select2"
                                            placeholder="Select Contact Type"
                                            options={contactTypeDropdownList}
                                            classNamePrefix="select2 select2-selection"
                                            onChange={val => {
                                                setContactSubGroupDropdownList([]);
                                                let data = contactSubGroupList?.filter(el => el.contact_type_id == val.value);
                                                let temp_data = [];
                                                data?.map(el => temp_data.push({
                                                    label: el?.contact_group_name,
                                                    value: el?.contact_group_id
                                                }))
                                                setContactSubGroupDropdownList(temp_data);
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm={4} md={4} lg={4}>
                                    <FormGroup>
                                        <label className="form-label">Contact Sub Group</label>
                                        <Select
                                            className="select2"
                                            placeholder="Select Contact Group"
                                            options={contactSubGroupDropdownList}
                                            classNamePrefix="select2 select2-selection"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={3} md={2} lg={2}>
                            <Col sm={12} md={12} lg={12}>
                                <div style={{ marginTop: '27px', textAlign: 'right' }}>
                                    <button
                                        type="button"
                                        className="btn btn-primary">
                                        <i className="bx bx-filter font-size-16 align-middle me-2"></i>
                                        Filter
                                    </button>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                    <div style={{ marginTop: '20px' }}>
                        <Row>
                            <Col sm={9} md={9} lg={10}>
                                <Row>
                                    <Col sm={4} md={3} lg={3}>
                                        <Row>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                <i className="bx bx bxs-printer  align-middle me-2" style={{ fontSize: 30 }}></i>
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                <i className="bx bx bx-download align-middle me-2" style={{ fontSize: 30 }}></i>
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                <i className="bx bx bx-upload align-middle me-2" style={{ fontSize: 30 }}></i>
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                <i className="bx bx bxs-file-plus align-middle me-2" style={{ fontSize: 30 }}></i>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={8} md={9} lg={9}>
                                        <FormGroup>
                                            <input type={'text'} className="form-control" placeholder="Search" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={3} md={3} lg={2}>
                                <div style={{ textAlign: 'right' }}>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        style={{ marginRight: 15 }}
                                    >
                                        <i className="bx bx-plus font-size-16 align-middle me-2"></i>
                                        Create
                                    </button>
                                    <i className="fas fa-align-center fa-lg" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        {
                            !loading && (
                                <PaginationProvider
                                    pagination={paginationFactory(pageOptions)}
                                    keyField="contact_id"
                                    columns={columnList}
                                    data={contacts}
                                >
                                    {({ paginationProps, paginationTableProps }) => (
                                        <ToolkitProvider
                                            keyField="contact_id"
                                            columns={columnList}
                                            data={contacts}
                                            search
                                        >
                                            {toolkitprops => (
                                                <React.Fragment>
                                                    <Row>
                                                        <Col xl="12">
                                                            <div className="table-responsive">
                                                                <BootstrapTable
                                                                    {...toolkitprops.baseProps}
                                                                    {...paginationTableProps}
                                                                    selectRow={selectRow}
                                                                    defaultSorted={defaultSorted}
                                                                    classes={
                                                                        "table align-middle table-nowrap table-hover"
                                                                    }
                                                                    bordered={false}
                                                                    striped={false}
                                                                    remote
                                                                    responsive
                                                                    ref={node}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row className="align-items-md-center mt-30">
                                                        <Col className="pagination pagination-rounded justify-content-end mb-2">
                                                            <PaginationListStandalone
                                                                {...paginationProps}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </React.Fragment>
                                            )}
                                        </ToolkitProvider>
                                    )}
                                </PaginationProvider>
                            )
                        }
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ContactLists;