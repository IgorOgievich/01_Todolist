import React from 'react';
import './App.css';

class TodoListTask extends React.Component {
    onIsDoneChanget = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked);
    };
    render = () => {

        let taskClass = this.props.task.isDone ? "todoList-task done" : "todoList-task";

        return (
            <div className={taskClass}>
                <input
                    type="checkbox"
                    checked={this.props.task.isDone}
                onChange={this.onIsDoneChanget}
                />
                <span>{this.props.task.title} --- {this.props.task.priority}</span>
            </div>)
    }
}


export default TodoListTask;
