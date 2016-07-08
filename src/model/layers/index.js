'use strict';

var fs  = require('fs'),
    path = require('path');

    // path.basename('/foo/bar/baz/asdf/quux.html', '.html') = quux
    // path.dirname('/foo/bar/baz/asdf/quux.html') = /foo/bar/baz/asdf/
    // path.parse('/home/user/dir/file.txt')
    // returns
    // {
    //    root : "/",
    //    dir : "/home/user/dir",
    //    base : "file.txt",
    //    ext : ".txt",
    //    name : "file"
    // }

var walk = function(dir, done){
    var results = {};
    fs.readdir(dir, function(err, list){
        if (err) {
            return done(err);
        }

        var pending = list.length;

        if (!pending) {
            return done(null, results);
        }

        list.forEach(function(layer){
            var target = path.resolve(dir, layer);
            fs.stat(target, function(err, stat){
                if (stat && stat.isDirectory()) {
                    console.log(layer);
                    results[layer] = [];
                    walk(target, function(err, file){
                        console.log(file);
                        if (!--pending) {
                            done(null, results);
                        }
                    });
                } else {
                    var file = path.basename(target);
                    if (file[0] === '_') {
                        // results[layer][].push(file);
                        null;
                    }
                    if (!--pending) {
                        done(null, results);
                    }
                }
            });
        });
    });
};


var walking = function(config, done){
    var results = {};
    var pending = config.layers.length;
    config.layers.forEach(function(layer){
        results[layer] = [];

        if (!pending) {
            return done(null, results);
        }
        fs.readdir(config.src.scss + '/' + layer, function(err, files){
            if (err) {
                return 'error #1';
            }

            files.forEach(function(file){
                if (file[0] !== '.') {
                    if (file[0] !== '_') {
                        results[layer].push(file);
                    } else {
                        results[layer].push(file.slice(1, -5));
                    }
                }
            });
        });
        if (pending === 1) {
            done(null, results);
        } else {
            --pending;
        }
    });
};

var layers = function(dir){
    var results = walk(dir, function(err, results){
        if (err) {
            throw err;
        }
        results = JSON.stringify(results, null, 4);
        console.log(results);
        fs.writeFile('guide/app.json', results);
        return results;
    });
}

module.exports = layers;
