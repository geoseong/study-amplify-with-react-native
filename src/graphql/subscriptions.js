/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
    id
    title
    content
    image {
      bucket
      region
      key
    }
    like
    comments {
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
    id
    title
    content
    image {
      bucket
      region
      key
    }
    like
    comments {
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
    id
    title
    content
    image {
      bucket
      region
      key
    }
    like
    comments {
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
    id
    content
    post {
      id
      title
      content
      like
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`;
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
    id
    content
    post {
      id
      title
      content
      like
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`;
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
    id
    content
    post {
      id
      title
      content
      like
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`;
