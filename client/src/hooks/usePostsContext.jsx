import { PostsContext } from '../context/PostsContext';
import { useContext } from 'react';

export const usePostsContext = () => {
  const postsContext = useContext(PostsContext);
  return postsContext;
};
