// Listen for submit
document.querySelector('.calculator__form').addEventListener('submit', function(e){
    // hide results
    document.querySelector('.calculator__form--results').style.display = 'none';

    // show loader
    document.querySelector('.calculator__image-container').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results
function calculateResults(e){
    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly_payment');
    const totalPayment = document.getElementById('total_payment');
    const totalInterest = document.getElementById('total_interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        // show results
        document.querySelector('.calculator__form--results').style.display = 'block';

        // hide loader
        document.querySelector('.calculator__image-container').style.display = 'none';

    } else {
        showError('Please check your numbers');

        // hide loader
        document.querySelector('.calculator__image-container').style.display = 'none';
    }
}

// Error message
function showError(error){
    // create section
    const errorSection = document.createElement('section');

    // get elements
    const calculator = document.querySelector('.calculator');
    const heading = document.querySelector('.calculator__header');

    // add class
    errorSection.className = "calculator__error";
    // create p element inside
    errorSection.appendChild(document.createElement('p'));
    // create text node and append to section
    errorSection.firstChild.appendChild(document.createTextNode(error));

    // insert error above heading
    calculator.insertBefore(errorSection, heading);

    // clear error ater 3 s
    setTimeout(clearError, 3000);
}

// clear error
function clearError(){
    document.querySelector('.calculator__error').remove();
}