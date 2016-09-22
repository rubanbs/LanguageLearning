(function(angular) {

	angular
		.module('storage', [])
		.factory('search', search)
		.factory('storage', storage);
	
	var searchOptions = {
		stars: 0
	};
	
	function search() {
		
		return {
			
			get: function() {
				
				return searchOptions;
			},
			
			set: function(params) {
				
				searchOptions.stars = params.stars;
			}
		};
	}
	
	var words = [
			{
				id: 1,
				origin: "success",
				translation: "�����",
				usedInRound: false,
				stars: 0
			},
			{
				id: 2,
				origin: "sober",
				translation: "�������",
				usedInRound: false,
				stars: 0
			},
			{
				id: 3,
				origin: "courage",
				translation: "������",
				usedInRound: false,
				stars: 0
			},
			{
				id: 4,
				origin: "bold",
				translation: "������",
				usedInRound: false,
				stars: 1
			},
			{
				id: 5,
				origin: "band",
				translation: "�����, �������",
				usedInRound: false,
				stars: 1
			}
		];
	
	var newRound = true;
	
	function storage () {
		
		return {
			
			getWord: function (origin){
				
				return _.find(words, ["origin", origin]);
			},
			
			getRandom: function (stars) {
				
				if (newRound) {
					words = _.shuffle(words);
					newRound = false;
				}
				
				var word = stars ? _.find(words, { stars: stars, usedInRound: false }) : _.find(words, { usedInRound: false });
				
				if (word) {
					
					word.usedInRound = true;
					
				} else {
					
					_.forEach(words, function (_word){
						_word.usedInRound = false;
					});
					
					words.push(words.shift())
					
					words = _.shuffle(words);
					
					word = _.find(words, { usedInRound: false });
				}
				
				return word;
			}
		};
	}

})(window.angular);