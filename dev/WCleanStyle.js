;var WCleanStyle;

(function(){
    "use strict";

    WCleanStyle = `
    .WClean-wrapper {
        position: relative;
        ${displayFlex(true)}
    }
    .WClean-select {
        display: none !important;
    }
    .WClean-trigger {
        position: relative;
        ${displayFlex()}
        ${alignItems('center')}
        ${justifyContent('space-between')}
        ${flexWrap('nowrap')}
        padding: 10px;
        background: #fff;
        border-radius: 4px;
        border: 1px solid rgba(0,0,0,0.15);
        box-shadow: 0 1px 1px rgba(50,50,50,0.1);
        cursor: pointer;
        outline: none;
        font-weight: bold;
        color: #8aa8bd;
    }
    .WClean-trigger .WClean-caption {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    .WClean-trigger .WClean-icon {
        ${displayFlex()}
        ${alignItems('center')}
        ${justifyContent('center')}
        padding-left: 15px;
    }
    .WClean-new-select {
        position: absolute;
        top: 140%;
        left: 0;
        right: 0;
        margin: 0;
        padding: 0;
        background: white;
        border-radius: 4px;
        border: 1px solid rgba(0,0,0,0.17);
        box-shadow: 0 0 5px rgba(0,0,0,0.1);
        font-weight: normal;
        ${transition('all', '0.3s', 'ease-in')}
        list-style: none;
        z-index: 3;
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
    }
    .WClean-wrapper.WClean-open .WClean-new-select {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
    }
    .WClean-new-select li {
        position: relative;
        cursor: pointer;
        display: block;
        padding: 10px;
        text-decoration: none;
        color: #8aa8bd;
        border-bottom: 1px solid #e6e8ea;
        ${transition('all', '0.3s', 'ease-out')}
        z-index: 1;
    }
    .WClean-new-select li:first-child {
        border-radius: 4px 4px 0 0;
    }
    .WClean-new-select li:last-child {
        border-radius: 0 0 4px 4px;
        border-bottom: 0;
    }
    .WClean-new-select li:hover {
        background: #f3f8f8;
    }
    .WClean-new-select li:first-child:before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        transform: translateY(-50%) rotate(45deg);
        top: -1px;
        left: 20px;
        ${transition('all', '0.3s', 'ease-out')}
        border: 1px solid rgba(0,0,0,0.15);
        background-color: #fff;
        z-index: 0;
        border-bottom: 0;
        border-right: 0;
        margin: 0;
        padding: 0;
    }
    .WClean-new-select li:first-child:hover:before {
        background: #f3f8f8;
    }
    `;

    function displayFlex(inline = false) {
        if (!inline) return `display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex;`;
        return `display: -webkit-inline-box; display: -webkit-inline-flex; display: -ms-inline-flexbox; display: inline-flex;`;
    }

    function flexWrap(value) {
        return `-webkit-flex-wrap: ${value}; -ms-flex-wrap: ${value}; flex-wrap: ${value};`;
    }

    function alignItems(value) {
        switch (value) {
            case 'flex-start':
                return `-webkit-box-align: start; -webkit-align-items: flex-start; -ms-flex-align: start; align-items: flex-start;`;
            case 'flex-end':
                return `-webkit-box-align: end; -webkit-align-items: flex-end; -ms-flex-align: end; align-items: flex-end;`
        }
        return `-webkit-box-align: ${value}; -webkit-align-items: ${value}; -ms-flex-align: ${value}; align-items: ${value};`;
    }
    
    function justifyContent(value) {
        switch (value) {
            case 'space-between':
                return `-webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between;`;
            case 'space-around':
                return `-webkit-justify-content: space-around; -ms-flex-pack: distribute; justify-content: space-around;`;
            case 'flex-start':
                return `-webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start;`;
            case 'flex-end':
                return `-webkit-box-pack: end; -webkit-justify-content: flex-end; -ms-flex-pack: end; justify-content: flex-end;`;
        }
        return `-webkit-box-pack: ${value}; -webkit-justify-content: ${value}; -ms-flex-pack: ${value}; justify-content: ${value};`;
    }

    function transition(el = 'all', t = '.2s', type = 'linear', delay = '0s') {
        return `-webkit-transition: ${el} ${t} ${type} ${delay}; -moz-transition: ${el} ${t} ${type} ${delay}; -ms-transition: ${el} ${t} ${type} ${delay}; -o-transition: ${el} ${t} ${type} ${delay}; transition: ${el} ${t} ${type} ${delay};`;
    }

})();