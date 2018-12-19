/* Helper function */
var HelperFunctions = (function () {
    function HelperFunctions() {
    }
    HelperFunctions.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    // Has one optional parameter for testing
    HelperFunctions.getMove = function (opt) {
        if (opt) {
            return opt;
        }
    };
    /*
     * Parameters:
     *      - PGN move
     *      - Which plays turn it is
     *      - game type [OPTIONAL]
     */
    HelperFunctions.pgnToGridCordinates = function (pgn, turn, gameType) {
        var foo = { "row": "", "col": "" };
        if (gameType != undefined || gameType !== "standard") {
            Error("pgnToGridCordinate is not yet implemented for " + gameType + " variant");
        }
        switch (pgn[0]) {
            case "N":
                Error("Knight not yet implemented");
                break;
            case "B":
                Error("Bishop not yet implemented");
                break;
            case "R":
                Error("Rook not yet implemented");
                break;
            case "Q":
                Error("Queen not yet implemented");
                break;
            case "K":
                Error("King not yet implemented");
                break;
            default:
                foo.col = pgn[0].charCodeAt(0) - 97;
                foo.row = pgn[1] - 1;
        }
        return foo;
    };
    return HelperFunctions;
}());
export default HelperFunctions;
