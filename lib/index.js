#!/usr/bin/env node

// Check node version before requiring/doing anything else
// The user may be on a very old node version

const fs = require('fs')
const path = require('path')
const slash = require('slash')
const chalk = require('chalk')
const semver = require('semver')
const minimist = require('minimist')
const program = require('commander')

const environment = require('./environment')
const pkg = require('../package.json')

environment.checkNodeVersion(pkg.engines.node, 'vertx-graphql-cli')
environment.checkRecommendations()

program
  .version(pkg.version, '-v, --version')
  .description(pkg.description)
  .usage('<command> [options]')

program.parse(process.argv);
