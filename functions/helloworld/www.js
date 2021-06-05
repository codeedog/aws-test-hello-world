"use strict";
const axios = require('axios').default;

//import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

//export async function wwwHandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
exports.handler = async (event, context) => {
  
  return {
    body: 'Hello from the hello world Lambda Function',
    statusCode: 200,
  };
}

// https://ze4zxzq75e.execute-api.us-east-2.amazonaws.com/Prod/api/music
// let res = await axios.post(webhookUri, {});
