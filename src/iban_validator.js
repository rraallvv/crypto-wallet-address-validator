function ibanCheck(address) {
    var num = address.split('').map(function(c) {
        var code = c.toUpperCase().charCodeAt(0);
        return code >= 48 && code <= 57 ? c : (code - 55).toString();
    }).join('');
    var tmp = '';

    for (var i = 0; i < Math.ceil(num.length / 6); i++) {
        tmp = (parseInt(tmp + num.substr(i * 6, 6)) % 97).toString();
    }

    return parseInt(tmp);
}

module.exports = {
    isValidAddress: function (address, currency) {
        currency = currency || {};
        address = address.replace(/ /g, '');

        if (address.substr(0, 2).toUpperCase() !== currency.countryCode) {
            return false;
        }
        if (address.length !== currency.length) {
            return false;
        }
        if (ibanCheck(address.substr(4) + address.substr(0, 4)) !== 1) {
            return false;
        }

        return true;
    }
};
