# pg-promise

1. **What is `pg-promise`?**
   
   `pg-promise` is like a helper tool for JavaScript programs running on Node.js that makes it easier to talk to a special kind of database called PostgreSQL. Imagine you have a friend who speaks a different language, and you have a translator to help you communicate with them. `pg-promise` is like that translator, helping your program understand and talk to the PostgreSQL database.

2. **What does it do for us?**

   - **Higher-level abstraction**: This means that `pg-promise` simplifies the complicated things we might need to do when talking to a PostgreSQL database. Instead of dealing with all the nitty-gritty details, `pg-promise` gives us simpler ways to do common tasks.
   
   - **Parameterized queries**: When we want to ask the database a question or tell it to do something, we often need to provide some information, like a name or a number. Parameterized queries let us do this in a safe and organized way, preventing security issues and making our code cleaner.
   
   - **Transactions**: Sometimes, we need to do multiple things in a row with the database, and we want to make sure they all happen together or none of them happen at all. Transactions help us do this, keeping our data safe and consistent.
   
   - **Connection management**: Think of connecting to a database like calling a friend on the phone. You have to dial their number, talk to them, and then hang up when you're done. Connection management in `pg-promise` helps us handle all these steps smoothly, so we can focus on what we want to do with the database.

3. **How do we use it?**

   When we write `require('pg-promise')()`, we're telling our program to bring in the `pg-promise` tool and set it up for us. It's like saying, "Hey, I need that translator to help me talk to the PostgreSQL database!" The `()` at the end is like turning on the translator, getting it ready for us to use.
   
   Once we have `pg-promise` set up and ready to go, it gives us back a special box called `pgp`. Inside this box is everything we need to talk to the database using `pg-promise`. We can then use this `pgp` box to connect to the PostgreSQL database and ask it questions or tell it what to do, like fetching some data or saving new information.

## pg-promise in dbConfig.js

In this context, the code you provided is setting up a connection to a PostgreSQL database using the `pg-promise` library in a Node.js application. Let's break it down step by step:

1. **`const pgp = require('pg-promise')()`**:
   - This line imports the `pg-promise` library into our code and initializes it by immediately calling the function it exports. This sets up `pg-promise` for us to use.

2. **`require('dotenv').config()`**:
   - This line imports and configures the `dotenv` library, which helps manage environment variables. In this case, it's used to load environment variables from a `.env` file into `process.env`.

3. **`const cn = { ... }`**:
   - Here, an object `cn` (short for connection) is defined. It contains the configuration details needed to connect to the PostgreSQL database. These details are retrieved from environment variables set up in the `.env` file using `process.env`.

4. **`const db = pgp(cn)`**:
   - This line establishes a connection to the PostgreSQL database using the configuration object `cn` and the `pgp` instance we created earlier. It creates a `db` object that we can use to interact with the database.

5. **`db.connect().then((cn) => { ... }).catch((error) => { ... })`**:
   - This section establishes the connection to the database using the `connect()` method provided by `pg-promise`. It returns a promise that resolves with a connection object (`cn`) upon successful connection, or rejects with an error if there's a problem.
   - If the connection is successful, it extracts information about the connection (user, host, port, database) from the `cn` object and logs it to the console, indicating that the connection has been established.
   - Finally, it calls `cn.done()` to release the connection back to the connection pool, ensuring it's available for future use.
   - If there's an error during the connection process, it catches the error and logs a message indicating the connection error.

Overall, this code sets up a connection to a PostgreSQL database using `pg-promise`, retrieves connection details from environment variables, establishes the connection, and logs information about the connection status.

# What is a promise?

See: https://javascript.info/async-await

In JavaScript, a promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises are widely used for handling asynchronous operations such as fetching data from a server, reading files, or executing long-running tasks without blocking the execution thread.

Here's a breakdown of the key concepts related to promises and async/await:

1. **Promise**: A promise represents the eventual result of an asynchronous operation. It can be in one of three states: pending, fulfilled, or rejected. Promises provide a cleaner way to work with asynchronous code compared to traditional callback functions.

2. **Async Functions**: An async function is a function declared with the `async` keyword. This keyword allows the function to use the `await` keyword inside it. Async functions always return a promise, and their return values are automatically wrapped in a resolved promise.

3. **Await**: The `await` keyword is used inside async functions to wait for the resolution of a promise. When encountering an `await` expression, the async function pauses its execution until the promise is settled (fulfilled or rejected), and then resumes with the resolved value. This makes asynchronous code look and behave more like synchronous code, improving readability and maintainability.

4. **Error Handling**: Async functions simplify error handling by allowing the use of `try...catch` blocks around `await` expressions. If a promise is rejected within an async function and not caught, it will result in an error being thrown, similar to throwing an error synchronously.

5. **Async Class Methods**: Async functions can also be used within class methods. By declaring a class method as `async`, you can use `await` inside it to handle asynchronous operations gracefully.

6. **Top-Level Await (in Modules)**: In modern browsers and environments that support ECMAScript modules, top-level await is allowed within module files. This allows you to use await at the top level of a module without wrapping it in an async function. However, in non-module environments or older browsers, top-level await is not supported, and you need to wrap the code in an immediately invoked async function.

7. **Promise.all with Async/Await**: Async/await works seamlessly with `Promise.all`, which allows you to wait for multiple promises to resolve concurrently. You can use `await` with `Promise.all` to wait for all promises in an array to settle and then retrieve their results collectively.

In summary, async/await provides a more intuitive and readable way to work with asynchronous code in JavaScript, simplifying error handling and improving code organization compared to traditional promise chains or callback-based approaches.

# Queries

Let's break down key aspects of how the provided code in the `queries/songs.js` file interacts with the setup for PostgreSQL connection and querying:

```js
const db = require('../db/dbConfig');

const getAllSongs = async () => {
    try {
        const allSongs = await db.any('SELECT * FROM songs')
        return allSongs;
    } catch (error) {
        return error
    }
};

module.exports = { getAllSongs };
```

1. **`const db = require('../db/dbConfig');`**:
   - This line imports the `dbConfig` module from the `../db` directory. Presumably, this module sets up and exports a connected instance of `pg-promise` configured with database connection details.

2. **`await db.any('SELECT * FROM bookmarks')`**:
   - Here, `db` is used to perform a query on the database. The `any()` method is a function provided by `pg-promise` that allows executing arbitrary SQL queries. In this case, it's executing a simple query to select all records from the `bookmarks` table in the database.

# db.oneOrNone vs db.one

The two `getBookmark` functions appear to be similar, but they use different methods from the `db` object to retrieve data from the database.

1. The first `getBookmark` function uses `db.one()`, which retrieves exactly one row from the database. If no row is found or if more than one row is found, it will throw an error. This means that this function expects there to be exactly one bookmark with the provided `id`. If no bookmark is found, it will return an error object.

2. The second `getBookmark` function uses `db.oneOrNone()`, which retrieves at most one row from the database. If no row is found, it returns `null` instead of throwing an error. This means that this function can handle cases where no bookmark is found with the provided `id` by returning `null`.

So, the main difference lies in how they handle cases where no bookmark is found with the provided `id`. The first function throws an error, while the second function returns `null`. If a bookmark is found, both functions return the bookmark object. 

If you're sure that there will always be a bookmark with the provided `id`, then the functionality of both functions will be effectively the same. However, if there's a possibility of the bookmark not existing, the second function provides a safer approach by not throwing an error in that case.

```js
const getBookmark = async (id) => {
  try {
    const oneBookmark = await db.one('SELECT * FROM bookmarks WHERE id=$1', id); 
    return oneBookmark;
  } catch (error) {
    return error;
  }
};
```
vs

```js
const getBookmark = async (id) => {
  try {
      const oneBookmark = await db.oneOrNone('SELECT * FROM bookmarks WHERE id=$1', [id]); // db.oneOrNone() expects id to be an array
      return oneBookmark;
  } catch (error) {
      return error;
  }
};
```
### id vs [id]

The difference between `[id]` and `id` lies in how the parameter is passed to the SQL query.

In the first function:
```javascript
const oneBookmark = await db.one('SELECT * FROM bookmarks WHERE id=$1', id);
```
The `id` parameter is directly substituted into the SQL query string using the `$1` placeholder. This is a common practice in libraries like `pg-promise`, where query parameters are directly substituted into the query string to prevent SQL injection attacks. 

In the second function:
```javascript
const oneBookmark = await db.oneOrNone('SELECT * FROM bookmarks WHERE id=$1', [id]);
```
The `id` parameter is passed as an array `[id]`. This is because the `pg-promise` library expects query parameters to be passed as an array, even if there's only one parameter. So, even though there's only one parameter, it's still passed as an array `[id]`.

Both methods are valid and safe from SQL injection, but they just follow different conventions of how query parameters are passed to the SQL query. Ultimately, both versions achieve the same result in this context.