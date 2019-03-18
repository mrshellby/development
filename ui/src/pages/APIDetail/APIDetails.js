import React, { Fragment } from 'react'
import { string, array } from 'prop-types'

import './APIDetails.css'

const getOnlineRedocUrl = specUrl =>
    `https://rebilly.github.io/ReDoc/?url=${encodeURIComponent(specUrl)}`

const APIDetails = ({ service_name, organization_name, description, api_url, api_specification_type, specification_url, documentation_url, badges }) =>
    <div className="APIDetails">
        <h1 className="title">{ service_name }</h1>
        <h2 className="subtitle">{ organization_name }</h2>

        <div className="APIDetails__sections">
            <div className="APIDetails__general">
                <p>{ description }</p>

                {
                    badges && badges.length ?
                        <Fragment>
                            <h2 data-test="badges-title">Badges</h2>
                            <ul data-test="badges">
                                {
                                    badges.map((badge, i) =>
                                        <li key={i}>{badge}</li>
                                    )
                                }
                            </ul>
                        </Fragment>
                        : null
                }
            </div>

            <div className="APIDetails__technical">
                <dl>
                    <dt>Documentation</dt>
                    <dd data-test="api-documentation-url">
                        <a href={documentation_url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </dd>

                    <dt>Base URL</dt>
                    <dd data-test="api-url" className="base-url">
                        <a href={api_url} target="_blank" rel="noopener noreferrer">{ api_url }</a>
                    </dd>

                    <dt>API Specification</dt>
                    <dd data-test="api-specification-type">
                        <a href={getOnlineRedocUrl(specification_url)} target="_blank" rel="noopener noreferrer" data-test="api-specification-url">{ api_specification_type }</a>
                    </dd>
                </dl>
            </div>
        </div>
    </div>

APIDetails.propTypes = {
    service_name: string.isRequired,
    organization_name: string.isRequired,
    description: string.isRequired,
    api_url: string.isRequired,
    api_specification_type: string.isRequired,
    specification_url: string.isRequired,
    documentation_url: string.isRequired,
    badges: array
}

export default APIDetails
