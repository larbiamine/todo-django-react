import React from 'react'
import App from './App'; 

class Register extends React.Component {

  handleChange(e){
    //var name = e.target.name
    var value = e.target.value
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title: value
      }
    })
  }
  render() {
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
                  <button type="submit" className="mt-2 btn-block btn btn-outline-warning">Register</button>
                  
                  {/* <div class=".col-md-6 .offset-md-3">  
                    
                  </div>  */}

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Register;


