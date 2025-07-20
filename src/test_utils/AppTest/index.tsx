import { Fragment, type ReactNode } from 'react';

interface AppTestProps {
    children: ReactNode;
}

const AppTest = ({ children }: AppTestProps) => {
    return <Fragment>{children}</Fragment>;
};

export default AppTest;
