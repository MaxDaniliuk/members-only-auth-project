import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';

export default function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topic: '',
    post: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [errors, setErrors] = useState({
    topic: null,
    post: null,
    generalMessage: null,
  });

  function confirmFieldsValidity(latestFormData) {
    const allFielsFilled = Object.values(latestFormData).every(
      field => field.trim() !== '',
    );

    setIsDisabled(!allFielsFilled);
  }

  function returnErrorMsg(fieldName) {
    if (fieldName === 'topic') return `Post must have a title.`;
    return `What would you like to share?`;
  }

  function handleOnChange(e) {
    const fieldValue = e.target.value.trim();
    const fieldName = e.target.name;

    setFormData(prevState => {
      const updatedField = { ...prevState, [fieldName]: fieldValue };

      const updatedErrors = {
        ...errors,
        [fieldName]: fieldValue === '' ? returnErrorMsg(fieldName) : null,
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
      const res = await fetch('/api/user/create/post', {
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
      console.log('data: ', data);
      console.log('Post created');
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
    <section className="create-post-page">
      <div className="form-wrapper">
        <form
          autoComplete="off"
          method="POST"
          id="form-create"
          onSubmit={handleSubmit}
        >
          <h1>Create a new post</h1>
          <label htmlFor="topic">
            Topic title:
            <input
              className={errors.topic ? 'invalid' : ''}
              autoComplete="off"
              type="text"
              id="topic"
              name="topic"
              minLength={1}
              maxLength={35}
              onChange={handleOnChange}
            />
          </label>
          <span
            className={errors.topic ? 'error-wrapper invalid' : 'error-wrapper'}
          >
            {errors.topic}
          </span>
          <div className="post-field">
            <label htmlFor="textarea">Post content: </label>
            <textarea
              className={errors.post ? 'invalid' : ''}
              autoComplete="off"
              name="post"
              id="textarea"
              onChange={handleOnChange}
            ></textarea>
          </div>
          <span
            className={errors.post ? 'error-wrapper invalid' : 'error-wrapper'}
          >
            {errors.post}
          </span>
          <Button specClass={'submit'} disabled={isDisabled}>
            Publish
          </Button>
          {errors.generalMessage && (
            <p className="general-err-msg">{errors.generalMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}
