import { API, Storage, graphqlOperation } from 'aws-amplify';
import { Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { FormattedDate } from './FormattedDate';
import { Like } from './Like';
import styles from '../style';
import { updatePost } from '../graphql/mutations';

const updateSpecificPost = post => {
  // setPosts
};
const Post = ({
  id,
  bucket,
  region,
  path,
  content,
  likes,
  author,
  setPosts,
  updatedAt,
}) => {
  const [_likes, setLikes] = useState(likes);
  console.log('Post props', {
    id,
    bucket,
    region,
    path,
    content,
    likes,
    author,
    updatedAt,
  });
  // const { bucket, region, path, content, likes, updatedAt } = props;
  const [imageUrl, setImageUrl] = useState(null)
  useEffect(() => {
    Storage.get(path).then(file => {
      setImageUrl(file)
    }).catch(err => console.warn('---- post error', err))
  }, [])
  const setLike = async () => {
    const incrementedLike = {
      id,
      likes: _likes + 1,
    };
    const likeRes = await API.graphql(
      graphqlOperation(updatePost, {
        input: incrementedLike,
      }),
    );
    console.log('setLike likeRes', likeRes);
    setLikes(likeRes.data.updatePost.likes);
  };
  
  return (
    <>
      <View
        style={[
          styles.sectionContainer,
          {
            borderBottomColor: 'gray',
            borderStyle: 'solid',
            borderBottomWidth: 1,
          },
        ]}
      >
        {imageUrl && (<Image
          style={{ width: '100%', height: 300, resizeMode: 'auto' }}
          source={{
            uri: imageUrl,
          }}
        />)}
        <View style={{ marginVertical: 15 }}>
          <Text>{content}</Text>
          <View style={{ textAlign: 'right' }}>
            <FormattedDate date={updatedAt} />
          </View>
        </View>
        <View style={[styles.flexRow, styles.contentBetweenAlignCenter]}>
          <View style={[styles.flexRow]}>
            <Text>{_likes} Likes</Text>
            <Like id={id} likes={_likes} setLike={setLike} />
          </View>
          <View style={{}}>
            <Text>
              Posted by
              <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>
                {' '}
                {author}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export { Post };
