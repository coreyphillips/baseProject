## Base Project - React Native


## Installation/Setup

- `git clone git@bitbucket.org:synoviasolutions/hctb-reactnative.git`
- `cd baseProject`
- `npm i`
- Run on iOS `react-native run-ios` or Android `react-native run-android`

## Create repo from scratch
- `react-native init baseProject`
- `cd baseProject`
- `npm i -S react-navigation react-redux redux redux-persist redux-thunk react-native-vector-icons react-native-code-push`
- `npm i -D babel-eslint eslint eslint-plugin-babel eslint-plugin-flowtype eslint-plugin-import eslint-plugin-react`
- `react-native link`

## Create Android Build
- `react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.jsbundle --assets-dest android/app/src/main/res`
- `cd android && ./gradlew assembleRelease --no-daemon`
The apk can then be located in /android/app/build/outputs/apk/app-release.apk

## CodePush
- `code-push release-react hctb-ios ios`
- `code-push release-react hctb-android android`
For more detailed instructions see: https://microsoft.github.io/code-push/docs/cli.html#releasing-updates-react-native
