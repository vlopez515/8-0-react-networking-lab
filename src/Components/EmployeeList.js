import React, {useState, useEffect} from "react";
import Employee from "./Employee";
import "./EmployeeList.css";

export default function EmployeeList () {
  const [employeesList, setEmployeesList] = useState([])
  
  const getEmployees = () => {
    fetch("https://vet-lab-8-4.herokuapp.com/api/employees")
    .then(data => data.json())
    .then(employees => {
     setEmployeesList(employees)
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {
    getEmployees()
  })

  return (
    <main>
      <h2>All Staff</h2>
      <section className="employee-list">
        {(employeesList).map((employees) => {
          return (<Employee 
            employeeId={employees.id}
            prefix={employees.prefix}
            firstName={employees.firstName} 
            lastName={employees.lastName}
            postfix={employees.postfix}
            title={employees.title}/>)
        })}
      </section>
    </main>
  );
};




