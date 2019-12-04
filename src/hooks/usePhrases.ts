import { useContext, useEffect } from 'react';
import { PhrasesContext } from '../contexts';
import { IAppropriateBody, IPhrase, IPhraseBody, IPhraseMetadata } from '../models';

interface IUsePhrases {
    phrases: IPhrase[];
    setPhrases: (phrases: IPhrase[]) => void;
}

export function usePhrases(): IUsePhrases {
    const { phrases, setPhrases } = useContext(PhrasesContext);
    const fetchPhrases = async () => {
        const phrasesResult = await fetch('api/phrases.json');
        const phrasesJson: IPhraseBody[] = await phrasesResult.json();
        const appropriatesResult = await fetch('api/appropriates.json');
        const appropriatesJson: IAppropriateBody[] = await appropriatesResult.json();

        const mappedPhrases = phrasesJson.map((phraseBody) => {
            const appropriate = appropriatesJson.find((appropriateBody) => appropriateBody.id === phraseBody.appropriateId);
            const phraseMetadata: IPhraseMetadata = JSON.parse(localStorage.getItem(phraseBody.id) || '{"bucketIndex":0}');
            return {
                ...phraseBody,
                appropriateId: undefined,
                appropriate: appropriate ? appropriate.name : '',
                bucketIndex: phraseMetadata.bucketIndex
            } as IPhrase;
        });
        setPhrases(mappedPhrases);
    };

    useEffect(() => {
        if (!phrases.length) {
            fetchPhrases();
        }
    }, []);
    return { phrases, setPhrases };
}

export default usePhrases;
