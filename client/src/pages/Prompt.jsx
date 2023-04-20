import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { PROMPT } from '../utils/queries';
import PromptJ from './PromptJ';

export default function Prompt() {
  const [userInput, setUserInput] = useState('');
  const [promptResponse, setPromptResponse] = useState('');
  const [getPromptResponse, { loading, error, data }] = useLazyQuery(PROMPT);

  async function onSubmit(event) {
    event.preventDefault();
    const {
      data: { prompt },
    } = await getPromptResponse({
      variables: { input: userInput },
    });

    // console.log(response.error.message);
    setPromptResponse(prompt);
  }
  // console.log(data)
  return (
    <div className='mainPage' >
      <div>
      <main>
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div>{loading ? <div>Loading...</div> : <p>{promptResponse}</p>}</div>
      </main>
    </div>
      <div style={{maxWidth: "700px", margin: "auto"}}>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', marginTop: '24px', padding:'0px 24px'}}>
              <h2>Friend Name</h2>
              <div>
                  <Button size='sm'>Save Friend</Button>
                  <Button size='sm'>Edit Friend</Button>
                  <Button size='sm'>Remove Friend</Button>
              </div>
          </div>
          <div>
              <Textarea placeholder='large size' size='lg' rows={10} height="auto"/>
              <Input placeholder='large size' size='lg' />
          </div>
      </div>
      </div>
    )
}
