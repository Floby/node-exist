node-exist
==========

Description
-----------
eXist-db REST API wrapper

Simple usage
------------
**XQuery**

    var exist = require('exist');

    var q = '
      <results>
      {
          for $e in document("orga/events.xml")//event[
              @refgrp = "G1" 
              and from >= "2011-02-12 12:00" 
              and to <= "2011-02-13"]
          return
          <event>
              {$e/@*}
              {$e/title}
              {$e/from}
              {$e/to}
              {$e/location}
          </event>
      }
      </results>';
  
    exist.xquery(q, function (r) {
      for(e in r.results.event)
        console.log(e);
    });

**JSON to XML**

    var obj = {
        event: {
            '@': {foo: 'bar'},
            bonjour: {
                en: 'hello',
                ko: 'annyung',
            },
            love: 'hate'
        }
    };

    require('exist').json2xml(obj)

This will return:
<event foo="bar"><bonjour><en>hello</en><ko>annyung</ko></bonjour><love>hate</love></event>


Installation
------------
    git clone this
    cd this
    npm link

or (not yet)

    npm install exist

Dependencies
------------
* xml2json
* node-unit for testing
