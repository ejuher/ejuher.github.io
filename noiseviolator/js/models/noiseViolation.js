NoiseViolator.Models.NoiseViolation = Backbone.Model.extend({

	initialize: function () {
		if (typeof this.get('time') === 'undefined') {
			var timestamp = new Date();
			this.set('time', timestamp.toLocaleTimeString());
		}
		this.set('output', this.calculateOutput());
		debugger
	},

	calculateOutput: function () {
		var output = 0;
		var volumes = this.get('volume');
		for (var i = 0, len = volumes.length; i < len; i++) {
			output += Number(volumes[i]);
		}
		return output	
	}
})