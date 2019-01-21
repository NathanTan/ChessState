import HelperFunctions from './HelperFunctions';
import ExtraFenData from './Interfaces/FenExtras';
import BoardLocation from './Interfaces/BoardLocation';


// let state = {
//     "debug": false,
//     "gameType": "standard"
// }

// /* Gets the current players turn from a fen */
// const getTurn = (fen) => {
//     let stateDataArray = fen.split(" ")
//     return stateDataArray[1]
// }

// /* Returns a new fen based on the pgn */
// const executeTurn = (state, fen, pgn) => {
//     let newFen
//     if (pgn) {
//         if (state.debug)
//             console.log("PGN provided: " + pgn)

//         // Determine the pgn move
//         switch (pgn) {

//             case "O-O": // King side castle
//                 //TODO: add validation

//                 break

//             case "O-O-O": //Queen side castle
//                 break

//             default: // Normal move           

//                 switch (pgn[0]) {
//                     case "N": // Knight move


//                         break

//                     case "B": // Bishop move
//                         break
//                     case "R": // Rook move
//                         break
//                     case "Q": // Queen move
//                         break
//                     case "K": // King move
//                         break
//                     default: // Pawn move
//                         newFen = movePawn(state, fen, pgn)
//                     // TODO: deal with fen's en passant
//                 }
//         }
//         newFen = updateTurn(fen, null, null)

//     }

//     else {
//         Error("Error: no pgn provided")
//     }
// }

// /* Returns a new fen where the turn has been toggled */
// /* Parameters: 
//  *    fen - Fen string to be updated
//  *    enPassant - if enPassant is availible (The last move was a 2 space pawn move), then the location that the capturning pawn is this varianle, otherwise it's null
//  *    halfmove - either increments or resets the number of halfmoves since the capture of a piece, or the movemenet of a pawn
//  */
// const updateTurn = (fen, enPassant, halfmove) => {
//     /* Deconstruct fen */
//     let stateDataArray = fen.split(" ")
//     if (stateDataArray[1] === "w") {

//         stateDataArray[1] = "b"
//     }

//     else if (stateDataArray[1] === "b") {

//         stateDataArray[1] = "w"
//         stateDataArray[5] = +stateDataArray[5] + 1 // Increment the move count
//     }

//     /* Deal with halfmove */
//     if (halfmove) {
//         // Not a pawn move and no capture
//         stateDataArray[4] = +stateDataArray[4] + 1 // Increment the move count

//     }

//     else {
//         // Pawn was moved or piece was captured
//         stateDataArray[5] = 0 // Reset halfmove count        
//     }

//     /* Deal with en passant */
//     // TODO

//     /* Reconstruct fen */
//     return stateDataArray.join(" ")
// }

// const movePawn = (state, fen, pgn) => {
//     let boardArray = fen.split(" ").split("/")
//     switch (state.gameType) {
//         case "standard":
//             /* Check for a double space move */
//             if (pgn.includes("4") && getTurn(fen) === "w") {
//                 // if (boardArray[5])
//             }

//             if (pgn.includes("3") && getTurn(fen) === "b") {

//             }
//             break
//         default:
//             console.log("Error")
//     }

// }


// const getValidMoves = (piece, loc_raw, fen) => {
//     loc = processLoc(loc_raw);
// }

// const processLoc = (loc) => {
//     column = loc[0]
//     row = loc[1]
//     let newloc = ""

//     // Convert the column letter to a number. i.e. a = 0, b = 1, g = 7 
//     newloc.append(loc[0].charCodeAt(0) - 97)
//     newloc.append(loc[1] - 1) // TODO: make sure this returns an int.

//     return newloc
// }

// /* Helper function */
// const isNumeric = (n) => {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }

// /* Prints a ascii board based on a standard fen string */
// const printBoard = (fen) => {
//     let positionString = fen.split("/")
//     let lastRow = positionString.pop()
//     positionString.push(lastRow.split(" ")[0])
//     console.log("-----------------") // Print first line
//     fen.forEach(function (positionString) {
//         process.stdout.write("|") // Print without new line

//         positionString.split("").forEach(function (piece) {
//             // If a number is found, print that many spaces
//             if (isNumeric(piece))
//                 for (let i = 0; i < +piece; i++)
//                     process.stdout.write(" |") // Print without new line
//             // Else print the piece letter
//             else
//                 process.stdout.write(piece + "|") // Print without new line
//         })
//         console.log("\n-----------------") // Print last line
//     })
// }

// // let fen = "rnbqkbnr/pppppppp/8/8/3p4/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
// // let row = fen.split("/")
// // let lastRow = row.pop()
// // row.push(lastRow.split(" ")[0])

// let currentFen = constants.startingFen
// console.log(constants)
// printBoard(currentFen)


// //console.log(getTurn(currentFen))
// console.log(currentFen)
// //executeTurn(state, null, "f7")
// currentFen = updateTurn(currentFen, null, null)
// console.log(currentFen)
// currentFen = updateTurn(currentFen, null, null)
// console.log(currentFen)


// Turns a fen string into a 2d array representation of a board
class FenLogic {
    static FenToBoard(fen: string): string[][] {
        if (fen != null) {
            // TODO: Add fen validation
            let board = Array<Array<string>>()
            fen.split("/").forEach((row) => {
                let rowArr = Array<string>()
                let j = 0;

                row.split("").forEach((piece) => {
                    if (j < 8) {
                        if (HelperFunctions.isNumeric(piece)) {
                            for (let i = 0; i < Number(piece); i++) {
                                rowArr.push("X")
                            }
                        }
                        else {
                            rowArr.push(piece)
                        }
                    }
                    j++
                })
                board.push(rowArr)
            })
            return board
        }
        throw new Error("No Fen Provided")
    }

    /*
     * Params:
     *      - Board as a 2d array
     *      - Extra fen information as an object
     * Returns: A fen string representing the game
     */
    static BoardToFen(board: Array<Array<string>>, extraFenData: ExtraFenData, debug?: boolean): string {
        let fen = ""
        let rowNum = 0
        board.forEach(row => {
            let fenRow = ""
            let count = 0
            let rowTail = ""
            row.forEach(piece => {
                if (piece !== 'X' && count > 0) {
                    fenRow += count.toString()
                    fenRow += piece
                    count = 0
                }

                else if (piece === 'X') {
                    count++
                }

                else {
                    fenRow += piece
                }
            })

            if (count > 0) {
                fenRow += count.toString()
            }

            if (rowNum === 7) {
                fenRow += `${extraFenData.turn} ${extraFenData.castling} ${extraFenData.enPassant} ${extraFenData.halfMoves} ${extraFenData.fullMoves} ` 
            }

            else {
                rowTail = "/"
            }
            count++
            rowNum++
            fenRow += rowTail
            fen += fenRow
        })

        if (debug)
            console.log("Built Fen: " + fen)
        return fen
    }

    /*
     * Params:
     *      - FEN string representing a game
     * Returns: The location of the white king as a BoardLocation object.
     */
    static GetWhiteKingLocation(fen: string) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (fen.split("/")[i][j] === "K") {
                    return { row: i, column: j } as BoardLocation
                }
            }
        }
    }

    /*
     * Params:
     *      - FEN string representing a game
     * Returns: The location of the black king as a BoardLocation object.
     */
    static GetBlackKingLocation(fen: string) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (fen.split("/")[i][j] === "k") {
                    return { row: i, column: j } as BoardLocation
                }
            }
        }
    }
}

export default FenLogic