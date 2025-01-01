import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@repo/ui/src/components/atoms/button';

// Define the metadata for the Button component stories
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      description: 'Sets the style variant of the button.',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Sets the size of the button.',
    },
    asChild: {
      control: 'boolean',
      description:
        'If true, renders the button as a child component (e.g., a Slot).',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button if set to true.',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

// Define story objects
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default',
    asChild: false,
    disabled: false,
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
    size: 'default',
    asChild: false,
    disabled: false,
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'default',
    asChild: false,
    disabled: false,
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'default',
    asChild: false,
    disabled: false,
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    size: 'default',
    asChild: false,
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'default',
    size: 'sm',
    asChild: false,
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'default',
    size: 'lg',
    asChild: false,
    disabled: false,
  },
};

export const Icon: Story = {
  args: {
    children: '🔔',
    variant: 'default',
    size: 'icon',
    asChild: false,
    disabled: false,
  },
};
