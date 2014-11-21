NoiseViolator.Views.MeterForm = Backbone.View.extend({
	template: _.template(
		"<div class='pane'>" + 
		"<label for='cell-number'>Cellphone Number</label>" +
		"<input id='cell-number' type='tel'><button type='button'>Add Contact</button>" +
		"</div>" +
		"<div class='pane'>" +
		"<label for='threshold'>Threshold</label>" +
		"<input type='range' id='slider'><span class='slider-value'>0.5</span>" +
		"<label>Sound Level</label>" +
		"<meter></meter><span class='meter-value'>0.0</span>" +
		"</div>"
	),

	className: 'dashboard',

	events: {
		'mousedown #slider': 'updateSlider'
	},

	initialize: function() {
		this._setContext();
		this._setConstraints();
		this._assignGetUserMedia();
		this.threshold = 0.5;
		this.violation = [];
	},

	updateSlider: function() {
		console.log(this.threshold);
		$sliderValue = this.$el.find('.slider-value');
		var that = this;
		$(window).mousemove(function() {
			that._setThreshold();
			$sliderValue.html(that.threshold);
		});
	},

	_setThreshold: function() {
		this.threshold = this.$el.find('#slider').val() / 100;
	},

	_setContext: function() {
		try {
		  window.AudioContext = window.AudioContext || window.webkitAudioContext;
		  window.audioContext = new AudioContext();
		} catch (e) {
		  alert('Web Audio API not supported.');
		}
	},

	_setConstraints: function() {	
		window.constraints = { audio: true, video: false };
	},

	_assignGetUserMedia: function() {
	navigator.getUserMedia = navigator.getUserMedia ||
	  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	},

	errorCallback: function(error) {
	  console.log('navigator.getUserMedia error: ', error);
	},

	runMeter: function() {
		console.log('runMeter');
		var level = soundMeter.instant.toFixed(2);
    $meter.val(level);
    $meterValue.text(level); 
    this._updateViolations(level);
	},

	_sendText: function() {
		console.log('send text');
	},

	_updateTopViolations: function() {
		var violation = new NoiseViolator.Models.NoiseViolation({ 
			volume: this.violation,
		});
		if (NoiseViolator.noiseViolations.length < 3) {
			NoiseViolator.noiseViolations.add(violation);	
		} else if (NoiseViolator.noiseViolations.isTopViolation(violation)) {
			NoiseViolator.noiseViolations.pop();
			NoiseViolator.noiseViolations.add(violation);			
		}
	},

	_updateViolations: function(level) {
		if (level > this.threshold) {
			this.violation.push(level);		
		} else if (this.violation.length > 4) {
			this._sendText();
			this._updateTopViolations();
			this.violation = [];
		}
	},

	successCallback: function(stream) {
	  // Put variables in global scope to make them available to the browser console.
	  window.stream = stream;
	  var soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
	  soundMeter.connectToSource(stream);
	  $meter = this.$el.find('meter');
	  $meterValue = this.$el.find('.meter-value');

	  setInterval(this.runMeter.bind(this), 200);
	},

	render: function() {
		this.$el.html(this.template);
		navigator.getUserMedia(
			constraints, 
			this.successCallback.bind(this), 
			this.errorCallback.bind(this)
		);
		return this;	
	}
})