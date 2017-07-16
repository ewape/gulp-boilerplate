let css = require('./css');

module.exports = {
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
    css: css,
    "faviconDataFile": "./gulp/config/faviconData.json",
    "fontList": "./gulp/config/fonts.list",
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