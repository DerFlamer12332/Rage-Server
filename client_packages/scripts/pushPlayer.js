

						// Komma - Verbandskasten ziehen 
	mp.keys.bind(0xBC, true, () => {

	setTimeout(function () {
           mp.events.callRemote("Verband");
        }, 5000);

    	
});




						// Punkt - Weste ziehen 

	mp.keys.bind(0xBE, true, () => {

	setTimeout(function () {
           mp.events.callRemote("Weste");
        }, 5000);

    	
});
