import React, { useState } from 'react';

const TodoCard = () => {
  const [cardText, setText] = useState('');
  const onTextChange = (event) => {
    setText(event.target.value);
  };
  return (
    <div>
      <input value={cardText} onChange={onTextChange} placeholder="Task Name" />
    </div>
  );
};
export default TodoCard;
