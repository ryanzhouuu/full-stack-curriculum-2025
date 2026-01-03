// Importing necessary hooks and functionalities
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Creating a context for authentication. Contexts provide a way to pass data through
// the component tree without having to pass props down manually at every level.
const AuthContext = createContext();

// This is a custom hook that we'll use to easily access our authentication context from other components.
export const useAuth = () => {
  return useContext(AuthContext);
};

// This is our authentication provider component.
// It uses the context to provide authentication-related data and functions to its children components.
export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const register = (email, password) => {
    if (!email || !password) {
      setLoginError("ERROR: Please enter an email and password");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setLoginError("ERROR: Please enter a valid email");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        userCredential.user.getIdToken().then((accessToken) => {
          console.log(accessToken);
        });
        setLoginError(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration error:", error); // Add this to see full error
        setLoginError(error.message);
      });
  };

  // Login function that validates the provided username and password.
  const login = (email, password) => {
    if (!email || !password) {
      setLoginError("ERROR: Please enter an email and password");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setLoginError("ERROR: Please enter a valid email");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        setLoginError(null);
        navigate("/");
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  // Logout function to clear user data and redirect to the login page.
  const logout = () => {
    signOut(auth).then(() => {
      setCurrentUser(null);
      navigate("/login");
    });
  };

  // An object containing our state and functions related to authentication.
  // By using this context, child components can easily access and use these without prop drilling.
  const contextValue = {
    currentUser,
    login,
    register,
    logout,
    loginError,
    isLoading,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // The AuthProvider component uses the AuthContext.Provider to wrap its children.
  // This makes the contextValue available to all children and grandchildren.
  // Instead of manually passing down data and functions, components inside this provider can
  // simply use the useAuth() hook to access anything they need.
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
