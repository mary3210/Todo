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
      
          return (
            <div className="todosComponent">
              <Todos
                todos={todos} />
            </div>
          );
      };
    
      export default TodosContainer;