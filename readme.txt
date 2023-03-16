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


This code  was  written in JavaScript
What do you think about this code ? May be possible this code rewriter ?  improve the performance of the code

//Start 48-004

    var R_233_C1 = +values.CAPITOL2_R_233_C1;
   
    if (R_233_C1 >= 100) {
        webform.errors.push({
            'fieldName': 'CAPITOL2_R_233_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-004. Cap.2  Rind. 2.3.3 < 100 , @R_233_C1 > 100 ', { "@R_233_C1": R_233_C1})
        
        });
    }


//End 48-004

//Start 48-005

    var R_234_C1 = +values.CAPITOL2_R_234_C1;

    if (R_234_C1 >= 100) {
        webform.errors.push({
            'fieldName': 'CAPITOL2_R_234_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-005. Cap.2  Rind. 2.3.4 < 100 , @R_234_C1 > 100 ', { "@R_234_C1": R_234_C1 })

        });
    }


//End 48-005


//Start 48-005

    var R_235_C1 = +values.CAPITOL2_R_235_C1;

    if (R_235_C1 >= 100) {
        webform.errors.push({
            'fieldName': 'CAPITOL2_R_235_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 48-006. Cap.2  Rind. 2.3.5 < 100 , @R_235_C1 > 100 ', { "@R_235_C1": R_235_C1 })

        });
    }


//End 48-005


//Start 48-004 to 48-006

const fieldsToValidate = [
{
name: 'CAPITOL2_R_233_C1',
label: 'Cap.2 Rind. 2.3.3',
code: '48-004'
},
{
name: 'CAPITOL2_R_234_C1',
label: 'Cap.2 Rind. 2.3.4',
code: '48-005'
},
{
name: 'CAPITOL2_R_235_C1',
label: 'Cap.2 Rind. 2.3.5',
code: '48-006'
}
];

for (const field of fieldsToValidate) {
const value = values[field.name];

if (typeof value === 'undefined') {
continue;
}

const numberValue = +value;

if (numberValue >= 100) {
webform.errors.push({
'fieldName': field.name,
'index': 0,
'msg': Drupal.t(Cod eroare: ${field.code}. ${field.label} < 100 , @${field.name} > 100 , { [@${field.name}]: numberValue })
});
}
}

//End 48-004 to 48-006



What do you think about this code ? 

//Start 48-004 to 48-006

const fieldsToValidate = [
{
name: 'CAPITOL2_R_233_C1',
label: 'Cap.2 Rind. 2.3.3',
code: '48-004'
},
{
name: 'CAPITOL2_R_234_C1',
label: 'Cap.2 Rind. 2.3.4',
code: '48-005'
},
{
name: 'CAPITOL2_R_235_C1',
label: 'Cap.2 Rind. 2.3.5',
code: '48-006'
}
];

for (const field of fieldsToValidate) {
const value = values[field.name];

if (typeof value === 'undefined') {
continue;
}

const numberValue = +value;

if (numberValue >= 100) {
webform.errors.push({
'fieldName': field.name,
'index': 0,
'msg': Drupal.t(Cod eroare: ${field.code}. ${field.label} < 100 , @${field.name} > 100 , { [@${field.name}]: numberValue })
});
}
}

//End 48-004 to 48-006



This code 

// Error codes for Capitol2 Rind2.3.3, 2.3.4, 2.3.5
const ERROR_CODES = {
  "CAPITOL2_R_233_C1": "48-004",
  "CAPITOL2_R_234_C1": "48-005",
  "CAPITOL2_R_235_C1": "48-006"
};

// Validate Capitol2 Rind2.3.3, 2.3.4, 2.3.5
function validateCapitol2(values, webform) {
  for (let key in ERROR_CODES) {
    let value = +values[key];
    if (value >= 100) {
      let rind = key.slice(0, -3).replace(/_/g, '.'); // get the Rind number from the key and replace _ with .
      let line = key.slice(-3); // get the line number from the key
      webform.errors.push({
        'fieldName': key,
        'index': 0,
        'msg': Drupal.t(`Cod eroare: ${ERROR_CODES[key]}. Rind ${rind} < 100 , @${key} > 100`, { [`@${key}`]: value })
      });
    }
  }
}

// Call validateCapitol2 function with values and webform object
validateCapitol2(values, webform);



Now show 

Capitol 2. Rind 2.3.3 - Cod eroare: 48-004. Rind CAPITOL2.R.233 < 100 , 456 > 100
Capitol 2. Rind 2.3.4 - Cod eroare: 48-005. Rind CAPITOL2.R.234 < 100 , 888 > 100
Capitol 2. Rind 2.3.5 - Cod eroare: 48-006. Rind CAPITOL2.R.235 < 100 , 888 > 100


But must show


Capitol 2. Rind 2.3.3 - Cod eroare: 48-004. Capitol 2. Rind 2.3.3  < 100 , 456 > 100
Capitol 2. Rind 2.3.4 - Cod eroare: 48-005. Capitol 2. Rind 2.3.4  < 100 , 888 > 100
Capitol 2. Rind 2.3.5 - Cod eroare: 48-006. Capitol 2. Rind 2.3.5  < 100 , 888 > 100



var R_233 = number(values.CAPITOL2_R_233_C1);
    var R_234 = number(values.CAPITOL2_R_234_C1);
    var R_235 = number(values.CAPITOL2_R_235_C1);
    var R_236 = number(values.CAPITOL2_R_236_C1);
    var sum_33_36 = R_233 + R_234 + R_235;
    if (sum_33_36  != 100) {
        webform.errors.push({
            'fieldName': 'CAPITOL2_R_236_C1',
            'index': 0,
          //  'msg': Drupal.t('Cod eroare: 71-001.65. Rind.141 > Rind 120 (dar trebuie sa fie <=)')

            'msg': Drupal.t('Cod eroare: 48-007 Cap.2  Rind 2.3.3 + 2.3.4 + 2.3.5 = 100%,   @sum_33_36 <> 100', { "@sum_33_36": sum_33_36  })
        });
    }