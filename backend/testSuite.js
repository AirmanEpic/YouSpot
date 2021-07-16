const got = require('got');

// anatomy of a test:
// name: self-explanatory. Will display "<name> is passing"
// error: displays if failing
// test: executes the test. Branch requires a url and a key to be passed to it.
// expects: the expected return value of the test function
// breaking: if this is true and the test fails, no further tests will be run.

exports.testSuite = [
  {
    name: 'Basic Health',
    error: 'Server is responding improperly to basic health check.',
    test: async function(branch) {
      return await exports.pingAPI(branch, 'heartbeat', {});
    },
    expects: 'Healthy!',
    breaking: true,
  },

];

/** Simple API ping command. Should simply return the response of the ping.*/
exports.pingAPI = async function(branch, endpoint, argus) {
  const {body} = await got.post(branch.url,
      {
        responseType: 'json',
        json: {endpoint: endpoint, args: argus},
        headers: {
          'x-api-key': branch.key,
        },
      });
  return body;
};
