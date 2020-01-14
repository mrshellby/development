import { formatOptions, facetsContainTermsForFilterByKey } from './APIFilters'

describe('formatting API terms to options', () => {
  it('should format terms to options', () => {
    const testCases = [
      { terms: [], expected: [] },
      {
        terms: [{ term: '42', count: 5 }],
        expected: [{ value: '42', label: '42', count: 5, disabled: false }],
      },
      {
        terms: [{ term: 'gRPC', count: 5 }, { term: 'GraphQL', count: 0 }],
        expected: [
          { value: 'gRPC', label: 'gRPC', count: 5, disabled: false },
          { value: 'GraphQL', label: 'GraphQL', count: 0, disabled: true },
        ],
      },
    ]

    testCases.forEach((testCase) => {
      const actual = formatOptions(testCase.terms)
      expect(actual).toEqual(testCase.expected)
    })
  })
})

describe('check if facets contains terms for a filter', () => {
  it('should return a boolean', () => {
    const testCases = [
      { facets: { tags: { terms: [] } }, filter: 'tags', expected: false },
      {
        facets: { tags: { terms: [{ term: 'foo', count: 1 }] } },
        filter: 'tags',
        expected: true,
      },
    ]

    testCases.forEach((testCase) => {
      const actual = facetsContainTermsForFilterByKey(
        testCase.facets,
        testCase.filter,
      )
      expect(actual).toEqual(testCase.expected)
    })
  })
})