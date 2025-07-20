import ErrorBoundary from 'components/ErrorBoundary';
import { Fragment } from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <Fragment>
            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
        </Fragment>
    );
};

export default MainLayout;
