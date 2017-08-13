import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './table.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class TitleHeader extends Component {
        render() {
          return (
            <MuiThemeProvider>
            <AppBar
              title="家計簿"
              iconClassNameRight="muidocs-icon-navigation-expand-more" />
              </MuiThemeProvider>
          );
        }
      }

class Excel extends Component {

        //初期化
        constructor(props) {
        super(props);
        this.state = {
          data: data,
          headers: headers,
          total_price: total_price,
          sortby: null,
          descending: false,
          edit: null, // {row: 行番号, cell: 列番号}
        };
      }

        _sort = (e) => {
          let column = e.target.cellIndex; //ダブルクリックされた<td>要素を表す
          let data = this.state.data.slice();
          let descending = this.state.sortby === column && !this.state.descending;
          data.sort((a, b) => {
            return descending
              ? (a[column] < b[column] ? 1 : -1)
              : (a[column] > b[column] ? 1 : -1);
          });
          this.setState({
            data: data,
            sortby: column,
            descending: descending,
          });
        };

        _showEditor = (e) => {
          this.setState({edit: {
            row: parseInt(e.target.dataset.row, 10),
            cell: e.target.cellIndex,
          }});
        };

        _save = (e) => {
          e.preventDefault();
          let input = e.target.firstChild;
          let data = this.state.data.slice();
          data[this.state.edit.row][this.state.edit.cell] = input.value;
          this.setState({
            edit: null,
            data: data,
          });
        };

        render() {

          this.state.data.forEach((a,b,c) => {
            data[b][4] = a[2] * a[3];
            console.log(data[b][4]);
            //total_price += data[b][4];
          });

          return (
            <MuiThemeProvider>
            <table>
              <TableHeader onClick={this._sort}>
                <TableRow>
                  {headers.map( (title, idx) => {
                    if ( this.state.sortby === idx) {
                      title += this.state.descending ? ' \u2191' : ' \u2193';
                    }
                    return <TableHeaderColumn key={idx}>{title}</TableHeaderColumn>;
                  })}
                </TableRow>
              </TableHeader>
              <TableBody onDoubleClick={this._showEditor}>
              {this.state.data.map( (row, rowidx) => {
                return(
                <TableRow key={rowidx}>{row.map((cell, idx) => {
                  let content = cell;
                  let edit = this.state.edit;

                  if (edit && edit.row === rowidx && edit.cell === idx) {

                     content = ( <form onSubmit={this._save}>
                          <input type="text" defaultValue={this.state.cell} />
                      </form>
                    )
                }

                    //idxとrowidxがeditプロパティの値と一致する場合、contentを
                    //入力フィールドに置き換えます。そうでない場合は、文字列をそのまま表示します
                    return <TableRowColumn key={idx} data-row={rowidx}>{content}</TableRowColumn>
                  })}
                </TableRow>
               );
              })}

            </TableBody>
          </table>
          </MuiThemeProvider>
        );
      }
    };

  // Excel.propTypes = {
  //   headers: PropTypes.arrayOf(PropTypes.string)
  // };

class AddRow extends Component {

  addrow = () => {

    // add = [this.state.data, 6]
    // this.setState({data: add});
    // console.log(add);

    // let add = update(this.state.data, {$push: [5]});
    // console.log(add);
    // this.setState({data: add});

  //  this.setState({ data: this.state.data.map(i => {
  //    i.length += 1;
  //    console.log(i);
  //  })
  // });
    console.log("プッシュ");
  }

  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <RaisedButton label="行追加" onClick={this.addrow}　/>
      </MuiThemeProvider>
    );
  }
}

class Total_price_table extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    //let calc_price = data[0][2] + data[1][2] + data[2][2] + data[3][2];
    // let calc_price = this.state.data.reduce((a,b) => {
   //    if(a.length === b.length) {
   //       return a[2] * b[3];
   //    //  console.log(a[2], b[3]);
   //    }

   //    else {
   //      a = [0, "", a, 0, 0];
   //      console.log(a[2], b[3]);
   //       return a[2] * b[3];
   //    }
    // }, this.state.data[0][2]);
    //let calc_price = data.slice();
    data.forEach((a, b, c) => {
      //data[b][4] = a[4] * a[3];
      total_price += a[4];
      //total_price += data[b][4];
      //console.log(data[b][4]);
    });

          return (
          <MuiThemeProvider>
            <table>
              <TableHeader>
                <TableRow>
                  <TableRowColumn>総合計</TableRowColumn>
                  <TableRowColumn>{total_price}</TableRowColumn>
                </TableRow>
              </TableHeader>
            </table>
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
        <AddRow />
        <Total_price_table />
      </div>
    );
  }
}


      var headers = [
        "ID", "品名", "単価", "数量", "合計"
      ];

      // var data = [
      //   //["", "", 0, 0, 0]
      //   ["", "", 0, 0, 0],
      //   ["", "", 0, 0, 0],
      //   ["", "", 0, 0, 0]
      // ];
      var data = [...Array(5).keys()].map(i => [i + 1, "", i + 1, 2, 0]);

      var total_price = 0;

      ReactDOM.render(
        <App />,
      document.getElementById("root")
      );