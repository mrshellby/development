// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shape, string } from 'prop-types'
import { NavLink, Route, Redirect } from 'react-router-dom'

import SubmitAPIForm from '../SubmitAPIForm/SubmitAPIForm'
import SubmitAPIMergeRequest from '../SubmitAPIMergeRequest/SubmitAPIMergeRequest'
import PageContentCard from '../../components/PageContentCard/PageContentCard'

import { StyledSubmitAPI, StyledTabs } from './SubmitAPI.styles'

const SubmitAPI = ({ match: { url } }) => (
  <StyledSubmitAPI>
    <h1>API toevoegen</h1>
    <p>
      Voeg je API toe door onderstaand formulier in te vullen of een Merge
      Request aan te maken.
    </p>

    <StyledTabs>
      <NavLink to={`${url}/form`}>Toevoegen via formulier</NavLink>
      <NavLink to={`${url}/merge-request`}>Via Merge Request</NavLink>
    </StyledTabs>

    <PageContentCard>
      <PageContentCard.Body>
        <Route
          path={url}
          exact
          render={() => <Redirect to={`${url}/form`} />}
        />
        <Route path={`${url}/form`} component={SubmitAPIForm} />
        <Route
          path={`${url}/merge-request`}
          component={SubmitAPIMergeRequest}
        />
      </PageContentCard.Body>
    </PageContentCard>
  </StyledSubmitAPI>
)

SubmitAPI.propTypes = {
  match: shape({
    url: string,
  }),
}

SubmitAPI.defaultProps = {
  match: {
    url: 'add-api',
  },
}

export default SubmitAPI
