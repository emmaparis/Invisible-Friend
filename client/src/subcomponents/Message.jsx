import React, { useState } from 'react';

export default function Message({ role, content }) {
  const [text, setText] = useState('Hello this is a test');
  const { speak } = useSpeechSynthesis();

  const handleOnClick = (text) => {
    speak({ text: text });
  };

  return (
    <div
      className={`message ${role}`}
      onClick={() => {
        handleOnClick(content);
      }}
    >
      {content}
    </div>
  );
}
