const AWS = require('aws-sdk');
const https = require('https');
const dynamo = new AWS.DynamoDB.DocumentClient();

/* Endpoints */
/** healthCheck: Simply returns "healthy" as a basic server health check. */
healthCheck = function(data) {
  return ['Healthy!', 200];
};
/** findSong: Searches for song in the Spotify API. */
/* Parameters:
 * query  (string):             What the user is searching
 * type   (string):             Album, artist, playlist, track, show, or episode
 * market (string): (optional)  Localization. Default is US
 * limit  (int):    (optional)  How many entries to return. Default is 1
 */
/* Reference: https://developer.spotify.com/documentation/web-api/reference/#endpoint-search */
findSong = function(data) {
  const query = data.query;
  const type = data.type;
  const market = data.market;
  const limit = data.limit;

  const options = {
    hostname: 'api.spotify.com',
    port: 443,
    path: ('/v1/search?q=' + query + '&type=' + type + '&market=' + market + '&limit=' + limit).replace(' ', '%20'),
    method: 'GET',
    headers: {
      'Authorization': 'Bearer BQAOm4p3Wf-d6ZbMH0cwu7gDST6Kxcg_KEYoroxwHKSb7MWyz5nA9UDuv6Dc3hIozKZyDbtjVL0m3g1v26Oc3Dpc_xgbCyS-G_QHzo_n1w8CTk_P1LyDQTogA6kXKrfpeUFhP139aoWmaxnHQlg',
    },
  };
  
  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
};

/** getRecommendations: Given a Spotify song ID, returns Spotify recommendations*/
getRecommendations = function(data) {
  return 'Not implemented';
};

const endpoints = ['findSong', 'getRecommendations', 'heartbeat'];

const endpointFunctions = {
  findSong: findSong,
  getRecommendations: getRecommendations,
  heartbeat: healthCheck,
};

/** Endpoint parser: parses and routes the endpoint to the correct function */
router = function(data) {
  if (!data.endpoint) {
    return [`error: no endpoint data received. Got: ${data}`, 403];
  }

  // validate the endpoint against a real list of endpoints.
  const endpointIndex = endpoints.indexOf(data.endpoint);
  if (endpointIndex == -1) {
    return ['error: endpoint not found', 403];
  }

  // this is an effort to prevent eval injection attacks.
  const safeEndpointName = endpoints[endpointIndex];

  // if the endpoint is in our acceptable list, the return statement will not execute and we'll make it to the very end.
  if (!endpointFunctions[safeEndpointName]) {
    return ['error: endpoint invalid', 403];
  }


  // since we know the endpoint exists, we can safely execute it and return the result.
  return endpointFunctions[safeEndpointName](data);
};


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event, context) => {
  // console.log('Received event:', JSON.stringify(event, null, 2));

  // HEY! I WAS UPDATED!!! YAY!!!
  // #SECRET_A

  let body = 'pepperoni pizza\n';
  let statusCode = '200';
  const headers = {
    'Content-Type': 'text/plain',
  };

  try {
    // switch (event.httpMethod) {
    //   case 'DELETE':
    //     body = await dynamo.delete(JSON.parse(event.body)).promise();
    //     break;
    //   case 'GET':
    //     body = await dynamo.scan({TableName: event.queryStringParameters.TableName}).promise();
    //     break;
    //   case 'POST':
    //     body = await dynamo.put(JSON.parse(event.body)).promise();
    //     break;
    //   case 'PUT':
    //     body = await dynamo.update(JSON.parse(event.body)).promise();
    //     break;
    //   default:
    //     throw new Error(`Unsupported method "${event.httpMethod}"`);
    // }
    const recData = JSON.parse(event.body);
    if (recData) {
      [body, statusCode] = router(recData);
    }
  } catch (err) {
    statusCode = '400';
    body = err.message+' on line ' +err.lineNumber + '\n StackTrace: ' + err.stack;
  } finally {
    try {
      body = JSON.stringify(body);
    } catch (exception) {
      body = 'There was an issue converting the error message to a string';
    }
  }

  return {
    statusCode,
    body,
    headers,
  };
};

