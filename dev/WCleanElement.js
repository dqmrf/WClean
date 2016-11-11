var WCleanElement = (function(window, document, undefined) {
    "use strict";

    function WCleanElement(select) {
        this._select = select;
        this._wpapper = null;

        this.init();
    }

    WCleanElement.prototype.init = function() {
        var select = this._select;

        this._buildTemplates();
    };

    WCleanElement.prototype._buildTemplates = function() {
        this._wrap();
    };

    WCleanElement.prototype._wrap = function() {
        var select = this._select;
        var wrapper = this._wpapper = document.createElement('div');

        select.dataset.wcleanSelect = true;
        wrapper.classList = 'WClean-wrapper WClean-outer';
        wrapper.dataset.wcleanWrapper = true;
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
    };

    WCleanElement.prototype._unwrap = function() {
        var select = this._select;
        var wrapper = this._wpapper;

        wrapper.parentNode.insertBefore(select, wrapper);
        wrapper.parentNode.removeChild(wrapper);
        this._wpapper = null;
    };

    return WCleanElement;
}(window, document, undefined));