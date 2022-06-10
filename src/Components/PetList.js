export default function PetList({petList}){

  let pets = petList.map((pet) => {
    return pet.name
  })
  
   return (
          <aside className="pets-list">
            <p> { pets.length < 1 ? 'No pets listed' : pets.join(", ")} </p>
          </aside>
        );
      };
  

