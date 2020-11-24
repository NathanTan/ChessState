import BoardPrinter from './BoardPrinter'
import constants from './constants'
import Errors from './Errors'
import HelperFunctions from './HelperFunctions'
import ExecuteTurn from './MoveProcessor'
import FenLogic from './FenLogic'
import State from './Interfaces/State'
import GameType from './Interfaces/Enums/GameTypes'
import StandardTurns from './Interfaces/Enums/StandardTurns'
import MoveResult from './Interfaces/MoveResult'
import BoardLocation from './Interfaces/BoardLocation'
import Config from './Interfaces/Config'
import PieceTypes from './Interfaces/Enums/PieceTypes'
import Directions from './Interfaces/Enums/Directions'
import GameStatus from './Interfaces/GameStatus'
import FenExtras from './Interfaces/FenExtras';
import PlayerStatus from './Interfaces/PlayerStatus';
import BoardAnalyser from './BoardAnalyser';
import MoveProcessor from './MoveProcessor'

class ChessState {
    /* Properties */
    public debug: boolean
    private gameType: GameType
    public	state: State[]              // TODO: Make private and have a function that returns deep copies of the states
    //private state2?: State           // For bughouse
    public hideOutput: boolean
    private config: Config


    /*
    * Params:
    *      - [OPTIONAL] game variant type
    *      - [OPTIONAL] starting fen position
    *      - [OPTIONAL] flag for debugging printing
    *      - [TESTING] game for testing (as array of pgns)
    * Returns: A new 2d array with 1 piece in a different place
    */
    constructor(config?: Config) {
        // TODO: validate config object

        if (config == null) {
            this.config = constants.defaultConfig
        }
        else {
            this.config = config
        }
        
        this.debug = this.config.debug
        this.gameType = this.config.gameType
        this.hideOutput = this.config.hideOutput
        if (this.gameType === GameType.standard) {
            this.state = [null]
        }
        else if (this.gameType === GameType.bughouse) {
            this.state = [{} as State, {} as State]
            this.state[0].extraPiecesWhite = []
            this.state[0].extraPiecesBlack = []
            this.state[1].extraPiecesWhite = []
            this.state[1].extraPiecesBlack = []
        }
        
        let fenExtras
        let fenExtras2

        if (this.config.fen == null) {
            // No provided fen string means a default start.
            this.config.fen = constants.startingFen
        }
        if (this.gameType === GameType.bughouse && this.config.fen2 == null) {
            this.config.fen2 = constants.startingFen
        }
        fenExtras = this.createFenExtras(this.config.fen, false, this.gameType)
        fenExtras2 = this.createFenExtras(this.config.fen2, false, this.gameType)

        // Initalize state.
        switch (this.gameType) {
            case GameType.bughouse: 
                this.state[1] = {
                    board: FenLogic.FenToBoard(this.config.fen2),
                    history: {
                        fen: [this.config.fen], 
                        pgn: []
                    },
                    gameOver: false,    // TODO: check initalizing with a game over fen
                    turn: 0,
                    fenExtras: fenExtras2,
                    whiteKingLocation: (this.config.fen === constants["startingFen"]) ? 
                                        { row: 7, column: 4} as BoardLocation : FenLogic.GetWhiteKingLocation(this.config.fen),
                    blackKingLocation: (this.config.fen === constants["startingFen"]) ? 
                                        { row: 0, column: 4} as BoardLocation : FenLogic.GetBlackKingLocation(this.config.fen),
                    winner: null,
                    extraPiecesWhite: [],
                    extraPiecesBlack: []
                }
            case GameType.standard:
                this.state[0] = {
                    board: FenLogic.FenToBoard(this.config.fen),
                    history: {
                        fen: [this.config.fen],
                        pgn: []
                    },
                    gameOver: false,    // TODO: check initalizing with a game over fen
                    turn: 0,
                    fenExtras: fenExtras,
                    whiteKingLocation: (this.config.fen === constants["startingFen"]) ? 
                                        { row: 7, column: 4} as BoardLocation : FenLogic.GetWhiteKingLocation(this.config.fen),
                    blackKingLocation: (this.config.fen === constants["startingFen"]) ? 
                                        { row: 0, column: 4} as BoardLocation : FenLogic.GetBlackKingLocation(this.config.fen),
                    winner: null,
                    extraPiecesWhite: [],
                    extraPiecesBlack: []
                }
                break
                default:
                    throw new Error(`Gametype ${this.gameType.toString()} is not yet implemented.`)
            }

        

        Errors.checkGameType(this)
        if (this.debug && !this.hideOutput) {
            console.log("Game type: ")
            console.log(this.gameType.toString())
            console.log("Standard game type")
            console.log(GameType.standard)
            console.log("fenExtras: " + JSON.stringify(this.state[0].fenExtras))
            console.log("GameState initalized\n")
        }
        // if (!this.hideOutput) {
        //     if (this.gameType === GameType.standard)
        //         BoardPrinter.printBoard(this.state[0].board, StandardTurns.white, this.hideOutput)
        //     else if (this.gameType === GameType.bughouse) {
        //         console.log("   -- Board 0 --")
        //         BoardPrinter.printBoard(this.state[0].board, StandardTurns.white, this.hideOutput)
        //         console.log("   -- Board 1 --")
        //         BoardPrinter.printBoard(this.state[1].board, StandardTurns.black, this.hideOutput)
        //     }
        // }
    }

    getGameType(): GameType {
        return this.gameType
    }

    // Board number is 0 for the first board and 1 for the second board
    move(move:string, board?: number): MoveResult {
        if (this.gameType === GameType.bughouse && board == null) {
            throw new Error(`Game variant "Bughouse" needs to know which board to execute the move on, board '0' or board '1'`)
        }

        // Bughouse game variant case
        else if (this.gameType === GameType.bughouse && board != null) {
            return this.executeMove(move, board)
        }

        // Standard game variant case
        else {
            return this.executeMove(move)
        }
    }

    // In this function the board will be null when it should and will be 0 or 1 when it should
    private executeMove(move: string, board?: number): MoveResult {
        // If null use zero, else use the specified board
        const localBoard = (board == null) ? 0 : board
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)

        // Check for resignation
        if (move === `resign`) {
            this.resign()
            return {
                whiteKingSideCastle:    false,
                whiteQueenSideCastle:   false,
                blackKingSideCastle:    false,
                blackQueenSideCastle:   false,
                kingLocation:           null,
                movedPiece:             null,	    // If null then the move was a castle.
                movedPieceDest:         null,
                check:                  false,         // An indication if check happened.
                gameIsOver:             true,
                moveIsInvalid:          false,
                invalidMove:            null,
                enableEnPassant:        null,
                wasPieceDrop:           null
            }
        }


        // Check for game over BEFORE move validation.
    	if (this.state[localBoard].gameOver === true) {
            return {
                whiteKingSideCastle:    false,
                whiteQueenSideCastle:   false,
                blackKingSideCastle:    false,
                blackQueenSideCastle:   false,
                kingLocation:           null,
                movedPiece:             null,	    // If null then the move was a castle.
                movedPieceDest:         null,
                check:                  false,         // An indication if check happened.
                gameIsOver:             true,
                moveIsInvalid:          false,
                invalidMove:            null,
                enableEnPassant:        null,
                wasPieceDrop:           null
            }
        }
        
        // Validate move
        let moveIsValid = true // TODO: validation

        // Return to indicate invalid move.
        // @ts-ignore
        if (moveIsValid === false) {
            return {
                whiteKingSideCastle:    false,
                whiteQueenSideCastle:   false,
                blackKingSideCastle:    false,
                blackQueenSideCastle:   false,
                kingLocation:           null,
                movedPiece:             null,	    // If null then the move was a castle.
                movedPieceDest:         null,
                check:                  false,         // An indication if check happened.
                gameIsOver:             false,
                moveIsInvalid:          true,
                invalidMove:            move,
                enableEnPassant:        this.state[localBoard].fenExtras.enPassant,
                wasPieceDrop:           null
            }
        }

        switch (this.gameType) {
            case GameType.standard:
                if (this.debug && !this.hideOutput)
                    console.log("/////////////////////// Turn " + this.state[localBoard].turn + " ///////////////////////")
                break
            case GameType.bughouse:
                if (this.debug && !this.hideOutput)
                    console.log(`/****************************************/\n` + 
                                `/           Board: ${board}    Turn: ${this.state[localBoard].turn}          /\n`
                               +`/****************************************/`)
                break
            default:
                throw new Error(`Game type not recognized`)
        }

        // 1. Print info.
        switch (this.gameType) {
            case GameType.standard:
                if (this.debug && !this.hideOutput) {
                    console.log("   " + this.getTurn() + "'s turn")
                }
                break        
                case GameType.bughouse:
                if (this.debug && !this.hideOutput) 
                    console.log("   " + this.getTurn(localBoard) + "'s turn") // TODO
                break
            default:
                throw new Error("Game type not recognized")
        }


        // Execute move (pgn)
        let result = MoveProcessor.ExecuteTurn(this.state[localBoard], move, this.getTurn(localBoard), this.gameType, this.hideOutput, this.debug)

        // Update History
        this.state[localBoard].history.pgn.push(move)
        this.state[localBoard].history.fen.push(FenLogic.BoardToFen(this.state[localBoard].board, this.state[localBoard].fenExtras))
        
        this.state[localBoard].turn++

        // Update king location.
        // TODO: Make sure king location is set when using a non-starting fen.
        if (this.getTurn(localBoard) === StandardTurns.white && result.kingLocation !== null) {
            this.state[localBoard].whiteKingLocation = result.kingLocation
        }
        else if (result.kingLocation !== null) {
            this.state[localBoard].blackKingLocation = result.kingLocation
        }

        // Update extra pieces.
        if (this.gameType === GameType.bughouse) {
            let boardToAddPieceTo = (localBoard === 0) ? 1 : 0

            // If there was a capture, pass the piece off to the player's partner.
            if (result.wasCapture != null) {
                if (this.debug && !this.hideOutput) {
                    console.log(`                                             Placing piece '${result.wasCapture}' in players hand`)
                }
                if (this.getTurn(localBoard) === StandardTurns.white)
                    this.state[boardToAddPieceTo].extraPiecesBlack.push(result.wasCapture)
                else 
                    this.state[boardToAddPieceTo].extraPiecesWhite.push(result.wasCapture)
            }

            // If there was a piece drop, remove that piece from the player's list of extra pieces.
            else if (result.wasPieceDrop) {
                if (this.debug && !this.hideOutput) {
                    console.log(`                                             Dropping piece '${result.wasPieceDrop}' from players hand`)
                }
                if (this.getTurn(localBoard) === StandardTurns.white) {
                    // Remove the element.
                    let index = this.state[localBoard].extraPiecesWhite.indexOf(result.wasPieceDrop)
                    if (index > -1) {
                        this.state[localBoard].extraPiecesWhite.splice(index, 1);
                    }
                }
                else {
                    // Remove the element.
                    let index = this.state[localBoard].extraPiecesBlack.indexOf(result.wasPieceDrop)
                    if (index > -1) {
                        this.state[localBoard].extraPiecesBlack.splice(index, 1);
                    }
                }
            }
        }

        switch (this.gameType) {
            case GameType.standard:
            // Print board if debugging.
            if (this.debug === true && !this.hideOutput)
                BoardPrinter.printBoardDebug(this, this.hideOutput)
            else if (this.debug === false && !this.hideOutput)
                BoardPrinter.printBoard(this.state[localBoard].board, StandardTurns.white, this.hideOutput)
                break
            case GameType.bughouse:
                this.printBoard(-1, this.debug)
                break
            default:
                throw new Error(`Gametype ${this.gameType} not defined`)
        }
        // Update FEN extras
        this.updateFenExtras(result, localBoard)

        if (result == null) {
            if (!this.hideOutput) {
                console.log("!~!~!~!~!~! No More Moves !~!~!~!~!~!~!")
                console.log("              Game Over")
            }
            this.state[localBoard].gameOver = true
        }

        if (this.checkForEndOfGame(result, localBoard)) {
            if (!this.hideOutput)
                console.log("GAME OVER")
            this.state[localBoard].gameOver = true // For testing purposes
        }

        return result
    }

    private createFenExtras(fen: string, isSecondBoard: boolean, gameType: GameType) {
        if (isSecondBoard && gameType !== GameType.bughouse) {
            throw new Error("Error creating FEN extras.")
        }
        let fenExtras: FenExtras;
        // Check for provided fen.
        if (fen == null) {
            // No provided fen string means a default start.
            //this.config.fen = constants.startingFen;
            fenExtras = {
                turn: StandardTurns.white,
                castling: "KQkq",
                enPassant: null,
                halfMoves: 0,
                fullMoves: 1
            }
        }

        else {
            // Generate fen.
            if (fen === constants.startingFen) {
                fenExtras = {
                    turn: StandardTurns.white,
                    castling: "KQkq",
                    enPassant: null,
                    halfMoves: 0,
                    fullMoves: 1
                }
            }
            else {
                //let enPassant = (isValidPgn(fen.split("/")[7].split(" ")[3])) ? StandardTurns.white : StandardTurns.black
                fenExtras = {
                    turn: (fen.split("/")[7].split(" ")[1] === "w") ? StandardTurns.white : StandardTurns.black,
                    castling: fen.split("/")[7].split(" ")[2],
                    enPassant: null,        // TODO: Implement
                    halfMoves: +fen.split("/")[7].split(" ")[4],    // TODO: test
                    fullMoves: +fen.split("/")[7].split(" ")[5]     // TODO: test
                }
            }
        }

        return fenExtras
    }


    // TODO: check if this can be removed.
    getBoardArray(board?: number) {
        // If null use zero, else use the specified board
        const localBoard = (board == null) ? 0 : board
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)

        return this.state[localBoard].board
    }

    getTurn(boardNumber?: number): StandardTurns {
        // If null use zero, else use the specified board
        const localBoard = (boardNumber == null) ? 0 : boardNumber
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)

        switch (this.gameType) {
            /* Standard */
            case GameType.standard:
            case GameType.bughouse:
                return this.state[localBoard].fenExtras.turn
            case GameType.plunder:
                throw new Error("Error, varient not yet implemented")
            default:
                throw new Error("Error, variant not recognized")
        }
    }

    getFen(board?: number, debug?: boolean, hideOutput?: boolean): string {
        // If null use zero, else use the specified board
        const localBoard = (board == null) ? 0 : board
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)
        if (debug && !hideOutput) {
            console.log("Board Info:")
            console.log(this.state[localBoard])
        }

        return FenLogic.BoardToFen(this.state[localBoard].board, this.state[localBoard].fenExtras, debug, hideOutput).trim()
    }

    printBoard(board?: number, debug?: boolean): void {
        // If null use zero, else use the specified board
        const localBoard = (board == null || board === -1) ? 0 : board
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)


        if (this.gameType === GameType.bughouse) {
            const hands = [
                this.state[0].extraPiecesWhite,
                this.state[0].extraPiecesBlack,
                this.state[1].extraPiecesWhite,
                this.state[1].extraPiecesBlack,
            ]

            BoardPrinter.printBoardBughouse(this.state[0].board, this.state[1].board, hands, StandardTurns.white, this.hideOutput)
            return
        }


        BoardPrinter.printBoard(this.state[localBoard].board, StandardTurns.white, debug)
    }

    /*
     * Update turn
     */
    updateFenExtras(moveResults: MoveResult, board?: number) {
        // If null use zero, else use the specified board
        const localBoard = (board == null) ? 0 : board
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)

        switch (this.gameType) {
            case GameType.bughouse:
            /* Standard */
            case GameType.standard:
                // Toggle turn
                if (this.state[localBoard].fenExtras.turn === StandardTurns.white) 
                    this.state[localBoard].fenExtras.turn = StandardTurns.black
                else 
                    this.state[localBoard].fenExtras.turn = StandardTurns.white

                // Update castling.
                if (moveResults.whiteKingSideCastle || moveResults.whiteQueenSideCastle) {
                    this.state[localBoard].fenExtras.castling = this.state[localBoard].fenExtras.castling.replace("K", "")
                    this.state[localBoard].fenExtras.castling = this.state[localBoard].fenExtras.castling.replace("Q", "")
                }

                else if (moveResults.blackKingSideCastle || moveResults.blackQueenSideCastle) {
                    this.state[localBoard].fenExtras.castling = this.state[localBoard].fenExtras.castling.replace("k", "")
                    this.state[localBoard].fenExtras.castling = this.state[localBoard].fenExtras.castling.replace("q", "")
                }
                
                // Update En Passant
                this.state[localBoard].fenExtras.enPassant = moveResults.enableEnPassant

                //this.checkForCastling()                 // Update available castling.
                this.state[localBoard].fenExtras.halfMoves++;             // Increment number of half moves.
                if (this.state[localBoard].fenExtras.halfMoves === 2) {   // Check to increment full moves.
                    this.state[localBoard].fenExtras.halfMoves = 0
                    this.state[localBoard].fenExtras.fullMoves++
                }
                break
            default:
                throw new Error("Variant Not Yet Implemented")
        }
    }

    checkForCastling() {
        if (!this.hideOutput)
            console.log("checkForCastling Not Yet Implemented")
    }

    checkForEnPassant() {
        if (!this.hideOutput)
            console.log("checkForEnPassant Not Yet Implemented")
    }

    checkForEndOfGame(moveResult: MoveResult, board: number) {
        switch (this.gameType) {
            case GameType.standard:
               const localBoard = (board == null) ? 0 : board
                if( BoardAnalyser.isCheckmate(this, moveResult, board)) {
                    if (this.getTurn(localBoard) === StandardTurns.black)
                        this.state[localBoard].winner = StandardTurns.white
                       else
                           this.state[localBoard].winner = StandardTurns.black
                    return true
                }
                return false
                //this.checkForStalemate() 
                // TODO: add resign functionality.
            case GameType.bughouse:
                //  // If null use zero, else use the specified board
                //  const localBoard = (board == null) ? 0 : board
                //  if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)
                 
                //  if (moveResult.check === true && this.checkForCheckmate(moveResult) === true) {
                //      if (this.getTurn(localBoard) === StandardTurns.black)
                //      this.state[localBoard].winner = StandardTurns.white
                //      else 
                //      this.state[localBoard].winner = StandardTurns.black
                //      return true
                //  }
                 
                //  //this.checkForStalemate() 
                //  // TODO: add resign functionality.
                //  return false
            // default:
            //      Errors.gameTypeNotYetImplemented(this)
        }
    }

    // NOTE: method is designed for standard sized board
    checkForCheckmate(moveResult: MoveResult, board?: number): boolean {
        // If null use zero, else use the specified board
        const localBoard = (board == null) ? 0 : board
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)

        // Find the location of the king.
        let kingLocation = (this.getTurn(localBoard) === StandardTurns.white) ? this.state[localBoard].whiteKingLocation : this.state[localBoard].blackKingLocation

        // TODO: add method for searching for king if non-starting fen is provided.
        let kingPiece = (this.getTurn(localBoard) === StandardTurns.white) ? "K" : "k"

        // A - Avoid
        let foofoo = BoardAnalyser.canAvoidCheckmate(this, board)

        // B - Block
        let fooque = BoardAnalyser.canBlockCheckmate(this, moveResult, board)

        // C - Capture
        let foobar = BoardAnalyser.canCaptureCheckmate(this, moveResult, board)

        return foofoo && fooque && foobar
    }
 
    // Iteratively check all the surrounding squares to see if a square is safe for the king
    squareIsSafeForKing(kingSquare: BoardLocation, color: StandardTurns, gameType: GameType, board?: number, debug?: boolean): boolean {
        switch (gameType) {
            case GameType.bughouse:
            case GameType.standard:
                // Check Knight squares, Bishop squares, and Rook squares.
                let foo = this.squareIsSafeFromPiece(kingSquare, color, "Knight", board, debug)
                let bar = this.squareIsSafeFromPiece(kingSquare, color, "Bishop", board, debug)
                let que = this.squareIsSafeFromPiece(kingSquare, color, "Rook", board, debug)
                return (foo && bar && que)
            default:
                throw new Error("Game variant is not recognized.")
        }
    }

    getStatus(board?: number): GameStatus {
        // If null use zero, else use the specified board
        const localBoard = (board == null) ? 0 : board
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)

        let status = {
            gameOver: this.state[localBoard].gameOver,
            turn: null,
            winner: (this.state[localBoard].winner === StandardTurns.white) ? "white" : "black",
        } as GameStatus

        if (this.state[localBoard].winner == null) {
            status.winner = null
        }

        return status
    }

    // Reconstruct the status object when asked for it.
    getPlayerStatus(id: number, board?: number) {
        let boardNumber = board
        if (board != null && this.gameType != GameType.bughouse) {
            throw new Error(`Not a ${GameType.bughouse.toString()} game`)
        }

        if (id > 3 || id < 0) {
            throw new Error(`Id '${id}' is out of range`)
        }

        let isPlayersTurn = false;
        
        // Determine if it's the players turn
        if (id === 0 || id === 1) {
            if ((id === 0 && this.getTurn(boardNumber) === StandardTurns.white) ||
                (id === 1 && this.getTurn(boardNumber) === StandardTurns.black)) {
                isPlayersTurn = true
            }
        }
        else {
            if (this.debug && !this.hideOutput) {
                console.log(`turn: ${this.getTurn(board)}`)
            }
            if ((id === 2 && this.getTurn(1) === StandardTurns.white) ||
                (id === 3 && this.getTurn(1) === StandardTurns.black)) {
                isPlayersTurn = true
            }
        }

        // Get the extra pieces 
        let extraPieces = []
        let capturedPieces = []

        if (this.gameType === GameType.bughouse)
            switch (id) {
                case 0:
                    extraPieces = this.state[0].extraPiecesWhite
                    break
                case 1:
                    extraPieces = this.state[0].extraPiecesBlack
                    break
                case 2:
                    extraPieces = this.state[1].extraPiecesWhite
                    break
                case 3:
                    extraPieces = this.state[1].extraPiecesBlack
                    break
            }
        else if (this.gameType === GameType.standard) {
            extraPieces = null
            switch (id) {
                case 0:
                    capturedPieces = this.state[0].extraPiecesWhite
                    break
                case 1:
                    capturedPieces = this.state[0].extraPiecesBlack
                    break
                case 2:
                    capturedPieces = this.state[1].extraPiecesWhite
                    break
                case 3:
                    capturedPieces = this.state[1].extraPiecesBlack
                    break
            }
        }
        
        return {
            id: id,
            isPlayersTurn: isPlayersTurn,
            extraPieces: extraPieces,
            capturedPieces: capturedPieces
        } as PlayerStatus
    }

    resign(board?: number) {
        // If null use zero, else use the specified board
        const localBoard = (board == null) ? 0 : board
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)

        if (!this.hideOutput)
            console.log("GAME OVER")
        this.state[localBoard].gameOver = true
        this.state[localBoard].winner = this.getTurn(localBoard)  // The turn hasn't updated yet.
    }

    // NOTE: function is not designed for non-standard board sizes.
    private squareIsSafeFromPiece(kingSquare: BoardLocation, color: StandardTurns, pieceName: string, board?: number, debug?: boolean): boolean {
        // If null use zero, else use the specified board
        const localBoard = (board == null) ? 0 : board
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)

        let pieceSymbolWhite: string
        let pieceSymbolBlack: string

        // TODO: The problem is that the bishops and rooks don't stop after they find a piece that is in the way.

        if (debug && !this.hideOutput) {
            console.log(kingSquare)
            console.log(color)
            console.log("pieceName: " + pieceName)
        }

        let list: BoardLocation[][] = []
        let sublist: BoardLocation[] = []

        // Only needs to check against Rooks, Knights, and Bishops.
        switch (pieceName) { 
            case "Rook":
                pieceSymbolWhite = constants["PieceNameToPGN"]["Rook"][StandardTurns.white]
                pieceSymbolBlack = constants["PieceNameToPGN"]["Rook"][StandardTurns.black]

                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 7; j++) {
                        sublist.push(constants.PieceLogic[pieceName][i * j])
                    }
                    list.push(sublist)
                    sublist = []
                }
                break
            case "Knight":
                pieceSymbolWhite = constants["PieceNameToPGN"]["Knight"][StandardTurns.white]
                pieceSymbolBlack = constants["PieceNameToPGN"]["Knight"][StandardTurns.black]
                
                // Just stuff it the list.
                for (let j = 0; j < 8; j++) {
                    sublist.push(constants.PieceLogic[pieceName][j])
                }
                list.push(sublist)
            
                break
            case "Bishop":
                pieceSymbolWhite = constants["PieceNameToPGN"]["Bishop"][StandardTurns.white]
                pieceSymbolBlack = constants["PieceNameToPGN"]["Bishop"][StandardTurns.black]
                
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 7; j++) {
                        sublist.push(constants.PieceLogic[pieceName][i * j])
                    }
                    list.push(sublist)
                    sublist = []
                }
                break
            case "Pawn":
                if (color === StandardTurns.white) {
                    if ((kingSquare.row - 1) >= 0 && (kingSquare.column - 1) >= 0 && this.getBoardArray()[kingSquare.row - 1][kingSquare.column - 1] !== "p" &&
                        (kingSquare.column + 1) < 8 && this.getBoardArray()[kingSquare.row - 1][kingSquare.column + 1] === "p")
                        return true
                    else 
                        return false
                }
                else {
                    if ((kingSquare.row + 1) < 8 && (kingSquare.column - 1) >= 0 && this.getBoardArray()[kingSquare.row + 8][kingSquare.column - 1] !== "p" &&
                        (kingSquare.column + 1) < 8 && this.getBoardArray()[kingSquare.row + 1][kingSquare.column + 1] === "p")
                        return true
                    else 
                        return false
                }
            default:
                throw new Error("'squareIsSafeFromPiece' function is working unexpectedly.")
        }

        for (let sublist of list) {
            for (let attackerSquare of sublist) {
                // If the square is within bounds
                if (attackerSquare.column + kingSquare.column < 8 &&
                    attackerSquare.column + kingSquare.column >= 0 &&
                    attackerSquare.row + kingSquare.row < 8 &&
                    attackerSquare.row + kingSquare.row >= 0) {

                        // This break will require there to be a clear path for non-jumping pieces to be a threat.
                        if ((this.state[localBoard].board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== pieceSymbolWhite ||
                            this.state[localBoard].board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== pieceSymbolBlack ||
                            this.state[localBoard].board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] !== "X") && 
                            pieceName !== "Knight" // Knights are allowed to jump
                            )
                            break

                        // If the correct piece appears, then the square is not safe.
                        if (color === StandardTurns.white && this.state[localBoard].board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] === pieceSymbolWhite) {
                            return false
                        }
                        else if (color === StandardTurns.black && this.state[localBoard].board[attackerSquare.row + kingSquare.row][attackerSquare.column + kingSquare.column] === pieceSymbolBlack) {
                            return false
                        }
                    }
            }
        }

        return true
    }

    // Returns false if it's not checkmate because there is a possible block
    // returning true signals nothing definitive.
    checkForBlockableSquares(kingLocation: BoardLocation, direction: Directions, board: number): boolean {
        // If null use zero, else use the specified board
        const localBoard = (board == null) ? 0 : board
        if (localBoard < 0 || localBoard > 1) throw new Error(`Board ${localBoard} does not exists.`)

        let rowInc: number 
        let colInc: number

        switch (direction) {
            case Directions.East:
                rowInc = 0
                colInc = -1
                break
            case Directions.Northeast:
                rowInc = -1
                colInc = -1
                break
            case Directions.North:
                rowInc = -1
                colInc = 0
                break
            case Directions.Northwest:
                rowInc = -1
                colInc = 1
                break
            case Directions.West:
                rowInc = 0
                colInc = 1
                break
            case Directions.Southwest:
                rowInc = 1
                colInc = 1
                break
            case Directions.South:
                rowInc = 1
                colInc = 0
                break
            case Directions.Southeast:
                rowInc = 1
                colInc = -1
                break
            default:
                throw new Error("Directional error 1.")
        }

         // Check for open squares
         for (let i = 1; i < 8; i++) {
            // If found empty square
            if (this.getBoardArray()[kingLocation.row + rowInc][kingLocation.column + colInc] === "X") { 
                let tempLoc = {
                    row: kingLocation.row + i,
                    column: kingLocation.column + i
                } as BoardLocation
                // Check to see if a piece can block
                if (!this.squareIsSafeFromPiece(tempLoc, this.getTurn(localBoard), "Rook", localBoard, false) ||
                    !this.squareIsSafeFromPiece(tempLoc, this.getTurn(localBoard), "Bishop", localBoard, false) ||
                    !this.squareIsSafeFromPiece(tempLoc, this.getTurn(localBoard), "Knight", localBoard, false))
                    return false // Not checkmate
            }

            // The attacker was found, no blocking possible
            else {
                if (this.debug && !this.hideOutput)
                    console.log("Blocking checkmate not possible.")
                break
            }

            switch (direction) {
                case Directions.East:
                    colInc--
                    break
                case Directions.Northeast:
                    rowInc--
                    colInc--
                    break
                case Directions.North:
                    rowInc--
                    break
                case Directions.Northwest:
                    rowInc--
                    colInc++
                    break
                case Directions.West:
                    colInc++
                    break
                case Directions.Southwest:
                    rowInc++
                    colInc++
                    break
                case Directions.South:
                    rowInc++
                    break
                case Directions.Southeast:
                    rowInc++
                    colInc--
                    break
                default:
                    throw new Error("Directional error 2.")
            }
        }
        return true
    }
}

export default ChessState
exports.ChessState = ChessState;