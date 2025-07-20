import SuspenseComponent from 'components/SuspenseComponent';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import routes from '.';

const MainLayout = SuspenseComponent(lazy(() => import('layouts/Main')));
const Home = SuspenseComponent(lazy(() => import('pages/Home')));

const routerConfig = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: routes.home.path,
                Component: Home,
            },
        ],
    },
]);

export default routerConfig;
