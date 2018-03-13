
function calcTax(taxableIncome) {
    let incomeTax = 0

    if (0 <= taxableIncome && taxableIncome <= 1950000)
        incomeTax = taxableIncome * 0.05
    else if (1950000 <= taxableIncome && taxableIncome <= 3300000)
        incomeTax = taxableIncome * 0.1 - 97500
    else if (3300000 <= taxableIncome && taxableIncome <= 6950000)
        incomeTax = taxableIncome * 0.2 - 427500
    else if (6950000 <= taxableIncome && taxableIncome <= 9000000)
        incomeTax = taxableIncome * 0.23 - 636000
    else if (9000000 <= taxableIncome && taxableIncome <= 18000000)
        incomeTax = taxableIncome * 0.33 - 1536000
    else if (18000000 <= taxableIncome && taxableIncome <= 40000000)
        incomeTax = taxableIncome * 0.4 - 2796000
    else
        incomeTax = taxableIncome * 0.45 - 4796000


    let reconstructionTax = Math.floor(incomeTax * 0.021) / 100 * 100

    $("#total_income_tax").text((incomeTax + reconstructionTax).toLocaleString())
    $("#normal_income_tax").text(incomeTax.toLocaleString())
    $("#reconstruction_special_income_tax").text(reconstructionTax.toLocaleString())
}

$(function() {
    // キーを入力するたびに実行
    $('input[type="number"]').keyup(function() {

        let taxableIncome = $(this).val()
        calcTax(taxableIncome)
    });
})
