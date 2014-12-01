NoiseViolator.Views.ArtistForm = Backbone.View.extend({
	template: _.template(
		"<form>" +
			"<label for='artist-name'>Artist Name</label>" +
			"<input id='artist-name'><input type='submit' value='Find Artist' class='button'>" + 
		"</form>" +
		"<div class='current-artist'>" +
		"</div>"
	),

	events: {
		'submit form': 'setArtist'
	},

	setArtist: function() {
		event.preventDefault();
		var artistName = this.$el.find('#artist-name').val();
		this.$el.find('#artist-name').val('');
		// spinner
		$.ajax({
			url: 'http://ws.audioscrobbler.com/2.0/',
			dataType: 'json',
			data: {
				method: 'artist.getinfo',
				artist: artistName,
				autocorrect: 1,
				api_key: 'f33b1bdb4bead8c686120d81d2baa09b',
				format: 'json'
			},
			success: function(data) {
				// debugger
				// spinner off
				var artistName = data.artist.name;
				var imgUrl = data.artist.image[3]['#text'];
				var summary = data.artist.bio.summary; 
				this.$el.find('.current-artist').html("<img src='" + imgUrl + "'>");
			}.bind(this)
		})
		console.log(artistName);
	},

	render: function() {
		this.$el.html(this.template);
		return this;
	}
})