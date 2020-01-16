import { Dimensions, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';

import { Auth } from 'aws-amplify';
import React from 'react';
import styles from '../style';

const AuthLoadingScreen = props => {
  const { navigation } = props;
  const { height, width } = Dimensions.get('window')
  Auth.currentAuthenticatedUser()
    .then(user => {
      console.log('Auth user', user);
      if (navigation && navigation.navigate) {
        navigation.navigate('Main');
      }
    })
    .catch(err => {
      console.log('error', err);
      navigation.navigate('Main');
    });
  return (
    <>
      <SafeAreaView>
        <View style={{ height: Math.floor(height), backgroundColor: 'orange', padding: 15 }}>
          <View style={[styles.flex, styles.contentCenterAlignCenter]}>
            <Text style={styles.loadingTitle}>AWSKRUG Community Day 2020 Frontend Session DEMO</Text>
            <Text style={styles.sectionDescription}>
              LOADING...
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export { AuthLoadingScreen };
