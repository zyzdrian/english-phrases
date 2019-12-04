import React from 'react';
import { Button } from './Button';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderTheme, lightTheme } from '../../styledComponents';

describe('<Button /> tests', () => {
    it('renders without props', () => {
        const { container, getByRole } = renderTheme(<Button />);

        expect(container.firstChild).toMatchSnapshot();
        expect(getByRole('button')).toHaveTextContent('');
        expect(getByRole('button')).not.toHaveAttribute('disabled');
        expect(getByRole('button')).toHaveStyle(`background-color: ${lightTheme.primary}`);
    });

    it('renders with children', () => {
        const text = 'Test text';

        const { container, getByRole } = render(<Button>{text}</Button>);

        expect(container.firstChild).toMatchSnapshot();
        expect(getByRole('button')).toHaveTextContent(text);
    });

    it('renders with prop disabled', () => {
        const { container, getByRole } = render(<Button disabled />);

        expect(container.firstChild).toMatchSnapshot();
        expect(getByRole('button')).toHaveAttribute('disabled');
    });

    it('renders as secondary', () => {
        const { container, getByRole } = renderTheme(<Button variant='secondary' />);

        expect(container.firstChild).toMatchSnapshot();
        expect(getByRole('button')).toHaveStyle(`background-color: ${lightTheme.secondary}`);
    });

    it('renders with prop disabled', () => {
        const onClick = jest.fn();

        const { container, getByRole } = render(<Button onClick={onClick} />);
        fireEvent.click(getByRole('button'));

        expect(container.firstChild).toMatchSnapshot();
        expect(onClick).toBeCalled();
    });
});
