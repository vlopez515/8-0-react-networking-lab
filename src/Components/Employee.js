import PetList from "./PetList";
import "./Employee.css";
import React, { useState, useEffect } from "react";

export default function Employee({employeeId, prefix, firstName, lastName, postfix, title}) {

  const [petList, setPetList] = useState([])
  const [showPets, setShowPets] = useState(false)

    const getPets = () => {
      fetch(`https://vet-lab-8-4.herokuapp.com/api/pets?employeeId=${employeeId}`)
      .then((data) => data.json())
      .then((data) => {
        setPetList(data)
      })
      .catch ((err) => {
        console.log(err)
      })
    }
    
    useEffect(() => {
      getPets()
    })

    const handleClick = () => !showPets ? setShowPets(true) : setShowPets(false) 
    
    
    const show = () => {
      if(showPets === true){
        return (
          <PetList petList={petList}/>
        )
      }
    }
      

  return (
      <article className="employee">
       <h3> 
       { prefix ? prefix + ' ' : null }
       { firstName + ' ' + lastName }  
       { postfix ? ', ' + postfix : null }
       </h3>
        <h4>{ title }</h4>
      <button onClick={handleClick}>Show Pets</button>
      <section>{show()}</section>
      </article>
    )
  };





