// Copyright © VNG Realisatie 2019
// Licensed under the EUPL

package api

import (
	"testing"

	"gitlab.com/commonground/developer.overheid.nl/api/gitlab"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func TestAPIServer(t *testing.T) {
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, err := config.Build()
	if err != nil {
		t.Error(err)
	}

	apiServer := NewServer(logger, gitlab.Config{})
	if apiServer == nil {
		t.Error()
	}
}
