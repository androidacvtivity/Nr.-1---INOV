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



           

            const checkboxMap = {
                "CAPITOL2_R_211_C1": ["CAPITOL2_R_211_C2"],
                "CAPITOL2_R_211_C2": ["CAPITOL2_R_211_C1"],
                "CAPITOL2_R_212_C1": ["CAPITOL2_R_212_C2"],
                "CAPITOL2_R_212_C2": ["CAPITOL2_R_212_C1"],
                "CAPITOL2_R_231_C1": ["CAPITOL2_R_231_C2"],
                "CAPITOL2_R_231_C2": ["CAPITOL2_R_231_C1"],
                "CAPITOL2_R_232_C1": ["CAPITOL2_R_232_C2"],
                "CAPITOL2_R_232_C2": ["CAPITOL2_R_232_C1"],
                "CAPITOL2_R_241_C1": ["CAPITOL2_R_241_C2", "CAPITOL2_R_241_C3"],
                "CAPITOL2_R_241_C2": ["CAPITOL2_R_241_C1", "CAPITOL2_R_241_C3"],
                "CAPITOL2_R_241_C3": ["CAPITOL2_R_241_C1", "CAPITOL2_R_241_C2"],
                "CAPITOL2_R_242_C1": ["CAPITOL2_R_242_C2", "CAPITOL2_R_242_C3"],
                "CAPITOL2_R_242_C2": ["CAPITOL2_R_242_C1", "CAPITOL2_R_242_C3"],
                "CAPITOL2_R_242_C3": ["CAPITOL2_R_242_C1", "CAPITOL2_R_242_C2"],
                "CAPITOL2_R_243_C1": ["CAPITOL2_R_243_C2", "CAPITOL2_R_243_C3"],
                "CAPITOL2_R_243_C2": ["CAPITOL2_R_243_C1", "CAPITOL2_R_243_C3"],
                "CAPITOL2_R_243_C3": ["CAPITOL2_R_243_C1", "CAPITOL2_R_243_C2"],
                "CAPITOL3_R_311_C1": ["CAPITOL3_R_311_C2"],
                "CAPITOL3_R_311_C2": ["CAPITOL3_R_311_C1"],
                "CAPITOL3_R_312_C1": ["CAPITOL3_R_312_C2"],
                "CAPITOL3_R_312_C2": ["CAPITOL3_R_312_C1"],
                "CAPITOL3_R_313_C1": ["CAPITOL3_R_313_C2"],
                "CAPITOL3_R_313_C2": ["CAPITOL3_R_313_C1"],
                "CAPITOL3_R_331_C1": ["CAPITOL3_R_332_C1", "CAPITOL3_R_332_C1"],
                "CAPITOL3_R_332_C1": ["CAPITOL3_R_331_C1", "CAPITOL3_R_333_C1"],
                "CAPITOL3_R_333_C1": ["CAPITOL3_R_331_C1", "CAPITOL3_R_332_C1"],
                "CAPITOL4_R_411_C1": ["CAPITOL4_R_411_C2"],
                "CAPITOL4_R_411_C2": ["CAPITOL4_R_411_C1"],
                "CAPITOL4_R_412_C1": ["CAPITOL4_R_412_C2"],
                "CAPITOL4_R_412_C2": ["CAPITOL4_R_412_C1"],
            };

            jQuery('input[type=checkbox]').change(function () {
                const group = jQuery(this).attr('name');

                if (group in checkboxMap) {
                    checkboxMap[group].forEach((checkbox) => {
                        jQuery(`#${checkbox}`).attr("checked", false);
                    });
                }
            });

        }



    }


})(jQuery)

webform.validators.inov1 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;



    if (values.CAPITOL1_R114_C1 !== '1.1.1' && values.CAPITOL1_R114_C1 !== '1.1.2' && values.CAPITOL1_R114_C1 !== '1.1.3') {
        webform.errors.push({
            'fieldName': 'CAPITOL1_R114_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-039  nr. rândului poate fi 1.1.1 sau 1.1.2 sau 1.1.1 si nu poate fi @CAPITOL1_R114_C1', { "@CAPITOL1_R114_C1": values.CAPITOL1_R114_C1 })
        });
    }





    if (!(jQuery('#CAPITOL2_R_211_C1').is(':checked') || jQuery('#CAPITOL2_R_211_C2').is(':checked'))) {
        webform.errors.push({
            'fieldName': 'CAPITOL2_R_211_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 71-001.1. Rind.130 trebuie sa fie DA sau NU')
        });
    }


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

function sort_errors_warinings(a, b) {
    if (!a.hasOwnProperty('weight')) {
        a.error_code = 9999;
    }

    if (!b.hasOwnProperty('weight')) {
        b.error_code = 9999;
    }

    return toFloat(a.error_code) - toFloat(b.error_code);
}