NoiseViolator.Views.ArtistForm = Backbone.View.extend({
	template: _.template(
		"<form>" +
			"<label for='artist-name'>Artist/Group Name</label>" +
			"<input id='artist-name'><input type='submit' value='Find Artist' class='button'>" + 
		"</form>" +
		"<div class='current-artist'>" +
		"</div>"
	),

	events: {
		'submit    form'            : 'setArtist',
		'violation .current-artist' : 'artistViolationNote'
	},

	setArtist: function() {
		event.preventDefault();

		// reset input field
		var $inputField = this.$el.find('#artist-name');
		this.artistName = $inputField.val();
		$inputField.val('');
		
		this.$el.find('.current-artist').hide();

		this._accessLastFMApi();
	},

	artistViolationNote: function(event, date) {
		if (typeof this.artistName != 'undefined') {
			var $artistViolationNote = $("<div class='artist-violation-note'></div>").html(this._errorMessage);


			setTimeout(function() {
				$artistViolationNote.fadeToggle(300);
			}, 3000);
			$artistViolationNote.fadeToggle(300);
		}
	},

	_errorMessage: function() {
		var date = new Date;
		return this.summary + 
			' and ' +
			'this.artistName' + 
			' knows that you have committed a noise violation at ' +
			date.toLocaleString() + 
			'.';
	},

	render: function() {
		this.$el.html(this.template);
		return this;
	},

	_accessLastFMApi: function() {
		$.ajax({
			url: 'http://ws.audioscrobbler.com/2.0/',
			dataType: 'json',
			data: {
				method: 'artist.getinfo',
				artist: this.artistName,
				autocorrect: 1,
				api_key: 'f33b1bdb4bead8c686120d81d2baa09b',
				format: 'json'
			},
			success: this._setPicture.bind(this)
		});
	},

	_setPicture: function(data) {
		if (typeof data.artist != 'undefined') {
			this.artistName = data.artist.name;
			var imgUrl = data.artist.image[3]['#text'];
			this.summary = data.artist.bio.summary.split('. ', 1)[0].trim(); 
			this.$el.find('.current-artist').html("<img src='" + imgUrl + "'>").fadeIn(600);			
		} else {
			delete this.artistName;
		}
	},
})