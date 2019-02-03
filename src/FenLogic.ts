import HelperFunctions from './HelperFunctions';
import ExtraFenData from './Interfaces/FenExtras';
import BoardLocation from './Interfaces/BoardLocation';
import StandardTurns from './Interfaces/Enums/StandardTurns';

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
                const turnString = (extraFenData.turn === StandardTurns.white) ? 'w' : 'b'
                const enPassant = (extraFenData.enPassant == null) ? '-' : extraFenData.enPassant
                fenRow += ` ${turnString} ${extraFenData.castling} ${enPassant} ${extraFenData.halfMoves} ${extraFenData.fullMoves}` 
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
        if (fen == null) 
            return null
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
        if (fen == null) 
            return null
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