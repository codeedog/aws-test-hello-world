import * as apigw from '@aws-cdk/aws-apigateway';
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from 'path';

export class HwCdkStack extends cdk.Stack {

  // URL of API Gateway
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const helloWorldFunction = new lambda.Function(this, "HelloWorldFunction", {
      //code: lambda.Code.fromAsset("functions/helloworld"),
      code: lambda.Code.fromAsset(path.resolve('functions', 'helloworld')),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
      description:
      "This Lambda Function returns the message: 'Hello World!' in the response body, probably so.",
    });

    const wwwFunction = new lambda.Function(this, "wwwFunction", {
      //code: lambda.Code.fromAsset("functions/helloworld"),
      code: lambda.Code.fromAsset(path.resolve('functions', 'helloworld')),
      handler: "www.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
      description: "For calls into the API Gateway, respond with this.",
    });

    // An API Gateway to make the Lambda web-accessible
    const gw = new apigw.LambdaRestApi(this, 'Gateway', {
      description: 'Endpoint for a simple Lambda-powered web service',
      handler: wwwFunction,
    });

    this.urlOutput = new cdk.CfnOutput(this, 'Url', {
      value: gw.url,
    });

  }
}
