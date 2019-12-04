import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import usePhrases from '../../hooks/usePhrases';
import { TopBar } from '../../components';
import { Phrase } from '../../components';

export enum FREE_LEARNING_PAGE_TEST_IDS {
    phrasesContainer = 'phrases-container'
}

const StyledFreeLearningPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const StyledContainer = styled.div`
display: grid;
grid-template-rows: 240px;
grid-template-columns: 552px 552px;
grid-gap: 16px;

@media screen and (max-width: 1200px) {
  grid-template-columns: 552px;
}
@media screen and (max-width: 600px) {
  grid-template-columns: calc(100vw - 48px);
}
`;

export const FreeLearningPage: React.FC<RouteComponentProps> = () => {
  const { phrases } = usePhrases();
  return (
    <StyledFreeLearningPage>
      <TopBar title="Free Learning" />
      <StyledContainer data-testid={FREE_LEARNING_PAGE_TEST_IDS.phrasesContainer}>
        {phrases.map((phrase) => (
          <Phrase key={phrase.id} phrase={phrase} />
        ))}
      </StyledContainer>
    </StyledFreeLearningPage>
  );
};
