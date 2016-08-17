// ==UserScript==
// @name         BlueKai Category Editor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extending BlueKai UI to improve
// @author       Roshan Gonsalkorale (roshan.gonsalkorale@oracle.com)
// @match        https://*.bluekai.com/*
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

	// DECLARE OBJECT
	window._bk = window._bk || {};
	window._bk.functions = window._bk.functions || {};
	window._bk.logs = window._bk.logs || {};
	
	// DETECT OPERATION SYSTEM
	if(navigator && navigator.platform && navigator.platform.toLowerCase().indexOf('mac') > -1){_bk.os = "mac";} else {_bk.os ="windows";}
	
	// SELF-CLASSIFICATION RULES	
	if (document.location.href.indexOf("https://publisher.bluekai.com/classification_categories") > -1){

		/*
		
		###################
		### 1. HOT KEYS ###
		###################

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
			"<p>For any problems please contact roshan.gonsalkorale@oracle.com</p>";

		window._bk.functions.help_button = function() {
			alertify.alert(_bk.msg);
		};

		// Log BK Extender running
		_bk.functions.bk_running = function() {
			
			setTimeout(function() {
		
				if (window.alertify && window.alertify.log) {
					alertify.log('<h3>BlueKai Category Editor Running</h3><p>Click <a onClick="alertify.alert(_bk.msg);">here </a>for help</p>');					
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
	

		/*
		
		############################################
		### 2. BULK SELF-CLASSIFICATION IMPORTER ###
		############################################

		*/

		/*
		##################################
		### FUNCTION : Begin Data Send ###
		##################################
		*/


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

					window._bk.logs.batch_points[i] = [1, end_point]

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

		}

		/*
		###############################
		### FUNCTION : Call Batcher ###
		###############################
		*/

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

		}

		/*
		##################################
		### FUNCTION : Call Dispatcher ###
		##################################
		*/

		window._bk.functions.callDispatcher = function(data) {

			/*data = {
                "name": "V Test",
                "parent_id": 637048,
                "description": "newCategoryDescription",
                "analytics_excluded": "false",
                "navigation_only": "false",
                "mutex_children": "false",
                "notes": "Sample notes"
            }*/
            
            var ruleName = data.name;
			var data = JSON.stringify(data);
			

			// send data to API
			jQuery.ajax({
				type: "POST",
                url: "https://publisher.bluekai.com/classification_categories",
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


		}

		/*
		####################################
		### FUNCTION : BATCH API CHECKER ###
		####################################
		*/

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

					if (ratio !== "100%") {

						alertify.error("Failures : " + ratio + " success rate (" + _bk.logs.last_import.fail + "/" + _bk.logs.last_import.calls + " see console for details)");

					} else {

						alertify.success("Success : " + ratio + " success rate (" + _bk.logs.last_import.fail + "/" + _bk.logs.last_import.calls + " see console for details)");

					}

				}

			}
			window._bk.logs.call_number++ // increment call number

		}

		/*
		#############################################
		### FUNCTION : ADD CLASSIFICATIONS PROMPT ###
		#############################################
		*/

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

		/*
		####################################
		### ADD BUTTON TO UI ###
		####################################
		*/

		jQuery('button[value="reorder"]').parent().parent().append('<li><button id="bk_add_bulk_classifications" onclick="_bk.functions.bk_add_bulk_classifications_prompt()" class="button" name = "Add Bulk Classifications">Bulk Edit Categories</button></li>');

	}
})();