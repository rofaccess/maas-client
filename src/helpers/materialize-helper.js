import M from "materialize-css";

const MaterializeHelper = (function () {
    // Private methods
    function initFormSelect(elemSelector){
        var elems = document.querySelectorAll(elemSelector ? elemSelector : 'select');
        var instances = M.FormSelect.init(elems, null);
        return instances; //Maybe unnecessary return instances variable
    }

    function initDropdown(elemSelector){
        var elems = document.querySelectorAll(elemSelector);
        var instances = M.Dropdown.init(elems, null);
        return instances; //Maybe unnecessary return instances variable
    }

    function showAlert(msg, type){
        var color = alertColor(type);
        M.toast({html: msg, classes: `${color}`});
    }

    function alertColor(type){
        var color;
        switch (type) {
            case 'success':
                color = 'green lighten-1'
                break;
            case 'warning':
                color = 'orange lighten-1'
                break;
            case 'danger':
                color = 'red lighten-1'
                break;
            default:
                color = ''
        }
        return color;
    }

    // Public methods
    return {
        initFormSelect: initFormSelect,
        initDropdown: initDropdown,
        showAlert: showAlert
    }
}())

export default MaterializeHelper
