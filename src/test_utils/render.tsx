import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import AppTest from './AppTest';

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => {
    const result = render(ui, { wrapper: AppTest, ...options });

    return result;
};

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

export { customRender as render };
