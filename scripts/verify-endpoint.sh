#!/usr/bin/env bash

# Not the most pretty of scripts - used with GitHub Actions to verify the endpoint is good.
# In basic terms, it gets the API Gateway endpoint and fires off a request using cURL.
# If the response isn't 200, we throw an error.
# Usage: $ ./verify-endpoint.sh prod 58cf21a7717745d5901a194cca259922

if [ -z $1 ] || [ -z $2 ]
then
  echo Missing argument!
  echo Run again and provide both stage and api key. For example...
  echo $ ./verify-endpoint.sh prod 58cf21a7717745d5901a194cca259922
  exit 1
fi

# Export `AWS_PROFILE` if running the script locally.
# `AWS_ACCESS_KEY_ID` only available in GitHub action.
if [ -z ${AWS_ACCESS_KEY_ID} ]
then
  export AWS_PROFILE=personal
fi

STAGE=$1
API_KEY=$2

# Echo the result of `serverless info` to a temporary file.
echo $(npx serverless info --verbose --stage ${STAGE}) > tmp.txt

# Get the API endpoint from the temporary file, and create a URL for the request.
BASE_URL=$(sed -n "s/.*ServiceEndpoint: \(.*\) ServerlessDeploymentBucketName.*/\1/p" tmp.txt)
URL=${BASE_URL}/youtube-video/g4Hbz2jLxvQ

# Use cURL to send the request, and get the HTTP code from the response.
RESPONSE_CODE=$(
  curl -sL \
    -w "%{http_code}\\n" \
    ${URL} \
    -o /dev/null \
    -H "Accept: application/json"  \
    -H "Content-Type: application/json" \
    -H "x-api-key: ${API_KEY}"
)

echo # Blank line...
echo Testing endpoint: ${URL}

# Check the HTTP code - if not `200` exit with code `1`.
if [ ${RESPONSE_CODE} == "200" ]
then
  echo Endpoint resesponse: ${RESPONSE_CODE} 👍
  exit 0
else
  echo Endpoint resesponse: ${RESPONSE_CODE} 👎
  exit 1
fi

echo # Blank line...

# Remove the temporary file.
rm tmp.txt
