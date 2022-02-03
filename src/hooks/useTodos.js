import axios from 'axios';
import { useQuery } from 'react-query';

const useTodos = () => {
	// Used to fetch and refetch patients
	const { status, data: todos } = useQuery(
		['todos'],
		async () => {
			try {
				const response = await axios.get('/api/todos');

				// Check for errors, if the response isn't 200 throw an error with the server response or the fallback message
				if ((response?.status ?? 500) !== 200) {
					throw Error(response?.data?.message ?? 'Something went wrong ');
				}

				return response?.data ?? {};
			} catch (err) {
				// Log an errors
				console.log('usePatients error: ', err);

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
		todos
	};
};

export default useTodos;
