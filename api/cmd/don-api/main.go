// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package main

import (
	"log"

	"gitlab.com/commonground/developer.overheid.nl/api/resources"

	"github.com/jessevdk/go-flags"
	"gitlab.com/commonground/developer.overheid.nl/api"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

var options struct {
	ListenAddressPlain string `long:"listen-address-plain" env:"LISTEN_ADDRESS_PLAIN" default:"0.0.0.0:8080" description:"Address for the API to listen on. Read https://golang.org/pkg/net/#Dial for possible tcp address specs."`
	GitlabHost         string `long:"gitlab-host" env:"GITLAB_HOST" default:"gitlab.com" description:"The Gitlab host that is running the issue tracker for submitting new API's."`
	GitlabAccessToken  string `long:"gitlab-access-token" env:"GITLAB_ACCESS_TOKEN" default:"" description:"The Gitlab access token that is used for creating issues."`
	GitlabProjectID    string `long:"gitlab-project-id" env:"GITLAB_PROJECT_ID" default:"" description:"The id of the project in Gitlab where issues are created."`
}

func main() {
	// Parse options
	args, err := flags.Parse(&options)
	if err != nil {
		if et, ok := err.(*flags.Error); ok {
			if et.Type == flags.ErrHelp {
				return
			}
		}
		log.Fatalf("error parsing flags: %v", err)
	}
	if len(args) > 0 {
		log.Fatalf("unexpected arguments: %v", args)
	}

	// Setup new zap logger
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, err := config.Build()

	if err != nil {
		log.Fatalf("failed to create new zap logger: %v", err)
	}
	defer func() {
		syncErr := logger.Sync()
		if syncErr != nil {
			log.Fatalf("failed to sync zap logger: %v", syncErr)
		}
	}()

	gitlabConfig := resources.GitlabConfig{
		Host:        options.GitlabHost,
		AccessToken: options.GitlabAccessToken,
		ProjectID:   options.GitlabProjectID,
	}

	apiServer := api.NewServer(logger, gitlabConfig)
	logger.Info("API running on", zap.String("address", options.ListenAddressPlain))

	// Listen on the address provided in the options
	err = apiServer.ListenAndServe(options.ListenAddressPlain)
	if err != nil {
		logger.Fatal("failed to listen and serve", zap.Error(err))
	}
}
