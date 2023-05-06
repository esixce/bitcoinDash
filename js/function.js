(function (global) {
  var func = {};

  func.myFunction = function () {
    console.log("This is my function");
  };

  func.myOtherFunction = function () {
    console.log("This is my other function");
  };

  global.$func = func;
})();
