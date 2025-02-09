/** @format */

import React from "react";

const App = () => {
  return (
    <div>
      <header>
        <h1>Employee Management System </h1>
        <button>Add Employee</button>
      </header>

      <div className="employees">
        <div className="employees__names"></div>
        <div className="employees__single"></div>
      </div>
    </div>
  );
};

export default App;
