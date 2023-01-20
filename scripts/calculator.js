const MathOperation = Object.freeze({ // Calculator operations
    ADDITION: "+",
    SUBTRACTION: "-",
    MULTIPLICATION: "×",
    DIVISION: "÷",
    MODULO: "%",
})

let current_operator = []; // The current operator when an operator button is pressed
let current_display; // The current number in focus
let decimal_point_added = false; // Prevents decimal points from being added twice
let display_cleared = false; // Checks if all displays are calculated

// The elements that provide operand input
let operand_disp_1 = document.getElementById("op_display_one"); 
let operand_disp_2 = document.getElementById("op_display_two"); 
let result_display = document.getElementById("op_result"); // The element that displays the answer
let operator_indicator = document.getElementById("operator_indicator"); // Indicates when an operator button is pressed
let indicator_text = document.getElementById("op_indicator_text"); // The text inside the `operator_indicator` element

// Number button references
let btn_num_1 = document.getElementById("num_button_one");
let btn_num_2 = document.getElementById("num_button_two");
let btn_num_3 = document.getElementById("num_button_three");
let btn_num_4 = document.getElementById("num_button_four");
let btn_num_5 = document.getElementById("num_button_five");
let btn_num_6 = document.getElementById("num_button_six");
let btn_num_7 = document.getElementById("num_button_seven");
let btn_num_8 = document.getElementById("num_button_eight");
let btn_num_9 = document.getElementById("num_button_nine");
let btn_num_0 = document.getElementById("num_button_zero");
let btn_num_dec = document.getElementById("num_button_dec_point");

// Operator button references
let btn_op_plus = document.getElementById("op_button_plus");
let btn_op_minus = document.getElementById("op_button_minus");
let btn_op_mult = document.getElementById("op_button_multiply");
let btn_op_divide = document.getElementById("op_button_divide");
let btn_op_mod = document.getElementById("op_button_modulo");
let btn_op_solve = document.getElementById("op_button_equals");
let btn_op_clear = document.getElementById("op_button_cancel");

// Groups the numbe buttons into an array.
// This is to make it easy for related elements to recieve the same function
// by looping throught the array
let number_button_group = [
    btn_num_0,
    btn_num_1,
    btn_num_2,
    btn_num_3,
    btn_num_4,
    btn_num_5,
    btn_num_6,
    btn_num_7,
    btn_num_8,
    btn_num_9,
]

let operator_button_group = [
    btn_op_plus,
    btn_op_minus,
    btn_op_mult,
    btn_op_divide,
    btn_op_mod,
]


function main() {
    reset_all();
    update();
}

// Updates the calculator with each calculation
function update() {
    _on_operator_button_clicked();
    _on_number_button_clicked();   
}


// Displays the calculated answer
function display_result() {
    let result = calculate();
    result_display.setAttribute("value", result);
    current_display = operand_disp_1;

}

function calculate() {
    let op1 = parseFloat(operand_disp_1.getAttribute("value"));
    let op2 = parseFloat(operand_disp_2.getAttribute("value"));
    let result = 0.0;
    switch(current_operator[0]) {
        case MathOperation.ADDITION:
            result = op1 + op2;
            break;
        case MathOperation.SUBTRACTION:
            result = op1 - op2;
            break;
        case MathOperation.MULTIPLICATION:
            result = op1 * op2;
            break;
        case MathOperation.DIVISION:
            result = op1 / op2;
            break;
        case MathOperation.MODULO:
            result = op1 % op2;
            break;
        default:
            result = 0.0;
    }
    return result;
}


// Resets all the displays
function reset_all() {
    operator_indicator.setAttribute("status", "inactive");
    operand_disp_1.setAttribute("value", "0");
    operand_disp_2.setAttribute("value", "0");
    result_display.setAttribute("value", "");
    current_display = operand_disp_1;
    current_operator = []

}

// Resets the displays after a calculation
function reset_after_solve() {
    if(current_display === operand_disp_1 && !(result_display.getAttribute("value") === "")) {
        operand_disp_2.setAttribute("value", "0");
        result_display.setAttribute("value", "");
        operator_indicator.setAttribute("status", "inactive");
    }
}

// Pushes input to the display
function _print_screen(display, value) {
    let parsed_value = display.getAttribute("value") + value;
    display.setAttribute("value", parsed_value);
}

// Controls how the number buttons behave, that is, providing input
function _on_number_button_clicked(display = current_display) {
    display_cleared = true;
    decimal_point_added = false;

    number_button_group.forEach(function(item, index){
        let button_value = index.toString();
        item.onclick = function() {
            if (display_cleared) {
                display.setAttribute("value", "");
                display_cleared = false;
            }
            _print_screen(display, button_value);

            reset_after_solve();
        }
    })

    // Prevents numbers from having 2 decimal points
    btn_num_dec.onclick = function() {
        let button_value = "";
        if (! decimal_point_added){
            decimal_point_added  = true;
            button_value = ".";
        } 
        display_cleared = false;
        
        _print_screen(display, button_value);
        reset_after_solve();
    }
}


// Controls how the operator buttons behave
function _on_operator_button_clicked() {
    operator_button_group.forEach(function(item, index){
        item.onclick = function(){
            let operator = item.innerHTML;
            if (current_operator.length == 0) {
                current_operator.push(operator);
            }else {
                let new_op_1 = calculate();
                current_operator[0] = operator;
                operand_disp_2.setAttribute("value", "0");
                operand_disp_1.setAttribute("value", new_op_1);
                result_display.setAttribute("value", "");
            }
            indicator_text.innerHTML = operator;
            operator_indicator.setAttribute("status", "active");
            current_display = operand_disp_2;
            _on_number_button_clicked(current_display);
        }
    })

    btn_op_clear.onclick = function() {
        reset_all();
        update();
    }

    btn_op_solve.onclick = function() {
        display_result();
        update();
    }
}


main();
