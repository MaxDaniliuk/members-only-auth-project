import Button from '../components/Button';

export default function Create() {
  return (
    <section className="create-post-page">
      <div className="form-wrapper">
        <form autocomplete="false" action="" method="" id="form-create">
          <h1>Create a new post</h1>
          <label htmlFor="topic">
            Topic title:
            <input
              autocomplete="false"
              type="text"
              id="topic"
              name="topic"
              minLength={1}
              maxLength={35}
            />
          </label>
          <div className="post-field">
            <label htmlFor="textarea">Post content: </label>
            <textarea autocomplete="false" name="post" id="textarea"></textarea>
          </div>
          <Button specClass={'submit'} disabled={true}>
            Publish
          </Button>
        </form>
      </div>
    </section>
  );
}
