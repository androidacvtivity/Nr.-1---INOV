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

                "CAPITOL6_R_611_C1": ["CAPITOL6_R_612_C1"],
                "CAPITOL6_R_612_C1": ["CAPITOL6_R_611_C1"],


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

// Start 6.1.2 Nu - (Dacă ați bifat ”Nu” treceți la întrebarea 7.1.1)

                if (
                    jQuery('#CAPITOL6_R_612_C1').is(':checked') &&  !jQuery('#CAPITOL6_R_611_C1').is(':checked')    
                       

                ) {
                    jQuery('#CAPITOL6_2_1').hide();
                    jQuery('#CAPITOL6_2_2').hide();
                    jQuery('#CAPITOL6_2_3').hide();
                    jQuery('#CAPITOL6_R_621').hide();
                    jQuery('#CAPITOL6_R_622').hide();
                    jQuery('#CAPITOL6_R_623').hide();
                    jQuery('#CAPITOL6_R_624').hide();
                    jQuery('#CAPITOL6_R_625').hide();
                    jQuery('#CAPITOL6_R_626').hide();
                    jQuery('#CAPITOL6_R_627').hide();
                    jQuery('#CAPITOL6_R_628').hide();

                    jQuery('#CAPITOL6_R_621_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_621_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_621_C3').attr("checked", false);
                  
                    jQuery('#CAPITOL6_R_622_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_622_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_622_C3').attr("checked", false);

                    jQuery('#CAPITOL6_R_623_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_623_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_623_C3').attr("checked", false);

                    jQuery('#CAPITOL6_R_624_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_624_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_624_C3').attr("checked", false);


                    jQuery('#CAPITOL6_R_625_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_625_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_625_C3').attr("checked", false);

                    jQuery('#CAPITOL6_R_626_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_626_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_626_C3').attr("checked", false);

                    jQuery('#CAPITOL6_R_627_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_627_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_627_C3').attr("checked", false);

                    jQuery('#CAPITOL6_R_628_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_628_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_628_C3').attr("checked", false);




                }


                else if (
                    !jQuery('#CAPITOL6_R_612_C1').is(':checked') && jQuery('#CAPITOL6_R_611_C1').is(':checked')    
                
                ) {

                    jQuery('#CAPITOL6_2_1').show();
                    jQuery('#CAPITOL6_2_2').show();
                    jQuery('#CAPITOL6_2_3').show();
                    jQuery('#CAPITOL6_R_621').show();
                    jQuery('#CAPITOL6_R_622').show();
                    jQuery('#CAPITOL6_R_623').show();
                    jQuery('#CAPITOL6_R_624').show();
                    jQuery('#CAPITOL6_R_625').show();
                    jQuery('#CAPITOL6_R_626').show();
                    jQuery('#CAPITOL6_R_627').show();
                    jQuery('#CAPITOL6_R_628').show();

                   

                }

// End 6.1.2 Nu - (Dacă ați bifat ”Nu” treceți la întrebarea 7.1.1)




                if (
                    
                    //group == "CAPITOL3_R_311_C2"
                    (
                        jQuery('#CAPITOL3_R_313_C2').is(':checked') && jQuery('#CAPITOL3_R_311_C2').is(':checked') && jQuery('#CAPITOL3_R_312_C2').is(':checked'))
                        
                        )   {
                    jQuery('#CAPITOL3_R_32').hide();
                    jQuery('#CAPITOL3_R_321').hide();
                    jQuery('#CAPITOL3_R_322').hide();
                    jQuery('#CAPITOL3_R_323').hide();
                    jQuery('#CAPITOL3_R_324').hide();
                    jQuery('#CAPITOL3_R_33').hide();
                    jQuery('#CAPITOL3_R_331').hide();
                    jQuery('#CAPITOL3_R_332').hide();
                    jQuery('#CAPITOL3_R_333').hide();
                    
                    jQuery('#CAPITOL3_R_321_C1').attr("checked", false); 
                    jQuery('#CAPITOL3_R_321_C2').attr("checked", false); 
                    jQuery('#CAPITOL3_R_322_C1').attr("checked", false);
                    jQuery('#CAPITOL3_R_322_C2').attr("checked", false); 
                    jQuery('#CAPITOL3_R_323_C1').attr("checked", false);
                    jQuery('#CAPITOL3_R_323_C2').attr("checked", false); 
                    jQuery('#CAPITOL3_R_324_C1').attr("checked", false);
                    jQuery('#CAPITOL3_R_324_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R_331_C1').attr("checked", false); 
                    jQuery('#CAPITOL3_R_332_C1').attr("checked", false); 
                    jQuery('#CAPITOL3_R_333_C1').attr("checked", false); 
                   
                   
                }


                else if ((!jQuery('#CAPITOL3_R_313_C2').is(':checked') || !jQuery('#CAPITOL3_R_311_C2').is(':checked') || !jQuery('#CAPITOL3_R_312_C2').is(':checked'))) {
                    jQuery('#CAPITOL3_R_32').show();
                    jQuery('#CAPITOL3_R_321').show();
                    jQuery('#CAPITOL3_R_322').show();
                    jQuery('#CAPITOL3_R_323').show();
                    jQuery('#CAPITOL3_R_324').show();
                    jQuery('#CAPITOL3_R_33').show();
                    jQuery('#CAPITOL3_R_331').show();
                    jQuery('#CAPITOL3_R_332').show();
                    jQuery('#CAPITOL3_R_333').show();
                   
                }



                if (

                    jQuery('#CAPITOL2_R_211_C2').is(':checked') && jQuery('#CAPITOL2_R_212_C2').is(':checked')
                    
                    )
                    {
                    jQuery('#CAPITOL2_R_22_1').hide();
                    jQuery('#CAPITOL2_R_22_2').hide();
                    jQuery('#CAPITOL2_R_22_3').hide();

                    jQuery('#CAPITOL2_R_221').hide();
                    jQuery('#CAPITOL2_R_222').hide();
                    jQuery('#CAPITOL2_R_223').hide();

                    jQuery('#CAPITOL2_R_224').hide();
                    jQuery('#CAPITOL2_R_23').hide();
                    jQuery('#CAPITOL2_R_23_1').hide();

                    jQuery('#CAPITOL2_R_231').hide();
                    jQuery('#CAPITOL2_R_232').hide();
                    jQuery('#CAPITOL2_R_232_1').hide();

                    jQuery('#CAPITOL2_R_233').hide();
                    jQuery('#CAPITOL2_R_234').hide();
                    jQuery('#CAPITOL2_R_235').hide();

                    jQuery('#CAPITOL2_R_236').hide();
                    jQuery('#CAPITOL2_R_24').hide();
                    jQuery('#CAPITOL2_R_24_1').hide();
                    jQuery('#CAPITOL2_R_241').hide();

                    jQuery('#CAPITOL2_R_242').hide();
                    jQuery('#CAPITOL2_R_243').hide();
      
                    jQuery('#CAPITOL2_R_221_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_221_C2').attr("checked", false);
      
                    jQuery('#CAPITOL2_R_222_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_222_C2').attr("checked", false);

                    jQuery('#CAPITOL2_R_223_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_223_C2').attr("checked", false);

                    jQuery('#CAPITOL2_R_224_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_224_C2').attr("checked", false);

                    jQuery('#CAPITOL2_R_231_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_231_C2').attr("checked", false);

                    jQuery('#CAPITOL2_R_232_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_232_C2').attr("checked", false);

                    document.getElementById("CAPITOL2_R_233_C1").value = "";
                    document.getElementById("CAPITOL2_R_234_C1").value = "";
                    document.getElementById("CAPITOL2_R_235_C1").value = "";
                    document.getElementById("CAPITOL2_R_236_C1").value = "";

                    jQuery('#CAPITOL2_R_241_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_241_C2').attr("checked", false);
                    jQuery('#CAPITOL2_R_241_C3').attr("checked", false);

                    jQuery('#CAPITOL2_R_242_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_242_C2').attr("checked", false);
                    jQuery('#CAPITOL2_R_242_C3').attr("checked", false);

                    jQuery('#CAPITOL2_R_243_C1').attr("checked", false);
                    jQuery('#CAPITOL2_R_243_C2').attr("checked", false);
                    jQuery('#CAPITOL2_R_243_C3').attr("checked", false);

                  

                }


                else if (
                    !jQuery('#CAPITOL2_R_211_C2').is(':checked') || !jQuery('#CAPITOL2_R_212_C2').is(':checked'))
                    
                     
                    {
                    jQuery('#CAPITOL2_R_22_1').show();
                    jQuery('#CAPITOL2_R_22_2').show();
                    jQuery('#CAPITOL2_R_22_3').show();
                    jQuery('#CAPITOL2_R_221').show();
                    jQuery('#CAPITOL2_R_222').show();
                    jQuery('#CAPITOL2_R_223').show();
                    jQuery('#CAPITOL2_R_224').show();
                    jQuery('#CAPITOL2_R_23').show();
                    jQuery('#CAPITOL2_R_23_1').show();
                    jQuery('#CAPITOL2_R_231').show();
                    jQuery('#CAPITOL2_R_232').show();
                    jQuery('#CAPITOL2_R_232_1').show();
                    jQuery('#CAPITOL2_R_233').show();
                    jQuery('#CAPITOL2_R_234').show();
                    jQuery('#CAPITOL2_R_235').show();
                    jQuery('#CAPITOL2_R_236').show();
                    jQuery('#CAPITOL2_R_24').show();
                    jQuery('#CAPITOL2_R_24_1').show();
                    jQuery('#CAPITOL2_R_241').show();
                    jQuery('#CAPITOL2_R_242').show();
                    jQuery('#CAPITOL2_R_243').show();

                }


                //Add Dacă întreprinderea nu a avut inovări de produs și proces sau activitate inovativă în perioada 2021-2022 
                //(s-a răspuns ”Nu” la întrebările 2.1, 3.1 și 4.1 ) treceți la capitolul 7. Altfel, continuați cu capitolul 5.

                if (

                    (jQuery('#CAPITOL4_R_411_C2').is(':checked') && jQuery('#CAPITOL4_R_412_C2').is(':checked'))
                    &&
                    (jQuery('#CAPITOL2_R_211_C2').is(':checked') && jQuery('#CAPITOL2_R_212_C2').is(':checked'))
                    &&
                    (jQuery('#CAPITOL3_R_313_C2').is(':checked') && jQuery('#CAPITOL3_R_311_C2').is(':checked') && jQuery('#CAPITOL3_R_312_C2').is(':checked'))   
                    
                    ) 
                    
                    {
                    jQuery('#CAPITOL5_HEADER').hide();
                    jQuery('#CAPITOL5_HEADER_1').hide();
                   
                    jQuery('#CAPITOL5').hide();
                    jQuery('#CAPITOL5_51').hide();
                    jQuery('#CAPITOL5_R_511').hide();
                    jQuery('#CAPITOL5_R_511_1').hide();

                    jQuery('#CAPITOL5_R_512').hide();
                    jQuery('#CAPITOL5_R_513').hide();
                    jQuery('#CAPITOL5_R_514').hide();

                    jQuery('#CAPITOL5_R_515').hide();
                    jQuery('#CAPITOL5_R_516').hide();
                    jQuery('#CAPITOL5_R_517').hide();

                    jQuery('#CAPITOL5_R_518').hide();
                    jQuery('#CAPITOL5_R_519').hide();
                    jQuery('#CAPITOL5_R_5110').hide();

                    jQuery('#CAPITOL5_1').hide();
                    jQuery('#CAPITOL5_1_1').hide();
                    jQuery('#CAPITOL5_R_521').hide();
                    jQuery('#CAPITOL5_R_522').hide();

                    jQuery('#CAPITOL5_R_523').hide();
                    jQuery('#CAPITOL5_R_524').hide();
                    
                    
                    //Add 

                    jQuery('#CAPITOL5_R_525').hide();
                    jQuery('#CAPITOL5_R_526').hide();
                    jQuery('#CAPITOL5_2').hide();
                    jQuery('#CAPITOL5_2_1').hide();

                    jQuery('#CAPITOL5_2_2').hide();
                    jQuery('#CAPITOL5_R_531').hide();

                    jQuery('#CAPITOL5_R_532').hide();
                    jQuery('#CAPITOL5_R_533').hide();

                    //Add cap 6 
                    jQuery('#CAPITOL6_HEADER').hide();
                    jQuery('#CAPITOL6').hide();
                    jQuery('#CAPITOL6_1').hide();
                    jQuery('#CAPITOL6_R_611').hide();

                    jQuery('#CAPITOL6_R_612').hide();
                    jQuery('#CAPITOL6_2').hide();

                    jQuery('#CAPITOL6_2_1').hide();
                    jQuery('#CAPITOL6_2_2').hide();

                    //Adde next 
                    jQuery('#CAPITOL6_2_3').hide();
                    jQuery('#CAPITOL6_R_621').hide();
                    jQuery('#CAPITOL6_R_622').hide();
                    jQuery('#CAPITOL6_R_623').hide();

                    jQuery('#CAPITOL6_R_624').hide();
                    jQuery('#CAPITOL6_R_625').hide();

                    jQuery('#CAPITOL6_R_625').hide();
                    jQuery('#CAPITOL6_R_626').hide();


                    jQuery('#CAPITOL6_R_627').hide();
                    jQuery('#CAPITOL6_R_628').hide();




                    jQuery('#CAPITOL5_R_511_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_511_C2').attr("checked", false);

                    jQuery('#CAPITOL5_R_512_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_512_C2').attr("checked", false);

                    jQuery('#CAPITOL5_R_513_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_513_C2').attr("checked", false);


                    jQuery('#CAPITOL5_R_514_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_514_C2').attr("checked", false);

                    jQuery('#CAPITOL5_R_515_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_515_C2').attr("checked", false);

                    jQuery('#CAPITOL5_R_516_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_516_C2').attr("checked", false);

                    jQuery('#CAPITOL5_R_517_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_517_C2').attr("checked", false);    

                    jQuery('#CAPITOL5_R_518_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_518_C2').attr("checked", false);   
                   

                    jQuery('#CAPITOL5_R_519_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_519_C2').attr("checked", false);   

                    jQuery('#CAPITOL5_R_5110_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_5110_C2').attr("checked", false);   
                 
                    jQuery('#CAPITOL5_R_521_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_521_C2').attr("checked", false);   

                    jQuery('#CAPITOL5_R_522_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_522_C2').attr("checked", false);   


                    jQuery('#CAPITOL5_R_523_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_523_C2').attr("checked", false);   

                    jQuery('#CAPITOL5_R_524_C1').attr("checked", false);
                    jQuery('#CAPITOL5_R_524_C2').attr("checked", false);   


                    jQuery('#CAPITOL6_R_611_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_612_C1').attr("checked", false);   

                    jQuery('#CAPITOL6_R_621_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_621_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_621_C3').attr("checked", false);

                    jQuery('#CAPITOL6_R_622_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_622_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_622_C3').attr("checked", false);

                    jQuery('#CAPITOL6_R_623_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_623_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_623_C3').attr("checked", false);


                    jQuery('#CAPITOL6_R_624_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_624_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_624_C3').attr("checked", false);

                    jQuery('#CAPITOL6_R_625_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_625_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_625_C3').attr("checked", false);


                    jQuery('#CAPITOL6_R_626_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_626_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_626_C3').attr("checked", false);


                    jQuery('#CAPITOL6_R_627_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_627_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_627_C3').attr("checked", false);

                    jQuery('#CAPITOL6_R_628_C1').attr("checked", false);
                    jQuery('#CAPITOL6_R_628_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R_628_C3').attr("checked", false);




                }


                else 
                

                    if (

                        (!jQuery('#CAPITOL4_R_411_C2').is(':checked') || !jQuery('#CAPITOL4_R_412_C2').is(':checked'))
                        &&
                        (jQuery('#CAPITOL2_R_211_C2').is(':checked') && jQuery('#CAPITOL2_R_212_C2').is(':checked'))
                        &&
                        (jQuery('#CAPITOL3_R_313_C2').is(':checked') && jQuery('#CAPITOL3_R_311_C2').is(':checked') && jQuery('#CAPITOL3_R_312_C2').is(':checked'))

                    ) 
                    
                    
                    
                    {

                        jQuery('#CAPITOL5_HEADER').show();
                        jQuery('#CAPITOL5_HEADER_1').show();


                        jQuery('#CAPITOL5').show();
                        jQuery('#CAPITOL5_51').show();
                        jQuery('#CAPITOL5_R_511').show();
                        jQuery('#CAPITOL5_R_511_1').show();

                        jQuery('#CAPITOL5_R_512').show();
                        jQuery('#CAPITOL5_R_513').show();
                        jQuery('#CAPITOL5_R_514').show();

                        jQuery('#CAPITOL5_R_515').show();
                        jQuery('#CAPITOL5_R_516').show();
                        jQuery('#CAPITOL5_R_517').show();

                        jQuery('#CAPITOL5_R_518').show();
                        jQuery('#CAPITOL5_R_519').show();
                        jQuery('#CAPITOL5_R_5110').show();

                        jQuery('#CAPITOL5_1').show();
                        jQuery('#CAPITOL5_1_1').show();
                        jQuery('#CAPITOL5_R_521').show();
                        jQuery('#CAPITOL5_R_522').show();

                        jQuery('#CAPITOL5_R_523').show();
                        jQuery('#CAPITOL5_R_524').show();


                        //Add 

                        jQuery('#CAPITOL5_R_525').show();
                        jQuery('#CAPITOL5_R_526').show();
                        jQuery('#CAPITOL5_2').show();
                        jQuery('#CAPITOL5_2_1').show();

                        jQuery('#CAPITOL5_2_2').show();
                        jQuery('#CAPITOL5_R_531').show();

                        jQuery('#CAPITOL5_R_532').show();
                        jQuery('#CAPITOL5_R_533').show();


                        //Add cap 6 
                        jQuery('#CAPITOL6_HEADER').show();
                        jQuery('#CAPITOL6').show();
                        jQuery('#CAPITOL6_1').show();
                        jQuery('#CAPITOL6_R_611').show();

                        jQuery('#CAPITOL6_R_612').show();
                        jQuery('#CAPITOL6_2').show();

                        jQuery('#CAPITOL6_2_1').show();
                        jQuery('#CAPITOL6_2_2').show();

                        //Adde next 
                        jQuery('#CAPITOL6_2_3').show();
                        jQuery('#CAPITOL6_R_621').show();
                        jQuery('#CAPITOL6_R_622').show();
                        jQuery('#CAPITOL6_R_623').show();

                        jQuery('#CAPITOL6_R_624').show();
                        jQuery('#CAPITOL6_R_625').show();

                        jQuery('#CAPITOL6_R_625').show();
                        jQuery('#CAPITOL6_R_626').show();


                        jQuery('#CAPITOL6_R_627').show();
                        jQuery('#CAPITOL6_R_628').show();

                    
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


  //Start--48-03901

    if ((values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false) &&
        (values.CAPITOL1_R114_C1.trim() && (values.CAPITOL1_R114_C1 !== '1.1.1' && values.CAPITOL1_R114_C1 !== '1.1.2' && values.CAPITOL1_R114_C1 !== '1.1.3' && values.CAPITOL1_R114_C1 !== ""))) {
        webform.errors.push({
            'fieldName': 'CAPITOL1_R114_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-03901 Trebuie de indicat din Cap.1.1 numărul rândului 1.1.1 sau 1.1.2 sau 1.1.3')
        });
    }
    //End--48-03901


    //Start--48-03901

    if ((!values.CAPITOL1_R111_C1 == false  || !values.CAPITOL1_R112_C1 !== false || !values.CAPITOL1_R113_C1 == false) &&
        (values.CAPITOL1_R114_C1 !== '1.1.1' && values.CAPITOL1_R114_C1 !== '1.1.2' && values.CAPITOL1_R114_C1 !== '1.1.3')
            && !(values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 ==  false && values.CAPITOL1_R114_C1 == "")
        ) {
        webform.errors.push({
            'fieldName': 'CAPITOL1_R114_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-03902 Trebuie de indicat din Cap.1.1 numărul rândului 1.1.1 sau 1.1.2 sau 1.1.3')
        });
    }
    //End--48-03901




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

//Start 48-040

    if ( (!(jQuery('#CAPITOL2_R_211_C1').is(':checked') || jQuery('#CAPITOL2_R_211_C2').is(':checked')))

        && (values.CAPITOL1_R114_C1 == '1.1.1' || values.CAPITOL1_R114_C1 == '1.1.2' || values.CAPITOL1_R114_C1 == '1.1.3')
    ) {
        webform.errors.push({
            'fieldName': 'CAPITOL2_R_211_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-040. Cap.2 Rind. 2.1.1  trebuie sa fie bifat obligatoriu')
        });
    }

    //End 48-040


    //Start 48-0401

    if ((!(jQuery('#CAPITOL2_R_212_C1').is(':checked') || jQuery('#CAPITOL2_R_212_C2').is(':checked')))

        && (values.CAPITOL1_R114_C1 == '1.1.1' || values.CAPITOL1_R114_C1 == '1.1.2' || values.CAPITOL1_R114_C1 == '1.1.3')
    ) {
        webform.errors.push({
            'fieldName': 'CAPITOL2_R_212_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-0401. Cap.2 Rind. 2.1.2  trebuie sa fie bifat obligatoriu')
        });
    }

    //End 48-0401


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
            || jQuery('#CAPITOL2_R_223_C1').is(':checked')) && (sum_33_36 != 100 && sum_33_36 != 0)



    ) {

      
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_236_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare 48-048: Dacă rd.2.1.1, 2.1.2, 2.2.1, 2.2.2, 2.2.3 sunt bifate , atunci rd.2.3.3 + 2.3.4 + 2.3.5 = 100%.')
            });
     
           }

//End 48-048


 //Start 46-046


    if (((R_233 <= 100 && R_233 != 0) || (R_234 <= 100 && R_234 != 0)) && 
        
        (!jQuery('#CAPITOL5_R_515_C1').is(':checked')
        || !jQuery('#CAPITOL5_R_516_C1').is(':checked')
        || !jQuery('#CAPITOL5_R_517_C1').is(':checked')
        || !jQuery('#CAPITOL5_R_518_C1').is(':checked')
        || !jQuery('#CAPITOL5_R_519_C1').is(':checked')
        || !jQuery('#CAPITOL5_R_5110_C1').is(':checked')
        )) {



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