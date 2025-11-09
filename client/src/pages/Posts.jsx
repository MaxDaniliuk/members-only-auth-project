import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../hooks/useAuthContext';
import Post from '../components/Post';
import Loading from '../assets/images/loading.svg?react';

export default function Posts() {
  const { user } = useAuthContext();
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return (
    <section className="posts-page">
      {isLoading ? (
        <span>
          <Loading className="loading-posts spin" />
        </span>
      ) : error ? (
        <span>{error.message}</span>
      ) : data.posts.length < 1 ? (
        <p>There are no posts yet!</p>
      ) : (
        <ul className="posts">
          {data.posts.map(post => (
            <Post key={post.post_id} post={post} user={user} />
          ))}
        </ul>
      )}
    </section>
  );
}

const fetchPosts = async () => {
  const res = await fetch('/api/');

  const data = await res.json().catch(() => {
    throw new Error('Error occured. Failed to fetch posts.');
  });

  if (!res.ok) {
    throw new Error('Something went wrong. Failed to fetch the posts.');
  }
  return data;
};
