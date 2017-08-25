const dataInitialState = [...Array(5).keys()].map(i => [ i + 1, "未入力", 1, 2, 0, ""]);
const editInitialState = [];

const dataReducer = (state = dataInitialState, action) => {
    switch (action.type) {
      case 'ADD_ROW':
        return [...state, [state.length + 1, "未入力", 1, 2, 0, ""]]

      case 'DELETE':
        return state.filter(d => {
          return d[0] !== 1;
        })

      case 'SAVE':
        const test = state.slice();
        test[action.row][action.cell] = action.input;
        return test;

      default:
          return state;
  }
};

const editReducer = (state = editInitialState, action) => {
    switch (action.type) {
      case 'SHOW_EDITOR':
        return {
          row: action.row,
          cell: action.cell
        };

      default:
        return state;
    }
  };

  const descendingReducer = (state = false, action) => {
    switch (action.type) {
      case 'SORT':

      default:
        return state;
    }
  }

  const sortByReducer = (state = null, action) => {
    switch (action.type) {
      case 'SORT_BY':
        


      default:
        return state;
    }
  }

//     //完了
// describe("dataReducer", () => {
//   it("ADD_ROW", () => {
//     const result = dataReducer(dataInitialState, {type: "ADD_ROW"});
//     const expected = [...Array(6).keys()].map(i => [ i + 1, "未入力", 1, 2, 0, ""]);

//     expect(result).toEqual(expected);
//   });

//     // 完了
//   it("DELETE", () => {
//     const result = dataReducer(dataInitialState, { type: "DELETE" });
//     const expected = [...Array(4).keys()].map(i => [ i + 2, "未入力", 1, 2, 0, ""]);

//     expect(result).toEqual(expected);
//   });

// });
//     //完了
// describe("editReducer", () => {
//   it("SHOW_EDITOR", () => {
//     const result = editReducer(editInitialState, {type: "SHOW_EDITOR", row: 1, cell: 2});
//     const expected = {row: 1, cell: 2};

//     expect(result).toEqual(expected);
//   });
// });
      //完了
// describe("dataReducer",  () => {
//   it("SAVE", () => {
//     const result = dataReducer(dataInitialState, {type: "SAVE", input: 32, row: 2, cell: 1});
//     const expected = [
//       [ 1, '未入力', 1, 2, 0, '' ],
//       [ 2, '未入力', 1, 2, 0, '' ],
//       [ 3, 32, 1, 2, 0, '' ],
//       [ 4, '未入力', 1, 2, 0, '' ],
//       [ 5, '未入力', 1, 2, 0, '' ] ];

//     expect(result).toEqual(expected);
//   });
// });
      //完了
// describe("editReducer", () => {
//   it("SHOW_EDITOR", () => {
//     const result = editReducer(editInitialState, {type: "SHOW_EDITOR", row: null, cell: null});
//     const expected = {row: null, cell: null};

//     expect(result).toEqual(expected);
//   });
// });