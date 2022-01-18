import * as React from 'react';

import { Link } from 'react-router-dom';

import useTodos from '../../hooks/useTodos';

const Homepage = function () {
	// Get all of the todos available
	const { status, todos } = useTodos();

	// Show a loading state
	if (status === 'loading') {
		return <p>Loading.....</p>;
	}

	// Show the error state
	if (status === 'error') {
		return <p>Error</p>;
	}

	return (
		<>
			<h1>Todo list</h1>

			<p>Click a "todo" to view the individual item</p>

			{todos.map((todo) => (
				<div key={todo.id} style={{ color: 'black', textDecoration: 'none' }}>
					<Link to={`/${todo.id}`}>View {todo.title}</Link>
				</div>
			))}
		</>
	);
};

export default Homepage;
