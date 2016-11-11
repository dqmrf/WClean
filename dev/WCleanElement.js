var WCleanElement = (function(window, document, undefined) {
    "use strict";

    function WCleanElement(select) {
        this._select = select;

        this.init();
    }

    WCleanElement.prototype.init = function() {
        var select = this._select;

        this._buildTemplates();
    };

    WCleanElement.prototype.destroy = function() {
        this._unwrap();
    };

    WCleanElement.prototype._buildTemplates = function() {
        this._wrap();
        this._addNewSelect();
        this._addTrigger();
    };

    WCleanElement.prototype._addTrigger = function() {
        var trigger = this._trigger = document.createElement('div');
        var caption = document.createElement('span');

        trigger.classList = 'WClean-trigger';
        trigger.dataset.wcleanTrigger = true;
        caption.classList = 'WClean-caption';
        this._setTriggerText(caption);
        trigger.appendChild(caption);

        this._wpapper.appendChild(trigger);
    };

    WCleanElement.prototype._setTriggerText = function(caption) {
        var select = this._select,
            selChilds = select.children,
            extHTML = selChilds[0].innerHTML;

        for(var i = 0; i < selChilds.length; i++) {
            if (selChilds[i].hasAttribute('selected')) {
                extHTML = selChilds[i].innerHTML;
            }
        }

        caption.innerHTML = extHTML;
    };

    WCleanElement.prototype._addNewSelect = function() {};

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