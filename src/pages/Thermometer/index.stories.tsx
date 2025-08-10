import type { Meta, StoryObj } from '@storybook/react-vite';
import Thermometer from '.';

const meta: Meta<typeof Thermometer> = {
    component: Thermometer,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A component with animated draggable thermometer',
            },
        },
    },

    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Thermometer>;

export const Default: Story = {
    args: {},
};
