import React, { Component } from "react";
import withRouter from "./withRouter"; // Importing the withRouter HOC for accessing route parameters
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
      <div className="container">
        <h1>Employee Details</h1>

        {/* Displaying error message if any */}
        <span>
          <pre>{error}</pre>
        </span>

        {/* Form for displaying employee details */}
        <div>
          {/* Form input fields for various employee details */}
          {/* Each input field is disabled to show information only */}
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={employee?.firstName || ""}
              placeholder="Enter first Name"
              disabled
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={employee?.lastName || ""}
              placeholder="Enter last Name"
              disabled
            />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              id="age"
              value={employee?.age || ""}
              placeholder="Enter age"
              disabled
            />
          </div>
          <div>
            <label htmlFor="dateOfJoining">Date of joining:</label>
            <input
              type="date"
              name="dateOfJoining"
              value={employee?.dateOfJoining || ""}
              id="dateOfJoining"
              placeholder="date of joining"
              disabled
            />
          </div>
          <div>
            <label htmlFor="employeeType">Employee Type:</label>
            <input
              name="employeeType"
              value={employee?.employeeType || ""}
              id="employeeType"
              placeholder="employeeType"
              disabled
            ></input>
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              value={employee?.title || ""}
              name="title"
              placeholder="title"
              disabled
            ></input>
          </div>
          <div>
            <label htmlFor="department">Department:</label>
            <input
              id="department"
              value={employee?.department || ""}
              name="department"
              placeholder="department"
              disabled
            ></input>
          </div>
          <div>
            <label htmlFor="currentStatus">Current Status:</label>
            <input
              id="currentStatus"
              value={employee?.currentStatus || ""}
              name="currentStatus"
              placeholder="currentStatus"
              disabled
            ></input>
          </div>
        </div>
      </div>
    );
  }
}

// Exporting the component with withRouter for accessing route parameters
export default withRouter(EmployeeDetails);
