/* Helper function */
class HelperFunctions {

    static isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

export default HelperFunctions