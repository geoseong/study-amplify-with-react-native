<!-- markdownlint-disable -->
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
