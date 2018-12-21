function format() {
    str = $("#inputText").val();
    strFormatted = formatAddNumbers(str);
    $("#outputText").val(strFormatted);
}

function formatAddNumbers(str) {
    lines = splitToLines(str);
    let currentNumbers = [], result = "";
    for (let line of lines) {
        let newLine = line;
        if (shouldHaveANumber(line)) {
            let res = addNumberForALine(line, currentNumbers);
            currentNumbers = res.newNumbers;
            newLine = res.newLine;
        }
        if (isLineANewRoot(line)) {
            currentNumbers = [];
        }

        result += newLine + "\n";
    }
    return result;
}

// returns true if the line has some tabs and (OR) or (AND) then
function shouldHaveANumber(line) {
    return /\t+\((AND|OR)\).*/.test(line);
}

function addNumberForALine(line, numbers) {
    let res = "";
    let tabsBefore = 0, numberAdded = false;
    for (let i = 0; i < line.length; i++) {
        let curChar = line.charAt(i);
        if (curChar == "\t") {
            tabsBefore++;
        } else if (!numberAdded) {
            // modify numbers
            console.log(numbers);
            if (numbers.length < tabsBefore) {
                // TODO
                if (tabsBefore - numbers.length > 1) {
                    alert("Error occured - Document is bad formatted");
                    throw "Document is bad formatted";
                }
                numbers.push(1);
            } else if (numbers.length == tabsBefore) {
                numbers[tabsBefore - 1]++;
            } else {
                numbers = numbers.slice(0, tabsBefore);
                numbers[tabsBefore - 1]++;
            }
            // add numbers
            res += numbers.join(".") + ". ";
            numberAdded = true;
        }
        res += curChar;
    }

    return {
        newLine: res,
        newNumbers: numbers
    };
}

function isLineANewRoot(line) {
    const isANewRoot = line.startsWith(". (OR)") || line.startsWith(". (AND)");
    return isANewRoot;
}

function splitToLines(str) {
    return str.split(/\r?\n/);
}