const {testSuite} = require('./testSuite.js');

/** This executes all the tests after a delay. The test suite was passed to it via import. */
const runTestsDelayed = async function(branch) {
  let allPassing = true;
  for (const test of testSuite) {
    //actually execute the test
    const res = await test.test(branch);
    if (res != test.expects) {
      //if we have an unexpected result, we should log it and make sure that everyone knows it's unexpected.
      console.error(test.error, 'Expected: ', test.expects, 'Got: ', res);
      allPassing = false;
      if (test.breaking) {
        //tests can be breaking, which means that they will all tests immediately if they fail.
        process.exit(2);
      }
    } else {
      //alles gut so we're going to print that.
      console.log(test.name+': passing');
    }
  }

  if (allPassing) {
    process.exit(0);
  } else {
    process.exit(2);
  }
};

/** Delay execution of tests */
exports.runTests = function(branch) {
  console.log('Starting tests, waiting 60 seconds to allow lambda upload');
  setTimeout(()=>{
    runTestsDelayed(branch);
  }, 6000);
};
