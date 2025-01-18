// src/app/app.tsx
import React from "react";
import Form from "../components/Form";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Next.js Form with Validation</h1>
      <Form />
    </div>
  );
};

export default App;
