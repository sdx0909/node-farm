// requiring the `http` modules
const http = require('http');
const fs = require('fs');
const slugify = require('slugify');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
// SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((ele) =>
  slugify(ele.productName, {
    lower: true,
  })
);
console.log(slugs);
// console.log(
//   slugify("Fresh Avacados", {
//     lower: true,
//   })
// );

const server = http.createServer((req, res) => {
  // console.log(`req.url >${req.url}`);
  const { query, pathname } = url.parse(req.url, true);

  // console.log(pathname);
  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    const cardsHtml = dataObj
      .map((ele) => replaceTemplate(tempCard, ele))
      .join(''); // making array to whole string
    // console.log(cardsHtml);
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    const product = dataObj[query.id];

    const output = replaceTemplate(tempProduct, product);
    // res.end("This is the PRODUCT");
    res.end(output);
    // console.log(query);

    // API page
  } else if (pathname === '/api') {
    // console.log(dataObj);
    res
      .writeHead(200, {
        'Content-Type': 'application/json',
      })
      .end(data);

    // Page not found
  } else {
    res
      .writeHead(404, {
        'Content-Type': 'text/html',
      })
      .end('<h1>Page not found!</h1>');
  }
});

// listening the server at 8000 PORT
server.listen(8000, '127.0.0.1', () => {
  console.log('server is listening at 8000 port');
});
