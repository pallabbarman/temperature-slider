import { render } from 'test_utils/render';
import Thermometer from '..';

describe('Thermometer', () => {
    test('should render the default component', () => {
        const { container } = render(<Thermometer />);

        expect(container.querySelector('svg')).toBeDefined();
    });
});
