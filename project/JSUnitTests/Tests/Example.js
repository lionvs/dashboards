module('Module A');
QUnit.test("sum of first 5 integers", function () {
    var i,sum=0;
    for (i = 1; i < 405; i++) { 
        sum += i;
    }

    equal(81810, sum, "must be 15");
});
QUnit.test("sum of first 5 integers", function () {
    var i,sum=0;
    for (i = 1; i < 405; i++) { 
        sum += i;
    }

   equal(25, sum,"must be 15");
});