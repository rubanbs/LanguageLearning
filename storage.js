(function(angular) {

	angular
		.module('storage', [])
		.factory('storage', storage);
	
	var words = [
			{
				id: 1,
				origin: "success",
				translation: "успех",
				usedInRound: false
			},
			{
				id: 2,
				origin: "sober",
				translation: "трезвый",
				usedInRound: false
			},
			{
				id: 3,
				origin: "courage",
				translation: "смелый",
				usedInRound: false
			},
			{
				id: 4,
				origin: "bold",
				translation: "смелый",
				usedInRound: false
			},
			{
				id: 5,
				origin: "band",
				translation: "канат, веревка",
				usedInRound: false
			}
		];
	
	var newRound = true;
	
	function storage () {
		
		return {
			
			getWord: function (origin){
				
				return _.find(words, ["origin", origin]);
			},
			
			getRandom: function (){
				
				if (newRound) {
					words = _.shuffle(words);
					newRound = false;
				}
				
				var word = _.find(words, { usedInRound: false });
				
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