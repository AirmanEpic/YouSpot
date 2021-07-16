tests = require('./testSuite.js');

const url = 'https://qg5ust8z59.execute-api.us-east-2.amazonaws.com/default/YouSpot/';
const key = 'N7Dfgz1L9649QlBiJxQ765VK19s8j33D2TdxXG1t';

/** simply test function to manually eke out a result from the pinged endpoint */
async function main() {
  const res = await tests.pingAPI({url: url, key: key}, 'heartbeat', {});
  console.log(res);
}

main();


