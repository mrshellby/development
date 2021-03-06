// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useState, useEffect } from 'react'
import { array, bool, string, oneOf } from 'prop-types'
import { Formik, Field } from 'formik'
import {
  Alert,
  Label,
  TextInput,
  Button,
  ErrorMessage,
  SelectFormik,
} from '@commonground/design-system'

import CodeRepository from '../../domain/code-repository'
import objectKeysToSnakeCase from '../../utils/objectKeysToSnakeCase'
import { modelFromAPIResponse } from '../../models/api'
import { GITLAB_REPO_URL } from '../../constants'
import APIRepository from '../../domain/api-repository'
import { StyledFieldset, HelperMessage, Spacing } from './SubmitCodeForm.styles'
import validationSchema from './validationSchema'

const initialValues = {
  url: '',
  relatedApis: [],
}

const SubmitCodeForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [apis, setApis] = useState([])

  async function loadApis() {
    try {
      const response = await APIRepository.getAll()
      const apis = response.results.map((api) => modelFromAPIResponse(api))
      setApis(apis)
    } catch (e) {
      console.error(e.message)
      setError(e.message)
    }
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(
    () => {
      loadApis()
    },
    [] /* Only load once */,
  )
  /* eslint-enable react-hooks/exhaustive-deps */

  const submitCode = async (code) => {
    setError(false)
    setLoading(true)

    const submitValues = {
      url: code.url,
      relatedApis: code.relatedApis,
    }

    try {
      const responseData = await CodeRepository.create(
        objectKeysToSnakeCase(submitValues),
      )
      setResponseData(responseData)
    } catch (e) {
      if (e.message) {
        setError(e.message)
      } else {
        setError(
          'Er ging iets fout tijdens het toevoegen van de code. Gelieve opnieuw te proberen.',
        )
      }
    }

    setLoading(false)
  }

  if (responseData) {
    return (
      <p data-test="code-submitted-message">
        De code is toegevoegd.{' '}
        <a
          href={responseData.web_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {responseData.web_url}
        </a>
      </p>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitCode}
      data-test="form"
    >
      {({ errors, touched, handleSubmit, setFieldValue, setFieldTouched }) => (
        <form onSubmit={handleSubmit} data-testid="form">
          <StyledFieldset disabled={loading}>
            <Alert variant="info" className="axe-ignore">
              Momenteel kunnen alleen projecten toegevoegd worden die een API
              gebruiken uit het API overzicht van Developer Overheid.
              <br />
              <br />
              Ook graag een ander project toevoegen? Laat het ons weten via
              GitLab.
              <br />
              <br />
              <a
                href={`${GITLAB_REPO_URL}/issues`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Melding maken op GitLab
              </a>
            </Alert>

            <TextInput name="url" size="l">
              Project URL
              <HelperMessage>
                We ondersteunen URLs van GitLab repositories/snippets en GitHub
                repositories/gists.
              </HelperMessage>
            </TextInput>

            <Spacing>
              <Label htmlFor="relatedApis">Gebruikte API(’s)</Label>
              <HelperMessage>
                We ondersteunen URLs van GitLab repositories/snippets en GitHub
                repositories/gists.
              </HelperMessage>
              <Field
                aria-label="Gebruikte API's"
                component={SelectFormik}
                name="relatedApis"
                size="l"
                isMulti="true"
                placeholder=""
                options={apis.map((api) => ({
                  value: api.id,
                  label: api.organizationName + ' - ' + api.serviceName,
                }))}
              />
            </Spacing>
            {errors.relatedApis && touched.relatedApis && (
              <ErrorMessage data-test="error-message" className="axe-ignore">
                {errors.relatedApis}
              </ErrorMessage>
            )}
            {error && (
              <ErrorMessage className="axe-ignore">{error}</ErrorMessage>
            )}
          </StyledFieldset>
          <Button type="submit" disabled={loading}>
            Project toevoegen
          </Button>
        </form>
      )}
    </Formik>
  )
}

// Change children from 'string' to 'array' as we include HelperMessage in TextInput
TextInput.propTypes = {
  showError: bool,
  children: array.isRequired,
  name: string.isRequired,
  size: oneOf(['xs', 's', 'm', 'l', 'xl']),
  disabled: bool,
}

export default SubmitCodeForm
