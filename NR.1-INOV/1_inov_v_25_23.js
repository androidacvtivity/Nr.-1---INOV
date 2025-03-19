(function ($) {
    var activity_options_default_value = '';
    Drupal.behaviors.inov1 = {
        attach: function (context, settings) {
            jQuery('input.numeric').on('keypress', function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });

            jQuery('input.float').on('keypress', function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });
            
            

            var values = Drupal.settings.mywebform.values;
            check_all(values);
            check_111_112(values);

        }

    }


})(jQuery)

webform.validators.inov1 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;
    
    validatePhoneNumber(values.PHONE);
    
    check_111_112(values);
    //Sort warnings & errors
    webform.warnings.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.errors.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.validatorsStatus['inov1'] = 1;
    validateWebform();

}



function check_111_112(values) {

    jQuery('input[type=checkbox]').change(function () {

        if (jQuery('#CAPITOL1_R111_C2').is(':checked') && jQuery('#CAPITOL1_R112_C2').is(':checked')) {
            jQuery('#CAPITOL1_R12H').hide();
            jQuery('#CAPITOL1_R12H1').hide();
            jQuery('#CAPITOL1_R121').hide();
            jQuery('#CAPITOL1_R122').hide();
            

            jQuery('#CAPITOL1_R121_C1').attr("checked", false);
            jQuery('#CAPITOL1_R121_C2').attr("checked", false);
            jQuery('#CAPITOL1_R122_C1').attr("checked", false);
            jQuery('#CAPITOL1_R122_C2').attr("checked", false);
            document.getElementById("CAPITOL1_R121_C1").value = "";
            document.getElementById("CAPITOL1_R121_C2").value = "";
            document.getElementById("CAPITOL1_R122_C1").value = "";
            document.getElementById("CAPITOL1_R122_C2").value = "";
           
        }
        else if (!(jQuery('#CAPITOL1_R111_C2').is(':checked') && jQuery('#CAPITOL1_R112_C2').is(':checked'))) {
            jQuery('#CAPITOL1_R12H').show();
            jQuery('#CAPITOL1_R12H1').show();
            jQuery('#CAPITOL1_R121').show();
            jQuery('#CAPITOL1_R122').show();
        }

    });

}



function validatePhoneNumber(phone) {
    // Check if the phone number is valid (exactly 9 digits)
    if (!phone || !/^[0-9]{9}$/.test(phone)) {
        webform.errors.push({
            'fieldName': 'PHONE',
            'weight': 29,
            'msg': concatMessage('A.09', '', Drupal.t('Introduceți doar un număr de telefon format din 9 cifre'))
        });
    }

    // Check if the first digit is 0
    if (phone && phone[0] !== '0') {
        webform.errors.push({
            'fieldName': 'PHONE',
            'weight': 30,
            'msg': concatMessage('A.09', '', Drupal.t('Prima cifră a numărului de telefon trebuie să fie 0'))
        });
    }
}

function concatMessage(errorCode, fieldTitle, msg) {
    var titleParts = [];

    if (errorCode) {
        titleParts.push(getErrorMessage(errorCode));
    }

    if (fieldTitle) {
        titleParts.push(fieldTitle);
    }

    if (titleParts.length) {
        msg = titleParts.join(', ') + '. ' + msg;
    }

    return msg;
}


function getErrorMessage(errorCode) {
    return Drupal.t('Error code: @error_code', { '@error_code': errorCode });
}

function sort_errors_warinings(a, b) {
    if (!a.hasOwnProperty('weight')) {
        a.error_code = 9999;
    }

    if (!b.hasOwnProperty('weight')) {
        b.error_code = 9999;
    }

    return toFloat(a.error_code) - toFloat(b.error_code);
}

function check_all(values) {
    jQuery('input[type=checkbox]').change(function () {
        var state = jQuery(this).is(':checked');
        var group = jQuery(this).attr('name');

        // Exclude checkboxes that start with CAPITOL1_R112 (do not process these)
        var excludedPattern = /^CAPITOL1_R112\d+_C\d+$/;
        if (excludedPattern.test(group)) {
            return; // Skip processing for these variables
        }

        // Handle mutual exclusivity for CAPITOL1_R111X_C1 and CAPITOL1_R111X_C2
        var exclusivePairs = {
            "CAPITOL1_R1111_C1": "CAPITOL1_R1111_C2",
            "CAPITOL1_R1111_C2": "CAPITOL1_R1111_C1",
            "CAPITOL1_R1112_C1": "CAPITOL1_R1112_C2",
            "CAPITOL1_R1112_C2": "CAPITOL1_R1112_C1",
            "CAPITOL1_R1113_C1": "CAPITOL1_R1113_C2",
            "CAPITOL1_R1113_C2": "CAPITOL1_R1113_C1"
        };

        if (exclusivePairs.hasOwnProperty(group)) {
            if (state) {
                jQuery(`input[name="${exclusivePairs[group]}"]`).prop('checked', false);
            }
            return; // Stop further processing
        }

        // Define mutual exclusivity row-wise
        var rowGroups = {
            "CAPITOL21_R211_C1": ["CAPITOL21_R211_C2", "CAPITOL21_R211_C3"],
            "CAPITOL21_R211_C2": ["CAPITOL21_R211_C1", "CAPITOL21_R211_C3"],
            "CAPITOL21_R211_C3": ["CAPITOL21_R211_C1", "CAPITOL21_R211_C2"],

            "CAPITOL21_R212_C1": ["CAPITOL21_R212_C2", "CAPITOL21_R212_C3"],
            "CAPITOL21_R212_C2": ["CAPITOL21_R212_C1", "CAPITOL21_R212_C3"],
            "CAPITOL21_R212_C3": ["CAPITOL21_R212_C1", "CAPITOL21_R212_C2"],

            "CAPITOL21_R211_C4": ["CAPITOL21_R211_C5"],
            "CAPITOL21_R211_C5": ["CAPITOL21_R211_C4"],

            "CAPITOL21_R212_C4": ["CAPITOL21_R212_C5"],
            "CAPITOL21_R212_C5": ["CAPITOL21_R212_C4"],

            // New Groups - First Group (C1, C2)
            "CAPITOL22_R221_C1": ["CAPITOL22_R221_C2"],
            "CAPITOL22_R221_C2": ["CAPITOL22_R221_C1"],
            "CAPITOL22_R222_C1": ["CAPITOL22_R222_C2"],
            "CAPITOL22_R222_C2": ["CAPITOL22_R222_C1"],
            "CAPITOL22_R223_C1": ["CAPITOL22_R223_C2"],
            "CAPITOL22_R223_C2": ["CAPITOL22_R223_C1"],
            "CAPITOL22_R224_C1": ["CAPITOL22_R224_C2"],
            "CAPITOL22_R224_C2": ["CAPITOL22_R224_C1"],

            // Second Group (C3, C4)
            "CAPITOL22_R221_C3": ["CAPITOL22_R221_C4"],
            "CAPITOL22_R221_C4": ["CAPITOL22_R221_C3"],
            "CAPITOL22_R222_C3": ["CAPITOL22_R222_C4"],
            "CAPITOL22_R222_C4": ["CAPITOL22_R222_C3"],
            "CAPITOL22_R223_C3": ["CAPITOL22_R223_C4"],
            "CAPITOL22_R223_C4": ["CAPITOL22_R223_C3"],
            "CAPITOL22_R224_C3": ["CAPITOL22_R224_C4"],
            "CAPITOL22_R224_C4": ["CAPITOL22_R224_C3"]
        };

        // New CAPITOL3 Group (C1, C2, C3) Mutual Exclusivity
        for (var i = 311; i <= 3112; i++) {
            rowGroups[`CAPITOL3_R${i}_C1`] = [`CAPITOL3_R${i}_C2`, `CAPITOL3_R${i}_C3`];
            rowGroups[`CAPITOL3_R${i}_C2`] = [`CAPITOL3_R${i}_C1`, `CAPITOL3_R${i}_C3`];
            rowGroups[`CAPITOL3_R${i}_C3`] = [`CAPITOL3_R${i}_C1`, `CAPITOL3_R${i}_C2`];
        }

        if (rowGroups.hasOwnProperty(group)) {
            if (state) {
                jQuery(rowGroups[group].map(name => `input[name="${name}"]`).join(', ')).prop('checked', false);
            }
            return; // Stop further processing
        }

        var pos = group.indexOf('_R');
        var res = group.substr(0, pos !== false ? pos + 5 : 0);

        var lengthChecs = 0;
        jQuery('input[type=checkbox]').each(function () {
            if (jQuery(this).attr('name').indexOf(res) !== -1) {
                jQuery(this).removeAttr('checked');
                lengthChecs++;
            }
        });

        jQuery(this).prop('checked', state);

        // Ensure only one of CAPITOL1_R191_C1, CAPITOL1_R192_C1, CAPITOL1_R193_C1 is selected
        var specialGroup = ["CAPITOL1_R191_C1", "CAPITOL1_R192_C1", "CAPITOL1_R193_C1"];
        if (specialGroup.includes(group)) {
            jQuery('input[name="CAPITOL1_R191_C1"], input[name="CAPITOL1_R192_C1"], input[name="CAPITOL1_R193_C1"]').not(this).prop('checked', false);
        }
    });
}
