import SuspenseComponent from 'components/SuspenseComponent';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import routes from '.';

const MainLayout = SuspenseComponent(lazy(() => import('layouts/Main')));
const Thermometer = SuspenseComponent(lazy(() => import('pages/Thermometer')));

const routerConfig = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: routes.home.path,
                Component: Thermometer,
            },
        ],
    },
]);

export default routerConfig;
