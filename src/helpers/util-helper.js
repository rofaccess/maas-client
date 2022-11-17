const UtilHelper = (function () {
    // Private methods
    function deepClone(object){
        //From: https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/
        return JSON.parse(JSON.stringify(object));
    }

    // Public methods
    return {
        deepClone: deepClone
    }
}())

export default UtilHelper;
