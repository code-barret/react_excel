import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

// es5
// var Title = React.createClass({
//         render: function() {
//           return(
//               React.DOM.h1(null, "家計簿")
//             );
//         }
// });

// es6
class Title extends Component {
  render() {
    return (
      <h1>家計簿</h1>
    );
  }
}

class Excel extends Component {

  // es5
  // getInitialState: function() {
  //   return {
  //   };
  // },

  getInitialState() {
    return {
      // do something
    };
  }
  _sort(e) {
    // do something
  }

  // return (
  //   React.DOM.table(null,
  //     React.DOM.thead({onClick: this._sort},
  //       React.DOM.tr(null,
  //         this.props.headers.map(function(title, idx) {
  //           if (this.state.sortby === idx) {
  //             title += this.state.descending ? ' \u2191' : ' \u2193'
  render() {
    return (
      <table>
        <thead onClick={this._sort}>
          <tr>
            {this.props.headers.map( (title, idx) => {
              if ( this.state.sortby === idx) {
                title += this.state.descending ? ' \u2191' : ' \u2193';
              }
              return (
                <th key="idx">{title}</th>
              );
            })}
      </tr>
        </thead>
        <tbody onDoubleClick={this.showEditor}>
        {this.state.data.map( (row, rowidx) => <tr>...</tr>)}
      </tbody>
        </table>
    );
  }

}

// es5
// propTypes: {
//   headers: React.PropTypes.arrayOf(
//     React.PropTypes.string
//   ),
// },

Excel.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string)
};

// <body>
//   <div id="title_header"></div>
//   <div id="root"></div>
//   <div id="gyotsuika_btn"></div>
//   <div id="sogokei_kingaku"></div>
// </body>


// ReactDOM.render(<Title />, document.getElementById("title_header"));

// ReactDOM.render(
//   React.createElement(Excel, { headers: headers, initialData: data }),
//   document.getElementById("root")
// );

// ReactDOM.render(<Main />, document.getElementById("gyotsuika_btn"));
// ReactDOM.render(<Sogokei />, document.getElementById("sogokei_kingaku"));


// index.html
  <body>
    <div id="root"></div>
  </body>

class TitleHeader extends Component {
  render() {

  }
}

class GyotsuikaBtn extends Component {
  render() {

  }
}

// App
class App extends Component {
  render() {
    return (
      <div>
        <TitleHeader />
        <GyotsuikaBtn />
        <SogokeiKingaku />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);


const datas = [
  {id: 1, name: "coffee", price: 100, num: 1},
  {id: 2, name: "orange juice", price: 200, num: 2},
  {id: 3, name: "melon", price: 1500, num: 1},
];

const header = Object.keys(datas[0]);

console.log(header);

const rowSum = (row) => {
  return row.price * row.num
};

console.log(
  // datas.map(rowSum) 省略表記
  datas.map( data => rowSum(data))
);

// 総合計折りたたみ演算
console.log(
  datas.reduce( (a, b) => rowSum(a) + rowSum(b) )
);

console.log(
  datas.filter( data => data.price > 1000)
);

// sort
console.log(
  datas.sort( (a, b) => a.price < b.price)
);

// 3項演算子
const open = false;
const result = open ? "opened" : "closed";
console.log(result);