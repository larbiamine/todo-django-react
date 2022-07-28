import React  from 'react'
import './App.css';



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
      editing: false
    }
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.setCompleted = this.setCompleted.bind(this);
  };

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
   console.log("fetching");
   fetch('https://listodoo.herokuapp.com/api/task-list')
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

    if(this.state.editing){
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

  deleteItem(task){
    var csrfToken = this.getCookie('csrftoken')
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
    return (
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
                <div key={index} className='task-wrapper flex-wrapper'>
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
    )
  }
}


export default App;
