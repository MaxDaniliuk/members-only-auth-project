import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostsContext } from '../hooks/usePostsContext';
import Button from '../components/Button';

export default function Create() {
  const navigate = useNavigate();
  const { dispatch } = usePostsContext();
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

    try {
      const res = await fetch('/api/post', {
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

      dispatch({ type: 'SUCCESS', payload: data });
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
          <span
            className={errors.title ? 'error-wrapper invalid' : 'error-wrapper'}
          >
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
