import React from 'react';
import styled from 'styled-components';
import { FlipCard } from '..';
import { IPhrase } from '../../models';

export enum PHRASE_TEST_IDS {
    name = 'name',
    meaning = 'meaning'
}

const StyledPhrase = styled.div`
background-color: ${props => props.theme.cardBackground};
color: ${props => props.theme.fontColorDark};
transition: background-color ease 0.3s;
padding: 36px;
height: 240px;
max-height: calc(100vh - 184px); // 56px + 2x 24px (bottom menu) + 56px + 24px (top menu)
display: flex;
flex-direction: column;
justify-content: center;
border-radius: 16px;
`;

const StyledFront = styled(StyledPhrase)`
  align-items: center;
`;

const StyledName = styled.div`
font-size: 16px;
font-weight: bold;
text-align: center;
`;

const StyledBack = styled(StyledPhrase)`
  align-items: flex-start;
`;

interface IStyledMeaning {
    isMultiple: boolean;
}

const StyledMeaning = styled.div<IStyledMeaning>`
display: ${props => props.isMultiple ? 'list-item' : 'block'};
padding-bottom: 10px;
&:last-child {
  padding-bottom: 0;
}
`;

export const Phrase: React.FC<IPhraseProps> = ({ phrase, isFlipped, onShow }) => {
    const isMultiple = phrase.meanings.length > 1;
    return (
            <FlipCard
                front={(
                    <StyledFront>
                        <StyledName data-testid={PHRASE_TEST_IDS.name}>{phrase.name}</StyledName>
                    </StyledFront>
                )}
                back={(
                    <StyledBack>
                        {phrase.meanings.map((meaning, index) => (
                            <StyledMeaning key={meaning} isMultiple={isMultiple} data-testid={`${PHRASE_TEST_IDS.meaning}-${index}`}>
                                {meaning}
                            </StyledMeaning>
                        ))}
                    </StyledBack>
                )}
                isOutsidedFlipped={isFlipped}
                onShow={onShow}
            />);
};

export interface IPhraseProps {
    phrase: IPhrase;
    isFlipped?: boolean;
    onShow?: () => void;
}
