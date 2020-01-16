import { AddBtn, Post } from '../component';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  onCreatePost,
  onDeletePost,
  onUpdatePost,
} from '../graphql/subscriptions';

import { listPosts } from '../graphql/queries';
import styles from '../style';

const onLoadList = async () => {
  const postList = await API.graphql(graphqlOperation(listPosts));
  console.log(postList);
};

const Main = props => {
  const { navigation } = props;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    API.graphql(graphqlOperation(listPosts)).then(postList => {
      const { listPosts } = postList.data;
      if (listPosts) {
        setPosts(listPosts.items);
      }
    });
  }, []);
  /**
   * @name subscription
   * @description Mock does not yet support the new WebSocket based subscriptions
   * @reference https://github.com/aws-amplify/amplify-cli/issues/2935#issuecomment-563372044
   */
  // useEffect(() => {
  //   const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
  //     next: postData => console.log(postData),
  //   });
  //   return () => {
  //     if (subscription) {
  //       subscription.unsubscribe();
  //     }
  //   };
  // }, []);
  console.log('---posts', posts);
  return (
    <>
      {/* <StatusBar barStyle='dark-content' /> */}
      <SafeAreaView>
        <View
          style={[
            styles.flexRow,
            styles.contentBetweenAlignCenter,
            styles.screenTopLine,
          ]}
        >
          <View style={{}}>
            <Text>Welcome {`userId`} ~!</Text>
          </View>
          <View style={{}}>
            <AddBtn navigation={navigation} />
          </View>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior='automatic'
          style={styles.scrollView}
        >
          {posts.map(post => (
            <Post
              key={post.id}
              id={post.id}
              bucket={post.image.bucket}
              region={post.image.region}
              path={post.image.key}
              content={post.content}
              likes={post.likes}
              setPosts={setPosts}
              updatedAt={post.updatedAt}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export { Main };
