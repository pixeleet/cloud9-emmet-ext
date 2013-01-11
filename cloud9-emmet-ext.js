/*!
 * Emmet for the Cloud9 IDE
 *
 * @copyright 2013, Rubens Mariuzzo, Mariuzzo.com
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */

// RequireJS configuration for non AMD dependencies.
requirejs.config({
    shim: {
        './vendors/underscore.js': {
            exports : '_'
        },
        './vendors/emmet-core.js' : {
            
            exports : 'emmet'
        }
    }
});

// Zen Coding Cloud9 extension.
define(function(require, exports, module) {

    // Cloud9 dependencies.
    var ext = require('core/ext');
    var menus = require('ext/menus/menus');
    var editors = require("ext/editors/editors");
    var commands = require('ext/commands/commands');
    
    // Cloud9 extension definition.
    module.exports = ext.register('ext/cloud9-emmet-ext/cloud9-emmet-ext', {

        // C9 Extension Properties

        name:    'Emmet Extension',
        dev:     'Rubens Mariuzzo',
        alone:   true,
        offline: false,
        type:    ext.GENERAL,
        nodes:   [],

        // C9 Extension Methods

        /**
         * Initialize the extension.
         */
        init: function(amlNode) { },

        /**
         * Hook the extension into the Cloud9 IDE.
         */
        hook: function() {
            
            var _self = this;
            
            // Prepare the menu.
            this.nodes.push(menus.addItemByPath('Tools/Emmet/', new apf.menu(), 900));
            
            // Emmet > Expand Abbreviation
            var mnuItemExpand = new apf.item({
                command:'expand',
                onclick: function(editor) {
                    _self.expand(editor);
                }
            });

            this.nodes.push(menus.addItemByPath('Tools/Emmet/Expand Abbreviation', mnuItemExpand, 910));
            
            commands.addCommand({
                name: 'expand',
                hint: 'expands CSS-like abbreviations into HTML/XML/CSS code, depending on current document’s syntax.',
                msg: 'Expanding abbreviation.',
                bindKey: {mac: 'Command-Shift-E', win: 'Shift-Ctrl-E'},
                isAvailable : function(editor){
                    return true;
                },
                exec: function (editor) {
                    _self.expand(editor);
                }
            });
            
            ext.initExtension(this);
        },

        /**
         * Enable the extension.
         */
        enable: function() {
            this.nodes.each(function(item) {
                item.enable();
            });
            this.disabled = false;
        },

        /**
         * Disable the extension.
         */
        disable: function() {
            this.nodes.each(function(item) {
                item.disable();
            });
            this.disabled = true;
        },

        /**
         * Destroy the extension depdendencies.
         */
        destroy: function() {
            
            // Restore the menu.
            menus.remove('Tools/Emmet');
            
            this.nodes.each(function(item) {
                item.destroy(true, true);
            });
            this.nodes = [];
        }

    });

});