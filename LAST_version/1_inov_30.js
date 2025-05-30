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



            // jQuery('input[type=checkbox]').change(function () {

            //     var group = jQuery(this).attr('name');

            //     var pos = group.indexOf('_R');




            //     if (group == "CAPITOL2_R_211_C1") {
            //         jQuery('#CAPITOL2_R_211_C2').attr("checked", false);
            //     } else if (group == "CAPITOL2_R_211_C2") {
            //         jQuery('#CAPITOL2_R_211_C1').attr("checked", false);
            //     }

            //     else if (group == "CAPITOL2_R_212_C1") {
            //         jQuery('#CAPITOL2_R_212_C2').attr("checked", false);
            //     } else if (group == "CAPITOL2_R_212_C2") {
            //         jQuery('#CAPITOL2_R_212_C1').attr("checked", false);
            //     }



            //     if (group == "CAPITOL2_R_231_C1") {
            //         jQuery('#CAPITOL2_R_231_C2').attr("checked", false);
            //     } else if (group == "CAPITOL2_R_231_C2") {
            //         jQuery('#CAPITOL2_R_231_C1').attr("checked", false);
            //     }

            //     if (group == "CAPITOL2_R_232_C1") {
            //         jQuery('#CAPITOL2_R_232_C2').attr("checked", false);
            //     } else if (group == "CAPITOL2_R_232_C2") {
            //         jQuery('#CAPITOL2_R_232_C1').attr("checked", false);
            //     }



            //     if (group == "CAPITOL2_R_241_C1") {
            //         jQuery('#CAPITOL2_R_241_C2').attr("checked", false);
            //         jQuery('#CAPITOL2_R_241_C3').attr("checked", false);
            //     } else if (group == "CAPITOL2_R_241_C2") {
            //         jQuery('#CAPITOL2_R_241_C1').attr("checked", false);
            //         jQuery('#CAPITOL2_R_241_C3').attr("checked", false);
            //     } else if (group == "CAPITOL2_R_241_C3") {
            //         jQuery('#CAPITOL2_R_241_C1').attr("checked", false);
            //         jQuery('#CAPITOL2_R_241_C2').attr("checked", false);
            //     }


            //     if (group == "CAPITOL2_R_242_C1") {
            //         jQuery('#CAPITOL2_R_242_C2').attr("checked", false);
            //         jQuery('#CAPITOL2_R_242_C3').attr("checked", false);
            //     } else if (group == "CAPITOL2_R_242_C2") {
            //         jQuery('#CAPITOL2_R_242_C1').attr("checked", false);
            //         jQuery('#CAPITOL2_R_242_C3').attr("checked", false);
            //     } else if (group == "CAPITOL2_R_242_C3") {
            //         jQuery('#CAPITOL2_R_242_C1').attr("checked", false);
            //         jQuery('#CAPITOL2_R_242_C2').attr("checked", false);
            //     }


            //     if (group == "CAPITOL2_R_243_C1") {
            //         jQuery('#CAPITOL2_R_243_C2').attr("checked", false);
            //         jQuery('#CAPITOL2_R_243_C3').attr("checked", false);
            //     } else if (group == "CAPITOL2_R_243_C2") {
            //         jQuery('#CAPITOL2_R_243_C1').attr("checked", false);
            //         jQuery('#CAPITOL2_R_243_C3').attr("checked", false);
            //     } else if (group == "CAPITOL2_R_243_C3") {
            //         jQuery('#CAPITOL2_R_243_C1').attr("checked", false);
            //         jQuery('#CAPITOL2_R_243_C2').attr("checked", false);
            //     }



            //     if (group == "CAPITOL3_R_311_C1") {
            //         jQuery('#CAPITOL3_R_311_C2').attr("checked", false);
            //     } else if (group == "CAPITOL3_R_311_C2") {
            //         jQuery('#CAPITOL3_R_311_C1').attr("checked", false);
            //     }


            //     if (group == "CAPITOL3_R_312_C1") {
            //         jQuery('#CAPITOL3_R_312_C2').attr("checked", false);
            //     } else if (group == "CAPITOL3_R_312_C2") {
            //         jQuery('#CAPITOL3_R_312_C1').attr("checked", false);
            //     }

            //     if (group == "CAPITOL3_R_313_C1") {
            //         jQuery('#CAPITOL3_R_313_C2').attr("checked", false);
            //     } else if (group == "CAPITOL3_R_313_C2") {
            //         jQuery('#CAPITOL3_R_313_C1').attr("checked", false);
            //     }




            // });

            jQuery('.related-checkbox').change(function () {
                var $this = jQuery(this);
                if ($this.prop('checked')) {
                    // Uncheck all other related checkboxes except the current one
                    jQuery('.related-checkbox[name="' + $this.attr('name') + '"]').not($this).prop('checked', false);
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