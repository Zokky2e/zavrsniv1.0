import { Route,  Routes  } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import Layout from "./components/UI/Layout";
import SignIn from "./pages/SignIn";
import MyNotes from "./pages/MyNotes";
import { AuthProvider } from "./components/User/UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Profile from "./pages/Profile";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, [currentUser]);

  return (
    <AuthProvider value={currentUser}>
      <Layout>
      <Routes>
        <Route path="/" element={<MyNotes/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/profile" element={<Profile/>}/>
        
      </Routes>
    </Layout>
    </AuthProvider>
  );
}

export default App;
