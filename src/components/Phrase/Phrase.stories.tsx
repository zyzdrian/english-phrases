import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, array } from '@storybook/addon-knobs';

import { Phrase } from './Phrase';

// eslint-disable-next-line no-undef
const stories = storiesOf('Components', module);
stories.addDecorator(withKnobs);

const DEFAULT_CHAPTER_ID = 2;
const DEFAULT_BUCKET_INDEX = 0;

stories.add(
    'Phrase',
    () => {
        return (
            <Phrase
                phrase={{
                    id: text('id', '1'),
                    appropriate: text('appropriate', 'Use in any situation'),
                    name: text('name', '2 B OR NOT 2 B'),
                    meanings: array('meanings', ['To be or not to be']),
                    chapterId: number('chapterId', DEFAULT_CHAPTER_ID),
                    bucketIndex: number('bucketIndex', DEFAULT_BUCKET_INDEX)
                }}
            />
        );
    },
    { info: { inline: true } }
);
