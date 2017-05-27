module.exports = {
    //config: {
    data: {
        "lang": "pl",
        "title": "Project title",
        "description": "Project description",
        "url": "http://localhost:3000/",

        "og": {
            "type": "website",
            "image": "http://localhost:3000/dist/images/js.png",
            "image_type": "image/png",
            "image_width": 200,
            "image_height": 200
        }
    },
    css: require('./css'),
    "faviconDataFile": "./config/faviconData.json",
    "fontList": "./config/fonts.list",
    paths: {
        "dist": "./dist/",
        "src": "./src/",
        "temp": "./temp/",
        "docs": "./docs/",
        "font": {
            "fontsDir": "../fonts",
            "cssDir": "../scss/modules/",
            "cssFilename": "_fonts.scss"
        }
    }

};
