const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

/** Endpoint: returns song recommendations */
findSong = function(data) {
  return ['pepperoni pizza\n', 200];
};

/** Endpoint: simply returns "healthy" as a basic server health check. */
healthCheck = function(data) {
  return ['Healthy!', 200];
};

const endpointFunctions = {
  requestSongReccomendations: findSong,
  heartbeat: healthCheck,
};

/** Endpoint parser: parses and routes the endpoint to the correct function */
router = function(data) {
  if (!data.endpoint) {
    return [`error: no endpoint data received. Got: ${data}`, 403];
  }

  // if the endpoint is in our acceptable list, the return statement will not execute and we'll make it to the very end.
  if (!endpointFunctions[data.endpoint]) {
    return ['error: endpoint not found', 403];
  }


  // since we know the endpoint exists, we can safely execute it and return the result.
  return endpointFunctions[data.endpoint](data);
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

