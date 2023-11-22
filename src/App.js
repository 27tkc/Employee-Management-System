/* Tarun Kumar Choudhary - 
Create Employee Update API: 
Using this api update only selected fields of Employee record.
Only allow to modify Title, Department and CurrentStatus
Delete Employee API: Using this api user can delete any selected Employee data
Make UI more professional and add documentation/comment on every function
Finalizing code and Testing */

/* Juan Jacobo Florez Monroy - 
Routing + Navbar : 
Adding Navbar/Side Manu to create links for user to browse on Employee List page, 
Employee Create Page and take functionality create, delete, edit etc on separate pages,
just take to new page and display data of respective functionality, for example 
for delete: just get data , dont handle deletion code
for update: just display data in form, dont handlle edit code
for create : just just display new form, dont handle record creation
for read: it will be displayed in homepage only*/

/* Nikunj Jivrajbhai Anghan - 
add Route parameter/Query parameter to access only specific Employee Type 
ie On the Employee List page create an option for user to List All Employee,
FullTimeEmployee, PartTimeEmployee, ContractEmployee, SeasonalEmployee
*/

/* Shefali Rajnikant Panchal - 
NestedRoutes to Display All the Data of Selected Single Employee on separate page, 
All Details about single Employee, you can use Employee’s MongoDB ID to fetch data about single Employee. 
Create Employee Details API: 
Fetch all the data about single Employee ie similar to SQL => Select * from Tbl where ID=”MongoDB_ID”
Also add functionality to update and delete record, and handle process effeciently
*/

// Importing necessary modules and components from react-router-dom
import { Route, Routes } from "react-router-dom";

// Importing components from their respective files
import EmployeeDirectory from "./Components/EmployeeDirectory";
import Navigation from "./routes/navigation/navigation";
import EmployeeCreate from "./Components/EmployeeCreate";
import EmployeeEditForm from "./Components/EmployeeEditForm";
import EmployeeDetails from "./Components/EmployeeDetails";

// The main App component
function App() {
  return (
    <div className="App">
      {/* Defining routes using react-router-dom's Routes and Route components */}
      <Routes>
        {/* The root route, where Navigation component is always rendered */}
        <Route path="/" element={<Navigation />}>
          {/* Sub-routes for different pages */}
          <Route index element={<EmployeeDirectory />} /> {/* Default route */}
          <Route path="/employee_create" element={<EmployeeCreate />} />
          <Route path="/employee_edit" element={<EmployeeEditForm />} />
          <Route path="/employee_details/:id" element={<EmployeeDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

// Exporting the App component as the default export
export default App;
