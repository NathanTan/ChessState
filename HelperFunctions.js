/* Helper function */
class HelperFunctions {

    static isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // Has one optional parameter for testing
    static getMove(opt) {
        if (opt) {
            return opt
        }
    }
}

export default HelperFunctions