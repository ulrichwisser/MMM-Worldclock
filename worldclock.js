/* global Log, Module, moment, config */
/* Magic Mirror
* Module: Clock
*
* By Michael Teeuw http://michaelteeuw.nl
* MIT Licensed.
*/
Module.register("worldclock",{
	// Module config defaults.
	defaults: {
		timeFormat: 'LT', //defined in moment.js format()
		style: 'top', //where the time could be located; 'top', 'left','right','bottom'
		clocks: [
			{
				title: "Home",
			},
			{
				title: "HOLLYWOOD", // Too long title could cause ugly text align.
				timezone: "America/Los_Angeles", //When omitted, Localtime will be displayed. It might be not your purporse, I bet.
				timegap: true, // options: 'true' shows timezone gap by UTC
			},
			{
				timezone: "Asia/Seoul",
			},
		]
	},
	// Define required scripts.
	getScripts: function() {
		return ["moment.js", "moment-timezone.js"];
	},
	// Define styles.
	getStyles: function() {
		return ["worldclock.css"];
	},
	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		// Schedule update interval.
		var self = this;
		setInterval(function() {
			self.updateDom();
		}, 1000);

		// Set locale.
		moment.locale(config.language);
	},

	clockFormat: function(c, index) {

		var worldWrapper = document.createElement("div");
		worldWrapper.className = "world world-" + index;

		var clock = moment();

		if (c.timezone == null || undefined ) {
			clock.local();
		} else {
			clock.tz(c.timezone);
		}

		var timeString;
		timeString = clock.format(this.config.timeFormat);


		var timeWrapper = document.createElement("div");

		timeWrapper.innerHTML = timeString;
		timeWrapper.className = "time bright medium";

		var captionWrapper = document.createElement("div");
		captionWrapper.className = 'caption small normal';


		var zoneWrapper = document.createElement("div");
		zoneWrapper.className = 'zone';

		if (c.title != null) {
			zoneWrapper.innerHTML = c.title;
		} else {
			zoneWrapper.innerHTML = c.timezone;
		}



		var clearfixWrapper = document.createElement("div");
		clearfixWrapper.className = "clearfix";

		captionWrapper.appendChild(zoneWrapper);

		if (c.timegap == true) {
			var gapWrapper = document.createElement("div");
			gapWrapper.className = 'gap';
			gapWrapper.innerHTML = 'UTC ' + clock.format('Z');
			captionWrapper.appendChild(gapWrapper);
		}

		if (this.config.style == 'bottom') {
			worldWrapper.appendChild(captionWrapper);
			worldWrapper.appendChild(timeWrapper);
		} else {
			worldWrapper.appendChild(timeWrapper);
			worldWrapper.appendChild(captionWrapper);

		}

		worldWrapper.appendChild(clearfixWrapper);

		return worldWrapper;
	},




	// Override dom generator.
	getDom: function() {

		var wrapper = document.createElement("div");
		wrapper.className = "worldtime" + ' style-' + this.config.style;
		var c;
		for (c in this.config.clocks) {
			wrapper.appendChild(this.clockFormat(this.config.clocks[c], c));
		}
		return wrapper;
	}
});
