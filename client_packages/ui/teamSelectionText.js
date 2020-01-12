mp.events.add("render", () => {
    if (sharedVariables.selectionActive) {
        mp.game.graphics.drawText(sharedVariables.teamName, [0.5, 0.875], {
            font: 4,
            color: [255, 255, 255, 255],
            scale: [0.85, 0.85],
            outline: true
        });

        mp.game.graphics.drawText("Left/right arrow keys to switch between teams~n~Shift to spawn", [0.5, 0.925], {
            font: 0,
            color: [255, 255, 255, 255],
            scale: [0.4, 0.4],
            outline: true
        });
    }
});