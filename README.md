# Martian Robots

[![Build Status](https://travis-ci.org/InsidersByte/martian-robots.svg?branch=master)](https://travis-ci.org/InsidersByte/martian-robots)

# Usage

```sh
martian-robots <file>

    Options
      -k, --no-color         Omit color from output
          --debug            Show debug information
      -h, --help             Display help and usage details


    #Examples
    martian-robots ./example/instructions.txt
```

# Dev

* `nvm use` || Install [Node.js](https://nodejs.org/en/)
* Install [Yarn](https://yarnpkg.com/)

```sh
# Install the dependencies (npm will work too)
yarn install

# Compile the cli
yarn run build
yarn run build:watch

# Run the tests
yarn run flow
yarn run lint
yarn run test
yarn run test:watch

# Use the cli
npm link
martian-robots ./example/instructions.txt
```
