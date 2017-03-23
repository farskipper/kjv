var _ = require("lodash");

module.exports = function(str){
    return _.parseInt(str, 10) || 0;
};
