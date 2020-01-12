mp.events.add("render", () => {
    if (sharedVariables.garageActive) {
        mp.game.graphics.drawText(sharedVariables.currentVehicleText, [0.5, 0.85], {
            font: 4,
            color: [255, 255, 255, 255],
            scale: [0.85, 0.85],
            outline: true
        });

        mp.game.graphics.drawText("Left/right arrow keys to switch between models~n~Shift to spawn~n~ESC to leave", [0.5, 0.90], {
            font: 0,
            color: [255, 255, 255, 255],
            scale: [0.4, 0.4],
            outline: true
        });
    }
});