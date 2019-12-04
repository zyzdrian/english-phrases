import React from 'react';
import { render } from '@testing-library/react';
import { FlashcardsPage } from './FlashcardsPage';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../hooks/useDailyPhrases', () => () => ({
    dailyPhrases: [
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
    ],
    setDailyPhrases: jest.fn(),
    currentPhrase: {
        id: '1',
        name: 'Test phrase',
        appropriate: 'Test appropriate',
        chapterId: 1,
        meanings: ['Meaning'],
        bucketIndex: 1
    },
    currentPhraseIndex: 0,
    isCurrentPhraseFlipped: false,
    actions: {
        markAsKnown: jest.fn(),
        markAsNotKnown: jest.fn(),
        undo: jest.fn(),
        canUndo: false,
        canMark: false,
        enableMarking: jest.fn()
    }
}));

describe('<FlashcardsPage />', () => {
    it('should return as a default phrases page', () => {
        const { container } = render(<FlashcardsPage />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
