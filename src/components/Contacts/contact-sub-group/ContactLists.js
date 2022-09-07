import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { Col, Container, FormGroup, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { getAllContactGroup, getAllContactType, saveContactGroupData, updateContactGroupData } from 'services/contact';

const ContactLists = () => {

    const [contactGroup, setContactGroup] = useState([]);
    const [contactTypeList, setContactTypeList] = useState([]);
    const [contactSubGroup, setContactSubGroup] = useState({
        contact_group_id: null,
        contact_group_name: '',
        contact_type_name: '',
        contact_type_id: null,
        is_active: true
    });
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
                        <Col sm={9} md={10} lg={10}>
                            <Row>
                                <Col sm={4} md={4} lg={4}>
                                    <FormGroup>
                                        <label className="form-label">Location Group</label>
                                        <select defaultValue={0} className="form-select" placeholder='Select One'>

                                            <option value={0}>Select</option>
                                            <option value={0} key={0}>One</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col sm={4} md={4} lg={4}>
                                    <FormGroup>
                                        <label className="form-label">Contact Type</label>
                                        <select defaultValue={0} className="form-select" placeholder='Select One'>

                                            <option value={0}>Select</option>
                                            <option value={0} key={0}>One</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col sm={4} md={4} lg={4}>
                                    <FormGroup>
                                        <label className="form-label">Contact Sub Type</label>
                                        <select defaultValue={0} className="form-select" placeholder='Select One'>

                                            <option value={0}>Select</option>
                                            <option value={0} key={0}>One</option>
                                        </select>
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
                                                <i className="bx bx bxs-printer  align-middle me-2" style={{fontSize:30}}></i>
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                <i className="bx bx bx-download align-middle me-2" style={{fontSize:30}}></i>
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                <i className="bx bx bx-upload align-middle me-2" style={{fontSize:30}}></i>
                                            </Col>
                                            <Col xs={3} sm={3} md={3} lg={3}>
                                                <i className="bx bx bxs-file-plus align-middle me-2" style={{fontSize:30}}></i>
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
                                                                            <select defaultValue={!isEdit ? 0 : contactSubGroup.contact_type_id} className="form-select" placeholder='Select One'
                                                                                onChange={e => setContactSubGroup(prev => ({ ...prev, contact_type_id: Number(e.target.value) }))}>
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
                                                                                value={contactSubGroup.contact_group_name}
                                                                                onChange={e => setContactSubGroup(prev => ({ ...prev, contact_group_name: e.target.value }))}
                                                                            />
                                                                        </FormGroup>
                                                                        <div style={{ textAlign: 'right' }}>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-primary"
                                                                                onClick={() => !isEdit ? createContactGroup() : updateContactGroup()}
                                                                            >
                                                                                {!isEdit ? 'Save' : "Update"}
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

export default ContactLists;