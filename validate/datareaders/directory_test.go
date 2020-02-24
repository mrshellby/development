package datareaders

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"gitlab.com/commonground/developer.overheid.nl/validate/models"
)

func TestDirectory(t *testing.T) {
	expected := []models.API{
		{
			ID:                "company-service",
			Description:       "Test Description",
			OrganizationName:  "Test Organization Name",
			ServiceName:       "Test Service Name",
			APIType:           "REST/JSON",
			APIAuthentication: "API Key",
			Tags:              []models.Tag{"test tag"},
			Environments: []models.APIEnvironment{
				{
					Name:             models.ProductionEnvironment,
					APIURL:           "Test API URL",
					SpecificationURL: "Test Specification URL",
					DocumentationURL: "Test Documentation URL",
				},
			},
			Forum: &models.Forum{
				Vendor: "discourse",
				URL:    "https://forum.test.org",
			},
			Contact: models.APIContactDetails{
				Email: "name@example.nl",
				Phone: "0031612345678",
				Fax:   "0031687654321",
				Chat:  "https://nl-x.slack.com",
			},
			IsReferenceImplementation: false,
			Relations: map[string][]string{
				"api-id": {"reference-implementation"},
			},
			TermsOfUse: models.APITermsOfUse{
				GovernmentOnly:      true,
				PayPerUse:           false,
				UptimeGuarantee:     99.9,
				SupportResponseTime: "2 days",
			},
			Scores: nil,
		},
		models.API{
			ID:                "other-service",
			Description:       "Some other API",
			OrganizationName:  "Test Organization Name",
			ServiceName:       "Test Service Name",
			APIType:           "REST/JSON",
			APIAuthentication: "API Key",
			Tags:              []models.Tag{"test tag"},
			Environments: []models.APIEnvironment{
				{
					Name:             models.ProductionEnvironment,
					APIURL:           "Test API URL",
					SpecificationURL: "Test Specification URL",
					DocumentationURL: "Test Documentation URL",
				},
				{
					Name:             "Acceptatie",
					APIURL:           "Test Acceptatie API URL",
					SpecificationURL: "Test Acceptatie Specification URL",
					DocumentationURL: "Test Acceptatie Documentation URL",
				},
				{
					Name:             "Demo",
					APIURL:           "Test Demo API URL",
					SpecificationURL: "Test Demo Specification URL",
					DocumentationURL: "Test Demo Documentation URL",
				},
			},
			Contact: models.APIContactDetails{
				Email: "name@example.nl",
				Phone: "0031612345678",
				Fax:   "0031687654321",
				Chat:  "https://nl-x.slack.com",
			},
			Relations: map[string][]string{
				"api-id": {"reference-implementation"},
			},
			TermsOfUse: models.APITermsOfUse{
				GovernmentOnly:      true,
				PayPerUse:           false,
				UptimeGuarantee:     99.9,
				SupportResponseTime: "2 days",
			},
		},
	}

	actual, err := Directory("./test-data/valid/apis")

	if err != nil {
		fmt.Println(err)
	}

	assert.Equal(t, expected, actual)
}