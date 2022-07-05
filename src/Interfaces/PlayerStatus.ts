interface PlayerStatus {
    id:             number
    isPlayersTurn:  boolean
    extraPieces:    string[]    // For bughouse
    capturedPieces: string[]    // For non-bughouse
}

export default PlayerStatus