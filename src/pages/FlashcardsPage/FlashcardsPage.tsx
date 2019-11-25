import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { BottomMenu, Phrase, TopBar } from '../../components';
import useDailyPhrases from '../../hooks/useDailyPhrases';

const StyledFlashcardsPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const transitionName = 'slide';

const Container = styled.section`
position: relative;
padding: 0 24px;
max-width: 600px;
width: 100%;

&.${transitionName}-appear {
  left: -100%;
}

&.${transitionName}-appear-active {
  left: 0;
  transition: left 300ms ease-in;
}
&.${transitionName}-enter {
  left: -100%;
}

&.${transitionName}-enter-active {
  left: 0;
  transition: left 300ms ease-in;
}
&.${transitionName}-exit {
  left: 0;
}

&.${transitionName}-exit-active {
  left: 100%;
  transition: left 300ms ease-out;
}
`;

interface IFlashcardsPageProps extends RouteComponentProps {}

export const FlashcardsPage: React.FC<IFlashcardsPageProps> = () => {
    const { dailyPhrases, currentPhrase, currentPhraseIndex, isCurrentPhraseFlipped, actions } = useDailyPhrases();

    return (
        <StyledFlashcardsPage>
            <TopBar title={`Progress: ${currentPhraseIndex + 1}/${dailyPhrases.length}`} />
            {!!dailyPhrases.length && (
                <SwitchTransition>
                    <CSSTransition timeout={300} classNames={transitionName} unmountOnExit key={currentPhrase.id}>
                        <Container>
                            <Phrase phrase={currentPhrase} onShow={actions.enableMarking} isFlipped={isCurrentPhraseFlipped} />
                        </Container>
                    </CSSTransition>
                </SwitchTransition>
            )}
            <BottomMenu
                markAsKnown={actions.markAsKnown}
                markAsNotKnown={actions.markAsNotKnown}
                rollbackState={actions.undo}
                isRollbackDisabled={!actions.canUndo}
                areButtonsDisabled={actions.canMark}
                enableButtons={actions.enableMarking}
            />
        </StyledFlashcardsPage>
    );
};
