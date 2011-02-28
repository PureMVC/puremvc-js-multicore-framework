var Alias = function(className, aliasName) {
  var _classDef = eval(className);
  if (typeof _classDef != 'undefined') {
    if (aliasName == null || aliasName.length < 1) {
      var tokens = className.split('.');
      if (tokens.length > 0) {
        aliasName = tokens[tokens.length - 1];
      }
    }
    if (aliasName != null && aliasName.length > 0) {
      if (self[aliasName] == null) {
        self[aliasName] = _classDef;
      }
    }
  }
};