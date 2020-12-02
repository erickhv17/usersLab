import React, { Component } from "react";
import { Jumbotron, Form, Button, Modal } from "react-bootstrap";
import "../styles/student.css";
import axios from "axios";

class Student extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      student: undefined,
      enableToEdit: true,
      show: false,
      message: "",
      title: "",
    };
  }

  componentDidMount() {
    const { userID } = this.props.match.params;
    axios
      .get("http://localhost:3038/student/get/" + userID)
      .then((response) => {
        if (response.data.message) {
          this.setState({ show: true, message: response.data.message });
        } else {
          response.data.newname = response.data.name;
          response.data.newlastname = response.data.lastname;
          this.setState({ student: response.data });
        }
      });
  }

  handleOnChange = (event) => {
    const { name, value, checked, id } = event.target;
    //var { student } = this.state;

    if (name === "gender") {
      this.setState({
        ...this.state,
        student: {
          ...this.state["student"],
          [name]: id,
        },
      });
    } else
      this.setState({
        ...this.state,
        student: {
          ...this.state["student"],
          [name]: name !== "active" ? value : checked,
        },
      });
  };

  handleClick = () => {
    this.setState({ enableToEdit: !this.state.enableToEdit });
  };

  handleSummit = (e) => {
    e.preventDefault();

    let studentToEdit = { ...this.state.student };
    studentToEdit.name = studentToEdit.newname;
    studentToEdit.lastname = studentToEdit.newlastname;
    delete studentToEdit.newlastname;
    delete studentToEdit.newname;

    axios
      .post("http://localhost:3038/student/edit", studentToEdit)
      .then((response) => {
        this.setState({
          show: true,
          message: response.data.message,
          title: response.status === 200 ? "Success" : "Error",
        });
      });
  };

  render() {
    const { student, enableToEdit, message, title, show } = this.state;

    const enable =
      student &&
      student.newname.length > 0 &&
      student.newlastname.length > 0 &&
      student.birthdate.length > 0 &&
      student.university.length > 0 &&
      student.gender.length > 0;

    return (
      <div className="container">
        <Jumbotron className="mt-5 pl-5 pr-5">
          <div className="text-right">
            <Button variant="primary" onClick={this.handleClick}>
              {enableToEdit ? "Enable Edit" : "Disable Edit"}
            </Button>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h1>{student ? student.name + " " + student.lastname : ""}</h1>
            </div>
          </div>
          <Form noValidate>
            <div className="row">
              <div className="col-md-6">
                <h5 style={{ textAlign: "left" }}>General information</h5>
              </div>
              <div className="row">
                <div className="col-md-6" style={{ textAlign: "left" }}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="input"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={student ? student.newname : ""}
                      onChange={this.handleOnChange}
                      name="newname"
                      disabled={enableToEdit}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="input"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={student ? student.newlastname : ""}
                      onChange={this.handleOnChange}
                      name="newlastname"
                      disabled={enableToEdit}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6" style={{ textAlign: "left" }}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control
                      type="date"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={student ? student.birthdate : ""}
                      onChange={this.handleOnChange}
                      name="birthdate"
                      disabled={enableToEdit}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6 mt-1">
                  <div key={`inline-radio`} className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Group required>
                      <Form.Check
                        inline
                        label="Female"
                        type="radio"
                        id={`female`}
                        onChange={this.handleOnChange}
                        checked={(student && student.gender === "female") || ""}
                        name="gender"
                        disabled={enableToEdit}
                      />
                      <Form.Check
                        inline
                        label="Male"
                        type="radio"
                        id={`male`}
                        onChange={this.handleOnChange}
                        checked={(student && student.gender === "male") || ""}
                        name="gender"
                        disabled={enableToEdit}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>University</Form.Label>
                    <Form.Control
                      type="input"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={student ? student.university : ""}
                      onChange={this.handleOnChange}
                      name="university"
                      disabled={enableToEdit}
                      required
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className="mb-3"
                  >
                    <Form.Label>Carrer</Form.Label>
                    <Form.Control
                      as="select"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={student ? student.carrer : ""}
                      onChange={this.handleOnChange}
                      name="carrer"
                      disabled={enableToEdit}
                    >
                      <option value="" hidden></option>
                      <option key="Administración" value="Administración">
                        Administración
                      </option>
                      <option key="Informática" value="Informática">
                        Informática
                      </option>
                      <option key="Medicina" value="Medicina">
                        Medicina
                      </option>
                      <option key="Contabilidad" value="Contabilidad">
                        Contabilidad
                      </option>
                      <option key="Odontología" value="Odontología">
                        Odontología
                      </option>
                    </Form.Control>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label> Admission Date</Form.Label>
                    <Form.Control
                      type="date"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={student ? student.admissionDate : ""}
                      onChange={this.handleOnChange}
                      name="admissionDate"
                      disabled={enableToEdit}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="input"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={student ? student.address : ""}
                      onChange={this.handleOnChange}
                      name="address"
                      disabled={enableToEdit}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-12 text-center">
                  <Form.Group id="formGridCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Active"
                      checked={(student && student.active) || false}
                      onChange={this.handleOnChange}
                      name="active"
                      disabled={enableToEdit}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    size="md"
                    className="mr-3"
                    active
                    onClick={this.handleSummit}
                    disabled={!enable}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Jumbotron>

        <Modal
          show={show}
          onHide={() => this.setState({ show: !this.state.show })}
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ show: !this.state.show });
                //this.props.history.push("/");
              }}
            >
              Go Back
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Student;
