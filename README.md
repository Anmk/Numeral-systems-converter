# Numeral systems converter

## Introduction
This widget conversions between all number bases: from binary to hexadecimal. I used JavaScript, Node.js, Express, Express Handlebars, Socket.io and CSS technologies. There is responsive project. Input data is validated. Widget works independently after placing it several times on the website. 

## Usage
In the file: *public/js/scripts.js* you can choose scroll options:
* *"fit"* - view will be scrolled to the result
* *"bottom"* - view will be scrolled to the bottom of the page
* *"none"* -  view will not at all scrolled
```javascript
var NumberClient1 = new NumberClient(document.querySelector("#numbers-area"), "fit");
var NumberClient2 = new NumberClient(document.querySelector("#numbers-area2"), "bottom"); 
var NumberClient3 = new NumberClient(document.querySelector("#numbers-area3"), "none"); 
```
If you do not choose any option, the default will be to place the result.
```javascript
var NumberClient4 = new NumberClient(document.querySelector("#numbers-area4"));
```

## How to run
In an environment Node.js (I used version 7.3.0):
```
npm install
nodemon nsc
```

## Some screenshots of the application
:iphone:
![mobile02](https://cloud.githubusercontent.com/assets/5839775/21409516/04da90c8-c7db-11e6-858a-cf5936758fe6.jpg)
:computer:
![desktop01](https://cloud.githubusercontent.com/assets/5839775/21466847/74cb8cfe-c9d7-11e6-8876-7ba64b69a6f2.jpg)
![desktop02](https://cloud.githubusercontent.com/assets/5839775/21466859/e31a123e-c9d7-11e6-8aac-6797e9484beb.jpg)
---
![desktop03](https://cloud.githubusercontent.com/assets/5839775/21466861/f2398880-c9d7-11e6-8b80-a6dd82651967.jpg)