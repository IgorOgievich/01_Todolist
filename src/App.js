import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    nextTaskId = 1;

    saveState = () => {
      localStorage.setItem("our-state", JSON.stringify(this.state));
    };

    restoreState = () =>{
        let state = this.state;
        let stateAsString = localStorage.getItem("our-state");
        if(stateAsString){
            state = JSON.parse(stateAsString);
        }
        this.setState(state, ()=>{
            this.state.tasks.forEach(task => {
                if(task.id >= this.nextTaskId){
                    this.nextTaskId = task.id + 1;
                }
            })
        });
    };

    componentDidMount() {
        this.restoreState()
    };

    state = {
        tasks: [
            // {id: 0, title: "JS", isDone: true, priority: "medium"},
            // {id: 1, title: "HTML", isDone: false, priority: "low"},
            // {id: 2, title: "Css", isDone: true, priority: "low"},
            // {id: 3, title: "React", isDone: false, priority: "low"}
        ],
        filterValue: "All"

    };
    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId, title: newText, isDone: false, priority: "low"
        };
        this.nextTaskId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        },this.saveState);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, this.saveState);
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t;
            } else {
                return {...t, ...obj};
            }
        });
        this.setState({
            tasks: newTasks
        }, this.saveState)
    };
    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    };
    changeTitle = (taskId, newTitle) => {
        this.changeTask(taskId, {title: newTitle})
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   tasks={this.state.tasks.filter(t => {
                                       if (this.state.filterValue === "All") {
                                           return true;
                                       }
                                       if (this.state.filterValue === "Completed") {
                                           return t.isDone === true;
                                       }
                                       if (this.state.filterValue === "Active") {
                                           return t.isDone === false;
                                       }
                                   })}/>
                    <TodoListFooter changeFilter={this.changeFilter}
                                    filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

