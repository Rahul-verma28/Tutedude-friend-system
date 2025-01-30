import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Requests } from './requests';

export function Navbar() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="bg-background text-foreground shadow-md dark:bg-gray-800 dark:text-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">FriendConnect</Link>
          <div className="flex items-center space-x-4">
            <NavLink to="/" icon={<Home className="w-5 h-5" />} label="Home" active={location.pathname === '/'} />
            <NavLink to="/search" icon={<Search className="w-5 h-5" />} label="Search" active={location.pathname === '/search'} />
            {/* <NavLink to="/requests" icon={<UserPlus className="w-5 h-5" />} label="Requests" active={location.pathname === '/requests'} /> */}
            <NavLink to="/profile" icon={<User className="w-5 h-5" />} label="Profile" active={location.pathname === '/profile'} />
            <Requests/>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out
        ${active ? 'bg-primary text-primary-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
    >
      {icon}
      <span className="ml-2 hidden sm:inline">{label}</span>
    </Link>
  );
}

