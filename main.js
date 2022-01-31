
// Function to change the amount to Oz given unit and amount
const toOz = (unit, amount) => {
    if (unit=="percentage") {
        amountInOz = Number(amount) * 0.0125;
    } else if (unit=="mg"){
        amountInOz = Number(amount) * 0.00125;
    } else if (unit=="gram"){
        amountInOz = Number(amount) * 0.03571428571;
    } else {
        amountInOz = Number(amount);
    }
    return amountInOz;
};

// Function to add the sum and return the totalin gm and Oz. This expects the parameters to be 3 values in mg.
const totalAmount = (firstAmount, secondAmount, thirdAmount) => {
    let totalInOz = (firstAmount + secondAmount + thirdAmount).toFixed(3);
    var totalInGm = (totalInOz*28).toFixed(2);
    return {totalInGm, totalInOz};
}

let concentrateAmount = 0;
let edibleAmount = 0;
let flowerAmount = 0;

// unit values
let concentrateUnit = 'percentage';
let edibleUnit = 'mg';
let flowerUnit = 'gram';

const changeTotal = () => {
    // Getting Input objects
    let concentrate = document.getElementById('concentrate');
    let edible = document.getElementById('edible');
    let flower = document.getElementById('flower');

    // Getting Input values
    concentrateAmount += Number(concentrate.value);
    edibleAmount += Number(edible.value);
    flowerAmount += Number(flower.value);

    // Converting different unit amounts to oz amount using toOz() function
    let concentrateAmountInOz = toOz(concentrateUnit, concentrateAmount);
    let edibleAmountInOz = toOz(edibleUnit, edibleAmount);
    let flowerAmountInOz = toOz(flowerUnit, flowerAmount);

    // Executing changeTotal function and applying them in HTML
    let total_obj = totalAmount(concentrateAmountInOz, edibleAmountInOz, flowerAmountInOz);
    
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
    document.getElementById("amount-description").innerHTML = `<b>Total in Quantity</b>:<br/>Concentrate: ${concentrateAmount}%.<br/>Edible: ${edibleAmount} mg.<br/>Flower: ${flowerAmount} gram.`;
}

// This function is to be executed when the user click reset button
const resetValue = () => {
    concentrate.value = 0;
    edible.value = 0;
    flower.value = 0;
    changeTotal();
}
