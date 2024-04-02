import React, { Component } from "react";
import { withFormik, Form, Field } from "formik";
import styles from "./FormikForm.module.css";
import Button from "../Button/Button";
const form_id = "form_id";
class MaintenanceForm extends Component {
  editOnClick = (event) => {
    event.preventDefault();
    const data = !this?.props?.status?.edit;
    this.props.setStatus({
      edit: data,
    });
  };

  cancelOnClick = (event) => {
    event.preventDefault();
    this.props.resetForm();
    this.props.setStatus({
      edit: false,
    });
  };

  _renderAction() {
    return (
      <div className={styles.backgrounfLEX}>
        <div>
          {this?.props?.status?.edit ? (
            <React.Fragment>
              <Button
                style={{ marginTop: "30px" }}
                type="submit"
                form={form_id}>
                Save
              </Button>
              <Button
                onClick={this.cancelOnClick}
                style={{ marginLeft: "8px" }}>
                Cancel
              </Button>
            </React.Fragment>
          ) : (
            <Button onClick={this.editOnClick}>Edit</Button>
          )}
        </div>
      </div>
    );
  }

  _renderFormView = () => {
    return (
      <div className={styles.backgrounfLEX}>
        <h1 className={styles.Xone}>Your Profile</h1>
        <div className={styles.xOne}>
          {/* <div className={styles.formikContainer}>
            <h2>Profile Photo Upload Section Here</h2>
          </div> */}
          <div className={styles.formikContainer}>
            <div>
              <div
                style={{
                  backgroundColor: "DarkSalmon",
                  height: "60px",
                  width: "450px",
                  color: "white",
                  fontSize: "40px",
                  borderRadius: "10px",
                }}>
                Your Profile
              </div>
              <div
                style={{
                  fontSize: "20px",
                  color: "DarkSlateGray",
                  padding: "0.5rem",
                }}>
                <label style={{ fontSize: "30px", color: "Black" }}>
                  FirstName :{" "}
                </label>

                {/* <label
                  className={styles.sideLabel}
                  type="text"
                  name="brand_name"> */}
                {this?.props?.fields?.firstName}
                {/* </label> */}
              </div>
              <br />
              {/* </div>
        <div className="form-label-container"> */}
              <div
                style={{
                  fontSize: "20px",
                  color: "DarkSlateGray",
                  padding: "0.5rem",
                }}>
                {" "}
                <label style={{ fontSize: "30px", color: "Black" }}>
                  LastName :{" "}
                </label>
                {/* <label
                  className={styles.sideLabel}
                  type="text"
                  name="brand_name"> */}
                {this?.props?.fields?.lastName}
                {/* </label> */}
              </div>
              <br />
              {/* </div>
        <div className="form-label-container"> */}
              <div
                style={{
                  fontSize: "20px",
                  color: "DarkSlateGray",
                  padding: "0.5rem",
                }}>
                {" "}
                <label style={{ fontSize: "30px", color: "Black" }}>
                  User Name :{" "}
                </label>
                {/* <label className={styles.sideLabel} type="text" name="name"> */}
                {this?.props?.fields?.userName}
                {/* </label> */}
              </div>
              <br />
              {/* </div>
        <div className="form-label-container"> */}
              <div
                style={{
                  fontSize: "20px",
                  color: "DarkSlateGray",
                  padding: "0.5rem",
                }}>
                {" "}
                <label style={{ fontSize: "30px", color: "Black" }}>
                  Email :{" "}
                </label>
                {/* <label
                  className={styles.sideLabel}
                  type="text"
                  name="brand_name"> */}
                {this?.props?.fields?.email}
                {/* </label> */}
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  };

  _renderFormInput = () => {
    return (
      <div
        style={{
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
          "flex-direction": "column",
          padding: "1rem",
          height: "70vh",
        }}
        className={styles.backgrounfLEX}>
        <h1 style={{ "font-size": "40px", color: "white" }}>
          Edit your profile here
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: "25px",
            width: "500px",
            backgroundColor: "#e4e0fd",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
          }}>
          <div
            style={{
              backgroundColor: "DarkSalmon",
              height: "50px",
              width: "450px",
              color: "white",
              fontSize: "40px",
              borderRadius: "10px",
              padding: "1rem",
            }}>
            Edit Your Profile
          </div>
          <label styles={{ "font-size": "25px" }}>First Name</label>
          <div>
            <Field
              style={{
                border: "1px solid grey",
                borderRadius: "20px",
                padding: "5px",
                margin: "0.5rem",
              }}
              type="text"
              name="firstName"
              placeholder="First Name"
            />
          </div>
          <br />
          {/* </div>
        <div className="form-label-container"> */}
          <label styles={{ "font-size": "25px" }}>Last Name</label>
          <div>
            <Field
              style={{
                border: "1px solid grey",
                borderRadius: "20px",
                padding: "5px",
                margin: "0.5rem",
              }}
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
          </div>

          {/* </div>
        <div className="form-label-container"> */}
          <label styles={{ "font-size": "25px" }}>User name</label>
          <div>
            <Field
              style={{
                border: "1px solid grey",
                borderRadius: "20px",
                padding: "5px",
                margin: "0.5rem",
              }}
              type="text"
              name="userName"
              placeholder="User Name"
            />
          </div>

          {/* </div>
        <div className="form-label-container"> */}
          <label styles={{ "font-size": "25px" }}>Email</label>
          <div>
            <Field
              style={{
                border: "1px solid grey",
                borderRadius: "20px",
                padding: "5px",
                margin: "0.5rem",
              }}
              type="text"
              name="email"
              placeholder="Email"
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Form id={form_id}>
          {this?.props?.status?.edit
            ? this._renderFormInput()
            : this._renderFormView()}
          {this._renderAction()}
          {/* <h4>Current value</h4> */}
          {/* a sample of data da user update you can use it to send it back to the database */}
          {/* <div className="data">
            <pre>
              <code>{JSON.stringify(this.props.fields, null, 2)}</code>
            </pre>
          </div> */}
        </Form>
      </React.Fragment>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToStatus: (props) => {
    return {
      edit: props?.edit || false,
    };
  },
  mapPropsToValues: (props) => {
    return {
      firstName: props.fields.firstName,
      lastName: props.fields.lastName,
      userName: props.fields.userName,
      email: props.fields.email,
    };
  },
  enableReinitialize: true,
  handleSubmit: (values, { props, ...actions }) => {
    props.updateFields(values);
    actions.setStatus({
      edit: false,
    });
  },
})(MaintenanceForm);

export default FormikForm;
