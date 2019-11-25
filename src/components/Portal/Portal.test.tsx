import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Portal, IPortal } from './Portal';

describe('<Portal /> tests', () => {
    const INITIAL_PROPS: IPortal = {
        id: 'test-root'
    };
    const children = <div>TEST</div>;
    let props = { ...INITIAL_PROPS };
    beforeEach(() => {
        props = { ...INITIAL_PROPS };
    });
    afterEach(cleanup);

    it('should create portal with children', () => {
        const { container, getByTestId } = render(<Portal {...props}>{children}</Portal>);
        expect(container.firstChild).toMatchSnapshot();
        expect(getByTestId(`portal-${props.id}`)).toBeTruthy();
    });

    it('should remove children from portal', () => {
        const { container, unmount, queryByTestId } = render(<Portal {...props}>{children}</Portal>);
        unmount();

        expect(container.firstChild).toMatchSnapshot();
        expect(queryByTestId(`portal-${props.id}`)).toBeNull();
    });

    it('shouldn\'t remove parent element', () => {
        const { container, unmount, queryByTestId } = render(<Portal {...props}>{children}</Portal>);
        render(<Portal {...props}>{children}</Portal>);
        unmount();

        expect(container.firstChild).toMatchSnapshot();
        expect(queryByTestId(`portal-${props.id}`)).toBeTruthy();
    });
});
