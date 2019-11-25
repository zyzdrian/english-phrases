import React from 'react';
import { BottomMenu, IBottomMenuProps, BOTTOM_MENU_TEST_IDS } from './BottomMenu';
import { cleanup, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('<BottomMenu /> tests', () => {
    const INITIAL_PROPS: IBottomMenuProps = {
        areButtonsDisabled: false,
        markAsKnown: jest.fn(),
        markAsNotKnown: jest.fn(),
        rollbackState: jest.fn(),
        enableButtons: jest.fn(),
        isRollbackDisabled: false
    };
    let props = { ...INITIAL_PROPS };
    beforeEach(() => {
        props = { ...INITIAL_PROPS };
    });
    afterEach(cleanup);

    it('renders without disabled props', () => {
        const { container, getByTestId } = render(<BottomMenu {...props} />);
        const expectedChildrenNumber = 2;

        expect(container.firstChild).toMatchSnapshot();
        expect(getByTestId(BOTTOM_MENU_TEST_IDS.iKnowButton)).toBeTruthy();
        expect(getByTestId(BOTTOM_MENU_TEST_IDS.iDontKnowButton)).toBeTruthy();
        expect(getByTestId(BOTTOM_MENU_TEST_IDS.bottomMenu).children.length).toEqual(expectedChildrenNumber);
    });

    it('renders clickable "I know" button', () => {
        const { container, getByTestId } = render(<BottomMenu {...props} />);
        fireEvent.click(getByTestId(BOTTOM_MENU_TEST_IDS.iKnowButton));

        expect(container.firstChild).toMatchSnapshot();
        expect(props.markAsKnown).toBeCalled();
    });

    it('renders clickable "I don\'t know" button', () => {
        const { container, getByTestId } = render(<BottomMenu {...props} />);
        fireEvent.click(getByTestId(BOTTOM_MENU_TEST_IDS.iDontKnowButton));

        expect(container.firstChild).toMatchSnapshot();
        expect(props.markAsKnown).toBeCalled();
    });

    it('renders other buttons when areButtonsDisabled = true', () => {
        props.areButtonsDisabled = true;

        const { container, getByTestId } = render(<BottomMenu {...props}/>);

        expect(container.firstChild).toMatchSnapshot();
        expect(getByTestId(BOTTOM_MENU_TEST_IDS.showMeaningButton)).toBeTruthy();
        expect(getByTestId(BOTTOM_MENU_TEST_IDS.undoButton)).toBeTruthy();
        expect(getByTestId(BOTTOM_MENU_TEST_IDS.undoButton)).not.toBeDisabled();
    });

    it('renders other buttons when areButtonsDisabled = true and isRollbackDisabled = true', () => {
        props.areButtonsDisabled = true;
        props.isRollbackDisabled = true;

        const { container, getByTestId } = render(<BottomMenu {...props}/>);

        expect(container.firstChild).toMatchSnapshot();
        expect(getByTestId(BOTTOM_MENU_TEST_IDS.showMeaningButton)).toBeTruthy();
        expect(getByTestId(BOTTOM_MENU_TEST_IDS.undoButton)).toBeTruthy();
        expect(getByTestId(BOTTOM_MENU_TEST_IDS.undoButton)).toBeDisabled();
    });

    it('renders clickable "undo button"', () => {
        props.areButtonsDisabled = true;

        const { getByTestId } = render(<BottomMenu {...props}/>);
        fireEvent.click(getByTestId(BOTTOM_MENU_TEST_IDS.undoButton));

        expect(props.rollbackState).toBeCalled();
    });

    it('renders clickable "Show meaning button"', () => {
        props.areButtonsDisabled = true;

        const { getByTestId } = render(<BottomMenu {...props}/>);
        fireEvent.click(getByTestId(BOTTOM_MENU_TEST_IDS.showMeaningButton));

        expect(props.enableButtons).toBeCalled();
    });
});
