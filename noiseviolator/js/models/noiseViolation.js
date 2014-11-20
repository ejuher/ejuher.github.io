NoiseViolator.Models.NoiseViolation = Backbone.Model.extend({
	output: function () {
		var output = 0;
		var volumes = this.get('volume');
		for (var i = 0, len = volumes.length; i < len; i++) {
			output += volumes[i];
		}
		return output;
	}
})