let figlet = require("figlet")

figlet(`Ciao Pat! :D`, function (error, data) {
    if (error) {
        console.log(`Rip`);
        console.dir(error);
        return;
    }
    console.log(data)
})