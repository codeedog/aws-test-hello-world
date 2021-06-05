# CDK Typescript Example Using Lambdas, Layer, API Gateway & Github Workflow

This project shows how to:

1. Programmatically create a Stack (Cloud Formation) using AWS CDK.
2. Creates three types of Lambda Functions:
 - Standalone Lambda function
 - Lambda Function using a node module (bundled into the function)
 - Lambda Function using a Layer with a node module (in the layer)
3. Create a Lambda Layer with node modules
4. Create an API Gateway connected to the 3rd Lambda function (the one with the layer)
5. Create a GitHub workflow that deploys the Stack to AWS (from GitHub)

## Where To Start
`cdk.json` contains the configuration for `cdk` and points to `bin/hw_cdk.ts`



[![Deploy Lambda](https://github.com/codeedog/aws-test-hello-world/actions/workflows/deploy-lambda.yml/badge.svg)](https://github.com/codeedog/aws-test-hello-world/actions/workflows/deploy-lambda.yml)


## Resources

I used quite a few web searches, blogs, articles and documentation to figure out how to produce this. Complete attribution is difficult. Here are some of the authors and pages I used to figure this out:

- [AWS CDK for Beginners](https://levelup.gitconnected.com/aws-cdk-for-beginners-e6c05ad91895) by Rani Lian. This gave me the basic structure for the hello world CDK.
- [CDK Pipelines](https://aws.amazon.com/blogs/developer/cdk-pipelines-continuous-delivery-for-aws-cdk-applications/) by Rico Huijbers. I never could get the Pipeline that built the pipeline to work, which I very much would have liked. However, it had the API Gateway example in it, and I really needed that.
- [Lambda and Lambda Layer using CDK](https://dev.to/upupkenchoong/how-to-provision-lambda-and-lambda-layer-with-cdk-2ff4) by Ken Choong. It's python and I'm coding in Javascript. Even so, it gave me hope I coding a Lambda Layer in CDK was possible.
- 


- [Cowsay](https://cowsay.morecode.org/say?message=Rick+Roll&format=html) by @jcn. I didn't even know this existed.
