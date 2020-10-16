const fs = require('fs-extra');

// First make sure to npm install bootstrap, jquery, @popperjs/core, --save @fortawesome/fontawesome-free
exports.updatePackages = function () {
    // Copying CSS files
    fs.copy('node_modules/bootstrap/dist/css/bootstrap.min.css', 'public/styles/bootstrap.min.css');
    fs.copy('node_modules/bootstrap/dist/css/bootstrap.min.css.map', 'public/styles/bootstrap.min.css.map');
    fs.copy('node_modules/@fortawesome/fontawesome-free/css/all.min.css', 'public/styles/fontawesome.min.css');
    fs.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts');

    // Copying JS files
    fs.copy('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'public/scripts/bootstrap.bundle.min.js');
    fs.copy('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map', 'public/scripts/bootstrap.bundle.min.js.map');
    fs.copy('node_modules/jquery/dist/jquery.min.js', 'public/scripts/jquery.min.js');
    fs.copy('node_modules/@popperjs/core/dist/umd/popper.min.js', 'public/scripts/popper.min.js');
    fs.copy('node_modules/@popperjs/core/dist/umd/popper.min.js.map', 'public/scripts/popper.min.js.map');
}