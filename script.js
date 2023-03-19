const bill = document.getElementById('bill');
const people = document.getElementById('people');
const customTip = document.getElementById('customTip');
const resetBtn = document.getElementById('resetBtn');
const tips = document.getElementsByClassName('tip');
const inputs = document.getElementsByTagName('input');

const tipValue = document.getElementById('tipValue');
const totalValue = document.getElementById('totalValue');

let numOfPeople, billValue, tipProcent;

for(let i = 0; i < tips.length; i++) {
    let tip = tips[i];
    if(!tip.classList.contains('custom'))
        tip.addEventListener('click', () => {
            tipProcent = Number(tip.innerText.match(/[0-9]*/));
            unsetTipActive();
            tip.classList.add('active');

            if(customTip.value != '') customTip.value = '';

            showCalculatedValues();
        })
}

resetAll();
bill.addEventListener('keyup', verifyBillInput);
people.addEventListener('keyup', verifyPeopleInput);
customTip.addEventListener('click', unsetTipActive);
customTip.addEventListener('keyup', () => {
    if(customTip.value.toString().trim().match(/^[0-9][0-9]*\.*[0-9]*/) == 
    customTip.value.toString().trim()) {
        tipProcent = Number(customTip.value.match(/[0-9]*/));
        console.log(tipProcent);
    }
    else tipProcent = 0;
    showCalculatedValues();
});
resetBtn.addEventListener('click', resetAll);

function resetAll() {
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = null;
        if(inputs[i].classList.contains('active')) {
            inputs[i].classList.remove('active');
            let errorMsg = inputs[i].parentElement.nextElementSibling;
            errorMsg.classList.remove('active');
        }
    }
    unsetTipActive();

    numOfPeople = billValue = tipProcent = undefined;

    tipValue.innerText = `$0.00`;
    totalValue.innerText = `$0.00`;
}
function unsetTipActive() {
    for(let i = 0; i < tips.length; i++) 
        if(!tips[i].classList.contains('custom') &&
            tips[i].classList.contains('active'))
                tips[i].classList.remove('active');
}
function verifyBillInput() {
    if((bill.value.toString().trim().match(/^[0-9][0-9]*\.*[0-9]*/) != 
    bill.value.toString().trim() && bill.value.length != 0)) {
        bill.classList.add('active');
        let errorMsg = bill.parentElement.nextElementSibling;
        errorMsg.innerText = 'The field must contain only numbers!';
        errorMsg.classList.add('active');
    } else {
        billValue = Number(bill.value);
        bill.classList.remove('active');
        let errorMsg = bill.parentElement.nextElementSibling;
        errorMsg.classList.remove('active');
    }

    showCalculatedValues();
}
function verifyPeopleInput() {
    if(people.value.trim().match(/^[0-9]*/g)!= people.value.trim() &&
    people.value.length != 0) {
        people.classList.add('active');
        let errorMsg = people.parentElement.nextElementSibling;
        errorMsg.innerText = 'The field must contain only integer numbers!';
        errorMsg.classList.add('active');
    } 
    else if(people.value.trim().match(/^[0-9]*/g)== people.value.trim() &&
    people.value.length == 0 || people.value.trim().match(/^[0-9]*/g)== people.value.trim() &&
    people.value == 0){
        people.classList.add('active');
        let errorMsg = people.parentElement.nextElementSibling;
        errorMsg.innerText = "Can't be 0";
        errorMsg.classList.add('active');
    } else {
        numOfPeople = Number(people.value);
        people.classList.remove('active');
        let errorMsg = people.parentElement.nextElementSibling;
        errorMsg.classList.remove('active');

        showCalculatedValues();
    }
}
function showCalculatedValues() {
    if(billValue != undefined && tipProcent != undefined && numOfPeople != undefined) {
        const x = billValue * tipProcent / 100 / numOfPeople;
        const y = (billValue * tipProcent / 100 + billValue) / numOfPeople;
        tipValue.innerText = `$${x.toFixed(2)}`;
        totalValue.innerText = `$${y.toFixed(2)}`;
    }
}
