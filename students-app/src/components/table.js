import React, { Component } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import { BsFillPersonFill, BsTrash } from "react-icons/bs";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";

class TableInicial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      message: "",
      show: false,
      showModalDelete: false,
      idToDelete: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3038/student/getAll/").then((response) => {
      if (response.data.message) {
        this.setState({ show: true, message: response.data.message });
      } else {
        this.setState({ students: response.data });
      }
    });
  }

  handleSummit = () => {
    const { idToDelete, students } = this.state;
    axios
      .post("http://localhost:3038/student/delete/" + idToDelete)
      .then((response) => {
        this.setState({
          show: true,
          message: response.data.message,
          title: response.status === 200 ? "Success" : "Error",
          idToDelete: "",
          students:
            response.status === 200
              ? students.filter((e) => {
                  return e.id !== idToDelete;
                })
              : students,
        });
      });
  };

  render() {
    const { students, message, showModalDelete } = this.state;

    const columns = [
      {
        dataField: "id",
        text: "ID",
        hidden: true,
      },
      {
        dataField: "name",
        text: "Name",
      },
      {
        dataField: "lastname",
        text: "Last Name",
      },
      {
        dataField: "birthdate",
        text: "Birth date",
        type: "date",
      },
      {
        dataField: "gender",
        text: "Gender",
      },
      {
        dataField: "university",
        text: "University",
      },
      {
        dataField: "More Information",
        text: "More Information",
        align: "center",
        formatter: () => {
          return <BsFillPersonFill />;
        },
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            this.props.history.push("student/get/" + row.id);
          },
        },
      },
      {
        dataField: "delete",
        text: "Delete",
        align: "center",
        formatter: () => {
          return <BsTrash />;
        },
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            this.setState({ showModalDelete: true, idToDelete: row.id });
          },
        },
      },
    ];

    return (
      <Container fluid className="mt-5 pl-5 pr-5">
        <div className="text-right pb-4">
          <Button href="/student/add" variant="primary">
            Add Student
          </Button>
        </div>

        <BootstrapTable
          keyField="id"
          data={students}
          columns={columns}
          noDataIndication="There are not students"
          pagination={paginationFactory()}
        />

        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: !this.state.show })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ show: !this.state.show });
                this.props.history.push("/");
              }}
            >
              Go Back
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showModalDelete}
          onHide={() =>
            this.setState({ showModalDelete: !this.state.showModalDelete })
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Attention!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              You are about to delete one student, this procedure is
              irreversible.
            </p>
            <p>Do you want to proceed?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({ showModalDelete: !showModalDelete });
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ showModalDelete: !showModalDelete });
                this.handleSummit();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default TableInicial;
