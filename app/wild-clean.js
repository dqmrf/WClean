var WildClean = (function(window, document, undefined) {
    "use strict";

    function WildClean(incoming) {
        this._incoming = incoming;

        this._setData();
        this._applyForAll(this.init);
    }

    WildClean.prototype.init = function(elem, test) {
        this._elem = elem;
        this._wpapper = null;

        this._setInstance();
        this._buildExtraTemplates();
    }

    WildClean.prototype._applyForAll = function(callback) {
        var incoming = this._incoming;
        var args = Array.prototype.slice.call(arguments, 1);

        if (wcleanIsNodeElement(incoming)) {
            args.unshift(incoming);
            callback.apply(this, args);
        } else if (wcleanIsNodeList(incoming)) {
            for (var i = 0; i < incoming.length; i++) {
                args.unshift(incoming[i]);
                callback.apply(this, args);
                args.shift();
            }
        }
    };

    WildClean.prototype._buildExtraTemplates  = function() {
        var elem = this._elem;

        this._wrap();
        // this._applyForAll(this._unwrap);
    }

    WildClean.prototype._wrap = function() {
        var elem = this._elem;
        var wrapper = this._wpapper = document.createElement('div');

        wrapper.classList = 'WClean-wrapper WClean-outer';
        wrapper.dataset.wcleanWrapper = true;
        elem.parentNode.insertBefore(wrapper, elem);
        wrapper.appendChild(elem);
    }

    WildClean.prototype._unwrapAll = function() {
        this._applyForAll(this._unwrap);
    }

    WildClean.prototype._unwrap = function(elem) {
        var wrapper = this._wpapper;
        console.log('unwrap');
        wrapper.parentNode.insertBefore(this._elem, wrapper);
        wrapper.parentNode.removeChild(wrapper);
        this._wpapper = null;
    }

    WildClean.prototype._setData = function() {
        if (!WildClean.data) {
            WildClean.data = {};
        }
        this._data = WildClean.data;
    }

    WildClean.prototype._setInstance = function() {
        if (!this._data.instance) {
            this._data.instance = 0;
        }
        this._data.instance++;
    }

    return WildClean;
}(window, document, undefined));