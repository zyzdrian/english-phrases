import { useEffect, useState } from 'react';
import { IPhrase, IPhraseMetadata } from '../models';
import { BUCKET, BUCKET_INDEX_PER_DAY, ISO_DATE_END_INDEX, ISO_DATE_START_INDEX, MS_IN_DAY } from '../consts';
import usePhrases from './usePhrases';

const FIRST_DAY = 0;
const FIRST_INDEX = 0;
const INITIAL_CURRENT_PHRASE_INDEX = 0;
const INITIAL_PHRASE: IPhrase = { bucketIndex: 1, appropriate: '', chapterId: 0, id: '0', meanings: [], name: '' };

interface IActions {
    canMark: boolean;
    enableMarking: () => void;
    markAsKnown: () => void;
    markAsNotKnown: () => void;
    canUndo: boolean;
    undo: () => void;
}

interface IUseDailyPhrases {
    dailyPhrases: IPhrase[];
    setDailyPhrases: (phrases: IPhrase[]) => void;
    currentPhrase: IPhrase;
    currentPhraseIndex: number;
    isCurrentPhraseFlipped: boolean;
    actions: IActions;
}

export function useDailyPhrases(): IUseDailyPhrases {
    const { phrases } = usePhrases();
    const [ dailyPhrases, setDailyPhrases ] = useState<IPhrase[]>([]);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(INITIAL_CURRENT_PHRASE_INDEX);
    const [isCurrentPhraseFlipped, setIsCurrentPhraseFlipped] = useState<boolean>(false);
    const [canMark, setCanMark] = useState<boolean>(true);
    const [tmpPhrase, setTmpPhrase] = useState<IPhrase>(INITIAL_PHRASE);

    function previousPhrase() {
        setCurrentPhraseIndex(currentPhraseIndex - 1);
        setIsCurrentPhraseFlipped(false);
        setCanMark(true);
    }

    function nextPhrase() {
        if (currentPhraseIndex < (dailyPhrases.length - 1)) {
            setCurrentPhraseIndex(currentPhraseIndex + 1);
        } else {
            setCurrentPhraseIndex(INITIAL_CURRENT_PHRASE_INDEX);
        }
        setIsCurrentPhraseFlipped(false);
        setCanMark(true);
    }

    function markAsKnown() {
        setTmpPhrase(dailyPhrases[currentPhraseIndex]);
        const bucketIndex = dailyPhrases[currentPhraseIndex].bucketIndex;
        const phrase: IPhrase = { ...dailyPhrases[currentPhraseIndex], bucketIndex: bucketIndex < BUCKET.EVERY_SIXTEENTH_DAY ? bucketIndex + 1 : bucketIndex };
        localStorage.setItem(phrase.id, JSON.stringify({ bucketIndex: phrase.bucketIndex } as IPhraseMetadata));
        setDailyPhrases([
            ...dailyPhrases.slice(FIRST_INDEX, currentPhraseIndex),
            phrase,
            ...dailyPhrases.slice(currentPhraseIndex + 1)
        ]);
        nextPhrase();
    }

    function markAsNotKnown() {
        setTmpPhrase(dailyPhrases[currentPhraseIndex]);
        const phrase: IPhrase = { ...dailyPhrases[currentPhraseIndex], bucketIndex: 1 };
        localStorage.setItem(phrase.id, JSON.stringify({ bucketIndex: phrase.bucketIndex } as IPhraseMetadata));
        setDailyPhrases([
            ...dailyPhrases.slice(FIRST_INDEX, currentPhraseIndex),
            phrase,
            ...dailyPhrases.slice(currentPhraseIndex + 1)
        ]);
        nextPhrase();
    }

    function undo() {
        localStorage.setItem(tmpPhrase.id, JSON.stringify({ bucketIndex: tmpPhrase.bucketIndex } as IPhraseMetadata));
        setDailyPhrases([
            ...dailyPhrases.slice(FIRST_INDEX, currentPhraseIndex -1),
            tmpPhrase as IPhrase,
            ...dailyPhrases.slice(currentPhraseIndex)
        ]);
        setTmpPhrase(INITIAL_PHRASE);
        previousPhrase();
    }

    function enableMarking() {
        setIsCurrentPhraseFlipped(true);
        setCanMark(false);
    }

    useEffect(() => {
        const today = new Date().toISOString().slice(ISO_DATE_START_INDEX, ISO_DATE_END_INDEX);
        const dayStr: string = localStorage.getItem('cycleStartDay') || today;
        const cycleDate = new Date(dayStr);
        let whichDay = (new Date(today).getTime() - cycleDate.getTime()) / (MS_IN_DAY);
        if (whichDay > BUCKET_INDEX_PER_DAY.length - 1 || whichDay === FIRST_DAY) {
            localStorage.setItem('cycleStartDay', today);
            whichDay = whichDay % BUCKET_INDEX_PER_DAY.length;
        }
        const filteredPhrases = phrases
            .filter((phrase: IPhrase) => BUCKET_INDEX_PER_DAY[whichDay].some(someBucketIndex => someBucketIndex === phrase.bucketIndex))
            .sort((a: IPhrase, b: IPhrase) => b.bucketIndex - a.bucketIndex);
        setDailyPhrases(filteredPhrases);
    }, [phrases.length]);
    return {
        dailyPhrases,
        setDailyPhrases,
        currentPhrase: dailyPhrases[currentPhraseIndex],
        currentPhraseIndex,
        isCurrentPhraseFlipped,
        actions: {
            canMark,
            enableMarking,
            markAsKnown,
            markAsNotKnown,
            canUndo: tmpPhrase.id !== INITIAL_PHRASE.id,
            undo
        }
    };
}

export default useDailyPhrases;
