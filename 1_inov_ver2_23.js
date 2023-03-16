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
                "CAPITOL5_R_511_C1": ["CAPITOL5_R_511_C2"],
                "CAPITOL5_R_511_C2": ["CAPITOL5_R_511_C1"],

                "CAPITOL5_R_514_C1": ["CAPITOL5_R_514_C2"],
                "CAPITOL5_R_514_C2": ["CAPITOL5_R_514_C1"],

                "CAPITOL5_R_515_C1": ["CAPITOL5_R_515_C2"],
                "CAPITOL5_R_515_C2": ["CAPITOL5_R_515_C1"],

                "CAPITOL5_R_516_C1": ["CAPITOL5_R_516_C2"],
                "CAPITOL5_R_516_C2": ["CAPITOL5_R_516_C1"],

                "CAPITOL5_R_517_C1": ["CAPITOL5_R_517_C2"],
                "CAPITOL5_R_517_C2": ["CAPITOL5_R_517_C1"],


                "CAPITOL5_R_518_C1": ["CAPITOL5_R_518_C2"],
                "CAPITOL5_R_518_C2": ["CAPITOL5_R_518_C1"],

                "CAPITOL5_R_519_C1": ["CAPITOL5_R_519_C2"],
                "CAPITOL5_R_519_C2": ["CAPITOL5_R_519_C1"],

                "CAPITOL5_R_5110_C1": ["CAPITOL5_R_5110_C2"],
                "CAPITOL5_R_5110_C2": ["CAPITOL5_R_5110_C1"],


                "CAPITOL5_R_531_C1": ["CAPITOL5_R_531_C2"],
                "CAPITOL5_R_531_C2": ["CAPITOL5_R_531_C1"],

                "CAPITOL5_R_532_C1": ["CAPITOL5_R_532_C2"],
                "CAPITOL5_R_532_C2": ["CAPITOL5_R_532_C1"],


                "CAPITOL5_R_533_C1": ["CAPITOL5_R_533_C2"],
                "CAPITOL5_R_533_C2": ["CAPITOL5_R_533_C1"],


                "CAPITOL7_R_711_C1": ["CAPITOL7_R_711_C2"],
                "CAPITOL7_R_711_C2": ["CAPITOL7_R_711_C1"],


                "CAPITOL7_R_712_C1": ["CAPITOL7_R_712_C2"],
                "CAPITOL7_R_712_C2": ["CAPITOL7_R_712_C1"],

                "CAPITOL7_R_713_C1": ["CAPITOL7_R_713_C2"],
                "CAPITOL7_R_713_C2": ["CAPITOL7_R_713_C1"],


                "CAPITOL8_R_811_C1": ["CAPITOL8_R_811_C2"],
                "CAPITOL8_R_811_C2": ["CAPITOL8_R_811_C1"],


                "CAPITOL8_R_812_C1": ["CAPITOL8_R_812_C2"],
                "CAPITOL8_R_812_C2": ["CAPITOL8_R_812_C1"],

                "CAPITOL8_R_813_C1": ["CAPITOL8_R_813_C2"],
                "CAPITOL8_R_813_C2": ["CAPITOL8_R_813_C1"],

                "CAPITOL8_R_814_C1": ["CAPITOL8_R_814_C2"],
                "CAPITOL8_R_814_C2": ["CAPITOL8_R_814_C1"],


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
    //Start--48-0390
    if ((values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false) &&
        (values.CAPITOL1_R114_C1 == '1.1.1' || values.CAPITOL1_R114_C1 == '1.1.2' || values.CAPITOL1_R114_C1 == '1.1.3')) {
        webform.errors.push({
            'fieldName': 'CAPITOL1_R114_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-0390  Daca este nr. rândului @CAPITOL1_R114_C1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3', { "@CAPITOL1_R114_C1": values.CAPITOL1_R114_C1 })
        });
    }
    //End--48-0390

    //Start--48-039
    if ((values.CAPITOL1_R114_C1 !== '1.1.1' && values.CAPITOL1_R114_C1 !== '1.1.2' && values.CAPITOL1_R114_C1 !== '1.1.3')
        &&

        ((values.CAPITOL1_R111_C1 != false || values.CAPITOL1_R112_C1 != false != values.CAPITOL1_R113_C1 != false) ||
            (values.CAPITOL1_R111_C1 == false || values.CAPITOL1_R112_C1 == false != values.CAPITOL1_R113_C1 == false))


    ) {
        if (values.CAPITOL1_R114_C1 === '') {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R114_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-039 Trebuie să indicat din Cap.1.1 numărul rândului 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        } else {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R114_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-039 nr. rândului poate fi 1.1.1 sau 1.1.2 sau 1.1.3 și nu poate fi @CAPITOL1_R114_C1', { "@CAPITOL1_R114_C1": values.CAPITOL1_R114_C1 })
            });
        }
    }

    //End--48-039




    //Start  48-004 - 48-006


    // Error codes for Capitol2 Rind2.3.3, 2.3.4, 2.3.5
    const ERROR_CODES = {
        "CAPITOL2_R_233_C1": "48-004",
        "CAPITOL2_R_234_C1": "48-005",
        "CAPITOL2_R_235_C1": "48-006"
        
    };

function validateCapitol2(values, webform) {
        for (let key in ERROR_CODES) {
            let value = +values[key];
            if (value >= 100) {
                let rind = key.slice(0, -3).replace(/_/g, '.'); // get the Rind number from the key and replace _ with .
                let line = key.slice(-3); // get the line number from the key
                webform.errors.push({
                    'fieldName': key,
                    'index': 0,
                    'msg': Drupal.t(`Cod eroare: ${ERROR_CODES[key]}  < 100 , @${key} > 100`, { [`@${key}`]: value })
                });
            }
        }
    }

    // Call validateCapitol2 function with values and webform object
    validateCapitol2(values, webform);

//End   48-004 - 48-006





// {
//     var R_233 = number(values.CAPITOL2_R_233_C1);
//     var R_234 = number(values.CAPITOL2_R_234_C1);
//     var R_235 = number(values.CAPITOL2_R_235_C1);
//     var R_236 = number(values.CAPITOL2_R_236_C1);
//     var sum_33_36 = R_233 + R_234 + R_235;
//     if (sum_33_36  != 100) {
//         webform.errors.push({
//             'fieldName': 'CAPITOL2_R_236_C1',
//             'index': 0,
//           //  'msg': Drupal.t('Cod eroare: 71-001.65. Rind.141 > Rind 120 (dar trebuie sa fie <=)')

//             'msg': Drupal.t('Cod eroare: 48-007 Cap.2  Rind 2.3.3 + 2.3.4 + 2.3.5 = 100%,   @sum_33_36 <> 100', { "@sum_33_36": sum_33_36  })
//         });
//     }

// }
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