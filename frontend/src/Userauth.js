import React from 'react'
import Register from './Register'; 
import App from './App'; 
import { useNavigate } from "react-router-dom";
class Userauth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      logged: false,
      status : true,
      login: true,
      logincred:{
        username: "",
        password: ""
      }
    }
    this.register = this.register.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCookie = this.getCookie.bind(this);

  };

  handleChange(e){

    var value = e.target.value
    if(e.target.name == "username"){
      this.setState({
        logincred : {
          
          ...this.state.logincred,
          username: value
        },
      })
    }else{
      this.setState({
        logincred : {
          ...this.state.logincred,
          password: value
        },
      })
    }
    console.log("state", this.state);

  }

  handleSubmit(e){
    e.preventDefault()
    var csrfToken = this.getCookie('csrftoken')
    var url = 'http://127.0.0.1:8000/userapi/login/'

    fetch(url,{
      method : 'POST',
      headers : {
        'Content-type' : 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(this.state.logincred)
    })
    
    .then(response => response.json())
    .then(data =>{
      if (data == "noice"){
        this.setState({
          logged: true
        })
      }else{
        this.setState({
          status: false
        })
      }

    })

  }



  register(){
    this.setState({
        login: false
      }
    )
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
    if (this.state.logged === true) {
      return (<App/>)
    }
    else
    {
      if (this.state.login === true) {
      
      return (
        <div className="container">
          <div id="task-container">
            <div id="form-wrapper">
              <form onSubmit={this.handleSubmit} action="" id="form">
                <div className="flex-wrapper">
                  <div  style={{flex: 6}} >
                    {/* <input onChange={this.handleChange("username")} type="text" className="   form-control" id='title' name='username' placeholder='Username' /> */}
                    <input onChange={this.handleChange} type="text" className="   form-control" id='username' name='username' placeholder='Username' />
                    {/* <input onChange={this.handleChange("password")} type="password" className="mt-1  form-control" id='title' name='password' placeholder='Password' /> */}
                    <input onChange={this.handleChange} type="password" className="mt-1  form-control" id='password' name='password' placeholder='Password' />
                    <button type="submit" className="mt-2 btn-block btn btn-outline-warning">Login</button>
                    <button type="submit" onClick={this.register} className="btn-block btn btn-warning">Register</button>
                    {this.state.status === false ? (
                      <div className=" mt-2 alert alert-danger" role="alert">
                        Bad Username and Password Combination
                      </div>
                      ) : (<strike></strike>)}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }else{
      return (<Register/>)
    }
  }

  }
}
export default Userauth;


