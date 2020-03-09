import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    tasks = [
        {title: "JS", isDone: true, priority:"medium"},
        {title: "HTML", isDone: false, priority:"low"},
        {title: "Css", isDone: true, priority:"low"},
        {title: "React", isDone: false, priority:"low"}
    ];
    filterValue = "Completed";

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader/>
                    <TodoListTasks tasks={this.tasks}/>
                    <TodoListFooter filterValue ={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

