"use strict";

const follow = require('follow-redirects');
const axios = require('axios').default;

//import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

const cowsay = 'https://cowsay.morecode.org/say?message=moo&format=html';

//export async function wwwHandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
exports.handler = async (event, context) => {
  let res = await axios.get(cowsay, {});

  return {
    body: JSON.stringify({ hwl: res.data }),
    statusCode: 200,
  };
}
