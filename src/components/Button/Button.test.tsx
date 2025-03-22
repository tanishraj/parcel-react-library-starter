import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './Button';
import { buttonVariants } from './Button.styles';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button', { name: /test button/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      buttonVariants({ variant: 'primary', size: 'md' }),
    );
  });

  // Dark mode test
  it('applies dark mode classes', () => {
    render(
      <div data-theme='dark'>
        <Button variant='primary'>Dark Button</Button>
      </div>,
    );
    const button = screen.getByRole('button', { name: /dark button/i });

    expect(button).toHaveClass('dark:bg-primary-dark');
  });

  // Interaction tests
  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Custom class merging test
  it('merges custom classes correctly', () => {
    render(<Button className='custom-class'>Custom Class Button</Button>);
    const button = screen.getByRole('button', { name: /custom class button/i });

    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass(buttonVariants({ variant: 'primary' }));
  });

  // Icon button test
  it('renders icon button correctly', () => {
    render(<Button size='icon'>🎨</Button>);
    const button = screen.getByRole('button', { name: /🎨/i });

    expect(button).toHaveClass('h-10 w-10');
    expect(button).not.toHaveClass('px-4');
  });
});
