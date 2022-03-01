import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  browserLocalPersistence,
  onIdTokenChanged,
  User,
  signInAnonymously,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  auth,
  signInWithGoogle as _signInWithGoogle,
} from '../firebase/firebase_config';
import nookies from 'nookies';

type IAuthContext = {
  user?: User;
  isLoading: boolean;
  logOut: () => void;
  signInWithGoogle: () => void;
  signInAnon: () => Promise<User>;
};

const AuthContext = createContext<IAuthContext>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  function logOut() {
    auth.signOut();
  }

  async function signInAnon() {
    await signInAnonymously(auth);
    return auth.currentUser;
  }

  async function signInWithGoogle() {
    await _signInWithGoogle();
    auth.setPersistence(browserLocalPersistence);
  }

  useEffect(() => {
    setIsLoading(true);

    onAuthStateChanged(auth, async (_user) => {
      console.log('id token changed to', _user?.uid);
      if (!_user) {
        setUser(undefined);
        nookies.set(undefined, 'token', '');
      } else {
        const token = await _user.getIdToken();
        setUser(_user);
        nookies.set(undefined, 'token', token, {});
      }
    });

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        logOut,
        signInWithGoogle,
        signInAnon,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
