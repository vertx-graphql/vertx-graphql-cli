#!/usr/bin/env node

// Check node version before requiring/doing anything else
// The user may be on a very old node version

const chalk = require('chalk')
const semver = require('semver')
const didYouMean = require('didyoumean')

const pkg = require('../package.json')

// Setting edit distance to 60% of the input string's length
didYouMean.threshold = 0.6

function checkNodeVersion (wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}

checkNodeVersion(pkg.engines.node, 'vertx-graphql-cli')

if (semver.satisfies(process.version, '9.x')) {
  console.log(chalk.red(
    `You are using Node ${process.version}.\n` +
    `Node.js 9.x has already reached end-of-life and will not be supported in future major releases.\n` +
    `It's strongly recommended to use an active LTS version instead.`
  ))
}

const fs = require('fs')
const path = require('path')
const slash = require('slash')
const minimist = require('minimist')
const program = require('commander')

program
  .version(pkg.version, '-v, --version')
  .description(pkg.description)
  .usage('<command> [options]')

program.parse(process.argv);
