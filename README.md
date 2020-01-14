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
1. install `react-navigation`
    ```sh
    $ expo install react-navigation react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
    ```
1. install `react-navigation-stack` for Stack Navigation
    ```sh
    $ yarn add react-navigation-stack @react-native-community/masked-view
    ```
2. make `/src` folder and coding
   - `/src/component`
   - `/src/style`
   - `/src/screen`
   - `/src/navigator`
     - Stack Navigator: `stack.js`
       - Main: **Main.js**
     - Switch Navigator: `switch.js`
       - AuthLoading: **AuthLoadingScreen.js**
       - Main: **Stack Navigator**
       - Auth: **Auth.js**
3. Expo Debugging
      ```sh
      expo start --android
      ```
1. amplify init
    ```sh
    $ amplify init
    ```
2. amplify add api
   - authorization type: `API key`
   - edit `schema.graphql` with `@model` directive
    ```sh
    $ amplify add api

    ? Please select from one of the below mentioned services (Use arrow keys)
    ❯ GraphQL
      REST

    ? Please select from one of the below mentioned services GraphQL
    ? Provide API name: myNotesApi
    ? Choose an authorization type for the API (Use arrow keys)
    ❯ API key
      Amazon Cognito User Pool
    ```
3. amplify mocking and testing
   - insert some data with using GraphQL's `mutation` query
4. add code **Amplify's** `API` Moule in expo
   - import `API`
1. expo mock & amplify api 써보기
   - amplify mock이 켜진 상태로 localhost api와 통신하기
1. expo에서 amplify api 수정하기
   - mutation, subscription 코딩
1. amplify add auth
   - schema.graphql에서 @auth 추가하기
   - 변경된 schema update하기
1. amplify mock
   - auth 타입에서 cognito_user_pool 추가된 것 확인하기
1. expo에서 amplify auth import해서 코딩하기
   - withAuthenticator 사용
   - (가능하면) I18n util써 보기
1. amplify add storage
   - schema.graphql에서 S3Object 타입 추가하기
   - 변경된 schema update하기
1. expo에서 amplify storage import해서 코딩하기
   - expo install expo-image-picker 한 이후 코딩
1. 자기 id가 코멘트에 언급되었는지(좋아요가 눌렸는지) subscription으로 확인하기
   - Amplify's API의 `subscription` query로 코딩하기
2. amplify mock & expo start
   - withAuthenticator로 로그인하고 이미지 업로드 해보기
3. amplify add analytics
   - expo에서 analytics import해서 코딩하기
4. expo start & check analytics on AWS console
5. amplify delete

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
