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
            
            
            check_111_112(values);  //Logic 1
            toggle111_112(values);  //Logic 1 


            toggle151_157(values);  //Logic 2
            check_151_157(values);  //Logic 2

        }

    }


})(jQuery)

webform.validators.inov1 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;
    
    validatePhoneNumber(values.PHONE);
    
    check_111_112(values);

    check_151_157(values);
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
//Logic 1
// Dacă răspundeți “NU” la ambele opțiuni din 1.1, vă rugăm treceți la întrebarea 1.5. Altfel, vă rugăm continuați cu întrebarea 1.2.
function toggle111_112(values) {
    if (values.CAPITOL1_R111_C2 == '1' && values.CAPITOL1_R112_C2 == '1') {

        jQuery('#CAPITOL1_R12H, #CAPITOL1_R12H1, #CAPITOL1_R121, #CAPITOL1_R122, #CAPITOL1_R12H2, #CAPITOL1_R13H, #CAPITOL1_R13H1, #CAPITOL1_R13H2, #CAPITOL1_R131, #CAPITOL1_R132, #CAPITOL1_R133, #CAPITOL1_R134, #CAPITOL1_R14H, #CAPITOL1_R14H1, #CAPITOL1_R14H2, #CAPITOL1_R14H3, #CAPITOL1_R141, #CAPITOL1_R142, #CAPITOL1_R143, #CAPITOL1_R144').hide();

        // Ștergem valorile din inputurile asociate
        var inputIDs = [
            "CAPITOL1_R121_C1", "CAPITOL1_R121_C2", "CAPITOL1_R122_C1",
            "CAPITOL1_R123_C2", "CAPITOL1_R131_C1", "CAPITOL1_R131_C2",
            "CAPITOL1_R132_C1", "CAPITOL1_R132_C2", "CAPITOL1_R133_C1",
            "CAPITOL1_R133_C2", "CAPITOL1_R134_C1", "CAPITOL1_R134_C2",
            "CAPITOL1_R141_C1", "CAPITOL1_R142_C1", "CAPITOL1_R143_C1", "CAPITOL1_R144_C1"
        ];

        inputIDs.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.value = "";
            }
        });
    } else {
        jQuery('#CAPITOL1_R12H, #CAPITOL1_R12H1, #CAPITOL1_R121, #CAPITOL1_R122, #CAPITOL1_R12H2, #CAPITOL1_R13H, #CAPITOL1_R13H1, #CAPITOL1_R13H2, #CAPITOL1_R131, #CAPITOL1_R132, #CAPITOL1_R133, #CAPITOL1_R134, #CAPITOL1_R14H, #CAPITOL1_R14H1, #CAPITOL1_R14H2, #CAPITOL1_R14H3, #CAPITOL1_R141, #CAPITOL1_R142, #CAPITOL1_R143, #CAPITOL1_R144').show();
    }
}

//Logic 1
// Dacă răspundeți “NU” la ambele opțiuni 1.1, vă rugăm treceți la întrebarea 1.5. Altfel, vă rugăm continuați cu întrebarea 1.2.
function check_111_112(values) {

    jQuery('input[type=checkbox]').change(function () {

        if (jQuery('#CAPITOL1_R111_C2').is(':checked') && jQuery('#CAPITOL1_R112_C2').is(':checked')) {
            jQuery('#CAPITOL1_R12H').hide();
            jQuery('#CAPITOL1_R12H1').hide();
            jQuery('#CAPITOL1_R12H2').hide();
            jQuery('#CAPITOL1_R121').hide();
            jQuery('#CAPITOL1_R122').hide();

            jQuery('#CAPITOL1_R13H').hide();
            jQuery('#CAPITOL1_R13H1').hide();
            jQuery('#CAPITOL1_R13H2').hide();
            jQuery('#CAPITOL1_R131').hide();
            jQuery('#CAPITOL1_R132').hide();
            jQuery('#CAPITOL1_R133').hide();
            jQuery('#CAPITOL1_R134').hide();

            jQuery('#CAPITOL1_R14H').hide();
            jQuery('#CAPITOL1_R14H1').hide();
            jQuery('#CAPITOL1_R14H2').hide();
            jQuery('#CAPITOL1_R14H3').hide();
            jQuery('#CAPITOL1_R141').hide();
            jQuery('#CAPITOL1_R142').hide();
            jQuery('#CAPITOL1_R143').hide();
            jQuery('#CAPITOL1_R144').hide();
            

            jQuery('#CAPITOL1_R121_C1').attr("checked", false);
            jQuery('#CAPITOL1_R121_C2').attr("checked", false);
            jQuery('#CAPITOL1_R122_C1').attr("checked", false);
            jQuery('#CAPITOL1_R122_C2').attr("checked", false);
            jQuery('#CAPITOL1_R141_C1').attr("checked", false);
            jQuery('#CAPITOL1_R142_C1').attr("checked", false);
            jQuery('#CAPITOL1_R143_C1').attr("checked", false);
            jQuery('#CAPITOL1_R144_C1').attr("checked", false);
            



            document.getElementById("CAPITOL1_R121_C1").value = "";
            document.getElementById("CAPITOL1_R121_C2").value = "";
            document.getElementById("CAPITOL1_R122_C1").value = "";
            document.getElementById("CAPITOL1_R122_C2").value = "";

            document.getElementById("CAPITOL1_R131_C1").value = "";
            document.getElementById("CAPITOL1_R132_C1").value = "";
           
            document.getElementById("CAPITOL1_R133_C1").value = "";
           
            document.getElementById("CAPITOL1_R134_C1").value = "";

            document.getElementById("CAPITOL1_R141_C1").value = "";
            document.getElementById("CAPITOL1_R142_C1").value = "";
            document.getElementById("CAPITOL1_R143_C1").value = "";
            document.getElementById("CAPITOL1_R144_C1").value = "";
           
           
        }
        else if (!(jQuery('#CAPITOL1_R111_C2').is(':checked') && jQuery('#CAPITOL1_R112_C2').is(':checked'))) {
            jQuery('#CAPITOL1_R12H').show();
            jQuery('#CAPITOL1_R12H1').show();
            jQuery('#CAPITOL1_R12H2').show();
            jQuery('#CAPITOL1_R121').show();
            jQuery('#CAPITOL1_R122').show();

            jQuery('#CAPITOL1_R13H').show();
            jQuery('#CAPITOL1_R13H1').show();
            jQuery('#CAPITOL1_R13H2').show();
            jQuery('#CAPITOL1_R131').show();
            jQuery('#CAPITOL1_R132').show();
            jQuery('#CAPITOL1_R133').show();
            jQuery('#CAPITOL1_R134').show();

            jQuery('#CAPITOL1_R14H').show();
            jQuery('#CAPITOL1_R14H1').show();
            jQuery('#CAPITOL1_R14H2').show();
            jQuery('#CAPITOL1_R14H3').show();

            jQuery('#CAPITOL1_R141').show();
            jQuery('#CAPITOL1_R142').show();
            jQuery('#CAPITOL1_R143').show();
            jQuery('#CAPITOL1_R144').show();

        }

    });

}

// Logic 2

// Logic 2: If "NU" is selected for all options in 1.5, skip to 1.7, else continue with 1.6

function toggle151_157(values) {
    if (
        values.CAPITOL1_R151_C2 == '1' && values.CAPITOL1_R152_C2 == '1' &&
        values.CAPITOL1_R153_C2 == '1' && values.CAPITOL1_R154_C2 == '1' &&
        values.CAPITOL1_R155_C2 == '1' && values.CAPITOL1_R156_C2 == '1' &&
        values.CAPITOL1_R157_C2 == '1'
    ) {
        // Hide elements of 1.6 and move to 1.7
        jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').hide();

        // Clear input values
        var inputIDs = ["CAPITOL1_R161_C1", "CAPITOL1_R162_C1", "CAPITOL1_R163_C1", "CAPITOL1_R164_C1"];
        inputIDs.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.value = "";
            }
        });
    } else {
        // Show elements of 1.6
        jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').show();
    }
}

function check_151_157(values) {
    jQuery('input[type=checkbox]').change(function () {
        if (
            jQuery('#CAPITOL1_R151_C2').is(':checked') && jQuery('#CAPITOL1_R152_C2').is(':checked') &&
            jQuery('#CAPITOL1_R153_C2').is(':checked') && jQuery('#CAPITOL1_R154_C2').is(':checked') &&
            jQuery('#CAPITOL1_R155_C2').is(':checked') && jQuery('#CAPITOL1_R156_C2').is(':checked') &&
            jQuery('#CAPITOL1_R157_C2').is(':checked')
        ) {
            // Hide 1.6 and move to 1.7
            jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').hide();
            // jQuery('#CAPITOL1_R161_C1').attr("checked", false);
            // jQuery('#CAPITOL1_R162_C1').attr("checked", false);
            // jQuery('#CAPITOL1_R163_C1').attr("checked", false);
            // jQuery('#CAPITOL1_R164_C1').attr("checked", false);
            // Clear input values
            jQuery('#CAPITOL1_R161_C1, #CAPITOL1_R162_C1, #CAPITOL1_R163_C1, #CAPITOL1_R164_C1').val('').prop('checked', false);
        } else {
            // Show elements of 1.6
            jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').show();
        }
    });
}


// Logic 2

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
