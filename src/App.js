import { Route,  Routes  } from "react-router-dom";
import React from 'react';

import Layout from "./components/UI/Layout";
import SignIn from "./pages/SignIn";
import MyNotes from "./pages/MyNotes";

function App() {
  return (
      <Layout>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/new-note" element={<MyNotes />} />
      </Routes>
    </Layout>
  );
}

export default App;
