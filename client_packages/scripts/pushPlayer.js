// Punkt - Verbandskasten ziehen 
mp.keys.bind(0xBE, false, () => {

    mp.events.callRemote("Weste");
});

// Komma - Weste ziehen 
mp.keys.bind(0xBC, false, () => {

    mp.events.callRemote("Verband");
});
