import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { expectRedux, storeSpy } from 'expect-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
injectTapEventPlugin();

const dataReducer = (state = [...Array(5).keys()].map(i => [ i + 1, "未入力", 1, 2, 0, ""]), action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return [...state, [state.length + 1, "未入力", 1, 2, 0, ""]]

    case 'DELETE':
      return state.filter(d => {
        return d[0] !== action.eventTargetId;
      })

    case 'SAVE':
      const test = state.slice();
      test[action.row][action.cell] = action.input;
      return test;

    case 'SORT_DATA':
      const clonedState = state.slice();
      const descending = action.sortby === action.column && !action.descending;

      return clonedState.sort((a, b) => {
        return descending
          ? (a[action.column] < b[action.column] ? 1 : -1)
          : (a[action.column] > b[action.column] ? 1 : -1);
      });

    default:
        return state;
  }
};

const editReducer = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_EDITOR':
      return {
        row: action.row,
        cell: action.cell
      };

    default:
      return state;
  }
};

const descendingReducer = (state = false, action) => {
  switch (action.type) {
    case 'SORT_DESCENDING':
      return action.descending;

    default:
      return state;
  }
};

const sortByReducer = (state = null, action) => {
  switch (action.type) {
    case 'SORT_SORTBY':
      return action.sortBy;


    default:
      return state;
  }
};

class TitleHeader extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar title="家計簿" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
      </MuiThemeProvider>
    );
  }
}


class Excel extends Component {
  render() {
    const headers = ["ID", "品名", "単価", "数量", "合計", "削除"];
    console.log(headers);
    const _data =  this.state.data.map( d => [ d[0], d[1], d[2], d[3], d[2] * d[3], d[5] ]);
    const total_price = _data.map( a => a[4]).reduce((p, c) => p + c);
    return (
      <div>
        <MuiThemeProvider>
          <Table selectable={false}>
            <TableHeader displayRowCheckbox={false} displaySelectAll={false}>
              <TableRow>
                {headers.map((title, idx) => {
                  if (this.state.sortby === idx) {
                    title += this.state.descending ? ' \u2191' : ' \u2193';
                  }
                  return <TableHeaderColumn key={idx} onTouchTap={this.props._sort}>{title}</TableHeaderColumn>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody
              stripedRows={true}
              displayRowCheckbox={false}
              onDoubleClick={this.props._showEditor}>
              {this.props.value.map((row, rowidx) => {
                  return (
                    <TableRow key={rowidx}>{row.map((cell, idx) => {
                        //const content = cell;
                        const edit = this.state.edit;
                          //console.log(cell, idx);
                        const content = (edit  && edit.row === rowidx && edit.cell === idx && idx < 4)
                        ? <form onSubmit={this.props._save}>
                            <input type="text" defaultValue={this.state.cell}/>
                          </form>
                        : cell;

                        const btn = (idx === 5)
                        ? <FlatButton
                            onClick={this.props._delete}
                            data-id={row[0]}
                            backgroundColor="LightGrey"
                            hoverColor="red"
                            label="削除"
                          >
                          </FlatButton>
                        : null;

                        //idxとrowidxがeditプロパティの値と一致する場合、contentを 入力フィールドに置き換えます。そうでない場合は、文字列をそのまま表示します
                        return <TableRowColumn key={idx} data-row={rowidx}>{content}{btn}</TableRowColumn>
                      })}
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RaisedButton label="行追加" onClick={this.addRow}/>
        </MuiThemeProvider>
        <Total_price_table total_price={total_price}/>
      </div>
    );
  }
};

// Excel.propTypes = {   headers: PropTypes.arrayOf(PropTypes.string) };

class Total_price_table extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Table
          style={{
            width: '40%',
            border: '2px solid #CCF1F6',
            margin: '0 auto',
          }}
        >
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn
                style={{
                  backgroundColor: '#CCF1F6',
                  textAlign: 'center',
                }}
              > 総合計
              </TableRowColumn>
              <TableRowColumn
                style={{
                  textAlign: 'right',
                }}
              > {this.props.total_price}
            　</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

const redusers = combineReducers({
  dataReducer,
  sortByReducer,
  descendingReducer,
  editReducer
})

const App = () => {
  return(
    <div>
      <TitleHeader/>
      <Excel
        value={store.getState()}

        _addRow = {() =>
          store.dispatch({
            type:'ADD_ROW'
       })}

      _delete ={(event) =>
        store.dispatch({
          type: 'DELETE',
          eventTargetId: 1
      })}

      _showEditor = {(e) =>
        store.dispatch({
          type: 'SHOW_EDITOR',
          row: 1,
          cell: 2
      })}

      _save = {(e) =>
        store.dispatch({
          type: 'SAVE',
          input: 32,
          row: 2,
          cell: 1
      })}

      _sortData = {(e) =>
        store.dispatch({
          type: 'SORT_DATA',
          column: 0,
          sortby: 0,
          descending: false
      })}

      _sortDescending = {() =>
       store.dispatch({
         type: 'SORT_DESCENDING',
         descending: false
       })}

      _sortSortBy = {() =>
        store.dispatch({
          type: 'SORT_SORTBY',
          sortBy: 0
        })}
      />
    </div>
  );
 }

// const initialState = {
//   data: [...Array(5).keys()].map(i => [ i + 1, "未入力", i + 1, 2, 0, ""]),
//   sortBy: null,
//   descending: false,
//   edit: null,
// };

const store = createStore(redusers);

const render = () => {
  ReactDOM.render(
    <App />, document.getElementById("root"));
}

store.subscribe(render);

render();