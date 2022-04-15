import React from 'react';
import './EntriesList.css';

const compareDates = (dt1, dt2) => { // doesn't check for validity; past first future last
  const y1 = parseInt(dt1.substring(0, 4), 10);
  const y2 = parseInt(dt2.substring(0, 4), 10);
  if (y1 !== y2) return y1 - y2;

  const m1 = parseInt(dt1.substring(5, 7), 10);
  const m2 = parseInt(dt2.substring(5, 7), 10);
  if (m1 !== m2) return m1 - m2;

  const d1 = parseInt(dt1.substring(8), 10);
  const d2 = parseInt(dt2.substring(8), 10);
  return d1 - d2;
}

export default function EntriesList({ entries, onRemove }) {
  const entryKeys = Object.keys(entries).sort((a, b) => compareDates(b, a));
  return (<React.Fragment>
    <table className="EntriesList">
      <thead><tr>
        <td>Date</td>
        <td>Walked distance</td>
        <td></td>
      </tr></thead>
      <tbody>
        {entryKeys.map(date => <tr key={date}>
          <td>{date}</td>
          <td>{+(entries[date].toFixed(3))} km</td>
          <td><button onClick={e => onRemove(date)}>Remove</button></td>
        </tr>)}
      </tbody>
    </table>
    {!!entryKeys.length || <div className="no-data">There is no data here yet</div>}
  </React.Fragment>);
};
