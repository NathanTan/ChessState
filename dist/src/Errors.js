/* Errors.js */
var Errors = (function () {
    function Errors() {
    }
    Errors.checkGameType = function (state) {
        if (typeof (state.gameType) === "undefined") {
            console.log("----------------------------------");
            console.log("-Error: Unrecognized variant type-");
            console.log("----------------------------------");
        }
        return null;
    };
    return Errors;
}());
export default Errors;
