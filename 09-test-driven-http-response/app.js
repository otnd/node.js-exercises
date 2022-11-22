const { createServer } = require('node:http')

function createApp() {
    return createServer((req, res) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/Html')
        res.end("<h1>Ciao di nuovo Pat!</h1>")
    })
}
module.exports = createApp