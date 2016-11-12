/**
 * WClean - JavaScript Library.
 * @description Custom Select for web applications written in clean JavaScript.
 * @author Misha Pelykh.
 * @version 0.0.0 (in the development).
 */
var WClean = (function(window, document, undefined) {
    "use strict";

    function WClean(inputValue, options) {
        this._inputValue = inputValue;
        this._elems = [];
        this._options = hp_.extend($.defaults, options);

        this.init();
    }

    var hp_ = WCleanHelpers;
    var $ = WClean.global = {};

    $.defaults = {
        extraClass: false,
        dropdownIcon: false,
        animation: false,
        animationDuration: 0.2
    };

    $.instance = 0;

    $.elems = [];

    WClean.prototype = new Object({

        _setEventListeners: function() {
            if ($.instance !== 0) return;

            document.addEventListener('click', this._onClick);
            document.addEventListener('mousedown', this._onMouseDown);
        },

        _unsetEventListeners: function() {
            if ($.instance !== 0) return;

            document.removeEventListener('click', this._onClick);
            document.removeEventListener('mousedown', this._onMouseDown);
        },

        _onMouseDown: function(event) {
            var target = event.target;

            while (target !== document || target.wcOpen) {
                if (target.wcOpen) return;
                target = target.parentNode;
            }

            $.elems.forEach(function(elem) {
                if (elem._wrapper.wcOpen) {
                    elem._wrapper.wcOpen = false;
                    elem._wrapper.classList.remove('WClean-open');
                }
            });
        },

        _onClick: function(event) {
            var target = event.target;
            var prevTarget;
            var wrapper;

            while (target !== document || target.wcElement) {
                if (target.wcElement) break;
                prevTarget = target;
                target = target.parentNode;
            }

            wrapper = target.parentNode;

            switch (target.wcElement) {
                case 'trigger':

                    wrapper.classList.toggle('WClean-open');
                    wrapper.wcOpen = !wrapper.wcOpen;
                    return;

                case 'newSelect':

                    if (wrapper.wcOpen) {
                        var childs = wrapper.children;

                        wrapper.classList.remove('WClean-open');
                        wrapper.wcOpen = false;

                        for (var i = 0; i < childs.length; i++) {
                            if (childs[i].wcElement == 'trigger') {
                                childs[i].firstElementChild.innerHTML = prevTarget.innerHTML;
                            }
                        }
                    }
                    return;
            }
        },

        _createChild: function(node) {
            if ( hp_.isNodeElement(node) && node.tagName == 'SELECT' ) {
                var child = new WCleanElement(node, this._options);
                this._elems.push(child);
                $.elems.push(child);
            }
        },

        init: function() {
            var inputValue = this._inputValue;

            if (hp_.isNodeElement(inputValue)) {
                this._createChild(inputValue);
            } else if (hp_.isNodeList(inputValue) && inputValue.length) {
                for (var i = 0; i < inputValue.length; i++) {
                    this._createChild(inputValue[i]);
                }
            }

            this._setEventListeners();
            $.instance++;
        },

        destroy: function() {
            $.instance--;

            this._elems.forEach(function(elem) {
                var index = $.elems.indexOf(elem);

                if (index >= 0) {
                    $.elems.splice(index, 1);
                }

                elem.destroy();
            });

            this._unsetEventListeners();
        },

        update: function(newOptions) {
            // ...
            this.destroy();
            this.init();
        }
    });

    return WClean;
}(window, document, undefined));