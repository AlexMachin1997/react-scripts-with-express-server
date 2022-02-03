import * as React from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import useTodo from '../../hooks/useTodo';

const Todo = () => {
	// Access any page parameters
	const { id } = useParams();

	// Allows you to programmatically navigate without a <Link/>
	const navigate = useNavigate();

	// Get the single todo item
	const { status, todo } = useTodo(id);

	// Show a loading state
	if (status === 'loading') {
		return <p>Loading.....</p>;
	}

	// Show the error state
	if (status === 'error') {
		return (
			<>
				<p>Error</p>
				<button type='button' onClick={() => navigate('/')}>
					Return to the homepage
				</button>
			</>
		);
	}

	return (
		<>
			<h1>{todo.title}</h1>

			<p>This item is {todo.completed === false && 'not'} completed</p>

			<button type='button' onClick={() => navigate('/')}>
				Return to the homepage
			</button>
		</>
	);
};

export default Todo;
