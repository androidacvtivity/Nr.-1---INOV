What do you think about this code ? Can this code be rewritten better ?

     jQuery('input[type=checkbox]').change(function () {

                var group = jQuery(this).attr('name');


                if (group == "CAPITOL2_R_211_C1") {
                    jQuery('#CAPITOL2_R_211_C2').attr("checked", false);
                } else if (group == "CAPITOL2_R_211_C2") {
                    jQuery('#CAPITOL2_R_211_C1').attr("checked", false);
                }

                else if (group == "CAPITOL2_R_212_C1") {
                    jQuery('#CAPITOL2_R_212_C2').attr("checked", false);
                } else if (group == "CAPITOL2_R_212_C2") {
                    jQuery('#CAPITOL2_R_212_C1').attr("checked", false);
                }



                if (group == "CAPITOL2_R_231_C1") {
                    jQuery('#CAPITOL2_R_231_C2').attr("checked", false);
                } else if (group == "CAPITOL2_R_231_C2") {
                    jQuery('#CAPITOL2_R_231_C1').attr("checked", false);
                }

                if (group == "CAPITOL2_R_232_C1") {
                    jQuery('#CAPITOL2_R_232_C2').attr("checked", false);
                } else if (group == "CAPITOL2_R_232_C2") {
                    jQuery('#CAPITOL2_R_232_C1').attr("checked", false);
                }



                if (group == "CAPITOL2_R_241_C1") {
                    jQuery('#CAPITOL2_R_241_C2').attr("checked", false);
                    jQuery('#CAPITOL2_R_241_C3').attr("checked", false);
                } else if (group == "CAPITOL2_R_241_C2") {
                    jQuery('#CAPITOL2_R_241_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_241_C3').attr("checked", false);
                } else if (group == "CAPITOL2_R_241_C3") {
                    jQuery('#CAPITOL2_R_241_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_241_C2').attr("checked", false);
                }


                if (group == "CAPITOL2_R_242_C1") {
                    jQuery('#CAPITOL2_R_242_C2').attr("checked", false);
                    jQuery('#CAPITOL2_R_242_C3').attr("checked", false);
                } else if (group == "CAPITOL2_R_242_C2") {
                    jQuery('#CAPITOL2_R_242_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_242_C3').attr("checked", false);
                } else if (group == "CAPITOL2_R_242_C3") {
                    jQuery('#CAPITOL2_R_242_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_242_C2').attr("checked", false);
                }


                if (group == "CAPITOL2_R_243_C1") {
                    jQuery('#CAPITOL2_R_243_C2').attr("checked", false);
                    jQuery('#CAPITOL2_R_243_C3').attr("checked", false);
                } else if (group == "CAPITOL2_R_243_C2") {
                    jQuery('#CAPITOL2_R_243_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_243_C3').attr("checked", false);
                } else if (group == "CAPITOL2_R_243_C3") {
                    jQuery('#CAPITOL2_R_243_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_243_C2').attr("checked", false);
                }



                if (group == "CAPITOL3_R_311_C1") {
                    jQuery('#CAPITOL3_R_311_C2').attr("checked", false);
                } else if (group == "CAPITOL3_R_311_C2") {
                    jQuery('#CAPITOL3_R_311_C1').attr("checked", false);
                }


                if (group == "CAPITOL3_R_312_C1") {
                    jQuery('#CAPITOL3_R_312_C2').attr("checked", false);
                } else if (group == "CAPITOL3_R_312_C2") {
                    jQuery('#CAPITOL3_R_312_C1').attr("checked", false);
                }

                if (group == "CAPITOL3_R_313_C1") {
                    jQuery('#CAPITOL3_R_313_C2').attr("checked", false);
                } else if (group == "CAPITOL3_R_313_C2") {
                    jQuery('#CAPITOL3_R_313_C1').attr("checked", false);
                }









            });
