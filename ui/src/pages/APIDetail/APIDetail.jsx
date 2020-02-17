import React, { Component } from 'react'
import { object, func } from 'prop-types'

import APIDetailsRepository from '../../domain/api-details-repository'
import APIDetails from '../../components/APIDetails/APIDetails'
import { Container } from './APIDetail.styles'

class APIDetail extends Component {
  static defaultProps = {
    match: { params: {} },
  }

  state = {
    details: {},
    error: false,
    loaded: false,
  }

  loadDetailsForApi(id) {
    return this.props.getApiDetailsById(id).then(
      (details) => {
        this.setState({ details, loaded: true })
      },
      (error) => {
        this.setState({ error: true, loaded: true })
        console.error(error)
      },
    )
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params
    const prevId = prevProps.match.params.id

    if (prevId === id) return
    this.loadDetailsForApi(id)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.loadDetailsForApi(id)
  }

  render() {
    const { details, error, loaded } = this.state

    return (
      <div className="APIDetail">
        {!loaded ? null : error ? (
          <p data-test="error-message">
            Er ging iets fout tijdens het ophalen van de API.
          </p>
        ) : details ? (
          <Container>
            <APIDetails {...details} />
          </Container>
        ) : null}
      </div>
    )
  }
}

APIDetail.propTypes = {
  match: object,
  getApiDetailsById: func.isRequired,
}

APIDetail.defaultProps = {
  match: { params: {} },
  getApiDetailsById: APIDetailsRepository.getById,
}

export default APIDetail
