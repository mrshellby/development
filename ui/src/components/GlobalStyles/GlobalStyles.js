import { createGlobalStyle } from 'styled-components'

const generateFontFaceDefinition = (fontDefinition) => `
  @font-face {
      font-family: 'Source Sans Pro'
      font-weight: ${fontDefinition.weight}
      font-style: ${fontDefinition.style}
      font-stretch: normal
      src:
        url('/public/fonts/source-sans-pro/SourceSansPro-${fontDefinition.fileName}.woff2') format('woff2'),
        url('/public/fonts/source-sans-pro/SourceSansPro-${fontDefinition.fileName}.woff') format('woff')
  }
`

const generateFontFaceDefinitions = (fontDefinitions) =>
  fontDefinitions.map((fontDefinition) =>
    generateFontFaceDefinition(fontDefinition),
  )

const fontDefinitions = [
  { weight: 400, style: 'normal', fileName: 'Regular' },
  { weight: 600, style: 'normal', fileName: 'Semibold' },
  { weight: 700, style: 'normal', fileName: 'Bold' },
]

export default createGlobalStyle`
  ${generateFontFaceDefinitions(fontDefinitions)}

  html {
    color: ${(p) => p.theme.color.text.normal};
    font-family: 'Source Sans Pro', sans-serif;
    font-size: ${(p) => p.theme.font.size.normal};
    line-height: ${(p) => p.theme.font.lineHeight.normal};
    text-rendering: optimizeLegibility;
    touch-action: manipulation;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: #F7F9FC;
    margin: 0;
    word-wrap: break-word;
    word-break: break-word;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  p {
    margin: 0 0 14px 0;
  }
`