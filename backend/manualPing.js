tests = require('./testSuite.js');

// Prod
// const url = 'https://qg5ust8z59.execute-api.us-east-2.amazonaws.com/default/YouSpot/';
// const key = 'N7Dfgz1L9649QlBiJxQ765VK19s8j33D2TdxXG1t';

// dev
const url = 'https://ndwr1ks2f9.execute-api.us-east-2.amazonaws.com/default/YouSpot/';
const key = 'GgmDMVSvcm5XpGCbHsZHhXwzQT6DYyS5S9SXrw39';

/** simply test function to manually eke out a result from the pinged endpoint */
async function main() {
  const res = await tests.pingAPI({url: url, key: key}, 'heartbeat', {});
  console.log(res);
}

main();


