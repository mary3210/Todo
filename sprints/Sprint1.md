# Sprint 1: React Router

We're going to use React Router to handle our views. However, it isn't necessary for this application. We're really just going for exposure here. There's a lot to learn about react router and we'll just be scratching the surface. If you want to dive deeper, checkout [this tutorial](https://github.com/reactjs/react-router-tutorial)

We need a way to link to various urls to components in our application, mimicking traditional browser behaviour of changing from one page to another. This Todo app's pages will just be the root url and a url to all todos(`/` and `/todos`)

### Creating Routes
Routes in React are just React components as well! Since we've installed the `react-router-dom` dependency, we'll start by wrapping our `App` Component in a `BrowserRouter` component available to us from `react-router-dom`. 

In `src/index.js`:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <App />
  </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

Now, in `src/App.js`, let's add 2 routes for '/' and '/todos': 

```js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TodosContainer from './containers/TodosContainer';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route exact path='/' element={ <Home /> }/>
        <Route path='/todos' element={ < TodosContainer /> }/>
      </Routes>
    </div>
  );
};

export default App;
```

We use the `Routes` component from `react-router-dom` to tell our app to Routes between different routes, depending on the URL. Then, we use the `Route` component, also given to us by `react-router-dom` to create a route for the root path(`'/'`). We also establish that the component that should be rendered here is a `Home` component. There is a second route for the path `/todos`, which should route to a `TodosContainer` component.

This will immediately ERROR our code out, because we don't actually have those files with those components defined. Take some time now to create a `Home` component with some dummy text inside (e.g. "I am the Home page"). Do the same for the `TodosContainer` component (e.g. "I am the TodosContainer page").

```bash
$ mkdir src/components
$ touch src/components/Home.js
$ mkdir src/containers
$ touch src/containers/TodosContainer.js
```

Now that you've created those files, make sure to add a simple React component inside each of them.

Inside the  `components/Home.js` React component add the following code:
  
```js
// components/Home.js
import React from 'react';

const Home = () => {
  return (
    <h2>
      I am the Home page
    </h2>
  );
};

export default Home;
```
  
In the `containers/TodosContainer` React component add the following code:
  
```js
// containers/TodosContainer.js
import React, {useState} from 'react';

const TodosContainer = () => {

    return (
      <h2>
        I am the TodosContainer page
      </h2>
    );

};

export default TodosContainer;
```

> Something that's weird is that we imported `React` from `'react'` but then we imported `{Route}` from `'react-router-dom'`. What's with the curly braces? In the latter case we're only importing a specific module of the `react-router-dom` package. If we had omitted the curly braces, it would have grabbed all of `react-router-dom`'s functionality. Check out the [react-router-dom source code](https://github.com/ReactTraining/react-router/tree/master/packages/react-router/docs/api) and we can clearly see the Route is a module within react-router-dom


Great, we should now be able to see our `Home` component's "I am the Home page" show up on `localhost:3000`! Going to `localhost:3000/todos` should show "I am the TodosContainer page".



### A Simple Component
Before we add another route, let's create a `Header` component to show up across all of our app's pages. 

In `src/App.js`:

```js
import React from 'react';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TodosContainer from './containers/TodosContainer';

function App() {
  return (
    <div className="container">
      <Header/>
      <Routes>
        <Route exact path='/' element={ <Home /> }/>
        <Route path='/todos' element={ < TodosContainer /> }/>
      </Routes>
    </div>
  );
};

export default App;
```

This will immediately error our code base out, why?

That's right, we don't actually have a `Header` component defined in our codebase. Let's create it:

```bash
$ touch src/components/Header.js
```

In `src/components/Header.js`:

```js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>ToDo</h1>
      <nav> 
        <Link to={'/'}>Home</Link>
        <Link to={'/todos'}>Todos</Link>
      </nav>
    </header>
  );
};

export default Header;
```

In this file, we've imported some dependencies and stored them in variables and then defined a component. The `Link` component is exactly what it says it is, a component that will link to one of the Route components using a path stored in the `to` attribute/prop. 

Awesome! We now have a header showing up! Click between the `Home` and `Todos` links. It should route to your `Home` and `TodosContainer` components.

Before moving on, let's refactor so all our routes live neatly squared away in a separate file. This refactor is overkill for a Todo app but it gives us a chance to write code that more closely resembles how larger scale React apps manage routing. Start by creating the folder and file for this config file:

```bash
mkdir src/config/
touch src/config/routes.js
```

In your `config/routes.js` file, copy and paste the routes from your `App` component:

```js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import TodosContainer from '../containers/TodosContainer';

export default (
  <Routes>
    <Route exact path='/' element={ <Home /> }/>
    <Route path='/todos' element={ < TodosContainer /> }/>
  </Routes>
);
```

The syntax here is new but isn't particularly tricky. This file imports components from `react-router-dom`, invokes them, and exports that component structure for use in other files.

Then, edit your `App.js` file to no longer have hard-coded routes, and to reference the routes in your `config/routes.js` file instead:

```js
import React from 'react';
import Header from './components/Header';
import routes from './config/routes';

function App() {
  return (
    <div className="container">
      <Header/>
      { routes }
    </div>
  );
};

export default App;
```

Make sure your routes still work, before moving on.

Great! Now, let's talk about [Sprint 2: Containers](Sprint2.md)
