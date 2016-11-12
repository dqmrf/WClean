var WCleanElement = (function(window, document, undefined) {
    "use strict";

    var _hp = WCleanHelpers;

    function WCleanElement(select, options) {
        this._select = select;
        this._options = options;

        this.init();
    }

    WCleanElement.prototype = new Object({

        // Create additional templates
        _buildTemplates: function() {
            this._wrap();

            this._trigger = document.createElement('div');
            this._newSelect = document.createElement('ul');
            this._caption = document.createElement('span');
            this._icon = null;

            this._trigger.wcElement = 'trigger';
            this._newSelect.wcElement = 'newSelect';
            this._select.classList.add('WClean-select');
            this._trigger.classList = 'WClean-trigger';
            this._caption.classList = 'WClean-caption';
            this._newSelect.classList = 'WClean-new-select';

            var options = this._select.children;
            var triggerCaptionHTML = options[0].innerHTML;

            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                var newOption = document.createElement('li');

                if (option.tagName !== 'OPTION') continue;

                if (option.hasAttribute('selected')) {
                    newOption.dataset.selected = 'selected';
                    triggerCaptionHTML = option.innerHTML;
                }

                if (option.hasAttribute('value')) {
                    newOption.dataset.value = option.getAttribute('value');
                }
                newOption.innerHTML = option.innerHTML;
                this._newSelect.appendChild(newOption);
            }

            this._caption.innerHTML = triggerCaptionHTML;
            this._trigger.appendChild(this._caption);

            if (this._options.dropdownIcon) {
                this._icon = document.createElement('span');
                this._icon.classList = 'WClean-icon';
                this._icon.innerHTML = this._options.dropdownIcon;
                this._trigger.appendChild(this._icon);
            }

            this._wrapper.appendChild(this._trigger);
            this._wrapper.appendChild(this._newSelect);
        },

        _destroyTemplates: function() {
            this._wrapper.removeChild(this._trigger);
            this._wrapper.removeChild(this._newSelect);
            this._select.classList.remove('WClean-select');

            this._unwrap();
        },

        _wrap: function() {
            this._wrapper = document.createElement('div');

            this._wrapper.classList = 'WClean-wrapper WClean-outer';
            if (this._options.extraClass) this._wrapper.classList.add(this._options.extraClass);

            this._select.parentNode.insertBefore(this._wrapper, this._select);
            this._wrapper.appendChild(this._select);
        },

        _unwrap: function() {
            var wrapperParent = this._wrapper.parentNode;

            wrapperParent.insertBefore(this._select, this._wrapper);
            wrapperParent.removeChild(this._wrapper);
            this._wrapper = null;
        },

        init: function() {
            this._buildTemplates();
        },

        destroy: function() {
            this._destroyTemplates();
        }

    });

    return WCleanElement;
}(window, document, undefined));