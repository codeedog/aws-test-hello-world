import * as apigw from '@aws-cdk/aws-apigateway';
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as lambdaNjs from "@aws-cdk/aws-lambda-nodejs";
import * as path from 'path';

export class HwCdkStack extends cdk.Stack {

  // URL of API Gateway
  public readonly urlOutput: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // EXAMPLE 1: Isolated Function
    // Make an isolated function into a Lambda Function
    const helloWorldFunction = new lambda.Function(this, "HelloWorldFunction", {
      //code: lambda.Code.fromAsset("functions/helloworld"),
      code: lambda.Code.fromAsset(path.resolve('functions', 'helloworld')),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      description:
      "This Lambda Function returns the message: 'Hello World!' in the response body, probably so.",
    });


    // EXAMPLE 2: Function & Node Modules
    // Make function using a 3rd party node module into a Lambda Function
    const wwwFunction = new lambdaNjs.NodejsFunction(this, "wwwFunction", {
      entry: path.resolve('functions', 'helloworld', 'www.js'),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      description: "For calls into the API Gateway, respond with this.",
      bundling: { nodeModules: [ 'axios' ], },
    });


    // EXAMPLE 3: Function & Layer
    // (a) Lambda Layer from a pile of node modules (package.json)
    // (b) Lambda Function uses that layer

    // Create the Layer
    // ***NOTE***, make sure path is parent to 'nodejs' not 'node_modules'!
    // If node modules are in: 'layers/hworld/nodejs/node_modules/**'
    // the code path must be: 'layers/hworld'
    const layer = new lambda.LayerVersion(this, 'hw-layer', {
      code: lambda.Code.fromAsset(path.resolve('layers','hworld')),
      compatibleRuntimes: [
        lambda.Runtime.NODEJS_12_X,
        lambda.Runtime.NODEJS_14_X,
      ],
      description: "Layer containing axios module used by www.handler",
    })

    // Create the Function
    // Note the inclusion of layer here and bundling used to *exclude*
    // modules that are 'require'd in the code and provided by the layer.
    const wwwFunction_2 = new lambdaNjs.NodejsFunction(this, "wwwFunction_2", {
      entry: path.resolve('functions', 'helloworld', 'www.js'),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      description: "For calls into the API Gateway, respond with this. Use a LAYER.",
      layers: [ layer ],
      bundling: { externalModules: [ 'axios' ], },
    });


    // Example 4: Wrap Lambda Function in API Gateway
    // An API Gateway to make the Lambda web-accessible
    const gw = new apigw.LambdaRestApi(this, 'Gateway', {
      description: 'Endpoint for a simple Lambda-powered web service',
      handler: wwwFunction_2,
    });

    this.urlOutput = new cdk.CfnOutput(this, 'Url', {
      value: gw.url,
    });

  }
}
