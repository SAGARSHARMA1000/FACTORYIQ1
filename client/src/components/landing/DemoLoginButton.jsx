/**
 * The navbar button. Opens /demo-login, or the dashboard if already signed in.
 *
 * WHERE TO ADD: new file, drop it in client/src/components/landing/.
 *
 * WHERE TO USE IT - in your existing client/src/components/landing/Navbar.jsx:
 *   1. import DemoLoginButton from './DemoLoginButton.jsx';
 *   2. In the right-hand <div className="flex items-center gap-3">, REPLACE both the
 *      "Sign in" <Link> and the "Try the demo" <Link> with:
 *        <DemoLoginButton />
 * Needs <AuthProvider> in main.jsx (see context/AuthContext.jsx).
 */
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function DemoLoginButton() {
  const { user } = useAuth();

  return (
    <Link
      to={user ? '/dashboard' : '/demo-login'}
      className="rounded-md bg-teal px-4 py-2 text-[13px] font-medium text-navy transition-colors hover:bg-teal/90"
    >
      {user ? 'Go to dashboard' : 'Demo login'}
    </Link>
  );
}
