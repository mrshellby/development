import React from 'react'
import {StyledAbout, StyledPageTitle} from './index.styles'
import PageContentCard from '../../components/PageContentCard'

const About = () =>
    <StyledAbout>
      <StyledPageTitle>Over</StyledPageTitle>

      <PageContentCard>
        <p>
            De website developer.overheid.nl is een wegwijzer naar de <abbr title="Application Programming Interfaces">API’s</abbr> die (semi-)overheidsorganisaties in Nederland aanbieden.
        </p>
        <p>
            Deze website is ‘permanent beta’, en zal worden aangepast naar de behoeften van gebruikers. Wensen en opmerkingen kunnen via het contactadres worden doorgegeven.
        </p>
        <p>
            Deze website is een initiatief van het ministerie van Binnenlandse Zaken en Koninkrijksrelaties in samenwerking met de Vereniging van Nederlandse Gemeenten / VNG Realisatie
        </p>
        
        <p>Verantwoordelijkheid</p>
        <p>
            De informatie die op deze site wordt aangeboden is afkomstig van andere overheidsorganisaties. Deze organisaties zijn zelf verantwoordelijk voor hun diensten en gegevens. 
        </p>

        <p>Persoonsgegevens en cookies</p>
        <p>
            Deze website verzamelt geen persoonsgegevens, zet geen cookies en verzamelt geen persoonsgebonden analytische informatie. 
        </p>

        <p>Toegankelijkheid</p>
        <p>
            Deze site is ontworpen om te voldoen aan de vereisten van WCAG 2.0 en de Nederlandse extensies daarop. Omdat aanmelden en omschrijven van de API’s een open systeem is, kunnen we niet garanderen dat de site altijd aan de redactionele vereisten voldoet. Verbeterpunten kunnen worden doorgegeven via het contactadres.
        </p>
        
        <p>
          De broncode van deze website is te vinden op <a href="https://gitlab.com/commonground/developer.overheid.nl">GitLab</a>.
        </p>
      </PageContentCard>
    </StyledAbout>

export default About
