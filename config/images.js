// imagemin settings

let pngquant = require('imagemin-pngquant');
let paths = require('./config').paths;

module.exports = {

    // Imagemin options
    imageminOptions: {
        verbose: true,
        plugins: [
            pngquant({
                speed: 10,
                quality: "65-80"
            })
        ]
    },

    // SVG sprite settings
    svgConfig: {
        //log: 'debug', // info, verbose, debug
        dest: '.',
        mode: {
            symbol: {
                inline: true,
                sprite: '../../' + paths.src + 'html/templates/partials/symbol.njk',
                example: {
                    dest: '../../' + paths.docs + 'symbol.html'
                }
            }
        },
        shape: {
            dimension: {
                maxWidth: 100,
                maxHeight: 100
            },
            id: {
                generator: 'icon-%s',
                whitespace: '-'
            },
            spacing: {
                padding: 0
            }
        }
    }
};
