# node-minhash

A simple command line tool for comparing text files using the minhash algorithm and contrasting with the jaccard index.

[![Build Status](https://travis-ci.org/sjhorn/node-minhash.svg?branch=master)](https://travis-ci.org/sjhorn/node-minhash)


## References

* [MinHash tutorial in python](https://github.com/chrisjmccormick/MinHash)
* [Near duplicate detection (moz.com)](https://moz.com/devblog/near-duplicate-detection/)

## Installation

### If you have just clone this like then run the following
````
npm install
npm link
````

Or if you would like to install globally
````
npm install https://github.com/sjhorn/node-minhash -g
````

## Command line tool usage

Using node
````
minhash file1.txt file2.txt

minhash https://file.com/page1.html https://file.com/page2.html

````

### Using lib
````js
var minhash = require('node-minhash');

minhash.summary(string1, string2);

````

### Methods

#### <a name="summary"></a>.summary(file1, file2)
Compare two text strings using both minhash and jaccard index and print a summary


#### <a name="compare"></a>.compare(file1, file2)
Compare two text strings using both minhash and jaccard index


#### <a name="shingles"></a>.shingles(string, words_per_single=2)

Convert string to set of shingles using the default of 2 words per shingle and tokenise using the natural libraries default tokeniser.

#### <a name="jaccardIndex"></a>.jaccardIndex(string1, string2)

Compare two strings by tokenising and then compare the intersection of shingles to the union of shingles.

#### <a name="shingleHashList"></a>.shingleHashList(set)

Convert a set of shingles to a set of crc-32 hashes.
