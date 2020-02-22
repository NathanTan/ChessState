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
            extraPieces: ["p"],
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
            extraPieces: ["p"],
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
    ],
    "Basic pawn drop on board1 - Bughouse": [
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
            isPlayersTurn: false,
            extraPieces: [],
            capturedPieces: []
        },
        {
            id: 3,  // Black
            isPlayersTurn: true,
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
            isPlayersTurn: true,
            extraPieces: [],
            capturedPieces: []
        },
        {
            id: 1,  // Black
            isPlayersTurn: false,
            extraPieces: ["p"],
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
            extraPieces: [],
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
            extraPieces: ["p"],
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
            extraPieces: [],
            capturedPieces: []
        },

        // Move 5 Executed
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
            isPlayersTurn: false,
            extraPieces: [],
            capturedPieces: []
        },
        {
            id: 3,  // Black
            isPlayersTurn: true,
            extraPieces: [],
            capturedPieces: []
        }
    ],
    "Test For Checkmate - Bughouse": [
        { id: 0, isPlayersTurn: true, extraPieces: [], capturedPieces: [] },
        { id: 1, isPlayersTurn: false, extraPieces: [], capturedPieces: [] },
    ]
}

export default ExpectedPlayerStatus