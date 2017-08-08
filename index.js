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
  //propTypesはclassの外側でする
  // Excel.propTypes = {
  //   headers: PropTypes.arrayOf(PropTypes.string)
  // };
       
        //初期化
        constructor(props) {
        super(props);
      }


        _sort(e) {
          let column = e.target.cellIndex;
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
          return (
            <table>
              <thead onClick={this._sort}>
                <tr>
                  {headers.map( (title, idx) => {
                    if ( this.sortby === idx) {
                      title += this.state.descending ? ' \u2191' : ' \u2193';
                    }
                    return <th key={idx}>{title}</th>;
                  })}
                </tr>
              </thead>
              <tbody onDoubleClick={this._showEditor}>
              {data.map( (row, rowidx) => {
                <tr key={rowidx}>{row}</tr>;

                let content = [];
                let edit = this.edit;
                if (edit && edit.row === rowidx && edit.cell === []) {
                  <form onSubmit={this.handlesubmit}>
                    <label>
                      Name:
                        <input type="text" value="" />
                    </label>
                    <input type="submit" value="this._save" />
                  </form>
                  }

            return <td key="">{}</td>;
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