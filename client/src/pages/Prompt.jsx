import React, { useState } from 'react'
import { Button, Input, Textarea } from '@chakra-ui/react'
import { useQuery } from '@apollo/client';
import { PROMPT } from '../utils/queries'


export default function Prompt() {
    const [animalInput, setAnimalInput] = useState("");
    const {getPrompt, data} = useQuery(PROMPT);
  
    async function onSubmit(event) {
      event.preventDefault();
      getPrompt() 
    }
  
    return (
      <div>
  
        <main>
          <h3>Name my pet</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="animal"
              placeholder="Enter an animal"
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
            />
            <input type="submit" value="Generate names" />
          </form>
          <div>{data}</div>
        </main>
      </div>
    );
//   return (
//     <div style={{maxWidth: "700px", margin: "auto"}}>
//         <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', marginTop: '24px', padding:'0px 24px'}}>
//             <h2>Friend Name</h2>
//             <div>
//                 <Button size='sm'>Save Friend</Button>
//                 <Button size='sm'>Edit Friend</Button>
//                 <Button size='sm'>Remove Friend</Button>
//             </div>
//         </div>
//         <div>
//             <Textarea placeholder='large size' size='lg' rows={10} height="auto"/>
//             <Input placeholder='large size' size='lg' />
//         </div>
//     </div>
//   )
}
