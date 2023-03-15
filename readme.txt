I want to add to this code - as if 

values.CAPITOL1_R114_C1 !== '' 

then  

text --- 'must be 1.1.1 or 1.1.2 or 1.1.3' 



//Start--48-039
if ((values.CAPITOL1_R114_C1 !== '1.1.1' && values.CAPITOL1_R114_C1 !== '1.1.2' && values.CAPITOL1_R114_C1 !== '1.1.3')
&& (values.CAPITOL1_R111_C1 != false || values.CAPITOL1_R112_C1 != false != values.CAPITOL1_R113_C1 != false) ) {
        webform.errors.push({
            'fieldName': 'CAPITOL1_R114_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-039  nr. rândului poate fi 1.1.1 sau 1.1.2 sau 1.1.3 si nu poate fi @CAPITOL1_R114_C1', { "@CAPITOL1_R114_C1": values.CAPITOL1_R114_C1 })
        });
    }


//End--48-039