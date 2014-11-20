NoiseViolator.Views.MeterForm = Backbone.View.extend({
	template: _.template(
		"<label for='cell-number'>Cellphone Number:</label>" +
		"<input id='cell-number' type='tel'>" +
		"<label for='threshold'>Threshold</label>" +
		"<input type='range'>" +
		"<input type='submit'>" +
		"<meter></meter><div class='meter-value'></div>"
	),

	className: 'threshold',

	initialize: function() {
		this._setContext();
		this._setConstraints();
		this._assignGetUserMedia();
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

	errorCallback: function (error) {
	  console.log('navigator.getUserMedia error: ', error);
	},

	successCallback: function (stream) {
	  // Put variables in global scope to make them available to the browser console.
	  console.log('success');
	  window.stream = stream;
	  var soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
	  soundMeter.connectToSource(stream);

	  $meter = this.$el.find('meter');
	  $meterValue = this.$el.find('.meter-value');

	  setInterval(function() {
	  	console.log('running');
	    meter.value = meterValue.innerText =
	      soundMeter.instant.toFixed(2);
	  }, 200);
	},

	render: function() {
		this.$el.html(this.template);
		debugger
		navigator.getUserMedia(
			constraints, this.successCallback, this.errorCallback
		);
		return this;	
	}
})