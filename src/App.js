import logo from './logo.svg';
import './App.css';
import React from 'react';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store = {store} >
      <InputTodo></InputTodo>
      <TodoList></TodoList>
    </Provider>
  );
}

export default App;
