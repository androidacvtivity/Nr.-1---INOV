
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