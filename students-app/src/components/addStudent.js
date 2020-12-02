import React, { Component } from "react";
import { Jumbotron, Form, Button, Modal } from "react-bootstrap";
import "../styles/student.css";
import axios from "axios";

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        name: "",
        lastname: "",
        birthdate: "",
        gender: "",
        university: "",
        carrer: "",
        admissionDate: "",
        address: "",
        active: true,
      },
      show: false,
      message: "",
      title: "",
    };
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

  cleanForm = () => {
    this.setState({
      student: {
        name: "",
        lastname: "",
        birthdate: "",
        gender: "",
        university: "",
        carrer: "",
        admissionDate: "",
        address: "",
        active: true,
      },
    });
  };

  handleSummit = (e) => {
    e.preventDefault();
    const { student } = this.state;
    axios
      .post("http://localhost:3038/student/add", student)
      .then((response) => {
        console.log(response);
        this.setState({
          show: true,
          message: response.data.message,
          title: response.status === 201 ? "Success" : "Error",
        });
      });
  };

  render() {
    const { student, message, title, show } = this.state;

    const enable =
      student &&
      student.name.length > 0 &&
      student.lastname.length > 0 &&
      student.birthdate.length > 0 &&
      student.university.length > 0 &&
      student.gender.length > 0;

    return (
      <div className="container">
        <Jumbotron className="mt-5 pl-5 pr-5">
          <Form>
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
                      value={student ? student.name : ""}
                      onChange={this.handleOnChange}
                      name="name"
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
                      value={student ? student.lastname : ""}
                      onChange={this.handleOnChange}
                      name="lastname"
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
                      />
                      <Form.Check
                        inline
                        label="Male"
                        type="radio"
                        id={`male`}
                        onChange={this.handleOnChange}
                        checked={(student && student.gender === "male") || ""}
                        name="gender"
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
                this.cleanForm();
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

export default AddStudent;
