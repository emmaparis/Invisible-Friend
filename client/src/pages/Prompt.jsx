import React, { useState } from 'react'
import { Button, Input, Textarea } from '@chakra-ui/react'
import { useQuery } from '@apollo/client';
import { PROMPT } from '../utils/queries'


export default function Prompt() {
    const [userInput, setUserInput] = useState("");
    const [prompt] = useQuery(PROMPT);
    const body = data?.body || "";

  
    async function onSubmit(event) {
      event.preventDefault();
        const { data } = await prompt({variables: userInput})
    }
    console.log(data)
    return (
      <div>
  
        <main>
          <h3>Name my pet</h3>
          <form onSubmit={() => onSubmit}>
            <input
              type="text"
              name="animal"
              placeholder="Enter an animal"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <input type="submit" value="Generate names" />
          </form>
          <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            {body}
          )}
          </div>
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
