import React from 'react';
import { render } from '@testing-library/react';
import { FreeLearningPage, FREE_LEARNING_PAGE_TEST_IDS } from './FreeLearningPage';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../hooks/usePhrases', () => () => ({
    phrases: [
        {
            id: '1',
            name: 'Test phrase',
            appropriate: 'Test appropriate',
            chapterId: 1,
            meanings: ['Meaning'],
            bucketIndex: 1
        },
        {
            id: '2',
            name: 'Test phrase 2',
            appropriate: 'Test appropriate',
            chapterId: 1,
            meanings: ['Meaning 1', 'Meaning 2'],
            bucketIndex: 1
        }
    ]
    })
);


describe('<FreeLearningPage />', () => {
    it('should return phrases page with phrases', () => {
        const phrasesLength = 2;
        const { container, getByTestId } = render(<FreeLearningPage />);

        expect(container.firstChild).toMatchSnapshot();
        expect(getByTestId(FREE_LEARNING_PAGE_TEST_IDS.phrasesContainer).children.length).toEqual(phrasesLength);
    });
});
