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
  初期化
  constructor(props) {
    super(props);
    this.state = {
      data: [...Array(5).keys()].map(i => [ i + 1, "未入力", i + 1, 2, 0, ""]),
      sortby: null,
      descending: false,
      edit: null, // {row: 行番号, cell: 列番号}
    };
  }

  _sort = (e) => {
    const column = e.target.cellIndex - 1 ; //ダブルクリックされた<td>要素を表す
    const data = this.state.data.slice();
    const descending = this.state.sortby === column && !this.state.descending;
    data.sort((a, b) => {
      return descending
        ? (a[column] < b[column] ? 1 : -1)
        : (a[column] > b[column] ? 1 : -1);
    });
    this.setState({data: data, sortby: column, descending: descending});
  }

  _showEditor = (e) => {
    // console.log(e.target.dataset.row);
    // console.log(e.target.cellIndex);
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex
      }
    });
  }

  _save = (e) => {
    e.preventDefault();
    console.log(e.target.firstChild);
    const input = e.target.firstChild;
    const data = this.state.data.slice();
    console.log(input.value);
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    console.log(data);
    this.setState({edit: null, data: data});
  }

  addRow = () => {
    //const add = [this.state.data.length + 1, "", 1, 2];
    const addrow = [...this.state.data, [this.state.data.length + 1, "未入力", 1, 2, 0, ""]];
    this.setState({data: addrow});
  }

  delete = (event) => {
    //console.log(event.target.dataset.id);
    //console.log(event.currentTarget);
    const deleteNumber = this.state.data.filter(d => {
      //console.log(this.state.edit.row);
      return d[0] !== parseInt(event.target.dataset.id);
    });
    this.setState({data: deleteNumber});
  }

  render() {
    const headers = ["ID", "品名", "単価", "数量", "合計", "削除"];
    // this.state.data.forEach((d, i) => this.state.data[i][4] = d[2] * d[3] );
    // console.log(this.state.data);
    const _data =  this.state.data.map( d => [ d[0], d[1], d[2], d[3], d[2] * d[3], d[5] ]);
    //console.log(this.state.data);
    const total_price = _data.map( a => a[4]).reduce((p, c) => p + c);
    //console.log(this.state.edit);
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
                  return <TableHeaderColumn key={idx} onTouchTap={this._sort}>{title}</TableHeaderColumn>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody
              stripedRows={true}
              displayRowCheckbox={false}
              onDoubleClick={this._showEditor}>
              {_data.map((row, rowidx) => {
                  return (
                    <TableRow key={rowidx}>{row.map((cell, idx) => {
                        //const content = cell;
                        const edit = this.state.edit;
                          //console.log(cell, idx);
                        const content = (edit  && edit.row === rowidx && edit.cell === idx && idx < 4)
                        ? <form onSubmit={this._save}>
                            <input type="text" defaultValue={this.state.cell}/>
                          </form>
                        : cell;

                        const btn = (idx === 5)
                        ? <FlatButton
                            onClick={this.delete}
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

class App extends Component {
  render() {
    return (
      <div>
      <TitleHeader />
      <Excel />
    </div>
    )
  }
}

ReactDOM.render(
  <App />, document.getElementById("root"));