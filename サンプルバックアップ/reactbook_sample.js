import React from 'react';
import ReactDOM from 'react-dom';
import './table.css';

var Excel = React.createClass({
        displayName: 'Excel',
        
        propTypes: {
          headers: React.PropTypes.arrayOf(
            React.PropTypes.string
          ),
          initialData: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
              React.PropTypes.any
            )
          ),
        },

        getInitialState: function() {
          return {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // {row: 行番号, cell: 列番号}
          };
        },
        
        _sort: function(e) {
          var column = e.target.cellIndex;
          var data = this.state.data.slice();
          var descending = this.state.sortby === column && !this.state.descending;
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
        },
        
        _showEditor: function(e) {
          this.setState({edit: {
            row: parseInt(e.target.dataset.row, 10),
            cell: e.target.cellIndex,
          }});
        },
        
        _save: function(e) {
          e.preventDefault();
          var input = e.target.firstChild;
          var data = this.state.data.slice();
          data[this.state.edit.row][this.state.edit.cell] = input.value;
          this.setState({
            edit: null,
            data: data,
          });
        },
        
        render: function() {
          return (
            React.DOM.table(null,
              React.DOM.thead({onClick: this._sort},
                React.DOM.tr(null,
                  this.props.headers.map(function(title, idx) {
                    if (this.state.sortby === idx) {
                      title += this.state.descending ? ' \u2191' : ' \u2193'
                    }
                    return React.DOM.th({key: idx}, title);
                  }, this)
                )
              ),
              React.DOM.tbody({onDoubleClick: this._showEditor},
                this.state.data.map(function(row, rowidx) {
                  return (
                    React.DOM.tr({key: rowidx},
                      row.map(function(cell, idx) {
                        var content = cell;
                        var edit = this.state.edit;
                        if (edit && edit.row === rowidx && edit.cell === idx) {
                          content = React.DOM.form({onSubmit: this._save},
                            React.DOM.input({
                              type: 'text',
                              defaultValue: cell,
                            })
                          );
                        }

                        return React.DOM.td({
                          key: idx,
                          'data-row': rowidx,
                        }, content);
                      }, this)
                    )
                  );
                }, this)
              )
            )
          );
        }
      });
      
      var headers = [
        "ID", "品名", "単価", "数量", "合計"
      ];
      
      var data = [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]
      ];
      
      ReactDOM.render(
        React.createElement(Excel, {
          headers: headers,
          initialData: data,
        }),
        document.getElementById("root")
      );