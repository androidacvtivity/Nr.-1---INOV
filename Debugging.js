///This code in js in Drupal don't work correctly. Fix that bug and give me correctly code.

//Condition 

// if (
//     (CAPITOL1_R111_C1  is checked or  CAPITOL1_R112_C1 is checked 
//     or CAPITOL1_R113_C1 is checked)  
    
// then(CAPITOL1_R114_C1 == '1.1.1' or CAPITOL1_R114_C1 == '1.1.2'or  CAPITOL1_R114_C1 == '1.1.3' )

//     ) 
//If this condition is not satisfied, show the error message

//Start--48-03901

if ((!values.CAPITOL1_R111_C1 == false || !values.CAPITOL1_R112_C1 !== false || !values.CAPITOL1_R113_C1 == false) &&
    (values.CAPITOL1_R114_C1 !== '1.1.1' && values.CAPITOL1_R114_C1 !== '1.1.2' && values.CAPITOL1_R114_C1 !== '1.1.3')
    && !(values.CAPITOL1_R111_C1 == false && values.CAPITOL1_R112_C1 == false && values.CAPITOL1_R113_C1 == false && values.CAPITOL1_R114_C1 == "")
) {
    webform.errors.push({
        'fieldName': 'CAPITOL1_R114_C1',
        'index': 0,
        'msg': Drupal.t('Cod eroare: 48-03902 Trebuie de indicat din Cap.1.1 numărul rândului 1.1.1 sau 1.1.2 sau 1.1.3')
    });
}
    //End--48-03901

    //Remove blank space left and right from CAPITOL1_R114_C1.



//First Answer  48-03902


if ((values.CAPITOL1_R111_C1 || values.CAPITOL1_R112_C1 || values.CAPITOL1_R113_C1) &&
    !(['1.1.1', '1.1.2', '1.1.3'].includes(values.CAPITOL1_R114_C1.trim()))
) {
    values.CAPITOL1_R114_C1 = values.CAPITOL1_R114_C1.trim(); // removes blank spaces from both sides
    webform.errors.push({
        'fieldName': 'CAPITOL1_R114_C1',
        'index': 0,
        'msg': Drupal.t('Cod eroare: 48-03902 Trebuie de indicat din Cap.1.1 numărul rândului 1.1.1 sau 1.1.2 sau 1.1.3')
    });
}

