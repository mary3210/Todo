# Sprint 3: Fetching Data with Axios

React relies on third party libraries to fetch data - it doesn't have that functionality built in like some other frameworks. Today, we'll be using a library called [Axios](https://github.com/mzabriskie/axios), a promise based HTTP client for the browser and node (a good alternatvie is the Fetch API built right into modern browsers). 

Let's install axios now and also create the folder & file that will contain our database logic:

```bash
$ npm i axios 
$ mkdir src/models
$ touch src/models/Todo.js
```

By keeping API requests in a file of their own, we can access them from any component in the application

Now in `src/models/Todo.js`, we are going to use our beloved super-crud API endpoint of todos to get some data (you can check out the raw json at https://super-crud.herokuapp.com/todos):

```js
import axios from 'axios';

const endPoint = `https://super-crud.herokuapp.com/todos`;

class TodoModel {
  static all = () => {
    let request = axios.get(endPoint);
    return request;
  };
};

export default TodoModel;
```

The Axios API is awesome & intuitive! When we use the `all` method on our `TodoModel`, it will make a get request to our API for *all* todos. We return the request so that we can chain promises to it.

Note also that `all()` is a static method. What does this mean? A **static** method can be called without there being an **instance** of the class containing the **static** method. This will allow us to call `all()` like this:

```js
let todos = TodoModel.all();
```

So, why don't we need to use the `new` keyword?

**Class methods** don't require an instance of the class in order to be called, but an **instance method** does. [More on Static Methods in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Static_methods)

We can't really test out the code in this file in isolation, so we must `import` it into our application in order to test it. The logical place to import this code is in the `TodosContainer` component.

For now, let's toss this in the `TodosContainer`'s `render()` method: this isn't ultimately going to be where we want to call `TodoModel.all()`, but it's a good first step.

In `containers/TodosContainer.js`:

```js
import React, { useState, useEffect } from 'react';
import TodoModel from '../models/Todo';

const TodosContainer = () => {
  useEffect(()=>{
    TodoModel.all().then((res) => {
      console.log(res);
    });
  },[])
    return (
      <div className='todosContainer'>
        <h2>This is a todos container</h2>
      </div>
    );
};

export default TodosContainer;
```

We should see the response from our database as soon as the page loads, we know it's working! Notice that what we want is stored in the `data` attribute of the response. Axios organizes the response like this by default.  

We can now see that everything is working! However, it needs a refactor and we don't see any todos... yet!

Now that we can get our data, let's code how we present that data. It'll be a bit before we connect these pieces and actually see our todos in our app, but just hold on, we'll get there!

### Rendering A Todo
Let's start at the bottom and bubble up. It would be nice if each `todo` element had its own component. Let's create `src/components/Todo.js` and put the following in it:

```js

const ToDo = ()  =>  (
      <li data-todos-index={props.todo._id}>
        <span className="todo-item">{props.todo.body}</span>
      </li> 
);

export default Todo;
```

When we write this component we know that if a `todo` object is passed to it as a `prop`, it will render the body of that `todo` and use the `id` in the `data-todos-index` attribute. So what will be rendering each individual `Todo` component?

### Rendering Todos
We need another component. Its responsibility will be to render all of the todos. Let's create another component `src/components/Todos.js` and fill it with the following:

```js
import React from 'react';
import Todo from './Todo';

const Todos = (props) => {
  let todos = props.todos.map((todo) => {
    return (
      <Todo
        key={todo._id}
        todo={todo} />
    );
  });

  return (
    <ul>
      {todos}
    </ul>
  );
};

export default Todos;
```

In this component, we have a property called todos. When we eventually use this component, we need to pass it that property. Once we have our todos, it takes each one and maps a `Todo` component to the variable `todos`. Then renders all of the todos. We can use the map function to render multiple components for each individual todo and store them in a variable. We just need to make sure we bind `this` in case we need to access properties from the `Todos` component later.

### Putting it all together, at last! Todos

Let's shove the remaining code we need in and then let's talk about it. In `src/containers/TodosContainer.js`:

```js
import React, { useState, useEffect } from 'react';
import TodoModel from '../models/Todo';
import Todos from '../components/Todos';

class TodosContainer extends Component {
  const [todos, setTodos] = useState([])
  
  
    useEffect(()=>{
    TodoModel.all().then((res) => {
    //   console.log(res);
      setTodos(res)
    });
  },[])
  
  render() {
    return (
      <div className="todosComponent">
        <Todos
          todos={todos} />
      </div>
    );
  };
};

export default TodosContainer;
```

If we take a look at our browser now... BAM todos! What just happened....


```js
useEffect(()=>{
    TodoModel.all().then((res) => {
    //   console.log(res);
      setTodos(res.data)
    });
  },[])
```

This function leverages our model to retrieve our `todos` from our backend. In the promise of that request we set the state of this container component to have `todos` be the value returned from the response. Any time `useState` hook is invoked the component re-renders.


### Hooks
Every component in react undergoes a component lifecycle. There are several "hooks" throughout this lifecycle. You can think of hooks like events that we can trigger functionality on. In class based components`componentDidMount` and useEffect serves a similar (but more flexible) purpose - rerender the component after the original 'mounting' of the component.  There are many hooks, this is a [great blog post](https://tsh.io/blog/react-component-lifecycle-methods-vs-hooks/) that goes into much better detail of the lifecycle of a component.


You might be asking yourself: "Wait, why are we getting the data after the components already been rendered?" ([Andy did too](http://stackoverflow.com/questions/39338464/reactjs-why-is-the-convention-to-fetch-data-on-componentdidmount))

That's because a re-render will always happen because fetching data happens asynchronously. Here's the [Facebook recommendation](https://reactjs.org/docs/hooks-effect.html#example-using-hooks)

### Passing State from parents to children
How have we passed state? What do we mean by state with reference to a react component? The state of the `TodosContainer` is simple, the todos. How does each individual todo know about the todo they need to render? From the state of the most parent container, `TodosContainer`.

If we take a look at the `props` being passed from one component to the next, we can clearly see the chain of how information was passed.

In `src/containers/TodosContainer.js`:


```javascript  
<Todos
  todos={state.todos} />
```

In `src/components/Todos.js`:  

```js
let todos = props.todos.map((todo) => {
  return (
    <Todo
      key={todo._id}
      todo={todo}
    />
  );
});
```

In `src/components/Todo.js`:

```js
  <li data-todos-index={props.todo._id}>
    <span className="todo-item">{props.todo.body}</span>
  </li> 
```

### PAUSE - Why is this awesome?
We could stop the lesson here and take this knowledge and build lots of cool things with it. Most of the API's developers have access to are read-only. That said, if we know an endpoint to get data, we now know how to use React to display that data.

Upwards and onwards to [Sprint 4: Creating Todos](Sprint4.md)
