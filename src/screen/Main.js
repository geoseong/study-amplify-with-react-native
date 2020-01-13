import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, {useCallback} from 'react';

import styles from '../style';

function onCreate() {
}

function onDeleteAll() {
  
}

async function onQuery() {
}
async function onLoadList() {
}

const Main = props => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>This is Main Page</Text>
            </View>
            <Button title="Add Post" color={`blue`} onPress={onCreate} />
            <Button title="Get List" color={`green`} onPress={onLoadList} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export {Main};
