import * as ImagePicker from 'expo-image-picker';

import Amplify, {
  API,
  Analytics,
  Auth,
  Storage,
  graphqlOperation,
} from 'aws-amplify';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { InputBoxPost, SubmitBtn } from '../component';
import React, { useEffect, useState } from 'react';

// import { NavigationActions } from 'react-navigation';
import config from '../aws-exports';
import { createPost } from '../graphql/mutations';
import styles from '../style';

const getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};
const CreatePost = props => {
  const { navigation } = props;
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    getPermissionAsync();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    console.log('pickImage result', result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const submitEvt = async () => {
    const loginUser = await Auth.currentAuthenticatedUser();
    console.log('## submitEvt', { image, content });
    let required = [];
    let isError = false;
    if (!image || !image.uri) {
      isError = true;
      required.push('UPLOAD IMAGE');
    }
    if (!content || content.length === 0) {
      isError = true;
      required.push('WRITE CONTENT');
    }
    if (isError) {
      setErrorMsg('YOU SHOULD ' + required.join(' / ') + ' !!');
      return;
    }
    const splittedImgPath = image.uri.split('/');
    const filename = splittedImgPath[splittedImgPath.length - 1];
    const imgObj = await fetch(image.uri);
    const buffer = await imgObj.blob();
    /* storage putitem */
    const storagePutRes = await Storage.put(filename, buffer);
    console.log('## submitEvt storagePutRes', storagePutRes);
    /* appsync mutation */
    const nowDt = new Date().getTime();
    const input = {
      content,
      image: {
        bucket: config.aws_user_files_s3_bucket,
        region: config.aws_project_region,
        key: filename,
      },
      author: loginUser.username,
      likes: 0,
      createdAt: nowDt,
      updatedAt: nowDt,
    };
    const postRes = await API.graphql(graphqlOperation(createPost, { input }));
    console.log('## submitEvt postRes', postRes);
    /* Analytics */
    Analytics.record({
      name: 'posting',
      attributes: {
        username: loginUser.username,
       }
    });
    // TODO: 포스팅 추가 후에 navigation 뒤로 갔을 때 list query를 한 번 더 불러오게 한다
    // const setParamsAction = NavigationActions.setParams({
    //   params: { refresh: true },
    //   key: 'Main',
    // });
    // navigation.dispatch(setParamsAction);
    /* navigation history.back */
    navigation.goBack();
  };

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior='automatic'
          style={styles.scrollView}
        >
          {/* <Header /> */}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity onPress={pickImage}>
                  <Text style={styles.chooseImgBtn}>Upload Image</Text>
                </TouchableOpacity>
                {image && (
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: '100%', height: 300 }}
                    resizeMode={'cover'}
                  />
                )}
              </View>
              <InputBoxPost content={content} setContent={setContent} />
              <View
                style={[
                  styles.flex,
                  styles.flexRow,
                  styles.flexEnd,
                  styles.pb1,
                  styles.pt1,
                  styles.pl1,
                  styles.pr1,
                ]}
              >
                {errorMsg.length > 0 && (
                  <Text style={{ color: 'red', marginRight: 10 }}>
                    {errorMsg}
                  </Text>
                )}
                <SubmitBtn submitEvt={submitEvt} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export { CreatePost };
