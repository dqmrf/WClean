function wcleanIsNodeList(elem) {
    var stringRepr = Object.prototype.toString.call(elem);

    return typeof elem === 'object' &&
        /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
        (typeof elem.length === 'number') &&
        (elem.length === 0 || (typeof elem[0] === "object" && elem[0].nodeType > 0));
}

function wcleanIsNodeElement(elem) {
    try {
        return elem instanceof HTMLElement;
    } catch(e) {
        return (typeof elem==="object") &&
            (elem.nodeType===1) && 
            (typeof elem.style === "object") &&
            (typeof elem.ownerDocument ==="object");
    }
}