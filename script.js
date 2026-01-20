function hello() {
    let colour = prompt("Gimme your favorite color");
    if (colour) {
        document.getElementById("favcolor").innerHTML = `Hope you have a very ${colour} day!`;
    }
}