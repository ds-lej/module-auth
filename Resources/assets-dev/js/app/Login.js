/**
 * Login view
 *
 * @class Auth.Login
 * @extends Ext.window.Window
 */
Ext.define('Auth.Login', {
    extend: 'Ext.window.Window',
    xtype: 'xLogin',

    title: 'Login',
    bodyPadding: 10,
    width: 320,
    closable: false,
    autoShow: true,
    resizable: false,
    draggable: false,

    urlLogin: Cfg.urlExt('auth/login'),

    formLogin: null,

    constructor: function()
    {
        this.createFormLogin();
        this.items = [this.formLogin];
        this.callParent();
    },

    createFormLogin: function()
    {
        this.formLogin = Ext.create({
            xtype: 'form',
            reference: 'form',
            bodyStyle: 'background:transparent;',
            defaultType: 'textfield',
            border: false,
            items: [{
                name: 'username',
                fieldLabel: 'Email',
                allowBlank: false,
                emptyText: 'Email'
            }, {
                name: 'password',
                inputType: 'password',
                fieldLabel: 'Password',
                allowBlank: false,
                emptyText: 'Password'
            }, {
                xtype: 'checkbox',
                fieldLabel: 'Remember me',
                name: 'remember'
            }],
            buttons: [{
                text: 'Login',
                formBind: true,
                scope: this,
                handler: function() {
                    this.submitFormLogin();
                }
            }]
        });
    },

    submitFormLogin: function()
    {
        this.formLogin.getForm().submit({
            url: this.urlLogin,

            success: function(form, action) {
                Cfg.log('success', arguments);
                // Ext.MessageBox.alert('Авторизация пройдена. ',action.result.message);
            },

            failure: function(form, action) {
                Msg.ajaxError(action.response);
            }
        });
    }
});
