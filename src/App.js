import React, { useState, useEffect } from 'react';
import "./App.css";


function App() {
  const [todos, setTodos] = useState([{ text: 'milk', isDone: false }, { text: 'bread', isDone: true }]);

  const addTodo = text => {
    // take a copy of current todos and add a new todo obj
    const newTodos = [...todos, { text: text, isDone: false }];
    // update state of todos
    setTodos(newTodos);
  }

  const markDone = (index) => {
    // takes a copy of current todos 
    const newTodos = [...todos];
    // change the value of a specific todo obj based on its Index
    newTodos[index].isDone = true;
    // update state
    setTodos(newTodos)
  }

  const deleteTodo = (index) => {
    // takes a copy of current todos 
    const newTodos = [...todos]
    // deletes todo obj based on its Index
    newTodos.splice(index, 1)
    // update state
    setTodos(newTodos)
  }

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((item, index) => (
          <TodoItem
            todo={item}
            key={index}
            index={index}
            markDone={markDone}
            deleteTodo={deleteTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

function TodoForm(props) {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTodo) {
      alert('empty todo');
      // breaks this operation
      return;
    }
    // adds new todo with the fn passed with props
    props.addTodo(newTodo);
    // clear state
    setNewTodo('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="input" type="text" placeholder="add new todo" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
    </form>
  )
}
// props can be also be destructured like this => TodoItem({propName}) & fn components can be made as () => fns
const TodoItem = ({ todo, index, markDone, deleteTodo }) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isDone ? "line-through" : '' }}
    >
      {todo.text}
      <div>
        <button onClick={() => markDone(index)}>done</button>
        <button onClick={() => deleteTodo(index)}>delete</button>
      </div>
    </div>
  )
}


export default App;
