import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate } from "react-router-dom";

class EmployeeSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      searchOption: "firstName",
      placeholder: "Search",
    };
  }

  /**
   * Function that updates the searchOption value.
   * @param {*} e
   */
  updateSearchOption = (e) => {
    const searchOptionSelected = e.target.value.trim();
    this.setState({ searchOption: searchOptionSelected });

    // switch statement that changes the searchText value to the default value for employeeType and currentStatus options.
    switch (searchOptionSelected) {
      case "employeeType":
        this.setState({ searchText: "Full-Time" });
        break;
      case "currentStatus":
        this.setState({ searchText: "Working" });
        break;
      default:
        this.setState({ searchText: "" });
        return false;
    }

    // If statement that changes the search box placeholder based on the selected option.
    if (e.target.value === "dateOfJoining") {
      this.setState({ placeholder: "Examples: Sun or 12 or Sun Jun 13 2021" });
    } else {
      this.setState({ placeholder: "Search" });
    }
  };

  /**
   * Function that updates the value of searchText every time the user enters a value in the search box.
   * @param {*} e
   */
  updateSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  /**
   * Function that passes the search text and the search option into the employeeSearch function to perform the search.
   */
  filterEmployee = () => {
    const { employeeSearch } = this.props;
    employeeSearch(this.state.searchText, this.state.searchOption);
  };

  // Function to reset the search and reload all employees
  resetSearch = () => {
    this.setState({
      searchText: "",
      searchOption: "firstName",
      placeholder: "Search",
    });
    const { employeeSearchReset } = this.props;
    employeeSearchReset();
  };

  render() {
    let searchElement = null;
    // If statement that changes the searchElement based on the selected search option.
    if (this.state.searchOption === "employeeType") {
      searchElement = (
        <select
          className="form-select"
          name="employeeType"
          onChange={this.updateSearchText}
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Intern">Intern</option>
          <option value="Contract">Contract</option>
        </select>
      );
    } else if (this.state.searchOption === "currentStatus") {
      searchElement = (
        <select
          className="form-select"
          name="currentStatus"
          onChange={this.updateSearchText}
        >
          <option value="Working">Working</option>
          <option value="Retired">Retired</option>
        </select>
      );
    } else {
      searchElement = (
        <input
          className="form-control"
          type="text"
          value={this.state.searchText}
          placeholder={this.state.placeholder}
          onChange={this.updateSearchText}
        />
      );
    }

    return (
      <div className="mt-5">
        <p className="fs-5">Select option to filter your search results</p>
        {/* firstName - Search option */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="searchOptions"
            id="firstName"
            value="firstName"
            onChange={this.updateSearchOption}
            checked={this.state.searchOption === "firstName"}
          />
          <label className="form-check-label" htmlFor="firstName">
            First name
          </label>
        </div>
        {/* lastName - Search option */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="searchOptions"
            id="lastName"
            value="lastName"
            onChange={this.updateSearchOption}
            checked={this.state.searchOption === "lastName"}
          />
          <label className="form-check-label" htmlFor="lastName">
            Last name
          </label>
        </div>
        {/* age - Search option */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="searchOptions"
            id="age"
            value="age"
            onChange={this.updateSearchOption}
            checked={this.state.searchOption === "age"}
          />
          <label className="form-check-label" htmlFor="age">
            Age
          </label>
        </div>
        {/* dateOfJoining - Search option */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="searchOptions"
            id="dateOfJoining"
            value="dateOfJoining"
            onChange={this.updateSearchOption}
            checked={this.state.searchOption === "dateOfJoining"}
          />
          <label className="form-check-label" htmlFor="dateOfJoining">
            Date of Joining
          </label>
        </div>
        {/* title - Search option */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="searchOptions"
            id="title"
            value="title"
            onChange={this.updateSearchOption}
            checked={this.state.searchOption === "title"}
          />
          <label className="form-check-label" htmlFor="title">
            Title
          </label>
        </div>
        {/* department - Search option */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="searchOptions"
            id="department"
            value="department"
            onChange={this.updateSearchOption}
            checked={this.state.searchOption === "department"}
          />
          <label className="form-check-label" htmlFor="department">
            Department
          </label>
        </div>
        {/* employeeType - Search option */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="searchOptions"
            id="employeeType"
            value="employeeType"
            onChange={this.updateSearchOption}
            checked={this.state.searchOption === "employeeType"}
          />
          <label className="form-check-label" htmlFor="employeeType">
            Employee type
          </label>
        </div>
        {/* currentStatus - Search option */}
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="searchOptions"
            id="currentStatus"
            value="currentStatus"
            onChange={this.updateSearchOption}
            checked={this.state.searchOption === "currentStatus"}
          />
          <label className="form-check-label" htmlFor="currentStatus">
            Current status
          </label>
        </div>

        {/* Input group for search and reset buttons */}
        <div className="input-group mb-3">
          {searchElement}
          <button
            className="btn btn-info"
            onClick={this.filterEmployee}
            disabled={!this.state.searchText.trim()}
          >
            Search
          </button>
          <button
            className="btn btn-info"
            onClick={this.resetSearch}
            disabled={!this.state.searchText.trim()}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default EmployeeSearch;
