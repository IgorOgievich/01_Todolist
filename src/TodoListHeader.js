import React from 'react';
import './App.css';
import App from "./App";

class TodoListHeader extends React.Component {
    state = {
        error: false,
        title: ""
    };

        newTaskTitleRef = React.createRef();

    onAddTaskClick = () => {
        // let newText = this.newTaskTitleRef.current.value;
        let newText = this.state.title;
        this.setState({title: ""});
        if (newText === "") {
           this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addTask(newText);
        }

    };
    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };
    onKeyPress = (e) => {
        if(e.key === "Enter"){
            this. onAddTaskClick();
        }
    };
    render = () => {
        let classForError = this.state.error ? "error" : "";
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input type="text" placeholder="New task name"
                           ref={this.newTaskTitleRef}
                           className={classForError}
                           onChange={this.onTitleChanged}
                           onKeyPress={this.onKeyPress}
                           value={this.state.title}
                    />
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );

    }
}


export default TodoListHeader;
