import M from "materialize-css";

const MaterializeHelper = (function () {
    // Private methods
    function initFormSelect(){
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, null);
        return instances; //Maybe unnecessary return instances variable
    }

    // FormSelect not update data showed by default, then is necessary next function to append items in select
    // From: https://codepen.io/tsai_94/pen/OeLOrw
    function appendInFormSelect(data, elemIdSelector){
        var selectobject = document.createElement("option");
        selectobject.text = data.name;
        selectobject.value = data.id;
        var selectList = document.getElementById(elemIdSelector);
        selectList.appendChild(selectobject);
        M.FormSelect.init(selectList);
        return;
    }
    // Public methods
    return {
        initFormSelect: initFormSelect,
        appendInFormSelect: appendInFormSelect
    }
}())

export default MaterializeHelper
