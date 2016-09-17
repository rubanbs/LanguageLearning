
	angular
		.module('storage', [])
		.factory('storage', storage);
	
	var words = [
			{
				id: 1,
				origin: "success",
				translation: "успех"
			},
			{
				id: 2,
				origin: "sober",
				translation: "трезвый"
			},
			{
				id: 3,
				origin: "courage",
				translation: "смелый"
			},
			{
				id: 4,
				origin: "bold",
				translation: "смелый"
			}
		];
	
	function storage () {
		
		return {
			
			getWord: function (origin){
				
				return _.find(words, ["origin", origin]);
			}
		};
	}