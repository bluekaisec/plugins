// ==UserScript==
// @name         BlueKai Extender
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Extending BlueKai UI to improve
// @author       Roshan Gonsalkorale (oracle_dmp_emea_deployments_gb_grp@oracle.com)
// @match        https://*.bluekai.com/*
// @match        http://*.bluekai.com/*
// @exclude 	 https://wunderbar.bluekai.com*
// @grant        none

// ==/UserScript==

(function() {
	'use strict';

	// ADD LIBRARIES
	var file_adder = function(type, src, callback) {
		if (type === "css") {

			var file = document.createElement("link");
			file.setAttribute("rel", "stylesheet");
			file.setAttribute("href", src);
			
		} else {

			var file = document.createElement(type);
			file.setAttribute("src", src);
			if (typeof callback !== "undefined") {
				file.setAttribute("onload", callback());
			};

		}

		document.body.appendChild(file);

	};

	// Alertify		
	file_adder("script", "https://cdn.rawgit.com/alertifyjs/alertify.js/v1.0.10/dist/js/alertify.js");

	// CSV Parser (Papa Parse)
	/*!
	Papa Parse
	v4.1.2
	https://github.com/mholt/PapaParse
	*/
	!function(e){"use strict";function t(t,r){if(r=r||{},r.worker&&S.WORKERS_SUPPORTED){var n=f();return n.userStep=r.step,n.userChunk=r.chunk,n.userComplete=r.complete,n.userError=r.error,r.step=m(r.step),r.chunk=m(r.chunk),r.complete=m(r.complete),r.error=m(r.error),delete r.worker,void n.postMessage({input:t,config:r,workerId:n.id})}var o=null;return"string"==typeof t?o=r.download?new i(r):new a(r):(e.File&&t instanceof File||t instanceof Object)&&(o=new s(r)),o.stream(t)}function r(e,t){function r(){"object"==typeof t&&("string"==typeof t.delimiter&&1==t.delimiter.length&&-1==S.BAD_DELIMITERS.indexOf(t.delimiter)&&(u=t.delimiter),("boolean"==typeof t.quotes||t.quotes instanceof Array)&&(o=t.quotes),"string"==typeof t.newline&&(h=t.newline))}function n(e){if("object"!=typeof e)return[];var t=[];for(var r in e)t.push(r);return t}function i(e,t){var r="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=e instanceof Array&&e.length>0,i=!(t[0]instanceof Array);if(n){for(var a=0;a<e.length;a++)a>0&&(r+=u),r+=s(e[a],a);t.length>0&&(r+=h)}for(var o=0;o<t.length;o++){for(var f=n?e.length:t[o].length,c=0;f>c;c++){c>0&&(r+=u);var d=n&&i?e[c]:c;r+=s(t[o][d],c)}o<t.length-1&&(r+=h)}return r}function s(e,t){if("undefined"==typeof e||null===e)return"";e=e.toString().replace(/"/g,'""');var r="boolean"==typeof o&&o||o instanceof Array&&o[t]||a(e,S.BAD_DELIMITERS)||e.indexOf(u)>-1||" "==e.charAt(0)||" "==e.charAt(e.length-1);return r?'"'+e+'"':e}function a(e,t){for(var r=0;r<t.length;r++)if(e.indexOf(t[r])>-1)return!0;return!1}var o=!1,u=",",h="\r\n";if(r(),"string"==typeof e&&(e=JSON.parse(e)),e instanceof Array){if(!e.length||e[0]instanceof Array)return i(null,e);if("object"==typeof e[0])return i(n(e[0]),e)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),e.data instanceof Array&&(e.fields||(e.fields=e.data[0]instanceof Array?e.fields:n(e.data[0])),e.data[0]instanceof Array||"object"==typeof e.data[0]||(e.data=[e.data])),i(e.fields||[],e.data||[]);throw"exception: Unable to serialize unrecognized input"}function n(t){function r(e){var t=_(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new o(t),this._handle.streamer=this,this._config=t}this._handle=null,this._paused=!1,this._finished=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},r.call(this,t),this.parseChunk=function(t){if(this.isFirstChunk&&m(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(t);void 0!==r&&(t=r)}this.isFirstChunk=!1;var n=this._partialLine+t;this._partialLine="";var i=this._handle.parse(n,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=i.meta.cursor;this._finished||(this._partialLine=n.substring(s-this._baseIndex),this._baseIndex=s),i&&i.data&&(this._rowCount+=i.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(y)e.postMessage({results:i,workerId:S.WORKER_ID,finished:a});else if(m(this._config.chunk)){if(this._config.chunk(i,this._handle),this._paused)return;i=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(i.data),this._completeResults.errors=this._completeResults.errors.concat(i.errors),this._completeResults.meta=i.meta),!a||!m(this._config.complete)||i&&i.meta.aborted||this._config.complete(this._completeResults),a||i&&i.meta.paused||this._nextChunk(),i}},this._sendError=function(t){m(this._config.error)?this._config.error(t):y&&this._config.error&&e.postMessage({workerId:S.WORKER_ID,error:t,finished:!1})}}function i(e){function t(e){var t=e.getResponseHeader("Content-Range");return parseInt(t.substr(t.lastIndexOf("/")+1))}e=e||{},e.chunkSize||(e.chunkSize=S.RemoteChunkSize),n.call(this,e);var r;this._nextChunk=k?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)return void this._chunkLoaded();if(r=new XMLHttpRequest,k||(r.onload=g(this._chunkLoaded,this),r.onerror=g(this._chunkError,this)),r.open("GET",this._input,!k),this._config.chunkSize){var e=this._start+this._config.chunkSize-1;r.setRequestHeader("Range","bytes="+this._start+"-"+e),r.setRequestHeader("If-None-Match","webkit-no-cache")}try{r.send()}catch(t){this._chunkError(t.message)}k&&0==r.status?this._chunkError():this._start+=this._config.chunkSize},this._chunkLoaded=function(){if(4==r.readyState){if(r.status<200||r.status>=400)return void this._chunkError();this._finished=!this._config.chunkSize||this._start>t(r),this.parseChunk(r.responseText)}},this._chunkError=function(e){var t=r.statusText||e;this._sendError(t)}}function s(e){e=e||{},e.chunkSize||(e.chunkSize=S.LocalChunkSize),n.call(this,e);var t,r,i="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,i?(t=new FileReader,t.onload=g(this._chunkLoaded,this),t.onerror=g(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size);e=r.call(e,this._start,n)}var s=t.readAsText(e,this._config.encoding);i||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function a(e){e=e||{},n.call(this,e);var t,r;this.stream=function(e){return t=e,r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,t=e?r.substr(0,e):r;return r=e?r.substr(e):"",this._finished=!r,this.parseChunk(t)}}}function o(e){function t(){if(b&&d&&(h("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+S.DefaultDelimiter+"'"),d=!1),e.skipEmptyLines)for(var t=0;t<b.data.length;t++)1==b.data[t].length&&""==b.data[t][0]&&b.data.splice(t--,1);return r()&&n(),i()}function r(){return e.header&&0==y.length}function n(){if(b){for(var e=0;r()&&e<b.data.length;e++)for(var t=0;t<b.data[e].length;t++)y.push(b.data[e][t]);b.data.splice(0,1)}}function i(){if(!b||!e.header&&!e.dynamicTyping)return b;for(var t=0;t<b.data.length;t++){for(var r={},n=0;n<b.data[t].length;n++){if(e.dynamicTyping){var i=b.data[t][n];b.data[t][n]="true"==i||"TRUE"==i?!0:"false"==i||"FALSE"==i?!1:o(i)}e.header&&(n>=y.length?(r.__parsed_extra||(r.__parsed_extra=[]),r.__parsed_extra.push(b.data[t][n])):r[y[n]]=b.data[t][n])}e.header&&(b.data[t]=r,n>y.length?h("FieldMismatch","TooManyFields","Too many fields: expected "+y.length+" fields but parsed "+n,t):n<y.length&&h("FieldMismatch","TooFewFields","Too few fields: expected "+y.length+" fields but parsed "+n,t))}return e.header&&b.meta&&(b.meta.fields=y),b}function s(t){for(var r,n,i,s=[",","	","|",";",S.RECORD_SEP,S.UNIT_SEP],a=0;a<s.length;a++){var o=s[a],h=0,f=0;i=void 0;for(var c=new u({delimiter:o,preview:10}).parse(t),d=0;d<c.data.length;d++){var l=c.data[d].length;f+=l,"undefined"!=typeof i?l>1&&(h+=Math.abs(l-i),i=l):i=l}c.data.length>0&&(f/=c.data.length),("undefined"==typeof n||n>h)&&f>1.99&&(n=h,r=o)}return e.delimiter=r,{successful:!!r,bestDelimiter:r}}function a(e){e=e.substr(0,1048576);var t=e.split("\r");if(1==t.length)return"\n";for(var r=0,n=0;n<t.length;n++)"\n"==t[n][0]&&r++;return r>=t.length/2?"\r\n":"\r"}function o(e){var t=l.test(e);return t?parseFloat(e):e}function h(e,t,r,n){b.errors.push({type:e,code:t,message:r,row:n})}var f,c,d,l=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,p=this,g=0,v=!1,k=!1,y=[],b={data:[],errors:[],meta:{}};if(m(e.step)){var R=e.step;e.step=function(n){if(b=n,r())t();else{if(t(),0==b.data.length)return;g+=n.data.length,e.preview&&g>e.preview?c.abort():R(b,p)}}}this.parse=function(r,n,i){if(e.newline||(e.newline=a(r)),d=!1,!e.delimiter){var o=s(r);o.successful?e.delimiter=o.bestDelimiter:(d=!0,e.delimiter=S.DefaultDelimiter),b.meta.delimiter=e.delimiter}var h=_(e);return e.preview&&e.header&&h.preview++,f=r,c=new u(h),b=c.parse(f,n,i),t(),v?{meta:{paused:!0}}:b||{meta:{paused:!1}}},this.paused=function(){return v},this.pause=function(){v=!0,c.abort(),f=f.substr(c.getCharIndex())},this.resume=function(){v=!1,p.streamer.parseChunk(f)},this.aborted=function(){return k},this.abort=function(){k=!0,c.abort(),b.meta.aborted=!0,m(e.complete)&&e.complete(b),f=""}}function u(e){e=e||{};var t=e.delimiter,r=e.newline,n=e.comments,i=e.step,s=e.preview,a=e.fastMode;if(("string"!=typeof t||S.BAD_DELIMITERS.indexOf(t)>-1)&&(t=","),n===t)throw"Comment character same as delimiter";n===!0?n="#":("string"!=typeof n||S.BAD_DELIMITERS.indexOf(n)>-1)&&(n=!1),"\n"!=r&&"\r"!=r&&"\r\n"!=r&&(r="\n");var o=0,u=!1;this.parse=function(e,h,f){function c(e){b.push(e),S=o}function d(t){return f?p():("undefined"==typeof t&&(t=e.substr(o)),w.push(t),o=g,c(w),y&&_(),p())}function l(t){o=t,c(w),w=[],O=e.indexOf(r,o)}function p(e){return{data:b,errors:R,meta:{delimiter:t,linebreak:r,aborted:u,truncated:!!e,cursor:S+(h||0)}}}function _(){i(p()),b=[],R=[]}if("string"!=typeof e)throw"Input must be a string";var g=e.length,m=t.length,v=r.length,k=n.length,y="function"==typeof i;o=0;var b=[],R=[],w=[],S=0;if(!e)return p();if(a||a!==!1&&-1===e.indexOf('"')){for(var C=e.split(r),E=0;E<C.length;E++){var w=C[E];if(o+=w.length,E!==C.length-1)o+=r.length;else if(f)return p();if(!n||w.substr(0,k)!=n){if(y){if(b=[],c(w.split(t)),_(),u)return p()}else c(w.split(t));if(s&&E>=s)return b=b.slice(0,s),p(!0)}}return p()}for(var x=e.indexOf(t,o),O=e.indexOf(r,o);;)if('"'!=e[o])if(n&&0===w.length&&e.substr(o,k)===n){if(-1==O)return p();o=O+v,O=e.indexOf(r,o),x=e.indexOf(t,o)}else if(-1!==x&&(O>x||-1===O))w.push(e.substring(o,x)),o=x+m,x=e.indexOf(t,o);else{if(-1===O)break;if(w.push(e.substring(o,O)),l(O+v),y&&(_(),u))return p();if(s&&b.length>=s)return p(!0)}else{var I=o;for(o++;;){var I=e.indexOf('"',I+1);if(-1===I)return f||R.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:b.length,index:o}),d();if(I===g-1){var D=e.substring(o,I).replace(/""/g,'"');return d(D)}if('"'!=e[I+1]){if(e[I+1]==t){w.push(e.substring(o,I).replace(/""/g,'"')),o=I+1+m,x=e.indexOf(t,o),O=e.indexOf(r,o);break}if(e.substr(I+1,v)===r){if(w.push(e.substring(o,I).replace(/""/g,'"')),l(I+1+v),x=e.indexOf(t,o),y&&(_(),u))return p();if(s&&b.length>=s)return p(!0);break}}else I++}}return d()},this.abort=function(){u=!0},this.getCharIndex=function(){return o}}function h(){var e=document.getElementsByTagName("script");return e.length?e[e.length-1].src:""}function f(){if(!S.WORKERS_SUPPORTED)return!1;if(!b&&null===S.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var t=S.SCRIPT_PATH||v;t+=(-1!==t.indexOf("?")?"&":"?")+"papaworker";var r=new e.Worker(t);return r.onmessage=c,r.id=w++,R[r.id]=r,r}function c(e){var t=e.data,r=R[t.workerId],n=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var i=function(){n=!0,d(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},s={abort:i,pause:l,resume:l};if(m(r.userStep)){for(var a=0;a<t.results.data.length&&(r.userStep({data:[t.results.data[a]],errors:t.results.errors,meta:t.results.meta},s),!n);a++);delete t.results}else m(r.userChunk)&&(r.userChunk(t.results,s,t.file),delete t.results)}t.finished&&!n&&d(t.workerId,t.results)}function d(e,t){var r=R[e];m(r.userComplete)&&r.userComplete(t),r.terminate(),delete R[e]}function l(){throw"Not implemented."}function p(t){var r=t.data;if("undefined"==typeof S.WORKER_ID&&r&&(S.WORKER_ID=r.workerId),"string"==typeof r.input)e.postMessage({workerId:S.WORKER_ID,results:S.parse(r.input,r.config),finished:!0});else if(e.File&&r.input instanceof File||r.input instanceof Object){var n=S.parse(r.input,r.config);n&&e.postMessage({workerId:S.WORKER_ID,results:n,finished:!0})}}function _(e){if("object"!=typeof e)return e;var t=e instanceof Array?[]:{};for(var r in e)t[r]=_(e[r]);return t}function g(e,t){return function(){e.apply(t,arguments)}}function m(e){return"function"==typeof e}var v,k=!e.document&&!!e.postMessage,y=k&&/(\?|&)papaworker(=|&|$)/.test(e.location.search),b=!1,R={},w=0,S={};if(S.parse=t,S.unparse=r,S.RECORD_SEP=String.fromCharCode(30),S.UNIT_SEP=String.fromCharCode(31),S.BYTE_ORDER_MARK="﻿",S.BAD_DELIMITERS=["\r","\n",'"',S.BYTE_ORDER_MARK],S.WORKERS_SUPPORTED=!k&&!!e.Worker,S.SCRIPT_PATH=null,S.LocalChunkSize=10485760,S.RemoteChunkSize=5242880,S.DefaultDelimiter=",",S.Parser=u,S.ParserHandle=o,S.NetworkStreamer=i,S.FileStreamer=s,S.StringStreamer=a,"undefined"!=typeof module&&module.exports?module.exports=S:m(e.define)&&e.define.amd?define(function(){return S}):e.Papa=S,e.jQuery){var C=e.jQuery;C.fn.parse=function(t){function r(){if(0==a.length)return void(m(t.complete)&&t.complete());var e=a[0];if(m(t.before)){var r=t.before(e.file,e.inputElem);if("object"==typeof r){if("abort"==r.action)return void n("AbortError",e.file,e.inputElem,r.reason);if("skip"==r.action)return void i();"object"==typeof r.config&&(e.instanceConfig=C.extend(e.instanceConfig,r.config))}else if("skip"==r)return void i()}var s=e.instanceConfig.complete;e.instanceConfig.complete=function(t){m(s)&&s(t,e.file,e.inputElem),i()},S.parse(e.file,e.instanceConfig)}function n(e,r,n,i){m(t.error)&&t.error({name:e},r,n,i)}function i(){a.splice(0,1),r()}var s=t.config||{},a=[];return this.each(function(){var t="INPUT"==C(this).prop("tagName").toUpperCase()&&"file"==C(this).attr("type").toLowerCase()&&e.FileReader;if(!t||!this.files||0==this.files.length)return!0;for(var r=0;r<this.files.length;r++)a.push({file:this.files[r],inputElem:this,instanceConfig:C.extend({},s)})}),r(),this}}y?e.onmessage=p:S.WORKERS_SUPPORTED&&(v=h(),document.body?document.addEventListener("DOMContentLoaded",function(){b=!0},!0):b=!0),i.prototype=Object.create(n.prototype),i.prototype.constructor=i,s.prototype=Object.create(n.prototype),s.prototype.constructor=s,a.prototype=Object.create(a.prototype),a.prototype.constructor=a}("undefined"!=typeof window?window:this);

	// DECLARE OBJECT
	window._bk = window._bk || {};
	window._bk.functions = window._bk.functions || {};
	window._bk.logs = window._bk.logs || {};
	
	// DETECT OPERATION SYSTEM
	if(navigator && navigator.platform && navigator.platform.toLowerCase().indexOf('mac') > -1){_bk.os = "mac";} else {_bk.os ="windows";}
	
	// ### GENERIC CODE ###
	window._bk = window._bk || {};
	window._bk.functions = window._bk.functions || {};
	window._bk.logs = window._bk.logs || {};

	/*
	#########################
	### Generic Functions ###
	#########################
	*/		

	// FUNCTION : CSV EXPORTER
	window._bk.functions.csvExport = function(data) {

		// data must be formatted in arrays of arrays of data (one big array with an array per line, e.g. [[line1data1,line1data2],[line2data1,line2data2]])
		var csvContent = "data:text/csv;charset=utf-8,";

		csvContent += "NOTE : All commas have been replaced by '-' to ensure CSV could be generated correctly" + "\n" + "\n";

		data.forEach(function(infoArray, index) {

			// replace any "," to work in CSV
			for (var i = 0; i < infoArray.length; i++) {
				infoArray[i] = infoArray[i].replace(/,/g, "-");
			}

			var dataString = infoArray.join(",");
			csvContent += index < data.length ? dataString + "\n" : dataString;

		});


		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "category_export.csv");
		document.body.appendChild(link); // Required for FF

		link.click(); // This will download the data file named "my_data.csv".

	}

	/*
		
	#################################
	### Self-Classification Rules ###
	#################################

	*/

	// ### SELF-CLASSIFICATION RULES ###	

	if (document.location.href.indexOf("https://publisher.bluekai.com/classification_rules") > -1){

		/*
		
		// ### HOT KEYS ###

		*/

		// set ALT or CTRL (windows)
		if(_bk.os === "mac"){_bk.keyModifier = 'ctrlKey';_bk.keyModifierName = "CTRL";} else {_bk.keyModifier = 'altKey'; _bk.keyModifierName = "ALT";}


		// Declare help button dialog
		_bk.msg = "<h2>Blue Kai Extender Help</h2>" +
			"<p>You can use these new hot keys for faster UI control</p><br>" +
			"<table align style='width:100%'>" +
			"<tr><td><strong>New Rule (Phint)</strong></td><td>" + _bk.keyModifierName + " + N</td></tr>" +
			"<tr><td><strong>New Rule (URL)</strong></td><td>" + _bk.keyModifierName + " + SHIFT + N</td></tr>" +
			"<tr><td><strong>Save Rule</strong> (when in rule editor)</td><td>" + _bk.keyModifierName + " + ENTER</td></tr>" +
			"<tr><td><strong>Edit Rule</strong> (when selected rule)</td><td>" + _bk.keyModifierName + " + E</td></tr>" +
			"<tr><td><strong>Bulk Edit Rule</strong> (when selected rule)</td><td>" + _bk.keyModifierName + " + SHIFT + E</td></tr>" +
			"<tr><td><strong>Delete Rule</strong> (when selected rule)</td><td>" + _bk.keyModifierName + " + BACKSPACE</td></tr>" +
			"</table>" +
			"<br>" +
			"<p>For any problems please contact oracle_dmp_emea_deployments_gb_grp@oracle.com</p>";

		window._bk.functions.help_button = function() {
			alertify.alert(_bk.msg);
		};

		// Log BK Extender running
		_bk.functions.bk_running = function() {
			
			setTimeout(function() {
		
				if (window.alertify && window.alertify.log) {
					alertify.log('<h3>BlueKai Extender Running</h3><p>Click <a onClick="alertify.alert(_bk.msg);">here </a>for help</p>');					
				} else {
					//_bk.functions.bk_running();
				}
			}, 500);
		};
		_bk.functions.bk_running();


		// Help Button
		jQuery('button[value="destroy"]').parent().parent().append('<li><button id="bk_Extender_help_button" onclick="_bk.functions.help_button()" class="button" name = "BK Extender Help">BK Extender Help</button></li>');			

		// Hot Keys
		jQuery(window).keydown(function(data) {

			if (data[_bk.keyModifier]) {

				// Create rule (phint) (MODIFIER+N)
				if (data.keyCode === 78 && !data.shiftKey) {

					jQuery('button[value="create_phint"]').trigger("click");
					
					alertify.log('Create New Rule (Phint) (' +  _bk.keyModifierName + ' + N)');					
				}

				// Create rule (url) (MODIFIER+SHIFT+N)
				if (data.shiftKey && data.keyCode === 78) {

					jQuery('button[value="create_url"]').trigger("click");
					alertify.log('Create New Rule (URL) ('  +  _bk.keyModifierName +' + SHIFT + N)');
				}


				// Edit rule (MODIFIER+E)
				if (data.keyCode === 69) {

					jQuery('button[value="edit"]').trigger("click");
					alertify.log('Edit Rule ('  +  _bk.keyModifierName + ' + E)');
				}

				// Bulk edit rule (MODIFIER+E)
				if (data.keyCode === 69 && data.shiftKey) {

					jQuery('button[value="bulk_edit"]').trigger("click");
					alertify.log('Bulk Edit Rule ('  +  _bk.keyModifierName + ' + SHIFT + E)');
				}

				// Save (MODIFIER+ENTER)
				if (data.keyCode === 13) {

					jQuery('button[name="Save"]').trigger("click");
					alertify.log('Save Rule (' + _bk.keyModifierName + ' + ENTER)');
				}

				// Delete (MODIFIER+BACKSPACE)
				if (data.keyCode === 8) {

					jQuery('button[value="destroy"]').trigger("click");
					alertify.log('Delete Rule ('  +  _bk.keyModifierName + ' + BKSPACE)');
				}
			}
		});
		
		// ### BULK RULE IMPORTER ###
		
		// FUNCTION : Begin Data Send ###
		window._bk.functions.beginClassification = function(data) {

			// config
			var intervals = 50;

			// 1 : CALCULATE BATCH POINTS
			window._bk.logs.data_length = data.length; // how long is it?
			window._bk.logs.batches = Math.ceil(window._bk.logs.data_length / intervals); // how many batches to run?

			// how many in last batch?
			if (window._bk.logs.batches > 1) {

				var bulk = (window._bk.logs.batches - 1) * intervals;
				window._bk.logs.remainder = window._bk.logs.data_length - bulk;

			} else {
				window._bk.logs.remainder = window._bk.logs.data_length;
			}

			// Create array of batch points
			window._bk.logs.batch_points = [];

			for (var i = 0; i < window._bk.logs.batches; i++) {

				// if first item in array
				if (!window._bk.logs.batch_points[0]) {

					if (window._bk.logs.data_length < intervals) {

						var end_point = window._bk.logs.data_length;

					} else {
						end_point = intervals;
					}

					window._bk.logs.batch_points[i] = [1, end_point];

				} else {

					// all other items in array

					// if not the last one
					if ((i + 1) < window._bk.logs.batches) {

						// calculate start and end
						var start = (window._bk.logs.batch_points[i - 1][1]) + 1; // start
						var end = ((i + 1) * intervals); // end

						window._bk.logs.batch_points[i] = [start, end];

					} else {

						// if the last one

						// calculate start and end
						var start = (window._bk.logs.batch_points[i - 1][1]) + 1; // start
						var end = start + window._bk.logs.remainder - 1; // end

						window._bk.logs.batch_points[i] = [start, end];
					}

				}

			}

			// Flag current batch 
			window._bk.logs.current_batch = 0;

			// Store calls in logs
			window._bk.logs.calls = data;

			// 2 : BEGIN SENDING DATA
			window._bk.functions.callBatcher(); // send all data to API	

		};

		
		// FUNCTION : Call Batcher ###		
		window._bk.functions.callBatcher = function() {

			var data = window._bk.logs.calls;

			// Declare vars
			var batch_bucket_start = window._bk.logs.batch_bucket_start = window._bk.logs.batch_points[window._bk.logs.current_batch][0];
			var batch_bucket_end = window._bk.logs.batch_bucket_end = window._bk.logs.batch_points[window._bk.logs.current_batch][1];

			// Create batch of calls
			var current_calls = [];
			var j = 0;

			for (var i = batch_bucket_start - 1; i < batch_bucket_end; i++) {
				current_calls[j] = data[i];
				j++;
			}

			// Log calls which are being fired
			alertify.maxLogItems(1).delay(0).log("Importing Rules " + _bk.logs.batch_bucket_start + " to " + _bk.logs.batch_bucket_end + " (of " + _bk.logs.data_length + ")");

			// Call API with current batch
			for (var i = 0; i < current_calls.length; i++) {

				// declare vars
				var call_number = window._bk.logs.call_number = window._bk.logs.last_import.calls + 1;
				var current_call = current_calls[i];
				window._bk.functions.callDispatcher(current_call);

			}

		};

		
		// FUNCTION : Call Dispatcher ###
		window._bk.functions.callDispatcher = function(data) {

			var ruleName = data.name;
			var data = JSON.stringify(data);
			

			// send data to API
			jQuery.ajax({
				type: "POST",
				url: "https://publisher.bluekai.com/classification_rules",
				data: data,
				dataType: "json",
				//success: success() // build throttling
				contentType: "application/json"

			}).success(function() {

				// Success
				console.log("Self Classification | SUCCESS | " + (_bk.logs.last_import.calls + 1) + "/" + _bk.logs.last_import.length + " | " + ruleName);
				_bk.logs.last_import.success++;
				_bk.logs.last_import.calls++;
				_bk.functions.batch_api_checker(); // check if API call can be made

			}).fail(function(err) {

				// Fail

				// ADD ERROR DETAILS		
				console.log("Self Classification | FAIL | " + (_bk.logs.last_import.calls + 1) + "/" + _bk.logs.last_import.length + " | " + ruleName + " | " + err.responseText);
				_bk.logs.last_import.fail++;
				_bk.logs.last_import.calls++;
				_bk.functions.batch_api_checker(); // check if API call can be made

			});


		};
		
		// FUNCTION : BATCH API CHECKER ###		
		_bk.functions.batch_api_checker = function() {


			// if final item in batch
			if (window._bk.logs.call_number === window._bk.logs.batch_bucket_end) {

				// if not final call
				if (window._bk.logs.call_number !== _bk.logs.data_length) {
					// begin batching next set of data
					window._bk.logs.current_batch++;
					window._bk.functions.callBatcher();

				} else {

					// handle final call messaging
					var ratio = ((_bk.logs.last_import.success / _bk.logs.last_import.calls) * 100).toFixed(2) + "%";
					
					if (ratio !== "100.00%") {

						alertify.error("Failures : " + ratio + " success rate (" + _bk.logs.last_import.fail + " fails out of " + _bk.logs.last_import.calls + " - see console for details)");

					} else {

						alertify.success("Success : " + ratio + " success rate (" + _bk.logs.last_import.fail + " fails out of " + _bk.logs.last_import.calls + " - see console for details)");

					}

				}

			}
			window._bk.logs.call_number++; // increment call number

		};

		
		// FUNCTION : ADD CLASSIFICATIONS PROMPT ###				
		window._bk.functions.bk_add_bulk_classifications_prompt = function(data) {

			var message = "<h2>Please paste your JSON data in this format</h2>" +
				"<p> Click <a target='_blank' href='https://gist.github.com/rajtastic/2de2822a13b2e69189b0a4550e757d9f'>here</a> for correct format </p>" +
				"<p> Note : there may be a delay before the import begins if you are importing many rules (e.g. over 100) </p>";

			alertify.defaultValue("Please Paste Your JSON here").prompt(message,

				function(val, ev) {

					// The click event is in the event variable, so you can use it here.
					ev.preventDefault();

					// Reset log data
					window._bk.logs.last_import = {
						success: 0,
						fail: 0,
						calls: 0
					};

					// LOOP THROUGH JSON DATA AND SEND
					var exportData = "[" + val + "]";

					// Catch syntax errors in JSON
					try {

						var exportDataParsed = JSON.parse(exportData);
						_bk.logs.last_import.length = exportDataParsed.length;

					} catch (err) {

						alertify.error("JSON data not correctly formatted : see console");
						console.log("Self Classification | FAIL : JSON not formatted correctly | " + err);

					}


					// Send Data
					window._bk.functions.beginClassification(exportDataParsed);

					/*
					for (var i = 0; i < exportDataParsed.length; i++) {

						// Send Data
						window._bk.functions.createClassificationRulePhint(exportDataParsed[i]);

					}*/

				},
				function(ev) {

					// The click event is in the event variable, so you can use it here.
					ev.preventDefault();

				}
			);

		};


		// ADD BUTTON TO UI ###
		jQuery('button[value="destroy"]').parent().parent().append('<li><button id="bk_add_bulk_classifications" onclick="_bk.functions.bk_add_bulk_classifications_prompt()" class="button" name = "Add Bulk Classifications">Add Bulk Classifications</button></li>');

	}

	/*
		
	######################################
	### Self-Classification Categories ###
	######################################

	*/

	// ### SELF-CLASSIFICATION CATEGORIES ###	

	if (document.location.href.indexOf("https://publisher.bluekai.com/classification_categories") > -1){

		/*
		
		// ### HOT KEYS ###

		*/

		
		// Declare help button dialog
		_bk.msg = "<h2>Blue Kai Extender Help</h2>" +
			"<p>UPDATE THIS MESSAGE</p><br>" + // update this message
			"<table align style='width:100%'>" +
			
			"<tr><td><strong>Delete Rule</strong> (when selected rule)</td><td>" + _bk.keyModifierName + " + BACKSPACE</td></tr>" +
			"</table>" +
			"<br>" +
			"<p>For any problems please contact oracle_dmp_emea_deployments_gb_grp@oracle.com</p>";

		window._bk.functions.help_button = function() {
			alertify.alert(_bk.msg);
		};

		// Log BK Extender running
		_bk.functions.bk_running = function() {
			
			setTimeout(function() {
		
				if (window.alertify && window.alertify.log) {
					alertify.log('<h3>BlueKai Extender Running</h3><p>Click <a onClick="alertify.alert(_bk.msg);">here </a>for help</p>');					
				} else {
					//_bk.functions.bk_running();
				}
			}, 500);
		};
		_bk.functions.bk_running();


		// Help Button
		jQuery('button[value="reorder"]').parent().append('<li><button id="bk_Extender_help_button" onclick="_bk.functions.help_button()" class="button" name = "BK Extender Help">BK Extender Help</button></li>');
		
				
		// ### BULK CATEGORY IMPORTER ###
		
		// FUNCTION : Begin Data Send ###
		window._bk.functions.beginCategories = function(data) {

			// config
			var intervals = 50;

			// 1 : CALCULATE BATCH POINTS
			window._bk.logs.data_length = data.length; // how long is it?
			window._bk.logs.batches = Math.ceil(window._bk.logs.data_length / intervals); // how many batches to run?

			// how many in last batch?
			if (window._bk.logs.batches > 1) {

				var bulk = (window._bk.logs.batches - 1) * intervals;
				window._bk.logs.remainder = window._bk.logs.data_length - bulk;

			} else {
				window._bk.logs.remainder = window._bk.logs.data_length;
			}

			// Create array of batch points
			window._bk.logs.batch_points = [];

			for (var i = 0; i < window._bk.logs.batches; i++) {

				// if first item in array
				if (!window._bk.logs.batch_points[0]) {

					if (window._bk.logs.data_length < intervals) {

						var end_point = window._bk.logs.data_length;

					} else {
						end_point = intervals;
					}

					window._bk.logs.batch_points[i] = [1, end_point];

				} else {

					// all other items in array

					// if not the last one
					if ((i + 1) < window._bk.logs.batches) {

						// calculate start and end
						var start = (window._bk.logs.batch_points[i - 1][1]) + 1; // start
						var end = ((i + 1) * intervals); // end

						window._bk.logs.batch_points[i] = [start, end];

					} else {

						// if the last one

						// calculate start and end
						var start = (window._bk.logs.batch_points[i - 1][1]) + 1; // start
						var end = start + window._bk.logs.remainder - 1; // end

						window._bk.logs.batch_points[i] = [start, end];
					}

				}

			}

			// Flag current batch 
			window._bk.logs.current_batch = 0;

			// Store calls in logs
			window._bk.logs.calls = data;

			// 2 : BEGIN SENDING DATA
			window._bk.functions.callBatcher(); // send all data to API	

		};

		
		// FUNCTION : Call Batcher ###		
		window._bk.functions.callBatcher = function() {

			var data = window._bk.logs.calls;

			// Declare vars
			var batch_bucket_start = window._bk.logs.batch_bucket_start = window._bk.logs.batch_points[window._bk.logs.current_batch][0];
			var batch_bucket_end = window._bk.logs.batch_bucket_end = window._bk.logs.batch_points[window._bk.logs.current_batch][1];

			// Create batch of calls
			var current_calls = [];
			var j = 0;

			for (var i = batch_bucket_start - 1; i < batch_bucket_end; i++) {
				current_calls[j] = data[i];
				j++;
			}

			// Log calls which are being fired
			alertify.maxLogItems(1).delay(0).log("Importing Rules " + _bk.logs.batch_bucket_start + " to " + _bk.logs.batch_bucket_end + " (of " + _bk.logs.data_length + ")");

			// Call API with current batch
			for (var i = 0; i < current_calls.length; i++) {

				// declare vars
				var call_number = window._bk.logs.call_number = window._bk.logs.last_import.calls + 1;
				var current_call = current_calls[i];
				window._bk.functions.callDispatcher(current_call);

			}

		};

		
		// FUNCTION : Call Dispatcher ###
		window._bk.functions.callDispatcher = function(data) {

			var ruleName = data.name;
			var data = JSON.stringify(data);
			

			// send data to API
			jQuery.ajax({
				type: "POST",
				url: "https://publisher.bluekai.com/classification_rules",
				data: data,
				dataType: "json",
				//success: success() // build throttling
				contentType: "application/json"

			}).success(function() {

				// Success
				console.log("Self Classification | SUCCESS | " + (_bk.logs.last_import.calls + 1) + "/" + _bk.logs.last_import.length + " | " + ruleName);
				_bk.logs.last_import.success++;
				_bk.logs.last_import.calls++;
				_bk.functions.batch_api_checker(); // check if API call can be made

			}).fail(function(err) {

				// Fail

				// ADD ERROR DETAILS		
				console.log("Self Classification | FAIL | " + (_bk.logs.last_import.calls + 1) + "/" + _bk.logs.last_import.length + " | " + ruleName + " | " + err.responseText);
				_bk.logs.last_import.fail++;
				_bk.logs.last_import.calls++;
				_bk.functions.batch_api_checker(); // check if API call can be made

			});


		};
		
		// FUNCTION : BATCH API CHECKER ###		
		_bk.functions.batch_api_checker = function() {


			// if final item in batch
			if (window._bk.logs.call_number === window._bk.logs.batch_bucket_end) {

				// if not final call
				if (window._bk.logs.call_number !== _bk.logs.data_length) {
					// begin batching next set of data
					window._bk.logs.current_batch++;
					window._bk.functions.callBatcher();

				} else {

					// handle final call messaging
					var ratio = ((_bk.logs.last_import.success / _bk.logs.last_import.calls) * 100).toFixed(2) + "%";
					
					if (ratio !== "100.00%") {

						alertify.error("Failures : " + ratio + " success rate (" + _bk.logs.last_import.fail + " fails out of " + _bk.logs.last_import.calls + " - see console for details)");

					} else {

						alertify.success("Success : " + ratio + " success rate (" + _bk.logs.last_import.fail + " fails out of " + _bk.logs.last_import.calls + " - see console for details)");

					}

				}

			}
			window._bk.logs.call_number++; // increment call number

		};

		
		// FUNCTION : ADD CLASSIFICATIONS PROMPT ###				
		window._bk.functions.bk_add_bulk_categories_prompt = function(data) {

			window._bk.functions = window._bk.functions || {};
			window._bk.functions.file_process = function(data) {

			Papa.parse(event.target.files[0], {

				complete: function(results) {
					console.log(results);
					debugger;

					// hidden code
					/*
					// Reset log data
					window._bk.logs.last_import = {
						success: 0,
						fail: 0,
						calls: 0
					};

					// LOOP THROUGH JSON DATA AND SEND
					var exportData = "[" + val + "]";

					// Catch syntax errors in JSON
					try {

						var exportDataParsed = JSON.parse(exportData);
						_bk.logs.last_import.length = exportDataParsed.length;

					} catch (err) {

						alertify.error("JSON data not correctly formatted : see console");
						console.log("Self Classification | FAIL : JSON not formatted correctly | " + err);

					}


					// Send Data
					window._bk.functions.beginClassification(exportDataParsed);

					/*
					for (var i = 0; i < exportDataParsed.length; i++) {

						// Send Data
						window._bk.functions.createClassificationRulePhint(exportDataParsed[i]);

					}*/
					//*/

					alertify.success("Processed File");



					}
				});
			}

			// TO CHANGE : 
			var message = "<h2>Upload your CSV of NEW categories</h2>" +
				"<p> Click <a target='_blank' href='https://gist.github.com/rajtastic/2de2822a13b2e69189b0a4550e757d9f'>here</a> for correct format </p>" +
				"<p> Note : there may be a delay before the import begins if you are importing many rules (e.g. over 100) </p>";

			alertify
				.okBtn("Choose your file")
				.cancelBtn("Cancel")				
				.confirm(message, function(ev) {

					// The click event is in the
					// event variable, so you can use
					// it here.
					ev.preventDefault();

					jQuery('body').append('<input type="file" style="hidden" id="myFile">');
					jQuery('#myFile').on('change', window._bk.functions.file_process);
					jQuery('#myFile').click();

				}, function(ev) {

					// The click event is in the
					// event variable, so you can use
					// it here.
					ev.preventDefault();


				});
	
		};


		// ADD BUTTON TO UI ###
		jQuery('button[value="reorder"]').parent().append('<li><button id="bk_add_bulk_categories" onclick="_bk.functions.bk_add_bulk_categories_prompt()" class="button" name = "Add Bulk Categories">Add Bulk Categories</button></li>');		

	}

	/*
		
	#############################################
	### Self-Classification Category Exporter ###
	#############################################

	*/

	// SELF-CLASSIFICATION CATEGORIES ###

	if (document.location.href.indexOf("https://publisher.bluekai.com/classification_categories") > -1) {

		// INITIAL OBJECTS
		window._bk = window._bk || {};
		window._bk.functions = window._bk.functions || {};
		window._bk.logs = window._bk.logs || {};
		window._bk.category_ids = {};

		// FUNCTION : Category Builder
		window._bk.functions.category_grabber = function(category_id) {

			jQuery.ajax({
				type: "GET",
				url: "https://publisher.bluekai.com/classification_categories/" + category_id + "/children?_=" + Math.random() * 100000000000000000,
				dataType: "json",

			}).success(function(data) {

				// Timer to check if last request
				clearInterval(_bk.functions.finalRequestChecker); // clear previous timer

				// FUNCTION Create timer to check when final call categories have been received
				_bk.functions.finalRequestChecker = setInterval(function() {

					// code to export
					alertify.delay(3000).success("Exporting CSV...");
					console.log("Self Classification | ACTION | Exporting Categories");

					// Create CSV array
					var csv_export = [];
					csv_export.push(["category_id", "category_name ('>' replaced by '-')", "full_category_path ('>' replaced by '-')", "parent_id"]); // column headers

					// create row of data for each category
					for (var varName in window._bk.category_ids) {

						var line_data = [window._bk.category_ids[varName]["category_id"], window._bk.category_ids[varName]["category_name"], window._bk.category_ids[varName]["full_category_path"], window._bk.category_ids[varName]["parent_id"]];

						csv_export.push(line_data)

					}

					window._bk.functions.csvExport(csv_export); // export CSV
					clearInterval(_bk.functions.finalRequestChecker); // clear previous timer

				}, 5000);



				// Success	
				for (var i = 0; i < data.length; i++) {

					var category_name = data[i].name.replace(/>/g, "-");
					var category_id = data[i].id;
					var parent_id = data[i].parent_id;

					// calculate full category path
					if (!_bk.category_ids[parent_id]) {

						var full_category_path = category_name;

					} else if (_bk.category_ids[parent_id].full_category_path) {

						var full_category_path = _bk.category_ids[parent_id].full_category_path + " > " + category_name;

					}

					// Push data into _bk.category_ids object
					window._bk.category_ids[category_id] = {};
					window._bk.category_ids[category_id]["category_name"] = category_name;
					window._bk.category_ids[category_id]["category_id"] = category_id;
					window._bk.category_ids[category_id]["parent_id"] = parent_id;
					window._bk.category_ids[category_id]["full_category_path"] = full_category_path;

					console.log("Self Classification | SUCCESS | Child Categories Received from parent node : id=" + category_id + " name=" + category_name);

					// if this has child categories, pull them all
					if (data[i].leaf === false) {


						console.log("Self Classification | ACTION | Pulling initial additional child categories for node : id=" + data[i].id + " name=" + data[i].name);
						window._bk.functions.category_grabber(data[i].id);

					}
				}

			}).fail(function(err) {

				// Fail

				// ADD ERROR DETAILS		
				console.log("Self Classification | FAIL | " + err.responseText);

			});

		}

		// ADD BUTTON TO EXPORT IDS
		jQuery('button[value="reorder"]').parent().append('<li><button id="bk_Extender_category_export" onclick="window._bk.functions.category_grabber_start()" class="button" name = "BK Extender Category Exporter">Export All Categories</button></li>');


		// BEGIN SCRAPING
		window._bk.functions.category_grabber_start = function() {

			console.log("Self Classification | ACTION | Pulling initial child categories");

			alertify.maxLogItems(1).delay(0).log("Gathering Categories...");

			var initial_category_id = jQuery('li[class="tree-node"]').first().attr('title');

			// clearing categories from _bk.category_ids
			window._bk.category_ids = {};

			window._bk.functions.category_grabber(initial_category_id);

		}

	}

	/*
		
	################################################
	### Admin Table Downloader and Bootstrap CSS ###
	################################################

	*/

	// supports state dump

	if (document.domain === "tags.bluekai.com" && document.location.pathname === "/state_dump") {

		// Add libraries
		file_adder("script", "//code.jquery.com/jquery-3.1.1.min.js"); // JQuery
		file_adder("css", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"); // Bootstrap

		// DECLARE OBJECT
		window._bk = window._bk || {};
		window._bk.functions = window._bk.functions || {};
		window._bk.logs = window._bk.logs || {};

		// FUNCTION : Table Download to CSV function and download button in UI
		window._bk.functions.table_export_looper = function() {

			setTimeout(function() {

				if (typeof jQuery !== "undefined" && jQuery.fn && jQuery.fn.jquery) {

					// Add button to download CSV
					jQuery('body').prepend('<button id="bk_extender_table_download" onclick="jQuery(\'table\').tableToCSV();" class="button" name = "BK Extender Table Downloader">Download Table to CSV</button><br><br>');

					// Define table exporter function
					jQuery.fn.tableToCSV = function() {

						var clean_text = function(text) {
							text = text.replace(/"/g, '""');
							return '"' + text + '"';
						};

						$(this).each(function() {
							var table = $(this);
							var caption = $(this).find('caption').text();
							var title = [];
							var rows = [];

							$(this).find('tr').each(function() {
								var data = [];
								$(this).find('th').each(function() {
									var text = clean_text($(this).text());
									title.push(text);
								});
								$(this).find('td').each(function() {
									var text = clean_text($(this).text());
									data.push(text);
								});
								data = data.join(",");
								rows.push(data);
							});
							title = title.join(",");
							rows = rows.join("\n");

							var csv = title + rows;
							var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
							var download_link = document.createElement('a');
							download_link.href = uri;
							var ts = new Date().getTime();
							if (caption == "") {
								download_link.download = ts + ".csv";
							} else {
								download_link.download = caption + "-" + ts + ".csv";
							}
							document.body.appendChild(download_link);
							download_link.click();
							document.body.removeChild(download_link);
						});

					};

				} else {

					window._bk.functions.table_export_looper();
				}

			}, 500);
		}

		// Add Table Exporter Function
		window._bk.functions.table_export_looper();
		
	}


})();