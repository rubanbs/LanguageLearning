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
	
	var words;
	
	var newRound = true;
	
	function storage (localStorageService) {
		
		words = words || localStorageService.get('words');
		
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