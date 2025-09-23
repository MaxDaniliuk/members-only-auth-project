import Post from '../components/Post';
import Loading from '../assets/images/loading.svg?react';
import { usePostsContext } from '../hooks/usePostsContext';

export default function Posts() {
  const { postsState, dispatch } = usePostsContext();

  return (
    <section className="posts-page">
      {postsState.loading ? (
        <span className="loading-posts">
          <Loading className="loading-posts spin" />
        </span>
      ) : postsState.error ? (
        <span>{postsState.error}</span>
      ) : postsState.message ? (
        <p>{postsState.message}</p>
      ) : (
        <ul className="posts">
          {postsState.postsResponse.posts.map(post => (
            <Post
              key={post.post_id}
              post={post}
              authorized={postsState.postsResponse.authorized}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
