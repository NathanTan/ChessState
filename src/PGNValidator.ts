
const ValidatePGN = (board: string[][], pgn: string, hideOutput: boolean, debug?: boolean): boolean => {
    /* Basic Validation */
    if (pgn == null) {
        return false
    }

    if (pgn.length <= 1) {
        return false // PGN too short
    }


    return true
}

export default ValidatePGN