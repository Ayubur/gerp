import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    Label,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

import BootstrapTable from "react-bootstrap-table-next";

import images from "assets/images";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import classnames from "classnames";

import DeleteModal from "components/Common/DeleteModal";

import {
    getUsers,
    addNewUser,
    updateUser,
    deleteUser,
} from "store/contacts/actions";

import { isEmpty, size, map } from "lodash";
import ContactSubGroupLists from "components/Contacts/contact-sub-group/ContactSubGroupLists";

const Contacts = () => {
    const [customActiveTab, setCustomActiveTab] = useState(1);
    return (
        <>
            <div className="page-content">
                {/* <Breadcrumbs title="Contacts" breadcrumbItem="Contacts" /> */}
                <Row>
                    <Col lg="12">
                        <Card>
                            <CardBody>
                                <Nav tabs className="nav-tabs-custom ">
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                active: customActiveTab === 1,
                                            })}
                                            onClick={() => setCustomActiveTab(1)}
                                        >
                                            <span className="d-none d-sm-block">CONTACT SUB GROUP</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                active: customActiveTab === 2,
                                            })}
                                            onClick={() => setCustomActiveTab(2)}
                                        >
                                            <span className="d-none d-sm-block">CONTACTS</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <div className="mt-3">
                                    {
                                        customActiveTab == 1 ? (
                                            <ContactSubGroupLists />
                                        ) : <></>
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Contacts;
