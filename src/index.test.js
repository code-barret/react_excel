const dataInitialState = [...Array(5).keys()].map(i => [ i + 1, "未入力", 1, 2, 0, ""]);
const editInitialState = [];
const saveData = [ [ 1, '未入力', 1, 2, 0, '' ],
                   [ 2, '未入力', 1, 2, 0, '' ],
                   [ 3, 32, 1, 2, 0, '' ],
                   [ 4, '未入力', 1, 2, 0, '' ],
                   [ 5, '未入力', 1, 2, 0, '' ] ];

const addRowAnser = [...Array(6).keys()].map(i => [ i + 1, "未入力", 1, 2, 0, ""]);
const deleteAnser = [...Array(4).keys()].map(i => [ i + 2, "未入力", 1, 2, 0, ""]);
const showEditAnser = [{row: 1, cell: 2}];

const dataReducer = (state = dataInitialState, action) => {
    switch (action.type) {
      case 'ADD_ROW':
        return [...state, [state.length + 1, "未入力", 1, 2, 0, ""]]

      case 'DELETE':
        return state.filter(d => {
          return d[0] !== 1;
        })

      case 'SAVE':
        // state[2][1] = 32;
        // return state;

        return state.map(i => i);

      default:
          return state
  }
};

const editReducer = (state = editInitialState, action) => {
    switch (action.type) {
      case 'SHOW_EDITOR':
        return [{row: action.row, cell: action.cell}];

      case 'SAVE':
        return [{row: action.row, cell: action.cell}];

      default:
        return state
    }
  };

//     //完了
// describe("dataReducer", () => {
//   it("ADD_ROW", () => {
//     const result = dataReducer(dataInitialState, {type: "ADD_ROW"});
//     const expected = addRowAnser;

//     expect(result).toEqual(expected);
//   });

//     // 完了
//   it("DELETE", () => {
//     const result = dataReducer(dataInitialState, { type: "DELETE" });
//     const expected = deleteAnser;

//     expect(result).toEqual(expected);
//   });

// });
//     //完了
// describe("editReducer", () => {
//   it("SHOW_EDITOR", () => {
//     const result = editReducer(editInitialState, {type: "SHOW_EDITOR", row: 1, cell: 2});
//     const expected = showEditAnser ;

//     expect(result).toEqual(expected);
//   });
// });

describe("dataReducer",  () => {
  it("SAVE", () => {
    const result = dataReducer(dataInitialState, {type: "SAVE", input: 32, row: 1, cell: 2});
    const expected = saveData;

    expect(result).toEqual(expected);
  });
});

describe("editReducer", () => {
  it("SAVE", () => {
    const result = editReducer(editInitialState, {type: "SAVE", row: null, cell: null});
    const expected = [{row: null, cell: null}];

    expect(result).toEqual(expected);
  });
});