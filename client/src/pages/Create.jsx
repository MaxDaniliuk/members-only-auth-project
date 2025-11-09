import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export default function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    post: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [errors, setErrors] = useState({
    title: null,
    post: null,
    generalMessage: null,
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => navigate('/'),
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
    const allFielsFilled = Object.values(latestFormData).every(
      field => field.trim() !== '',
    );

    setIsDisabled(!allFielsFilled);
  }

  function returnErrorMsg(fieldName) {
    if (fieldName === 'title') return `Post must have a title.`;
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
    setErrors(prevState => ({ ...prevState, generalMessage: null }));
    mutation.mutate(formData);
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
          <label htmlFor="title">
            Post title:
            <input
              className={errors.title ? 'invalid' : ''}
              autoComplete="off"
              type="text"
              id="title"
              name="title"
              minLength={1}
              maxLength={35}
              onChange={handleOnChange}
            />
          </label>
          <span className={`error-wrapper ${errors.title ? 'invalid' : ''}`}>
            {errors.title}
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
          <span className={`error-wrapper ${errors.post ? 'invalid' : ''}`}>
            {errors.post}
          </span>
          <button className="submit" type="submit" disabled={isDisabled}>
            {mutation.isPending ? 'Uploading...' : 'Publish'}
          </button>
          {errors.generalMessage && (
            <p className="general-err-msg">{errors.generalMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}

async function createPost({ title, post }) {
  const res = await fetch('/api/post', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, post }),
  });

  const data = await res.json().catch(() => {
    throw new Error('Unexpected server response. Please try again later.');
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
