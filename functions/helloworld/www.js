"use strict";
const axios = require('axios').default;

//import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

const musicUri = 'https://ze4zxzq75e.execute-api.us-east-2.amazonaws.com/Prod/api/music';

//export async function wwwHandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
exports.handler = async (event, context) => {
  let res = await axios.get(musicUri, {});

  return {
    body: JSON.stringify({ hwl: res.data }),
    statusCode: 200,
  };
}
