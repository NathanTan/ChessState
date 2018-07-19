/* Errors.js */

class Errors {
    static checkGameType(state) {
        if (typeof (state.gameType) === "undefined") {
            console.log("----------------------------------")
            console.log("-Error: Unrecognized variant type-")
            console.log("----------------------------------")
        }
        else {
            console.log(
                "No errors here!"
            )
        }
        return null
    }
}

export default Errors