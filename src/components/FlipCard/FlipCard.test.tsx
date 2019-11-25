import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FlipCard, IFlipCard, FLIP_CART_TEST_IDS } from './FlipCard';

describe('<FlipCard /> tests', () => {
    const INITIAL_PROPS: IFlipCard = {
        back: <div>Back</div>,
        front: <div>Front</div>
    };
    let props = { ...INITIAL_PROPS };
    beforeEach(() => {
        props = { ...INITIAL_PROPS };
    });
    afterEach(cleanup);

    it('should render as default', () => {
        const { container, getByTestId } = render(<FlipCard {...props} />);
        expect(container.firstChild).toMatchSnapshot();
        expect(getByTestId(FLIP_CART_TEST_IDS.front)).toHaveStyle('position: relative');
    });

    it('should render clickable front', () => {
        const { getByTestId } = render(<FlipCard {...props} />);
        fireEvent.click(getByTestId(FLIP_CART_TEST_IDS.front));

        expect(getByTestId(FLIP_CART_TEST_IDS.front)).toHaveStyle('position: absolute');
        // expect(getByTestId(FLIP_CART_TEST_IDS.front)).toHaveStyle('transform: rotateY(180deg)');
        expect(getByTestId(FLIP_CART_TEST_IDS.back)).toHaveStyle('position: relative');
        // expect(getByTestId(FLIP_CART_TEST_IDS.back)).toHaveStyle('transform: rotateY(0deg)');
    });

    it('should render clickable back', () => {
        const { getByTestId } = render(<FlipCard {...props} />);
        fireEvent.click(getByTestId(FLIP_CART_TEST_IDS.back));

        expect(getByTestId(FLIP_CART_TEST_IDS.front)).toHaveStyle('position: relative');
        // expect(getByTestId(FLIP_CART_TEST_IDS.front)).toHaveStyle('transform: rotateY(0deg)');
        expect(getByTestId(FLIP_CART_TEST_IDS.back)).toHaveStyle('position: absolute');
        // expect(getByTestId(FLIP_CART_TEST_IDS.back)).toHaveStyle('transform: rotateY(-180deg)');
    });

    it('should flip card when isOutsidedFlipped was changed', () => {
        props.isOutsidedFlipped = true;

        const { getByTestId } = render(<FlipCard {...props} />);

        expect(getByTestId(FLIP_CART_TEST_IDS.front)).toHaveStyle('position: absolute');
        expect(getByTestId(FLIP_CART_TEST_IDS.back)).toHaveStyle('position: relative');
    });

    it('should called onShow when it passed by props and click on front', () => {
        props.onShow = jest.fn();

        const { getByTestId } = render(<FlipCard {...props} />);
        fireEvent.click(getByTestId(FLIP_CART_TEST_IDS.front));

        expect(props.onShow).toBeCalled();
    });
});
