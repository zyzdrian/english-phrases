import React from 'react';
import { IconButton } from './IconButton';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderTheme, lightTheme } from '../../styledComponents';

describe('<IconButton /> tests', () => {
    it('renders without props', () => {
        const { container, getByRole } = renderTheme(<IconButton />);

        expect(container.firstChild).toMatchSnapshot();
        expect(getByRole('button')).toHaveTextContent('');
        expect(getByRole('button')).not.toHaveAttribute('disabled');
        expect(getByRole('button')).toHaveStyle(`background-color: ${lightTheme.primary}`);
    });

    it('renders with prop disabled', () => {
        const { container, getByRole } = render(<IconButton disabled />);

        expect(container.firstChild).toMatchSnapshot();
        expect(getByRole('button')).toHaveAttribute('disabled');
    });

    it('renders as secondary', () => {
        const { container, getByRole } = renderTheme(<IconButton variant='secondary' />);

        expect(container.firstChild).toMatchSnapshot();
        expect(getByRole('button')).toHaveStyle(`background-color: ${lightTheme.secondary}`);
    });

    it('renders with prop disabled', () => {
        const onClick = jest.fn();

        const { container, getByRole } = render(<IconButton onClick={onClick} />);
        fireEvent.click(getByRole('button'));

        expect(container.firstChild).toMatchSnapshot();
        expect(onClick).toBeCalled();
    });
});
