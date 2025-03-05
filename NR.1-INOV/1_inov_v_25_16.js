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

        }

    }


})(jQuery)

webform.validators.inov1 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;
    
    validatePhoneNumber(values.PHONE);
    
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

        // Exclude checkboxes that match CAPITOL1_R111X_C1, CAPITOL1_R111X_C2
        var explicitGroup = ["CAPITOL1_R1111_C1", "CAPITOL1_R1111_C2",
            "CAPITOL1_R1112_C1", "CAPITOL1_R1112_C2",
            "CAPITOL1_R1113_C1", "CAPITOL1_R1113_C2"];

        if (explicitGroup.includes(group)) {
            // Ensure mutual exclusivity within CAPITOL1_R111X_C1 and CAPITOL1_R111X_C2 groups
            var exclusiveGroups = {
                "CAPITOL1_R1111_C1": "CAPITOL1_R1111_C2",
                "CAPITOL1_R1111_C2": "CAPITOL1_R1111_C1",
                "CAPITOL1_R1112_C1": "CAPITOL1_R1112_C2",
                "CAPITOL1_R1112_C2": "CAPITOL1_R1112_C1",
                "CAPITOL1_R1113_C1": "CAPITOL1_R1113_C2",
                "CAPITOL1_R1113_C2": "CAPITOL1_R1113_C1"
            };

            if (state) {
                jQuery(`input[name="${exclusiveGroups[group]}"]`).prop('checked', false);
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
