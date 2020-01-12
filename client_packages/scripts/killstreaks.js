mp.events.add("updateKSDisplay", (amount) => {
    sharedVariables.killstreakText = `Killstreak: ${amount}`;
});