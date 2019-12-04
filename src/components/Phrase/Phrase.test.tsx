import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Phrase, IPhraseProps, PHRASE_TEST_IDS } from './Phrase';
import '@testing-library/jest-dom/extend-expect';

const FIRST_MEANING_INDEX = 0;

describe('<Phrase /> tests', () => {
    const INITIAL_PROPS: IPhraseProps = {
        phrase: {
            id: '1',
            name: 'TEST',
            meanings: ['Test meaning'],
            chapterId: 1,
            appropriate: 'Use in any situation',
            bucketIndex: 1
        }
    };
    let props = { ...INITIAL_PROPS };
    beforeEach(() => {
        props = { ...INITIAL_PROPS };
    });
    afterEach(cleanup);

    it('should render as default phrase', () => {
        const { container, getByTestId } = render(<Phrase {...props} />);

        expect(container.firstChild).toMatchSnapshot();
        expect(getByTestId(PHRASE_TEST_IDS.name)).toHaveTextContent(props.phrase.name);
        expect(getByTestId(`${PHRASE_TEST_IDS.meaning}-0`)).toHaveTextContent(props.phrase.meanings[FIRST_MEANING_INDEX]);
        expect(getByTestId(`${PHRASE_TEST_IDS.meaning}-0`)).toHaveStyle('display: block');
    });

    it('should render multiple meanings', () => {
        props.phrase.meanings = ['First meaning', 'Second meaning'];

        const { container, getByTestId } = render(<Phrase {...props} />);

        expect(container.firstChild).toMatchSnapshot();
        props.phrase.meanings.forEach((meaning, index) => {
            expect(getByTestId(`${PHRASE_TEST_IDS.meaning}-${index}`)).toHaveTextContent(meaning);
            expect(getByTestId(`${PHRASE_TEST_IDS.meaning}-${index}`)).toHaveStyle('display: list-item');
        });
    });
});
