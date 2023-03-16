What do you think about this code in js ? Maybe improving this. 

{
        var R_233 = Number(values.CAPITOL2_R_233_C1);
        var R_234 = Number(values.CAPITOL2_R_234_C1);
        var R_235 = Number(values.CAPITOL2_R_235_C1);
        var R_236 = Number(values.CAPITOL2_R_236_C1);
        var sum_33_36 = R_233 + R_234 + R_235;
    if (sum_33_36  != 100) {
        webform.errors.push({
            'fieldName': 'CAPITOL2_R_236_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-007 Cap.2  Rind 2.3.3 + 2.3.4 + 2.3.5 = 100%,   @sum_33_36 <> 100', { "@sum_33_36": sum_33_36  })
        });
    }

}
