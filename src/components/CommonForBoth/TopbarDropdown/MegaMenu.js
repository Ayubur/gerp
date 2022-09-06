import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItemRow,
  Row,
  Col
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";
//i18n
import { withTranslation } from "react-i18next";
import megamenuImg from "../../../assets/images/megamenu-img.png";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

import { connect } from "react-redux";

const getUserName = () => {
  if (localStorage.getItem("authUser")) {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    return obj;
  }
}

class MegaMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      name: "Admin",
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu,
    }))
  }

  componentDidMount() {
    const userData = getUserName();
    if (userData) {
      this.setState({ name: userData.username })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.success !== this.props.success) {
      const userData = getUserName();
      if (userData) {
        this.setState({ name: userData.username })
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="dropdown-mega d-lg-inline-block ms-1"
        >
          <DropdownToggle
            className="btn header-item" caret tag="button"
          >

            <i className="bx bx-cog bx-sm"></i>
          </DropdownToggle>
          <DropdownMenu className="dropdown-megamenu">
            <Row>
              <Col sm={12}>
                <Row>
                  <Col xs={6} md={3}>
                    <h5 className="font-size-14 mt-0">
                      {this.props.t("Your Company")}
                    </h5>
                    <ul className="list-unstyled megamenu-list">
                      <li>
                        <Link to="#">{this.props.t("My Company")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Manage Users")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Configurations")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Add Location")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Add Contact")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Custom Form Styles")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Accounting")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Chart of Accounts")}</Link>
                      </li>
                    </ul>
                  </Col>

                  <Col xs={6} md={3}>
                    <h5 className="font-size-14 mt-0">
                      {this.props.t("Lists")}
                    </h5>
                    <ul className="list-unstyled megamenu-list">
                      <li>
                        <Link to="#">{this.props.t("All Lists")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Users")}</Link>
                      </li>
                      <li>
                        <Link to="/contacts">{this.props.t("Contacts")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Locations")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Product Settings")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Product and Services")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Recurring Transactions")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Attachments")}</Link>
                      </li>
                    </ul>
                  </Col>

                  <Col xs={6} md={3}>
                    <h5 className="font-size-14 mt-0">
                      {this.props.t("Tools")}
                    </h5>
                    <ul className="list-unstyled megamenu-list">
                      <li>
                        <Link to="#">
                          {this.props.t("Order Checks")}
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          {this.props.t("Import Data")}
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          {this.props.t("Export Data")}
                        </Link>
                      </li>
                      <li>
                        <Link to="#"> {this.props.t("Reconcile")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Budgeting")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Audit Logs")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Smart Lock")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Case Center")}</Link>
                      </li>
                    </ul>
                  </Col>
                  <Col xs={6} md={3}>
                    <h5 className="font-size-14 mt-0">
                      {this.props.t("Profiles")}
                    </h5>
                    <ul className="list-unstyled megamenu-list">
                      <li>
                        <Link to="#">{this.props.t("Feedback")}</Link>
                      </li>
                      <li>
                        <Link to="#">{this.props.t("Privacy")}</Link>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    )
  }
}

MegaMenu.propTypes = {
  t: PropTypes.any,
  success: PropTypes.string
}

const mapStateToProps = state => {
  const { success } = state.Profile
  return { success }
}

export default withRouter(
  connect(mapStateToProps, {})(withTranslation()(MegaMenu))
)
