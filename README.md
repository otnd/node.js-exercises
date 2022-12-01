# Develhope - Node.js Exercises Part - 2

### After the download you need to select a folder and execute command "npm install"

### For executing file you need to execute "tsc filename.ts"

## Retrieve all resources

In this exercise you'll build on what you created in 'Unit 12, Exercise 1: Create a database and Prisma model'.

Add a route to your API that retrieves all resources.

## Create a resource

Add a route to your API that creates a resource. The route should validate the request body data.

## Retrieve, update and delete a resource

Add routes to your API for retrieving, updating and deleting a resource.

## Add support for CORS to your API

Configure your API to enable CORS for requests from the origin http://localhost:8080.

## Handle file uploads

In this exercise you'll build on what you created in Exercise: Add support for CORS to your API'.

Create an HTML form that can upload a file, and add a route to your API that accepts that file and saves it to disk.

## Refactor your application

In this exercise you'll build on what you created in 'Exercise: Handle file uploads'.

Refactor your API application so that:

    Application configuration is accessed via one module (config.ts).
    The routes are in their own module and imported into app.ts.
    All middleware are organised under a middleware directory, and imported where they're needed.

## Implement authentication

In this exercise you'll build on what you created in 'Exercise: Refactor your application'.

Implement authentication for your API. You should:

Integrate Passport, the GitHub2 Passport strategy and the Express session middleware. Create a GitHub OAuth App and configure your application to use it. Add routes for handling the login and logout process. Protect the POST, PUT and DELETE routes on your API. Set a username on resources when they're created or updated. Create a web page for adding a resource, so that you can test the authentication.

## Apply the singleton pattern

Create a module containing a class, with a method named output that logs any value that's passed to it.

Apply the singleton pattern to export a single instance of the class from the module.

## Fix the Adapter

The Logger class expects any logStorage object it receives to implement a write and a read method.

Fix the LogStorageFSAdapter class so that it provides the methods the Logger class expects.

const fs = require("node:fs/promises");

class Logger {
  constructor(logStorage) {
    this.logStorage = logStorage;
  }

  async info(message) {
    await this.logStorage.write(`[INFO] ${message}\n`);
  }

  async error(message) {
    await this.logStorage.write(`[ERROR] ${message}\n`);
  }

  async replay() {
    console.log(await this.logStorage.read());
  }
}

class LogStorageFSAdapter {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async appendFile(message) {
    try {
      await fs.appendFile(this.filepath, `[INFO] ${message}\n`);
    } catch (error) {
      console.error(error);
    }
  }

  async readFile() {
    try {
      return await fs.readFile(this.filepath, { encoding: "utf-8" });
    } catch (error) {
      console.error(error);
    }
  }
}

const fsStorage = new LogStorageFSAdapter("output.log");

const logger = new Logger(fsStorage);

logger.info("Some information");

logger.error("A bit of an issue");

logger.error("A catastrophic error!");

logger.info("The best information");

logger.replay();

## Shout with a decorator

Implement a toString method on the Shout class that decorates the toString method for a Text class instance.

It should use the toUpperCase() method to convert the Text instance string to uppercase.

class Text {
  constructor(text) {
    this.string = text;
  }

  toString() {
    return this.string;
  }
}

class Shout {
  constructor(text) {
    this.text = text;
  }
}

console.log(new Text("Hello, I'm talking").toString());

console.log(new Shout(new Text("Hello, I'm shouting!")).toString());

## Inject the bike dependencies

Complete this code to inject the Wheel instance dependencies into the Bike instance.

class Bike {
  constructor() {}

  specification() {
    let message = `${this.wheel1.label} wheel diameter = ${this.wheel1.diameter}`;
    message += `, ${this.wheel2.label} wheel diameter = ${this.wheel2.diameter}`;

    return message;
  }
}

class Wheel {
  constructor(label, diameter) {
    this.label = label;
    this.diameter = diameter;
  }
}

const frontWheel = new Wheel("Front", 126);
const backWheel = new Wheel("Back", 42);

const bike = new Bike();

console.log(bike);

console.log("Bike specification:", bike.specification());

