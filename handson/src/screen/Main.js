import { AddBtn, Post } from '../component';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../style';

const getDt = date => {
  const transformedDt = isNaN(date) ? date : Number(date)
  return new Date(transformedDt);
}
const Main = props => {
  const { navigation } = props;
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const username = useRef(navigation.getParam('username', ''))
  useEffect(() => {
  }, [refresh]);
  const onRefresh = useCallback(() => {
    setRefresh(!refresh)
  }, [refresh])
  return (
    <>
      <SafeAreaView>
        <View
          style={[
            styles.flexRow,
            styles.contentBetweenAlignCenter,
            styles.screenTopLine,
          ]}
        >
          <View style={{}}>
            <Text>Welcome {username.current} ~!</Text>
          </View>
          <TouchableOpacity style={[styles.p1]} onPress={onRefresh}>
            <Text style={[styles.fontBold]}>REFRESH</Text>
          </TouchableOpacity>
          <View style={{}}>
            <AddBtn navigation={navigation} />
          </View>
        </View>
        <ScrollView style={[styles.scrollView, { marginBottom: 50 }]}>
          {posts.map(post => (
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              // bucket={post.image.bucket}
              // region={post.image.region}
              // path={post.image.key}
              content={post.content}
              likes={post.likes}
              username={username.current}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
Main.navigationOptions = ({ navigation }) => {
  return {
    title: 'AWSKRUG 2020 COMMUNITY DAY',
  }
}

export { Main };
