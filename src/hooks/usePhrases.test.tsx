import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import { usePhrases } from './usePhrases';
import { PhrasesContext } from '../contexts';
import { IAppropriateBody, IPhrase, IPhraseBody } from '../models';

const fakePhrasesBody: IPhraseBody[] = [
    {
        id: '1',
        name: 'TEST 1',
        meanings: ['Meaning'],
        appropriateId: '1',
        chapterId: 0
    },
    {
        id: '2',
        name: 'TEST 2',
        meanings: ['Meaning 1', 'Meaning 2'],
        appropriateId: '2',
        chapterId: 0
    }
];

const fakeAppropriatesBody: IAppropriateBody[] = [
    {
        id: '1',
        name: 'Appropriate test'
    }
];

const fakePhrases: IPhrase[] = [
    {
        id: '1',
        name: 'TEST 1',
        meanings: ['Meaning'],
        appropriate: 'Appropriate test',
        chapterId: 0,
        bucketIndex: 0
    },
    {
        id: '2',
        name: 'TEST 2',
        meanings: ['Meaning 1', 'Meaning 2'],
        appropriate: '',
        chapterId: 0,
        bucketIndex: 0
    }
];

describe('usePhrases() tests', () => {
    fetchMock.mock('api/phrases.json', fakePhrasesBody);
    fetchMock.mock('api/appropriates.json', fakeAppropriatesBody);
    let phrases: IPhrase[] = [];
    let setPhrases = jest.fn();
    let wrapper: React.FC;

    beforeAll(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        global.fetch = fetch;
    });

    beforeEach(() => {
        setPhrases = jest.fn((phrasesArg: IPhrase[]) => phrases.push(...phrasesArg));
        // eslint-disable-next-line react/display-name
        wrapper = ({ children }) => (
            <PhrasesContext.Provider value={{ phrases, setPhrases }}>
                {children}
            </PhrasesContext.Provider>
        );
    });

    afterEach(cleanup);

    afterAll(() => {
        fetchMock.restore();
    });

    it('should fetch phrases if state is empty', async () => {
        const { result } = renderHook(() => usePhrases(), { wrapper });
        await act(async () => {});

        expect(result.current.phrases.length).toEqual(fakePhrases.length);
        expect(setPhrases).toBeCalled();
    });

    it('shouldn\'t fetch phrases when state isn\'t empty', async () => {
        phrases = fakePhrases;

        const { result } = renderHook(() => usePhrases(), { wrapper });
        await act(async () => {});

        expect(result.current.phrases.length).toEqual(fakePhrases.length);
        expect(setPhrases).not.toBeCalled();
    });

    it('should set empty string when appropriateId is incorrect', async () => {
        const { result } = renderHook(() => usePhrases(), { wrapper });
        await act(async () => {});

        fakePhrases.forEach((fakePhrase, index) => {
            expect(result.current.phrases[index].appropriate).toEqual(fakePhrase.appropriate);
        });
    });
});
