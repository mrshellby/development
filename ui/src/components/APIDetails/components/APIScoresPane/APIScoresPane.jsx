// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shape, bool, string, number } from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Drawer } from '@commonground/design-system'

import { IconList, StyledDrawer } from '../../APIDetails.styles'
import CheckmarkCircle from '../../../Icons/Circles/CheckmarkCircle'
import CrossCircle from '../../../Icons/Circles/CrossCircle'
import GradeBanner from '../GradeBanner/GradeBanner'
import { ScoreExplanation } from './APIScoresPane.styles'

const listItems = [
  {
    name: 'Documentatie',
    scoresProp: 'hasDocumentation',
  },
  {
    name: 'Specificatie',
    scoresProp: 'hasSpecification',
  },
  {
    name: 'Contactgegevens',
    scoresProp: 'hasContactDetails',
  },
  {
    name: 'SLA',
    scoresProp: 'providesSla',
  },
]

const APIScoresPane = ({ scores, totalScore, parentUrl }) => {
  const history = useHistory()

  const close = () => history.push(parentUrl)

  return (
    <StyledDrawer closeHandler={close} data-testid="scores-pane">
      <Drawer.Header title="Opbouw API Score" closeButtonLabel="Sluit" />
      <Drawer.Content>
        <p>Deze score geeft de kwaliteit van de API weer.</p>

        <GradeBanner totalScore={totalScore} />

        <ScoreExplanation>
          De score is tot stand gekomen door de volgende onderdelen:
        </ScoreExplanation>

        <IconList>
          {listItems.map(({ name, scoresProp }) => (
            <IconList.ListItem key={scoresProp}>
              <IconList.ListItem.Icon>
                {scores[scoresProp] ? <CheckmarkCircle /> : <CrossCircle />}
              </IconList.ListItem.Icon>
              <IconList.ListItem.Content>
                {name} {!scores[scoresProp] ? 'niet' : ''} aanwezig
              </IconList.ListItem.Content>
            </IconList.ListItem>
          ))}
        </IconList>
      </Drawer.Content>
    </StyledDrawer>
  )
}

APIScoresPane.propTypes = {
  scores: shape({
    hasDocumentation: bool,
    hasSpecification: bool,
    hasContactDetails: bool,
    providesSla: bool,
  }),
  totalScore: shape({
    points: number.isRequired,
    maxPoints: number.isRequired,
  }).isRequired,
  parentUrl: string,
}

export default APIScoresPane
