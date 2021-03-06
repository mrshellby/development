// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { shallow } from 'enzyme'

import { RedocStandalone } from 'redoc'

import { flushPromises } from '../../test-helpers'

import APIDetailsHeader from '../../components/APIDetailsHeader/APIDetailsHeader'
import { EnvironmentType } from '../../models/enums'
import APISpecification from './APISpecification'

const apiResponseObject = {}
apiResponseObject.description = 'Description'
apiResponseObject.organizationName = 'Organization Name'
apiResponseObject.serviceName = 'Service Name'
apiResponseObject.apiType = 'rest_json'
apiResponseObject.environments = [
  {
    name: EnvironmentType.PRODUCTION,
    apiUrl: 'API URL',
    specificationUrl: 'Specification URL',
    documentationUrl: 'Documentation URL',
  },
]

describe('APISpecification', () => {
  describe('on initialization', () => {
    it('should load the API details', () => {
      jest.spyOn(APISpecification.prototype, 'loadDetailsForApi')

      const wrapper = shallow(
        <APISpecification match={{ params: { id: 'organization-service' } }} />,
      )
      expect(wrapper.instance().loadDetailsForApi).toHaveBeenCalled()
    })
  })

  describe('loading the API details', () => {
    it('should store the API model as state', async () => {
      const apiPromise = Promise.resolve(apiResponseObject)
      const getApiDetailsByIdMock = jest.fn(() => apiPromise)

      const wrapper = shallow(
        <APISpecification
          match={{
            params: { id: 'organization-service', environment: 'production' },
          }}
          getApiDetailsById={getApiDetailsByIdMock}
        />,
      )
      await apiPromise
      expect(wrapper.state('details')).toEqual(apiResponseObject)
    })

    it('should render the Redoc standalone component with the correct url', async () => {
      const apiPromise = Promise.resolve(apiResponseObject)
      const getApiDetailsByIdMock = jest.fn(() => apiPromise)

      const wrapper = shallow(
        <APISpecification
          match={{
            params: { id: 'organization-service', environment: 'production' },
          }}
          getApiDetailsById={getApiDetailsByIdMock}
        />,
      )
      await apiPromise
      expect(wrapper.find(RedocStandalone).prop('specUrl')).toEqual(
        '/api/apis/organization-service/production/specification',
      )
    })

    it('should render the APIDetailsHeader with the correct external spec url', async () => {
      const apiPromise = Promise.resolve(apiResponseObject)
      const getApiDetailsByIdMock = jest.fn(() => apiPromise)

      const wrapper = shallow(
        <APISpecification
          match={{
            params: { id: 'organization-service', environment: 'production' },
          }}
          getApiDetailsById={getApiDetailsByIdMock}
        />,
      )
      await apiPromise
      expect(
        wrapper.find(APIDetailsHeader).prop('externalSpecificationUrl'),
      ).toEqual('Specification URL')
    })

    it('should show an error message if loading failed', async () => {
      console.error = jest.fn()

      const apiErrorPromise = Promise.reject(
        new Error('arbitrary reject reason'),
      )
      const getApiDetailsByIdErrorMock = jest.fn(() => apiErrorPromise)

      const wrapper = shallow(
        <APISpecification
          match={{
            params: { id: 'organization-service', environment: 'production' },
          }}
          getApiDetailsById={getApiDetailsByIdErrorMock}
        />,
      )

      await flushPromises()
      expect(wrapper.find('[data-test="error-message"]').exists()).toEqual(true)
    })
  })
})
