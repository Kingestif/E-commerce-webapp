// CREATING SERVER and API
const fs = require('fs');
const http = require('http');
const { start } = require('repl');
const url = require('url');

const products = fs.readFileSync('product.json', 'utf-8');
const product = JSON.parse(products);

const cardsPage = fs.readFileSync('cards.html', 'utf-8');
const homePage = fs.readFileSync('home.html', 'utf-8');
const detailsPage = fs.readFileSync('details.html', 'utf-8');

const server = http.createServer((req, res) => {
    // console.log(url.parse(req.url));        //detail url(we hold the pathname thats used for routing)
    const { query, pathname } = url.parse(req.url, true);  // http://127.0.0.1:8000/product?id=3 for ex here /product is the pathname and id = 3 is the query

    if (pathname === '/' || pathname === '/home') {
        // iterate over the JSON and update each variables then display it on webpage, (/{object_name}/g will select all Global variables with this name)
        let allcards = '';
        for (const i in product) {
            let updated_card = cardsPage.replace(/{PRODUCT_NAME}/g, product[i].name);
            updated_card = updated_card.replace(/{PRODUCT_ID}/g, product[i].id);      //update the previous output rather than on cardsPage again to not lose previous updated data.
            updated_card = updated_card.replace(/{PRODUCT_PRICE}/g, product[i].price);
            updated_card = updated_card.replace(/{PRODUCT_DESC}/g, product[i].description);
            updated_card = updated_card.replace(/{PRODUCT_ID}/g, product[i].id);
            updated_card = updated_card.replace(/{PRODUCT_IMG}/g, product[i].imageUrl);

            allcards += updated_card;
        }

        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        let final = homePage.replace(/{PRODUCT_CARDS}/g, allcards);
        res.end(final);
    }

    else if (pathname === '/product') {    //details page
        i = query.id - 1;

        let updated_details = detailsPage.replace(/{PRODUCT_NAME}/g, product[i].name);
        updated_details = updated_details.replace(/{PRODUCT_ID}/g, product[i].id);
        updated_details = updated_details.replace(/{PRODUCT_PRICE}/g, product[i].price);
        updated_details = updated_details.replace(/{PRODUCT_DESC}/g, product[i].description);
        updated_details = updated_details.replace(/{PRODUCT_ID}/g, product[i].id);
        updated_details = updated_details.replace(/{PRODUCT_IMG}/g, product[i].imageUrl);

        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        res.end(updated_details);
    }

    else if (pathname === '/api') {
        console.log(product[0]['description']);

        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(products);

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Page not found!</h1>');
    }

});

server.listen('8000', '127.0.0.1', () => {
    console.log('Listening to request on port 8000');
});


//packages
// npm install nodemon --global , installs a package globally
// npm run start, refer scripts file on package json
// nodemon index.js, restart server whenever there is change on our code
// npm update slugify 









