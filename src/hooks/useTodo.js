import axios from 'axios';
import { useQuery } from 'react-query';

const useTodos = (todoId) => {
	// Used to fetch and refetch patients
	const { status, data: todo } = useQuery(
		['todos', { todoId }],
		async () => {
			try {
				const response = await axios.get(`/api/todos/${todoId}`);

				// Check for errors, if the response isn't 200 throw an error with the server response or the fallback message
				if ((response?.status ?? 500) !== 200) {
					throw Error(response?.data?.message ?? 'Something went wrong ');
				}

				return response?.data ?? {};
			} catch (err) {
				// Log an errors
				console.log('useTodo error: ', err);

				// Reject the query, this puts react-query status into "loading...."
				return Promise.reject(new Error(err));
			}
		},
		{
			// Don't refetch the table data when you refocus
			refetchOnWindowFocus: true,

			// Keeps the old data whilst the new data fetches, doesn't trigger the loader instead the data just updates e.g. https://react-query.tanstack.com/guides/paginated-queries
			keepPreviousData: true
		}
	);

	return {
		status,
		todo
	};
};

export default useTodos;
