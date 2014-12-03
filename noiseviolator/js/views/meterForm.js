NoiseViolator.Views.MeterForm = Backbone.View.extend({
	template: _.template(
		"<label for='threshold'>Threshold</label>" +
		"<input type='range' id='slider'><span class='slider-value'>0.5</span>" +
		"<label>Sound Level</label>" +
		"<meter optimum='0'></meter><span class='meter-value'>0.0</span>" +
		"<div class='screen'><div class='alert'>VIOLATION!</div></div>" 
	),

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
		$sliderValue = this.$el.find('.slider-value');
		$meter = this.$el.find('meter');
		var that = this;
		$(window).mousemove(function() {
			that._setThreshold();
			$sliderValue.html(that.threshold);
			$meter.attr('high', that.threshold);
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
		var level = soundMeter.instant.toFixed(2);
    $meter.val(level);
    $meterValue.text(level); 
    this._updateViolations(level);
	},

	_updateTopViolations: function() {
		var violation = new NoiseViolator.Models.NoiseViolation({ 
			volume: this.violation,
		});
		if (NoiseViolator.noiseViolations.length < 3) {
			NoiseViolator.noiseViolations.add(violation);	
			this._topAlert();
		} else if (NoiseViolator.noiseViolations.isTopViolation(violation)) {
			NoiseViolator.noiseViolations.pop();
			NoiseViolator.noiseViolations.add(violation);		
			this._topAlert();	
		}
	},

	_topAlert: function() {
		var $table = $('table');
		setTimeout(function() {
			$table.removeClass('new-top-violation');
		}, 2000);
		$table.addClass('new-top-violation');
	},

	_updateViolations: function(level) {
		if (level > this.threshold) {
			this.violation.push(level);		
		} else if (this.violation.length > 4) {
			this._violationAlert();
			$('.current-artist').trigger('violation');
			this._updateTopViolations();
			this.violation = [];
		}
	},

	_violationAlert: function() {
		var that = this;
		var $alertAndScreen = this.$el.find('.alert, .screen');
		setTimeout(function() {
			$alertAndScreen.fadeToggle(300);
		}, 600);
		$alertAndScreen.fadeToggle(300);
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