var boolean = localStorage.getItem("isEnabled");
if (boolean === "true") {
    document.getElementById("clickme").innerText = "disable";
} else {
    document.getElementById("clickme").innerText = "enable";
}

function hello() {
    var boolean = localStorage.getItem("isEnabled");
    if (boolean === "true") {
        document.getElementById("clickme").innerText = "enable";
        localStorage.setItem("isEnabled", "false");
    } else {
        document.getElementById("clickme").innerText = "disable";
        localStorage.setItem("isEnabled", "true");
    }
    
}

document.getElementById('clickme').addEventListener('click', hello);