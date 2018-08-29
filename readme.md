[![Build Status][travis-image]][travis-url]

# express-https-static-skeleton

an express, https static web application

## toc
* [installation](#installation)
    * [install dependencies](#install-dependencies)
    * [config](#config)
    * [local ssl](#local-ssl)
* [assets](#assets)
    * [static](#static)
    * [dynamic](#dynamic)
* [templates](#templates)
    * [data](#data)
    * [partials](#partials)
    * [pages](#pages)
* [run the application locally](#run-the-application-locally)
* [running behind a proxy](#running-behind-a-proxy)

## installation
```javascript
git clone https://github.com/dan-nl/express-https-static-skeleton.git
```

### install dependencies
```javascript
npm i
```

### config
create and alter the following config files as appropriate based on the `.example` file:

* `./config/app/config.js`
* `./config/build/config.js`

### local ssl
you’ll need to create a local ssl certificate if you don’t already have one; here’s [an article][ssl-article] that walks you through setting one up on a mac.

you can then add the ssl certificate and key to your local environment, so that they’re available to the application config. here’s an example of how you can add the environment variables using the `.bash_profile` file in your user directory.

```sh
# ssl env
[ -f $HOME/ssl/server.key ] && export SSL_KEY=$HOME/ssl/server.key
[ -f $HOME/ssl/server.crt ] && export SSL_CRT=$HOME/ssl/server.crt
```

## assets
### static
files and directories in `./frontend/assets/static/` are copied directly to the `./public` folder when the site is built.

for example:
* `./frontend/assets/static/images` are copied to `./public/images`

### dynamic
you can also add your own frontend workflow with [webpack][webpack-url] or [webpack encore][webpack-encore-url] in order to build your application’s styling and/or javascript application. one possible location for those files might be in in `./frontend/assets/scss` and `./frontend/assets/js`.

## templates
the application uses [`hjs`][hjs-url] templates to build static pages.

### data
data is provided to the templates via corresponding `.js` files.

for example:
* `./frontend/templates/data/pages.js` provides data that is available to all templates
* `./frontend/templates/data/index.js` and others following this pattern provide page specific data
     * the above example provides data specifcially to the `./frontend/templates/pages/index.hjs` page
* `./frontend/templates/pages/subpage/data-page.js` provides data specifically for the `./frontend/templates/pages/subpage/data-page.hjs` page

### partials
`./frontend/templates/partials`

template partials can be used by any page.

template partials are dynamically added to the application, so add them as necessary to this directory and they will be available to your page templates.

### pages
`./frontend/templates/pages`

pages are dynamically added to the public directory. they define the structure/hierarchy of the static site and its content.

* the template name becomes `<template-name>.html`
* the directory location becomes the url

for example:
 * `./frontend/pages/index.hjs` becomes `https://localhost:3000/`
 * `./frontend/pages/subpage/data-page.hjs` becomes `https://localhost:3000/subpage/data-page.html`

## run the application locally
the npm start script will:

* build the public directory
    * compile all pages, which includes the partial templates and any data they use
        * write the resulting pages as `.html` files in the `./public` directory
    * copy all `./frontend/assets/static` files and directories directly to the `./public` directory
* start the express webserver on the port specified in `config/app/config.js`, which is set to `3001` in the `.example` file; https://localhost:3000/
* set a watcher to re-build the public directory when any change is made to a file in the `./frontend` directory

```javascript
npm start
```

## running behind a proxy
the `./bin/www` script will:

* build the public directory
* start the express webserver on the port specified in `config/app/config.js`, which is set to `3001` in the `.example` file.

### pm2
on your web server, behind a proxy, you could use [pm2][pm2-url] to start the application:

```javascript
pm2 start ./bin/www
```

## license
[MIT License][mit-license]

[mit-license]: https://raw.githubusercontent.com/dan-nl/express-https-static-skeleton/master/license.txt
[travis-image]: https://travis-ci.org/dan-nl/express-https-static-skeleton.svg?branch=master
[travis-url]: https://travis-ci.org/dan-nl/express-https-static-skeleton
[image-credit]: https://americanheritagetrees.org/
[hjs-url]: https://www.npmjs.com/package/hjs
[pm2-url]: https://pm2.io/doc/en/runtime/overview/
[ssl-article]: https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec
[webpack-url]: https://webpack.js.org/
[webpack-encore-url]: https://www.npmjs.com/package/@symfony/webpack-encore
