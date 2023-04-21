import React from 'react';

export default function Message({ role, content }) {
  return <div className={`message ${role}`}>{content}</div>;
}
