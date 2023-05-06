export const testArr = [
  ['+', '-', '-', '+', '-', '-', '+', '-', '-', '+', '-', '-', '+'],
  ['|', 'p', ' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', '|'],
  ['+', ' ', ' ', '+', ' ', ' ', '+', ' ', ' ', '+', ' ', ' ', '+'],
  ['|', ' ', ' ', '|', ' ', ' ', '|', ' ', ' ', '|', ' ', ' ', '|'],
  ['+', ' ', ' ', '+', '-', '-', '+', '-', '-', '+', ' ', ' ', '+'],
  ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
  ['+', ' ', ' ', '+', '-', '-', '+', '-', '-', '+', '-', '-', '+'],
  ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'g', '|'],
  ['+', '-', '-', '+', '-', '-', '+', '-', '-', '+', '-', '-', '+'],
]

export const rawArrToMappable = (arr) => {
  const mappedArr = []
  arr.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col === ' ') {
        mappedArr.push({
          type: 'space',
          x: colIdx,
          z: rowIdx,
        })
      } else if (col === 'p') {
        mappedArr.push({
          type: 'player',
          x: colIdx,
          z: rowIdx,
        })
      } else if (col === 'g') {
        mappedArr.push({
          type: 'goal',
          x: colIdx,
          z: rowIdx,
        })
      }
    })
  })
  return mappedArr
}
