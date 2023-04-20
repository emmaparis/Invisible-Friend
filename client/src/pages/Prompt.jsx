import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { PROMPT } from '../utils/queries';

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

    setPromptResponse(prompt);
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
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div>{loading ? <div>Loading...</div> : <p>{promptResponse}</p>}</div>
      </main>
    </div>
  );
}
