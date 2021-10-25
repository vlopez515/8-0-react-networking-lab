import React from "react";
import Employee from "./Employee";
import "./EmployeeList.css";

export const EmployeeList = () => {
  return (
    <main>
      <h2>All Staff</h2>
      <section className="employee-list">
        <Employee />
      </section>
    </main>
  );
};

export default EmployeeList;
