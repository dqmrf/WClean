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
            var target = event.target,
                prevTarget, wrapper;

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

                    if (!wrapper.wcOpen) return;

                    var wrapperChilds = wrapper.children,
                        newOptions = Array.prototype.slice.call(target.children),
                        index = newOptions.indexOf(prevTarget);

                    wrapper.classList.remove('WClean-open');
                    wrapper.wcOpen = false;

                    for (var i = 0; i < wrapperChilds.length; i++) {
                        var child = wrapperChilds[i];

                        if (!child.wcElement || child.wcElement == 'newSelect') continue;

                        switch (child.wcElement) {
                            case 'trigger':
                                child.firstElementChild.innerHTML = prevTarget.innerHTML;
                                break;
                            case 'select':
                                for (var j = 0; j < newOptions.length; j++) {
                                    if (newOptions[j].dataset.selected) {
                                        delete newOptions[j].dataset.selected;
                                        child.children[j].removeAttribute('selected');
                                        break;
                                    }
                                }
                                prevTarget.dataset.selected = 'selected';
                                child.children[index].setAttribute('selected', 'selected');
                                break;
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

        _insertCSSTag: function() {
            if ($.instance !== 0) return;

            var css = WCleanStyle;
            var head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            style.type = 'text/css';

            if (style.styleSheet){
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            head.appendChild(style);
        },

        init: function() {
            var inputValue = this._inputValue;

            $.css = this._insertCSSTag();

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