"use strict";
//import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

//export async function wwwHandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
exports.handler = async (event, context) => {
  return {
    body: 'Hello from the hello world Lambda Function',
    statusCode: 200,
  };
}
