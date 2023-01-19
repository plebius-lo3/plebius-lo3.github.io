let show_info_button = document.getElementById("info_show_button");
let hide_info_button = document.getElementById("info_close_button");
let show_form_button = document.getElementById("form_show_button");
let hide_form_button = document.getElementById("form_close_button");

function main() {
    show_project_info();
    hide_project_info();
    show_form();
    hide_form();
}

function show_project_info() {
    show_info_button.onclick = function() {
        document.getElementById("info_dialog").setAttribute("state", "revealed");
    }
}

function hide_project_info() {
    hide_info_button.onclick = function() {
        document.getElementById("info_dialog").setAttribute("state", "hidden");
    }
}

function show_form() {
    show_form_button.onclick = function() {
        document.getElementById("form_dialog").setAttribute("state", "revealed");
    }
}

function hide_form() {
    hide_form_button.onclick = function() {
        document.getElementById("form_dialog").setAttribute("state", "hidden");
    }
}

main();
