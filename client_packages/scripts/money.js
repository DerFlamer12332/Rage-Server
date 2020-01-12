const diffDisplayTime = 3500;

let moneySet = false;
let currentMoney = 0;

mp.events.add("updateMoneyDisplay", (value) => {
    if (!moneySet) {
        moneySet = true;
    } else {
        let diff = value - currentMoney;

        if (diff < 0) {
            sharedVariables.moneyDiffText = `~HUD_COLOUR_DAMAGE~-$${Math.abs(diff)}`;
            sharedVariables.moneyDiffTime = Date.now() + diffDisplayTime;
        } else if (diff > 0) {
            sharedVariables.moneyDiffText = `~HUD_COLOUR_WHITE~+$${Math.abs(diff)}`;
            sharedVariables.moneyDiffTime = Date.now() + diffDisplayTime;
        }
    }

    currentMoney = value;
    if (currentMoney < 0) {
        sharedVariables.moneyText = `~HUD_COLOUR_RED~-$${Math.abs(currentMoney)}`;
    } else {
        sharedVariables.moneyText = `~HUD_COLOUR_GREEN~$${Math.abs(currentMoney)}`;
    }
});