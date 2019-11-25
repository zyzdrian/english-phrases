import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TopBar, IProgressBarProps, TOP_BAR_TEST_IDS } from './TopBar';
import { renderTheme } from '../../styledComponents';

describe('<FlipCard /> tests', () => {
    const INITIAL_PROPS: IProgressBarProps = {};
    let props = { ...INITIAL_PROPS };
    beforeEach(() => {
        props = { ...INITIAL_PROPS };
    });
    afterEach(cleanup);

    it('should render as default', () => {
        const { container, getByTestId } = renderTheme(<TopBar {...props} />);
        expect(container.firstChild).toMatchSnapshot();
        expect(getByTestId(TOP_BAR_TEST_IDS.sideBar)).toHaveStyle('left: -200px');
    });

    it('should render title', () => {
        props.title = 'Test title';

        const { container, getByTestId } = render(<TopBar {...props} />);
        expect(container.firstChild).toMatchSnapshot();
        expect(getByTestId(TOP_BAR_TEST_IDS.title)).toHaveTextContent(props.title);
    });

    it('should show sideBar when hamburger icon was clicked', () => {
        const { getByTestId } = renderTheme(<TopBar {...props} />);
        fireEvent.click(getByTestId(TOP_BAR_TEST_IDS.hamburger));

        expect(getByTestId(TOP_BAR_TEST_IDS.sideBar)).toHaveStyle('left: 0px');
    });

    it('should hide sideBar when hamburger icon was clicked two times', () => {
        const { getByTestId } = renderTheme(<TopBar {...props} />);
        fireEvent.click(getByTestId(TOP_BAR_TEST_IDS.hamburger));
        fireEvent.click(getByTestId(TOP_BAR_TEST_IDS.hamburger));

        expect(getByTestId(TOP_BAR_TEST_IDS.sideBar)).toHaveStyle('left: -200px');
    });

    it('should hide sideBar when backdrop was clicked', () => {
        const { getByTestId } = renderTheme(<TopBar {...props} />);
        fireEvent.click(getByTestId(TOP_BAR_TEST_IDS.hamburger));
        fireEvent.click(getByTestId(TOP_BAR_TEST_IDS.backdrop));

        expect(getByTestId(TOP_BAR_TEST_IDS.sideBar)).toHaveStyle('left: -200px');
    });
});
