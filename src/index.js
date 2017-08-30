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

const dataReducer = (state = [...Array(5).keys()].map(i => [ i + 1, "未入力", i + 1, i + 2, 0, ""]), action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return [...state, [state.length + 1, "未入力", 1, 2, 0, ""]]

    case 'DELETE':
      return state.filter(d => {
        return d[0] !== action.eventTargetId;
      })

    case 'SAVE':
    // console.log(action.input);
    // console.log(action.row);
      action.e.preventDefault();
      const clonedStateSave = state.slice();
      //console.log(clonedStateSave);
      clonedStateSave[action.row][action.cell] = action.input.value;
      console.log(clonedStateSave);
      return clonedStateSave;

    case 'SORT_DATA':
    //console.log(action.sortby, action.column, action.descending);
      const clonedStateSort = state.slice();
      const descending = action.sortby === action.column && !action.descending.descendingReducer;
      //console.log(descending);
      return clonedStateSort.sort((a, b) => {
        return descending
          ? (a[action.column] < b[action.column] ? 1 : -1)
          : (a[action.column] > b[action.column] ? 1 : -1);
      });

    default:
        return state;
  }
};

const editReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_EDITOR':
      return {
        row: action.row,
        cell: action.cell
      }

    case 'EDIT_RESET':
      return {
        row: action.row,
        cell: action.cell
      }

    default:
      return state;
  }
};

const descendingReducer = (state = false, action) => {
  switch (action.type) {
    case 'SORT_DESCENDING':
    console.log(action.descending);
      return action.descending;

    default:
      return state;
  }
};

const sortByReducer = (state = null, action) => {
  switch (action.type) {
    case 'SORT_SORTBY':
    console.log(action.sortBy);
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
   // if(this.props.value.editReducer !== null) {
   //    return this.props._editReset;
   //  }
    const headers = ["ID", "品名", "単価", "数量", "合計", "削除"];
    // console.log(headers);
     console.log(this.props.value);
     //console.log(this.props.value.editReducer);
    // console.log(store.getState());
    const _data =  this.props.value.dataReducer.map( d => [ d[0], d[1], d[2], d[3], d[2] * d[3], d[5] ]);
    const total_price = _data.map( a => a[4]).reduce((p, c) => p + c);
    return (
      <div>
        <MuiThemeProvider>
          <Table selectable={false}>
            <TableHeader displayRowCheckbox={false} displaySelectAll={false}>
              <TableRow>
                {headers.map((title, idx) => {
                  if (this.props.value.sortByReducer === idx) {
                    title += this.props.value.descendingReducer ? ' \u2191' : ' \u2193';
                  }
                  return <TableHeaderColumn key={idx} onTouchTap={this.props._sortData}>{title}</TableHeaderColumn>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody
              stripedRows={true}
              displayRowCheckbox={false}
              onDoubleClick={this.props._showEditor}>
              {_data.map((row, rowidx) => {
                  return (
                    <TableRow key={rowidx}>{row.map((cell, idx) => {
                        //const content = cell;
                        const edit = this.props.value.editReducer;
                          console.log(edit);
                        const content = (edit  && edit.row === rowidx && edit.cell === idx && idx < 4)
                        ? <form onSubmit={this.props._save}>
                            <input type="text" defaultValue={cell}/>
                          </form>
                        : cell;

                        console.log(edit);

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
          <RaisedButton label="行追加" onClick={this.props._addRow}/>
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

const reducers = combineReducers({
  dataReducer,
  sortByReducer,
  descendingReducer,
  editReducer
})

const App = (_save) => {
  //console.log(store.getState())
   //if(store.getState().editReducer !== null) {
   //   console.log("通過");
   // }
  return(
    <div>
      <TitleHeader/>
      <Excel
        value={store.getState()}
        _addRow = {() =>
          store.dispatch({
            type:'ADD_ROW'
       })}

      _delete ={(e) =>
        store.dispatch({
          type: 'DELETE',
          eventTargetId: parseInt(e.currentTarget.dataset.id)
      })}

      _showEditor = {(e) =>
        store.dispatch({
          type: 'SHOW_EDITOR',
          row: parseInt(e.target.dataset.row, 10),
          cell: e.target.cellIndex
      })}

      _save = {(e, edit) =>
        store.dispatch({
          test: console.log(e.currentTarget.dataset.row, 10),
          test2: console.log(e.target.cellIndex),
          type: 'SAVE',
          input: e.target.firstChild,
          inputTest: console.log(e.target.firstChild.value),
          row: store.getState().editReducer.row,
          test3: console.log(store.getState().editReducer.row),
          cell: store.getState().editReducer.cell,
          test4: console.log(store.getState().editReducer.cell),
          e: e
      })}

      _sortData = {(e) =>
        store.dispatch({
          type: 'SORT_DATA',
          column: e.target.cellIndex - 1,
          sortby: e.target.cellIndex - 1,
          descending: store.getState().descendingReducer
      })}

      _sortDescending = {() =>
       store.dispatch({
         type: 'SORT_DESCENDING',
         descending: dataReducer.descending
       })}

      _sortSortBy = {(e) =>
        store.dispatch({
          type: 'SORT_SORTBY',
          sortBy: e.target.cellIndex - 1
        })}

        _editReset = {() =>
          store.dispatch({
            type: 'EDIT_RESET',
            row: null,
            cell: null
          })
        }
      />
    </div>
  )
 }

// const initialState = {
//   data: [...Array(5).keys()].map(i => [ i + 1, "未入力", i + 1, 2, 0, ""]),
//   sortBy: null,
//   descending: false,
//   edit: null,
// };

const store = createStore(reducers);

const render = () => {
  return(
    ReactDOM.render(
    <App />, document.getElementById("root"))
  );
}

store.subscribe(render);

render();