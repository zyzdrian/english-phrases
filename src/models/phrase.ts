export interface IPhrase {
    id: string;
    name: string;
    appropriate: string;
    chapterId: number;
    meanings: string[];
    bucketIndex: number;
}

export interface IPhraseMetadata {
    bucketIndex: number;
}

export interface IPhraseBody {
    id: string;
    name: string;
    appropriateId: string;
    chapterId: number;
    meanings: string[];
}
