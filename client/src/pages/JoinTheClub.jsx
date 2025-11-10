import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useMutation } from '@tanstack/react-query';
import getBaseURL from '../utils/getBaseURL';

const API_BASE_URL = getBaseURL();

export default function JoinTheClub() {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [formInput, setFormInput] = useState({
    passcode: '',
  });
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: promoteToMember,
    onSuccess: data => {
      dispatch({ type: 'LOGIN', payload: data.user });
      navigate('/');
    },
    onError: error => {
      console.log(error);
      if (error?.errors) {
        setError(error.errors);
      } else {
        setError(error.message);
      }
    },
  });

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
    setError(null);
    mutation.mutate(formInput);
  }

  return (
    <section className="join-page">
      <div className="form-wrapper">
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
          <button className="join" type="submit" disabled={isDisabled}>
            {mutation.isPending ? 'Authorizing...' : 'Join the club'}
          </button>
          {error && <p className="general-err-msg">{error}</p>}
        </form>
      </div>
    </section>
  );
}

async function promoteToMember({ passcode }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/member`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passcode }),
  });

  const data = await res.json().catch(() => {
    throw new Error('Something went wrong. Please try again.');
  });

  if (!res.ok) {
    throw {
      message: data?.message || 'Something went wrong. Please try again later.',
      errors: data?.error || null,
    };
  }

  return data;
}
