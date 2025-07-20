import type { Meta, StoryObj } from '@storybook/react-vite';
import Spinner from '.';

const meta = {
    component: Spinner,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Spinner component is used for showing loading throughout the system.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
