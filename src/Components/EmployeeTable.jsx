import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class EmployeeTable extends Component {  

  constructor(props) {
    super(props);
    this.state = {      
      editedEmployee: null,
      shouldRedirect: false,
      pagetoRedirect: "",
    };
  }

  /**
   * Function to handle the clicks on the edit button.
   * 
   * @param {*} employee Employee to edit.
   */
  handleEditClick = (employee) => {  
    this.setState({      
      editedEmployee: { ...employee },     
      shouldRedirect : true,
      pagetoRedirect: "edit",      
    });       
  };

  /**
   * Function to handle the clicks on the details button.
   * 
   * @param {*} employee Employee to edit.
   */
  handleDetailsClick = (employee) => {  
    this.setState({      
      editedEmployee: { ...employee }, 
      shouldRedirect:true,
      pagetoRedirect:"details"  
        
    });
  };

  /**
   * Function that executes when the Delete button is clicked, gets the employee id to be deleted
   * and passes it to the deleteEmployee function of the EmployeeDirectory component.
   * 
   * @param {*} employeeId Employee id to be deleted
   */
  handleDeleteEmployee = (employeeId) => {
    this.props.deleteEmployee({
      employeeId,
    });
  };

  render() {    
    const { employees } = this.props;
    const { editedEmployee } = this.state;

    // If statement that validates if shouldRedirect is true to redirect to a new page.
    if (this.state.shouldRedirect) {

      const pagetoRedirect = this.state.pagetoRedirect;

      switch(pagetoRedirect){
        case "edit":
          return <Navigate to="/employee_edit" state={editedEmployee} />;      
        case "details":
          return <Navigate to={`/employee_details/${editedEmployee.id}`} />;  
        default:
          break;
      }        
    }

    const employeesRow = employees.map((employee) => (
      <tr key={employee.id}>
        <td>{employee.id}</td>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.age}</td>
        <td>
          {employee.dateOfJoining != null
            ? employee.dateOfJoining.toDateString()
            : ""}
        </td>
        <td>{employee.title}</td>
        <td>{employee.department}</td>
        <td>{employee.employeeType}</td>
        <td>{employee.currentStatus}</td>
        <td>        
          <button className="btn btn-outline-info me-2" onClick={() => this.handleDetailsClick(employee)} >
            Details
          </button>
          <button className="btn btn-outline-info me-2" onClick={() => this.handleEditClick(employee)}>
            Edit
          </button>
          <button className="btn btn-outline-info" onClick={() => this.handleDeleteEmployee(employee.id)}>
            Delete
          </button>
          
        </td>
      </tr>
    ));

    return (

      <div>
        <div className="mt-5">
            <table className="bordered-table" width="100%">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Date of Joining</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Employee Type</th>
                  <th>Current Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{employeesRow}</tbody>
            </table>
          </div>
      </div>

      
    );
  }
}

export default EmployeeTable;
