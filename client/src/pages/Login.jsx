import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useMutation } from '@tanstack/react-query';
import getBaseURL from '../utils/getBaseURL';

const API_BASE_URL = getBaseURL();

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    generalMessage: null,
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      dispatch({ type: 'LOGIN', payload: data.user });
      navigate('/');
    },
    onError: error => {
      if (error?.errors) {
        setErrors(prevState => ({
          ...prevState,
          ...error?.errors,
        }));
      } else {
        setErrors(prevState => ({
          ...prevState,
          generalMessage:
            error.message || 'Something went wrong. Please try again later.',
        }));
      }
    },
  });

  function confirmFieldsValidity(latestFormData) {
    const allFilled = Object.values(latestFormData).every(
      field => field.trim() !== '',
    );
    setIsDisabled(!allFilled);
  }

  function handleOnChange(e) {
    const fieldValue = e.target.value.trim();
    const fieldName = e.target.name;

    setFormData(prevState => {
      const updatedField = { ...prevState, [fieldName]: fieldValue };

      const updatedErrors = {
        ...errors,
        [fieldName]:
          fieldValue === ''
            ? `${fieldName[0].toUpperCase() + fieldName.slice(1)} is required.`
            : null,
      };

      setErrors(updatedErrors);
      confirmFieldsValidity(updatedField);

      return updatedField;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsDisabled(true);
    setErrors(prevState => ({ ...prevState, generalMessage: null }));
    mutation.mutate(formData);
  }

  return (
    <section className="login-post-page">
      <div className="form-wrapper">
        <form
          autoComplete="off"
          method="POST"
          id="form-login"
          onSubmit={handleSubmit}
        >
          <div className="login-username">
            <p>SIGN IN WITH ACCOUNT NAME</p>
            <input
              className={errors.username ? 'invalid' : ''}
              autoComplete="off"
              type="text"
              name="username"
              id="login-username"
              onChange={handleOnChange}
            />
            <span
              className={`error-wrapper ${errors.username ? 'invalid' : ''}`}
            >
              {errors.username}
            </span>
          </div>
          <div className="login-password">
            <p>PASSWORD</p>
            <input
              className={errors.password ? 'invalid' : ''}
              autoComplete="off"
              type="password"
              name="password"
              id="login-password"
              onChange={handleOnChange}
            />
            <span
              className={`error-wrapper ${errors.password ? 'invalid' : ''}`}
            >
              {errors.password}
            </span>
          </div>
          <button className="signin" type="submit" disabled={isDisabled}>
            {mutation.isPending ? 'Signing in...' : 'Sign in'}
          </button>
          {errors.generalMessage && (
            <p className="general-err-msg">{errors.generalMessage}</p>
          )}
        </form>
        <div className="redirect-block">
          <p>
            Don't have an account?{' '}
            <Link to="/accounts/signup">Sign up</Link>{' '}
          </p>
        </div>
      </div>
    </section>
  );
}

async function loginUser({ username, password }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json().catch(() => {
    throw new Error('Unexpected response from server. Please try again later.');
  });

  if (!res.ok) {
    throw {
      message:
        data?.message || 'Unexpected server response. Please try again later.',
      errors: data?.errors || null,
    };
  }

  return data;
}
