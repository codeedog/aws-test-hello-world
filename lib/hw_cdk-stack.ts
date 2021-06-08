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
      code: lambda.Code.fromAsset(path.resolve('functions', 'helloworld', 'stubby')),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      description: "Example 1: simplest function",
    });


    // EXAMPLE 2: Function & Node Modules
    // Make function using a 3rd party node module into a Lambda Function
    const wwwFunction = new lambdaNjs.NodejsFunction(this, "wwwFunction", {
      entry: path.resolve('functions', 'helloworld', 'www.js'),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      description: "Example 2: function with node_modules",
      bundling: { nodeModules: [
        'follow-redirects',  // Make this explicit to force package.json inclusion
        'axios'
      ], },
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
      description: "Layer containing axios module used by www2.handler",
    })

    // Create the Function
    // Note the inclusion of layer here and bundling used to *exclude*
    // modules that are 'require'd in the code and provided by the layer.
    const wwwCowsay = new lambdaNjs.NodejsFunction(this, "wwwCowsay", {
      entry: path.resolve('functions', 'helloworld', 'www2.js'),
      handler: "cowsay",
      runtime: lambda.Runtime.NODEJS_14_X,
      description: "Example 3: function using layer (no node modules)",
      layers: [ layer ],
      bundling: { externalModules: [ 'axios' ], },
    });


    // Example 4: Wrap Lambda Function in API Gateway
    // An API Gateway to make the Lambda web-accessible
    const gw = new apigw.LambdaRestApi(this, 'Gateway', {
      description: 'Endpoint for a simple Lambda-powered web service',
      handler: wwwCowsay,
    });

    this.urlOutput = new cdk.CfnOutput(this, 'Url', {
      value: gw.url,
    });

  }
}
