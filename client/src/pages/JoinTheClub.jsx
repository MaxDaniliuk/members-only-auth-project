import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { usePostsContext } from '../hooks/usePostsContext';
import Button from '../components/Button';

export default function JoinTheClub() {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const { dispatch: postsDispatch } = usePostsContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [formInput, setFormInput] = useState({
    passcode: '',
  });
  const [error, setError] = useState(null);

  function handleOnChange(e) {
    const value = e.target.value.trim();
    const name = e.target.name;

    if (value === '') {
      setIsDisabled(true);
    }

    if (value !== '' && isDisabled) {
      setIsDisabled(false);
    }
    setError(null);
    setFormInput(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsDisabled(true);
    try {
      const res = await fetch('/api/auth/member', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formInput),
      });

      let data;
      try {
        data = await res.json();
      } catch (error) {
        setError(
          error.message ||
            'Data parsing failed... Check the issue on the server',
        );
        return;
      }
      if (!res.ok) {
        if (data?.error) {
          setError(data.error);
        } else {
          setError(
            data?.message ||
              'Unexpected server response. Please try again later.',
          );
        }
        return;
      }
      // console.log("Passcode is correct. Welcome to the members' club!");
      // dispatch({ type: 'LOGIN', payload: data.user });
      // navigate('/');
      dispatch({ type: 'LOGIN', payload: data.user });
      postsDispatch({ type: 'SUCCESS', payload: data.postsResponse });
      navigate('/');

      // Set authContext state
      // Set postsContext state
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <section className="join-page">
      <div className="form-wrapper">
        {/* methid post or update? */}
        <form
          autoComplete="off"
          method="PATCH"
          id="members-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="passcode"
            id="passcode"
            placeholder="Enter secret passcode"
            onChange={handleOnChange}
          />
          <Button specClass={'join'} disabled={isDisabled}>
            Join the club
          </Button>
          {error && <p className="general-err-msg">{error}</p>}
        </form>
      </div>
    </section>
  );
}
