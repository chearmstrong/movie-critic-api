# Movie Critic API 👾

API for use in my _Movie Critic_ Alexa Skill and Bixby Capsule.

Simple and light-weight (doesn't use any framework such as `express`).

## Getting started 💻

1. Clone the repository
2. Install Node using Node Version Manager (NVM)

        $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
        $ nvm install 10.16

    A `.nvmrc` file is also included in the project for reference.

3. Install project dependencies

        $ npm i

## API 🦄

- `GET <base URL>/you-tube/{id}` - Get streaming url of YouTube video.

### Base URLs

- dev: Check the AWS console, or Serverless deployment output.
- prod: `api.chearmstrong.com`*

*Using a custom domain is optional - I'm using the [`serverless-domain-manager`](https://github.com/amplify-education/serverless-domain-manager) plugin. To use _without_ a custom domain, [remove the `customDomain` section from `custom` in `serverless.yml`](serverless.yml#L24), and [remove reference to the  `serverless-domain-manager` plugin](serverless.yml#L81)

**Note:** To help reduce latency on the `prod` API, `GET` responses are cached for 900 seconds -  For more details see [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html).

### Auth

The `x-api-key` header is required. The key is generated at deploy time - check the AWS console, or Serverless deployment output.

### Respose body

- `GET <base URL>/you-tube/{id}`

  200:

  ```JSON
  { "url": "https://r2---sn-aigzrn7z.googlevideo.com/videoplayback?expire=1571883996&ei=fLewXZGDCZSMmLAP2uqx4Ak&ip=63.32.98.245&id=o-ANDQT0ZaibNBoRuzn-RgXsofkAjfGqxFvlK_CBXTupAd&itag=22&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-aigzrn7z%2Csn-4g5ednld&ms=au%2Conr&mv=u&mvi=1&pl=23&mime=video%2Fmp4&ratebypass=yes&dur=938.689&lmt=1571650637212374&mt=1571861599&fvip=2&fexp=23842630&c=WEB&txp=3535432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRQIhAOdLRt8-B7YlZqgqTPGTDb6ei6p3cOhp5dcvm0R5HwzDAiAsmiwLZRit1FVoZaqaKvl-4OX-weQZHyzAWs_y3htrGw%3D%3D&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AHylml4wRQIhAOOfsRDlVsr8NHhXL92oIKF_rw4PUDKcWOUXuG-PRu_UAiB3rsYNLGFP15V2FAWnxYA9D45ULcYjhM6tlvSGheZ_ag%3D%3D" }
  ```

  405:

  ```JSON
  { "message": "Invalid HTTP Method: POST" }
  ```

  400:

  ```JSON
  { "error": "Houston, we have a problem!" }
  ```

  Other:

  See responses for details.

## Running and debugging 🐛

You can run and debug this locally using [`serverless-offline`](https://github.com/dherault/serverless-offline).

1. Run `npm run start`.

    A bundle is built using [`ncc`](https://github.com/zeit/ncc), and a _local server_ is started.

2. Using the local endpoint output to the console, send a request using Postman.

    You don't need the `x-api-key` header when running locally.

## Deploying 🤖

Depending on the stage you're deplpoying to simply run either:

- `dev` - `npm run deploy:dev`
- `prod` - `npm run deploy:prod`

Deployment currently assumes that AWS credentials are available, under the `personal` profile.

## Branches 🌳

The repo has 2x main branches:

- `master` - This is generally what is deployed to to stage `prod`.
- `develop` - This is generally what is deployed to to stage `dev`.

Branches and PRs are created for new changes, and merged to `develop` -> `master`.

## Keeping the Lambda warm 🔥

For `prod` stage, I'm using the [`serverless-plugin-warmup`](https://github.com/FidelLimited/serverless-plugin-warmup) to prevent cold starts, and therefore ensure latency is kept to a mimnimum.

## CI/CD ♻️

### Automatic deployments

Automatic deployments are done with [GitHub Actions](./.github/workflows/main.yml), triggered by either a commit to `develop` or `master` branches.

- `develop`: Deploys using stage `dev`.
- `master`: Deploys using stage `prod`.

Following deployment, a [bash script](./scripts/verify-endpoint.sh) is executed. This gets the API Gateway endpint from Serverless, and sends a HTTP request - if the http status code from the response is not `200`, it exits with code `1` and the build essentially fails.

## TODO 📝

- Add tests.
- Add JSDoc where needed.
- Add ESLint.

### Usage and license

- Provided with an [MIT license](LICENSE.md).
- Forks welcome (would appreciate credit and/or a link back where necessary).
