import { useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const navLinks = [
  { to: '/lost', label: 'Marketplace' },
  { to: '/found', label: 'Post Found' },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const {
    user,
    signOut,
    signIn,
    error,
    notice,
    isDemo,
    authDialogOpen,
    closeAuthDialog,
    submitEmail,
  } = useAuth();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleOpenAuth = () => {
    setEmail('');
    void signIn();
  };

  const handleCloseAuth = () => {
    setEmail('');
    closeAuthDialog();
  };

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    await submitEmail(email);
    setSubmitting(false);
    setEmail('');
  };

  return (
    <div className="app-shell">
      <header className="top-nav">
        <Link to="/" className="brand">
          <span className="brand-mark">MAC</span>
          <span className="brand-text">FIND</span>
        </Link>
        <nav className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user">
                {user.name || 'McMaster user'} - {user.email}
              </span>
              <button className="ghost-button" onClick={() => void signOut()}>
                Sign out
              </button>
            </>
          ) : (
            <button className="primary-button" onClick={handleOpenAuth}>
              Continue with McMaster email
            </button>
          )}
        </div>
      </header>

      {error && !authDialogOpen && <div className="alert alert-error">{error}</div>}
      {notice && <div className="alert alert-info">{notice}</div>}
      {isDemo && !error && (
        <div className="alert alert-info">
          Demo mode: set Supabase env vars in <code>.env.local</code> to enable McMaster-only email login.
        </div>
      )}

      <main className="page-shell">{children}</main>

      {authDialogOpen && (
        <div className="modal-overlay" onClick={handleCloseAuth}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Continue with McMaster email</h3>
            <p className="hint">
              Enter your <strong>MacID@mcmaster.ca</strong> and we&apos;ll email you a magic link.
            </p>
            <form className="form" onSubmit={handleEmailSubmit}>
              <input
                className="input"
                type="email"
                inputMode="email"
                placeholder="macid@mcmaster.ca"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
              <div className="modal-actions">
                <button className="primary-button" type="submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send login link'}
                </button>
                <button className="ghost-button" type="button" onClick={handleCloseAuth}>
                  Cancel
                </button>
              </div>
            </form>
            {error && <div className="modal-error">{error}</div>}
          </div>
        </div>
      )}
    </div>
  );
};
