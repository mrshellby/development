package api

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	data_readers "gitlab.com/commonground/developer.overheid.nl/api/data-readers"
	"gitlab.com/commonground/developer.overheid.nl/api/models"
	"gitlab.com/commonground/developer.overheid.nl/api/resources"
	"go.uber.org/zap"
)

func NewAPIResource(logger *zap.Logger, rootDirectoryAPIDefinitions string, readFile func(path string) (models.API, error),
	readDirectory func(directory string) ([]models.API, error)) *resources.APIResource {
	i := &resources.APIResource{
		Logger:                      logger,
		RootDirectoryAPIDefinitions: rootDirectoryAPIDefinitions,
		ReadFile:                    readFile,
		ReadDirectory:               readDirectory,
	}
	return i
}

func NewTagResource(logger *zap.Logger, rootDirectoryAPIDefinitions string, readDirectory func(directory string) ([]models.API, error)) *resources.TagResource {
	i := &resources.TagResource{
		Logger:                      logger,
		RootDirectoryAPIDefinitions: rootDirectoryAPIDefinitions,
		ReadDirectory:               readDirectory,
	}
}

func NewSubmitAPIResource(logger *zap.Logger) *resources.SubmitAPIResource {
	i := &resources.SubmitAPIResource{
		Logger: logger,
	}

	return i
}

func router(logger *zap.Logger) chi.Router {
	r := chi.NewRouter()

	r.Use(middleware.Logger)

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok"))
	})

	r.Route("/api", func(r chi.Router) {
		r.Mount("/apis",
			NewAPIResource(logger,
				"../data",
				data_readers.File,
				data_readers.Directory).Routes(),
		)
		r.Mount("/submit-api",
			NewSubmitAPIResource(
				logger,
			).Routes(),
		)
		r.Mount("/tags",
			NewTagResource(logger,
				"../data",
				data_readers.Directory).Routes(),
		)
	})

	return r
}
