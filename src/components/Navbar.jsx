import Logo from './Logo';
import Navigation from './Navigation';
import SignIn from './SignIn';

const Navbar = () => {
  return (
    <header className="bg-pure-white sticky top-0 z-50 shadow-sm" role="banner">
      <nav 
        className="max-w-350 mx-auto px-6 lg:px-12"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-20">
          {/* Left Column - Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Middle Column - Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center">
            <Navigation />
          </div>

          {/* Right Column - Sign In */}
          <div className="shrink-0">
            <SignIn />
          </div>
        </div>
      </nav>
      
      {/* Thin line below navbar */}
      <div className="h-px bg-gray-200"></div>
    </header>
  );
};

export default Navbar;
