import Spinner from 'components/Spinner';
import { Suspense, type ComponentType } from 'react';

const SuspenseComponent =
    <P extends object>(Component: ComponentType<P>) =>
    (props: P) => (
        <Suspense fallback={<Spinner />}>
            <Component {...props} />
        </Suspense>
    );

export default SuspenseComponent;
