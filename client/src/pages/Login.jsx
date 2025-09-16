import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from '../components/Button';

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

  function confirmFieldsValidity(latestFormData) {
    const allFielsFilled = Object.values(latestFormData).every(
      field => field.trim() !== '',
    );

    setIsDisabled(!allFielsFilled);
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
            ? `${fieldName[0].toUpperCase() + fieldName.slice(1)}`
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
    try {
      const res = await fetch('/api/auth/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await res.json();
      } catch (error) {
        setErrors({
          ...errors,
          generalMessage:
            'Unexpected response from server. Please try again later.',
        });
        return;
      }

      if (!res.ok) {
        if (data?.errors) {
          setErrors({ ...errors, ...data.errors });
        } else {
          setErrors({
            ...errors,
            generalMessage:
              data?.message ||
              'Unexpected server response. Please try again later.',
          });
        }
        return;
      }
      console.log('Form submitted. User logged in.');
      dispatch({ type: 'LOGIN', payload: data.user });
      navigate('/');
    } catch (error) {
      setErrors({
        ...errors,
        generalMessage:
          error.message ||
          'Could not connect to the server. Please check your internet connection.',
      });
    }
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
              className={
                errors.username ? 'error-wrapper invalid' : 'error-wrapper'
              }
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
              className={
                errors.password ? 'error-wrapper invalid' : 'error-wrapper'
              }
            >
              {errors.password}
            </span>
          </div>
          <Button specClass={'signin'} disabled={isDisabled}>
            Sign in
          </Button>
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
