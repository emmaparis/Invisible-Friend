import React from 'react';

export default function Message({ type, content }) {
  return <div className={`message ${type}`}>{content}</div>;
}
