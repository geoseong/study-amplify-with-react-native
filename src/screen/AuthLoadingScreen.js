import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';

import React from 'react';
import styles from '../style';

const AuthLoadingScreen = props => {
  const {navigation} = props;
  if (navigation && navigation.navigate) {
    // navigation.navigate('Auth');
    navigation.navigate('Main');
  }
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>AuthLoadingScreen</Text>
              <Text style={styles.sectionDescription}>This is AuthLoadingScreen Page</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export {AuthLoadingScreen};
