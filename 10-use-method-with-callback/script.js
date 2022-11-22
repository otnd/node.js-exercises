import { writeFile, readFile } from 'node:fs';

writeFile('message.txt', "Hello", 'utf8', err => {
    if (err) throw err
    console.log('The file has been saved!')

    readFile('message.txt', 'utf8', (err, data) => {
        if (err) throw err
        console.log(`Il contenuto è: ${data}`)
    })

})