import React, { Component } from "react";
import { Toast } from "react-bootstrap";

export default class MyToast extends Component {
  render() {
    const toastCss = {
      position: "relative",
      // top: "55%",
      // right: "43%",
      zIndex: "1",
      width: "80%",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: "10px",
      marginTop: "10px",

      // boxShadow:
      //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    };
    // console.log(`in toast show is:${this.props.show}`);
    return (
      <div
        style={
          this.props.show
            ? this.props.styling
              ? this.props.styling
              : toastCss
            : null
        }
      >
        <Toast
          className={`border text-white ${
            this.props.type === "Success"
              ? "border-success bg-success"
              : "border-danger bg-danger"
          }`}
          show={this.props.show}
        >
          <Toast.Header
            className={`text-white ${
              this.props.type === "Success" ? "bg-success" : "bg-danger"
            }`}
            closeButton={false}
          >
            <strong className="mr-auto">{this.props.type}</strong>
          </Toast.Header>
          <Toast.Body>{this.props.message}</Toast.Body>
        </Toast>
      </div>
    );
  }
}
MyToast.defaultProps = {
  type: "Error",
  message: "",
  show: false,
};
// using
// <MyToast show = {this.state.show} message = {"Building Deleted Successfully."} type = {"danger"}/>
//         <MyToast
// show={errors ? true : false}
// message={errors}
// type={"success"}
// styling={{
//   position: "fixed",
//   top: "55%",
//   right: "43%",
//   zIndex: "1",
//   width: "15%",
//   boxShadow:
//     "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
// }}
// />
