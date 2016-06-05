var minhash = require('../lib/minhash.js');
var fs = require('fs');

exports.compareSmallString = function(test) {
    test.equal(minhash.compare('I am working', 'I am working'), 1);
    test.done();
}

exports.compareSameFile = function(test) {
    var file1 = fs.readFileSync("test/sample1.txt", "utf8");
    test.equal(minhash.compare(file1, file1), 1);
    test.done();
}

exports.compareSimilarFile = function(test) {
    var file1 = fs.readFileSync("test/sample1.txt", "utf8");
    var file2 = fs.readFileSync("test/sample2.txt", "utf8");
    var rounded = Math.round(minhash.compare(file1, file2) * 100);
    test.equal(rounded, 65, "Similarity did not match the expect 65%");
    test.done();
}
