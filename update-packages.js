const fs = require('fs-extra');

exports.update = function () {
    // npm install bootstrap, jquery, @popperjs/core, --save @fortawesome/fontawesome-free
    fs.copy('node_modules/bootstrap/dist/css/bootstrap.min.css', 'public/styles/bootstrap.min.css');
    fs.copy('node_modules/bootstrap/dist/css/bootstrap.min.css.map', 'public/styles/bootstrap.min.css.map');
    fs.copy('node_modules/@fortawesome/fontawesome-free/css/all.min.css', 'public/styles/fontawesome.min.css');
    fs.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts');

    fs.copy('node_modules/bootstrap/dist/js/bootstrap.min.js', 'public/scripts/bootstrap.min.js');
    fs.copy('node_modules/bootstrap/dist/js/bootstrap.min.js.map', 'public/scripts/bootstrap.min.js.map');
    fs.copy('node_modules/jquery/dist/jquery.min.js', 'public/scripts/jquery.min.js');
    fs.copy('node_modules/@popperjs/core/dist/umd/popper.min.js', 'public/scripts/popper.min.js');
    fs.copy('node_modules/@popperjs/core/dist/umd/popper.min.js.map', 'public/scripts/popper.min.js.map');
}