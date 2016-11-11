/**
 * WClean - JavaScript Library.
 * @description Custom Select for web applications written in clean JavaScript.
 * @author Misha Pelykh.
 * @version [in the development].
 */
var WClean = (function(window, document, undefined) {
    "use strict";

    /**
     * WClean - entry point.
     * @param inputValue
     */
    function WClean(inputValue) {
        this._inputValue = inputValue;
        this._children = [];

        this.init();
    }

    WClean.prototype.init = function() {
        var inputValue = this._inputValue;

        if (wcleanIsNodeElement(inputValue)) {
            this._createChild(inputValue);
        } else if (wcleanIsNodeList(inputValue) && inputValue.length) {
            for (var i = 0; i < inputValue.length; i++) {
                this._createChild(inputValue[i]);
            }
        }
    };

    WClean.prototype.destroy = function() {
        this._children.forEach(function(elem, i) {
            elem.destroy();
        });
    };

    WClean.prototype._createChild = function(node) {
        if ( wcleanIsNodeElement(node) && node.tagName == 'SELECT' ) {
            var child = new WCleanElement(node);
            this._children.push(child);
        }
    };

    return WClean;
}(window, document, undefined));