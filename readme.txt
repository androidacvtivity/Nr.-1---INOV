
That is  condition  - 


If is CAPITOL2_R_211_C2 is checked 
when 

(
    CAPITOL2_R_221_C2 is checked OR 

    CAPITOL2_R_222_C2  is checked OR

    CAPITOL2_R_223_C2  is checked OR

    CAPITOL2_R_224_C2  is checked OR
)



//Start 48-043

   if (jQuery('#CAPITOL2_R_211_C2').is(':checked') &&
        (!jQuery('#CAPITOL2_R_221_C2').is(':checked') ||
            !jQuery('#CAPITOL2_R_222_C2').is(':checked') ||
            !jQuery('#CAPITOL2_R_223_C2').is(':checked') ||
            !jQuery('#CAPITOL2_R_224_C2').is(':checked'))) {
       
                if (!jQuery('#CAPITOL2_R_221_C2').is(':checked')) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_221_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-043. Rindul 2.2.1 nu este bifat.')
            });
        }
        if (!jQuery('#CAPITOL2_R_222_C2').is(':checked')) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_222_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-043. Rindul 2.2.2 nu este bifat.')
            });
        }


        if (!jQuery('#CAPITOL2_R_223_C2').is(':checked')) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_223_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-043. Rindul 2.2.3 nu este bifat.')
            });
        }

        if (!jQuery('#CAPITOL2_R_224_C2').is(':checked')) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R_224_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 48-043. Rindul 2.2.4 nu este bifat.')
            });
        }


      }

    //End 48-043

but this code in js not work correctly


it is code js on drupal 

if ((R_233 <= 100 || R_234 <= 100)
    
        && !(
            
        jQuery('#CAPITOL5_R_515_C1').is(':checked') || jQuery('#CAPITOL5_R_516_C1').is(':checked')
        || jQuery('#CAPITOL5_R_517_C1').is(':checked') || jQuery('#CAPITOL5_R_518_C1').is(':checked')
        || jQuery('#CAPITOL5_R_519_C1').is(':checked') || jQuery('#CAPITOL5_R_5110_C1').is(':checked')
        
        )
    
    ) {


        webform.errors.push({
            'fieldName': 'CAPITOL2_R_236_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-046 Cap.2 Dacă Rind. 2.3.3 si/sau 2.3.4 <=100,  atunci Rind. 5.1.5 - 5.1.10 - da,   @R_233 <= 100,  @R_234 <= 100', { "@R_233": value.R_233, "@R_233": value.R_234 })
        });



    }


    is error in suntacs


I have this  error in js in Drupal -- 

Uncaught ReferenceError: value is not defined

if ((R_233 <= 100 || R_234 <= 100)
    
        && !(
            
        jQuery('#CAPITOL5_R_515_C1').is(':checked') || jQuery('#CAPITOL5_R_516_C1').is(':checked')
        || jQuery('#CAPITOL5_R_517_C1').is(':checked') || jQuery('#CAPITOL5_R_518_C1').is(':checked')
        || jQuery('#CAPITOL5_R_519_C1').is(':checked') || jQuery('#CAPITOL5_R_5110_C1').is(':checked')
        
        )
    
    ) {


        webform.errors.push({
            'fieldName': 'CAPITOL2_R_236_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-046 Cap.2 Dacă Rind. 2.3.3 si/sau 2.3.4 <=100, atunci Rind. 5.1.5 - 5.1.10 - da, @R_233 <= 100, @R_234 <= 100', { "@R_233": value.R_233, "@R_234": value.R_234 })

            
        });



    }