/* boardPrinter.js */

class boardPrinter {

    /* Helper function */
    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    /* Prints a ascii board based on a standard fen string */
    printBoard(fen) {
        console.log("-----------------") // Print first line
        fen.forEach(function (row) {
            process.stdout.write("|") // Print without new line
            
            row.split("").forEach(function (piece) {
                // If a number is found, print that many spaces
                if (isNumeric(piece)) 
                for (let i = 0; i < +piece; i++) 
                process.stdout.write(" |") // Print without new line
                // Else print the piece letter
                else
                process.stdout.write(piece + "|") // Print without new line
            })
            console.log("\n-----------------") // Print last line
        })
    }
    
}
export default boardPrinter