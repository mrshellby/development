import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { ThemeProvider } from 'styled-components'
import theme from './theme'

import Home from './pages/Home/Home'
import SubmitAPI from './pages/SubmitAPI/SubmitAPI'
import About from './pages/About/About'
import APIDetail from './pages/APIDetail/APIDetail'
import Overview from './pages/Overview/Overview'
import TopBarContainer from './components/TopBarContainer/TopBarContainer'
import MobileNavigation from './components/MobileNavigation/MobileNavigation'
import GlobalStyles from './components/GlobalStyles/GlobalStyles'

const APISpecification = lazy(() =>
  import(
    /* webpackChunkName: "api-specification" */ './pages/APISpecification/APISpecification'
  ),
)

const LANDSCAPE_PHONES = 576

const App = () => (
  <ThemeProvider theme={theme}>
    <div className="App">
      <GlobalStyles />
      <Router>
        <MediaQuery maxWidth={LANDSCAPE_PHONES - 1}>
          <MobileNavigation />
        </MediaQuery>
        <MediaQuery minWidth={LANDSCAPE_PHONES}>
          <TopBarContainer />
        </MediaQuery>
        <Suspense fallback={<div />}>
          <main role="main">
            <Route path="/" exact component={Home} />
            <Route path="/detail/:id" exact component={APIDetail} />
            <Route
              path="/detail/:id/:environment/specificatie"
              component={APISpecification}
            />
            <Route path="/overzicht" component={Overview} />
            <Route path="/api-toevoegen" component={SubmitAPI} />
            <Route path="/over" component={About} />
          </main>
        </Suspense>
      </Router>
    </div>
  </ThemeProvider>
)

export default App
