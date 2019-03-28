const { analyzeAccessibility } = require('../accessibility')
const { getBaseUrl, isDebugging } = require('../environment')

describe('About', () => {
    beforeAll(async () => {
        const baseUrl = getBaseUrl(isDebugging())
        await page.goto(`${baseUrl}/over`, { waitUntil: 'load' });
    })

    it('should show the page title', async () => {
        const html = await page.$eval('main h1', e => e.innerHTML)
        await page.screenshot({ path: 'screenshots/about.page-title.png' });
        expect(html).toBe('Over')
    })

    it('should not have accessibility issues', async () => {
        const accessibilityReport = await analyzeAccessibility(page, `about.accessibility.png`)
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
    })
})