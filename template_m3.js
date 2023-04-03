
//----------------------------------------------------------------------------------
if (toFloat(values.CAPV_R3_1_1_C1) > toFloat(values.CAPV_R3_1_C1)) {
    webform.errors.push({
        'fieldName': 'CAPV_R3_1_1_C1',
        'index': 0,
        'weight': 94,
        'options': {
            'hide_title': true
        },
        'msg': Drupal.t('Cod eroare: 03-094 - CAP.V: Rândul 3.1.1<= Rândul 3.1')
    });
}

//----------------------------------------------------------------------------


//What is wrong in this code ?


var result03031 = toFloat(toFloat(values.CAPV_R6_C1) + toFloat(values.CAPV_R7_C1) + toFloat(values.CAPV_R8_C1) + toFloat(values.CAPV_R9_C1) + toFloat(values.CAPV_R10_C1)).toFixed(1);
        if (values.CAPV_R5_C1 < result03031) {
            webform.errors.push({
                'fieldName': 'CAPV_R5_C1',
                'index': 0,
                'weight': 31,
                'options': {
                    'hide_title': true
                },
                'msg': Drupal.t('Cod eroare: 03-031 - Cap V, Rând 5 >= Rând 6+ Rând 7+Rând 8+Rând 9 + Rând 10')
            });
        }







//This is condition        
 //  1. (['1.1.1', '1.1.2', '1.1.3'].includes(values.CAPITOL1_R114_C1)   1 Condition it is obligatory Must be one or two or three
    //  2. CAPITOL2_R_211_C1 checked or  CAPITOL2_R_211_C2 checked if none is selected to show ms. error
    //  3. CAPITOL2_R_212_C1 checked or  CAPITOL2_R_212_C2 checked if none is selected to show ms. error
   // And finally, if one of the three conditions is not true, show it ms. erro
   // are 1 condition must be 2 and 3 condition

//Why  this js code wrong


//Start 48-040

if ((
    !(jQuery('#CAPITOL2_R_211_C1').is(':checked') || jQuery('#CAPITOL2_R_211_C2').is(':checked'))
    &&
    !(jQuery('#CAPITOL2_R_212_C1').is(':checked') || jQuery('#CAPITOL2_R_212_C2').is(':checked'))

)
    && (['1.1.1', '1.1.2', '1.1.3'].includes(values.CAPITOL1_R114_C1))
) {
    webform.errors.push({
        'fieldName': 'CAPITOL2_R_211_C1',
        'index': 0,
        'msg': Drupal.t('Cod eroare: 48-040. Cap.2 Rind. 2.1.1 si Rind. 2.1.2 trebuie sa fie bifat obligatoriu')
    });
}

    //End 48-040
