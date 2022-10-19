import React from 'react'
import App from './App'; 

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      regged:false,
      passwordError:"",
      credentials:{
        username: "",
        password: "",
        email:""
      }
    }
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCookie = this.getCookie.bind(this);

  };
  handleChange(e){
    var value = e.target.value
    if(e.target.name === "username"){
      this.setState({
        credentials : {
          ...this.state.credentials,
          username: value
        },
      })
    }
    if(e.target.name === "email"){
      this.setState({
        credentials : {
          ...this.state.credentials,
          email: value
        },
      })
    }
    if(e.target.name === "password"){
      this.setState({
        credentials : {
          ...this.state.credentials,
          password: value
        },
      })
    }
    if(e.target.name === "confirm-password"){
      if(value === this.state.credentials.password){
        this.setState({
          passwordError : ""
        })
      }else{
        this.setState({
          passwordError : "Passwords Does not match"
        })
      }
    }
  }

  validate(){
    if (this.state.credentials.email !== "" && 
        this.state.credentials.password !== "" &&
        this.state.credentials.username !== "" 
    ) {
      return true
    }
    return false
  }

  handleSubmit(e){
    if(this.state.passwordError === "" && this.validate()){    
      e.preventDefault()
      var csrfToken = this.getCookie('csrftoken')
      var url = 'http://127.0.0.1:8000/userapi/register/'
      
      fetch(url,{
        method : 'POST',
        headers : {
          'Content-type' : 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(this.state.credentials)
      })
      
      .then(response => response.json())
      .then(data =>{
        if (data === "noice"){
          this.setState({
            regged: true
          })
        }else{
          this.setState({
            regged: false
          })
        }
      })

    }
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }


  render() {
    if (this.state.regged === true) {
      return (<App/>)
    }
    else{  
      return (
        <div className="container">
          <div id="task-container">
            <div id="form-wrapper">
              <form onSubmit={this.handleSubmit} action="" id="form">
                <div className="flex-wrapper">
                  <div  style={{flex: 6}} >
                    <input onChange={this.handleChange} type="text" className="   form-control" id='username' name='username' placeholder='Username' />
                    <input onChange={this.handleChange} type="email" className="   form-control" id='email' name='email' placeholder='Email' />
                    <input onChange={this.handleChange} type="password" className="mt-1  form-control" id='password' name='password' placeholder='Password' />
                    <input onChange={this.handleChange} type="password" className="mt-1  form-control" id='confirm-password' name='confirm-password' placeholder='Confirm Password' />
                    
                    <span className="text-danger">{this.state.passwordError}</span>
                    <button type="submit" className="mt-2 btn-block btn btn-outline-warning">Register</button>
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }
}
export default Register;


