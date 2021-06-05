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
`cdk.json` contains the configuration for `cdk` and points to `bin/hw_cdk.ts`. `hw_cdk.ts` imports the stack definition from `lib/hw_cdk-stack.ts`. The stack creates the three functions, the layer and the gateway.

In example 1, the first function created has the simplest of computations (see `functions/helloworld/index.js`). In example 2, we have a function (`functions/helloworld/www.js`) that uses an external module (axios) to GET a web page and return the HTML response to the caller as stringified json. In this 2nd example, the CDK code bundles the external module into the function via a node_modules directory provisioned along with the code. CDK bundles the modules we ask it to bundle (`bundling: { nodeModules: [ 'axios' ], }`).

In example 3, we use the same exact function from example 2, the only difference is in CDK stack code; we create a layer containing node_modules and a function using that layer. We generate `node_modules` from a minimal `package.json`. When creating the function, we tell the function to use the new layer and also to exclude the node modules from bundling (`bundling: { externalModules: [ 'axios' ], }`). We don't need them twice.

Example 4 creates the API Gateway. Originally, it used the function from example 2 (wwwFunction). It now uses the function from example 3.

Test the lambda functions by calling them directly in the lambda console. Test the API Gateway using `curl` from the command line.

## Final Thoughts

I've been struggling for a couple of weeks for how to best integrate Lambda Functions and Layers into a CI/CD pipeline. In our project, we're using Angular in a monorepo. We use GitHub for our source repository and MongoDB on the backend for data storage. In between, we have the very large presence of AWS. I was able to get functions and layers working through the console, then through `sam`. However, it never felt clean. Also, coding in Typescript is an important step and the current `sam` release doesn't work well with Typescript.

This business of *Infrastructure as Code* makes so much more sense having gone through this process of learning how to use the CDK. With one fell swoop, entire pieces of infrastructure can be pushed out, taken down, redone. In addition, the CDK provides guardrails ensuring a better result during that deploy. Can you imagine writing the `template.yaml` file required for all of this? When I started with AWS a few weeks ago, I figured I'd be spending all of my time debugging my mistakes in writing those files. So much so, that I seriously questioned my choice of using AWS or switching to third party management software. I'd much prefer to stay closer to the vendor, however. They've built their API a certain way for a reason.

In any event, that pain is no longer an issue. Instead, I'm coding, which I'm good at doing. I can handle coding. Configuration files filled with colons (`:`). Not for me.

## Post Final Thought

I'd really like to be able to test all of this prior to deploying to AWS. There is currently an ongoing beta combining `sam` and `cdk`. I haven't been able to get it work. Most likely, I will be using Nestjs or Express for my local UI/backend development work. Then, deploy the code to AWS and debug through that process.

[![Deploy Lambda](https://github.com/codeedog/aws-test-hello-world/actions/workflows/deploy-lambda.yml/badge.svg)](https://github.com/codeedog/aws-test-hello-world/actions/workflows/deploy-lambda.yml)

## Resources

I used quite a few web searches, blogs, articles and documentation to figure out how to produce this. Complete attribution is difficult. Here are some of the authors and pages I used to figure this out:

- [AWS CDK for Beginners](https://levelup.gitconnected.com/aws-cdk-for-beginners-e6c05ad91895) by Rani Lian. This gave me the basic structure for the hello world CDK.
- [CDK Pipelines](https://aws.amazon.com/blogs/developer/cdk-pipelines-continuous-delivery-for-aws-cdk-applications/) by Rico Huijbers. I never could get the Pipeline that built the pipeline to work, which I very much would have liked. However, it had the API Gateway example in it, and I really needed that.
- [How to use Lambda Layers in AWS CDK](https://bobbyhadz.com/blog/aws-cdk-lambda-layers) by Borislav Hadzhiev. Between this and the python code and some fumbling around, I was able to figure out what was needed. The key was **\*\*/nodejs** in the file path for the layer.
- [Lambda and Lambda Layer using CDK](https://dev.to/upupkenchoong/how-to-provision-lambda-and-lambda-layer-with-cdk-2ff4) by Ken Choong. It's python and I'm coding in Javascript. Even so, it gave me hope I coding a Lambda Layer in CDK was possible.
- [AWS CDK Lambda Layer Docs](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.LayerVersion.html). Be sure to check out aws-lambda and aws-lambda-nodejs.
- [Integrating AWS CDK into GitHub Actions](https://johntipper.org/integrating-aws-cdk-into-github-actions/) by John Tipper. Holy Smokes! Tipper is good. I need to make a mental note to read his site.
- [Cowsay](https://cowsay.morecode.org/say?message=Rick+Roll&format=html) by @jcn. I didn't even know this existed.
