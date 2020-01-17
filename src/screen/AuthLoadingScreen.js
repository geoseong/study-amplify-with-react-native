import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { Auth } from 'aws-amplify';
import styles from '../style';

const AuthLoadingScreen = props => {
  const { navigation } = props;
  const { height, width } = Dimensions.get('window');
  const [error, setError] = useState(null);
  Auth.currentAuthenticatedUser()
    .then(user => {
      console.warn('Auth user', user.username);
      if (navigation && navigation.navigate) {
        navigation.navigate('Main', {
          username: user.username,
        });
      }
    })
    .catch(err => {
      console.log('error', err);
      setError('An Error occurred. please restart the app');
    });
  return (
    <>
      <SafeAreaView>
        <View
          style={{
            height: Math.floor(height),
            backgroundColor: 'orange',
            padding: 15,
          }}
        >
          <View style={[styles.flex, styles.contentCenterAlignCenter]}>
            <Text style={styles.loadingTitle}>
              AWSKRUG Community Day 2020 Frontend Session DEMO
            </Text>
            {error ? (
              <Text style={[styles.sectionDescription, { color: 'red' }]}>
                {error}
              </Text>
            ) : (
              <Text style={styles.sectionDescription}>LOADING...</Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export { AuthLoadingScreen };
