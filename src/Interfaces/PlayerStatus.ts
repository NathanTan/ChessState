interface PlayerStatus {
    id:             number
    isPlayersturn:  boolean
    extraPieces:    string[]    // For bughouse
    capturedPieces: string[]    // For non-bughouse
}

export default PlayerStatus