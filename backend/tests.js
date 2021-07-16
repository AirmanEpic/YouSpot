const {testSuite} = require('./testSuite.js');

const runTestsDelayed = async function(branch) {
  let allPassing = true;
  for (const test of testSuite) {
    const res = await test.test(branch);
    if (res != test.expects) {
      console.error(test.error, "Expected: ",test.expects,"Got: ",res);
      allPassing = false;
      if (test.breaking) {
        process.exit(2);
      }
    } else {
      console.log(test.name+': passing');
    }
  }

  if (allPassing) {
    process.exit(0);
  } else {
    process.exit(2);
  }
};

exports.runTests = function(branch){
  console.log("Starting tests, waiting 60 seconds to allow lambda upload")
  setTimeout(()=>{
    runTestsDelayed(branch)
  },60000)
}