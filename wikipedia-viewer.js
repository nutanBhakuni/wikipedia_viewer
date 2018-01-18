(function(){

	function viewResults(event){
		event.preventDefault();
		
		let query_string = document.querySelector('.search-query').value;
		let search_results = document.querySelector('.search-results');
		let description = "";

		search_results.innerHTML = "";

		fetch('https://en.wikipedia.org/w/api.php?action=opensearch&search='+query_string+'&format=json&origin=*')
		.then(function(response){
			if ( response.ok ) {
        		return response.json();
    		}
    		throw new Error( 'Network response was not ok: ' + response.statusText );
    		search_results.innerHTML = "Sorry, no articles can be found";
		}).then( function (data) {
				if(data.length == 0){
					search_results.innerHTML = "No resutls exists for your search query";
				}
				else{
					for(let j=0; j<data[1].length; j++){
						description = data[2][j];
						if(description == "")
							description = "No description exist";
					
						search_results.innerHTML += '<article><a href="'+data[3][j]+'" target="_blank"><h1 class="article-heading">'+data[1][j]+'</h1></a><p class="article-text">'+description+'</p></article>';
					}
				}

				document.querySelector('.search-field').classList.add("reduce-height");
				document.querySelector('.search-results').classList.add("increase-height");
		});
	}

	document.querySelector('form').addEventListener('submit', viewResults);
})();
