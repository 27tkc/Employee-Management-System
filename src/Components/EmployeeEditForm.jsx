import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EmployeeEditForm.css";

const EmployeeEditForm = () => {
  // useNavigate hook for navigation
  const navigate = useNavigate();

  // useLocation() hook to get the props passed from the EmployeeTable component.
  const location = useLocation();
  const editedEmployee = location.state;

  // Parsing to Date and getting only the date to show it in the form
  if (editedEmployee.dateOfJoining instanceof Date) {
    const dateOfJoiningFormatted = editedEmployee.dateOfJoining
      .toISOString()
      .split("T")[0];
    editedEmployee.dateOfJoining = dateOfJoiningFormatted;
  }

  // Define state variables and functions to update them
  const [error, setError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(editedEmployee);

  // Variable for displaying success or error message
  let spanMessage = null;
  if (showMessage) {
    spanMessage = (
      <span className={`${error ? "text-danger" : "text-success"} mb-3`}>
        {message}
      </span>
    );
  }

  // Function to handle the save action on the edit form
  const onSaveEdit = (e) => {
    e.preventDefault();

    fetch("/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation updateEmployee($id: String, $employee: EmployeeInput) {
          updateEmployee(id: $id, employee: $employee) {
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
          id: formData.id,
          employee: formData,
        },
      }),
    })
      .then((res) => res.json())
      .then((body) => {
        const updatedEmployee = body.data.updateEmployee;

        // Reset the error, showMessage, and message
        setError(false);
        setShowMessage(true);
        setMessage(
          "Employee " +
            updatedEmployee.firstName +
            " " +
            updatedEmployee.lastName +
            " updated successfully!"
        );

        // Hides the success message after 3 seconds
        setTimeout(() => {
          setShowMessage(false);
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        // Handle error updating employee
      });
  };

  // Function to handle input changes in the form
  function onEditInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Rendering the component
  return (
    <div className="edit-employee-form modal-content">
      <h3 className="mb-4">Edit Employee Data</h3>
      {spanMessage}
      <form name="editForm">
        {/* Form input fields */}
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            className="form-control"
            name="age"
            value={formData.age}
            placeholder="Age should be between 20-70"
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfJoining">Date of Joining</label>
          <input
            type="date"
            className="form-control"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <select
            name="title"
            className="form-select"
            value={formData.title}
            onChange={onEditInputChange}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            name="department"
            className="form-select"
            value={formData.department}
            onChange={onEditInputChange}
          >
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="employeeType">Employee Type</label>
          <select
            name="employeeType"
            className="form-select"
            value={formData.employeeType}
            disabled
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Intern">Intern</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="currentStatus">Current Status</label>
          <select
            name="currentStatus"
            className="form-select"
            value={formData.currentStatus}
            onChange={onEditInputChange}
          >
            <option value="Working">Working</option>
            <option value="Retired">Retired</option>
          </select>
        </div>

        {/* Button group for Save and Cancel actions */}
        <div className="button-group">
          <button
            type="submit"
            className="btn btn-info me-3"
            onClick={onSaveEdit}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEditForm;
