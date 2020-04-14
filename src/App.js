import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";


class App extends React.Component {
    state = {
        todolist:[
            // {id:"01", title: "Home"},
            // {id:"02", title: "Gobs" },
            // {id:"03", title: "Sport" },
        ]
    };

    nextTodoListId = 0;

    saveState = () => {
        localStorage.setItem("todoList-state", JSON.stringify(this.state));
    };

    restoreState = () => {
        let state = this.state;
        let stateAsString = localStorage.getItem("todoList-state");
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state, () => {
            this.state.todolist.forEach(task => {
                if (task.id >= this.nextTodoListId) {
                    this.nextTodoListId = task.id + 1;
                }
            })
        });
    };

    componentDidMount() {
        this.restoreState()
    };

    addTodoList = (newTodoLisName) =>{
        let newTodo ={
            title: newTodoLisName,
            id: this.nextTodoListId
        };
        this.nextTodoListId++;
        this.setState({
            todolist: [...this.state.todolist, newTodo
            ]
        }, this.saveState)
    };

    render= () => {
        let todoList = this.state.todolist.map(t => {
            return  <TodoList id = {t.id}
                              title = {t.title}
                              key = {t.id}
            />
        });
        return (
            <div>
                <div>
                   <AddNewItemForm addItem = {this.addTodoList}/>
                </div>
            <div className="App">
                {todoList}
            </div>
            </div>
        );
    }
}

export default App;