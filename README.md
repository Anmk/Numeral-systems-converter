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
```
npm install
nodemon nsc
```

## Some screenshots of the application
:iphone:

![mobile01](https://cloud.githubusercontent.com/assets/5839775/21331035/ca93871c-c640-11e6-8af8-d08013d4c4b7.jpg)
