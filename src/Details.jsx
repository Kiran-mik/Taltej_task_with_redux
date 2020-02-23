import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      salary: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    if (this.props.uDetails && this.props.uDetails.userDetails) {
      let userID = this.props.uDetails.userDetails.userDetails;
      console.log(userID);
      this.setState({
        name: userID.employee_name,
        age: userID.employee_age,
        salary: userID.employee_salary
      });

      // axios({
      //     url: `http://dummy.restapiexample.com/api/v1/employee/${userID}`,
      //     method: "get",
      //     headers: { "Content-Type": "application/json" }
      //   })
      //     .then(resp => {
      //         console.log(resp);
      //     })
      //     .catch(err => {
      //       alert(err);
      //     });
    }
  }
  render() {
    let { name, salary, age } = this.state;
    return (
      <div>
        <h1>Employee Details are</h1>
        <h2>Name : {name}</h2>
        <h2>Age : {age}</h2>
        <h2>Salary : {salary}</h2>
        <button type='button' onClick={()=>this.props.history.push('/')}>Go Back</button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  uDetails: state.userDet
});

// export default Login;
export default connect(mapStateToProps, null)(Details);
