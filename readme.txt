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



In this code  JS, me need add another condition

if CAPITOL1_R114_C1 is blank or replace blank space

    //Start--48-03901
    if ((values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false) &&
        (values.CAPITOL1_R114_C1 !== '1.1.1' && values.CAPITOL1_R114_C1 !== '1.1.2' && values.CAPITOL1_R114_C1 !== '1.1.3' && values.CAPITOL1_R114_C1 !== "")) {
        webform.errors.push({
            'fieldName': 'CAPITOL1_R114_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-03901 Trebuie să indicat din Cap.1.1 numărul rândului 1.1.1 sau 1.1.2 sau 1.1.3')
        });
    }
    //End--48-03901