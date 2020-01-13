

						// Komma - Verbandskasten ziehen 
	mp.keys.bind(0xBC, true, () => {
	mp.game.streaming.requestAnimDict("random@shop_robbery");
	mp.players.local.taskPlayAnim("random@shop_robbery", "robbery_action_f", 8.0, 1.0, 5000, 1, 1.0, false, false, false);
	setTimeout(function () {
        mp.events.callRemote("Verband");
	
       }, 5000);

   	
});




						// Punkt - Weste ziehen 


	mp.keys.bind(0xBE, true, () => {
	mp.game.streaming.requestAnimDict("random@shop_robbery");
	mp.players.local.taskPlayAnim("random@shop_robbery", "robbery_action_f", 8.0, 1.0, 5000, 1, 1.0, false, false, false);
	setTimeout(function () {
        mp.events.callRemote("Weste");
	
       }, 5000);

   	
});
