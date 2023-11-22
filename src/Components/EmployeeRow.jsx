const EmployeeRow = ({ employee }) => {
  return (
    <tr>
      <td>{employee.id}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.age}</td>
      <td>{employee.dateOfJoining}</td>
      <td>{employee.title}</td>
      <td>{employee.department}</td>
      <td>{employee.employeeType}</td>
      <td>{employee.currentStatus}</td>
    </tr>
  );
};

export default EmployeeRow;
