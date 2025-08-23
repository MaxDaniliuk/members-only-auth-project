import Button from '../components/Button';

export default function JoinTheClub() {
  return (
    <section className="join-page">
      <div className="form-wrapper">
        <form autocomplete="false" action="" method="" id="members-form">
          <input
            type="text"
            name="passcode"
            id="passcode"
            placeholder="Enter secret passcode"
          />
          <Button specClass={'join'} disabled={true}>
            Join the club
          </Button>
        </form>
      </div>
    </section>
  );
}
