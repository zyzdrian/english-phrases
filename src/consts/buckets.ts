export enum BUCKET {
    EVERYDAY,
    EVERY_SECOND_DAY,
    EVERY_FOURTH_DAY,
    EVERY_EIGHTH_DAY,
    EVERY_SIXTEENTH_DAY
}

export const BUCKET_INDEX_PER_DAY = [
    [BUCKET.EVERYDAY],
    [BUCKET.EVERYDAY, BUCKET.EVERY_SECOND_DAY],
    [BUCKET.EVERYDAY],
    [BUCKET.EVERYDAY, BUCKET.EVERY_SECOND_DAY, BUCKET.EVERY_FOURTH_DAY],
    [BUCKET.EVERYDAY],
    [BUCKET.EVERYDAY, BUCKET.EVERY_SECOND_DAY],
    [BUCKET.EVERYDAY],
    [BUCKET.EVERYDAY, BUCKET.EVERY_SECOND_DAY, BUCKET.EVERY_FOURTH_DAY, BUCKET.EVERY_EIGHTH_DAY],
    [BUCKET.EVERYDAY],
    [BUCKET.EVERYDAY, BUCKET.EVERY_SECOND_DAY],
    [BUCKET.EVERYDAY],
    [BUCKET.EVERYDAY, BUCKET.EVERY_SECOND_DAY, BUCKET.EVERY_FOURTH_DAY],
    [BUCKET.EVERYDAY],
    [BUCKET.EVERYDAY, BUCKET.EVERY_SECOND_DAY],
    [BUCKET.EVERYDAY],
    [BUCKET.EVERYDAY, BUCKET.EVERY_SECOND_DAY, BUCKET.EVERY_FOURTH_DAY, BUCKET.EVERY_EIGHTH_DAY, BUCKET.EVERY_SIXTEENTH_DAY]
];
