import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React from 'react'
import App from './App'; 
// function Navibar() {
  class Navibar extends React.Component {  
    constructor(props){
      super(props);
      this.state = {
        logged: true
      }
      this.logout = this.logout.bind(this);
 
    };
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
    async logout(e){
      e.preventDefault()
      var csrfToken = this.getCookie('csrftoken')
      // var url = 'http://127.0.0.1:8000/userapi/logout/'
      var url = 'https://listodoo.herokuapp.com/userapi/logout/'
    
      await fetch(url,{
        method : 'POST',
        headers : {
          'Content-type' : 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: ""
      })
      .then(response => response.json())
      .then(data =>{
        this.setState({
          logged: false
        })
        
  
      })
      window.location.reload(false);
    }
    render (){
      if (this.state.logged === true) {
        return(
        <>
          <br />
          <Navbar bg="light" variant="light" fixed="top" >
            <Container>
              <Navbar.Brand href="#home">Your Todo List</Navbar.Brand>
              <Nav className="me-auto">
                {this.props.auth === false ? (
                  <></>
                ) : (
                <>
                <Navbar.Text>
                  Hello <a>{this.props.username}</a>  
                </Navbar.Text>
                <Button onClick={this.logout} variant="outline-danger" size="sm">LOGOUT</Button>
                </>  )}
              </Nav>
            </Container>
          </Navbar>
        </>
      )
    }else{
      return (<App auth = {false} />)

    }
  }
}  

export default Navibar;