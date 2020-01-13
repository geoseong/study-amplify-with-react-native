<!-- markdownlint-disable -->
# AWSKRUG Community Day 2020 Amplify Demo
## Step
1. if you don't have expo, try this
    ```sh
    $ npm install -g expo-cli
    ```
    and follow other process refer to [this expo docs](https://docs.expo.io/versions/v36.0.0/get-started/installation/#installing-expo-cli)
1. `$ expo init`
   1. select `blank` in `Managed workflow`
   2. enter the project's `name` and `slug`. you can type `Tab` and `Shift + Tab` key to switch the cursor
   3. type `Y` to install expo project's dependency

    ```sh
    ? Choose a template: (Use arrow keys)
      ----- Managed workflow -----
    ❯ blank                 a minimal app as clean as an empty canvas 
      blank (TypeScript)    same as blank but with TypeScript configuration 
      tabs                  several example screens and tabs using react-navigation 
      ----- Bare workflow -----
      minimal               bare and minimal, just the essentials to get you started
      minimal (TypeScript)  same as minimal but with TypeScript configuration 

    ? Please enter a few initial configuration values.
      Read more: https://docs.expo.io/versions/latest/workflow/configuration/ › 100% completed
      {
        "expo": {
          "name": "JustApp",
          "slug": "awskrug-amplify-just-app"
        }
      }

    ? Yarn v1.21.1 found. Use Yarn to install dependencies? (Y/n) Yes

    ...
    yarn install v1.21.1
    installing proess...
    ...

    ✨  Done in 30.45s.

    Your project is ready at /Users/****/JustApp

    To get started, you can type:

      cd JustApp
      yarn start
    ```
2. install `react-navigation`
    ```sh
    $ expo install react-navigation react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
    ```
3. install `react-navigation-stack` for Stack Navigation
    ```sh
    $ yarn add react-navigation-stack @react-native-community/masked-view
    ```

## Build Standalone App

### Reference
[Building Standalone Apps](https://docs.expo.io/versions/v36.0.0/distribution/building-standalone-apps/)

### Step
- add prop in `app.json`
  ```json
    "android": {
      "package": "com.awskrug.justapp"
    }
  ```
- `expo build:android -t apk`
- `expo fetch:android:keystore` and backup your keystore to a safe location
