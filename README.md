<h1>**Numeral systems converter**</h1>
---

<h2>**Introduction**</h2>
This widget conversions between all number bases: from binary to hexadecimal. I used JavaScript, Node.js, Express, Express Handlebars, Socket.io and CSS technologies. There is responsive project. Input data is validated. Widget works independently after placing it several times on the website. 

<h2>**Usage**</h2>
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
```
var NumberClient4 = new NumberClient(document.querySelector("#numbers-area4"));
```

<h2>**How to run**</h2>
```
npm install
nodemon nsc
```

<h2>**Some screenshots of the application**</h2>
:iphone:
![mobile01](https://cloud.githubusercontent.com/assets/5839775/21331035/ca93871c-c640-11e6-8af8-d08013d4c4b7.jpg)
