# NODE jS

- [Github Link](https://github.com/jonasschmedtmann/complete-node-bootcamp)

## Using `fs` Module

- The `fs` means `File System` module used for handling File releted manipulations.
- The file handling can be done in 2 ways:
  1. **Synchrounos Way**
  2. **Asynchronous Way**

### 1. Blocking, Synchronous Way

- Blocking operations are `synchronous`, meaning the code execution `halts` or `waits` until the operation completes.
- During a `blocking call`, the `Node.js event loop` is `stopped` from _processing any other tasks_.

- in **Blocking** or **Synchronous Way** of file handling following methods are used for file reading and writing.
  1. `fs.readFileSync()`
  2. `fs.writeFileSync()`
- first, you have to create a folder and a file in root folder as `txt/` folder and `index.js` file:
- now we create the `input.txt` file in `txt/` folder and write below content:

```txt
The avocado 🥑 is popular in vegetarian cuisine as a substitute for meats in sandwiches and salads because of its high fat content 😄
```

- after that you have to write the following code in `index.js` for reading data from `input.txt` file.
- and also write this data into `output.txt` file with synchronous methods:

```js
const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `this is what we know about Avacado: ${textIn}\n  Created at : ${Date.now()}`;

fs.writeFileSync("./txt/output.txt", textOut);
console.log("file Written!");
```

- Here, `fs.readFileSync()` method has two arguments `1st` is `file-path` and `2nd` is `encoding-option`.
- and also `fs.writeFileSync()` method has two arguments like above `file-path` and `data` that we want to write into file.

- Now `run` this program using node as:

  ```cmd
  node index.js
  ```

### 2. Non-Blocking, Asynchronous Way

- `Non-blocking` operations are `asynchronous`.
- The operation starts, and `Node.js` moves on to _execute the next lines of code without waiting._
- These operations use `callbacks`, `promises`, or `async/await` to handle the `result` once the operation completes.
- `Non-blocking` behavior **keeps the event loop free to handle other events** or **incoming requests**, making _Node.js highly scalable_.
- in **Non-Blocking** or **Asynchronous Way** of file handling following methods are used for file reading and writing.

  1. `fs.readFile()`
  2. `fs.writeFile()`

- in the following code we `read` the data from `start.txt` file and as well as `write` the `readed data` into `final.txt` file.
- Here, We have to create a new file in `txt/` folder named `start.txt` and write following code:

```txt
Generally, avocados 🥑 are served raw, but some cultivars can be cooked for a short time without becoming bitter.
```

- Now, we have to write the following code:

```js
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) console.log("ERROR!");

  // write the readed data into `final.txt` file
  fs.writeFile("./txt/final.txt", data, "utf8", (err) => {
    console.log("File Written Successfully!");
  });
});
console.log("will read file!");
```

- Here, `fs.readFile()` method has `three` arguments `1st` is `file-path` and `2nd` is `encoding-option` and last is `callback function` has two arguments `1st` one is `error` and ohter is `data`.
- and also `fs.writeFile()` method has `three` arguments like above `file-path` and `2nd` is `data` which we have to write in file and last one is `callback function` has one arguement which is `error`.

- Here we have following example that shows the `callback hell` in the code.
- make sure we have a file called `start.txt` in this file we explicitely write the text as: `read-this` only.
- then write new code in `index.js` as:

```js
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) {
    return console.log("ERROR!!");
  }
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      // writing the two file in one file
      fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("File Written Successfully!");
      });
    });
  });
});
console.log("Will read file!");
```

## Using `http` Module

- creating simple server using `http` module as:

```js
// requiring the `http` module
const http = require("http");

// creating the server using `createServer()`
const server = http.createServer((req, res) => {
  res.end("Hello from Server!!");
});

// listening the server at 8000 PORT
server.listen(8000, "127.0.0.1", () => {
  console.log("server is listening at 8000 port");
});
```

- we can use with other routes as like:

```js
const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);
  if (url === "/") {
    res.end("Hello from Server!!");
  } else if (url === "/about") {
    res.end("About Page");
  } else if (url === "/product") {
    res.end("Product Page");
  } else {
    res
      .writeHead(404, {
        "Content-Type": "text/html",
      })
      .end("<h1>Page Not Found</h1>");
  }
});
```

## Building a Simple API

- for building a Simple API Program we need a `json` file. for that we have to create a folder `dev-data/` in this folder create a new `json` file as `data.json` and write below code:

```json
[
  {
    "id": 0,
    "productName": "Fresh Avocados",
    "image": "🥑",

    "from": "Spain",
    "nutrients": "Vitamin B, Vitamin K",
    "quantity": "4 🥑",
    "price": "6.50",
    "organic": true,
    "description": "A ripe avocado yields to gentle pressure when held in the palm of the hand and squeezed. The fruit is not sweet, but distinctly and subtly flavored, with smooth texture. The avocado is popular in vegetarian cuisine as a substitute for meats in sandwiches and salads because of its high fat content. Generally, avocado is served raw, though some cultivars, including the common 'Hass', can be cooked for a short time without becoming bitter. It is used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices."
  },
  {
    "id": 1,
    "productName": "Goat and Sheep Cheese",
    "image": "🧀",
    "from": "Portugal",
    "nutrients": "Vitamin A, Calcium",
    "quantity": "250g",
    "price": "5.00",
    "organic": false,
    "description": "Creamy and distinct in flavor, goat cheese is a dairy product enjoyed around the world. Goat cheese comes in a wide variety of flavors and textures, from soft and spreadable fresh cheese to salty, crumbly aged cheese. Although it’s made using the same coagulation and separation process as cheese made from cow’s milk, goat cheese differs in nutrient content."
  },
  {
    "id": 2,
    "productName": "Apollo Broccoli",
    "image": "🥦",
    "from": "Portugal",
    "nutrients": "Vitamin C, Vitamin K",
    "quantity": "3 🥦",
    "price": "5.50",
    "organic": true,
    "description": "Broccoli is known to be a hearty and tasty vegetable which is rich in dozens of nutrients. It is said to pack the most nutritional punch of any vegetable. When we think about green vegetables to include in our diet, broccoli is one of the foremost veggies to come to our mind. Broccoli is a cruciferous vegetable and part of the cabbage family, which includes vegetables such as Brussel sprouts and kale. Although the tastes are different, broccoli and these other vegetables are from the same family."
  },
  {
    "id": 3,
    "productName": "Baby Carrots",
    "image": "🥕",
    "from": "France",
    "nutrients": "Vitamin A, Vitamin K",
    "quantity": "20 🥕",
    "price": "3.00",
    "organic": true,
    "description": "The carrot is a root vegetable that is often claimed to be the perfect health food. It is crunchy, tasty and highly nutritious. Carrots are a particularly good source of beta-carotene, fiber, vitamin K, potassium and antioxidants. Carrots have a number of health benefits. They are a weight loss friendly food and have been linked to lower cholesterol levels and improved eye health."
  },
  {
    "id": 4,
    "productName": "Sweet Corncobs",
    "image": "🌽",
    "from": "Germany",
    "nutrients": "Vitamin C, Magnesium",
    "quantity": "2 🌽",
    "price": "2.00",
    "organic": false,
    "description": "Also known as maize, corn is one of the most popular cereal grains in the world. Popcorn and sweet corn are commonly eaten varieties, but refined corn products are also widely consumed, frequently as ingredients in foods. These include tortillas, tortilla chips, polenta, cornmeal, corn flour, corn syrup, and corn oil. Whole-grain corn is as healthy as any cereal grain, rich in fiber and many vitamins, minerals, and antioxidants."
  }
]
```

- After that write new code in `index.js` as:

```js
// requiring the `http` module
const http = require("http");
const fs = require("fs");

const data = fs.readFileSync("./dev-data/data.json", "utf8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  console.log(pathName);
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/about") {
    res.end("This is the ABOUT");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    // console.log(dataObj);
    res
      .writeHead(404, {
        "Content-Type": "application/json",
      })
      .end(data);
  } else {
    res
      .writeHead(404, {
        "Content-Type": "application/html",
        "my-own-header": "hello-world",
      })
      .end("<h1>PAGE NOT FOUND</h1>");
  }
});

// listening the server at 8000 PORT
server.listen(8000, "127.0.0.1", () => {
  console.log("server is listening at 8000 port");
});
```

## Building Node-Farm Dynamic Website

### Simple API based Website

- to build the `Node-Farm` Dynamic website we need following two html files for building the UI.
- here, we have to create a folder named `templates/` in this we have to create `overwiew.html` and `product.html` file and write code as:

`overview.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- links and meta tags -->

    <title>NODE FARM</title>

    <style>
      /* other-styles */

      .not-organic {
        display: none;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h1>🌽 Node Farm 🥦</h1>

      <!-- 1st product -->
      <div class="cards-container">
        <figure class="card">
          <div class="card__emoji">🥑🥑</div>

          <div class="card__title-box">
            <h2 class="card__title">Fresh Avocado</h2>
          </div>

          <div class="card__details">
            <div class="card__detail-box">
              <h6 class="card__detail card__detail--organic">Organic!</h6>
            </div>

            <div class="card__detail-box">
              <h6 class="card__detail">4 🥑 per 📦</h6>
            </div>

            <div class="card__detail-box">
              <h6 class="card__detail card__detail--price">6.50€</h6>
            </div>
          </div>

          <a class="card__link" href="#">
            <span>Detail <i class="emoji-right">👉</i></span>
          </a>
        </figure>

        <!-- 2nd product -->
        <figure class="card">
          <div class="card__emoji">🧀🧀</div>
          <div class="card__title-box">
            <h2 class="card__title">Goat and Sheep Cheese</h2>
          </div>

          <div class="card__details">
            <div class="card__detail-box">
              <h6 class="card__detail">250g per 📦</h6>
            </div>

            <div class="card__detail-box">
              <h6 class="card__detail card__detail--price">5.00€</h6>
            </div>
          </div>

          <a class="card__link" href="#">
            <span>Detail <i class="emoji-right">👉</i></span>
          </a>
        </figure>

        <!-- 3rd,4th and so on...  -->
      </div>
    </div>
  </body>
</html>
```

`product.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- links and meat tags  -->

    <title>Fresh Avocados 🥑 /// NODE FARM</title>

    <style>
      /* other-styles */

      .not-organic {
        display: none;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h1>🌽 Node Farm 🥦</h1>

      <figure class="product">
        <div class="product__organic"><h5>Organic</h5></div>
        <a href="#" class="product__back">
          <span class="emoji-left">👈</span>Back
        </a>
        <div class="product__hero">
          <span class="product__emoji product__emoji--1">🥑</span>
          <span class="product__emoji product__emoji--2">🥑</span>
          <span class="product__emoji product__emoji--3">🥑</span>
          <span class="product__emoji product__emoji--4">🥑</span>
          <span class="product__emoji product__emoji--5">🥑</span>
          <span class="product__emoji product__emoji--6">🥑</span>
          <span class="product__emoji product__emoji--7">🥑</span>
          <span class="product__emoji product__emoji--8">🥑</span>
          <span class="product__emoji product__emoji--9">🥑</span>
        </div>
        <h2 class="product__name">Fresh Avocados</h2>
        <div class="product__details">
          <p><span class="emoji-left">🌍</span> From Portugal</p>
          <p><span class="emoji-left">❤️</span> Vitamin B, Vitamin K</p>
          <p><span class="emoji-left">📦</span> 4 🥑</p>
          <p><span class="emoji-left">🏷</span> 6.50€</p>
        </div>

        <a href="#" class="product__link">
          <span class="emoji-left">🛒</span>
          <span>Add to shopping card (6.50€)</span>
        </a>

        <p class="product__description">
          A ripe avocado yields to gentle pressure when held in the palm of the
          hand and squeezed. The fruit is not sweet, but distinctly and subtly
          flavored, with smooth texture. The avocado is popular in vegetarian
          cuisine as a substitute for meats in sandwiches and salads because of
          its high fat content. Generally, avocado is served raw, though some
          cultivars, including the common 'Hass', can be cooked for a short time
          without becoming bitter. It is used as the base for the Mexican dip
          known as guacamole, as well as a spread on corn tortillas or toast,
          served with spices.
        </p>
      </figure>
    </div>
  </body>
</html>
```

- after creating these files, we have to adding the `placeholders` to replace the data into html files for displaying dynamically data.
- here 1st we have to take `product.html` file.
- in this file we adding the placehoders in format like: `{%PLACEHOLDERNAME%}`.
- here we have to add the placeholder as like:

`product.html`

```html
<html>
  <head>
    <!-- links and styles -->
  </head>
  <body>
    <div class="container">
      <h1>🌽 Node Farm 🥦</h1>

      <figure class="product">
        <div class="product__organic {%NOT_ORGANIC%}"><h5>Organic</h5></div>
        <a href="/overview" class="product__back">
          <span class="emoji-left">👈</span>Back
        </a>
        <div class="product__hero">
          <span class="product__emoji product__emoji--2">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--3">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--4">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--1">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--5">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--6">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--7">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--8">{%IMAGE%}</span>
          <span class="product__emoji product__emoji--9">{%IMAGE%}</span>
        </div>
        <h2 class="product__name">{%PRODUCTNAME%}</h2>
        <div class="product__details">
          <p><span class="emoji-left">🌍</span> From {%FROM%}</p>
          <p><span class="emoji-left">❤️</span> {%NUTRIENTS%}</p>
          <p><span class="emoji-left">📦</span> {%QUANTITY%} 🥑</p>
          <p><span class="emoji-left">🏷️</span> {%PRICE%}€</p>
        </div>

        <a href="#" class="product__link">
          <span class="emoji-left">🛒</span>
          <span>Add to shopping card ({%PRICE%}€)</span>
        </a>

        <p class="product__description">{%DESCRIPTION%}</p>
      </figure>
    </div>
  </body>
</html>
```

- in above `<figure>` tag we replaced placahoders in following data:

  1. `Fresh Avocados` : `{%PRODUCTNAME%}`
  2. `🥑` : `{%IMAGE%}`
  3. `From Portugal` : `From {%FROM%}`
  4. `Vitamin B, Vitamin K` : `{%NUTRIENTS%}`
  5. `4 🥑` : `{%QUANTITY%} 🥑`
  6. `6.50€` : `{%PRICE%}€`
  7. `(6.50€)` : `({%PRICE%}€)`
  8. `description...` : `{%DESCRIPTION%}`

- for adding styling for non-oraganic we have to replace as like:

```html
<div class="product__organic {%NOT_ORGANIC%}"><h5>Organic</h5></div>
```

- Now our `product` template is completed so, rename this as `template-product.html`
- here, now we have to building the another template called `overview`. but in this we have to builds a new template named `template-card.html` from `overview` template.
- for building `template-card.html` file we have to take one `<figure>` code from `overview.html` file and paste it in this file.

`template-card.html`

```html
<figure class="card">
  <div class="card__emoji">🥑🥑</div>

  <div class="card__title-box">
    <h2 class="card__title">Fresh Avocado</h2>
  </div>

  <div class="card__details">
    <div class="card__detail-box">
      <h6 class="card__detail card__detail--organic">Organic!</h6>
    </div>

    <div class="card__detail-box">
      <h6 class="card__detail">4 🥑 per 📦</h6>
    </div>

    <div class="card__detail-box">
      <h6 class="card__detail card__detail--price">6.50€</h6>
    </div>
  </div>

  <a class="card__link" href="#">
    <span>Detail <i class="emoji-right">👉</i></span>
  </a>
</figure>
```

- now we replace the placeholders in this file as:

`template-card.html`

```html
<figure class="card">
  <div class="card__emoji">{%IMAGE%}{%IMAGE%}</div>

  <div class="card__title-box">
    <h2 class="card__title">{%PRODUCTNAME%}</h2>
  </div>

  <div class="card__details">
    <div class="card__detail-box">
      <h6 class="card__detail card__detail--organic {%NOT_ORGANIC%}">
        Organic!
      </h6>
    </div>

    <div class="card__detail-box">
      <h6 class="card__detail">{%QUANTITY%}{%IMAGE%}per📦</h6>
    </div>

    <div class="card__detail-box">
      <h6 class="card__detail card__detail--price">{%PRICE%}€</h6>
    </div>
  </div>

  <a class="card__link" href="/product?id={%ID%}">
    <span>Detail <i class="emoji-right">👉</i></span>
  </a>
</figure>
```

- here our `template-card.html` template is created.
- now we have to remove the code of `<figure>` tags from `overview.html` file and add new placeholder as:

`overview.html`

```html
<html>
  <head></head>
  <body>
    <div class="container">
      <h1>🌽 Node Farm 🥦</h1>

      <div class="cards-container">{%PRODUCT_CARDS%}</div>
    </div>
  </body>
</html>
```

- Here, our templates are now done, the `overview.html` page is replaced with placeholders so rename this file as `template-overview.html`.
- now we have three files named

  1. `template-card.html`
  2. `template-overview.html`
  3. `template-product.html`

- Now its time to filling the templates with their dynamic data.
- here we have `index.js` file as:

```js
// requiring the `http` modules
const http = require("http");
const fs = require("fs");
const url = require("url");

// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(`req.url >${req.url}`);
  const { query, pathname } = url.parse(req.url, true);

  // console.log(pathname);
  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.end("This is the OVERVIEW");

    // Product page
  } else if (pathname === "/product") {
    res.end("This is the PRODUCT");

    // API page
  } else if (pathname === "/api") {
    // console.log(dataObj);
    res
      .writeHead(200, {
        "Content-Type": "application/json",
      })
      .end(data);

    // Page not found
  } else {
    res
      .writeHead(404, {
        "Content-Type": "text/html",
      })
      .end("<h1>Page not found!</h1>");
  }
});

// listening the server at 8000 PORT
server.listen(8000, "127.0.0.1", () => {
  console.log("server is listening at 8000 port");
});
```

- Next step is to read the three template files and bind with object like:

```js
// SERVER
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf8"
);

// ...
```

- Now we create a function for replacing the actual data instead of placeholders.
- write the below code in `index.js` file as:

```js
// SERVER
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};

// ...
```

- Here the `replaceTemplate()` function will return the updated html file with their data instead of placeholders.
- now its time to update the functionality of request routes for `/overview` and `/product` as like:

```js
const server = http.createServer((req, res) => {
  const pathname = req.url;

  // console.log(pathname);
  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const cardsHtml = dataObj
      .map((ele) => replaceTemplate(tempCard, ele))
      .join(""); // making array to whole string
    // console.log(cardsHtml);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.end("This is the PRODUCT");

    // API page
  } else if (pathname === "/api") {
    // console.log(dataObj);
    res
      .writeHead(200, {
        "Content-Type": "application/json",
      })
      .end(data);

    // Page not found
  } else {
    res
      .writeHead(404, {
        "Content-Type": "text/html",
      })
      .end("<h1>Page not found!</h1>");
  }
});

// ...
```

- Now run the application :

  ```cmd
  node index.js
  ```

- here we showing the `overview` page but after clicking on `details` it will shows the `Page Not Found` page.
- for handling this situation we have a mechanism which is **parsing variables from URL**.
- here `url` module provides the data that we have to parse from `URL`.
- we can use to identify which product is requested for detils.
- now we add new code in `index.js` file.

```js
const url = require("url");
// ...

const server = http.createServer((req, res) => {
  // console.log(`req.url >${req.url}`);
  const { query, pathname } = url.parse(req.url, true);

  // console.log(pathname);
  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const cardsHtml = dataObj
      .map((ele) => replaceTemplate(tempCard, ele))
      .join(""); // making array to whole string
    // console.log(cardsHtml);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const product = dataObj[query.id];

    const output = replaceTemplate(tempProduct, product);
    // res.end("This is the PRODUCT");
    res.end(output);
    // console.log(query);

    // API page
  } else if (pathname === "/api") {
    // console.log(dataObj);
    res
      .writeHead(200, {
        "Content-Type": "application/json",
      })
      .end(data);

    // Page not found
  } else {
    res
      .writeHead(404, {
        "Content-Type": "text/html",
      })
      .end("<h1>Page not found!</h1>");
  }
});

// listening the server at 8000 PORT
server.listen(8000, "127.0.0.1", () => {
  console.log("server is listening at 8000 port");
});
```

- Now the project as:

  ```cmd
  node index.js
  ```

- Here our `NODE-FARM` project is finished.

- but here we make code is more readable and more simple for that we have to make `replaceTemplate()` as a seperate module.
- for that we create a folder called `modules/` in this folder we have to create a file called `replaceTemplate.js` and write below code in it.

```js
module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};
```

- after that we just requires the module in `index.js` file like:

```js
// requiring the moduls ...
const replaceTemplate = require("./modules/replaceTemplate");

// ...
```

_CONGRATULATIONS !!!_

**NODE-FARM** _Project is completed..._
