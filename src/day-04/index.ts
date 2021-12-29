import { json } from "stream/consumers"
import formatInputs, { TGrid, TPlayValues, TRow } from "./formatInputs"

const [PLAY_NUMBERS, GRIDS] = formatInputs("inputs.txt")

/**
 * Part 1
 * - Play 5 PLAY_NUMBERS by 5
 * - marked
 * - check if row or column of each grid is marked
 * - multiply sum of all unmarked numbers by last number called
 */

// -------------------------------------------------------------------------- LOCAL

// /**
//  * Parse each values and check if is matching with one playValue.
//  * If match, return "value*" marked with '*' at the end
//  * @param grid
//  * @param playValues
//  */
// export type TMarkValues = { grid: TGrid; lastCalledValue: number }
// export const markValuesOfOneGrid = (
//   grid: TGrid,
//   playValues: TPlayValues
// ): TMarkValues => {
//   let justCalledValue = null

//   const newGrid = grid.reduce<TGrid>((accGrid: TGrid, currRow: TRow): TGrid => {
//     // marked each value of of current row
//     const markedRow = currRow.reduce<TRow>((accValue: TRow, currValue: string): TRow => {
//       // check if current value is played
//       const valueIsPlayed = playValues.some((el) => el === currValue)

//       if (valueIsPlayed) {
//         const rowWin = gridHasWinnerRow(accGrid)
//         const columnWin = gridHasWinnerRow(convertColumnsToRows(accGrid))
//         console.log("rowWin", rowWin, currValue)
//         console.log("columnWin", columnWin, currValue)
//         if (rowWin || columnWin) justCalledValue = currValue
//       }

//       // prepare markvalue
//       const markValue = (value: string) => (value.endsWith("**") ? value : `${value}**`)
//       return [...accValue, valueIsPlayed ? markValue(currValue) : currValue]
//     }, [])

//     return [...accGrid, markedRow]
//   }, [])

//   return { grid: newGrid, lastCalledValue: justCalledValue }
// }

/**
 * Return true if each value of a row is marked
 * @param grid
 */
export const gridHasWinnerRow = (grid: TGrid): boolean =>
  grid.some((row: TRow) => row.every((value: string) => value.endsWith("**")))

/**
 * Get columns from a grid
 * @param grid
 */
export const convertColumnsToRows = (grid: TGrid): TGrid => {
  const valuesArray = []
  for (let row of grid) {
    row.forEach((value, i) => {
      valuesArray[i] = [...(valuesArray[i] || []), value]
    })
  }
  return valuesArray
}

// prepare markvalue
const markValue = (value: string) => (value.endsWith("**") ? value : `${value}**`)

// -------------------------------------------------------------------------- FINAL
/**
 * Parse one grid
 * - Add mark on each matching playValues of the grid
 * - Parse rows and columns to check if is complete
 * - return response
 *
 * @param grid grid to mark & check
 * @param playValues 5 numbers played on one tour
 * @return {boolean} return true if one column or one row of the grid is complete
 * (all numbers of this column or this row is marked)
 */
export const parseOneGrid = (grid: TGrid, playValues: TPlayValues): boolean => {
  let lastCalledPlayValue: string = null
  let newGrid: TGrid

  // for each play value
  for (const playValue of playValues) {

    const tempGrid = (newGrid || grid).reduce<TGrid>(
      (accGrid: TGrid, currRow: TRow): TGrid => {
       
        // map on row values
        const markedRow = currRow.reduce<TRow>(
          (accValue: TRow, currValue: string): TRow => {
            // check if current value is played
            const valueIsPlayed = playValue === currValue

            if (valueIsPlayed) {
              const rowWin = gridHasWinnerRow(accGrid)
              console.log("rowWin", {rowWin, currValue, accGrid})

              const columnWin = gridHasWinnerRow(convertColumnsToRows(accGrid))
              console.log("columnWin", columnWin, currValue)

              if (rowWin || columnWin) {
                console.log("row or column win", { currValue, playValue })
                lastCalledPlayValue = currValue
              }
            }

            return [...accValue, valueIsPlayed ? markValue(currValue) : currValue]
          },
           []
        )
        //console.log("markedRow",markedRow)
        return [...(accGrid), markedRow]
      },
      []
    )
    console.log("tempGrid", tempGrid)
    if (lastCalledPlayValue == null) {
      newGrid = tempGrid
    }
  }

  console.log("lastCalledPlayValue", lastCalledPlayValue)
  console.log("newGrid", newGrid)

  //   const markedGrid = grid.reduce<TGrid>((accGrid: TGrid, currRow: TRow): TGrid => {
  //     // marked each value of of current row
  //     const markedRow = currRow.reduce<TRow>((accValue: TRow, currValue: string): TRow => {
  //       // check if current value is played
  //       const valueIsPlayed = playValues.some((el) => el === currValue)

  //       // prepare markvalue
  //       const markValue = (value: string) => (value.endsWith("**") ? value : `${value}**`)
  //       const newGrid = [...accValue, valueIsPlayed ? markValue(currValue) : currValue]

  //       // if value is played and row or column win, register the winner value
  //       if (valueIsPlayed) {
  //         const rowWin = gridHasWinnerRow(accGrid)
  //         console.log("rowWin", rowWin, currValue)

  //         const columnWin = gridHasWinnerRow(convertColumnsToRows(accGrid))
  //         console.log("columnWin", columnWin, currValue)

  //         if (rowWin || columnWin) {
  //           console.log("row or column win")
  //           lastCalledPlayValue = currValue
  //           return newGrid
  //         }
  //       }

  //       return newGrid
  //     }, [])

  //     return [...accGrid, markedRow]
  //   }, [])

  // parse Row and Columns
  //   const rowWin = gridHasWinnerRow(markedGrid)
  //   const columnWin = gridHasWinnerRow(convertColumnsToRows(markedGrid))
  //   console.log("rowWin", rowWin)
  //   console.log("columnWin", columnWin)

  return
}

/**
 *
 * @returns
 */
export const parseAllGrids = (): boolean => {
  return
}
