import ErrorBoundary from 'components/ErrorBoundary';
import { RouterProvider } from 'react-router';
import routerConfig from 'routes/routerConfig';

function App() {
    return (
        <ErrorBoundary>
            <RouterProvider router={routerConfig} />
        </ErrorBoundary>
    );
}

export default App;
