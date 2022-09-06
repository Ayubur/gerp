import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import { Col, Container, FormGroup, Row } from 'reactstrap';
import ToolkitProvider, {
    Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

const ContactSubGroupLists = () => {

    const [users, setUsers] = useState([
        {
            id: 1, name: 'arif', age: 21, designation: 'Developer',
        },
        {
            id: 2, name: 'mohan', age: 22, designation: 'Tester'
        },
        {
            id: 3, name: 'saiful', age: 21, designation: 'Developer',
        },
        {
            id: 4, name: 'jahangir', age: 22, designation: 'Tester'
        },
        {
            id: 5, name: 'titu', age: 21, designation: 'Developer',
        },
        {
            id: 6, name: 'raihan', age: 22, designation: 'Tester'
        },
        {
            id: 7, name: 'khalil', age: 21, designation: 'Developer',
        },
        {
            id: 8, name: 'milon', age: 22, designation: 'Tester'
        }

    ]);
    const [user, setUser] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const node = React.createRef();

    const pageOptions = {
        sizePerPage: 5,
        totalSize: users.length, // replace later with size(users),
        custom: true,
    };

    const handleUserClick = (arg) => {
        const user = arg;

        setUser({
            id: user.id,
            name: user.name,
            designation: user.designation,
            age: user.age
        })

        setIsEdit(true)

        alert('EDIT user: ' + user.name + '!!!!!!!!!!!!')
    };

    const onClickDelete = (user) => {
        alert('DELETE user: ' + user.name + '!!!!!!!!!!!!')
    }

    const onPaginationPageChange = page => {
        if (
            node &&
            node.current &&
            node.current.props &&
            node.current.props.pagination &&
            node.current.props.pagination.options
        ) {
            node.current.props.pagination.options.onPageChange(page);
        }
    };

    const contactListColumns = [
        {
            text: "id",
            dataField: "id",
            sort: true,
            hidden: true,
            formatter: (cellContent, user) => <>{user.id}</>,
        },
        {
            text: "Name",
            dataField: "name",
            sort: true,
            formatter: (cellContent, user) => (
                <>
                    <h5 className="font-size-14 mb-1">
                        <Link to="#" className="text-dark">
                            {user.name}
                        </Link>
                    </h5>
                    <p className="text-muted mb-0">{user.designation}</p>
                </>
            ),
        },
        {
            dataField: "age",
            text: "Age",
            sort: true,
        },
        {
            dataField: "menu",
            isDummyField: true,
            editable: false,
            text: "Action",
            formatter: (cellContent, user) => (
                <div className="d-flex gap-3">
                    <Link className="text-success" to="#">
                        <i
                            className="mdi mdi-pencil font-size-18"
                            id="edittooltip"
                            onClick={() => handleUserClick(user)}
                        ></i>
                    </Link>
                    <Link className="text-danger" to="#">
                        <i
                            className="mdi mdi-delete font-size-18"
                            id="deletetooltip"
                            onClick={() => onClickDelete(user)}
                        ></i>
                    </Link>
                </div>
            ),
        },
    ]

    const selectRow = {
        mode: "checkbox",
    };

    const defaultSorted = [
        {
            dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
            order: "desc", // desc or asc
        },
    ];

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
                                >
                                    <i className="bx bx-plus font-size-16 align-middle me-2"></i>
                                    Create
                                </button>
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        <PaginationProvider
                            pagination={paginationFactory(pageOptions)}
                            keyField="id"
                            columns={contactListColumns}
                            data={users}
                        >
                            {({ paginationProps, paginationTableProps }) => (
                                <ToolkitProvider
                                    keyField="id"
                                    columns={contactListColumns}
                                    data={users}
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

                                                        {/* <Modal
                                                            isOpen={this.state.modal}
                                                            className={this.props.className}
                                                        >
                                                            <ModalHeader
                                                                toggle={this.toggle}
                                                                tag="h4"
                                                            >
                                                                {!!isEdit ? "Edit User" : "Add User"}
                                                            </ModalHeader>
                                                            <ModalBody>
                                                                <Formik
                                                                    enableReinitialize={true}
                                                                    initialValues={{
                                                                        name: (user && user.name) || "",
                                                                        designation:
                                                                            (user && user.designation) || "",
                                                                        email: (user && user.email) || "",
                                                                        tags: (user && user.tags) || [],
                                                                        projects:
                                                                            (user && user.projects) || "",
                                                                    }}
                                                                    validationSchema={Yup.object().shape({
                                                                        name: Yup.string().required(
                                                                            "Please Enter Your Name"
                                                                        ),
                                                                        designation: Yup.string().required(
                                                                            "Please Enter Your Designation"
                                                                        ),
                                                                        email: Yup.string().required(
                                                                            "Please Enter Your Email"
                                                                        ),
                                                                        tags: Yup.array().required(
                                                                            "Please Select Tags"
                                                                        ),
                                                                        projects: Yup.string().required(
                                                                            "Please Enter Your Projects"
                                                                        ),
                                                                    })}
                                                                    onSubmit={values => {
                                                                        if (isEdit) {
                                                                            const updateUser = {
                                                                                id: user.id,
                                                                                name: values.name,
                                                                                designation: values.designation,
                                                                                tags: values.tags,
                                                                                email: values.email,
                                                                                projects: values.projects,
                                                                            };

                                                                            // update user
                                                                            onUpdateUser(updateUser);
                                                                        } else {
                                                                            const newUser = {
                                                                                id:
                                                                                    Math.floor(
                                                                                        Math.random() * (30 - 20)
                                                                                    ) + 20,
                                                                                name: values["name"],
                                                                                designation:
                                                                                    values["designation"],
                                                                                email: values["email"],
                                                                                tags: values["tags"],
                                                                                projects: values["projects"],
                                                                            };
                                                                            // save new user
                                                                            onAddNewUser(newUser);
                                                                        }
                                                                        this.setState({
                                                                            selectedUser: null,
                                                                        });
                                                                        this.toggle();
                                                                    }}
                                                                >
                                                                    {({ errors, status, touched }) => (
                                                                        <Form>
                                                                            <Row>
                                                                                <Col className="col-12">
                                                                                    <div className="mb-3">
                                                                                        <Label className="form-label">
                                                                                            Name
                                                                                        </Label>
                                                                                        <Field
                                                                                            name="name"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.name &&
                                                                                                    touched.name
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                        />
                                                                                        <ErrorMessage
                                                                                            name="name"
                                                                                            component="div"
                                                                                            className="invalid-feedback"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="mb-3">
                                                                                        <Label className="form-label">
                                                                                            Designation
                                                                                        </Label>
                                                                                        <Field
                                                                                            name="designation"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.designation &&
                                                                                                    touched.designation
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                        />
                                                                                        <ErrorMessage
                                                                                            name="designation"
                                                                                            component="div"
                                                                                            className="invalid-feedback"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="mb-3">
                                                                                        <Label className="form-label">
                                                                                            Email
                                                                                        </Label>
                                                                                        <Field
                                                                                            name="email"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.email &&
                                                                                                    touched.email
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                        />
                                                                                        <ErrorMessage
                                                                                            name="email"
                                                                                            component="div"
                                                                                            className="invalid-feedback"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="mb-3">
                                                                                        <Label className="form-label">
                                                                                            Tags
                                                                                        </Label>
                                                                                        <Field
                                                                                            name="tags"
                                                                                            as="select"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.tags &&
                                                                                                    touched.tags
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                            multiple={true}
                                                                                        >
                                                                                            <option>Photoshop</option>
                                                                                            <option>
                                                                                                illustrator
                                                                                            </option>
                                                                                            <option>Html</option>
                                                                                            <option>Php</option>
                                                                                            <option>Java</option>
                                                                                            <option>Python</option>
                                                                                            <option>
                                                                                                UI/UX Designer
                                                                                            </option>
                                                                                            <option>Ruby</option>
                                                                                            <option>Css</option>
                                                                                        </Field>
                                                                                    </div>
                                                                                    <div className="mb-3">
                                                                                        <Label className="form-label">
                                                                                            Projects
                                                                                        </Label>
                                                                                        <Field
                                                                                            name="projects"
                                                                                            type="text"
                                                                                            className={
                                                                                                "form-control" +
                                                                                                (errors.projects &&
                                                                                                    touched.projects
                                                                                                    ? " is-invalid"
                                                                                                    : "")
                                                                                            }
                                                                                        />
                                                                                        <ErrorMessage
                                                                                            name="projects"
                                                                                            component="div"
                                                                                            className="invalid-feedback"
                                                                                        />
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col>
                                                                                    <div className="text-end">
                                                                                        <button
                                                                                            type="submit"
                                                                                            className="btn btn-success save-user"
                                                                                        >
                                                                                            Save
                                                                                        </button>
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>
                                                                        </Form>
                                                                    )}
                                                                </Formik>
                                                            </ModalBody>
                                                        </Modal> */}
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
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ContactSubGroupLists;