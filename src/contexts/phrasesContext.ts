import React from 'react';
import { IPhrase } from '../models';

interface IPhraseContext {
    phrases: IPhrase[];
    setPhrases: (phrases: IPhrase[]) => void;
}

export const PhrasesContext = React.createContext<IPhraseContext>({
    phrases: [],
    setPhrases: () => {}
});
