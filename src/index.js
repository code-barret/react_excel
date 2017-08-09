import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import './table.css';

class TitleHeader extends Component {
  render() {
    return (
      <h1>家計簿</h1>
    );
  }
}

class Excel extends Component {

  // Excel.propTypes = {
  //   headers: PropTypes.arrayOf(PropTypes.string)
  // };
        //初期化
        // getInitialState() {
        //   return {
        //     data: [],
        //     sortby: null,
        //     descending: false,
        //     edit: null, // {row: 行番号, cell: 列番号}
        //   }
        // }

        //初期化
        constructor(props) {
        super(props);
        //途中ここからやる
          data: [],
          sortby: null,
          descending: false,
          edit: null, // {row: 行番号, cell: 列番号}
      }


        _sort(e) {
          let column = e.target.cellIndex;
          let data = this.state.data.slice();
          let descending = this.state.sortby === column && !this.state.descending;
          data.sort(function(a, b) {
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

        _showEditor(e) {
          this.setState({edit: {
            row: parseInt(e.target.dataset.row, 10),
            cell: e.target.cellIndex,
          }});
        }

        _save(e) {
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
          console.log(this.state.sortby);
          return (
      <table>
        <thead onClick={this._sort}>
          <tr>
            {headers.map( (title) => {
              if ( this.state.sortby === 123) {
                title += this.state.descending ? ' \u2191' : ' \u2193';
              }
              return <th key="">{title}</th>;
            })}
          </tr>
        </thead>
        <tbody onDoubleClick={this._showEditor}>
        {this.state.data.map( (row, rowidx) => {
          <tr key="rowidx">{}</tr>;

              let content = [];
              let edit = this.state.edit;
              if (edit && edit.row === rowidx && edit.cell === []) {
                <form onSubmit={this.handlesubmit}>
                  <label>
                    Name:
                      <input type="text" value="" />
                  </label>
                  <input type="submit" value="this._save" />
                </form>
                }

            return <td key="">{rowidx}</td>;
          })
        }

        </tbody>
      </table>
          );
        }
      };

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

      var data = [
        //["", "", 0, 0, 0]
        ["", "", 0, 0, 0],
        ["", "", 0, 0, 0]
      ];

      var sogokei = 0;

      ReactDOM.render(
        <App />,
      document.getElementById("root")
      );