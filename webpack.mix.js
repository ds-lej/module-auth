const mix = require('laravel-mix');
require('laravel-mix-merge-manifest');

mix.setPublicPath('../../public/assets').mergeManifest();

mix.js(__dirname + '/Resources/assets/js/app.js', '/modules/auth/auth.js');

if (mix.inProduction())
    mix.version();