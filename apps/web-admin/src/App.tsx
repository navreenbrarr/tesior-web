import "./App.css";
import { AppBar } from "./components/AppBar.tsx";
import { ConnectWalletProvider } from "./components/ConnectWalletProvider.tsx";
import { Task } from "./components/Task.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// to get rid of the Buffer is not defined error
// This is happening because the default bundler that comes with react (webpack 5) does not polyfill Buffer
import * as buffer from "buffer";
import { useState } from "react";
window.Buffer = buffer.Buffer;

function App() {
  return (
    <BrowserRouter>
      <ConnectWalletProvider>
        <AppBar />
        <Routes>
          <Route path="/" element={<Task />} />
        </Routes>
      </ConnectWalletProvider>
    </BrowserRouter>
  );
}

export default App;
