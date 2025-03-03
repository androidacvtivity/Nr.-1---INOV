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
                "CAPITOL1_R111_C1": ["CAPITOL1_R111_C2"],
                "CAPITOL1_R111_C2": ["CAPITOL1_R111_C1"],
                "CAPITOL1_R112_C1": ["CAPITOL1_R112_C2"],
                "CAPITOL1_R112_C2": ["CAPITOL1_R112_C1"],
               


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
    
    

    //Start--48-1
    if ((
        jQuery('#CAPITOL2_R_211_C1').is(':checked') || jQuery('#CAPITOL2_R_211_C2').is(':checked') ||
        jQuery('#CAPITOL2_R_212_C1').is(':checked') || jQuery('#CAPITOL2_R_212_C2').is(':checked') ||
   
        //---2

        jQuery('#CAPITOL2_R_221_C1').is(':checked') || jQuery('#CAPITOL2_R_221_C2').is(':checked') ||
        jQuery('#CAPITOL2_R_222_C1').is(':checked') || jQuery('#CAPITOL2_R_222_C2').is(':checked') ||

        jQuery('#CAPITOL2_R_223_C1').is(':checked') || jQuery('#CAPITOL2_R_223_C2').is(':checked') ||
        jQuery('#CAPITOL2_R_224_C1').is(':checked') || jQuery('#CAPITOL2_R_224_C2').is(':checked') ||

        jQuery('#CAPITOL2_R_231_C1').is(':checked') || jQuery('#CAPITOL2_R_231_C2').is(':checked') ||
        jQuery('#CAPITOL2_R_232_C1').is(':checked') || jQuery('#CAPITOL2_R_232_C2').is(':checked') ||


        jQuery('#CAPITOL2_R_241_C1').is(':checked') || jQuery('#CAPITOL2_R_241_C2').is(':checked') || jQuery('#CAPITOL2_R_241_C3').is(':checked') ||
        jQuery('#CAPITOL2_R_242_C1').is(':checked') || jQuery('#CAPITOL2_R_242_C2').is(':checked') || jQuery('#CAPITOL2_R_242_C3').is(':checked') ||
        jQuery('#CAPITOL2_R_243_C1').is(':checked') || jQuery('#CAPITOL2_R_243_C2').is(':checked') || jQuery('#CAPITOL2_R_243_C3').is(':checked')  ||

        jQuery('#CAPITOL3_R_311_C2').is(':checked') 
        || jQuery('#CAPITOL3_R_312_C2').is(':checked') ||
        jQuery('#CAPITOL3_R_313_C2').is(':checked')  ||
       
      

                jQuery('#CAPITOL3_R_321_C1').is(':checked')  || 
                jQuery('#CAPITOL3_R_322_C1').is(':checked')  ||
                jQuery('#CAPITOL3_R_323_C1').is(':checked')  || 
                jQuery('#CAPITOL3_R_324_C1').is(':checked')  || 

                
            jQuery('#CAPITOL3_R_331_C1').is(':checked') ||
            jQuery('#CAPITOL3_R_332_C1').is(':checked') ||
            jQuery('#CAPITOL3_R_333_C1').is(':checked')  ||
        

        jQuery('#CAPITOL4_R_411_C1').is(':checked') || jQuery('#CAPITOL4_R_411_C2').is(':checked') ||
        jQuery('#CAPITOL4_R_412_C1').is(':checked') || jQuery('#CAPITOL4_R_412_C2').is(':checked')  ||

// 5.1
            jQuery('#CAPITOL5_R_511_C1').is(':checked') || jQuery('#CAPITOL5_R_511_C2').is(':checked') ||
            jQuery('#CAPITOL5_R_512_C1').is(':checked') || jQuery('#CAPITOL5_R_513_C1').is(':checked') ||
            jQuery('#CAPITOL5_R_514_C1').is(':checked') || jQuery('#CAPITOL5_R_514_C2').is(':checked') ||
            jQuery('#CAPITOL5_R_515_C2').is(':checked') || jQuery('#CAPITOL5_R_516_C2').is(':checked') ||
            jQuery('#CAPITOL5_R_517_C2').is(':checked') || jQuery('#CAPITOL5_R_518_C2').is(':checked') ||
            jQuery('#CAPITOL5_R_519_C2').is(':checked') || jQuery('#CAPITOL5_R_5110_C2').is(':checked')||

             values.CAPITOL5_R_526_C1 > 0 ||
// 5.3

            jQuery('#CAPITOL5_R_531_C1').is(':checked') || jQuery('#CAPITOL5_R_531_C2').is(':checked') ||
            jQuery('#CAPITOL5_R_532_C1').is(':checked') || jQuery('#CAPITOL5_R_532_C2').is(':checked') ||
            jQuery('#CAPITOL5_R_533_C1').is(':checked') || jQuery('#CAPITOL5_R_533_C2').is(':checked') ||
         
// 6.1


        jQuery('#CAPITOL6_R_611_C1').is(':checked') || jQuery('#CAPITOL6_R_612_C1').is(':checked')  ||


        jQuery('#CAPITOL6_R_621_C1').is(':checked') || jQuery('#CAPITOL6_R_621_C2').is(':checked') || jQuery('#CAPITOL6_R_621_C3').is(':checked') ||
        jQuery('#CAPITOL6_R_622_C1').is(':checked') || jQuery('#CAPITOL6_R_622_C2').is(':checked') || jQuery('#CAPITOL6_R_622_C3').is(':checked') ||
        jQuery('#CAPITOL6_R_623_C1').is(':checked') || jQuery('#CAPITOL6_R_623_C2').is(':checked') || jQuery('#CAPITOL6_R_623_C3').is(':checked') ||
        jQuery('#CAPITOL6_R_624_C1').is(':checked') || jQuery('#CAPITOL6_R_624_C2').is(':checked') || jQuery('#CAPITOL6_R_624_C3').is(':checked') ||
        jQuery('#CAPITOL6_R_625_C1').is(':checked') || jQuery('#CAPITOL6_R_625_C2').is(':checked') || jQuery('#CAPITOL6_R_625_C3').is(':checked') ||
        jQuery('#CAPITOL6_R_626_C1').is(':checked') || jQuery('#CAPITOL6_R_626_C2').is(':checked') || jQuery('#CAPITOL6_R_626_C3').is(':checked') ||
        jQuery('#CAPITOL6_R_627_C1').is(':checked') || jQuery('#CAPITOL6_R_627_C2').is(':checked') || jQuery('#CAPITOL6_R_627_C3').is(':checked') ||
        jQuery('#CAPITOL6_R_628_C1').is(':checked') || jQuery('#CAPITOL6_R_628_C2').is(':checked') || jQuery('#CAPITOL6_R_628_C3').is(':checked')  ||


    // 7.1

        jQuery('#CAPITOL7_R_711_C1').is(':checked') || jQuery('#CAPITOL7_R_711_C2').is(':checked') ||
        jQuery('#CAPITOL7_R_712_C1').is(':checked') || jQuery('#CAPITOL7_R_712_C2').is(':checked') ||
        jQuery('#CAPITOL7_R_713_C1').is(':checked') || jQuery('#CAPITOL7_R_713_C2').is(':checked') ||



    // 8.1

        jQuery('#CAPITOL8_R_811_C1').is(':checked') || jQuery('#CAPITOL8_R_811_C2').is(':checked') ||
        jQuery('#CAPITOL8_R_812_C1').is(':checked') || jQuery('#CAPITOL8_R_812_C2').is(':checked') ||
        jQuery('#CAPITOL8_R_813_C1').is(':checked') || jQuery('#CAPITOL8_R_813_C2').is(':checked') ||
        jQuery('#CAPITOL8_R_814_C1').is(':checked') || jQuery('#CAPITOL8_R_814_C2').is(':checked') ||



        //9.1

        values.CAPITOL9_R91_C1 > 0   ||

        values.CAPITOL9_R92_C31  !== ""





        

    ) &&
        (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false))  {


   
        // 9.1



        if (values.CAPITOL9_R92_C31 !== "" &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            var errorMsg = Drupal.t("Cod eroare: 48-1 Daca este - 9.2 [") + values.CAPITOL9_R92_C31 + Drupal.t("] - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3");
            webform.errors.push({
                'fieldName': 'CAPITOL9_R92_C31',
                'index': 0,
                'msg': errorMsg
            });
        }


        if (values.CAPITOL9_R91_C1 > 0 &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL9_R91_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este - Timp total consumat - minute  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }





        //  8.1


        if ((jQuery('#CAPITOL8_R_814_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_814_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 8.1.4  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL8_R_814_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_814_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 8.1.3  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL8_R_813_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_813_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 8.1.3  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL8_R_813_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_813_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 8.1.3  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }



        if ((jQuery('#CAPITOL8_R_812_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_812_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 8.1.2  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL8_R_812_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_812_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 8.1.2  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }




        if ((jQuery('#CAPITOL8_R_811_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_811_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 8.1.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL8_R_811_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_811_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 8.1.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }



 //  7.1


        if ((jQuery('#CAPITOL7_R_711_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL7_R_711_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 7.1.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL7_R_711_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL7_R_711_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 7.1.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }



        if ((jQuery('#CAPITOL7_R_712_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL7_R_712_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 7.1.2  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL7_R_712_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL7_R_712_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 7.1.2  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL7_R_713_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL7_R_713_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 7.1.3  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL7_R_713_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL7_R_713_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 7.1.3  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }



 //  6.2




        //-----------------

        if ((jQuery('#CAPITOL6_R_628_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_628_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.8 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL6_R_628_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_628_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.8 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL6_R_628_C3').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_628_C3',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.8 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
//-----------------------------------------------


        //-----------------

        if ((jQuery('#CAPITOL6_R_627_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_627_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.7 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL6_R_627_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_627_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.7 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL6_R_627_C3').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_627_C3',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.7 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
//-----------------------------------------------



        //-----------------

        if ((jQuery('#CAPITOL6_R_626_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_626_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.6 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL6_R_626_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_626_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.6 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL6_R_626_C3').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_626_C3',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.6 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
//-----------------------------------------------


        //-----------------

        if ((jQuery('#CAPITOL6_R_625_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_625_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.5 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL6_R_625_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_625_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.5 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL6_R_625_C3').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_625_C3',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.5 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
//-----------------------------------------------

        //-----------------

        if ((jQuery('#CAPITOL6_R_624_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_624_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.4 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL6_R_624_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_624_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.4 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL6_R_624_C3').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_624_C3',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.4 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
//-----------------------------------------------

        //-----------------

        if ((jQuery('#CAPITOL6_R_623_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_623_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.3 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL6_R_623_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_623_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.3 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL6_R_623_C3').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_623_C3',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.3 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
//-----------------------------------------------


        //-----------------

        if ((jQuery('#CAPITOL6_R_622_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_622_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.2 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL6_R_622_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_622_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.2 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL6_R_622_C3').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_622_C3',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.2 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
//-----------------------------------------------

//-----------------

        if ((jQuery('#CAPITOL6_R_621_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_621_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL6_R_621_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_621_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL6_R_621_C3').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_621_C3',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.2.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
//-----------------------------------------------

       //  6.1

        if ((jQuery('#CAPITOL6_R_611_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_611_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.1.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL6_R_612_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R_612_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 6.1.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
       
       
            //  5.3

       if ((jQuery('#CAPITOL5_R_533_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_533_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.3.3 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL5_R_533_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_533_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.3.3 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }



        if ((jQuery('#CAPITOL5_R_532_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_532_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.3.2 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL5_R_532_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_532_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.3.2 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL5_R_531_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_531_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.3.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL5_R_531_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_531_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.3.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }





         // 5.2 
        if (values.CAPITOL5_R_526_C1 > 0 &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_526_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.2.6  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        //  5.1


        if ((jQuery('#CAPITOL5_R_5110_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_5110_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.10 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL5_R_519_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_519_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.9 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL5_R_518_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_518_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.8 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL5_R_517_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_517_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.7 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL5_R_516_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_516_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.6 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL5_R_515_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_515_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.5 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL5_R_514_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_514_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.4 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL5_R_514_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_514_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.4 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL5_R_513_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_513_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.3 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL5_R_512_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_512_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.2 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL5_R_511_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_511_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL5_R_511_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_511_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 5.1.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }




        //  4.1

        if ((jQuery('#CAPITOL4_R_411_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R_411_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 4.1.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL4_R_411_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R_411_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 4.1.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL4_R_412_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R_412_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 4.1.2 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL4_R_412_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R_412_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 4.1.2 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

//  3.3

        if ((jQuery('#CAPITOL3_R_331_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_331_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 3.3.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL3_R_332_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_332_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 3.3.2 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL3_R_333_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_333_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 3.3.3 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

//  3.2

        if ((jQuery('#CAPITOL3_R_321_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_321_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 3.2.1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL3_R_322_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_322_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 3.2.2 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL3_R_323_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_323_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 3.2.3 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        if ((jQuery('#CAPITOL3_R_324_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_324_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 3.2.4 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


   
 //  3.1
 


        if ((jQuery('#CAPITOL3_R_313_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_313_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 3.1.3 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL3_R_312_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_312_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 3.1.2  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
        if ((jQuery('#CAPITOL3_R_311_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_311_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 3.1.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }



 // 2.4.3


        if ((jQuery('#CAPITOL2_R_243_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_243_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.4.3  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL2_R_243_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_243_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.4.3  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL2_R_243_C3').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_243_C3',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.4.3  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

 // 2.4.2

        if ((jQuery('#CAPITOL2_R_242_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_242_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.4.2  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL2_R_242_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_242_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.4.2  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL2_R_242_C3').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_242_C3',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.4.2  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        // 2.4.1

        //-----------------------------------

        if ((jQuery('#CAPITOL2_R_241_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_241_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.4.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL2_R_241_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_241_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.4.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL2_R_241_C3').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_241_C3',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.4.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

//---------------------------------------------------------  




        //-----------------------------------
        if ((jQuery('#CAPITOL2_R_232_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_232_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.3.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL2_R_232_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_232_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.3.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
//---------------------------------------------------------  


//-----------------------------------
        if ((jQuery('#CAPITOL2_R_231_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_231_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.3.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

        if ((jQuery('#CAPITOL2_R_231_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_231_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.3.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }
//---------------------------------------------------------  
   
   
        if ((jQuery('#CAPITOL2_R_211_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
        webform.errors.push({
            'fieldName': 'CAPITOL2_R_211_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.1.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
        });
    }

        if ((jQuery('#CAPITOL2_R_211_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_211_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.1.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }

//----
        if ((jQuery('#CAPITOL2_R_212_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_212_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.1.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        //----
        if ((jQuery('#CAPITOL2_R_212_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_212_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.1.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        //----2
        if ((jQuery('#CAPITOL2_R_221_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_221_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.2.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        //----
        if ((jQuery('#CAPITOL2_R_221_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_221_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.2.1  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        //----3
        if ((jQuery('#CAPITOL2_R_222_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_222_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.2.2  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        //----
        if ((jQuery('#CAPITOL2_R_222_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_222_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.2.2  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        //----3
        if ((jQuery('#CAPITOL2_R_223_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_223_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.2.3  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        //----
        if ((jQuery('#CAPITOL2_R_223_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_223_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.2.3  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        //----4
        if ((jQuery('#CAPITOL2_R_224_C1').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_224_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.2.4  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }


        //----
        if ((jQuery('#CAPITOL2_R_224_C2').is(':checked')) &&
            (values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_224_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-1  Daca este 2.2.4  - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3')
            });
        }





    }
    //End--48-1


    //Start--48-0390
    if ((values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false) &&
        (values.CAPITOL1_R114_C1 == '1' || values.CAPITOL1_R114_C1 == '2' || values.CAPITOL1_R114_C1 == '3')) {
        webform.errors.push({
            'fieldName': 'CAPITOL1_R114_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-0390  Daca este nr. rândului @CAPITOL1_R114_C1 - atunci rebuie sa fie bifat randul 1.1.1 sau 1.1.2 sau 1.1.3', { "@CAPITOL1_R114_C1": values.CAPITOL1_R114_C1 })
        });
    }
    //End--48-0390


  //Start--48-03901

    if ((values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false) &&
        (values.CAPITOL1_R114_C1.trim() && (values.CAPITOL1_R114_C1 !== '1' && values.CAPITOL1_R114_C1 !== '2' && values.CAPITOL1_R114_C1 !== '3' && values.CAPITOL1_R114_C1 !== ""))) {
        webform.errors.push({
            'fieldName': 'CAPITOL1_R114_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-03901 Trebuie de indicat din Cap.1.1 numărul rândului 1 sau 2 sau 3')
        });
    }
    //End--48-03901


    //Start--48-03902


    if ((values.CAPITOL1_R111_C1 || values.CAPITOL1_R112_C1 || values.CAPITOL1_R113_C1) &&
        !(['1', '2', '3'].includes(values.CAPITOL1_R114_C1.trim()))
    ) {
        values.CAPITOL1_R114_C1 = values.CAPITOL1_R114_C1.trim(); // removes blank spaces from both sides
        webform.errors.push({
            'fieldName': 'CAPITOL1_R114_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-03902 Trebuie de indicat din Cap.1.1 numărul rândului 1 sau 2 sau 3')
        });
    }


    //End--48-03902




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
            if (value > 100) {
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

    values.CAPITOL1_R114_C1 = values.CAPITOL1_R114_C1.trim(); // removes blank spaces from both sides

    // Start 48-040
    if (
        ['1', '2', '3'].includes(values.CAPITOL1_R114_C1) && // 1 Condition: Must be one of the three values
        !(
            (jQuery('#CAPITOL2_R_211_C1').is(':checked') || jQuery('#CAPITOL2_R_211_C2').is(':checked')) &&  // 2 Condition: One of the two checkboxes must be checked
            (jQuery('#CAPITOL2_R_212_C1').is(':checked') || jQuery('#CAPITOL2_R_212_C2').is(':checked')) &&  // 3 Condition: One of the two checkboxes must be checked
            (jQuery('#CAPITOL3_R_311_C1').is(':checked') || jQuery('#CAPITOL3_R_311_C2').is(':checked')) &&  // 4 Condition: One of the two checkboxes must be checked
            (jQuery('#CAPITOL3_R_312_C1').is(':checked') || jQuery('#CAPITOL3_R_312_C2').is(':checked')) &&  // 5 Condition: One of the two checkboxes must be checked
            (jQuery('#CAPITOL3_R_313_C1').is(':checked') || jQuery('#CAPITOL3_R_313_C2').is(':checked')) &&    // 6 Condition: One of the two checkboxes must be checked

            (jQuery('#CAPITOL4_R_411_C1').is(':checked') || jQuery('#CAPITOL4_R_411_C2').is(':checked')) &&
            (jQuery('#CAPITOL4_R_412_C1').is(':checked') || jQuery('#CAPITOL4_R_412_C2').is(':checked'))
        )
    ) {




        if ((!jQuery('#CAPITOL4_R_411_C1').is(':checked') && !jQuery('#CAPITOL4_R_411_C2').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL4_R_411_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-051. Cap.4  Rind. (4.1.1 sau 4.1.2) trebuie sa fie bifat obligatoriu')
            });


        if ((!jQuery('#CAPITOL4_R_411_C1').is(':checked') && !jQuery('#CAPITOL4_R_411_C2').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL4_R_411_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-051. Cap.4  Rind. (4.1.1 sau 4.1.2) trebuie sa fie bifat obligatoriu')
            });


        if ((!jQuery('#CAPITOL4_R_412_C1').is(':checked') && !jQuery('#CAPITOL4_R_412_C2').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL4_R_412_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-051. Cap.4  Rind. (4.1.1 sau 4.1.2) trebuie sa fie bifat obligatoriu')
            });


        if ((!jQuery('#CAPITOL4_R_412_C1').is(':checked') && !jQuery('#CAPITOL4_R_412_C2').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL4_R_412_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-051. Cap.4  Rind. (4.1.1 sau 4.1.2) trebuie sa fie bifat obligatoriu')
            });


//------------------------------------------------------------------------



        if ((!jQuery('#CAPITOL2_R_211_C1').is(':checked') && !jQuery('#CAPITOL2_R_211_C2').is(':checked')))
        webform.errors.push({
            'fieldName': 'CAPITOL2_R_211_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-040. Cap.2 Rind. 2.1.1 si Rind. 2.1.2 trebuie sa fie bifat obligatoriu')
        });


        if ((!jQuery('#CAPITOL2_R_211_C1').is(':checked') && !jQuery('#CAPITOL2_R_211_C2').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_211_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-040. Cap.2 Rind. 2.1.1 si Rind. 2.1.2 trebuie sa fie bifat obligatoriu')
            });








        if ((!jQuery('#CAPITOL2_R_212_C1').is(':checked') && !jQuery('#CAPITOL2_R_212_C2').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_212_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-040. Cap.2 Rind. 2.1.1 si Rind. 2.1.2 trebuie sa fie bifat obligatoriu')
            });


        if ((!jQuery('#CAPITOL2_R_212_C1').is(':checked') && !jQuery('#CAPITOL2_R_212_C2').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_212_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-040. Cap.2 Rind. 2.1.1 si Rind. 2.1.2 trebuie sa fie bifat obligatoriu')
            });


        if ((!jQuery('#CAPITOL3_R_311_C1').is(':checked') && !jQuery('#CAPITOL3_R_311_C2').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_311_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-041. Cap.3 Rind. (3.1.1-3.1.3)  completate obligatoriu')
            });

        if ((!jQuery('#CAPITOL3_R_311_C1').is(':checked') && !jQuery('#CAPITOL3_R_311_C2').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_311_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-041. Cap.3 Rind. (3.1.1-3.1.3)  completate obligatoriu')
            });




        if ((!jQuery('#CAPITOL3_R_312_C1').is(':checked') && !jQuery('#CAPITOL3_R_312_C2').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_312_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-041. Cap.3 Rind. (3.1.1-3.1.3)  completate obligatoriu')
            });

        if ((!jQuery('#CAPITOL3_R_312_C1').is(':checked') && !jQuery('#CAPITOL3_R_312_C1').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_312_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-041.Cap.3 Rind. (3.1.1-3.1.3)  completate obligatoriu')
            });


        if ((!jQuery('#CAPITOL3_R_313_C1').is(':checked') && !jQuery('#CAPITOL3_R_313_C2').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_313_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-041. Cap.3 Rind. (3.1.1-3.1.3)  completate obligatoriu')
            });

        if ((!jQuery('#CAPITOL3_R_313_C1').is(':checked') && !jQuery('#CAPITOL3_R_313_C1').is(':checked')))
            webform.errors.push({
                'fieldName': 'CAPITOL3_R_313_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-041. Cap.3 Rind. (3.1.1-3.1.3)  completate obligatoriu')
            });




    }
// End 48-040












//Start 48-0402


// Checking  telefon 
    if (!values.PHONE || !/^[0-9]{9}$/.test(values.PHONE)) {
        webform.errors.push({
            'fieldName': 'TITLU_R3_C31',
            'msg': Drupal.t(' Cod eroare: A.09 Introduceți doar un număr de telefon format din 9 cifre')
        });
    }

    // Check if the first digit is 0
    if (values.PHONE && values.PHONE[0] !== '0') {
        webform.errors.push({
            'fieldName': 'TITLU_R3_C31',
            'msg': Drupal.t(' Cod eroare: A.09 Prima cifră a numărului de telefon trebuie să fie 0')
        });
    }
    //End  Checking  telefon

    //End 48-042



    //Start 48-043



// I changed it like this

    if ((jQuery('#CAPITOL2_R_211_C2').is(':checked') && !jQuery('#CAPITOL2_R_212_C2').is(':checked')) &&
        (!jQuery('#CAPITOL2_R_221_C2').is(':checked') &&
            !jQuery('#CAPITOL2_R_222_C2').is(':checked') &&
            !jQuery('#CAPITOL2_R_223_C2').is(':checked') &&
            !jQuery('#CAPITOL2_R_224_C2').is(':checked'))) {

     
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_221_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-043. Rindul 2.2.1 nu este bifat.')
            });

        webform.errors.push({
            'fieldName': 'CAPITOL2_R_222_C2',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-043. Rindul 2.2.2 nu este bifat.')
        });

        webform.errors.push({
            'fieldName': 'CAPITOL2_R_223_C2',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-043. Rindul 2.2.3 nu este bifat.')
        });

        webform.errors.push({
            'fieldName': 'CAPITOL2_R_224_C2',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-043. Rindul 2.2.4 nu este bifat.')
        });
        }
       
//Correct ? 

    

    //End 48-043

    //Start 48-007
    var R_233 = Number(values.CAPITOL2_R_233_C1);
    var R_234 = Number(values.CAPITOL2_R_234_C1);
    var R_235 = Number(values.CAPITOL2_R_235_C1);
    var R_236 = Number(values.CAPITOL2_R_236_C1);
    var sum_33_36 = R_233 + R_234 + R_235;
    if (sum_33_36 != 100 && sum_33_36 != 0) {
        webform.errors.push({
            'fieldName': 'CAPITOL2_R_236_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-007 Cap.2  Rind 2.3.3 + 2.3.4 + 2.3.5 = 100%,   @sum_33_36 <> 100', { "@sum_33_36": sum_33_36 })
        });
    }

//End 48-007




//Start 48-048
 if (
    (jQuery('#CAPITOL2_R_211_C1').is(':checked') 
    || jQuery('#CAPITOL2_R_212_C1').is(':checked') 
    || jQuery('#CAPITOL2_R_221_C1').is(':checked') 
    || jQuery('#CAPITOL2_R_222_C1').is(':checked') 
            || jQuery('#CAPITOL2_R_223_C1').is(':checked')) && (sum_33_36 != 100)



    ) {

      
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_236_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-048: Dacă rd.2.1.1, 2.1.2, 2.2.1, 2.2.2, 2.2.3 sunt bifate , atunci rd.2.3.3 + 2.3.4 + 2.3.5 = 100%.')
            });
     
           }

//End 48-048
//Start 48-047

    if (!isNaN(Number(values["CAPITOL5_R_521_C1"]))) {
        var R_521 = Number(values["CAPITOL5_R_521_C1"]);
    }

    if (!isNaN(Number(values["CAPITOL5_R_522_C1"]))) {
        var R_522 = Number(values["CAPITOL5_R_522_C1"]);
    }

    if (!isNaN(Number(values["CAPITOL5_R_523_C1"]))) {
        var R_523 = Number(values["CAPITOL5_R_523_C1"]);
    }

    if (!isNaN(Number(values["CAPITOL5_R_524_C1"]))) {
        var R_524 = Number(values["CAPITOL5_R_524_C1"]);
    }
    
    if (!isNaN(Number(values["CAPITOL5_R_525_C1"]))) {
        var R_525 = Number(values["CAPITOL5_R_525_C1"]);
    }

    if (!isNaN(Number(values["CAPITOL5_R_526_C1"]))) {
        var R_526 = Number(values["CAPITOL5_R_526_C1"]);
    }


    if (

           (jQuery('#CAPITOL5_R_515_C1').is(':checked')
            || jQuery('#CAPITOL5_R_516_C1').is(':checked')
            || jQuery('#CAPITOL5_R_517_C1').is(':checked')
            || jQuery('#CAPITOL5_R_518_C1').is(':checked')
            || jQuery('#CAPITOL5_R_519_C1').is(':checked')
            || jQuery('#CAPITOL5_R_5110_C1').is(':checked'))
        && (R_526 < 1000  )      )

{
     

        if (jQuery('#CAPITOL5_R_515_C1').is(':checked')){
        webform.errors.push({
            'fieldName': 'CAPITOL5_R_515_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-047: Cap.2 Daca Rind. 5.1.5 si/sau 5.1.10 = Da  atunci Rind. 5.2.1 si/sau 5.2.5>= 1000')
        });
       }

        if (jQuery('#CAPITOL5_R_516_C1').is(':checked')) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_516_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-047: Cap.2 Daca Rind. 5.1.5 si/sau 5.1.10 = Da  atunci Rind. 5.2.1 si/sau 5.2.5>= 1000')
            });
    }

        if (jQuery('#CAPITOL5_R_517_C1').is(':checked')) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_517_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-047: Cap.2 Daca Rind. 5.1.5 si/sau 5.1.10 = Da  atunci Rind. 5.2.1 si/sau 5.2.5>= 1000')
            });
        }
    

        if (jQuery('#CAPITOL5_R_518_C1').is(':checked')) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_518_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-047: Cap.2 Daca Rind. 5.1.5 si/sau 5.1.10 = Da  atunci Rind. 5.2.1 si/sau 5.2.5>= 1000')
            });
        }

        if (jQuery('#CAPITOL5_R_519_C1').is(':checked')) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_519_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-047: Cap.2 Daca Rind. 5.1.5 si/sau 5.1.10 = Da  atunci Rind. 5.2.1 si/sau 5.2.5>= 1000')
            });
        }

        if (jQuery('#CAPITOL5_R_5110_C1').is(':checked')) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R_5110_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-047: Cap.2 Daca Rind. 5.1.5 si/sau 5.1.10 = Da  atunci Rind. 5.2.1 si/sau 5.2.5>= 1000')
            });
        }

    
}

    
//End 48-047


//Start 48-015
    if (jQuery('#CAPITOL5_R_512_C1').is(':checked') && !jQuery('#CAPITOL5_R_511_C1').is(':checked')) {


        webform.errors.push({
            'fieldName': 'CAPITOL5_R_512_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-015: Cap.5 Rind. (5.1.2, 5.1.3 )  se bifeaza daca Rind. 5.1.1 este bifat cu DA')
        });

    }


    if (jQuery('#CAPITOL5_R_513_C1').is(':checked') && !jQuery('#CAPITOL5_R_511_C1').is(':checked')) {


        webform.errors.push({
            'fieldName': 'CAPITOL5_R_513_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-015: Cap.5 Rind. (5.1.2, 5.1.3 )  se bifeaza daca Rind. 5.1.1 este bifat cu DA')
        });

    }



//End 48-015
   //Start 48-016
    if ((!jQuery('#CAPITOL5_R_512_C1').is(':checked') && !jQuery('#CAPITOL5_R_513_C1').is(':checked'))  && jQuery('#CAPITOL5_R_511_C1').is(':checked')) {


        webform.errors.push({
            'fieldName': 'CAPITOL5_R_512_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-016: Cap.5 Daca Rind 5.1.1 este bifat, trebuie bifat Rind 5.1.2 si/sau Rind 5.1.3')
        });

    }


    if ((!jQuery('#CAPITOL5_R_512_C1').is(':checked') && !jQuery('#CAPITOL5_R_513_C1').is(':checked')) && jQuery('#CAPITOL5_R_511_C1').is(':checked')) {


        webform.errors.push({
            'fieldName': 'CAPITOL5_R_513_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-016: Cap.5 Daca Rind 5.1.1 este bifat, trebuie bifat Rind 5.1.2 si/sau Rind 5.1.3')
        });

    }


//End 48-016


    //Start 48-032
    if ((values.CAPITOL5_R_521_C1 == 0 || isNaN(Number(values["CAPITOL5_R_521_C1"]))) && jQuery('#CAPITOL5_R_511_C1').is(':checked') ) {


        webform.errors.push({
            'fieldName': 'CAPITOL5_R_521_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-032: Cap.5 Dacă Rind. 5.1.1 este "DA" , completati Rind.  5.2.1')
        });

    }

//End 48-032



    //Start 48-033
    if ((values.CAPITOL5_R_522_C1 == 0 || isNaN(Number(values["CAPITOL5_R_522_C1"]))) && jQuery('#CAPITOL5_R_514_C1').is(':checked')) {


        webform.errors.push({
            'fieldName': 'CAPITOL5_R_522_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-033: Cap.5 Dacă Rind. 5.1.4 este "DA" , completati Rind.  5.2.2')
        });

    }

//End 48-033



    //Start 48-034
    if ((values.CAPITOL5_R_523_C1 == 0 || isNaN(Number(values["CAPITOL5_R_523_C1"]))) && jQuery('#CAPITOL5_R_515_C1').is(':checked')) {


        webform.errors.push({
            'fieldName': 'CAPITOL5_R_523_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-034: Cap.5 Dacă Rind. 5.1.5 este "DA" , completati Rind.  5.2.3')
        });

    }

//End 48-034




    //Start 48-035
    if ((values.CAPITOL5_R_524_C1 == 0 || isNaN(Number(values["CAPITOL5_R_524_C1"]))) && jQuery('#CAPITOL5_R_516_C1').is(':checked')) {


        webform.errors.push({
            'fieldName': 'CAPITOL5_R_524_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-035: Cap.5 Dacă Rind. 5.1.6 este "DA" , completati Rind.  5.2.4')
        });

    }

//End 48-035



    //Start 48-037
    if (!jQuery('#CAPITOL8_R_811_C1').is(':checked') && jQuery('#CAPITOL5_R_519_C1').is(':checked')) {


        webform.errors.push({
            'fieldName': 'CAPITOL8_R_811_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-037: Cap.5 Dacă Rind. 5.1.9. este "DA" , atunci Rind 8.1.1 = "DA"')
        });

    }

//End 48-037



    //Start 48-038
    if ((values.CAPITOL5_R_525_C1 == 0 || isNaN(Number(values["CAPITOL5_R_525_C1"]))) && jQuery('#CAPITOL5_R_5110_C1').is(':checked')) {


        webform.errors.push({
            'fieldName': 'CAPITOL5_R_525_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-038: Cap.5 Dacă Rind. 5.1.10 este "DA" , completati Rind.  5.2.5 ')
        });

    }

//End 48-038


    //Start 48-053
    if (jQuery('#CAPITOL6_R_611_C1').is(':checked') &&
        (
            !(jQuery('#CAPITOL6_R_621_C1').is(':checked') || jQuery('#CAPITOL6_R_621_C2').is(':checked') || jQuery('#CAPITOL6_R_621_C3').is(':checked')) &&
        !(jQuery('#CAPITOL6_R_622_C1').is(':checked') || jQuery('#CAPITOL6_R_622_C2').is(':checked') || jQuery('#CAPITOL6_R_622_C3').is(':checked')) &&
        !(jQuery('#CAPITOL6_R_623_C1').is(':checked') || jQuery('#CAPITOL6_R_623_C2').is(':checked') || jQuery('#CAPITOL6_R_623_C3').is(':checked')) &&
        !(jQuery('#CAPITOL6_R_624_C1').is(':checked') || jQuery('#CAPITOL6_R_624_C2').is(':checked') || jQuery('#CAPITOL6_R_624_C3').is(':checked')) &&
        !(jQuery('#CAPITOL6_R_625_C1').is(':checked') || jQuery('#CAPITOL6_R_625_C2').is(':checked') || jQuery('#CAPITOL6_R_625_C3').is(':checked')) &&
        !(jQuery('#CAPITOL6_R_626_C1').is(':checked') || jQuery('#CAPITOL6_R_626_C2').is(':checked') || jQuery('#CAPITOL6_R_626_C3').is(':checked')) &&
        !(jQuery('#CAPITOL6_R_627_C1').is(':checked') || jQuery('#CAPITOL6_R_627_C2').is(':checked') || jQuery('#CAPITOL6_R_627_C3').is(':checked')) &&
            !(jQuery('#CAPITOL6_R_628_C1').is(':checked') || jQuery('#CAPITOL6_R_628_C2').is(':checked') || jQuery('#CAPITOL6_R_628_C3').is(':checked'))
            
            
            )
    ) {


        webform.errors.push({
            'fieldName': 'CAPITOL6_R_611_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-053: Cap.6  Dacă  ați bifat ”Da” la Rind. 6.1.1,  trebuie completat  6.2 ')
        });

    }

//End 48-053


    //Start 48-054
    if (!jQuery('#CAPITOL6_R_611_C1').is(':checked') &&
        (
            (jQuery('#CAPITOL6_R_621_C1').is(':checked') || jQuery('#CAPITOL6_R_621_C2').is(':checked') || jQuery('#CAPITOL6_R_621_C3').is(':checked')) ||
            (jQuery('#CAPITOL6_R_622_C1').is(':checked') || jQuery('#CAPITOL6_R_622_C2').is(':checked') || jQuery('#CAPITOL6_R_622_C3').is(':checked')) ||
            (jQuery('#CAPITOL6_R_623_C1').is(':checked') || jQuery('#CAPITOL6_R_623_C2').is(':checked') || jQuery('#CAPITOL6_R_623_C3').is(':checked')) ||
            (jQuery('#CAPITOL6_R_624_C1').is(':checked') || jQuery('#CAPITOL6_R_624_C2').is(':checked') || jQuery('#CAPITOL6_R_624_C3').is(':checked')) ||
            (jQuery('#CAPITOL6_R_625_C1').is(':checked') || jQuery('#CAPITOL6_R_625_C2').is(':checked') || jQuery('#CAPITOL6_R_625_C3').is(':checked')) ||
            (jQuery('#CAPITOL6_R_626_C1').is(':checked') || jQuery('#CAPITOL6_R_626_C2').is(':checked') || jQuery('#CAPITOL6_R_626_C3').is(':checked')) ||
            (jQuery('#CAPITOL6_R_627_C1').is(':checked') || jQuery('#CAPITOL6_R_627_C2').is(':checked') || jQuery('#CAPITOL6_R_627_C3').is(':checked')) ||
            (jQuery('#CAPITOL6_R_628_C1').is(':checked') || jQuery('#CAPITOL6_R_628_C2').is(':checked') || jQuery('#CAPITOL6_R_628_C3').is(':checked'))


        )
    ) {


        webform.errors.push({
            'fieldName': 'CAPITOL6_R_611_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-054: Cap.6  Dacă  ați bifat Cap. 6.2,  trebuie bifat 6.1.1 Da')
        });

    }

//End 48-054

















//Start 48-030
    if (jQuery('#CAPITOL3_R_313_C1').is(':checked') && !jQuery('#CAPITOL5_R_515_C1').is(':checked')) 
    {


        webform.errors.push({
            'fieldName': 'CAPITOL3_R_313_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-030: Cap.3 Dacă răspundeți ”DA”  la Rind. 3.1.3, Rind. 5.1.5 trebuie completat cu "DA"')
        });

    }

//End 48-030



    //Start 48-031.1
    if ((jQuery('#CAPITOL3_R_313_C1').is(':checked')|| jQuery('#CAPITOL3_R_312_C1').is(':checked') || jQuery('#CAPITOL3_R_311_C1').is(':checked')
    ) && !jQuery('#CAPITOL5_R_515_C1').is(':checked')) {


        webform.errors.push({
            'fieldName': 'CAPITOL5_R_515_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-031.1: Cap.3 Dacă Rind. 3.1.1 - 3.1.3 ="DA", atunci Rind. Rind. 5.1.5 ="DA"')
        });

    }

//End 48-031.1
//Start 48-031

    var R_523_C = Number(values.CAPITOL5_R_523_C1);
    if ((jQuery('#CAPITOL3_R_311_C1').is(':checked') || jQuery('#CAPITOL3_R_312_C1').is(':checked') || jQuery('#CAPITOL3_R_313_C1').is(':checked'))  && R_523_C == 0 ) {


        webform.errors.push({
            'fieldName': 'CAPITOL5_R_523_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-031: Cap.3 Dacă Rind. 3.1.1 - 3.1.3 si Rind. 5.1.5 =" DA", atunci Rind. 5.2.3 > 0')
        });

    }

//End 48-031
 //Start 46-046


    if (((R_233 <= 100 && R_233 != 0) || (R_234 <= 100 && R_234 != 0)) && 
        
        !(jQuery('#CAPITOL5_R_515_C1').is(':checked')
        || jQuery('#CAPITOL5_R_516_C1').is(':checked')
        || jQuery('#CAPITOL5_R_517_C1').is(':checked')
        || jQuery('#CAPITOL5_R_518_C1').is(':checked')
        || jQuery('#CAPITOL5_R_519_C1').is(':checked')
        || jQuery('#CAPITOL5_R_5110_C1').is(':checked')
        )) 
        
        
        {



        if (R_233 <= 100 && R_233 != 0)
        {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_233_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-046 Cap.2 Dacă Rind. 2.3.3 si/sau 2.3.4 <=100,  atunci Rind. 5.1.5 - 5.1.10  trebuie bifat.')
            });

            if (!jQuery('#CAPITOL5_R_515_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_515_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.5 nu este bifat.')
                });
            }

            if (!jQuery('#CAPITOL5_R_516_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_516_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.6 nu este bifat.')
                });
            }



            if (!jQuery('#CAPITOL5_R_517_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_517_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.7 nu este bifat.')
                });
            }

            if (!jQuery('#CAPITOL5_R_518_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_518_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.8 nu este bifat.')
                });
            }


            if (!jQuery('#CAPITOL5_R_519_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_519_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.9 nu este bifat.')
                });
            }


            if (!jQuery('#CAPITOL5_R_5110_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_5110_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.10 nu este bifat.')
                });
            }

            
            }

            else
            {
       

            

        if (R_234 <= 100 && R_234 != 0)
            { 

                 webform.errors.push({
                'fieldName': 'CAPITOL2_R_234_C1',
                  'index': 0,
                 'msg': Drupal.t('Cod eroare: 48-046 Cap.2 Dacă Rind. 2.3.3 si/sau 2.3.4 <= 100,  atunci Rind. 5.1.5 - 5.1.10  trebuie bifat.')
                });

            if (!jQuery('#CAPITOL5_R_515_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_515_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.5 nu este bifat.')
                });
            }

            if (!jQuery('#CAPITOL5_R_516_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_516_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.6 nu este bifat.')
                });
            }



            if (!jQuery('#CAPITOL5_R_517_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_517_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.7 nu este bifat.')
                });
            }

            if (!jQuery('#CAPITOL5_R_518_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_518_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.8 nu este bifat.')
                });
            }


            if (!jQuery('#CAPITOL5_R_519_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_519_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.9 nu este bifat.')
                });
            }


            if (!jQuery('#CAPITOL5_R_5110_C1').is(':checked')) {
                webform.errors.push({
                    'fieldName': 'CAPITOL5_R_5110_C1',
                    'index': 0,
                    'msg': Drupal.t('Cod eroare: 48-046. Rindul 5.1.10 nu este bifat.')
                });
            }

            }
      


    }

}

//End 46-046



    //Start 48-070
    if ((jQuery('#CAPITOL1_R111_C1').is(':checked') || jQuery('#CAPITOL1_R112_C1').is(':checked') || jQuery('#CAPITOL1_R113_C1').is(':checked') )
        && !(jQuery('#CAPITOL6_R_611_C1').is(':checked') || jQuery('#CAPITOL6_R_612_C1').is(':checked'))
        && !(jQuery('#CAPITOL4_R_411_C2').is(':checked') && jQuery('#CAPITOL4_R_412_C2').is(':checked'))

    ) {


        webform.errors.push({
            'fieldName': 'CAPITOL6_R_611_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-070: Cap.6  Rind.6.1.1 si/sau 6.1.2 bifate obligatoriu')
        });


        webform.errors.push({
            'fieldName': 'CAPITOL6_R_612_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-070: Cap.6  Rind.6.1.1 si/sau 6.1.2 bifate obligatoriu')
        });

    }

//End 48-070

//Review this code of js. 


    // //Start 48-044
    if (
        
        !(jQuery('#CAPITOL1_R111_C1').is(':checked') || jQuery('#CAPITOL1_R112_C1').is(':checked') || jQuery('#CAPITOL1_R113_C1').is(':checked'))


        && (
            ! (jQuery('#CAPITOL7_R_711_C1').is(':checked') || jQuery('#CAPITOL7_R_711_C2').is(':checked')) ||
            ! (jQuery('#CAPITOL7_R_712_C1').is(':checked') || jQuery('#CAPITOL7_R_712_C2').is(':checked')) ||
            ! (jQuery('#CAPITOL7_R_713_C1').is(':checked') || jQuery('#CAPITOL7_R_713_C2').is(':checked'))
        
           )

        || 
          (
            
            ((jQuery('#CAPITOL4_R_411_C1').is(':checked') || jQuery('#CAPITOL4_R_411_C2').is(':checked')) ||
            (jQuery('#CAPITOL4_R_412_C1').is(':checked') || jQuery('#CAPITOL4_R_412_C2').is(':checked')))

          &&

            (
            
            !(jQuery('#CAPITOL7_R_711_C1').is(':checked') || jQuery('#CAPITOL7_R_711_C2').is(':checked')) &&
            !(jQuery('#CAPITOL7_R_712_C1').is(':checked') || jQuery('#CAPITOL7_R_712_C2').is(':checked')) &&
            !(jQuery('#CAPITOL7_R_713_C1').is(':checked') || jQuery('#CAPITOL7_R_713_C2').is(':checked'))
            
            )

          )


    ) {

        if (!(jQuery('#CAPITOL7_R_711_C1').is(':checked') || jQuery('#CAPITOL7_R_711_C2').is(':checked')))
                                                                                           {
        webform.errors.push({
            'fieldName': 'CAPITOL7_R_711_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-044: Cap.7  Rind. (7.1.1-7.1.3)  completate obligatoriu')
        });


        webform.errors.push({
            'fieldName': 'CAPITOL7_R_711_C2',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-044:  Cap.7  Rind. (7.1.1-7.1.3)  completate obligatoriu')
        });

    }


        if (!(jQuery('#CAPITOL7_R_712_C1').is(':checked') || jQuery('#CAPITOL7_R_712_C2').is(':checked'))){

        webform.errors.push({
            'fieldName': 'CAPITOL7_R_712_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-044: Cap.7  Rind. (7.1.1-7.1.3)  completate obligatoriu')
        });


        webform.errors.push({
            'fieldName': 'CAPITOL7_R_712_C2',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-044:  Cap.7  Rind. (7.1.1-7.1.3)  completate obligatoriu')
        });

    }



        if (!(jQuery('#CAPITOL7_R_713_C1').is(':checked') || jQuery('#CAPITOL7_R_713_C2').is(':checked'))) {
        webform.errors.push({
            'fieldName': 'CAPITOL7_R_713_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-044: Cap.7  Rind. (7.1.1-7.1.3)  completate obligatoriu')
        });


        webform.errors.push({
            'fieldName': 'CAPITOL7_R_713_C2',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-044:  Cap.7  Rind. (7.1.1-7.1.3)  completate obligatoriu')
        });
    }

    }

//End 48-044



    //Start 48-045
    if ((!(jQuery('#CAPITOL1_R111_C1').is(':checked') || jQuery('#CAPITOL1_R112_C1').is(':checked') || jQuery('#CAPITOL1_R113_C1').is(':checked'))
        && (
        !(jQuery('#CAPITOL8_R_811_C1').is(':checked') || jQuery('#CAPITOL8_R_811_C2').is(':checked')) ||
        !(jQuery('#CAPITOL8_R_812_C1').is(':checked') || jQuery('#CAPITOL8_R_812_C2').is(':checked')) ||
        !(jQuery('#CAPITOL8_R_813_C1').is(':checked') || jQuery('#CAPITOL8_R_813_C2').is(':checked')) ||
        !(jQuery('#CAPITOL8_R_814_C1').is(':checked') || jQuery('#CAPITOL8_R_814_C2').is(':checked'))


        ))
        ||

        (
        ((jQuery('#CAPITOL4_R_411_C1').is(':checked') || jQuery('#CAPITOL4_R_411_C2').is(':checked')) ||
            (jQuery('#CAPITOL4_R_412_C1').is(':checked') || jQuery('#CAPITOL4_R_412_C2').is(':checked')))

            &&
            (
            !(jQuery('#CAPITOL8_R_811_C1').is(':checked') || jQuery('#CAPITOL8_R_811_C2').is(':checked')) &&
            !(jQuery('#CAPITOL8_R_812_C1').is(':checked') || jQuery('#CAPITOL8_R_812_C2').is(':checked')) &&
            !(jQuery('#CAPITOL8_R_813_C1').is(':checked') || jQuery('#CAPITOL8_R_813_C2').is(':checked')) &&
            !(jQuery('#CAPITOL8_R_814_C1').is(':checked') || jQuery('#CAPITOL8_R_814_C2').is(':checked'))
            )
        )
        



    ) {


        if (!(jQuery('#CAPITOL8_R_811_C1').is(':checked') || jQuery('#CAPITOL8_R_811_C2').is(':checked'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_811_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-045: Cap.8  Rind. (8.1.1-8.1.4)  completate obligatoriu')
            });


            webform.errors.push({
                'fieldName': 'CAPITOL8_R_811_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-045: Cap.8  Rind. (8.1.1-8.1.4)  completate obligatoriu')
            });

        }


        if (!(jQuery('#CAPITOL8_R_812_C1').is(':checked') || jQuery('#CAPITOL8_R_812_C2').is(':checked'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_812_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-045: Cap.8  Rind. (8.1.1-8.1.4)  completate obligatoriu')
            });


            webform.errors.push({
                'fieldName': 'CAPITOL8_R_812_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-045: Cap.8  Rind. (8.1.1-8.1.4)  completate obligatoriu')
            });

        }

        if (!(jQuery('#CAPITOL8_R_813_C1').is(':checked') || jQuery('#CAPITOL8_R_813_C2').is(':checked'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_813_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-045: Cap.8  Rind. (8.1.1-8.1.4)  completate obligatoriu')
            });


            webform.errors.push({
                'fieldName': 'CAPITOL8_R_813_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-045: Cap.8  Rind. (8.1.1-8.1.4)  completate obligatoriu')
            });

        }




        if (!(jQuery('#CAPITOL8_R_814_C1').is(':checked') || jQuery('#CAPITOL8_R_814_C2').is(':checked'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL8_R_814_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-045: Cap.8  Rind. (8.1.1-8.1.4)  completate obligatoriu')
            });


            webform.errors.push({
                'fieldName': 'CAPITOL8_R_814_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-045: Cap.8  Rind. (8.1.1-8.1.4)  completate obligatoriu')
            });

        }



    }

//End 48-045


    // Start 48-055

    if (
        
        ((
            // Modified this js code for Drupal - Add in this condition these variables
            !jQuery('#CAPITOL2_R_211_C1').is(':checked') && !jQuery('#CAPITOL2_R_212_C1').is(':checked') &&
            !jQuery('#CAPITOL2_R_221_C1').is(':checked') && !jQuery('#CAPITOL2_R_222_C1').is(':checked') &&
            !jQuery('#CAPITOL2_R_223_C1').is(':checked') && !jQuery('#CAPITOL2_R_224_C1').is(':checked') &&
            !jQuery('#CAPITOL2_R_231_C1').is(':checked') && !jQuery('#CAPITOL2_R_232_C1').is(':checked') &&
            !jQuery('#CAPITOL2_R_241_C1').is(':checked') && !jQuery('#CAPITOL2_R_242_C1').is(':checked') &&
            !jQuery('#CAPITOL2_R_243_C1').is(':checked') && !jQuery('#CAPITOL3_R_311_C1').is(':checked') &&
            !jQuery('#CAPITOL3_R_312_C1').is(':checked') && !jQuery('#CAPITOL3_R_313_C1').is(':checked') &&
            !jQuery('#CAPITOL3_R_321_C1').is(':checked') && !jQuery('#CAPITOL3_R_322_C1').is(':checked') &&
            !jQuery('#CAPITOL3_R_323_C1').is(':checked') && !jQuery('#CAPITOL3_R_324_C1').is(':checked') &&
            !jQuery('#CAPITOL3_R_331_C1').is(':checked') && !jQuery('#CAPITOL3_R_332_C1').is(':checked') &&
            !jQuery('#CAPITOL3_R_333_C1').is(':checked') && !jQuery('#CAPITOL4_R_411_C1').is(':checked') &&
            !jQuery('#CAPITOL4_R_412_C1').is(':checked') && !jQuery('#CAPITOL5_R_511_C1').is(':checked') &&
            !jQuery('#CAPITOL5_R_512_C1').is(':checked') && !jQuery('#CAPITOL5_R_513_C1').is(':checked') &&
            !jQuery('#CAPITOL5_R_514_C1').is(':checked') && !jQuery('#CAPITOL5_R_515_C1').is(':checked') &&
            !jQuery('#CAPITOL5_R_516_C1').is(':checked') && !jQuery('#CAPITOL5_R_517_C1').is(':checked') &&
            !jQuery('#CAPITOL5_R_518_C1').is(':checked') && !jQuery('#CAPITOL5_R_519_C1').is(':checked') &&
            !jQuery('#CAPITOL5_R_5110_C1').is(':checked') && !jQuery('#CAPITOL5_R_531_C1').is(':checked') &&
            !jQuery('#CAPITOL5_R_532_C1').is(':checked') && !jQuery('#CAPITOL5_R_533_C1').is(':checked') &&
            !jQuery('#CAPITOL6_R_611_C1').is(':checked') && !jQuery('#CAPITOL6_R_612_C1').is(':checked') &&
            !jQuery('#CAPITOL6_R_621_C1').is(':checked') && !jQuery('#CAPITOL6_R_621_C2').is(':checked') &&
            !jQuery('#CAPITOL6_R_621_C3').is(':checked') && !jQuery('#CAPITOL6_R_622_C1').is(':checked') &&
            !jQuery('#CAPITOL6_R_622_C2').is(':checked') && !jQuery('#CAPITOL6_R_622_C3').is(':checked') &&
            !jQuery('#CAPITOL6_R_623_C1').is(':checked') && !jQuery('#CAPITOL6_R_623_C2').is(':checked') &&
            !jQuery('#CAPITOL6_R_623_C3').is(':checked') && !jQuery('#CAPITOL6_R_624_C1').is(':checked') &&
            !jQuery('#CAPITOL6_R_624_C2').is(':checked') && !jQuery('#CAPITOL6_R_624_C3').is(':checked') &&
            !jQuery('#CAPITOL6_R_625_C1').is(':checked') && !jQuery('#CAPITOL6_R_625_C2').is(':checked') &&
            !jQuery('#CAPITOL6_R_625_C3').is(':checked') && !jQuery('#CAPITOL6_R_626_C1').is(':checked') &&
            !jQuery('#CAPITOL6_R_626_C2').is(':checked') && !jQuery('#CAPITOL6_R_626_C3').is(':checked') &&
            !jQuery('#CAPITOL6_R_627_C1').is(':checked') && !jQuery('#CAPITOL6_R_627_C2').is(':checked') &&
            !jQuery('#CAPITOL6_R_627_C3').is(':checked') && !jQuery('#CAPITOL6_R_628_C1').is(':checked') &&
            !jQuery('#CAPITOL6_R_628_C2').is(':checked') && !jQuery('#CAPITOL6_R_628_C3').is(':checked') &&
            !jQuery('#CAPITOL7_R_711_C1').is(':checked') && !jQuery('#CAPITOL7_R_712_C1').is(':checked') &&
            !jQuery('#CAPITOL7_R_713_C1').is(':checked') && !jQuery('#CAPITOL8_R_811_C1').is(':checked') &&
            !jQuery('#CAPITOL8_R_812_C1').is(':checked') && !jQuery('#CAPITOL8_R_813_C1').is(':checked') &&
            !jQuery('#CAPITOL8_R_814_C1').is(':checked')
        )
        &&
        (
            values.CAPITOL9_R92_C31.length > 0 
        ))

        ||


        ((
            // Modified this js code for Drupal - Add in this condition these variables
            jQuery('#CAPITOL2_R_211_C1').is(':checked') || jQuery('#CAPITOL2_R_212_C1').is(':checked') ||
            jQuery('#CAPITOL2_R_221_C1').is(':checked') || jQuery('#CAPITOL2_R_222_C1').is(':checked') ||
            jQuery('#CAPITOL2_R_223_C1').is(':checked') || jQuery('#CAPITOL2_R_224_C1').is(':checked') ||
            jQuery('#CAPITOL2_R_231_C1').is(':checked') || jQuery('#CAPITOL2_R_232_C1').is(':checked') ||
            jQuery('#CAPITOL2_R_241_C1').is(':checked') || jQuery('#CAPITOL2_R_242_C1').is(':checked') ||
            jQuery('#CAPITOL2_R_243_C1').is(':checked') || jQuery('#CAPITOL3_R_311_C1').is(':checked') ||
            jQuery('#CAPITOL3_R_312_C1').is(':checked') || jQuery('#CAPITOL3_R_313_C1').is(':checked') ||
            jQuery('#CAPITOL3_R_321_C1').is(':checked') || jQuery('#CAPITOL3_R_322_C1').is(':checked') ||
            jQuery('#CAPITOL3_R_323_C1').is(':checked') || jQuery('#CAPITOL3_R_324_C1').is(':checked') ||
            jQuery('#CAPITOL3_R_331_C1').is(':checked') || jQuery('#CAPITOL3_R_332_C1').is(':checked') ||
            jQuery('#CAPITOL3_R_333_C1').is(':checked') || jQuery('#CAPITOL4_R_411_C1').is(':checked') ||
            jQuery('#CAPITOL4_R_412_C1').is(':checked') || jQuery('#CAPITOL5_R_511_C1').is(':checked') ||
            jQuery('#CAPITOL5_R_512_C1').is(':checked') || jQuery('#CAPITOL5_R_513_C1').is(':checked') ||
            jQuery('#CAPITOL5_R_514_C1').is(':checked') || jQuery('#CAPITOL5_R_515_C1').is(':checked') ||
            jQuery('#CAPITOL5_R_516_C1').is(':checked') || jQuery('#CAPITOL5_R_517_C1').is(':checked') ||
            jQuery('#CAPITOL5_R_518_C1').is(':checked') || jQuery('#CAPITOL5_R_519_C1').is(':checked') ||
            jQuery('#CAPITOL5_R_5110_C1').is(':checked') || jQuery('#CAPITOL5_R_531_C1').is(':checked') ||
            jQuery('#CAPITOL5_R_532_C1').is(':checked') || jQuery('#CAPITOL5_R_533_C1').is(':checked') ||
            jQuery('#CAPITOL6_R_611_C1').is(':checked') || jQuery('#CAPITOL6_R_612_C1').is(':checked') ||
            jQuery('#CAPITOL6_R_621_C1').is(':checked') || jQuery('#CAPITOL6_R_621_C2').is(':checked') ||
            jQuery('#CAPITOL6_R_621_C3').is(':checked') || jQuery('#CAPITOL6_R_622_C1').is(':checked') ||
            jQuery('#CAPITOL6_R_622_C2').is(':checked') || jQuery('#CAPITOL6_R_622_C3').is(':checked') ||
            jQuery('#CAPITOL6_R_623_C1').is(':checked') || jQuery('#CAPITOL6_R_623_C2').is(':checked') ||
            jQuery('#CAPITOL6_R_623_C3').is(':checked') || jQuery('#CAPITOL6_R_624_C1').is(':checked') ||
            jQuery('#CAPITOL6_R_624_C2').is(':checked') || jQuery('#CAPITOL6_R_624_C3').is(':checked') ||
            jQuery('#CAPITOL6_R_625_C1').is(':checked') || jQuery('#CAPITOL6_R_625_C2').is(':checked') ||
            jQuery('#CAPITOL6_R_625_C3').is(':checked') || jQuery('#CAPITOL6_R_626_C1').is(':checked') ||
            jQuery('#CAPITOL6_R_626_C2').is(':checked') || jQuery('#CAPITOL6_R_626_C3').is(':checked') ||
            jQuery('#CAPITOL6_R_627_C1').is(':checked') || jQuery('#CAPITOL6_R_627_C2').is(':checked') ||
            jQuery('#CAPITOL6_R_627_C3').is(':checked') || jQuery('#CAPITOL6_R_628_C1').is(':checked') ||
            jQuery('#CAPITOL6_R_628_C2').is(':checked') || jQuery('#CAPITOL6_R_628_C3').is(':checked') ||
            jQuery('#CAPITOL7_R_711_C1').is(':checked') || jQuery('#CAPITOL7_R_712_C1').is(':checked') ||
            jQuery('#CAPITOL7_R_713_C1').is(':checked') || jQuery('#CAPITOL8_R_811_C1').is(':checked') ||
            jQuery('#CAPITOL8_R_812_C1').is(':checked') || jQuery('#CAPITOL8_R_813_C1').is(':checked') ||
            jQuery('#CAPITOL8_R_814_C1').is(':checked')
        )
            &&
            (
                values.CAPITOL9_R92_C31.length < 10 || values.CAPITOL9_R92_C31.length > 380
            ))


    ) {
        webform.errors.push({
            'fieldName': 'CAPITOL9_R92_C31',
            'index': 0,
            'msg': Drupal.t('Cod eroare 48-055: Dacă în rând. 2.1.1, până la 8.1.4 inclusiv, este indicat 1, atunci 9.2 este obligator de completat si vice versa  - Descrierea Inovarii este obligatorei si  trebuie să conțină nu mai putin  10 si nu mai mult de 380 de caractere  si vece versa ')
        });
    }

// End 48-053.1





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