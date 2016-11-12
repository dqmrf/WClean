/**
 * WClean - JavaScript Library.
 * @description Custom Select for web applications written in clean JavaScript.
 * @author Misha Pelykh.
 * @version [in the development].
 */
var WClean = (function(window, document, undefined) {
    "use strict";

    var hp_ = WCleanHelpers;
    var defaultOptions = WClean.defOptions = {
        extraClass: false,
        dropdownIcon: false,
        animation: false,
        animationDuration: 0.2
    };

    function WClean(inputValue, options) {
        this._inputValue = inputValue;
        this._elems = [];
        this._options = hp_.extend(defaultOptions, options);

        this.init();
    }

    WClean.prototype._createChild = function(node) {
        if ( hp_.isNodeElement(node) && node.tagName == 'SELECT' ) {
            var child = new WCleanElement(node, this._options);
            this._elems.push(child);
        }
    };

    WClean.prototype.init = function() {
        var inputValue = this._inputValue;

        if (hp_.isNodeElement(inputValue)) {
            this._createChild(inputValue);
        } else if (hp_.isNodeList(inputValue) && inputValue.length) {
            for (var i = 0; i < inputValue.length; i++) {
                this._createChild(inputValue[i]);
            }
        }
    };

    WClean.prototype.destroy = function() {
        this._elems.forEach(function(elem, i) {
            elem.destroy();
        });
    };

    return WClean;
}(window, document, undefined));