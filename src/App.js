import React, { useState, useEffect } from 'react';
import './App.css';

// Importing components
import Form from './components/Form';
import TodoList from './components/TodoList';
import Todo from './components/Todo';

function App() {

	// States
	const [inputText, setInputText] = useState('');
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState('all');
	const [filteredTodos, setFilteredTodos] = useState([]);

	// Functions
	const filterHandler = () => {
		switch(status) {
			case 'completed':
				setFilteredTodos(todos.filter(todo => todo.completed === true));
				break;
			case 'uncompleted':
				setFilteredTodos(todos.filter(todo => todo.completed === false));
				break;
			default:
				setFilteredTodos(todos);
		}
	}

	// Save local
	const saveLocalTodos = () => {
		localStorage.setItem('todos', JSON.stringify(todos));
	};

	// Get local
	const getLocalTodos = () => {
		if(localStorage.getItem('todos') === null) {
			localStorage.setItem('todos', JSON.stringify([]));
		} else {
			//localStorage.getItem('todos', JSON.stringify(todos));
			let todoLocal = JSON.parse(localStorage.getItem('todos'));
			setTodos(todoLocal);
		}
	};

	//Run only once
	useEffect(() => {
		getLocalTodos();
	}, []);

	// Effects
	useEffect(() => {
		filterHandler();
		saveLocalTodos();
	}, [todos, status]);

	return (
		<div className="App">
			<header>
			<h1>Josué's Todo List</h1>
			</header>
			<Form 
				inputText={inputText}
				setInputText={setInputText}
				todos={todos} 
				setTodos={setTodos} 
				setStatus={setStatus}
			/>

			<TodoList 
				setTodos={setTodos} 
				todos={todos} 
				filteredTodos={filteredTodos} 
			/>
			{/* <Todo /> */}
		</div>
	);
}

export default App;
