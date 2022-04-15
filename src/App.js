import React, { useState } from 'react';
import './App.css';
import EntriesList from "./EntriesList";
import EntryCreateSection from "./EntryCreateSection";

const isDateValid = date => { // require yyyy-mm-dd
  if (date.length !== 10) return false;
  if (date[4] !== '-' || date[7] !== '-') return false; // not dashes in yyyy-mm-dd
  for (let i = 0; i < date.length; i++) {
    if (i === 4 || i === 7) continue;
    if (![..."0123456789"].includes(date[i])) return false;
  }
  const year = parseInt(date.substring(0, 4), 10);
  const month = parseInt(date.substring(5, 7), 10);
  const day = parseInt(date.substring(8), 10);
  if (year < 1900 || year > 2200) return false;
  if (month < 1 || month > 12) return false;

  let maxDays;
  switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      maxDays = 31; break;
    case 4: case 6: case 9: case 11:
      maxDays = 30; break;
    default: maxDays = 29; break;
  }

  if (day < 1 || day > maxDays) return false;
  if (month === 2 && day === 29) {
    const isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    if (!isLeap) return false; // Feb 29 on a non-leap year
  }
  return true;
};

export default function App() {
  const [entries, setEntries] = useState({});
  const handleAdd = ([date, distance]) => {
    if (!isDateValid(date)) {
      alert("Invalid date. Please enter as in 1999-12-31 (with leading zeros).");
      return;
    }
    const distanceNum = parseFloat(distance);
    if (isNaN(distanceNum) || distanceNum < 0 || distanceNum > 1000) {
      alert("Invalid distance");
      return;
    }

    setEntries(prevEntries => {
      const alreadyWalked = prevEntries[date] || 0;
      return { ...prevEntries, [date]: alreadyWalked + distanceNum };
    })
  };
  const handleRemove = date => setEntries(prevEntries => {
    const copy = { ...prevEntries };
    delete copy[date];
    return copy;
  });

  return (
    <div className="App">
      <EntryCreateSection handleAdd={handleAdd} />
      <EntriesList entries={entries} onRemove={handleRemove} />
    </div>
  );
};
