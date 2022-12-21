## Sprint 4: Creating Todos
We're going to create a component that contains a form that will allow a user to create todos. Before we build this feature, you should know that this sprint is going to explore some concepts in React that are relatively new to us; namely, using state to hold onto form data until the user is ready to submit that data.

Let's create a file `src/components/CreateTodoForm.js` and fill it out with the following:

```js
import React, { useState, useEffect } from 'react';

const CreateTodoForm =() => {
  const [todo, setTodo] = useState("")
  
  const onInputChange = (e) => {
      setTodo(e.target.value),
  };
  
  const onFormSubmit = (e) => {
    e.preventDefault();
    props.createTodo(todo);
    setTodo(")
  };
  

    return (
      <div>
        <form onSubmit={onFormSubmit} id="taskForm">
          <input  
            onChange={onInputChange} 
            type="text" id="newItemDescription" 
            placeholder="What do you need to do?" 
            value={todo}
          />
          <button type="submit" id="addTask" className="btn">Add Todo</button>
        </form>
      </div>
    );
  
};

export default CreateTodoForm;
```

Let's review and focus on what we're rendering (don't type this next block, we should already have it):

```js

  return (
    <div>
      <form onSubmit={onFormSubmit} id="taskForm">
        <input  
          onChange={onInputChange} 
          type="text" id="newItemDescription" 
          placeholder="What do you need to do?" 
          value={todo}
        />
        <button type="submit" id="addTask" className="btn">Add Todo</button>
      </form>
    </div>
  );

```

We define the initial state of the form in the `todo` variable at the top of the component definition.

Looks like a form. When it gets submitted we run a function using the `onSubmit` event handler prop in the `form` element.

Similarly when the `input` is changed we capture that event with the `onChange` event handler prop and run a function to update state with the user's new input.


Let's take a look at the `onInputChange` function first:

```js
  const onInputChange = (e) => {
      setTodo(e.target.value),
  };
```

Basically whenever this input changes, we're going to set the state of this component to have a property of `todo` and it's value is whatever the input field's value is.

`onFormSubmit`:

```js
  const onFormSubmit = (e) => {
    e.preventDefault();
    props.createTodo(todo);
    setTodo(")
  };
```

First off, prevent the default action (form submission will cause a request to fire), then instantiate a variable `todo` from the state. Lastly, we also set the `todo` property of the state as an empty string. We skipped one line though, `props.createTodo(todo)`. What does the syntaxt of that line tell us about where `createTodo` comes from?

If you said "props", you're right. It needs to be supplied from its parent component. Let's update the `src/containers/TodosContainer.js` so that we can successfully create todos:

In `src/containers/TodosContainer.js`:  

```js
// At the top import the component
import CreateTodoForm from '../components/CreateTodoForm';

...

const createTodo = (todo) => {
    let newTodo = {
        body: todo,
        completed: false,
    };
    
    TodoModel.create(newTodo).then((res) => {
        let todos = todos.slice();
        todos.push(res.data);
        setState({ todos: todos });
    });
};

render() {
  return (
    <div className="todosComponent">
      <CreateTodoForm
        createTodo={createTodo} />

      <Todos
        todos={todos} />
    </div>
  );
};
```

We see that we pass the `createTodo` function of THIS container component TO the `CreateTodoForm` component.  The `this` inside the methods actually refers to the context of the component - meaning that the `this` keyword refers to the component where the function is defined. 

In the actual `createTodo` function. We can see that we construct everything we need about a todo in an object and store it in a variable. We then pass that object to a `.create` method on our `TodoModel` that ... hasn't been defined yet. Let's define it now. In `src/models/Todo.js`:

```js
static create = (todo) => {
  let request = axios.post(endPoint, todo);
  return request;
};
```

Using axios, we create the `todo`. In the promise, we fetch all the `todos` and set the state to encapsulates those `todos` from the response.

## Backtrack - How did we pass state from child to parent?

Remember that in the submit event of the form, we used a function `props.createTodo()`:

In `src/components/CreateTodoForm`:

```js
onFormSubmit = (event) => {
  event.preventDefault();
  props.createTodo(todo);
  setTodo('');
};
```

We pass `createTodo` from the container as `props`. In `src/containers/TodosContainer.js`:

```js

  return (
    <div className="todosContainer">
      <CreateTodoForm
        createTodo={ createTodo } />

      <Todos
        todos={state.todos} />
    </div>
  );

```

The argument passed in at the `CreateTodoForm` level(child) was state from that component. And now it updates state at the `TodosContainer` level(parent).

Sweet! Lets go to [Sprint 5: Deleting Todos](Sprint5.md)
