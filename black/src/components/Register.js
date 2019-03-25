import React from "react";
import PropTypes from 'prop-types';
import axios from 'axios'
import {withRouter} from 'react-router-dom'


class Register extends React.Component {


  state = {
    name:'',
    email:'',
    password:'',
    res:null,
    errors:''
  }

  onChange = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  onSubmit = (e) =>{
    e.preventDefault();
      const userData = {
        name:this.state.name,
        email:this.state.email,
        password:this.state.password,
      }
    axios.post('api/users/register',userData)
      .then(res=>{
          console.log(res)
          localStorage.setItem('key',res.data._id)
          this.props.getData(userData)
        this.props.history.push('/')
        }
      )
      .catch(err=>{
        console.log(err.response)
        this.setState({errors:err.response.data.error})
      })
  }

  render() {
    const {errors} =this.state
    return (
      <div className="searchForm">
        <form className="input-group" onSubmit={this.onSubmit}>
          <input placeholder='Your name'
                 onChange={this.onChange}
                 required
                 value={this.state.name}
                 type="text"
                 name='name'/>
          <input placeholder='Your email'
                 onChange={this.onChange}
                 required
                 value={this.state.email}
                 type="email"
                 name='email'/>
          <input placeholder='Password'
                 onChange={this.onChange}
                 required
                 value={this.state.password}
                 type="text"
                 name='password'/>
          <input type="submit" className='btn btn-submit' />
          {errors && (<div>{errors}</div>)}
        </form>
      </div>
    );
  }
}



export default withRouter(Register);
