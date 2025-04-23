import "./SignUpPage.css";

const SignUpPage = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Roll No" />
          <input type="text" placeholder="Department" />
          <input type="text" placeholder="Phone No" />
          <input type="text" placeholder="Year of Study" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
