"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [apiLoading, setApiLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
 
    setApiLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );


      if (response.ok) {
        const data = await response.json();
        setUser(data);
        
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      setError(error.message);
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        apiLoading,
        setUser,
        error,
        fetchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
