

CAPV_R5_C1 = 202.1
and result03031 = 63.1



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