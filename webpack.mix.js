const mix = require('laravel-mix');

mix.setPublicPath('../../public/assets');
mix.js(__dirname + '/Resources/assets-dev/js/app.js', '/modules/auth/auth.js');

if (mix.inProduction())
    mix.copy(Config.publicPath + '/modules/auth/auth.js', __dirname + '/Resources/assets/auth.js');
