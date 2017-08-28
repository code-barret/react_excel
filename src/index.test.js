const dataInitialState = [...Array(5).keys()].map(i => [ i + 1, "未入力", 1, 2, 0, ""]);
const sortDataInitial = [
  [ 2, '未入力', 10, 21, 0, '' ],
  [ 1, '未入力', 30, 23, 0, '' ],
  [ 3, '未入力', 20, 22, 0, '' ],
  [ 4, '未入力', 40, 24, 0, '' ],
  [ 5, '未入力', 50, 25, 0, '' ] ];

const dataReducer = (state = [...Array(5).keys()].map(i => [ i + 1, "未入力", 1, 2, 0, ""]), action) => {
    switch (action.type) {
      case 'ADD_ROW':
        return [...state, [state.length + 1, "未入力", 1, 2, 0, ""]]

      case 'DELETE':
        return state.filter(d => {
          return d[0] !== action.eventTargetId;
        })

      case 'SAVE':
        const test = state.slice();
        test[action.row][action.cell] = action.input;
        return test;

      case 'SORT_DATA':
        const clonedState = state.slice();
        const descending = action.sortby === action.column && !action.descending;

        return clonedState.sort((a, b) => {
          return descending
            ? (a[action.column] < b[action.column] ? 1 : -1)
            : (a[action.column] > b[action.column] ? 1 : -1);
        });

        default:
          return state;
  }
};

const editReducer = (state = [], action) => {
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
      case 'SORT_DESCENDING':
        return action.descending;

      default:
        return state;
    }
  }

  const sortByReducer = (state = null, action) => {
    switch (action.type) {
      case 'SORT_SORTBY':
        return action.sortBy;


      default:
        return state;
    }
  }

    //完了
describe("dataReducer", () => {
  it("ADD_ROW", () => {
    const result = dataReducer(dataInitialState, {type: "ADD_ROW"});
    const expected = [...Array(6).keys()].map(i => [ i + 1, "未入力", 1, 2, 0, ""]);

    expect(result).toEqual(expected);
  });
});

    // 完了
  it("DELETE", () => {
    const result = dataReducer(dataInitialState, { type: "DELETE", eventTargetId: 1});
    const expected = [...Array(4).keys()].map(i => [ i + 2, "未入力", 1, 2, 0, ""]);

    expect(result).toEqual(expected);
  });

    //完了
describe("editReducer", () => {
  it("SHOW_EDITOR", () => {
    const result = editReducer([], {type: "SHOW_EDITOR", row: 1, cell: 2});
    const expected = {row: 1, cell: 2};

    expect(result).toEqual(expected);
  });
});
      完了
describe("dataReducer",  () => {
  it("SAVE", () => {
    const result = dataReducer(dataInitialState, {type: "SAVE", input: 32, row: 2, cell: 1});
    const expected = [
      [ 1, '未入力', 1, 2, 0, '' ],
      [ 2, '未入力', 1, 2, 0, '' ],
      [ 3, 32, 1, 2, 0, '' ],
      [ 4, '未入力', 1, 2, 0, '' ],
      [ 5, '未入力', 1, 2, 0, '' ] ];

    expect(result).toEqual(expected);
  });
});
//       完了
// describe("editReducer", () => {
//   it("SHOW_EDITOR", () => {
//     const result = editReducer([], {type: "SHOW_EDITOR", row: null, cell: null});
//     const expected = {row: null, cell: null};

//     expect(result).toEqual(expected);
//   });
// });

 describe("dataReducer", () => {
   it("SORT_DATA", () => {
     const result = dataReducer(sortDataInitial, {type: "SORT_DATA", sortby: 0, column: 0, descending: false});
     const expected = //[
      // [ 1, '未入力', 30, 23, 0, '' ],
      // [ 2, '未入力', 10, 21, 0, '' ],
      // [ 3, '未入力', 20, 22, 0, '' ],
      // [ 4, '未入力', 40, 24, 0, '' ],
      // [ 5, '未入力', 50, 25, 0, '' ] ];

      [
        [ 5, '未入力', 50, 25, 0, '' ],
        [ 4, '未入力', 40, 24, 0, '' ],
        [ 3, '未入力', 20, 22, 0, '' ],
        [ 2, '未入力', 10, 21, 0, '' ],
        [ 1, '未入力', 30, 23, 0, '' ] ];

     expect(result).toEqual(expected);
   });
 });

describe("descendingReducer", () => {
  it("SORT_DESCENDING", () => {
    const result = descendingReducer(false, {type: "SORT_DESCENDING", descending: false});
    const expected = false;

    expect(result).toEqual(expected);
  });
});

describe("sortByReducer", () => {
  it("SORT_SORTBY", () => {
    const result = sortByReducer(null, {type: "SORT_SORTBY", sortBy: 0});
    const expected = 0;

    expect(result).toEqual(expected);
  });
});