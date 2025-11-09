import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useMutation } from '@tanstack/react-query';

export default function Signup() {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [errors, setErrors] = useState({
    fullname: null,
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
    generalMessage: null,
  });

  const mutation = useMutation({
    mutationFn: signupUser,
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
    const emailValid = checkEmailValidation(latestFormData.email);

    const passwordMatch =
      latestFormData.password === latestFormData.confirmPassword &&
      latestFormData.password.length >= 3;

    const allFielsFilled = Object.values(latestFormData).every(
      field => field.trim() !== '',
    );

    const fieldsValid =
      allFielsFilled && latestFormData.username.trim().length >= 3;

    const isValid = fieldsValid && passwordMatch && emailValid;

    setIsDisabled(!isValid);
  }

  function checkEmailValidation(emailInput) {
    const regex =
      /^[A-Za-z0-9](?:[A-Za-z0-9._+-]*[A-Za-z0-9])?@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
    const isValid = regex.test(emailInput);
    return isValid;
  }

  function validateEmailOnChange(e) {
    const email = e.target.value.trim();
    const fieldName = e.target.name;
    const isValid = checkEmailValidation(email);

    setFormData(prevState => {
      const updatedField = { ...prevState, [fieldName]: email };

      let errorMessage = null;
      if (email === '') {
        errorMessage = 'The field is required.';
      } else if (!isValid) {
        errorMessage = 'Enter a valid email address.';
      }

      const updatedErrors = { ...errors, [fieldName]: errorMessage };
      setErrors(updatedErrors);

      confirmFieldsValidity(updatedField);

      return updatedField;
    });
  }

  function validatePasswordMatch(updatedFormData = formData) {
    if (
      updatedFormData.password !== '' &&
      updatedFormData.confirmPassword !== '' &&
      updatedFormData.password === updatedFormData.confirmPassword
    ) {
      if (updatedFormData.password.length >= 3) {
        setErrors(prevState => ({
          ...prevState,
          password: null,
          confirmPassword: null,
        }));
      } else {
        setErrors(prevState => ({
          ...prevState,
          confirmPassword: null,
        }));
      }
    }
  }

  function validatePasswordOnChange(e) {
    const passwordValue = e.target.value;
    const passwordFieldName = e.target.name;
    setFormData(prevState => {
      const updated = {
        ...prevState,
        [passwordFieldName]: passwordValue,
      };

      let passwordError;
      if (passwordValue === '') {
        passwordError = 'Create a password at least 3 characters long.';
      } else if (passwordValue.length === 1) {
        passwordError =
          'This password is too easy to guess. Please create a new one.';
      } else if (passwordValue.length < 3) {
        passwordError = 'Create a password at least 3 characters long.';
      } else {
        passwordError = null;
      }

      let confirmPasswordError;
      if (
        (passwordValue === '' && updated.confirmPassword !== '') ||
        (passwordValue !== '' &&
          updated.confirmPassword !== '' &&
          passwordValue !== updated.confirmPassword)
      ) {
        confirmPasswordError = 'Passwords do not match.';
      } else if (
        passwordValue === '' &&
        updated.confirmPassword === '' &&
        errors.confirmPassword === 'Please confirm the passowrd.'
      ) {
        confirmPasswordError = null;
      }

      setErrors(prevState => ({
        ...prevState,
        [passwordFieldName]: passwordError,
        confirmPassword: confirmPasswordError,
      }));

      validatePasswordMatch(updated);
      confirmFieldsValidity(updated);

      return updated;
    });
  }

  function validatePasswordConfirmationOnChange(e) {
    const confirmPasswordValue = e.target.value;
    const confirmPasswordFieldName = e.target.name;
    setFormData(prevState => {
      const updated = {
        ...prevState,
        [confirmPasswordFieldName]: confirmPasswordValue,
      };

      let confirmPasswordError;
      if (updated.password !== '' && confirmPasswordValue === '') {
        confirmPasswordError = 'Please confirm the passowrd.';
      } else if (
        confirmPasswordValue !== '' &&
        confirmPasswordValue !== updated.password
      ) {
        confirmPasswordError = 'Passwords do not match.';
      } else {
        confirmPasswordError = null;
      }

      setErrors(prevState => ({
        ...prevState,
        [confirmPasswordFieldName]: confirmPasswordError,
      }));

      validatePasswordMatch(updated);
      confirmFieldsValidity(updated);

      return updated;
    });
  }

  function validatePasswordConfirmationOnBlur(e) {
    const confirmPasswordValue = e.target.value.trim();
    const confirmPasswordFieldName = e.target.name;
    if (formData.password !== '' && confirmPasswordValue === '') {
      setErrors(prevState => ({
        ...prevState,
        [confirmPasswordFieldName]: 'Please confirm the passowrd.',
      }));
    } else if (formData.password === '' && confirmPasswordValue === '') {
      setErrors(prevState => ({
        ...prevState,
        [confirmPasswordFieldName]: null,
      }));
    }
  }

  function validateFullnameOnChange(e) {
    const fullNameValue = e.target.value.trim();
    const fieldName = e.target.name;
    setFormData(prevState => {
      const updatedField = { ...prevState, [fieldName]: fullNameValue };

      const updatedErrors = {
        ...errors,
        [fieldName]: fullNameValue === '' ? 'The field is required.' : null,
      };

      setErrors(updatedErrors);

      confirmFieldsValidity(updatedField);

      return updatedField;
    });
  }

  function validateUsernameOnChange(e) {
    const usernameField = e.target.value.trim();
    const fieldName = e.target.name;

    setFormData(prevState => {
      const updatedField = { ...prevState, [fieldName]: usernameField };

      let errorMessage = null;
      if (usernameField === '') {
        errorMessage = 'The field is required.';
      } else if (usernameField.length < 3 && usernameField.length > 0) {
        errorMessage = 'Username should contain at least 3 characters.';
      }

      const updatedErrors = { ...errors, [fieldName]: errorMessage };
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
    <section className="signup-post-page">
      <div className="form-wrapper">
        <form
          autoComplete="off"
          method="POST"
          id="form-signup"
          onSubmit={handleSubmit}
        >
          <div className="welcome-block">
            <h1>Create a new account</h1>
            <p>It’s quick and easy.</p>
          </div>

          <input
            className={errors.fullname ? 'invalid' : ''}
            autoComplete="off"
            type="text"
            name="fullname"
            id="signup-fullname"
            placeholder="Full Name"
            onChange={validateFullnameOnChange}
          />
          <span className={`error-wrapper ${errors.fullname ? 'invalid' : ''}`}>
            {errors.fullname}
          </span>
          <input
            className={errors.email ? 'invalid' : ''}
            autoComplete="off"
            type="text"
            name="email"
            id="signup-email"
            placeholder="Email"
            onChange={validateEmailOnChange}
          />

          <span className={`error-wrapper ${errors.email ? 'invalid' : ''}`}>
            {errors.email}
          </span>

          <input
            className={errors.username ? 'invalid' : ''}
            autoComplete="off"
            type="text"
            name="username"
            id="signup-username"
            placeholder="Username"
            onChange={validateUsernameOnChange}
          />

          <span className={`error-wrapper ${errors.username ? 'invalid' : ''}`}>
            {errors.username}
          </span>

          <input
            className={errors.password ? 'invalid' : ''}
            autoComplete="off"
            type="password"
            name="password"
            id="signup-password"
            placeholder="Password"
            onChange={validatePasswordOnChange}
          />

          <span className={`error-wrapper ${errors.password ? 'invalid' : ''}`}>
            {errors.password}
          </span>

          <input
            className={errors.confirmPassword ? 'invalid' : ''}
            autoComplete="off"
            type="password"
            name="confirmPassword"
            id="signup-confirm-password"
            placeholder="Confirm password"
            onChange={validatePasswordConfirmationOnChange}
            onBlur={validatePasswordConfirmationOnBlur}
          />

          <span
            className={`error-wrapper ${errors.confirmPassword ? 'invalid' : ''}`}
          >
            {errors.confirmPassword}
          </span>
          <button className="signup" type="submit" disabled={isDisabled}>
            {mutation.isPending ? 'Signing up...' : 'Sign up'}
          </button>
          {errors.generalMessage && (
            <p className="general-err-msg">{errors.generalMessage}</p>
          )}
        </form>
        <div className="redirect-block">
          <p>
            Have an account? <Link to="/login">Log in</Link>{' '}
          </p>
        </div>
      </div>
    </section>
  );
}

async function signupUser({
  fullname,
  email,
  username,
  password,
  confirmPassword,
}) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullname,
      email,
      username,
      password,
      confirmPassword,
    }),
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
