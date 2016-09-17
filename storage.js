
	angular
		.module('storage', [])
		.factory('storage', storage);
	
	var words = [
			{
				id: 1,
				origin: "success",
				translation: "�����"
			},
			{
				id: 2,
				origin: "sober",
				translation: "�������"
			},
			{
				id: 3,
				origin: "courage",
				translation: "������"
			},
			{
				id: 4,
				origin: "bold",
				translation: "������"
			}
		];
	
	function storage () {
		
		return {
			
			getWord: function (origin){
				
				return _.find(words, ["origin", origin]);
			}
		};
	}