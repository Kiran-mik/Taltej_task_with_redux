import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import * as actions from "./actions";
import swal from 'sweetalert';
import axios from "axios";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure()

class EmpList extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      name: "",
      salary: "",
      age: "",
      userId: "",
      err: {},
      userListing: [],
      modalIsOpen: false
    };
  }

  componentDidMount() {
    this.employeList();
  }
  //Listing
  employeList = () => {
    axios({
      url: "http://dummy.restapiexample.com/api/v1/employees",
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
      .then(resp => {
        if (resp && resp.data && resp.data.data) {
          this.setState({ userListing: resp.data.data });
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  //view
  viewDetails = (userID) => {
    this.props.login(userID);
    this.props.history.push("/details");
  };

  //changing input values
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //model open
  openModal = user => {
    if (user) {
      this.setState({
        modalIsOpen: true,
        name: user.employee_name,
        age: user.employee_age,
        salary: user.employee_salary,
        userId: user.id
      });
    } else {
      this.setState({
        modalIsOpen: true,
        name: "",
        age: "",
        salary: "",
        userId: ""
      });
    }
  };

  //close(add/edit) details
  closeModal = () => {
    let { userId, name, salary, age } = this.state;
    let data = { name, age, salary: salary };
    var method;
    var url;
    var msg
    if (userId === "") {
      method = "post";
      url = "http://dummy.restapiexample.com/api/v1/create";
      msg='Employee details added successfully'
    } else {
      method = "put";
      url = `http://dummy.restapiexample.com/api/v1/update/${userId}`;
      msg='Employee details updated successfully'
    }
    if (this.validator.allValid()) {
      axios({
        url: url,
        method: method,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data)
      })
        .then(resp => {
          toast.success(msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          this.setState({ modalIsOpen: false, userId: "" },()=>this.employeList());
        })
        .catch(err => {
          alert(err);
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  //delete
  deleteEmp=(eid)=>{
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        axios({
          url: `http://dummy.restapiexample.com/api/v1/delete/${eid.id}`,
          method: "delete",
          headers: { "Content-Type": "application/json" }
        })
          .then(resp => {
            if(resp.data.status==='success'){
              swal("Deleted!", "", "success");
              this.employeList()
            }else{
              alert('Error')
            }
          })
          .catch(err => {
            alert(err);
          });
    
      }
    });
  
  }

  render() {
    let { userListing, name, age, salary } = this.state;
    return (
      <div>
        <h1>Employee List</h1>
        <button type="button" onClick={() => this.openModal()}>
          Add Employee
        </button>
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Profile Image</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>View</th>
          </tr>
          {userListing.length > 0 ?
            userListing.map((user, key) => {
              return (
                <tr key={key}>
                  <td>{user.employee_name}</td>
                  <td>{user.employee_age}</td>
                  <td>{user.employee_salary}</td>
                  <td>
                    <button type="button">Download</button>
                  </td>
                  <td>
                    <button type="button" onClick={() => this.openModal(user)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => this.deleteEmp(user)} >Delete</button>
                  </td>
                  <td>
                    <button type="button" onClick={() => this.viewDetails(user)}>
                      View
                    </button>
                  </td>
                </tr>
              );
            }) : 'Loading...'}
        </table>

        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <div>Add/update user details</div>
            <form>
              Name:{" "}
              <input
                type="text"
                value={name}
                name="name"
                placeholder="Enter Name"
                onChange={e => this.handleChange(e)}
              />
              {this.validator.message("name", this.state.name, "required|name")}
              Age :{" "}
              <input
                type="number"
                value={age}
                name="age"
                placeholder="Enter Age"
                onChange={e => this.handleChange(e)}
              />
              {this.validator.message("age", this.state.age, "required|age")}
              Salary:{" "}
              <input
                type="number"
                value={salary}
                name="salary"
                placeholder="Enter salary"
                onChange={e => this.handleChange(e)}
              />
              {this.validator.message(
                "salary",
                this.state.salary,
                "required|salary"
              )}
              <button type="button" onClick={() => this.closeModal()}>
                Submit
              </button>
              <button
                type="button"
                onClick={() =>
                  this.setState({ modalIsOpen: false, userId: "" })
                }
              >
                Cancel
              </button>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(EmpList));
