;var WCleanHelpers;

(function(){
    "use strict";

    WCleanHelpers = {

        extend: function() {
            // Variables
            var extended = {};
            var deep = false;
            var i = 0;
            var length = arguments.length;

            // Check if a deep merge
            if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
                deep = arguments[0];
                i++;
            }

            // Merge the object into the extended object
            var merge = function (obj) {
                for ( var prop in obj ) {
                    if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                        // If deep merge and property is an object, merge properties
                        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                            extended[prop] = extend( true, extended[prop], obj[prop] );
                        } else {
                            extended[prop] = obj[prop];
                        }
                    }
                }
            };

            // Loop through each object and conduct a merge
            for ( ; i < length; i++ ) {
                var obj = arguments[i];
                merge(obj);
            }

            return extended;
        },

        extendClass: function(Child, Parent) {
            function F() {}
            F.prototype = Parent.prototype;
            Child.prototype = new F();
            Child.prototype.constructor = Child;
            Child.parent = Parent.prototype;
        },

        isNodeList: function(elem) {
            var stringRepr = Object.prototype.toString.call(elem);

            return typeof elem === 'object' &&
                /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
                (typeof elem.length === 'number') &&
                (elem.length === 0 || (typeof elem[0] === "object" && elem[0].nodeType > 0));
        },

        isNodeElement: function(elem) {
            try {
                return elem instanceof HTMLElement;
            } catch(e) {
                return (typeof elem==="object") &&
                    (elem.nodeType===1) &&
                    (typeof elem.style === "object") &&
                    (typeof elem.ownerDocument ==="object");
            }
        }
    };

})();