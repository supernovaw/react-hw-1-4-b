import React from 'react';
import './EntryCreateSection.css';

export default function EntryCreateSection({ handleAdd }) {
  const onSubmit = e => {
    e.preventDefault();
    handleAdd([e.target[0].value, e.target[1].value]);
  };
  return (
    <form className="EntryCreateSection" onSubmit={onSubmit}>
      <div>
        <label htmlFor="date-input">Date (yyyy-mm-dd)</label>
        <input id="date-input"></input>
      </div>
      <div>
        <label htmlFor="distance-input">Walked distance (km)</label>
        <input id="distance-input"></input>
      </div>
      <button>Add</button>
    </form>
  );
};
