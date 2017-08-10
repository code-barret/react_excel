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
        };

        _showEditor = (e) => {
          this.setState({edit: {
            row: parseInt(e.target.dataset.row, 10),
            cell: e.target.cellIndex,
          }});
          // console.log(this.state.edit);
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
          //console.log(this.e);
          // console.log(this.content);
          // console.log(this.state.total_price);
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

class AddRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: data,
		};
	}

	addrow = () => {

		// add = [this.state.data, 6]
		// this.setState({data: add});
		// console.log(add);

		// let add = update(this.state.data, {$push: [5]});
		// console.log(add);
		// this.setState({data: add});

	// 	this.setState({ data: this.state.data.map(i => {
	// 		i.length += 1;
	// 		console.log(i);
	// 	})
	// });
		console.log("プッシュ");
	}

	render() {
		return(
			<button onClick={this.addrow}>行追加</button>
		);
	}
}

class Total_price_table extends Component{



  render() {
  	// let calc_price = data[0][2] + data[1][2] + data[2][2] + data[3][2];
  	let calc_price = data.reduce(function(a,b){
  		//console.log(a[2].concat(b[2]));
  		return c[a].concat(b[2]);
  	});
          return (
            <table>
              <thead>
                <tr>
                  <th>総合計</th>
                  <th>{calc_price}</th>
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
      var data = [...Array(5).keys()].map(i => [i + 1, "", 1, 2, 0]);

      var total_price = 0;

      ReactDOM.render(
        <App />,
      document.getElementById("root")
      );