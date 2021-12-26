[![auto deploy](https://github.com/yancouto/split-bill/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/yancouto/split-bill/actions/workflows/firebase-hosting-merge.yml)

# [split-bill](https://split-bill-ddaa9.web.app/)

Use the app: [split-bill-ddaa9.web.app](https://split-bill-ddaa9.web.app/)

This is an "app" to split bills, similar to the Plates app by Splitwise, but a little more powerful as it allows different shares for different people on each item.

**Current state**: The app works end to end, but the UI is very bad. I do accept PRs.

## How to build locally

Check out the [Ionic documentiation](https://ionicframework.com/docs/intro/cli) for detailed information on how to build and add new components in general.

The basic to be able to modify files locally and serve that:
```
> npm install
> npm install -g @ionic/cli
> ionic serve
```

## How to publish
The app should publish automatically to the web page on new commits, it uses [Firebase](https://firebase.google.com/).

If it ever gets polished enough I'd be happt to try to publish to App Store and Play Store. 
