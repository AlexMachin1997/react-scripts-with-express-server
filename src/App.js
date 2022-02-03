import * as React from 'react';

import { Routes, Route } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const Todos = React.lazy(() => import('./pages/Todos/Todos'));
const Todo = React.lazy(() => import('./pages/Todo/Todo'));
const ErrorPage = React.lazy(() => import('./pages/Error/Error'));

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<Routes>
			<Route
				path='/'
				element={
					<React.Suspense fallback={<p>Loading.....</p>}>
						<Todos />
					</React.Suspense>
				}
			/>
			<Route
				path='/:id'
				element={
					<React.Suspense fallback={<p>Loading.....</p>}>
						<Todo />
					</React.Suspense>
				}
			/>
			s
			<Route
				path='*'
				element={
					<React.Suspense fallback={<p>Loading.....</p>}>
						<ErrorPage />
					</React.Suspense>
				}
			/>
		</Routes>
		{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
	</QueryClientProvider>
);

export default App;
