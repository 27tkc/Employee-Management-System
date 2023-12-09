import React, { Component } from "react";
import { Form, Container, Button } from "react-bootstrap";
import withRouter from "../withRouter"; // Importing the withRouter HOC for accessing route parameters
import "./EmployeeDetails.css"; // Importing the CSS file for styling

class EmployeeDetails extends Component {
  constructor() {
    super();
    this.state = {
      employee: {}, // State to store employee data
      error: "", // State to store error messages
    };
  }

  // Lifecycle method called after the component is mounted
  async componentDidMount() {
    const { id } = this.props.params; // Extracting employee ID from the route parameters

    try {
      // GraphQL query with proper type for id
      const GET_EMPLOYEE_BY_ID_QUERY = `
        query GetEmployeeById($id: String) {
          getEmployeeById(id: $id) {
            id
            firstName
            lastName
            age
            dateOfJoining
            title
            department
            employeeType
            currentStatus
          }
        }
      `;

      // Fetching employee data based on ID
      const response = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: GET_EMPLOYEE_BY_ID_QUERY,
          variables: { id },
        }),
      });

      if (response.ok) {
        let { data } = await response.json();

        // Checking if valid employee data is received
        if (data && data.getEmployeeById) {
          // Getting only the date to show it in the form
          const dateOfJoiningSplitted =
            data.getEmployeeById.dateOfJoining.split("T")[0];
          data.getEmployeeById.dateOfJoining = dateOfJoiningSplitted;

          // Setting employee data in the component state
          this.setState({ employee: data.getEmployeeById });
        } else {
          console.error("No employee data found for ID:", id);
          this.setState({ error: "Employee data not found." });
        }
      } else {
        console.error("GraphQL request failed:", response.status);
        this.setState({ error: "Error fetching employee data." });
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      this.setState({ error: "Error fetching employee data." });
    }
  }

  // Rendering the component
  render() {
    const { employee, error } = this.state;

    // If no employee data is available, display an error message
    if (!employee) {
      return <div>Error: {error || "Employee data not available."}</div>;
    }

    // Displaying the employee details in a form
    return (
      <Container className="employee-details-container">
        <h1>Employee Details</h1>

        {/* Displaying error message if any */}
        <span>
          <pre>{error}</pre>
        </span>

        {/* Form for displaying employee details */}
        <Form className="employee-details-form">
          {/* Form input fields for various employee details */}
          {/* Each input field is disabled to show information only */}
          <Form.Group controlId="firstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              value={employee?.firstName || ""}
              placeholder="Enter first Name"
              disabled
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              value={employee?.lastName || ""}
              placeholder="Enter last Name"
              disabled
            />
          </Form.Group>
          <Form.Group controlId="age">
            <Form.Label>Age:</Form.Label>
            <Form.Control
              type="number"
              value={employee?.age || ""}
              placeholder="Enter age"
              disabled
            />
          </Form.Group>
          <Form.Group controlId="dateOfJoining">
            <Form.Label>Date of Joining:</Form.Label>
            <Form.Control
              type="date"
              value={employee?.dateOfJoining || ""}
              placeholder="date of joining"
              disabled
            />
          </Form.Group>
          <Form.Group controlId="employeeType">
            <Form.Label>Employee Type:</Form.Label>
            <Form.Control
              type="text"
              value={employee?.employeeType || ""}
              placeholder="employeeType"
              disabled
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={employee?.title || ""}
              placeholder="title"
              disabled
            />
          </Form.Group>
          <Form.Group controlId="department">
            <Form.Label>Department:</Form.Label>
            <Form.Control
              type="text"
              value={employee?.department || ""}
              placeholder="department"
              disabled
            />
          </Form.Group>
          <Form.Group controlId="currentStatus">
            <Form.Label>Current Status:</Form.Label>
            <Form.Control
              type="text"
              value={employee?.currentStatus || ""}
              placeholder="currentStatus"
              disabled
            />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

// Exporting the component with withRouter for accessing route parameters
export default withRouter(EmployeeDetails);
