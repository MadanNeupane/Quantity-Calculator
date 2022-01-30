
// Function to change the amount to Mg given unit and amount
const toMg = (unit, amount) => {
    if (unit=="percentage") {
        amountInMg = Number(amount) * 10;
    } else if (unit=="gram"){
        amountInMg = Number(amount) * 1000;
    } else {
        amountInMg = Number(amount);
    }
    return amountInMg;
};

// Function to add the sum and return the totalin gm and Oz. This expects the parameters to be 3 values in mg.
const totalAmount = (firstAmount, secondAmount, thirdAmount) => {
    let totalInMg = firstAmount + secondAmount + thirdAmount;
    var totalInGm = (totalInMg/1000).toFixed(2);
    var totalInOz = (totalInGm/28.34952312).toFixed(3);
    return {totalInGm, totalInOz};
}
 
const changeTotal = () => {
    // Getting Input objects
    let concentrate = document.getElementById('concentrate');
    let edible = document.getElementById('edible');
    let flower = document.getElementById('flower');

    // Getting Input values
    let concentrateAmount = concentrate.value;
    let edibleAmount = edible.value;
    let flowerAmount = flower.value;

    // Getting Select values
    let concentrateUnit = document.getElementById('concentrate-unit').value;
    let edibleUnit = document.getElementById('edible-unit').value;
    let flowerUnit = document.getElementById('flower-unit').value;

    // Converting different unit amounts to mg amount using toMg() function
    let concentrateAmountInMg = toMg(concentrateUnit, concentrateAmount);
    let edibleAmountInMg = toMg(edibleUnit, edibleAmount);
    let flowerAmountInMg = toMg(flowerUnit, flowerAmount);

    let total_obj = totalAmount(concentrateAmountInMg, edibleAmountInMg, flowerAmountInMg);
    // Executing changeTotal function and applying them in HTML
    
    document.getElementById("amount-in-oz").innerHTML = `${total_obj.totalInOz} oz`;
    document.getElementById("amount-in-gram").innerHTML = `(${total_obj.totalInGm} gram).`;

    // add red blink animation if the amount goes pass 1 oz    
    let totalAmountElement = document.getElementById("total-amount");
    if (total_obj.totalInOz>1) {
        totalAmountElement.classList.add("overAmount");
    }
    else {
        totalAmountElement.classList.remove("overAmount");
    }

    //add amount description at buttom
    document.getElementById("amount-description").innerHTML = `<b>Equivalent amounts in mg</b>:<br/>Concentrate: ${concentrateAmountInMg} mg.<br/>Edible: ${edibleAmountInMg} mg.<br/>Flower: ${flowerAmountInMg} mg.`;
}

// This function is to be executed when the user click reset button
const resetValue = () => {
    concentrate.value = 0;
    edible.value = 0;
    flower.value = 0;
    changeTotal();
}
