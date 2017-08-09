import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './table.css';

class TitleHeader extends Component {
        render() {
          return (
            <h1>家計簿</h1>
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
        }

        _showEditor = (e) => {
          this.setState({edit: {
            row: parseInt(e.target.dataset.row, 10),
            cell: e.target.cellIndex,
          }});
          console.log(this.state.edit);
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
        }

        render() {
          //console.log(this.e);
          console.log(this.content);
          // console.log(data.map((datas, id) => datas[4]));
          return (
            <table>
              <thead onClick={this._sort}>
                <tr>
                  {headers.map( (title, idx) => {
                    if ( this.state.sortby === idx) {
                      title += this.state.descending ? ' \u2191' : ' \u2193';
                    }
                    return <th key={idx}>{title}</th>;
                  })}
                </tr>
              </thead>
              <tbody onDoubleClick={this._showEditor}>
              {this.state.data.map( (row, rowidx) => {
                return(
                <tr key={rowidx}>{row.map((cell, idx) => {
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
                    return <td key={idx} data-row={rowidx}>{content}</td>
                  })}
                </tr>
               );
              })}

            </tbody>
          </table>
        );
      }
    };

  // Excel.propTypes = {
  //   headers: PropTypes.arrayOf(PropTypes.string)
  // };

class SogokeiKingaku extends Component{
  render() {
          return (
            <table>
              <thead>
                <tr>
                  <th>総合計</th>
                  <th>{sogokei}</th>
                </tr>
              </thead>
            </table>
          );
        }
      }

class App extends Component {
  render() {
    return (
      <div>
        <TitleHeader />
        <Excel />
        <SogokeiKingaku />
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
      var data = [...Array(5).keys()].map(i => [i + 1, "", 0, 0, 0]);

      var sogokei = 0;

      ReactDOM.render(
        <App />,
      document.getElementById("root")
      );