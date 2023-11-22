// Importing necessary modules and CSS file
import React, { Component } from "react";
import "./EmployeeCreate.css"; // Importing your CSS file

// EmployeeCreate component
class EmployeeCreate extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      showMessage: false,
      message: "",
    };
  }

  /**
   * Function responsible for validating the user entries and, if they are valid, creating the new employee.
   * @param {*} e - Event object
   */
  handleSubmit = (e) => {
    e.preventDefault();

    // Validate age range
    if (
      parseInt(e.target.age.value) >= 20 &&
      parseInt(e.target.age.value) <= 70
    ) {
      // Create employee object from form data
      const employee = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        age: parseInt(e.target.age.value),
        dateOfJoining: new Date(e.target.dateOfJoining.value).toDateString(),
        title: e.target.title.value,
        department: e.target.department.value,
        employeeType: e.target.employeeType.value,
        currentStatus: "Working",
      };

      // GraphQL mutation to add a new employee
      fetch("/graphql", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query: `mutation AddEmployee($employee: EmployeeInput) {
            addEmployee(employee: $employee) {
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
          }`,
          variables: {
            employee,
          },
        }),
      })
        .then((res) => res.json())
        .then((body) => {
          if (body.data.addEmployee) {
            // Display success message and reset form
            const newEmployee = body.data.addEmployee;
            this.setState({
              error: false,
              showMessage: true,
              message:
                "Employee " +
                newEmployee.firstName +
                " " +
                newEmployee.lastName +
                " created successfully!",
            });

            // Hide the success message after 3 seconds
            setTimeout(() => {
              this.setState({
                showMessage: false,
                message: "",
              });
            }, 3000);

            // Clear the form inputs
            e.target.reset();
          } else {
            // Display error message
            this.setState({
              error: true,
              showMessage: true,
              message: "An error occurred, please try again.",
            });
          }
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
        });
    } else {
      // Display error message for invalid age range
      this.setState({
        error: true,
        showMessage: true,
        message: "The age must be between 20 and 70.",
      });
    }
  };

  render() {
    // Display success or error message
    let spanMessage = null;
    if (this.state.showMessage) {
      spanMessage = (
        <span
          className={`${
            this.state.error ? "text-danger" : "text-success"
          } mb-3`}
        >
          {this.state.message}
        </span>
      );
    }

    // Render the form
    return (
      <div className="employee-form">
        <h1>Create New Employee</h1>
        {spanMessage}
        <form name="EmployeeCreate" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              name="age"
              className="form-control"
              placeholder="Age should be between 20-70"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfJoining">Date of Joining</label>
            <input
              type="date"
              name="dateOfJoining"
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <select name="title" className="form-control form-select">
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select name="department" className="form-control form-select">
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="employeeType">Employee Type</label>
            <select name="employeeType" className="form-control form-select">
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Intern">Intern</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="form-group d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Add new Employee
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// Exporting the EmployeeCreate component as the default export
export default EmployeeCreate;
