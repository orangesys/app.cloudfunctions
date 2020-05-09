[![dependencies Status](https://david-dm.org/orangesys/app.cloudfunctions/status.svg)](https://david-dm.org/orangesys/app.cloudfunctions)
[![CircleCI](https://circleci.com/gh/orangesys/app.cloudfunctions.svg?style=svg)](https://circleci.com/gh/orangesys/app.cloudfunctions)

# app.cloudfunctions

app cloudfunctions with firebase

## Env

```
node = 10.10.0
```

## Install

```
yarn
```

## Test

### prepare .env

```
cp .env-sample .env
```

```
STRIPE_TEST_SECRET_KEY=XXXXXXXXXXXXXXXXXXXXX
STRIPE_TEST_CUSTOMER_ID=xxxxxxx
STRIPE_TEST_PLAN_ID=xxxxxx
```

### run functions on local

```
cp .runtimeconfig.json-sample .runtimeconfig.json
```

```
{
  "stripe": {
    "secret_key": "sk_test_xxxx"
  }
}
```

### Run test

```
npm test
```

## Build

```
yarn build
```

## Deploy

### Install firebase-tools

```
npm install -g firebase-tools
```

### Prepare .firebaserc

```
cp .firebaserc-sample .firebaserc
```

```
# edit .firebaserc
{
  "projects": {
    "default": "YOUR_PROJECT_NAME"
  }
}
```

### Deploy

```
firebase login:ci

firebase deploy --token "$FIREBASE_TOKEN" --only functions
```

## FAQ

If you face this error, that means you didn't set `ORANGESYS_API_ENDPOINT` in .env file.

```
errorMessage: 'Error: connect ECONNREFUSED 127.0.0.1:80' }
```

ref: https://stackoverflow.com/questions/56850878/axios-request-error-connect-econnrefused
