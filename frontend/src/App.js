import React  from 'react'
import './App.css';
import Navibar from './Navibar'; 
import Userauth from './Userauth'; 

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todoList : [],
      activeItem : {
        id: null,
        title: '',
        completed: false
      },
      editing: false,
      auth: false,
      username: ''
    }
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.setCompleted = this.setCompleted.bind(this);
    this.userAuth = this.userAuth.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  };

  async componentWillMount(){
    await this.userAuth()
    await this.getUsername()
    await this.fetchTasks()
    document.title = "Todo List"  
  }

  userAuth(){
    // check if user is auth
    // var url = 'http://127.0.0.1:8000/userapi/isauth/'
    var url = 'https://listodoo.herokuapp.com/userapi/isauth/'

    fetch(url)
    .then(response => response.json())
    .then(data =>   {
      this.setState({
        auth: data
        //auth: true
      })
    }   
    );
  }

  getUsername(){
    // fetch('http://127.0.0.1:8000/userapi/user/')
    fetch('https://listodoo.herokuapp.com/userapi/user/')
    .then(response => response.json())
    .then(data =>   {
      this.setState({
        username: data
      })
    }   
    );
  }

  fetchTasks(){
   fetch('https://listodoo.herokuapp.com/api/task-list')
  //  fetch('http://127.0.0.1:8000/api/task-list')
   .then(response => response.json())
   .then(data =>  
    this.setState({
      todoList: data
    })
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

  handleSubmit(e){
    e.preventDefault()
    var csrfToken = this.getCookie('csrftoken')
    
    var url = 'https://listodoo.herokuapp.com/api/task-create/'
    // var url = 'http://127.0.0.1:8000/api/task-create/'

    if(this.state.editing){
      // url = `http://127.0.0.1:8000/api/task-update/${ this.state.activeItem.id }/`
      url = `https://listodoo.herokuapp.com/api/task-update/${ this.state.activeItem.id }/`
      this.setState({
        editing: false
      })
    }

    fetch(url,{
      method : 'POST',
      headers : {
        'Content-type' : 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify(this.state.activeItem)
    }).then((response) => {
      this.fetchTasks()
      this.setState({
        activeItem : {
          id: null,
          title: '',
          completed: false
        },
      })

    }).catch(function(error){
      console.log('ERROR',error);
    })
  }

  startEdit(task){

    this.setState({
      activeItem: task,
      editing: true
    })
  }
  forceUpdateHandler(){
    this.forceUpdate() 
  }

  deleteItem(task){
    var csrfToken = this.getCookie('csrftoken')
    // fetch(`http://127.0.0.1:8000/api/task-delete/${ task.id }/`,{
    fetch(`https://listodoo.herokuapp.com/api/task-delete/${ task.id }/`,{
      method: "DELETE",
      headers: {
        'Content-type' : 'application/json',
        'X-CSRFToken' : csrfToken
      },
    } ).then((response)  => {
      this.fetchTasks()
    })
  }

  setCompleted(task){
    task.completed = !task.completed
    var csrfToken = this.getCookie('csrftoken')
    // var url = `http://127.0.0.1:8000/api/task-update/${ task.id }/`
    var url = `https://listodoo.herokuapp.com/api/task-update/${ task.id }/`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({'completed':task.completed, 'title': task.title})
    }).then(() => {
      this.fetchTasks()
    })
  }

  render() {
    var tasks = this.state.todoList
    var self = this
    
    if (this.state.auth === true) {
      return (
        <>
        <Navibar username = {self.state.username} /> 
        
        <div className="container">
          <div id="task-container">
            <div id="form-wrapper">
              <form onSubmit={this.handleSubmit} action="" id="form">
                <div className="flex-wrapper">
                  <div  style={{flex: 6}} >
                    <input onChange={this.handleChange} type="text" className="form-control" id='title' value={this.state.activeItem.title} name='title' placeholder='Enter Task' />
                  </div>
                  <div  style={{flex: 1}} >
                    <input type="submit" className="btn btn-outline-warning" id='submit' name='add' value='Add Task' />
                  </div>
                </div>
              </form>
            </div>
  
            <div id="list-wrapper">
              {tasks.map(function(task, index){
                return(
                  <div key={index} className='ml-4 task-wrapper flex-wrapper'>
                    <div onClick={() => {self.setCompleted(task)}} style={{flex:7}} >
                      {task.completed === false ? (
                        <span>
                          {task.title}
                        </span>
                      ) : (
                        <strike>
                          {task.title}
                        </strike>
                      )}
  
                    </div>
                    <div style={{flex:1}} >
                      <button onClick={() => self.startEdit(task)} className="btn btn-outline-info">Edit</button>
                    </div>
                    <div style={{flex:1}} >
                      <button onClick={ () => self.deleteItem(task) } className="btn btn-outline-dark">-</button>
                    </div>
  
                  </div>
                )
              })}
            </div>
          </div>
        </div> 
      </> 
      )
    }else{
      this.forceUpdateHandler();
      this.setState({
        auth: false
      })
      return (
        <>
          <Navibar auth = {false} /> 
          <Userauth/>
        </>
      )
    }
  }
}


export default App;
