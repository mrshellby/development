const { terminalLog, sizes } = require("../support")

describe('API Overview', () => {

  beforeEach(() => {
    cy.visit('/apis')
  })

  it('should show the page title', () => {
    cy.get('h1').contains("API's binnen de Nederlandse overheid")
  })

  it('should have an add API button', () => {
    const button = cy.contains('API toevoegen')
    button.click()
    cy.url().should('include', '/apis/add/form')
  })

  it('should have a search API field', () => {
    const input = cy.get('input')
    input.type("xxx")
    cy.contains("Er zijn (nog) geen API's beschikbaar.")
  })

  it('should have filters for API type', () => {
    const checkbox = cy.get('[type="checkbox"]').first().parent().click()
    cy.url().should('include', '/apis?type=rest_json')
  })

  it('should have filters for organisation', () => {
    const checkbox = cy.get('[type="checkbox"]').eq(4).parent().click()
    cy.get('[type="checkbox"]').eq(4).parent().then(function (elem) {
      const regExNum = /^.*?\([^\d]*(\d+)[^\d]*\).*$/
      const number = regExNum.exec(elem.text())[1]

      cy.contains(`${number} API`)

      cy.url().should('include', `organisatie=`)
    })
  })

  it(`should have a list of API's`, () => {
    cy.get('[data-test="link"]').first().as("link")
    cy.get("@link").screenshot()
    cy.get('[data-test="link"] > div').first().then(function (elem) {
      cy.get("@link").click()
      cy.get('h1').contains(elem.text(), { matchCase: false })
    })
  })

  describe('Pagination', () => {
    it('should have pagination', () => {
      const pagination = cy.get('[data-testid="pagination"]')
      pagination.get('button').contains("2").click()
      cy.url().should('include', `pagina=2`)
    })

    it('should have results per page', () => {
      const resultsPerPage = cy.get("#resultsPerPage").as('select')
      cy.get('@select').select('25').should('have.value', '25')
      cy.url().should('include', `aantalPerPagina=25`)
    })
  })

  context('a11y', () => {
    sizes.forEach(size => {
      it(`${size.toString().replace(",", "x")}: has no detectable a11y violations on load`, () => {
        if (Cypress._.isArray(size)) {
          cy.viewport(size[0], size[1])
        } else {
          cy.viewport(size)
        }
        cy.visit('/apis')
        cy.screenshot()

        cy.injectAxe()
        // Test the page at initial load
        cy.checkA11y(null, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a']
          }
        }, terminalLog)
      })
    })
  })

})