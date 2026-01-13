function hello() {
    let name = prompt("What is your name?");
    if (name) {
        document.getElementById("greeting").innerHTML = `Hello, General Kenobi ${name}!`;
    }
}