import React, { Component} from 'react';

const Todo = (props)=>{

    const deleteClickedTodo = () => {
      props.deleteTodo(props.todo);
    };
  
    
      return (
        <li data-todos-index={props.todo._id}>
          <span className="todo-item">{props.todo.body}</span>
          <span
            className='remove'
            onClick={deleteClickedTodo}>
            Remove
          </span>
        </li>
      );
    };
 
  

export default Todo;
