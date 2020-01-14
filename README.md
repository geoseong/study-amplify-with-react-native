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

    ```
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
    ```
    $ amplify init

    Scanning for plugins...
    Plugin scan successful
    Note: It is recommended to run this command from the root of your app directory
    ? Enter a name for the project "JustApp"
    ? Enter a name for the environment "dev"
    ? Choose your default editor: "Visual Studio Code"
    ? Choose the type of app that you're building javascript
    Please tell us about your project
    ? What javascript framework are you using "react-native"
    ? Source Directory Path:  "src"
    ? Distribution Directory Path: "/" (just Enter)
    ? Build Command:  "npm run-script build" (just Enter)
    ? Start Command: "npm run-script start" (just Enter)
    Using default provider  awscloudformation

    For more information on AWS Profiles, see:
    https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

    ? Do you want to use an AWS profile? (Y/n) "Y"

    ? Please choose the profile you want to use "{your profile name}"
    Adding backend environment dev to AWS Amplify Console app: d2egeeayc0vvkl
    ⠦ Initializing project in the cloud...

    CREATE_IN_PROGRESS amplify-justapp-dev-234651 AWS::CloudFormation::Stack Tue Jan 14 2020 23:46:54 GMT+0900 (Korean Standard Time) User Initiated             
    CREATE_IN_PROGRESS DeploymentBucket           AWS::S3::Bucket            Tue Jan 14 2020 23:46:57 GMT+0900 (Korean Standard Time) 
    
    ...

    ✔ Initialized provider successfully.
    Initialized your environment successfully.

    Your project has been successfully initialized and connected to the cloud!
    ```
2. amplify add api
   - authorization type: `API key`
   - edit `schema.graphql` with `@model` directive
    ```
    $ amplify add api

    ? Please select from one of the below mentioned services: GraphQL
    ? Provide API name: "justapp"
    ? Choose the default authorization type for the API "API key"
    ? Enter a description for the API key: ""
    ? After how many days from now the API key should expire (1-365): "7"
    ? Do you want to configure advanced settings for the GraphQL API "No, I am done."
    ? Do you have an annotated GraphQL schema? "No"
    ? Do you want a guided schema creation? "Yes"
    ? What best describes your project: "One-to-many relationship (e.g., “Blogs” with “Posts” and “Comments”)"
    ? Do you want to edit the schema now? (Y/n) "Y"

    Please edit the file in your editor: "/Users/{your path}/JustApp/amplify/backend/api/justapp/schema.graphql"

    ? Press enter to continue 
    ```

  - schema.graphql
    ```gql
    type S3Object {
      bucket: String!
      region: String!
      key: String!
    }

    type Post @model {
      id: ID!
      title: String!
      content: String!
      image: S3Object!
      like: Boolean!
      comments: [Comment] @connection(name: "PostComments", sortField: "createdAt")
      createdAt: AWSTimestamp!
      updatedAt: AWSTimestamp!
    }

    type Comment @model {
      id: ID!
      content: String
      post: Post @connection(name: "PostComments", sortField: "createdAt")
      createdAt: AWSTimestamp!
      updatedAt: AWSTimestamp!
    }

    ```

  - press `Enter` Key in cli and creating `API`'s step continues...
    ```
    The following types do not have '@auth' enabled. Consider using @auth with @model
         - Blog
         - Post
         - Comment
    Learn more about @auth here: https://aws-amplify.github.io/docs/cli-toolchain/graphql#auth 

    GraphQL schema compiled successfully.

    Edit your schema at /Users/geoseong/Documents/Meetup/AWS/AWSKRUG/communityday/JustApp/amplify/backend/api/justapp/schema.graphql or place .graphql files in a directory at /Users/geoseong/Documents/Meetup/AWS/AWSKRUG/communityday/JustApp/amplify/backend/api/justapp/schema
    Successfully added resource justapp locally
    ```
3. amplify mocking and testing
   - insert some data with using GraphQL's `mutation` query
4. add code **Amplify's** `API` Moule in expo
   - import `API`
5. expo mock & amplify api 써보기
   - amplify mock이 켜진 상태로 localhost api와 통신하기
6. expo에서 amplify api 수정하기
   - mutation, subscription 코딩
7. amplify add auth
   - schema.graphql에서 @auth 추가하기
8. amplify update api
   - Change authorization type `API Key` -> `Amazon Cognito User Pool`
   - 변경된 schema update하기
9. amplify mock
   - auth 타입에서 cognito_user_pool 추가된 것 확인하기
10. expo에서 amplify auth import해서 코딩하기
   - withAuthenticator 사용
   - (가능하면) I18n util써 보기
11. amplify add storage
   - schema.graphql에서 S3Object 타입 추가하기
   - 변경된 schema update하기
11. expo에서 amplify storage import해서 코딩하기
   - expo install expo-image-picker 한 이후 코딩
12. 자기 id가 코멘트에 언급되었는지(좋아요가 눌렸는지) subscription으로 확인하기
   - Amplify's API의 `subscription` query로 코딩하기
13. amplify mock & expo start
   - withAuthenticator로 로그인하고 이미지 업로드 해보기
14. amplify add analytics
   - expo에서 analytics import해서 코딩하기
15. expo start & check analytics on AWS console
16. amplify delete

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
