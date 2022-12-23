import CreateTodoForm from '../components/CreateTodoForm'
import React, { useState, useEffect } from 'react';
import TodoModel from '../models/Todo';
import Todos from '../components/Todos';

    function TodosContainer () {
        const [todos, setTodos] = useState([])
      
      
          useEffect(()=>{
          TodoModel.all().then((res) => {
          //   console.log(res);
            setTodos(res)
          });
        },[])
      
        const createTodo = (todo) => {
            let newTodo = {
                body: todo,
                completed: false,
            };
        
            TodoModel.create(newTodo).then((res) => {
                let todos = todos.slice();
                todos.push(res.data);
                setTodos({ todos: todos });
            });
        };
        
    


        
          return (
            <div className="todosContainer">
            <CreateTodoForm
              createTodo={ createTodo } />
            <Todos
              todos={this.props.todos} />
          </div>
          );
      }
    
    
      export default TodosContainer;