# Develhope - Node.js Exercises Part - 1

### After the download you need to execute command "npm install"

### For executing file you need to execute "node filename.js //or in some cases//>> filename.mjs"

## Create a sum script

Create a script that outputs the total of 5 + 6 when you run it with Node.js.

## Explore with the Node.js REPL

Use the Node.js REPL to list the methods provided by the Node.js core crypto module. Use one of these methods to generate a random ID.

## Create and use CommonJS modules

// Basically this

## Create and use ECMAScript modules

Create a script that uses export default to export a function. Create another script that uses import to import the function and then calls it.

## Change the HTML response

Our HTTP server sends an HTML response body.

Replace the text in the HTML with your own message. Run the server and use your web browser to test your changes.

## Send JSON from Mars

// Why i need to do this? I don't know, but i can

## Command-line art

Create a new Node.js project and install the figlet package (https://www.npmjs.com/package/figlet). Write a script that uses the function from this package to output some text based art (the figlet package README has a 'Quick Start' section). Run the script with Node.js.

## Inspect an HTTP response with curl

Make an HTTP request with curl that shows the response headers for this URL: https://jsonplaceholder.typicode.com/posts/1/comments

What is the value of the content-type response header?

## A test-driven HTTP response

Our integration test in app.test.js expects a JSON response.

    Change the test to expect an HTML response header: Content-Type: text/html

    Change the test to expect this HTML in response.text:

Welcome to the World Wide Web!

    Run the test with npm test — it should fail.
    Update the code in app.js to send the HTTP response the test expects.
    Run the test with npm test — it should pass.

## Use a method with a callback 

Create a script that uses the Node.js core fs.writeFile() (callback API) method to write a text file. The documentation for this method is on the Node.js File system page.

## Promises lucky draw

The luckyDraw function returns a promise. Create a promise chain where the function is called for for each of the players: Joe, Caroline and Sabrina

Log out the resolved value for each promise and handle any promise rejections in the chain.

function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

## await the lucky draw results

Create agetResults function that uses async and await. Inside of the function, call the luckyDraw function for each of the players: Tina, Jorge, Julien

Log out the resolved value for each promise and handle any promise rejections.

function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

## Create your own HTTP server

Use the techniques you've learnt so far to create your own HTTP server with Express. Your server should:

    Automatically recompile and restart when you make changes
    Have a GET route that sends a JSON response
    Have an integration test for the GET route
    Use an environment variable to configure the server port

## Log the data

Use console methods to complete the challenges in this script:

// Challenge 1:
//
// Use 2 different techniques to output the value of this variable with
// a label, so we can easily identify it in the script output.

const surprisingFact = "The bumblebee bat is the world's smallest mammal";

// Challenge 2:
//
// Use 2 different techniques to output a formatted version
// of this complete object.

const familyTree = [
  {
    name: "Person 1",
    children: [
      {
        name: "Person 2",
        children: [
          {
            name: "Person 3",
            children: [
              {
                name: "Person 4",
              },
            ],
          },
        ],
      },
    ],
  },
];

// Challenge 3:
//
// Output a count value every time the importantTask function is called.
// Reset the count value after 4 function calls.

function importantTask() {}

importantTask();
importantTask();
importantTask();
importantTask();
importantTask();
importantTask();


## Create a database and Prisma model 

Create a database and Prisma model
