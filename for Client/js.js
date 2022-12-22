window.troni = {};


let connection;
let mainAccount;
let lastvalue = 0;
let oneToken = 10**6;

let contractAddress = "TTojERnFxQVim5SPDzqGkCfVPAA7MwpzAr";
let tokenaddress = "TKQHRgzvMNWppE4zDx95WWtciZkRQ54XFa"

function load_account_balance() {
    if (window.troni.address != undefined && window.troni.address != null) {
        window.tronWeb.trx
        .getAccount(window.troni.address)
        .then(function (response) {
            window.troni.tokencontract.balanceOf(response.address).call()
            .then((output) => {
                output = Number(output / 1000000);
                console.log('RESPONSE : ', output);
                jQuery("#getBalance").text(output);
            })
        })
        .catch(function (err) {
            swal("Error", err, "error");
        });
    }
}


window.setInterval(async function () {
    if (window.troni.address != window.tronWeb.defaultAddress.base58) {
        window.troni.address = window.tronWeb.defaultAddress.base58;
        window.troni.contract = await window.tronWeb
            .contract()
            .at(contractAddress)
            .catch(function (err) {
                console.log('err', err)
            });

            window.troni.tokencontract = await window.tronWeb
            .contract()
            .at(tokenaddress)
            .catch(function (err) {
                console.log('err', err)
            });

        console.log('SET INTERVER : ', window.troni.address)
        jQuery("#lock").text("Connected");

        load_account_balance();
    }
}, 500);








async function GetPayment_in_Matic(){
    try {
        let _amount = document.getElementById("GetPayment_in_MaticAmount").value;

        let totalamount = _amount * oneToken; // oneToken = 10**6;

        window.troni.contract.GetPayment_in_Matic()
        .send({callValue: totalamount, feeLimit: 100000000})
        .then((output) => {
            console.log("Output ", output);
            jQuery("#GetPayment_in_Matichash").text(output);
        });
    }
    catch (error) {
        console.log("sss", error);
    }
}

async function GetPayment_in_Token(){
    try {
        let _amount = document.getElementById("getpayment_in_tokenAmount").value;

        let totalAmount = _amount * oneToken; // oneToken = 10**6;

        window.troni.tokencontract.approve(contractAddress, totalAmount)
        .send({feeLimit: 100000000})
        .then((output) => {
            console.log("Output ", output);
            jQuery("#approve_getpayment_in_tokenhash").text("ApproveHash: " + output);
        });

        window.troni.contract.getpayment_in_token(totalAmount)
        .send({feeLimit: 100000000})
        .then((output) => {
            console.log("Output ", output);
            jQuery("#getpayment_in_tokenhash").text("GetPaymentHash: " + output);
        });
    }
    catch (error) {
        console.log("sss", error);
    }
}




async function getBalanceOfAccount() {
    tronWeb.trx.getBalance(mainAccount, function (err, res) {
        console.log("BALCNE RESPONE : ", res)
        jQuery("#getBalance").text(res / 1000000);
    });
}


















