import { createContext, useReducer, useEffect } from 'react';

export const PostsContext = createContext();

export const postsReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { postsResponse: null, loading: true, message: null, error: null };
    case 'SUCCESS':
      return {
        postsResponse: action.payload,
        loading: false,
        message: null,
        error: null,
      };
    case 'EMPTY':
      return {
        postsResponse: action.payload,
        loading: false,
        message: 'There are no posts yet!',
        error: null,
      };
    case 'ERROR':
      return {
        postsResponse: null,
        loading: false,
        message: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const PostsContextProvider = ({ children }) => {
  const [postsState, dispatch] = useReducer(postsReducer, {
    postsResponse: null,
    loading: true,
    message: null,
    error: null,
  });

  useEffect(() => {
    let ignore = false;
    async function loadPosts() {
      dispatch({ type: 'LOADING' });
      try {
        const res = await fetch('/api');

        if (ignore) return;

        const postsResponse = await res.json();
        if (!res.ok) {
          dispatch({
            type: 'ERROR',
            payload: 'Something went wrong. Failed to fetch the posts.',
          });
          return;
        }

        if (res.ok && postsResponse) {
          if (postsResponse.posts.length < 1) {
            dispatch({ type: 'EMPTY', payload: postsResponse });
          } else {
            dispatch({ type: 'SUCCESS', payload: postsResponse });
          }
          return;
        }
      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload: 'Something went wrong. Failed to fetch the posts.',
        });
      }
    }

    loadPosts();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <PostsContext.Provider value={{ postsState, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};
