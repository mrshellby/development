import React from 'react'

import { RELATION_TYPE_REFERENCE_IMPLEMENTATION } from '../../constants'
import { Api } from '../../models/apiTypes'

import ImplementedByListContainer from '../ImplementedByListContainer/ImplementedByListContainer'
import LinkToAPIContainer from '../LinkToAPIContainer/LinkToAPIContainer'
import Grade from '../Grade/Grade'
import External from '../Icons/External'
import Card from '../Card/Card'
import PageContentCard from '../PageContentCard/PageContentCard'

import {
  PageTitle,
  SubTitle,
  DocumentationContainer,
  DocumentationButton,
  StyledTagList,
  CardsContainer,
  ApiLink,
  StyledDl,
  StyledScoresUl,
  StyledScoresLi,
  StyledAPIDetails,
} from './APIDetails.styles'

const getOnlineRedocUrl = (specUrl: Api['specificationUrl']): string =>
  `https://redocly.github.io/redoc/?url=${encodeURIComponent(specUrl)}`

export const referenceImplementationsFromRelations = (
  relations: Api['relations'] = {},
) =>
  Object.keys(relations).filter((apiId: string) =>
    relations[apiId].includes(RELATION_TYPE_REFERENCE_IMPLEMENTATION),
  )

const APIDetails = ({
  id,
  serviceName,
  organizationName,
  description,
  apiUrl,
  apiType,
  specificationUrl,
  documentationUrl,
  badges,
  tags,
  isReferenceImplementation,
  relations,
  termsOfUse,
  scores,
}: Api) => (
  <StyledAPIDetails>
    <PageTitle>{serviceName}</PageTitle>
    <SubTitle>{organizationName}</SubTitle>

    <DocumentationContainer>
      <DocumentationButton
        href={documentationUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-test="api-documentation-url"
      >
        Documentatie <External width="12px" height="12px" />
      </DocumentationButton>
    </DocumentationContainer>

    <CardsContainer>
      <CardsContainer.Main>
        <PageContentCard>
          <PageContentCard.Body>
            <p>{description}</p>
            <StyledTagList tags={tags} />
          </PageContentCard.Body>
          <PageContentCard.Footer>
            <h3>Basis URL</h3>
            <ApiLink
              href={apiUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-test="api-url"
            >
              {apiUrl}
            </ApiLink>
          </PageContentCard.Footer>
        </PageContentCard>
      </CardsContainer.Main>

      <CardsContainer.SideBar>
        <Card data-test="api-terms-of-use">
          <Card.Body>
            <StyledDl>
              <dt>API Type</dt>
              <dd data-test="api-type">{apiType}</dd>

              <dt>API Specificatie</dt>
              <dd data-test="api-specification">
                <a
                  href={getOnlineRedocUrl(specificationUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-test="api-specification-url"
                >
                  Lees meer
                </a>
              </dd>

              <dt>Gebruik</dt>
              <dd>
                {termsOfUse.governmentOnly ? 'Alleen overheid' : 'Iedereen'}
              </dd>

              <dt>Kosten</dt>
              <dd>{termsOfUse.payPerUse ? 'Kosten voor gebruik' : 'Gratis'}</dd>

              <dt>Uptime garantie</dt>
              <dd>
                {termsOfUse.uptimeGuarantee
                  ? `${termsOfUse.uptimeGuarantee}%`
                  : 'Geen'}
              </dd>

              <dt>Helpdesk response</dt>
              <dd>
                {termsOfUse.supportResponseTime
                  ? `${termsOfUse.supportResponseTime}`
                  : 'Geen'}
              </dd>
            </StyledDl>
          </Card.Body>
        </Card>

        <Card data-test="api-scores">
          <Card.Body>
            <Grade scores={scores} />

            <StyledScoresUl>
              <StyledScoresLi available={!!scores.hasDocumentation}>
                Documentatie
              </StyledScoresLi>
              <StyledScoresLi available={!!scores.hasSpecification}>
                Specificatie
              </StyledScoresLi>
              <StyledScoresLi available={!!scores.hasContactDetails}>
                Contactgegevens
              </StyledScoresLi>
              <StyledScoresLi available={!!scores.providesSla}>
                SLA
              </StyledScoresLi>
            </StyledScoresUl>
          </Card.Body>
        </Card>

        {isReferenceImplementation ? (
          <Card>
            <Card.Body>
              <Card.Title>Geïmplementeerd door</Card.Title>
              <ImplementedByListContainer id={id} />
            </Card.Body>
          </Card>
        ) : null}

        {!isReferenceImplementation &&
        referenceImplementationsFromRelations(relations).length > 0 ? (
          <Card>
            <Card.Body>
              <Card.Title>Referentie implementatie</Card.Title>
              {referenceImplementationsFromRelations(relations).map((apiId) => (
                <LinkToAPIContainer id={apiId} key={apiId} />
              ))}
            </Card.Body>
          </Card>
        ) : null}

        {badges && badges.length ? (
          <Card data-test="api-badges">
            <Card.Body>
              <Card.Title>Badges</Card.Title>
              <ul data-test="api-badges-list">
                {badges.map((badge: string, i: number) => (
                  <li key={`${i}-${badge}`}>{badge}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        ) : null}
      </CardsContainer.SideBar>
    </CardsContainer>
  </StyledAPIDetails>
)

export default APIDetails
