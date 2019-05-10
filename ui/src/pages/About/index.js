import React from 'react'
import { Link } from 'react-router-dom'
import {StyledAbout, StyledPageTitle} from './index.styles'
import PageContentCard from '../../components/PageContentCard'

const About = () =>
    <StyledAbout>
      <StyledPageTitle>Over</StyledPageTitle>

      <PageContentCard>
        <p>
            De website developer.overheid.nl is een wegwijzer naar de Application Programming Interfaces (API’s) die (semi-)overheidsorganisaties in Nederland aanbieden.
        </p>
        <p>
            Deze website is ‘permanent beta’, en zal worden aangepast naar de behoeften van gebruikers. Wensen en opmerkingen kunnen via het contactadres worden doorgegeven.
        </p>
        <p>
            Deze website is een initiatief van het ministerie van Binnenlandse Zaken en Koninkrijksrelaties in samenwerking met de Vereniging van Nederlandse Gemeenten / VNG Realisatie
        </p>
        
        <h3>Verantwoordelijkheid</h3>
        <p>
            De informatie die op deze site wordt aangeboden is afkomstig van andere overheidsorganisaties. Deze organisaties zijn zelf verantwoordelijk voor hun diensten en gegevens. 
        </p>

        <h3>Persoonsgegevens en cookies</h3>
        <p>
            Deze website verzamelt geen persoonsgegevens, zet geen cookies en verzamelt geen persoonsgebonden analytische informatie. 
        </p>

        <h3>Toegankelijkheid</h3>
        <p>
            Deze site is ontworpen om te voldoen aan de vereisten van WCAG 2.0 en de Nederlandse extensies daarop. Omdat aanmelden en omschrijven van de API’s een open systeem is, kunnen we niet garanderen dat de site altijd aan de redactionele vereisten voldoet. Verbeterpunten kunnen worden doorgegeven via het contactadres.
        </p>
        
        <p>
          De broncode van deze website is te vinden op <a href="https://gitlab.com/commonground/developer.overheid.nl">GitLab</a>.
        </p>
      </PageContentCard>
    </StyledAbout>

export default About
