require('./app/Login');
require('./app/Auth');

Ext.on('LejAppInit', function() {
    Ext.create({ xtype: 'xAuth' });
});