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
import React, { useEffect, useRef, useState } from 'react';
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
  const subscription = useRef(null);
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
   * @description "Amplify Mock has only support MQTT for subscriptions. We have a backlog item to add support for websockets"
   * @reference https://github.com/aws-amplify/amplify-cli/issues/3008#issuecomment-566301536
   */
  // TODO: subscription like 가져오기
  useEffect(() => {
    // const subscription = API.graphql(graphqlOperation(onUpdatePost)).subscribe({
    subscription.current = API.graphql(
      graphqlOperation(onUpdatePost),
    ).subscribe({
      next: postData => {
        if (
          !postData ||
          !postData.value ||
          !postData.value.data ||
          !postData.value.data.onUpdatePost
        ) {
          return;
        }
        const updatedPost = postData.value.data.onUpdatePost;
        console.log('---subscription', updatedPost);
        console.log('---posts', posts);
        const updatedPosts = posts.map(post => {
          if (updatedPost.id === post.id) {
            return updatedPost;
          } else {
            return post;
          }
        });
        setPosts(updatedPosts);
      },
    });
    return () => {
      if (subscription.current) {
        subscription.current.unsubscribe();
      }
    };
  }, [posts, subscription]);
  // console.log('---posts', posts);
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
            <Text>Welcome {`userId`} ~!</Text>
          </View>
          <View style={{}}>
            <AddBtn navigation={navigation} />
          </View>
        </View>
        <ScrollView style={[styles.scrollView, { marginBottom: 50 }]}>
          {posts.map(post => (
            <Post
              key={post.id + post.likes}
              id={post.id}
              author={post.author}
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
