/**
 * Uses eXist-db REST interface
 * http://exist-db.org/devguide_rest.html
*/

var http   = require('http')
var qs     = require('querystring')
var xml2js = require('xml2js')

/**
 * flwr query to retrieve data 
 * @param query string containing the xquery
 * @param callback function (result) {}
*/
module.exports.xquery = function (query, callback) {
    if (typeof callback !== 'function') return null;

    var options = {
        host: 'localhost',
        port: 8080,
        path: '/exist/rest/?_query=' + qs.escape(query),
        method: 'GET',
    };

    // REST request to eXist-db
    var hreq = http.request(options, function (response) {
        var data = ''
        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            var parser = new xml2js.Parser();

            parser.on('end', function (result) {
                return callback(result);
            });

            parser.parseString(data);
        });
    });

    hreq.end()
}

module.exports.update = function (collection, doc, xml) {
    return null;
}

module.exports.json2xml = function (json) {
    var attrs = '';
    var result = '';

    // foreach property in json
    for(var prop in json) {
        if(prop === '@') continue;
        if(!json.hasOwnProperty(prop)) continue;

        // if the value of the property is an object, recurse
        if (typeof json[prop] === 'object') {
            // is there any attributes?
            if(json[prop].hasOwnProperty('@')) {
                attrs = buildAttributes(json[prop]['@']);
            }

            var children = arguments.callee(json[prop]);
        } else {
            var children = json[prop];
        }
        result += '<' + prop + attrs + '>';
        result += children;
        result += '</' + prop + '>';
    }

    return result;
}

/**
 * Builds a XML attributes string: id="3923" value="foo"
 * using a JS object
 * @return string
 */
function buildAttributes (obj) {
    if(typeof obj !== 'object') throw 'ObjectExpectedException';

    var attrs = '';
    for (var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            attrs += ' ' + prop + '="' + obj[prop] + '"';
        }
    }
    return attrs;
}
