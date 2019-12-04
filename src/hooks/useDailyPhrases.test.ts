import { cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import { useDailyPhrases } from './useDailyPhrases';
import { ISO_DATE_END_INDEX, ISO_DATE_START_INDEX } from '../consts';

jest.mock('./usePhrases', () => () => ({
    phrases: [
        {
            id: '1',
            name: 'Test phrase',
            appropriate: 'Test appropriate',
            chapterId: 1,
            meanings: ['Meaning'],
            bucketIndex: 0
        },
        {
            id: '2',
            name: 'Test phrase 2',
            appropriate: 'Test appropriate',
            chapterId: 1,
            meanings: ['Meaning 1', 'Meaning 2'],
            bucketIndex: 0
        },
        {
            id: '3',
            name: 'Test phrase 2',
            appropriate: 'Test appropriate',
            chapterId: 1,
            meanings: ['Meaning 1', 'Meaning 2'],
            bucketIndex: 4
        }
    ],
    setPhrases: jest.fn()
}));

const PHRASES_LENGTH = 2;
const FIRST_INDEX = 0;
const SECOND_INDEX = 1;
const MAX_DAYS = 15;
const MAX_BUCKET_INDEX = 4;

describe('useDailyPhrases() tests', () => {
    afterEach(cleanup);

    it('should initial by empty array', async () => {
        const { result } = renderHook(() => useDailyPhrases());

        expect(result.current.dailyPhrases.length).toEqual(PHRASES_LENGTH);
    });

    it('should mark as known', () => {
        const { result } = renderHook(() => useDailyPhrases());
        act(() => {
            result.current.actions.markAsKnown();
        });

        expect(result.current.currentPhraseIndex).toEqual(SECOND_INDEX);
    });

    it('should mark as known and bucketIndex = 4', () => {
        const now = new Date();
        now.setDate(now.getDate() - MAX_DAYS);
        const fourDayBefore = now.toISOString().slice(ISO_DATE_START_INDEX, ISO_DATE_END_INDEX);
        // console.log(fourDayBefore);
        localStorage.setItem('cycleStartDay', fourDayBefore);
        const { result } = renderHook(() => useDailyPhrases());
        act(() => {
            result.current.actions.markAsKnown();
        });

        expect(result.current.currentPhraseIndex).toEqual(SECOND_INDEX);
        expect(result.current.dailyPhrases[FIRST_INDEX].bucketIndex).toEqual(MAX_BUCKET_INDEX);
    });

    it('should check overflow', () => {
        const { result } = renderHook(() => useDailyPhrases());
        act(() => {
            result.current.actions.markAsKnown();
        });
        act(() => {
            result.current.actions.markAsKnown();
        });
        act(() => {
            result.current.actions.markAsKnown();
        });
        act(() => {
            result.current.actions.markAsKnown();
        });

        expect(result.current.currentPhraseIndex).toEqual(SECOND_INDEX);
    });

    it('should mark as not known', () => {
        const { result } = renderHook(() => useDailyPhrases());
        act(() => {
            result.current.actions.markAsNotKnown();
        });

        expect(result.current.currentPhraseIndex).toEqual(SECOND_INDEX);
    });

    it('should undo', () => {
        const { result } = renderHook(() => useDailyPhrases());
        act(() => {
            result.current.actions.markAsNotKnown();
        });
        act(() => {
            result.current.actions.undo();
        });

        expect(result.current.currentPhraseIndex).toEqual(FIRST_INDEX);
    });

    it('should enable marking', () => {
        const { result } = renderHook(() => useDailyPhrases());
        act(() => {
            result.current.actions.enableMarking();
        });

        expect(result.current.isCurrentPhraseFlipped).toBeTruthy();
        expect(result.current.actions.canMark).toBeFalsy();
    });
});
