const SignIn = () => {
  return (
    <div className="flex items-center gap-4">
      <a
        href="/login"
        className="text-sm font-medium text-pure-black hover:opacity-70 transition-opacity duration-300 hidden sm:block"
        aria-label="Log in to your account"
        style={{ fontFamily: "'Inter Tight', sans-serif" }}
      >
        Log in
      </a>
      <a
        href="/signup"
        className="text-sm font-medium text-pure-black hover:opacity-70 transition-opacity duration-300"
        aria-label="Sign up for an account"
        style={{ fontFamily: "'Inter Tight', sans-serif" }}
      >
        Sign Up
      </a>
    </div>
  );
};

export default SignIn;
