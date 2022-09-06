import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { Col, Container, FormGroup, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { getAllContactGroup, getAllContactType } from 'services/contact';

const ContactSubGroupLists = () => {

    const [contactGroup, setContactGroup] = useState([]);
    const [contactTypeList, setContactTypeList] = useState([]);
    const [contactSubGroup, setContactSubGroup] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [contactGroupModal, setContactGroupModal] = useState(false);
    const [columnList, setColumnList] = useState([
        {
            text: "id",
            dataField: "contact_group_id",
            hidden: true
        },
        {
            text: "Sub Group Name",
            dataField: "contact_group_name",
            sort: true,
            formatter: (cellContent, contactSubGroup) => (
                <>
                    <h5 className="font-size-14 mb-1">
                        {contactSubGroup.contact_group_name}
                    </h5>
                </>
            ),
        },
        {
            text: "Contact Type",
            dataField: "contact_type_name",
            sort: false,
            formatter: (cellContent, contactSubGroup) => (
                <>
                    <h5 className="font-size-14 mb-1">
                        {contactSubGroup.contact_type_name}
                    </h5>
                </>
            ),
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


        let contactTypes = await getAllContactType();
        promise_arr?.push({ key: 'contactType', data: contactTypes })

        let contactGroups = await getAllContactGroup();
        promise_arr?.push({ key: 'contactGroup', data: contactGroups })

        Promise.all(promise_arr).then(res => {
            res?.map(el => {
                if (el?.key == 'contactType') {
                    contactTypeData = el?.data;
                    setContactTypeList(contactTypeData);
                } else {
                    contactGroupData = el?.data;
                    contactGroupData = contactGroupData?.map(el => ({
                        ...el,
                        contact_type_name: contactTypeData?.filter(e => e?.contact_type_id == el?.contact_type_id)[0]?.contact_type_name
                    }))
                    setContactGroup(contactGroupData);
                }
                setLoading(false);
            })
        })
    }

    const pageOptions = {
        sizePerPage: 10,
        totalSize: contactGroup?.length, // replace later with size(contactGroup),
        custom: true,
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
                        <Col sm={7} md={7} lg={7}>
                            <FormGroup>
                                <input type={'text'} className="form-control" placeholder="Search" />
                            </FormGroup>
                        </Col>
                        <Col sm={5} md={5} lg={5}>
                            <div className='d-flex align-items-center flex-row-reverse'>

                                <i className="fas fa-align-center fa-lg" />
                                <div style={{ width: '20px' }}></div>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setIsEdit(false);
                                        setContactSubGroup(null)
                                        setContactGroupModal(true);
                                    }}
                                >
                                    <i className="bx bx-plus font-size-16 align-middle me-2"></i>
                                    Create
                                </button>
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        {
                            !loading && (
                                <PaginationProvider
                                    pagination={paginationFactory(pageOptions)}
                                    keyField="contact_group_id"
                                    columns={columnList}
                                    data={contactGroup}
                                >
                                    {({ paginationProps, paginationTableProps }) => (
                                        <ToolkitProvider
                                            keyField="contact_group_id"
                                            columns={columnList}
                                            data={contactGroup}
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
                                                                    responsive
                                                                    ref={node}
                                                                />

                                                                <Modal
                                                                    isOpen={contactGroupModal}
                                                                // className={this.props.className}
                                                                >
                                                                    <ModalHeader
                                                                        toggle={toggle}
                                                                        tag="h4"
                                                                    >
                                                                        {!!isEdit ? "Edit Contact Sub Group" : "Add Contact Sub Group"}
                                                                    </ModalHeader>
                                                                    <ModalBody>
                                                                        <FormGroup>
                                                                            <Label className="form-label">Contact Type</Label>
                                                                            <select className="form-select" placeholder='Select One'>
                                                                                {
                                                                                    !isEdit && (
                                                                                        <option value={0}>Select</option>
                                                                                    )
                                                                                }
                                                                                {contactTypeList.map(el => (
                                                                                    !isEdit ? (
                                                                                        <option value={el?.contact_type_id} key={el?.contact_type_id}>{el?.contact_type_name}</option>

                                                                                    ) : (
                                                                                        <option value={el?.contact_type_id} key={el?.contact_type_id} selected={el?.contact_type_id == contactSubGroup?.contact_type_id}>{el?.contact_type_name}</option>

                                                                                    )
                                                                                ))}
                                                                            </select>
                                                                        </FormGroup>
                                                                        <FormGroup>
                                                                            <Label className="form-label">Contact Sub Group Name</Label>
                                                                            <input type={'text'} className="form-control" placeholder='Enter sub group name'
                                                                                value={contactSubGroup?.contact_group_name}
                                                                                onChange={e => setContactSubGroup(prev => ({ ...prev, contact_group_name: e.target.value }))}
                                                                            />
                                                                        </FormGroup>
                                                                        <div style={{ textAlign: 'right' }}>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-primary"
                                                                                onClick={() => setContactGroupModal(false)}
                                                                            >
                                                                                Save
                                                                            </button>
                                                                        </div>

                                                                    </ModalBody>
                                                                </Modal>
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

export default ContactSubGroupLists;