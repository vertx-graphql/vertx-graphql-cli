workflow "build and test" {
  on = "push"
  resolves = ["test", "coverage", "lint"]
}

workflow "publish on release" {
  on = "release"
  resolves = ["publish"]
}

action "build" {
  uses = "actions/npm@master"
  args = "ci"
}

action "test" {
  needs = "build"
  uses = "actions/npm@master"
  args = "t"
}

action "coverage" {
  needs = "build"
  uses = "actions/npm@master"
  args = "run coverage"
}

action "lint" {
  needs = "build"
  uses = "actions/npm@master"
  args = "run lint"
}

action "publish" {
  uses = "actions/npm@master"
  args = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
}