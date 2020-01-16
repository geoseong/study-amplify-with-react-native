import * as ImagePicker from 'expo-image-picker';

import Amplify, { API, Auth, Storage, graphqlOperation } from 'aws-amplify';
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
      quality: 1,
    });

    console.log('pickImage result', result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const submitEvt = async () => {
    const loginUser = await Auth.currentAuthenticatedUser();
    console.log('## submitEvt', { image, content });
    let required = []
    let isError = false
    if (!image || !image.uri) {
      isError = true
      required.push('UPLOAD IMAGE')
    }
    if (!content || content.length === 0) {
      isError = true
      required.push('WRITE CONTENT')
    }
    if (isError) {
      setErrorMsg('YOU SHOULD ' + required.join(' / ') + ' !!');
      return
    }
    const splittedImgPath = image.uri.split('/');
    const filename = splittedImgPath[splittedImgPath.length - 1];
    const imgObj = await fetch(image.uri)
    const buffer = await imgObj.blob()
    // const buffer = await imgObj.arrayBuffer()
    // console.log('!!!!', { buffer })
    // return
      // .then(response => response.blob())
      // .then(Buffer => Storage.put(key, Buffer))
      // .then(x => console.log('SAVED IMAGE WITH KEY', x) || x)
      // .catch(err => console.log("IMAGE UPLOAD ERROR", err));
    /* storage putitem */
    const storagePutRes = await Storage.put(
      filename,
      buffer,
      // {
      //   // contentType: image.type + '/*',
      //   contentType: 'image/*',
      // }
    );
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
    /* history.back */
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
                    style={{ width: image.width, height: image.height }}
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
                {errorMsg.length > 0 && <Text style={{ color: 'red', marginRight: 10 }}>{errorMsg}</Text>}
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
