import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
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
  //初期化
  constructor(props) {
    super(props);
    this.state = {
      data: [...Array(5).keys()].map(i => [ i + 1, "", i + 1, 2, 0, ""]),
      sortby: null,
      descending: false,
      edit: null, // {row: 行番号, cell: 列番号}
    };
  }

  _sort = (e) => {
    const column = e.target.cellIndex; //ダブルクリックされた<td>要素を表す
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
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex
      }
    });
  }

  _save = (e) => {
    e.preventDefault();
    const input = e.target.firstChild;
    const data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({edit: null, data: data});
  }

  addRow = () => {
    //const add = [this.state.data.length + 1, "", 1, 2];
    const addrow = [...this.state.data, [this.state.data.length + 1, "", 1, 2, 0, ""]];
    this.setState({data: addrow});
  }

  delete = () => {
    //console.log(this.state.edit.row);
    const deleteNumber = this.state.data.filter(d => {
      console.log(d[0]);
      //console.log(this.state.edit.row);
      return d[0] !== this.state.edit.row;
    });
    this.setState({data: deleteNumber});
  }

  render() {
    const headers = ["ID", "品名", "単価", "数量", "合計"];
    this.state.data.forEach((d, i) => this.state.data[i][4] = d[2] * d[3] );
    //this.setState({data: this.state.data.map( d => d[4] = d[2] * d[3])});
    const total_price = this.state.data.map( a => a[4]).reduce((p, c) => p + c);
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
              showRowHover={true}
              stripedRows={true}
              displayRowCheckbox={false}
              onDoubleClick={this._showEditor}>
              {this.state.data.map((row, rowidx) => {
                  return (
                    <TableRow key={rowidx}>{row.map((cell, idx) => {
                        //const content = cell;
                        const edit = this.state.edit;
                          //console.log(cell, idx);
                        const content = (edit && edit.row === rowidx && edit.cell === idx)
                        ? <form onSubmit={this._save}>
                            <input type="text" defaultValue={this.state.cell}/>
                          </form>
                        : cell;

                        const btn = (idx === 5)
                        ? <button onClick={this.delete}>{"削除"}</button>
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
        <Table>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>総合計</TableRowColumn>
              <TableRowColumn>{this.props.total_price}</TableRowColumn>
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
        <TitleHeader/>
        <Excel/>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>, document.getElementById("root"));