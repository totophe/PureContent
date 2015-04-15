# PureContent

PureContent is a light static "CMS" system allows you to easily build and maintain a static website

PureContent uses Nunjucks for it's templating system, but you are free to adapt it to any other templating system you would like.

At the moment, PureContent is more a proof of concept than anything else, but feel free to contribute.

## Install

To install the system, run the following command:

```npm install```

## Development

When you start developing your website, you can launch the following command:

```npm start```

This will launch a web server and track your changes to update it live

The ./src folder should contain at least this a /templates folder and the /app/config/parameters.json file.

The ./web folder should stay empty and not be committed at any time. Uses the folder ./src/static to put all your static content.

## Production

NOT IMPLEMENTED YET (You can just use the result from the /web though)

When you are ready to build the production version, just use:

```npm build``` 

It will generate the static "production" version of your website that you can upload online


## Tools

https://mozilla.github.io/nunjucks/