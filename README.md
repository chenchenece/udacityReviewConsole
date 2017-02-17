README v0.0 / 17 FEBRUARY 2017

# Starter project for Node.js applications

## Introduction

This project contains the basic framework for a node.js application. It also includes some tasks that allow easier development of applications.


## Contributing

To implement new features, create a new branch and work from there. Only issue a merge request if the feature is complete. This ensures that the master branch is always stable.

## Installation

Make sure you have [node.js](https://nodejs.org/en/) installed before proceeding further:
   1. Clone this repository on the development machine
   2. Open a terminal window at this directory path
   3. Type in the following command `npm install`
   3. To start the server in development environment, type in the following command `npm dev-start`

## Build Process

The project uses Gulp for running tasks. To build the app, please ensure that both *gulp* and *gulp-utils* packages are installed.
`npm install -g gulp`

The current build process is outlined below:
  1. The contents of the *dist* folder are deleted.
  2. The CSS files and JS files in the *assets* directory are minified and copied to the *dist* directory.
  3. The images are copied form the *assets* directory to the *dist* directory.

  **CAUTION:** Changes made to the *dist* directory will be overwritten on the next build, please ensure changes are made in the *assets* directory.

##Development

In order to run a development server, type in `npm dev-start` in the terminal. This starts a server with browser-sync. Gulp also watches the CSS and JS files in the assets directory for changes and automatically refreshes the browser.

## Credits

This project is developed and maintained by [Kunal Bhuwalka](https://github.com/pirateship14).

## Contact

In case of any claims, complaints or any other issues, contact kunalbhuwalka+developer@gmail.com
