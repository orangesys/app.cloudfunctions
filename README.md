[![dependencies Status](https://david-dm.org/orangesys/app.cloudfunctions/status.svg)](https://david-dm.org/orangesys/app.cloudfunctions)
[![CircleCI](https://circleci.com/gh/orangesys/app.cloudfunctions.svg?style=svg)](https://circleci.com/gh/orangesys/app.cloudfunctions)
# app.cloudfunctions

app cloudfunctions with firebase


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
# edit .env
STRIPE_TEST_SECRET_KEY=XXXXXXXXXXXXXXXXXXXXX
STRIPE_TEST_CUSTOMER_ID=xxxxxxx
STRIPE_TEST_PLAN_ID=xxxxxx
```

### Run test

```
npm test
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
npm run deploy
```

