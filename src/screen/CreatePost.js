import * as ImagePicker from 'expo-image-picker';

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
    console.log('submitEvt', { image, content });
    /* appsync mutation */
    /* storage putitem */
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
              <Text style={styles.sectionTitle}>ADD POST</Text>
              {/* <Text style={styles.sectionDescription}>This is Auth Page</Text> */}
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity onPress={pickImage}>
                  <Text style={styles.chooseImgBtn}>Choose Image</Text>
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
