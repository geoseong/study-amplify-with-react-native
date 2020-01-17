import { AddBtn, Post } from '../component';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  onCreatePost,
  onDeletePost,
  onUpdatePost,
} from '../graphql/subscriptions';

import { listPosts } from '../graphql/queries';
import styles from '../style';

const Main = props => {
  const { navigation } = props;
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const username = useRef(navigation.getParam('username', ''))
  console.warn('Main props', props)
  useEffect(() => {
    API.graphql(graphqlOperation(listPosts)).then(postList => {
      const { listPosts } = postList.data;
      if (listPosts) {
        setPosts(listPosts.items);
      }
    });
  }, [refresh]);
  /**
   * @name subscription
   * @description Mock does not yet support the new WebSocket based subscriptions
   * @reference https://github.com/aws-amplify/amplify-cli/issues/2935#issuecomment-563372044
   * @description "Amplify Mock has only support MQTT for subscriptions. We have a backlog item to add support for websockets"
   * @reference https://github.com/aws-amplify/amplify-cli/issues/3008#issuecomment-566301536
   */
  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onUpdatePost)).subscribe({
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
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [posts]);
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
              bucket={post.image.bucket}
              region={post.image.region}
              path={post.image.key}
              content={post.content}
              likes={post.likes}
              setPosts={setPosts}
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
