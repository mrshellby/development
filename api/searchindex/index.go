package searchindex

import (
	"github.com/blevesearch/bleve"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"log"
)

// Setup search index for Bleve with provided data
func Setup(indexDirectoryPath string, data []models.API) bleve.Index {
	apiIndex, errIndex := bleve.Open(indexDirectoryPath)

	if errIndex == bleve.ErrorIndexPathDoesNotExist {
		mapping := bleve.NewIndexMapping()
		apiIndex, errNewIndex := bleve.New(indexDirectoryPath, mapping)

		if errNewIndex != nil {
			log.Fatal(errNewIndex)
		}

		// index the data
		for _, apiModel := range data {
			addToIndexErr := apiIndex.Index(apiModel.Id, apiModel)

			if addToIndexErr != nil {
				log.Fatal(addToIndexErr)
			}
		}
	} else if errIndex != nil {
		log.Fatal(errIndex)
	}

	return apiIndex
}