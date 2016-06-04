void function() {
    'use strict';
    const maxShingleID = Math.pow(2, 32-1);
    const nextPrime = 4294967311;
    var numHashes = 256

    var crc32 = require('crc-32');
    var natural = require('natural');

    var coeffA = pickRandomCoeffs(numHashes);
    var coeffB = pickRandomCoeffs(numHashes);

    module.exports = {
        compare: compare,
        summary: summary,
        shingles: shingles,
        jaccardIndex: jaccardIndex,
        shingleHashList: shingleHashList
    }

    function compare(file1, file2) {
        return similarity(minhash(file1), minhash(file2));
    }

    function summary(file1, file2) {
        var minhashval = similarity(minhash(file1), minhash(file2));
        var jaccard = jaccardIndex(shingles(file1), shingles(file2));
        console.log( "Minhash similarity is "+minhashval+" (%d%% similar)", Math.round(minhashval * 100)  );
        console.log( "Jaccard index is "+jaccard+" (%d%% similar)", Math.round(jaccard * 100) );
    }

    function similarity(minhash1, minhash2) {
        var total = minhash1.length;
        var shared = 0;
        for (var i = 0; i < minhash1.length; i++) {
            if (minhash1[i] === minhash2[i]) {
                shared++;
            }
        }
        return shared / total;
    }

    function shingleHashList(str, kshingles=2) {
        var list = [];
        for (var word of shingles(str, kshingles)) {
            list.push(crc32.str(word) & 0xffffffff);
        }
        return list;
    }

    function shingles(original, kshingles=2) {
        var words = new natural.WordTokenizer().tokenize(original);
        var shingles = new Set();
        for (var index = 0; index < words.length-kshingles; index++) {
          var list = [];
          for(var j = 0; j < kshingles; j++) {
            list.push(words[j+index].toLowerCase());
          }
          shingles.add(list.join(" "));
        }
        return shingles;
    }

    function minhash(str) {
        var shingles = shingleHashList(str);

        var signature = [];
        for (var i of range(0, coeffA.length)) {
            var minHashCode = nextPrime + 1;
            for (var shingleID of shingles) {
                var hashCode = (coeffA[i] * shingleID + coeffB[i]) % nextPrime;
                if (hashCode < minHashCode) {
                    minHashCode = hashCode;
                }
            }
            signature.push(minHashCode);
        }
        return signature;
    }

    function jaccardIndex(set1, set2) {
      var total = set1.size + set2.size;
      var intersection = 0;
      for(var shingle of set1 ) {
        if(set2.has(shingle)) {
          intersection++;
        }
      }
      var union = total - intersection;
      return intersection / union;
    }

    function createBinaryString (nMask) {
      for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
           nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
      return sMask;
    }

    function pickRandomCoeffs(k) {
      var randList = [];

      while (k > 0 ) {
        var randIndex = getRandomIntInclusive(0, maxShingleID);
        while (randList.indexOf(randIndex) != -1) {
          randIndex = getRandomIntInclusive(0, maxShingleID);
        }
        randList.push(randIndex);
        k = k - 1;
      }
      return randList;
    }

    function getRandomIntInclusive(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function* range(start, stop, step){
        if (typeof stop === 'undefined'){
            stop = start;
            start = 0;
        }
        if (typeof step === 'undefined'){
            step = 1;
        }
        if ((step > 0 && start >= stop) || (step < 0 && start <= stop)){
            return;
        }
        for (var i = start; step > 0 ? i < stop : i > stop; i += step){
            yield(i);
        }
    }


}.call(this);
