/**
 * Auth application
 */
Ext.define('Auth.Auth', {
    name: 'Auth',
    xtype: 'xAuth',

    pBar: null,
    rBtn: null,
    pBarContainer: null,

    urlCheckAuth: Cfg.api('auth'),

    /**
     * Constructor
     */
    constructor: function ()
    {
        // Show Logo and ProgressBar
        this.pBar = this.createProgressBar();
        this.rBtn = this.createReloadBtn();
        this.pBarContainer = this.createContainer();
        this.pBar.run();

        // Check auth
        this.checkAuth();
    },

    /**
     * Check auth
     */
    checkAuth: function()
    {
        let me = this;

        Ajax.request({
            url: this.urlCheckAuth,

            success: function(res, opts)
            {
                let data = Ext.decode(res.responseText);
                me.pBar.progress = 1;

                me.pBarContainer.getEl().fadeOut({
                    duration: 600,
                    callback: function() {
                        if (! data.status)
                            Ext.create({ xtype: 'xLogin' });
                        me.pBarContainer.destroy();
                    }
                });
            },

            failure: function(res, opts)
            {
                me.pBar.kill();
                me.pBar.getEl().fadeOut({
                    duration: 600,
                    callback: function() {
                        me.rBtn.show().alignTo(me.pBarContainer, 'c-c');
                    }
                });
                Msg.ajaxError(res);
            }
        });
    },

    /**
     * Create ProgressBar
     * @returns {Ext.ProgressBar}
     */
    createProgressBar: function ()
    {
        return Ext.create('Ext.ProgressBar', {
            renderTo: Ext.getBody(),
            region: 'center',
            style: 'border-radius: 4px',
            border: false,
            width: 300,
            height: 100,

            intervalID: null,
            progress: 0,

            run: function() {
                let increment   = 0.0012, // from - 0.001  to - 0.5
                    slowedPoint = 0.2;    // from - 0.1    to - 0.9

                let mePB = this,
                    sections = increment/((1-slowedPoint)/increment),
                    dec = 0;

                mePB.progress   = 0;
                mePB.intervalID = setInterval(function () {
                    if (mePB.progress > slowedPoint && (slowedPoint+increment) < 1) {
                        slowedPoint+=increment;
                        dec+=sections;
                    }
                    mePB.progress+=increment-dec;
                    if (mePB.progress > 0 && mePB.progress < 1)
                        mePB.updateProgress(mePB.progress);
                    else {
                        mePB.updateProgress(mePB.progress=1);
                        mePB.kill();
                    }
                }, 1);
            },

            kill: function () {
                if (this.intervalID !== null)
                    clearInterval(this.intervalID);
            }
        });
    },

    /**
     * Create reload app button
     * @return {Ext.button}
     */
    createReloadBtn: function()
    {
        return Ext.create('Ext.Button', {
            iconCls: 'fa fa-refresh',
            text: 'Reload',
            hidden: true,
            height: 40,
            padding: '0 6',
            renderTo: Ext.getBody(),
            handler: function() {
                window.location.reload();
            }
        });
    },

    /**
     * Create container for ProgressBar
     * @returns {Ext.container.Container}
     */
    createContainer: function ()
    {
        return Ext.create('Ext.container.Container', {
            renderTo: Ext.getBody(),
            height: '100vh',
            id: 'mainLoaderContainer',
            layout: {
                type:  'vbox',
                align: 'center',
                pack:  'center'
            },
            items: [
                this.pBar,
                this.rBtn
            ]
        });
    }
});
