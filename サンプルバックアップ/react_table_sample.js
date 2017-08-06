import React from 'react';
import ReactDOM from 'react-dom';
// import {Table, Column, Cell} from 'fixed-data-table';
import './index.css';

const data = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Clark', lastName: 'Kent' },
  { id: 3, firstName: 'Clark', lastName: 'Kent' },
  { id: 4, firstName: 'Clark', lastName: 'Kent' }
];

class TableTest extends React.Component {

  render() {
    const rowComponents = this.generateRows();

    return (
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
        </thead>
        <tbody> {rowComponents} </tbody>
      </table>
    );
  }

  generateRows() {
    const data = this.props.data;

    return data.map((item) => {
      // -----👇👇👇注目ポイント
      return (
         <tr key={item.id}>
           <td>{item.firstName}</td><td>{item.lastName}</td>
         </tr>
         //<tr key={'secondRow_' + item.id}>
          //<td>{item.firstName}</td><td>{item.lastName}</td>
        //</tr>
      );
      // -----👆👆👆注目ポイント
    });
  }
}

ReactDOM.render(<TableTest data={data}/>, document.getElementById('root'));