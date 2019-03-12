import PlayerStatus from "../../src/Interfaces/PlayerStatus";

const ExpectedPlayerStatus = { 
    "Basic pawn drop - Bughouse": [
        // 0 Moves Executed
    {
        id: 0,  // White
        isPlayersTurn: true,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 1,  // Black
        isPlayersTurn: false,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 2,  // White
        isPlayersTurn: true,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 3,  // Black
        isPlayersTurn: false,
        extraPieces: [],
        capturedPieces: [] 
    },

    // Move 1 Executed
    {
        id: 0,  // White
        isPlayersTurn: false,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 1,  // Black
        isPlayersTurn: true,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 2,  // White
        isPlayersTurn: true,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 3,  // Black
        isPlayersTurn: false,
        extraPieces: [],
        capturedPieces: [] 
    },

    // Move 2 Executed
    {
        id: 0,  // White
        isPlayersTurn: true,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 1,  // Black
        isPlayersTurn: false,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 2,  // White
        isPlayersTurn: true,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 3,  // Black
        isPlayersTurn: false,
        extraPieces: [],
        capturedPieces: [] 
    },

    // Move 3 Executed
    {
        id: 0,  // White
        isPlayersTurn: false,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 1,  // Black
        isPlayersTurn: true,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 2,  // White
        isPlayersTurn: true,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 3,  // Black
        isPlayersTurn: false,
        extraPieces: ["P"],
        capturedPieces: [] 
    },

    // Move 4 Executed
    {
        id: 0,  // White
        isPlayersTurn: false,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 1,  // Black
        isPlayersTurn: true,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 2,  // White
        isPlayersTurn: false,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 3,  // Black
        isPlayersTurn: true,
        extraPieces: ["P"],
        capturedPieces: [] 
    },

    // Move 5 Executed
    {
        id: 0,  // White
        isPlayersTurn: false,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 1,  // Black
        isPlayersTurn: true,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 2,  // White
        isPlayersTurn: true,
        extraPieces: [],
        capturedPieces: [] 
    },
    {
        id: 3,  // Black
        isPlayersTurn: false,
        extraPieces: [],
        capturedPieces: [] 
    }
] 
}

export default ExpectedPlayerStatus