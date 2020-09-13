Run npm i to install the base node modules, and the dependencies in package.json

## Available Scripts

In the project directory, you can run:

### `nodemon index.js`
Launches the server, and automatically restarting the node application when file changes in the directory are detected.

### `eslint **/*.js`
Runs a linter against the JS files in the server directory with the rules indicated in the .eslintrc.json file.

### `nyc mocha Node.test.js`
Runs Mocha/Chai testing and code coverage in the Node.test.js file, which tests the server's index.js file.
