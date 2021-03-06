// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { backendApiMock, apiMock } from '../models/api.mock'
import APIDetailsRepository from './api-details-repository'

describe('the API Details Repository', () => {
  describe('getting API Details by id', () => {
    describe('when the API exists', () => {
      beforeEach(() => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(backendApiMock),
          }),
        )
      })

      afterEach(() => global.fetch.mockRestore())

      it('should return the API Details', async () => {
        const result = await APIDetailsRepository.getById('id')

        expect(result).toEqual(apiMock)

        expect(global.fetch).toHaveBeenCalledWith('/api/apis/id')
      })
    })
  })
})
