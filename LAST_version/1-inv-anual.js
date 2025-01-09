(function ($) {

    Drupal.behaviors.inv1_anual = {
        attach: function (context, settings) {
            if (!Drupal.settings.mywebform.preview) {
                jQuery('table').on('keypress', 'input.numeric, input.float', function (event) {
                    var allowNegative = jQuery(this).attr('allow-negative') || false;
                    if (isNumberPressed(this, event, allowNegative) === false) {
                        event.preventDefault();
                    }
                });
            }
        }
    }

    webform.validators.inv1_anual = function () {
        var values = Drupal.settings.mywebform.values,
            t, i, x, k;

        var isSpecificCfp = ['24', '26', '28'].indexOf(values.dec_fiscCod_cfp) !== -1;

        var t010_grid_c6 = {};
        for (i = 0; i < values.dec_dinamicTable1_row_c6.length; i++) {
            if (values.dec_dinamicTable1_row_cb[i]) {
                t010_grid_c6[values.dec_dinamicTable1_row_cb[i]] = values.dec_dinamicTable1_row_c6[i];
            }
        }

        var isGridTablesFilled = {
            't1': false,
            't2': false,
            't3': false,
            't4': false,
            't5': false,
            't6': false,
            't7': false,
            't8': false,
            't9': false,
            't10': false,
            't11': false,
        };
        var isGridOtherFieldsFilled = JSON.parse(JSON.stringify(isGridTablesFilled));

        for (t = 1; t <= 11; t++) {
            var gridName = 'dinamicTable' + t;
            var field_prefix = 'dec_' + gridName;

            var cb_field = field_prefix + '_row_cb';
            var cc_field = field_prefix + '_row_cc';
            var c1_field = field_prefix + '_row_c1';
            var c2_field = field_prefix + '_row_c2';
            var c3_field = field_prefix + '_row_c3';
            var c4_field = field_prefix + '_row_c4';
            var c5_field = field_prefix + '_row_c5';
            var c6_field = field_prefix + '_row_c6';

            for (i = 0; i < values[cb_field].length; i++) {
                var some_field_is_filled = values[c1_field][i] != '' || values[c2_field][i] != '' || values[c3_field][i] != '' || values[c5_field][i] != '';
                if (values.hasOwnProperty(c4_field)) {
                    some_field_is_filled = some_field_is_filled || values[c4_field][i] != '';
                }

                if (some_field_is_filled || values[cc_field][i]) {
                    isGridTablesFilled['t' + t] = true;
                }

                if (some_field_is_filled) {
                    isGridOtherFieldsFilled['t' + t] = true;
                }
            }
        }

        for (t = 1; t <= 11; t++) {
            var gridName = 'dinamicTable' + t;
            var field_prefix = 'dec_' + gridName;
            var table_num = '0' + t + '0';

            if (t == 10) {
                table_num = '130';
            } else if (t == 11) {
                table_num = '140';
            }

            var static_field_prefix = 'dec_table' + t + '_row_r' + table_num;

            var cb_field = field_prefix + '_row_cb';
            var cc_field = field_prefix + '_row_cc';
            var c1_field = field_prefix + '_row_c1';
            var c2_field = field_prefix + '_row_c2';
            var c3_field = field_prefix + '_row_c3';
            var c4_field = field_prefix + '_row_c4';
            var c5_field = field_prefix + '_row_c5';
            var c6_field = field_prefix + '_row_c6';

            var c1_static_field = static_field_prefix + 'c1';
            var c2_static_field = static_field_prefix + 'c2';
            var c3_static_field = static_field_prefix + 'c3';
            var c4_static_field = static_field_prefix + 'c4';
            var c5_static_field = static_field_prefix + 'c5';
            var c6_static_field = static_field_prefix + 'c6';

            if (t < 10) {
                if (t > 1) {
                    for (i = 0; i < values[c6_field].length; i++) {
                        var cc_value = values[cc_field][i];

                        if (values[cb_field][i] && t010_grid_c6.hasOwnProperty(values[cb_field][i])) {
                            if (!toFloat(t010_grid_c6[values[cb_field][i]]) && toFloat(values[c6_field][i])) {
                                webform.errors.push({
                                    'fieldName': c6_field,
                                    'index': i,
                                    'weight': 18,
                                    'msg': concatMessage('67-018', '', Drupal.t("Dacă rândul @row, col.6 = 0, atunci rândul @vrow, col.6 = 0 pentru țara @country", {
                                        '@row': '010',
                                        '@vrow': table_num,
                                        '@country': values[cb_field][i]
                                    }))
                                });
                            }
                        }

                        if (cc_value) {
                            if (values.dec_dinamicTable1_row_cc.indexOf(cc_value) === -1) {
                                webform.errors.push({
                                    'fieldName': cc_field,
                                    'weight': 2,
                                    'index': i,
                                    'msg': concatMessage('67-002', '', Drupal.t('In Rind @row Tara @country poate fi reflectate doar coduri tarilor care sunt in Rind 010.*', {
                                        '@row': table_num,
                                        '@country': cc_value
                                    }))
                                });
                            }
                        }
                    }
                }
            }

            var c1_is_negative = false;
            var c2_is_negative = false;
            var c3_is_negative = false;
            var c6_is_negative = false;
            for (i = 0; i < values[cb_field].length; i++) {
                var some_field_is_filled = values[c1_field][i] != '' || values[c2_field][i] != '' || values[c3_field][i] != '' || values[c5_field][i] != '';
                if (values.hasOwnProperty(c4_field)) {
                    some_field_is_filled = some_field_is_filled || values[c4_field][i] != '';
                }

                if (isSpecificCfp && isGridTablesFilled['t' + t] && !values[cc_field][i]) {
                    var errorCode = t < 10 ? '014' : '023';
                    webform.errors.push({
                        'fieldName': cc_field,
                        'weight': parseInt(errorCode),
                        'index': i,
                        'msg': concatMessage('67-' + errorCode, '', Drupal.t('In Rind @row Codul Tarii trebuie completat', {
                            '@row': table_num
                        }))
                    });
                }

                if (is_negative(values[c1_field][i])) {
                    c1_is_negative = true;
                    webform.errors.push({
                        'fieldName': c1_field,
                        'index': i,
                        'msg': ''
                    });
                }

                if (is_negative(values[c2_field][i])) {
                    c2_is_negative = true;
                    webform.errors.push({
                        'fieldName': c2_field,
                        'index': i,
                        'msg': ''
                    });
                }

                if (is_negative(values[c3_field][i])) {
                    c3_is_negative = true;
                    webform.errors.push({
                        'fieldName': c3_field,
                        'index': i,
                        'msg': ''
                    });
                }

                if (is_negative(values[c6_field][i])) {
                    c6_is_negative = true;
                    webform.errors.push({
                        'fieldName': c6_field,
                        'index': i,
                        'msg': ''
                    });
                }
            }

            if (is_negative(values[c1_static_field])) {
                c1_is_negative = true;
                webform.errors.push({
                    'fieldName': c1_static_field,
                    'index': 0,
                    'msg': ''
                });
            }

            if (is_negative(values[c2_static_field])) {
                c2_is_negative = true;
                webform.errors.push({
                    'fieldName': c2_static_field,
                    'index': 0,
                    'msg': ''
                });
            }

            if (is_negative(values[c3_static_field])) {
                c3_is_negative = true;
                webform.errors.push({
                    'fieldName': c3_static_field,
                    'index': 0,
                    'msg': ''
                });
            }

            if (is_negative(values[c6_static_field])) {
                c6_is_negative = true;
                webform.errors.push({
                    'fieldName': c6_static_field,
                    'index': 0,
                    'msg': ''
                });
            }

            var negative_error_code = t < 10 ? '67-017' : '67-026';
            var negative_error_weight = t < 10 ? 17 : 26;
            var negative_error_msg = Drupal.t("Valoarea trebuie sa fie pozitivă");
            if (c1_is_negative) {
                webform.errors.push({
                    'fieldName': '',
                    'index': 0,
                    'weight': negative_error_weight,
                    'msg': concatMessage(negative_error_code, Drupal.settings.mywebform.fields[c1_static_field].title, negative_error_msg)
                });
            }

            if (c2_is_negative) {
                webform.errors.push({
                    'fieldName': '',
                    'index': 0,
                    'weight': negative_error_weight,
                    'msg': concatMessage(negative_error_code, Drupal.settings.mywebform.fields[c2_static_field].title, negative_error_msg)
                });
            }

            if (c3_is_negative) {
                webform.errors.push({
                    'fieldName': '',
                    'index': 0,
                    'weight': negative_error_weight,
                    'msg': concatMessage(negative_error_code, Drupal.settings.mywebform.fields[c3_static_field].title, negative_error_msg)
                });
            }

            if (c6_is_negative) {
                webform.errors.push({
                    'fieldName': '',
                    'index': 0,
                    'weight': negative_error_weight,
                    'msg': concatMessage(negative_error_code, Drupal.settings.mywebform.fields[c6_static_field].title, negative_error_msg)
                });
            }
        }

        var cap1_is_filled = isGridTablesFilled['t1'] ||
            isGridTablesFilled['t2'] ||
            isGridTablesFilled['t3'] ||
            isGridTablesFilled['t4'] ||
            isGridTablesFilled['t5'] ||
            isGridTablesFilled['t6'] ||
            isGridTablesFilled['t7'] ||
            isGridTablesFilled['t8'] ||
            isGridTablesFilled['t9'];
        /*if (!isSpecificCfp) {
          if (cap1_is_filled) {
            webform.errors.push({
              'fieldName': '',
              'index': 0,
              'weight': 1,
              'msg': concatMessage('67-001', '', Drupal.t('Daca CFP nu este egal cu 24, 26, 28 entitatea nu completeaza capitol I'))
            });
          }
    
          if (isGridTablesFilled['t10'] || isGridTablesFilled['t11']) {
            webform.errors.push({
              'fieldName': '',
              'index': 0,
              'weight': 20,
              'msg': concatMessage('67-020', '', Drupal.t('Daca CFP nu este egal cu 24, 26, 28 entitatea nu completeaza capitol II'))
            });
          }
        }*/

        if (isSpecificCfp && !isGridOtherFieldsFilled['t1']) {
            webform.errors.push({
                'fieldName': '',
                'weight': 15,
                'index': 0,
                'msg': concatMessage('67-015', '', Drupal.t('Nu exista date In Rind @row', {
                    '@row': '010'
                }))
            });
        }

        for (i = 0; i < values.dec_dinamicTable1_row_c1.length; i++) {
            var t1_cc_value = values.dec_dinamicTable1_row_cc[i];

            var t4_c1_value = 0;
            var t4_c2_value = 0;
            var t4_c3_value = 0;
            var t4_c4_value = 0;
            var t4_c5_value = 0;
            var t4_c6_value = 0;
            var t4_cc_index = -1;
            for (x = 0; x < values.dec_dinamicTable4_row_c1.length; x++) {
                if (t1_cc_value == values.dec_dinamicTable4_row_cc[x]) {
                    t4_cc_index = x;
                    t4_c1_value = toFloat(values.dec_dinamicTable4_row_c1[x]);
                    t4_c2_value = toFloat(values.dec_dinamicTable4_row_c2[x]);
                    t4_c3_value = toFloat(values.dec_dinamicTable4_row_c3[x]);
                    t4_c4_value = toFloat(values.dec_dinamicTable4_row_c4[x]);
                    t4_c5_value = toFloat(values.dec_dinamicTable4_row_c5[x]);
                    t4_c6_value = toFloat(values.dec_dinamicTable4_row_c6[x]);
                }
            }

            var t8_c1_value = 0;
            var t8_c2_value = 0;
            var t8_c3_value = 0;
            var t8_c5_value = 0;
            var t8_c6_value = 0;
            for (x = 0; x < values.dec_dinamicTable8_row_c1.length; x++) {
                if (t1_cc_value == values.dec_dinamicTable8_row_cc[x]) {
                    t8_c1_value = toFloat(values.dec_dinamicTable8_row_c1[x]);
                    t8_c2_value = toFloat(values.dec_dinamicTable8_row_c2[x]);
                    t8_c3_value = toFloat(values.dec_dinamicTable8_row_c3[x]);
                    t8_c5_value = toFloat(values.dec_dinamicTable8_row_c5[x]);
                    t8_c6_value = toFloat(values.dec_dinamicTable8_row_c6[x]);
                    break
                }
            }

            var t9_c1_value = 0;
            var t9_c2_value = 0;
            var t9_c3_value = 0;
            var t9_c4_value = 0;
            var t9_c5_value = 0;
            var t9_c6_value = 0;
            for (x = 0; x < values.dec_dinamicTable9_row_c1.length; x++) {
                if (t1_cc_value == values.dec_dinamicTable9_row_cc[x]) {
                    t9_c1_value = toFloat(values.dec_dinamicTable9_row_c1[x]);
                    t9_c2_value = toFloat(values.dec_dinamicTable9_row_c2[x]);
                    t9_c3_value = toFloat(values.dec_dinamicTable9_row_c3[x]);
                    t9_c4_value = toFloat(values.dec_dinamicTable9_row_c4[x]);
                    t9_c5_value = toFloat(values.dec_dinamicTable9_row_c5[x]);
                    t9_c6_value = toFloat(values.dec_dinamicTable9_row_c6[x]);
                    break
                }
            }

            var t8_t9_c1 = Decimal(t8_c1_value).plus(t9_c1_value);
            if (Decimal(t4_c1_value).lessThan(t8_t9_c1)) {
                webform.errors.push({
                    'fieldName': 'dec_dinamicTable4_row_c1',
                    'weight': 16,
                    'index': t4_cc_index,
                    'msg': Drupal.t('Cod eroare: 67-016. Rind 040, col.@col. Tara @country >= Rind 080 + Rind 090', {
                        '@country': t1_cc_value,
                        '@col': 1
                    })
                });
            }

            var t8_t9_c2 = Decimal(t8_c2_value).plus(t9_c2_value);
            if (Decimal(t4_c2_value).lessThan(t8_t9_c2)) {
                webform.errors.push({
                    'fieldName': 'dec_dinamicTable4_row_c2',
                    'weight': 16,
                    'index': t4_cc_index,
                    'msg': Drupal.t('Cod eroare: 67-016. Rind 040, col.@col. Tara @country >= Rind 080 + Rind 090', {
                        '@country': t1_cc_value,
                        '@col': 2
                    })
                });
            }

            var t8_t9_c3 = Decimal(t8_c3_value).plus(t9_c3_value);
            if (Decimal(t4_c3_value).lessThan(t8_t9_c3)) {
                webform.errors.push({
                    'fieldName': 'dec_dinamicTable4_row_c3',
                    'weight': 16,
                    'index': t4_cc_index,
                    'msg': Drupal.t('Cod eroare: 67-016. Rind 040, col.@col. Tara @country >= Rind 080 + Rind 090', {
                        '@country': t1_cc_value,
                        '@col': 3
                    })
                });
            }

            if (Decimal(t4_c4_value).lessThan(t9_c4_value)) {
                webform.errors.push({
                    'fieldName': 'dec_dinamicTable4_row_c4',
                    'weight': 16,
                    'index': t4_cc_index,
                    'msg': Drupal.t('Cod eroare: 67-016. Rind 040, col.@col. Tara @country >= Rind 090', {
                        '@country': t1_cc_value,
                        '@col': 4
                    })
                });
            }

            var t8_t9_c5 = Decimal(t8_c5_value).plus(t9_c5_value);
            if (Decimal(t4_c5_value).lessThan(t8_t9_c5)) {
                webform.errors.push({
                    'fieldName': 'dec_dinamicTable4_row_c5',
                    'weight': 16,
                    'index': t4_cc_index,
                    'msg': Drupal.t('Cod eroare: 67-016. Rind 040, col.@col. Tara @country >= Rind 080 + Rind 090', {
                        '@country': t1_cc_value,
                        '@col': 5
                    })
                });
            }

            var t8_t9_c6 = Decimal(t8_c6_value).plus(t9_c6_value);
            if (Decimal(t4_c6_value).lessThan(t8_t9_c6)) {
                webform.errors.push({
                    'fieldName': 'dec_dinamicTable4_row_c6',
                    'weight': 16,
                    'index': t4_cc_index,
                    'msg': Drupal.t('Cod eroare: 67-016. Rind 040, col.@col. Tara @country >= Rind 080 + Rind 090', {
                        '@country': t1_cc_value,
                        '@col': 6
                    })
                });
            }
        }

        if (!values.dec_fiscCod_street) {
            webform.warnings.push({
                "fieldName": "dec_fiscCod_street",
                "msg": Drupal.t('Câmpul nu este completat')
            });
        }


        if (isSpecificCfp && cap1_is_filled) {
            var comp_res1;
            var comp_res2;

            comp_res1 = Decimal(values.dec_table2_row_r020c1 || 0).plus(values.dec_table9_row_r090c1 || 0);
            comp_res2 = Decimal(values.dec_table12_row591_totalc1 || 0).plus(values.dec_table13_row791_totalc1 || 0).plus(values.dec_table13_row791_totalc2 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table2_row_r020c1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table9_row_r090c1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row591_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row791_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row791_totalc2', 'index': 0, 'msg': '' });

                webform.errors.push({
                    'fieldName': '',
                    'weight': 120,
                    'index': 0,
                    'msg': concatMessage('67-120', '', Drupal.t('CapI.(Rind.020Col.1+Rind.090Col.1)=CapV.Rind.591Col.1+CapVI.(Rind.791Col.1+Rind.791Col.2)'))
                });
            }

            comp_res1 = Decimal(values.dec_table2_row_r020c2 || 0).plus(values.dec_table9_row_r090c2 || 0);
            comp_res2 = Decimal(values.dec_table12_row591_totalc2 || 0).plus(values.dec_table13_row791_totalc3 || 0);
            if (!toFloat(values.dec_table2_row_r020c5) && !toFloat(values.dec_table9_row_r090c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table2_row_r020c2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table9_row_r090c2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row591_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row791_totalc3', 'index': 0, 'msg': '' });

                webform.errors.push({
                    'fieldName': '',
                    'weight': 121,
                    'index': 0,
                    'msg': concatMessage('67-121', '', Drupal.t('CapI.(Rind.020Col.2+Rind.090Col.2)=CapV.Rind.591Col.2+CapVI.Rind.791Col.3'))
                });
            }

            comp_res1 = Decimal(values.dec_table2_row_r020c3 || 0).plus(values.dec_table9_row_r090c3 || 0);
            comp_res2 = Decimal(values.dec_table12_row591_totalc3 || 0).plus(values.dec_table13_row791_totalc5 || 0);
            if (!toFloat(values.dec_table2_row_r020c5) && !toFloat(values.dec_table9_row_r090c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table2_row_r020c3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table9_row_r090c3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row591_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row791_totalc5', 'index': 0, 'msg': '' });

                webform.errors.push({
                    'fieldName': '',
                    'weight': 122,
                    'index': 0,
                    'msg': concatMessage('67-122', '', Drupal.t('CapI.(Rind.020Col.3+Rind.090Col.3)=CapV.Rind.591Col.3+CapVI.Rind.791Col.5'))
                });
            }

            comp_res1 = Decimal(values.dec_table2_row_r020c4 || 0).plus(values.dec_table9_row_r090c4 || 0);
            comp_res2 = Decimal(values.dec_table12_row591_totalc4 || 0).plus(values.dec_table13_row791_totalc6 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table2_row_r020c4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table9_row_r090c4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row591_totalc4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row791_totalc6', 'index': 0, 'msg': '' });

                webform.errors.push({
                    'fieldName': '',
                    'weight': 123,
                    'index': 0,
                    'msg': concatMessage('67-123', '', Drupal.t('CapI.(Rind.020Col.4+Rind.090Col.4)=CapV.Rind.591Col.4+CapVI.Rind.791Col.6'))
                });
            }

            comp_res1 = Decimal(values.dec_table2_row_r020c6 || 0).plus(values.dec_table9_row_r090c6 || 0);
            comp_res2 = Decimal(values.dec_table12_row591_totalc5 || 0).plus(values.dec_table13_row791_totalc7 || 0).plus(values.dec_table13_row791_totalc8 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table2_row_r020c6', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table9_row_r090c6', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row591_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row791_totalc7', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row791_totalc8', 'index': 0, 'msg': '' });

                webform.errors.push({
                    'fieldName': '',
                    'weight': 124,
                    'index': 0,
                    'msg': concatMessage('67-124', '', Drupal.t('CapI.(Rind.020Col.6+Rind.090Col.6)=CapV.Rind.591Col.5+CapVI.(Rind.791Col.7+Rind.791Col.8)'))
                });
            }

            comp_res1 = Decimal(values.dec_table3_row_r030c1 || 0);
            comp_res2 = Decimal(values.dec_table12_row571_totalc1 || 0)
                .plus(values.dec_table12_row581_totalc1 || 0)
                .plus(values.dec_table13_row771_totalc1 || 0)
                .plus(values.dec_table13_row771_totalc2 || 0)
                .plus(values.dec_table13_row781_totalc1 || 0)
                .plus(values.dec_table13_row781_totalc2 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table3_row_r030c1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row571_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row581_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row771_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row771_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row781_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row781_totalc2', 'index': 0, 'msg': '' });

                webform.errors.push({
                    'fieldName': '',
                    'weight': 125,
                    'index': 0,
                    'msg': concatMessage('67-125', '', Drupal.t('CapI.Rind.030 Col.1= CapV.(Rind.571Col.1+Rind.581Col.1)+CapVI.(Rind.771Col.1+Rind.781Col.1+Rind.771Col.2+Rind.781Col.2)'))
                });
            }

            comp_res1 = Decimal(values.dec_table3_row_r030c2 || 0);
            comp_res2 = Decimal(values.dec_table12_row571_totalc2 || 0)
                .plus(values.dec_table12_row581_totalc2 || 0)
                .plus(values.dec_table13_row771_totalc3 || 0)
                .plus(values.dec_table13_row781_totalc3 || 0);
            if (!toFloat(values.dec_table3_row_r030c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table3_row_r030c2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row571_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row581_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row771_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row781_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 126,
                    'index': 0,
                    'msg': concatMessage('67-126', '', Drupal.t('CapI.Rind.030 Col.2=CapV.(Rind.571Col.2+Rind.581Col.2)+CapVI.(Rind.771Col.3+Rind.781Col.3)'))
                });
            }

            comp_res1 = Decimal(values.dec_table3_row_r030c3 || 0);
            comp_res2 = Decimal(values.dec_table12_row571_totalc3 || 0)
                .plus(values.dec_table12_row581_totalc3 || 0)
                .plus(values.dec_table13_row771_totalc5 || 0)
                .plus(values.dec_table13_row781_totalc5 || 0);
            if (!toFloat(values.dec_table3_row_r030c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table3_row_r030c3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row571_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row581_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row771_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row781_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 127,
                    'index': 0,
                    'msg': concatMessage('67-127', '', Drupal.t('CapI.Rind.030 Col.3=CapV.(Rind.571Col.3+Rind.581Col.3)+CapVI.(Rind.771Col.5+Rind.781Col.5)'))
                });
            }

            comp_res1 = Decimal(values.dec_table3_row_r030c4 || 0);
            comp_res2 = Decimal(values.dec_table12_row571_totalc4 || 0)
                .plus(values.dec_table12_row581_totalc4 || 0)
                .plus(values.dec_table13_row771_totalc6 || 0)
                .plus(values.dec_table13_row781_totalc6 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table3_row_r030c4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row571_totalc4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row581_totalc4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row771_totalc6', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row781_totalc6', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 128,
                    'index': 0,
                    'msg': concatMessage('67-128', '', Drupal.t('CapI.Rind.030 Col.4=CapV.(Rind.571Col.4+Rind.581Col.4)+CapVI.(Rind.771Col.6+Rind.781Col.6)'))
                });
            }

            comp_res1 = Decimal(values.dec_table3_row_r030c6 || 0);
            comp_res2 = Decimal(values.dec_table12_row571_totalc5 || 0)
                .plus(values.dec_table12_row581_totalc5 || 0)
                .plus(values.dec_table13_row771_totalc7 || 0)
                .plus(values.dec_table13_row771_totalc8 || 0)
                .plus(values.dec_table13_row781_totalc7 || 0)
                .plus(values.dec_table13_row781_totalc8 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table3_row_r030c6', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row571_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row581_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row771_totalc7', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row771_totalc8', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row781_totalc7', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row781_totalc8', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 129,
                    'index': 0,
                    'msg': concatMessage('67-129', '', Drupal.t('CapI.Rind.030 Col.6=CapV.(Rind.571Col.5+Rind.581Col.5)+CapVI.(Rind.771Col.7+Rind.781Col.7+ Rind.771Col.8+Rind.781Col.8)'))
                });
            }

            comp_res1 = Decimal(values.dec_table4_row_r040c1 || 0).minus(values.dec_table9_row_r090c1 || 0);
            comp_res2 = Decimal(values.dec_table12_row601_totalc1 || 0)
                .plus(values.dec_table13_row801_totalc1 || 0)
                .plus(values.dec_table13_row801_totalc2 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table4_row_r040c1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table9_row_r090c1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row601_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row801_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row801_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 130,
                    'index': 0,
                    'msg': concatMessage('67-130', '', Drupal.t('CapI.(Rind.040Col.1-Rind.090Col.1)=CapV.Rind.601Col.1+CapVI.(Rind.801Col.1+Rind.801Col.2)'))
                });
            }

            comp_res1 = Decimal(values.dec_table4_row_r040c2 || 0).minus(values.dec_table9_row_r090c2 || 0);
            comp_res2 = Decimal(values.dec_table12_row601_totalc2 || 0)
                .plus(values.dec_table13_row801_totalc3 || 0);
            if (!toFloat(values.dec_table4_row_r040c5) && !toFloat(values.dec_table9_row_r090c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table4_row_r040c2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table9_row_r090c2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row601_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row801_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 131,
                    'index': 0,
                    'msg': concatMessage('67-131', '', Drupal.t('CapI.(Rind.040Col.2-Rind.090Col.2)=CapV.Rind.601Col.2+CapVI.Rind.801Col.3'))
                });
            }

            comp_res1 = Decimal(values.dec_table4_row_r040c3 || 0).minus(values.dec_table9_row_r090c3 || 0);
            comp_res2 = Decimal(values.dec_table12_row601_totalc3 || 0)
                .plus(values.dec_table13_row801_totalc5 || 0);
            if (!toFloat(values.dec_table2_row_r020c5) && !toFloat(values.dec_table9_row_r090c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table4_row_r040c3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table9_row_r090c3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row601_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row801_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 132,
                    'index': 0,
                    'msg': concatMessage('67-132', '', Drupal.t('CapI.(Rind.040Col.3-Rind.090Col.3)=CapV.Rind.601Col.3+CapVI.Rind.801Col.5'))
                });
            }

            comp_res1 = Decimal(values.dec_table4_row_r040c4 || 0).minus(values.dec_table9_row_r090c4 || 0);
            comp_res2 = Decimal(values.dec_table12_row601_totalc4 || 0)
                .plus(values.dec_table13_row801_totalc6 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table4_row_r040c4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table9_row_r090c4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row601_totalc4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row801_totalc6', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 133,
                    'index': 0,
                    'msg': concatMessage('67-133', '', Drupal.t('CapI.(Rind.040Col.4-Rind.090Col.4)= CapV.Rind.601Col.4+CapVI.Rind.801Col.6'))
                });
            }

            comp_res1 = Decimal(values.dec_table4_row_r040c6 || 0).minus(values.dec_table9_row_r090c6 || 0);
            comp_res2 = Decimal(values.dec_table12_row601_totalc5 || 0)
                .plus(values.dec_table13_row801_totalc7 || 0)
                .plus(values.dec_table13_row801_totalc8 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table4_row_r040c6', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table9_row_r090c6', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row601_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row801_totalc7', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row801_totalc8', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 134,
                    'index': 0,
                    'msg': concatMessage('67-134', '', Drupal.t('CapI.(Rind.040Col.6-Rind.090Col.6)=CapV.Rind.601Col.5+CapVI.(Rind.801Col.7+Rind.801Col.8)'))
                });
            }

            comp_res1 = Decimal(values.dec_table5_row_r050c1 || 0);
            comp_res2 = Decimal(values.dec_table12_row531_totalc1 || 0)
                .plus(values.dec_table13_row731_totalc1 || 0)
                .plus(values.dec_table13_row731_totalc2 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table5_row_r050c1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row531_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row731_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row731_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 135,
                    'index': 0,
                    'msg': concatMessage('67-135', '', Drupal.t('CapI.Rind.050Col.1=CapV.Rind.531Col.1+CapVI.(Rind.731Col.1+Rind.731Col.2)'))
                });
            }

            comp_res1 = Decimal(values.dec_table5_row_r050c2 || 0);
            comp_res2 = Decimal(values.dec_table12_row531_totalc2 || 0)
                .plus(values.dec_table13_row731_totalc3 || 0);
            if (!toFloat(values.dec_table5_row_r050c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table5_row_r050c2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row531_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row731_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 136,
                    'index': 0,
                    'msg': concatMessage('67-136', '', Drupal.t('CapI.Rind.050Col.2=CapV.Rind.531Col.2+CapVI.Rind.731Col.3'))
                });
            }

            comp_res1 = Decimal(values.dec_table5_row_r050c3 || 0);
            comp_res2 = Decimal(values.dec_table12_row531_totalc3 || 0)
                .plus(values.dec_table13_row731_totalc5 || 0);
            if (!toFloat(values.dec_table5_row_r050c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table5_row_r050c3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row531_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row731_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 137,
                    'index': 0,
                    'msg': concatMessage('67-137', '', Drupal.t('CapI.Rind.050Col.3=CapV.Rind.531Col.3+ CapVI.Rind.731Col.5'))
                });
            }

            comp_res1 = Decimal(values.dec_table5_row_r050c4 || 0);
            comp_res2 = Decimal(values.dec_table12_row531_totalc4 || 0)
                .plus(values.dec_table13_row731_totalc6 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table5_row_r050c4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row531_totalc4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row731_totalc6', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 138,
                    'index': 0,
                    'msg': concatMessage('67-138', '', Drupal.t('CapI.Rind.050Col.4=CapV.Rind.531Col.4+CapVI.Rind.731Col.6'))
                });
            }

            comp_res1 = Decimal(values.dec_table5_row_r050c6 || 0);
            comp_res2 = Decimal(values.dec_table12_row531_totalc5 || 0)
                .plus(values.dec_table13_row731_totalc7 || 0)
                .plus(values.dec_table13_row731_totalc8 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table5_row_r050c6', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row531_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row731_totalc7', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row731_totalc8', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 139,
                    'index': 0,
                    'msg': concatMessage('67-139', '', Drupal.t('CapI.Rind.050Col.6=CapV.Rind.531Col.5+CapVI.(Rind.731Col.7+Rind.731Col.8)'))
                });
            }

            comp_res1 = Decimal(values.dec_table6_row_r060c1 || 0);
            comp_res2 = Decimal(values.dec_table12_row511_totalc1 || 0)
                .plus(values.dec_table12_row521_totalc1 || 0)
                .plus(values.dec_table13_row711_totalc1 || 0)
                .plus(values.dec_table13_row711_totalc2 || 0)
                .plus(values.dec_table13_row721_totalc1 || 0)
                .plus(values.dec_table13_row721_totalc2 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table6_row_r060c1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row511_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row521_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row711_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row711_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row721_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row721_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 140,
                    'index': 0,
                    'msg': concatMessage('67-140', '', Drupal.t('CapI.Rind.060Col.1=CapV.(Rind.511Col.1+Rind.521Col.1)+CapVI.(Rind.711Col.1+Rind.721Col.1+Rind.711Col.2+Rind.721Col.2)'))
                });
            }

            comp_res1 = Decimal(values.dec_table6_row_r060c2 || 0);
            comp_res2 = Decimal(values.dec_table12_row511_totalc2 || 0)
                .plus(values.dec_table12_row521_totalc2 || 0)
                .plus(values.dec_table13_row711_totalc3 || 0)
                .plus(values.dec_table13_row721_totalc3 || 0);
            if (!toFloat(values.dec_table6_row_r060c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table6_row_r060c2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row511_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row521_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row711_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row721_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 141,
                    'index': 0,
                    'msg': concatMessage('67-141', '', Drupal.t('CapI.Rind.060Col.2=CapV.(Rind.511Col.2+Rind.521Col.2)+CapVI.(Rind.711Col.3+Rind.721Col.3)'))
                });
            }

            comp_res1 = Decimal(values.dec_table6_row_r060c3 || 0);
            comp_res2 = Decimal(values.dec_table12_row511_totalc3 || 0)
                .plus(values.dec_table12_row521_totalc3 || 0)
                .plus(values.dec_table13_row711_totalc5 || 0)
                .plus(values.dec_table13_row721_totalc5 || 0);
            if (!toFloat(values.dec_table6_row_r060c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table6_row_r060c3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row511_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row521_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row711_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row721_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 142,
                    'index': 0,
                    'msg': concatMessage('67-142', '', Drupal.t('CapI.Rind.060Col.3= CapV.(Rind.511Col.3+Rind.521Col.3)+CapVI.(Rind.711Col.5+Rind.721Col.5)'))
                });
            }

            comp_res1 = Decimal(values.dec_table6_row_r060c4 || 0);
            comp_res2 = Decimal(values.dec_table12_row511_totalc4 || 0)
                .plus(values.dec_table12_row521_totalc4 || 0)
                .plus(values.dec_table13_row711_totalc6 || 0)
                .plus(values.dec_table13_row721_totalc6 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table6_row_r060c4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row511_totalc4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row521_totalc4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row711_totalc6', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row721_totalc6', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 143,
                    'index': 0,
                    'msg': concatMessage('67-143', '', Drupal.t('CapI.Rind.060Col.4=CapV.(Rind.511Col.4+Rind.521Col.4)+CapVI.(Rind.711Col.6+Rind.721Col.6)'))
                });
            }

            comp_res1 = Decimal(values.dec_table6_row_r060c6 || 0);
            comp_res2 = Decimal(values.dec_table12_row511_totalc5 || 0)
                .plus(values.dec_table12_row521_totalc5 || 0)
                .plus(values.dec_table13_row711_totalc7 || 0)
                .plus(values.dec_table13_row711_totalc8 || 0)
                .plus(values.dec_table13_row721_totalc7 || 0)
                .plus(values.dec_table13_row721_totalc8 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table6_row_r060c6', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row511_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row521_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row711_totalc7', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row711_totalc8', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row721_totalc7', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row721_totalc8', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 144,
                    'index': 0,
                    'msg': concatMessage('67-144', '', Drupal.t('CapI.Rind.060Col.6=CapV.(Rind.511Col.5+Rind.521Col.5)+ CapVI.(Rind.711Col.7+Rind.721 Col.7+ Rind.711Col.8+Rind.721Col.8)'))
                });
            }

            comp_res1 = Decimal(values.dec_table7_row_r070c1 || 0);
            comp_res2 = Decimal(values.dec_table12_row541_totalc1 || 0)
                .plus(values.dec_table12_row551_totalc1 || 0)
                .plus(values.dec_table13_row741_totalc1 || 0)
                .plus(values.dec_table13_row741_totalc2 || 0)
                .plus(values.dec_table13_row751_totalc1 || 0)
                .plus(values.dec_table13_row751_totalc2 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table7_row_r070c1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row541_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row551_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row741_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row741_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row751_totalc1', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row751_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 145,
                    'index': 0,
                    'msg': concatMessage('67-145', '', Drupal.t('CapI.Rind.070Col.1=CapV.(Rind.541Col.1+Rind.551Col.1)+CapVI.(Rind.741Col.1+Rind.751Col.1+Rind.741Col.2+Rind.751Col.2)'))
                });
            }

            comp_res1 = Decimal(values.dec_table7_row_r070c2 || 0);
            comp_res2 = Decimal(values.dec_table12_row541_totalc2 || 0)
                .plus(values.dec_table12_row551_totalc2 || 0)
                .plus(values.dec_table13_row741_totalc3 || 0)
                .plus(values.dec_table13_row751_totalc3 || 0);
            if (!toFloat(values.dec_table7_row_r070c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table7_row_r070c2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row541_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row551_totalc2', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row741_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row751_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 146,
                    'index': 0,
                    'msg': concatMessage('67-146', '', Drupal.t('CapI.Rind.070Col.2=CapV.(Rind.541Col.2+Rind.551Col.2)+CapVI.(Rind.741Col.3+Rind.751Col.3)'))
                });
            }

            comp_res1 = Decimal(values.dec_table7_row_r070c3 || 0);
            comp_res2 = Decimal(values.dec_table12_row541_totalc3 || 0)
                .plus(values.dec_table12_row551_totalc3 || 0)
                .plus(values.dec_table13_row741_totalc5 || 0)
                .plus(values.dec_table13_row751_totalc5 || 0);
            if (!toFloat(values.dec_table7_row_r070c5) && !comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table7_row_r070c3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row541_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row551_totalc3', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row741_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row751_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 147,
                    'index': 0,
                    'msg': concatMessage('67-147', '', Drupal.t('CapI.Rind.070Col.3=CapV.(Rind.541Col.3+Rind.551Col.3)+CapVI.(Rind.741Col.5+Rind.751Col.5)'))
                });
            }

            comp_res1 = Decimal(values.dec_table7_row_r070c4 || 0);
            comp_res2 = Decimal(values.dec_table12_row541_totalc4 || 0)
                .plus(values.dec_table12_row551_totalc4 || 0)
                .plus(values.dec_table13_row741_totalc6 || 0)
                .plus(values.dec_table13_row751_totalc6 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table7_row_r070c4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row541_totalc4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row551_totalc4', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row741_totalc6', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row751_totalc6', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 148,
                    'index': 0,
                    'msg': concatMessage('67-148', '', Drupal.t('CapI.Rind.070Col.4=CapV.(Rind.541Col.4+Rind.551Col.4)+CapVI.(Rind.741Col.6+Rind.751Col.6)'))
                });
            }

            comp_res1 = Decimal(values.dec_table7_row_r070c6 || 0);
            comp_res2 = Decimal(values.dec_table12_row541_totalc5 || 0)
                .plus(values.dec_table12_row551_totalc5 || 0)
                .plus(values.dec_table13_row741_totalc7 || 0)
                .plus(values.dec_table13_row741_totalc8 || 0)
                .plus(values.dec_table13_row751_totalc7 || 0)
                .plus(values.dec_table13_row751_totalc8 || 0);
            if (!comp_res1.equals(comp_res2)) {
                webform.errors.push({ 'fieldName': 'dec_table7_row_r070c6', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row541_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table12_row551_totalc5', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row741_totalc7', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row741_totalc8', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row751_totalc7', 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': 'dec_table13_row751_totalc8', 'index': 0, 'msg': '' });
                webform.errors.push({
                    'fieldName': '',
                    'weight': 150,
                    'index': 0,
                    'msg': concatMessage('67-150', '', Drupal.t('CapI.Rind.070Col.6=CapV.(Rind.511Col.5+Rind.551Col.5)+ CapVI.(Rind.741Col.7+Rind.751 Col.7+ Rind.741Col.8+Rind.751Col.8)'))
                });
            }
        }

        var autofield_exp = [
            // Cap. 1, Row 010.
            { 'rezField': 'dec_table1_row_r010c1', 'callback': _mywebform_expression_dec_table1_row_r010c1, 'err': '003', 'text': function () { return Drupal.t('Rind 010 col.@col = Rind 010-01 +..+ 010-07 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table1_row_r010c2', 'callback': _mywebform_expression_dec_table1_row_r010c2, 'err': '003', 'text': function () { return Drupal.t('Rind 010 col.@col = Rind 010-01 +..+ 010-07 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table1_row_r010c3', 'callback': _mywebform_expression_dec_table1_row_r010c3, 'err': '003', 'text': function () { return Drupal.t('Rind 010 col.@col = Rind 010-01 +..+ 010-07 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table1_row_r010c5', 'callback': _mywebform_expression_dec_table1_row_r010c5, 'err': '003', 'text': function () { return Drupal.t('Rind 010 col.@col = Rind 010-01 +..+ 010-07 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table1_row_r010c6', 'callback': _mywebform_expression_dec_table1_row_r010c6, 'err': '003', 'text': function () { return Drupal.t('Rind 010 col.@col = Rind 010-01 +..+ 010-07 col.@col.', { '@col': 6 }); } },

            // Cap. 1, Row 020.
            { 'rezField': 'dec_table2_row_r020c1', 'callback': _mywebform_expression_dec_table2_row_r020c1, 'err': '004', 'text': function () { return Drupal.t('Rind 020 col.@col = Rind 020-01 +..+ 020-07 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table2_row_r020c2', 'callback': _mywebform_expression_dec_table2_row_r020c2, 'err': '004', 'text': function () { return Drupal.t('Rind 020 col.@col = Rind 020-01 +..+ 020-07 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table2_row_r020c3', 'callback': _mywebform_expression_dec_table2_row_r020c3, 'err': '004', 'text': function () { return Drupal.t('Rind 020 col.@col = Rind 020-01 +..+ 020-07 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table2_row_r020c4', 'callback': _mywebform_expression_dec_table2_row_r020c4, 'err': '004', 'text': function () { return Drupal.t('Rind 020 col.@col = Rind 020-01 +..+ 020-07 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table2_row_r020c5', 'callback': _mywebform_expression_dec_table2_row_r020c5, 'err': '004', 'text': function () { return Drupal.t('Rind 020 col.@col = Rind 020-01 +..+ 020-07 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table2_row_r020c6', 'callback': _mywebform_expression_dec_table2_row_r020c6, 'err': '004', 'text': function () { return Drupal.t('Rind 020 col.@col = Rind 020-01 +..+ 020-07 col.@col.', { '@col': 6 }); } },

            // Cap. 1, Row 030.
            { 'rezField': 'dec_table3_row_r030c1', 'callback': _mywebform_expression_dec_table3_row_r030c1, 'err': '005', 'text': function () { return Drupal.t('Rind 030 col.@col = Rind 030-01 +..+ 030-07 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table3_row_r030c2', 'callback': _mywebform_expression_dec_table3_row_r030c2, 'err': '005', 'text': function () { return Drupal.t('Rind 030 col.@col = Rind 030-01 +..+ 030-07 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table3_row_r030c3', 'callback': _mywebform_expression_dec_table3_row_r030c3, 'err': '005', 'text': function () { return Drupal.t('Rind 030 col.@col = Rind 030-01 +..+ 030-07 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table3_row_r030c4', 'callback': _mywebform_expression_dec_table3_row_r030c4, 'err': '005', 'text': function () { return Drupal.t('Rind 030 col.@col = Rind 030-01 +..+ 030-07 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table3_row_r030c5', 'callback': _mywebform_expression_dec_table3_row_r030c5, 'err': '005', 'text': function () { return Drupal.t('Rind 030 col.@col = Rind 030-01 +..+ 030-07 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table3_row_r030c6', 'callback': _mywebform_expression_dec_table3_row_r030c6, 'err': '005', 'text': function () { return Drupal.t('Rind 030 col.@col = Rind 030-01 +..+ 030-07 col.@col.', { '@col': 6 }); } },

            // Cap. 1, Row 040.
            { 'rezField': 'dec_table4_row_r040c1', 'callback': _mywebform_expression_dec_table4_row_r040c1, 'err': '006', 'text': function () { return Drupal.t('Rind 040 col.@col = Rind 040-01 +..+ 040-07 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table4_row_r040c2', 'callback': _mywebform_expression_dec_table4_row_r040c2, 'err': '006', 'text': function () { return Drupal.t('Rind 040 col.@col = Rind 040-01 +..+ 040-07 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table4_row_r040c3', 'callback': _mywebform_expression_dec_table4_row_r040c3, 'err': '006', 'text': function () { return Drupal.t('Rind 040 col.@col = Rind 040-01 +..+ 040-07 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table4_row_r040c4', 'callback': _mywebform_expression_dec_table4_row_r040c4, 'err': '006', 'text': function () { return Drupal.t('Rind 040 col.@col = Rind 040-01 +..+ 040-07 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table4_row_r040c5', 'callback': _mywebform_expression_dec_table4_row_r040c5, 'err': '006', 'text': function () { return Drupal.t('Rind 040 col.@col = Rind 040-01 +..+ 040-07 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table4_row_r040c6', 'callback': _mywebform_expression_dec_table4_row_r040c6, 'err': '006', 'text': function () { return Drupal.t('Rind 040 col.@col = Rind 040-01 +..+ 040-07 col.@col.', { '@col': 6 }); } },

            // Cap. 1, Row 050.
            { 'rezField': 'dec_table5_row_r050c1', 'callback': _mywebform_expression_dec_table5_row_r050c1, 'err': '007', 'text': function () { return Drupal.t('Rind 050 col.@col = Rind 050-01 +..+ 050-07 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table5_row_r050c2', 'callback': _mywebform_expression_dec_table5_row_r050c2, 'err': '007', 'text': function () { return Drupal.t('Rind 050 col.@col = Rind 050-01 +..+ 050-07 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table5_row_r050c3', 'callback': _mywebform_expression_dec_table5_row_r050c3, 'err': '007', 'text': function () { return Drupal.t('Rind 050 col.@col = Rind 050-01 +..+ 050-07 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table5_row_r050c4', 'callback': _mywebform_expression_dec_table5_row_r050c4, 'err': '007', 'text': function () { return Drupal.t('Rind 050 col.@col = Rind 050-01 +..+ 050-07 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table5_row_r050c5', 'callback': _mywebform_expression_dec_table5_row_r050c5, 'err': '007', 'text': function () { return Drupal.t('Rind 050 col.@col = Rind 050-01 +..+ 050-07 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table5_row_r050c6', 'callback': _mywebform_expression_dec_table5_row_r050c6, 'err': '007', 'text': function () { return Drupal.t('Rind 050 col.@col = Rind 050-01 +..+ 050-07 col.@col.', { '@col': 6 }); } },

            // Cap. 1, Row 060.
            { 'rezField': 'dec_table6_row_r060c1', 'callback': _mywebform_expression_dec_table6_row_r060c1, 'err': '008', 'text': function () { return Drupal.t('Rind 060 col.@col = Rind 060-01 +..+ 060-07 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table6_row_r060c2', 'callback': _mywebform_expression_dec_table6_row_r060c2, 'err': '008', 'text': function () { return Drupal.t('Rind 060 col.@col = Rind 060-01 +..+ 060-07 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table6_row_r060c3', 'callback': _mywebform_expression_dec_table6_row_r060c3, 'err': '008', 'text': function () { return Drupal.t('Rind 060 col.@col = Rind 060-01 +..+ 060-07 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table6_row_r060c4', 'callback': _mywebform_expression_dec_table6_row_r060c4, 'err': '008', 'text': function () { return Drupal.t('Rind 060 col.@col = Rind 060-01 +..+ 060-07 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table6_row_r060c5', 'callback': _mywebform_expression_dec_table6_row_r060c5, 'err': '008', 'text': function () { return Drupal.t('Rind 060 col.@col = Rind 060-01 +..+ 060-07 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table6_row_r060c6', 'callback': _mywebform_expression_dec_table6_row_r060c6, 'err': '008', 'text': function () { return Drupal.t('Rind 060 col.@col = Rind 060-01 +..+ 060-07 col.@col.', { '@col': 6 }); } },

            // Cap. 1, Row 070.
            { 'rezField': 'dec_table7_row_r070c1', 'callback': _mywebform_expression_dec_table7_row_r070c1, 'err': '009', 'text': function () { return Drupal.t('Rind 070 col.@col = Rind 070-01 +..+ 070-07 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table7_row_r070c2', 'callback': _mywebform_expression_dec_table7_row_r070c2, 'err': '009', 'text': function () { return Drupal.t('Rind 070 col.@col = Rind 070-01 +..+ 070-07 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table7_row_r070c3', 'callback': _mywebform_expression_dec_table7_row_r070c3, 'err': '009', 'text': function () { return Drupal.t('Rind 070 col.@col = Rind 070-01 +..+ 070-07 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table7_row_r070c4', 'callback': _mywebform_expression_dec_table7_row_r070c4, 'err': '009', 'text': function () { return Drupal.t('Rind 070 col.@col = Rind 070-01 +..+ 070-07 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table7_row_r070c5', 'callback': _mywebform_expression_dec_table7_row_r070c5, 'err': '009', 'text': function () { return Drupal.t('Rind 070 col.@col = Rind 070-01 +..+ 070-07 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table7_row_r070c6', 'callback': _mywebform_expression_dec_table7_row_r070c6, 'err': '009', 'text': function () { return Drupal.t('Rind 070 col.@col = Rind 070-01 +..+ 070-07 col.@col.', { '@col': 6 }); } },

            // Cap. 1, Row 080.
            { 'rezField': 'dec_table8_row_r080c1', 'callback': _mywebform_expression_dec_table8_row_r080c1, 'err': '010', 'text': function () { return Drupal.t('Rind 080 col.@col = Rind 080-01 +..+ 080-07 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table8_row_r080c2', 'callback': _mywebform_expression_dec_table8_row_r080c2, 'err': '010', 'text': function () { return Drupal.t('Rind 080 col.@col = Rind 080-01 +..+ 080-07 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table8_row_r080c3', 'callback': _mywebform_expression_dec_table8_row_r080c3, 'err': '010', 'text': function () { return Drupal.t('Rind 080 col.@col = Rind 080-01 +..+ 080-07 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table8_row_r080c5', 'callback': _mywebform_expression_dec_table8_row_r080c5, 'err': '010', 'text': function () { return Drupal.t('Rind 080 col.@col = Rind 080-01 +..+ 080-07 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table8_row_r080c6', 'callback': _mywebform_expression_dec_table8_row_r080c6, 'err': '010', 'text': function () { return Drupal.t('Rind 080 col.@col = Rind 080-01 +..+ 080-07 col.@col.', { '@col': 6 }); } },

            // Cap. 1, Row 090.
            { 'rezField': 'dec_table9_row_r090c1', 'callback': _mywebform_expression_dec_table9_row_r090c1, 'err': '011', 'text': function () { return Drupal.t('Rind 090 col.@col = Rind 090-01 +..+ 090-07 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table9_row_r090c2', 'callback': _mywebform_expression_dec_table9_row_r090c2, 'err': '011', 'text': function () { return Drupal.t('Rind 090 col.@col = Rind 090-01 +..+ 090-07 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table9_row_r090c3', 'callback': _mywebform_expression_dec_table9_row_r090c3, 'err': '011', 'text': function () { return Drupal.t('Rind 090 col.@col = Rind 090-01 +..+ 090-07 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table9_row_r090c4', 'callback': _mywebform_expression_dec_table9_row_r090c4, 'err': '011', 'text': function () { return Drupal.t('Rind 090 col.@col = Rind 090-01 +..+ 090-07 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table9_row_r090c5', 'callback': _mywebform_expression_dec_table9_row_r090c5, 'err': '011', 'text': function () { return Drupal.t('Rind 090 col.@col = Rind 090-01 +..+ 090-07 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table9_row_r090c6', 'callback': _mywebform_expression_dec_table9_row_r090c6, 'err': '011', 'text': function () { return Drupal.t('Rind 090 col.@col = Rind 090-01 +..+ 090-07 col.@col.', { '@col': 6 }); } },

            // Cap. 2, Row 130.
            { 'rezField': 'dec_table10_row_r130c1', 'callback': _mywebform_expression_dec_table10_row_r130c1, 'err': '024', 'text': function () { return Drupal.t('Rind 130 col.@col = Rind 130-01 +..+ 130-07 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table10_row_r130c2', 'callback': _mywebform_expression_dec_table10_row_r130c2, 'err': '024', 'text': function () { return Drupal.t('Rind 130 col.@col = Rind 130-01 +..+ 130-07 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table10_row_r130c3', 'callback': _mywebform_expression_dec_table10_row_r130c3, 'err': '024', 'text': function () { return Drupal.t('Rind 130 col.@col = Rind 130-01 +..+ 130-07 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table10_row_r130c4', 'callback': _mywebform_expression_dec_table10_row_r130c4, 'err': '024', 'text': function () { return Drupal.t('Rind 130 col.@col = Rind 130-01 +..+ 130-07 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table10_row_r130c5', 'callback': _mywebform_expression_dec_table10_row_r130c5, 'err': '024', 'text': function () { return Drupal.t('Rind 130 col.@col = Rind 130-01 +..+ 130-07 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table10_row_r130c6', 'callback': _mywebform_expression_dec_table10_row_r130c6, 'err': '024', 'text': function () { return Drupal.t('Rind 130 col.@col = Rind 130-01 +..+ 130-07 col.@col.', { '@col': 6 }); } },

            // Cap. 2, Row 140.
            { 'rezField': 'dec_table11_row_r140c1', 'callback': _mywebform_expression_dec_table11_row_r140c1, 'err': '025', 'text': function () { return Drupal.t('Rind 140 col.@col = Rind 140-01 +..+ 140-07 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table11_row_r140c2', 'callback': _mywebform_expression_dec_table11_row_r140c2, 'err': '025', 'text': function () { return Drupal.t('Rind 140 col.@col = Rind 140-01 +..+ 140-07 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table11_row_r140c3', 'callback': _mywebform_expression_dec_table11_row_r140c3, 'err': '025', 'text': function () { return Drupal.t('Rind 140 col.@col = Rind 140-01 +..+ 140-07 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table11_row_r140c4', 'callback': _mywebform_expression_dec_table11_row_r140c4, 'err': '025', 'text': function () { return Drupal.t('Rind 140 col.@col = Rind 140-01 +..+ 140-07 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table11_row_r140c5', 'callback': _mywebform_expression_dec_table11_row_r140c5, 'err': '025', 'text': function () { return Drupal.t('Rind 140 col.@col = Rind 140-01 +..+ 140-07 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table11_row_r140c6', 'callback': _mywebform_expression_dec_table11_row_r140c6, 'err': '025', 'text': function () { return Drupal.t('Rind 140 col.@col = Rind 140-01 +..+ 140-07 col.@col.', { '@col': 6 }); } },

            // Cap. 5, Row 500.
            { 'rezField': 'dec_table12_row500_totalc1', 'callback': _mywebform_expression_dec_table12_row500_totalc1, 'err': '030', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 500-978 +..+ 500-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row500_totalc2', 'callback': _mywebform_expression_dec_table12_row500_totalc2, 'err': '030', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 500-978 +..+ 500-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row500_totalc3', 'callback': _mywebform_expression_dec_table12_row500_totalc3, 'err': '030', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 500-978 +..+ 500-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row500_totalc4', 'callback': _mywebform_expression_dec_table12_row500_totalc4, 'err': '030', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 500-978 +..+ 500-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 501.
            { 'rezField': 'dec_table12_row501_totalc1', 'callback': _mywebform_expression_dec_table12_row501_totalc1, 'err': '031', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 501-978 +..+ 501-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row501_totalc2', 'callback': _mywebform_expression_dec_table12_row501_totalc2, 'err': '031', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 501-978 +..+ 501-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row501_totalc3', 'callback': _mywebform_expression_dec_table12_row501_totalc3, 'err': '031', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 501-978 +..+ 501-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row501_totalc4', 'callback': _mywebform_expression_dec_table12_row501_totalc4, 'err': '031', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 501-978 +..+ 501-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 510.
            { 'rezField': 'dec_table12_row510_totalc1', 'callback': _mywebform_expression_dec_table12_row510_totalc1, 'err': '580', 'text': function () { return Drupal.t('Rind 510 col.@col = Rind. 510-978 +..+ 510-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row510_totalc2', 'callback': _mywebform_expression_dec_table12_row510_totalc2, 'err': '580', 'text': function () { return Drupal.t('Rind 510 col.@col = Rind. 510-978 +..+ 510-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row510_totalc3', 'callback': _mywebform_expression_dec_table12_row510_totalc3, 'err': '580', 'text': function () { return Drupal.t('Rind 510 col.@col = Rind. 510-978 +..+ 510-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row510_totalc4', 'callback': _mywebform_expression_dec_table12_row510_totalc4, 'err': '580', 'text': function () { return Drupal.t('Rind 510 col.@col = Rind. 510-978 +..+ 510-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 511.
            { 'rezField': 'dec_table12_row511_totalc1', 'callback': _mywebform_expression_dec_table12_row511_totalc1, 'err': '033', 'text': function () { return Drupal.t('Rind 511 col.@col = Rind. 511-978 +..+ 511-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row511_totalc2', 'callback': _mywebform_expression_dec_table12_row511_totalc2, 'err': '033', 'text': function () { return Drupal.t('Rind 511 col.@col = Rind. 511-978 +..+ 511-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row511_totalc3', 'callback': _mywebform_expression_dec_table12_row511_totalc3, 'err': '033', 'text': function () { return Drupal.t('Rind 511 col.@col = Rind. 511-978 +..+ 511-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row511_totalc4', 'callback': _mywebform_expression_dec_table12_row511_totalc4, 'err': '033', 'text': function () { return Drupal.t('Rind 511 col.@col = Rind. 511-978 +..+ 511-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 520.
            { 'rezField': 'dec_table12_row520_totalc1', 'callback': _mywebform_expression_dec_table12_row520_totalc1, 'err': '034', 'text': function () { return Drupal.t('Rind 520 col.@col = Rind. 520-978 +..+ 520-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row520_totalc2', 'callback': _mywebform_expression_dec_table12_row520_totalc2, 'err': '034', 'text': function () { return Drupal.t('Rind 520 col.@col = Rind. 520-978 +..+ 520-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row520_totalc3', 'callback': _mywebform_expression_dec_table12_row520_totalc3, 'err': '034', 'text': function () { return Drupal.t('Rind 520 col.@col = Rind. 520-978 +..+ 520-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row520_totalc4', 'callback': _mywebform_expression_dec_table12_row520_totalc4, 'err': '034', 'text': function () { return Drupal.t('Rind 520 col.@col = Rind. 520-978 +..+ 520-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 521.
            { 'rezField': 'dec_table12_row521_totalc1', 'callback': _mywebform_expression_dec_table12_row521_totalc1, 'err': '035', 'text': function () { return Drupal.t('Rind 521 col.@col = Rind. 521-978 +..+ 521-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row521_totalc2', 'callback': _mywebform_expression_dec_table12_row521_totalc2, 'err': '035', 'text': function () { return Drupal.t('Rind 521 col.@col = Rind. 521-978 +..+ 521-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row521_totalc3', 'callback': _mywebform_expression_dec_table12_row521_totalc3, 'err': '035', 'text': function () { return Drupal.t('Rind 521 col.@col = Rind. 521-978 +..+ 521-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row521_totalc4', 'callback': _mywebform_expression_dec_table12_row521_totalc4, 'err': '035', 'text': function () { return Drupal.t('Rind 521 col.@col = Rind. 521-978 +..+ 521-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 530.
            { 'rezField': 'dec_table12_row530_totalc1', 'callback': _mywebform_expression_dec_table12_row530_totalc1, 'err': '036', 'text': function () { return Drupal.t('Rind 530 col.@col = Rind. 530-978 +..+ 530-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row530_totalc2', 'callback': _mywebform_expression_dec_table12_row530_totalc2, 'err': '036', 'text': function () { return Drupal.t('Rind 530 col.@col = Rind. 530-978 +..+ 530-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row530_totalc3', 'callback': _mywebform_expression_dec_table12_row530_totalc3, 'err': '036', 'text': function () { return Drupal.t('Rind 530 col.@col = Rind. 530-978 +..+ 530-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row530_totalc4', 'callback': _mywebform_expression_dec_table12_row530_totalc4, 'err': '036', 'text': function () { return Drupal.t('Rind 530 col.@col = Rind. 530-978 +..+ 530-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 531.
            { 'rezField': 'dec_table12_row531_totalc1', 'callback': _mywebform_expression_dec_table12_row531_totalc1, 'err': '037', 'text': function () { return Drupal.t('Rind 531 col.@col = Rind. 531-978 +..+ 531-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row531_totalc2', 'callback': _mywebform_expression_dec_table12_row531_totalc2, 'err': '037', 'text': function () { return Drupal.t('Rind 531 col.@col = Rind. 531-978 +..+ 531-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row531_totalc3', 'callback': _mywebform_expression_dec_table12_row531_totalc3, 'err': '037', 'text': function () { return Drupal.t('Rind 531 col.@col = Rind. 531-978 +..+ 531-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row531_totalc4', 'callback': _mywebform_expression_dec_table12_row531_totalc4, 'err': '037', 'text': function () { return Drupal.t('Rind 531 col.@col = Rind. 531-978 +..+ 531-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 540.
            { 'rezField': 'dec_table12_row540_totalc1', 'callback': _mywebform_expression_dec_table12_row540_totalc1, 'err': '038', 'text': function () { return Drupal.t('Rind 540 col.@col = Rind. 540-978 +..+ 540-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row540_totalc2', 'callback': _mywebform_expression_dec_table12_row540_totalc2, 'err': '038', 'text': function () { return Drupal.t('Rind 540 col.@col = Rind. 540-978 +..+ 540-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row540_totalc3', 'callback': _mywebform_expression_dec_table12_row540_totalc3, 'err': '038', 'text': function () { return Drupal.t('Rind 540 col.@col = Rind. 540-978 +..+ 540-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row540_totalc4', 'callback': _mywebform_expression_dec_table12_row540_totalc4, 'err': '038', 'text': function () { return Drupal.t('Rind 540 col.@col = Rind. 540-978 +..+ 540-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 541.
            { 'rezField': 'dec_table12_row541_totalc1', 'callback': _mywebform_expression_dec_table12_row541_totalc1, 'err': '039', 'text': function () { return Drupal.t('Rind 541 col.@col = Rind. 541-978 +..+ 541-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row541_totalc2', 'callback': _mywebform_expression_dec_table12_row541_totalc2, 'err': '039', 'text': function () { return Drupal.t('Rind 541 col.@col = Rind. 541-978 +..+ 541-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row541_totalc3', 'callback': _mywebform_expression_dec_table12_row541_totalc3, 'err': '039', 'text': function () { return Drupal.t('Rind 541 col.@col = Rind. 541-978 +..+ 541-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row541_totalc4', 'callback': _mywebform_expression_dec_table12_row541_totalc4, 'err': '039', 'text': function () { return Drupal.t('Rind 541 col.@col = Rind. 541-978 +..+ 541-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 550.
            { 'rezField': 'dec_table12_row550_totalc1', 'callback': _mywebform_expression_dec_table12_row550_totalc1, 'err': '040', 'text': function () { return Drupal.t('Rind 550 col.@col = Rind. 550-978 +..+ 550-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row550_totalc2', 'callback': _mywebform_expression_dec_table12_row550_totalc2, 'err': '040', 'text': function () { return Drupal.t('Rind 550 col.@col = Rind. 550-978 +..+ 550-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row550_totalc3', 'callback': _mywebform_expression_dec_table12_row550_totalc3, 'err': '040', 'text': function () { return Drupal.t('Rind 550 col.@col = Rind. 550-978 +..+ 550-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row550_totalc4', 'callback': _mywebform_expression_dec_table12_row550_totalc4, 'err': '040', 'text': function () { return Drupal.t('Rind 550 col.@col = Rind. 550-978 +..+ 550-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 551.
            { 'rezField': 'dec_table12_row551_totalc1', 'callback': _mywebform_expression_dec_table12_row551_totalc1, 'err': '041', 'text': function () { return Drupal.t('Rind 551 col.@col = Rind. 551-978 +..+ 551-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row551_totalc2', 'callback': _mywebform_expression_dec_table12_row551_totalc2, 'err': '041', 'text': function () { return Drupal.t('Rind 551 col.@col = Rind. 551-978 +..+ 551-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row551_totalc3', 'callback': _mywebform_expression_dec_table12_row551_totalc3, 'err': '041', 'text': function () { return Drupal.t('Rind 551 col.@col = Rind. 551-978 +..+ 551-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row551_totalc4', 'callback': _mywebform_expression_dec_table12_row551_totalc4, 'err': '041', 'text': function () { return Drupal.t('Rind 551 col.@col = Rind. 551-978 +..+ 551-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 560.
            { 'rezField': 'dec_table12_row560_totalc1', 'callback': _mywebform_expression_dec_table12_row560_totalc1, 'err': '042', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 560-978 +..+ 560-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row560_totalc2', 'callback': _mywebform_expression_dec_table12_row560_totalc2, 'err': '042', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 560-978 +..+ 560-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row560_totalc3', 'callback': _mywebform_expression_dec_table12_row560_totalc3, 'err': '042', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 560-978 +..+ 560-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row560_totalc4', 'callback': _mywebform_expression_dec_table12_row560_totalc4, 'err': '042', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 560-978 +..+ 560-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 561.
            { 'rezField': 'dec_table12_row561_totalc1', 'callback': _mywebform_expression_dec_table12_row561_totalc1, 'err': '043', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 561-978 +..+ 561-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row561_totalc2', 'callback': _mywebform_expression_dec_table12_row561_totalc2, 'err': '043', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 561-978 +..+ 561-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row561_totalc3', 'callback': _mywebform_expression_dec_table12_row561_totalc3, 'err': '043', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 561-978 +..+ 561-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row561_totalc4', 'callback': _mywebform_expression_dec_table12_row561_totalc4, 'err': '043', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 561-978 +..+ 561-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 570.
            { 'rezField': 'dec_table12_row570_totalc1', 'callback': _mywebform_expression_dec_table12_row570_totalc1, 'err': '044', 'text': function () { return Drupal.t('Rind 570 col.@col = Rind. 570-978 +..+ 570-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row570_totalc2', 'callback': _mywebform_expression_dec_table12_row570_totalc2, 'err': '044', 'text': function () { return Drupal.t('Rind 570 col.@col = Rind. 570-978 +..+ 570-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row570_totalc3', 'callback': _mywebform_expression_dec_table12_row570_totalc3, 'err': '044', 'text': function () { return Drupal.t('Rind 570 col.@col = Rind. 570-978 +..+ 570-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row570_totalc4', 'callback': _mywebform_expression_dec_table12_row570_totalc4, 'err': '044', 'text': function () { return Drupal.t('Rind 570 col.@col = Rind. 570-978 +..+ 570-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 571.
            { 'rezField': 'dec_table12_row571_totalc1', 'callback': _mywebform_expression_dec_table12_row571_totalc1, 'err': '045', 'text': function () { return Drupal.t('Rind 571 col.@col = Rind. 571-978 +..+ 571-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row571_totalc2', 'callback': _mywebform_expression_dec_table12_row571_totalc2, 'err': '045', 'text': function () { return Drupal.t('Rind 571 col.@col = Rind. 571-978 +..+ 571-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row571_totalc3', 'callback': _mywebform_expression_dec_table12_row571_totalc3, 'err': '045', 'text': function () { return Drupal.t('Rind 571 col.@col = Rind. 571-978 +..+ 571-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row571_totalc4', 'callback': _mywebform_expression_dec_table12_row571_totalc4, 'err': '045', 'text': function () { return Drupal.t('Rind 571 col.@col = Rind. 571-978 +..+ 571-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 580.
            { 'rezField': 'dec_table12_row580_totalc1', 'callback': _mywebform_expression_dec_table12_row580_totalc1, 'err': '046', 'text': function () { return Drupal.t('Rind 580 col.@col = Rind. 580-978 +..+ 580-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row580_totalc2', 'callback': _mywebform_expression_dec_table12_row580_totalc2, 'err': '046', 'text': function () { return Drupal.t('Rind 580 col.@col = Rind. 580-978 +..+ 580-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row580_totalc3', 'callback': _mywebform_expression_dec_table12_row580_totalc3, 'err': '046', 'text': function () { return Drupal.t('Rind 580 col.@col = Rind. 580-978 +..+ 580-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row580_totalc4', 'callback': _mywebform_expression_dec_table12_row580_totalc4, 'err': '046', 'text': function () { return Drupal.t('Rind 580 col.@col = Rind. 580-978 +..+ 580-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 581.
            { 'rezField': 'dec_table12_row581_totalc1', 'callback': _mywebform_expression_dec_table12_row581_totalc1, 'err': '047', 'text': function () { return Drupal.t('Rind 581 col.@col = Rind. 581-978 +..+ 581-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row581_totalc2', 'callback': _mywebform_expression_dec_table12_row581_totalc2, 'err': '047', 'text': function () { return Drupal.t('Rind 581 col.@col = Rind. 581-978 +..+ 581-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row581_totalc3', 'callback': _mywebform_expression_dec_table12_row581_totalc3, 'err': '047', 'text': function () { return Drupal.t('Rind 581 col.@col = Rind. 581-978 +..+ 581-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row581_totalc4', 'callback': _mywebform_expression_dec_table12_row581_totalc4, 'err': '047', 'text': function () { return Drupal.t('Rind 581 col.@col = Rind. 581-978 +..+ 581-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 590.
            { 'rezField': 'dec_table12_row590_totalc1', 'callback': _mywebform_expression_dec_table12_row590_totalc1, 'err': '048', 'text': function () { return Drupal.t('Rind 590 col.@col = Rind. 590-978 +..+ 590-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row590_totalc2', 'callback': _mywebform_expression_dec_table12_row590_totalc2, 'err': '048', 'text': function () { return Drupal.t('Rind 590 col.@col = Rind. 590-978 +..+ 590-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row590_totalc3', 'callback': _mywebform_expression_dec_table12_row590_totalc3, 'err': '048', 'text': function () { return Drupal.t('Rind 590 col.@col = Rind. 590-978 +..+ 590-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row590_totalc4', 'callback': _mywebform_expression_dec_table12_row590_totalc4, 'err': '048', 'text': function () { return Drupal.t('Rind 590 col.@col = Rind. 590-978 +..+ 590-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 591.
            { 'rezField': 'dec_table12_row591_totalc1', 'callback': _mywebform_expression_dec_table12_row591_totalc1, 'err': '049', 'text': function () { return Drupal.t('Rind 591 col.@col = Rind. 591-978 +..+ 591-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row591_totalc2', 'callback': _mywebform_expression_dec_table12_row591_totalc2, 'err': '049', 'text': function () { return Drupal.t('Rind 591 col.@col = Rind. 591-978 +..+ 591-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row591_totalc3', 'callback': _mywebform_expression_dec_table12_row591_totalc3, 'err': '049', 'text': function () { return Drupal.t('Rind 591 col.@col = Rind. 591-978 +..+ 591-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row591_totalc4', 'callback': _mywebform_expression_dec_table12_row591_totalc4, 'err': '049', 'text': function () { return Drupal.t('Rind 591 col.@col = Rind. 591-978 +..+ 591-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 600.
            { 'rezField': 'dec_table12_row600_totalc1', 'callback': _mywebform_expression_dec_table12_row600_totalc1, 'err': '050', 'text': function () { return Drupal.t('Rind 600 col.@col = Rind. 600-978 +..+ 600-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row600_totalc2', 'callback': _mywebform_expression_dec_table12_row600_totalc2, 'err': '050', 'text': function () { return Drupal.t('Rind 600 col.@col = Rind. 600-978 +..+ 600-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row600_totalc3', 'callback': _mywebform_expression_dec_table12_row600_totalc3, 'err': '050', 'text': function () { return Drupal.t('Rind 600 col.@col = Rind. 600-978 +..+ 600-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row600_totalc4', 'callback': _mywebform_expression_dec_table12_row600_totalc4, 'err': '050', 'text': function () { return Drupal.t('Rind 600 col.@col = Rind. 600-978 +..+ 600-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 601.
            { 'rezField': 'dec_table12_row601_totalc1', 'callback': _mywebform_expression_dec_table12_row601_totalc1, 'err': '051', 'text': function () { return Drupal.t('Rind 601 col.@col = Rind. 601-978 +..+ 601-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row601_totalc2', 'callback': _mywebform_expression_dec_table12_row601_totalc2, 'err': '051', 'text': function () { return Drupal.t('Rind 601 col.@col = Rind. 601-978 +..+ 601-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row601_totalc3', 'callback': _mywebform_expression_dec_table12_row601_totalc3, 'err': '051', 'text': function () { return Drupal.t('Rind 601 col.@col = Rind. 601-978 +..+ 601-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row601_totalc4', 'callback': _mywebform_expression_dec_table12_row601_totalc4, 'err': '051', 'text': function () { return Drupal.t('Rind 601 col.@col = Rind. 601-978 +..+ 601-999 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 500, currency rows
            { 'rezField': 'dec_table12_row500_v978c1', 'callback': _mywebform_expression_dec_table12_row500_v978c1, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row500_v840c1', 'callback': _mywebform_expression_dec_table12_row500_v840c1, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row500_v642c1', 'callback': _mywebform_expression_dec_table12_row500_v642c1, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row500_v643c1', 'callback': _mywebform_expression_dec_table12_row500_v643c1, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row500_v999c1', 'callback': _mywebform_expression_dec_table12_row500_v999c1, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row500_v978c2', 'callback': _mywebform_expression_dec_table12_row500_v978c2, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row500_v840c2', 'callback': _mywebform_expression_dec_table12_row500_v840c2, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row500_v642c2', 'callback': _mywebform_expression_dec_table12_row500_v642c2, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row500_v643c2', 'callback': _mywebform_expression_dec_table12_row500_v643c2, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row500_v999c2', 'callback': _mywebform_expression_dec_table12_row500_v999c2, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row500_v978c3', 'callback': _mywebform_expression_dec_table12_row500_v978c3, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row500_v840c3', 'callback': _mywebform_expression_dec_table12_row500_v840c3, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row500_v642c3', 'callback': _mywebform_expression_dec_table12_row500_v642c3, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row500_v643c3', 'callback': _mywebform_expression_dec_table12_row500_v643c3, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row500_v999c3', 'callback': _mywebform_expression_dec_table12_row500_v999c3, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row500_v978c4', 'callback': _mywebform_expression_dec_table12_row500_v978c4, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row500_v840c4', 'callback': _mywebform_expression_dec_table12_row500_v840c4, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row500_v642c4', 'callback': _mywebform_expression_dec_table12_row500_v642c4, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row500_v643c4', 'callback': _mywebform_expression_dec_table12_row500_v643c4, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row500_v999c4', 'callback': _mywebform_expression_dec_table12_row500_v999c4, 'err': '052', 'text': function () { return Drupal.t('Rind 500 col.@col = Rind. 510 + Rind. 520 + Rind. 530 + Rind. 540 + Rind. 550 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 501, currency rows
            { 'rezField': 'dec_table12_row501_v978c1', 'callback': _mywebform_expression_dec_table12_row501_v978c1, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row501_v840c1', 'callback': _mywebform_expression_dec_table12_row501_v840c1, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row501_v642c1', 'callback': _mywebform_expression_dec_table12_row501_v642c1, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row501_v643c1', 'callback': _mywebform_expression_dec_table12_row501_v643c1, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row501_v999c1', 'callback': _mywebform_expression_dec_table12_row501_v999c1, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row501_v978c2', 'callback': _mywebform_expression_dec_table12_row501_v978c2, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row501_v840c2', 'callback': _mywebform_expression_dec_table12_row501_v840c2, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row501_v642c2', 'callback': _mywebform_expression_dec_table12_row501_v642c2, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row501_v643c2', 'callback': _mywebform_expression_dec_table12_row501_v643c2, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row501_v999c2', 'callback': _mywebform_expression_dec_table12_row501_v999c2, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row501_v978c3', 'callback': _mywebform_expression_dec_table12_row501_v978c3, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row501_v840c3', 'callback': _mywebform_expression_dec_table12_row501_v840c3, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row501_v642c3', 'callback': _mywebform_expression_dec_table12_row501_v642c3, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row501_v643c3', 'callback': _mywebform_expression_dec_table12_row501_v643c3, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row501_v999c3', 'callback': _mywebform_expression_dec_table12_row501_v999c3, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row501_v978c4', 'callback': _mywebform_expression_dec_table12_row501_v978c4, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row501_v840c4', 'callback': _mywebform_expression_dec_table12_row501_v840c4, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row501_v642c4', 'callback': _mywebform_expression_dec_table12_row501_v642c4, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row501_v643c4', 'callback': _mywebform_expression_dec_table12_row501_v643c4, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row501_v999c4', 'callback': _mywebform_expression_dec_table12_row501_v999c4, 'err': '053', 'text': function () { return Drupal.t('Rind 501 col.@col = Rind. 511 + Rind. 521 + Rind. 531 + Rind. 541 + Rind. 551 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 560, currency rows
            { 'rezField': 'dec_table12_row560_v978c1', 'callback': _mywebform_expression_dec_table12_row560_v978c1, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row560_v840c1', 'callback': _mywebform_expression_dec_table12_row560_v840c1, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row560_v642c1', 'callback': _mywebform_expression_dec_table12_row560_v642c1, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row560_v643c1', 'callback': _mywebform_expression_dec_table12_row560_v643c1, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row560_v999c1', 'callback': _mywebform_expression_dec_table12_row560_v999c1, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row560_v978c2', 'callback': _mywebform_expression_dec_table12_row560_v978c2, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row560_v840c2', 'callback': _mywebform_expression_dec_table12_row560_v840c2, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row560_v642c2', 'callback': _mywebform_expression_dec_table12_row560_v642c2, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row560_v643c2', 'callback': _mywebform_expression_dec_table12_row560_v643c2, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row560_v999c2', 'callback': _mywebform_expression_dec_table12_row560_v999c2, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row560_v978c3', 'callback': _mywebform_expression_dec_table12_row560_v978c3, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row560_v840c3', 'callback': _mywebform_expression_dec_table12_row560_v840c3, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row560_v642c3', 'callback': _mywebform_expression_dec_table12_row560_v642c3, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row560_v643c3', 'callback': _mywebform_expression_dec_table12_row560_v643c3, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row560_v999c3', 'callback': _mywebform_expression_dec_table12_row560_v999c3, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row560_v978c4', 'callback': _mywebform_expression_dec_table12_row560_v978c4, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row560_v840c4', 'callback': _mywebform_expression_dec_table12_row560_v840c4, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row560_v642c4', 'callback': _mywebform_expression_dec_table12_row560_v642c4, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row560_v643c4', 'callback': _mywebform_expression_dec_table12_row560_v643c4, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row560_v999c4', 'callback': _mywebform_expression_dec_table12_row560_v999c4, 'err': '054', 'text': function () { return Drupal.t('Rind 560 col.@col = Rind. 570 + Rind. 580 + Rind. 590 + Rind. 600 col.@col.', { '@col': 4 }); } },

            // Cap. 5, Row 561, currency rows
            { 'rezField': 'dec_table12_row561_v978c1', 'callback': _mywebform_expression_dec_table12_row561_v978c1, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row561_v840c1', 'callback': _mywebform_expression_dec_table12_row561_v840c1, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row561_v642c1', 'callback': _mywebform_expression_dec_table12_row561_v642c1, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row561_v643c1', 'callback': _mywebform_expression_dec_table12_row561_v643c1, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row561_v999c1', 'callback': _mywebform_expression_dec_table12_row561_v999c1, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table12_row561_v978c2', 'callback': _mywebform_expression_dec_table12_row561_v978c2, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row561_v840c2', 'callback': _mywebform_expression_dec_table12_row561_v840c2, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row561_v642c2', 'callback': _mywebform_expression_dec_table12_row561_v642c2, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row561_v643c2', 'callback': _mywebform_expression_dec_table12_row561_v643c2, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row561_v999c2', 'callback': _mywebform_expression_dec_table12_row561_v999c2, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table12_row561_v978c3', 'callback': _mywebform_expression_dec_table12_row561_v978c3, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row561_v840c3', 'callback': _mywebform_expression_dec_table12_row561_v840c3, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row561_v642c3', 'callback': _mywebform_expression_dec_table12_row561_v642c3, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row561_v643c3', 'callback': _mywebform_expression_dec_table12_row561_v643c3, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row561_v999c3', 'callback': _mywebform_expression_dec_table12_row561_v999c3, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table12_row561_v978c4', 'callback': _mywebform_expression_dec_table12_row561_v978c4, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row561_v840c4', 'callback': _mywebform_expression_dec_table12_row561_v840c4, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row561_v642c4', 'callback': _mywebform_expression_dec_table12_row561_v642c4, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row561_v643c4', 'callback': _mywebform_expression_dec_table12_row561_v643c4, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table12_row561_v999c4', 'callback': _mywebform_expression_dec_table12_row561_v999c4, 'err': '055', 'text': function () { return Drupal.t('Rind 561 col.@col = Rind. 571 + Rind. 581 + Rind. 591 + Rind. 601 col.@col.', { '@col': 4 }); } },


            // Cap 5, Row 500, col. 5
            { 'rezField': 'dec_table12_row500_totalc5', 'callback': _mywebform_expression_dec_table12_row500_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 500 }); } },
            { 'rezField': 'dec_table12_row500_v978c5', 'callback': _mywebform_expression_dec_table12_row500_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '500-978' }); } },
            { 'rezField': 'dec_table12_row500_v840c5', 'callback': _mywebform_expression_dec_table12_row500_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '500-840' }); } },
            { 'rezField': 'dec_table12_row500_v642c5', 'callback': _mywebform_expression_dec_table12_row500_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '500-642' }); } },
            { 'rezField': 'dec_table12_row500_v643c5', 'callback': _mywebform_expression_dec_table12_row500_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '500-643' }); } },
            { 'rezField': 'dec_table12_row500_v999c5', 'callback': _mywebform_expression_dec_table12_row500_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '500-999' }); } },

            // Cap 5, Row 501, col. 5
            { 'rezField': 'dec_table12_row501_totalc5', 'callback': _mywebform_expression_dec_table12_row501_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 501 }); } },
            { 'rezField': 'dec_table12_row501_v978c5', 'callback': _mywebform_expression_dec_table12_row501_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '501-978' }); } },
            { 'rezField': 'dec_table12_row501_v840c5', 'callback': _mywebform_expression_dec_table12_row501_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '501-840' }); } },
            { 'rezField': 'dec_table12_row501_v642c5', 'callback': _mywebform_expression_dec_table12_row501_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '501-642' }); } },
            { 'rezField': 'dec_table12_row501_v643c5', 'callback': _mywebform_expression_dec_table12_row501_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '501-643' }); } },
            { 'rezField': 'dec_table12_row501_v999c5', 'callback': _mywebform_expression_dec_table12_row501_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '501-999' }); } },

            // Cap 5, Row 510, col. 5
            { 'rezField': 'dec_table12_row510_totalc5', 'callback': _mywebform_expression_dec_table12_row510_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 510 }); } },
            { 'rezField': 'dec_table12_row510_v978c5', 'callback': _mywebform_expression_dec_table12_row510_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '510-978' }); } },
            { 'rezField': 'dec_table12_row510_v840c5', 'callback': _mywebform_expression_dec_table12_row510_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '510-840' }); } },
            { 'rezField': 'dec_table12_row510_v642c5', 'callback': _mywebform_expression_dec_table12_row510_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '510-642' }); } },
            { 'rezField': 'dec_table12_row510_v643c5', 'callback': _mywebform_expression_dec_table12_row510_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '510-643' }); } },
            { 'rezField': 'dec_table12_row510_v999c5', 'callback': _mywebform_expression_dec_table12_row510_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '510-999' }); } },

            // Cap 5, Row 511, col. 5
            { 'rezField': 'dec_table12_row511_totalc5', 'callback': _mywebform_expression_dec_table12_row511_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 511 }); } },
            { 'rezField': 'dec_table12_row511_v978c5', 'callback': _mywebform_expression_dec_table12_row511_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '511-978' }); } },
            { 'rezField': 'dec_table12_row511_v840c5', 'callback': _mywebform_expression_dec_table12_row511_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '511-840' }); } },
            { 'rezField': 'dec_table12_row511_v642c5', 'callback': _mywebform_expression_dec_table12_row511_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '511-642' }); } },
            { 'rezField': 'dec_table12_row511_v643c5', 'callback': _mywebform_expression_dec_table12_row511_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '511-643' }); } },
            { 'rezField': 'dec_table12_row511_v999c5', 'callback': _mywebform_expression_dec_table12_row511_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '511-999' }); } },

            // Cap 5, Row 520, col. 5
            { 'rezField': 'dec_table12_row520_totalc5', 'callback': _mywebform_expression_dec_table12_row520_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 520 }); } },
            { 'rezField': 'dec_table12_row520_v978c5', 'callback': _mywebform_expression_dec_table12_row520_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '520-978' }); } },
            { 'rezField': 'dec_table12_row520_v840c5', 'callback': _mywebform_expression_dec_table12_row520_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '520-840' }); } },
            { 'rezField': 'dec_table12_row520_v642c5', 'callback': _mywebform_expression_dec_table12_row520_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '520-642' }); } },
            { 'rezField': 'dec_table12_row520_v643c5', 'callback': _mywebform_expression_dec_table12_row520_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '520-643' }); } },
            { 'rezField': 'dec_table12_row520_v999c5', 'callback': _mywebform_expression_dec_table12_row520_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '520-999' }); } },

            // Cap 5, Row 521, col. 5
            { 'rezField': 'dec_table12_row521_totalc5', 'callback': _mywebform_expression_dec_table12_row521_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 521 }); } },
            { 'rezField': 'dec_table12_row521_v978c5', 'callback': _mywebform_expression_dec_table12_row521_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '521-978' }); } },
            { 'rezField': 'dec_table12_row521_v840c5', 'callback': _mywebform_expression_dec_table12_row521_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '521-840' }); } },
            { 'rezField': 'dec_table12_row521_v642c5', 'callback': _mywebform_expression_dec_table12_row521_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '521-642' }); } },
            { 'rezField': 'dec_table12_row521_v643c5', 'callback': _mywebform_expression_dec_table12_row521_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '521-643' }); } },
            { 'rezField': 'dec_table12_row521_v999c5', 'callback': _mywebform_expression_dec_table12_row521_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '521-999' }); } },

            // Cap 5, Row 530, col. 5
            { 'rezField': 'dec_table12_row530_totalc5', 'callback': _mywebform_expression_dec_table12_row530_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 530 }); } },
            { 'rezField': 'dec_table12_row530_v978c5', 'callback': _mywebform_expression_dec_table12_row530_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '530-978' }); } },
            { 'rezField': 'dec_table12_row530_v840c5', 'callback': _mywebform_expression_dec_table12_row530_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '530-840' }); } },
            { 'rezField': 'dec_table12_row530_v642c5', 'callback': _mywebform_expression_dec_table12_row530_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '530-642' }); } },
            { 'rezField': 'dec_table12_row530_v643c5', 'callback': _mywebform_expression_dec_table12_row530_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '530-643' }); } },
            { 'rezField': 'dec_table12_row530_v999c5', 'callback': _mywebform_expression_dec_table12_row530_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '530-999' }); } },

            // Cap 5, Row 531, col. 5
            { 'rezField': 'dec_table12_row531_totalc5', 'callback': _mywebform_expression_dec_table12_row531_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 531 }); } },
            { 'rezField': 'dec_table12_row531_v978c5', 'callback': _mywebform_expression_dec_table12_row531_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '531-978' }); } },
            { 'rezField': 'dec_table12_row531_v840c5', 'callback': _mywebform_expression_dec_table12_row531_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '531-840' }); } },
            { 'rezField': 'dec_table12_row531_v642c5', 'callback': _mywebform_expression_dec_table12_row531_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '531-642' }); } },
            { 'rezField': 'dec_table12_row531_v643c5', 'callback': _mywebform_expression_dec_table12_row531_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '531-643' }); } },
            { 'rezField': 'dec_table12_row531_v999c5', 'callback': _mywebform_expression_dec_table12_row531_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '531-999' }); } },

            // Cap 5, Row 540, col. 5
            { 'rezField': 'dec_table12_row540_totalc5', 'callback': _mywebform_expression_dec_table12_row540_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 540 }); } },
            { 'rezField': 'dec_table12_row540_v978c5', 'callback': _mywebform_expression_dec_table12_row540_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '540-978' }); } },
            { 'rezField': 'dec_table12_row540_v840c5', 'callback': _mywebform_expression_dec_table12_row540_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '540-840' }); } },
            { 'rezField': 'dec_table12_row540_v642c5', 'callback': _mywebform_expression_dec_table12_row540_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '540-642' }); } },
            { 'rezField': 'dec_table12_row540_v643c5', 'callback': _mywebform_expression_dec_table12_row540_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '540-643' }); } },
            { 'rezField': 'dec_table12_row540_v999c5', 'callback': _mywebform_expression_dec_table12_row540_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '540-999' }); } },

            // Cap 5, Row 541, col. 5
            { 'rezField': 'dec_table12_row541_totalc5', 'callback': _mywebform_expression_dec_table12_row541_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 541 }); } },
            { 'rezField': 'dec_table12_row541_v978c5', 'callback': _mywebform_expression_dec_table12_row541_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '541-978' }); } },
            { 'rezField': 'dec_table12_row541_v840c5', 'callback': _mywebform_expression_dec_table12_row541_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '541-840' }); } },
            { 'rezField': 'dec_table12_row541_v642c5', 'callback': _mywebform_expression_dec_table12_row541_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '541-642' }); } },
            { 'rezField': 'dec_table12_row541_v643c5', 'callback': _mywebform_expression_dec_table12_row541_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '541-643' }); } },
            { 'rezField': 'dec_table12_row541_v999c5', 'callback': _mywebform_expression_dec_table12_row541_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '541-999' }); } },

            // Cap 5, Row 550, col. 5
            { 'rezField': 'dec_table12_row550_totalc5', 'callback': _mywebform_expression_dec_table12_row550_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 550 }); } },
            { 'rezField': 'dec_table12_row550_v978c5', 'callback': _mywebform_expression_dec_table12_row550_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '550-978' }); } },
            { 'rezField': 'dec_table12_row550_v840c5', 'callback': _mywebform_expression_dec_table12_row550_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '550-840' }); } },
            { 'rezField': 'dec_table12_row550_v642c5', 'callback': _mywebform_expression_dec_table12_row550_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '550-642' }); } },
            { 'rezField': 'dec_table12_row550_v643c5', 'callback': _mywebform_expression_dec_table12_row550_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '550-643' }); } },
            { 'rezField': 'dec_table12_row550_v999c5', 'callback': _mywebform_expression_dec_table12_row550_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '550-999' }); } },

            // Cap 5, Row 551, col. 5
            { 'rezField': 'dec_table12_row551_totalc5', 'callback': _mywebform_expression_dec_table12_row551_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 551 }); } },
            { 'rezField': 'dec_table12_row551_v978c5', 'callback': _mywebform_expression_dec_table12_row551_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '551-978' }); } },
            { 'rezField': 'dec_table12_row551_v840c5', 'callback': _mywebform_expression_dec_table12_row551_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '551-840' }); } },
            { 'rezField': 'dec_table12_row551_v642c5', 'callback': _mywebform_expression_dec_table12_row551_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '551-642' }); } },
            { 'rezField': 'dec_table12_row551_v643c5', 'callback': _mywebform_expression_dec_table12_row551_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '551-643' }); } },
            { 'rezField': 'dec_table12_row551_v999c5', 'callback': _mywebform_expression_dec_table12_row551_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '551-999' }); } },

            // Cap 5, Row 560, col. 5
            { 'rezField': 'dec_table12_row560_totalc5', 'callback': _mywebform_expression_dec_table12_row560_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 560 }); } },
            { 'rezField': 'dec_table12_row560_v978c5', 'callback': _mywebform_expression_dec_table12_row560_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '560-978' }); } },
            { 'rezField': 'dec_table12_row560_v840c5', 'callback': _mywebform_expression_dec_table12_row560_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '560-840' }); } },
            { 'rezField': 'dec_table12_row560_v642c5', 'callback': _mywebform_expression_dec_table12_row560_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '560-642' }); } },
            { 'rezField': 'dec_table12_row560_v643c5', 'callback': _mywebform_expression_dec_table12_row560_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '560-643' }); } },
            { 'rezField': 'dec_table12_row560_v999c5', 'callback': _mywebform_expression_dec_table12_row560_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '560-999' }); } },

            // Cap 5, Row 561, col. 5
            { 'rezField': 'dec_table12_row561_totalc5', 'callback': _mywebform_expression_dec_table12_row561_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 561 }); } },
            { 'rezField': 'dec_table12_row561_v978c5', 'callback': _mywebform_expression_dec_table12_row561_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '561-978' }); } },
            { 'rezField': 'dec_table12_row561_v840c5', 'callback': _mywebform_expression_dec_table12_row561_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '561-840' }); } },
            { 'rezField': 'dec_table12_row561_v642c5', 'callback': _mywebform_expression_dec_table12_row561_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '561-642' }); } },
            { 'rezField': 'dec_table12_row561_v643c5', 'callback': _mywebform_expression_dec_table12_row561_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '561-643' }); } },
            { 'rezField': 'dec_table12_row561_v999c5', 'callback': _mywebform_expression_dec_table12_row561_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '561-999' }); } },

            // Cap 5, Row 570, col. 5
            { 'rezField': 'dec_table12_row570_totalc5', 'callback': _mywebform_expression_dec_table12_row570_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 570 }); } },
            { 'rezField': 'dec_table12_row570_v978c5', 'callback': _mywebform_expression_dec_table12_row570_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '570-978' }); } },
            { 'rezField': 'dec_table12_row570_v840c5', 'callback': _mywebform_expression_dec_table12_row570_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '570-840' }); } },
            { 'rezField': 'dec_table12_row570_v642c5', 'callback': _mywebform_expression_dec_table12_row570_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '570-642' }); } },
            { 'rezField': 'dec_table12_row570_v643c5', 'callback': _mywebform_expression_dec_table12_row570_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '570-643' }); } },
            { 'rezField': 'dec_table12_row570_v999c5', 'callback': _mywebform_expression_dec_table12_row570_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '570-999' }); } },

            // Cap 5, Row 571, col. 5
            { 'rezField': 'dec_table12_row571_totalc5', 'callback': _mywebform_expression_dec_table12_row571_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 571 }); } },
            { 'rezField': 'dec_table12_row571_v978c5', 'callback': _mywebform_expression_dec_table12_row571_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '571-978' }); } },
            { 'rezField': 'dec_table12_row571_v840c5', 'callback': _mywebform_expression_dec_table12_row571_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '571-840' }); } },
            { 'rezField': 'dec_table12_row571_v642c5', 'callback': _mywebform_expression_dec_table12_row571_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '571-642' }); } },
            { 'rezField': 'dec_table12_row571_v643c5', 'callback': _mywebform_expression_dec_table12_row571_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '571-643' }); } },
            { 'rezField': 'dec_table12_row571_v999c5', 'callback': _mywebform_expression_dec_table12_row571_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '571-999' }); } },

            // Cap 5, Row 580, col. 5
            { 'rezField': 'dec_table12_row580_totalc5', 'callback': _mywebform_expression_dec_table12_row580_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 580 }); } },
            { 'rezField': 'dec_table12_row580_v978c5', 'callback': _mywebform_expression_dec_table12_row580_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '580-978' }); } },
            { 'rezField': 'dec_table12_row580_v840c5', 'callback': _mywebform_expression_dec_table12_row580_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '580-840' }); } },
            { 'rezField': 'dec_table12_row580_v642c5', 'callback': _mywebform_expression_dec_table12_row580_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '580-642' }); } },
            { 'rezField': 'dec_table12_row580_v643c5', 'callback': _mywebform_expression_dec_table12_row580_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '580-643' }); } },
            { 'rezField': 'dec_table12_row580_v999c5', 'callback': _mywebform_expression_dec_table12_row580_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '580-999' }); } },

            // Cap 5, Row 581, col. 5
            { 'rezField': 'dec_table12_row581_totalc5', 'callback': _mywebform_expression_dec_table12_row581_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 581 }); } },
            { 'rezField': 'dec_table12_row581_v978c5', 'callback': _mywebform_expression_dec_table12_row581_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '581-978' }); } },
            { 'rezField': 'dec_table12_row581_v840c5', 'callback': _mywebform_expression_dec_table12_row581_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '581-840' }); } },
            { 'rezField': 'dec_table12_row581_v642c5', 'callback': _mywebform_expression_dec_table12_row581_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '581-642' }); } },
            { 'rezField': 'dec_table12_row581_v643c5', 'callback': _mywebform_expression_dec_table12_row581_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '581-643' }); } },
            { 'rezField': 'dec_table12_row581_v999c5', 'callback': _mywebform_expression_dec_table12_row581_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '581-999' }); } },

            // Cap 5, Row 590, col. 5
            { 'rezField': 'dec_table12_row590_totalc5', 'callback': _mywebform_expression_dec_table12_row590_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 590 }); } },
            { 'rezField': 'dec_table12_row590_v978c5', 'callback': _mywebform_expression_dec_table12_row590_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '590-978' }); } },
            { 'rezField': 'dec_table12_row590_v840c5', 'callback': _mywebform_expression_dec_table12_row590_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '590-840' }); } },
            { 'rezField': 'dec_table12_row590_v642c5', 'callback': _mywebform_expression_dec_table12_row590_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '590-642' }); } },
            { 'rezField': 'dec_table12_row590_v643c5', 'callback': _mywebform_expression_dec_table12_row590_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '590-643' }); } },
            { 'rezField': 'dec_table12_row590_v999c5', 'callback': _mywebform_expression_dec_table12_row590_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '590-999' }); } },

            // Cap 5, Row 591, col. 5
            { 'rezField': 'dec_table12_row591_totalc5', 'callback': _mywebform_expression_dec_table12_row591_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 591 }); } },
            { 'rezField': 'dec_table12_row591_v978c5', 'callback': _mywebform_expression_dec_table12_row591_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '591-978' }); } },
            { 'rezField': 'dec_table12_row591_v840c5', 'callback': _mywebform_expression_dec_table12_row591_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '591-840' }); } },
            { 'rezField': 'dec_table12_row591_v642c5', 'callback': _mywebform_expression_dec_table12_row591_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '591-642' }); } },
            { 'rezField': 'dec_table12_row591_v643c5', 'callback': _mywebform_expression_dec_table12_row591_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '591-643' }); } },
            { 'rezField': 'dec_table12_row591_v999c5', 'callback': _mywebform_expression_dec_table12_row591_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '591-999' }); } },

            // Cap 5, Row 600, col. 5
            { 'rezField': 'dec_table12_row600_totalc5', 'callback': _mywebform_expression_dec_table12_row600_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 600 }); } },
            { 'rezField': 'dec_table12_row600_v978c5', 'callback': _mywebform_expression_dec_table12_row600_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '600-978' }); } },
            { 'rezField': 'dec_table12_row600_v840c5', 'callback': _mywebform_expression_dec_table12_row600_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '600-840' }); } },
            { 'rezField': 'dec_table12_row600_v642c5', 'callback': _mywebform_expression_dec_table12_row600_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '600-642' }); } },
            { 'rezField': 'dec_table12_row600_v643c5', 'callback': _mywebform_expression_dec_table12_row600_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '600-643' }); } },
            { 'rezField': 'dec_table12_row600_v999c5', 'callback': _mywebform_expression_dec_table12_row600_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '600-999' }); } },

            // Cap 5, Row 601, col. 5
            { 'rezField': 'dec_table12_row601_totalc5', 'callback': _mywebform_expression_dec_table12_row601_totalc5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': 601 }); } },
            { 'rezField': 'dec_table12_row601_v978c5', 'callback': _mywebform_expression_dec_table12_row601_v978c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '601-978' }); } },
            { 'rezField': 'dec_table12_row601_v840c5', 'callback': _mywebform_expression_dec_table12_row601_v840c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '601-840' }); } },
            { 'rezField': 'dec_table12_row601_v642c5', 'callback': _mywebform_expression_dec_table12_row601_v642c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '601-642' }); } },
            { 'rezField': 'dec_table12_row601_v643c5', 'callback': _mywebform_expression_dec_table12_row601_v643c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '601-643' }); } },
            { 'rezField': 'dec_table12_row601_v999c5', 'callback': _mywebform_expression_dec_table12_row601_v999c5, 'err': '068', 'text': function () { return Drupal.t('Rind @row col.5 = Rind. @row col.1 + col.2 - col.3 + col.4', { '@row': '601-999' }); } },


            // Cap. 6, Row 700.
            { 'rezField': 'dec_table13_row700_totalc1', 'callback': _mywebform_expression_dec_table13_row700_totalc1, 'err': '070', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 700-978 +..+ 700-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row700_totalc2', 'callback': _mywebform_expression_dec_table13_row700_totalc2, 'err': '070', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 700-978 +..+ 700-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row700_totalc3', 'callback': _mywebform_expression_dec_table13_row700_totalc3, 'err': '070', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 700-978 +..+ 700-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row700_totalc4', 'callback': _mywebform_expression_dec_table13_row700_totalc4, 'err': '070', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 700-978 +..+ 700-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row700_totalc5', 'callback': _mywebform_expression_dec_table13_row700_totalc5, 'err': '070', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 700-978 +..+ 700-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row700_totalc6', 'callback': _mywebform_expression_dec_table13_row700_totalc6, 'err': '070', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 700-978 +..+ 700-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row700_totalc7', 'callback': _mywebform_expression_dec_table13_row700_totalc7, 'err': '070', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 700-978 +..+ 700-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row700_totalc8', 'callback': _mywebform_expression_dec_table13_row700_totalc8, 'err': '070', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 700-978 +..+ 700-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 701.
            { 'rezField': 'dec_table13_row701_totalc1', 'callback': _mywebform_expression_dec_table13_row701_totalc1, 'err': '071', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 701-978 +..+ 701-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row701_totalc2', 'callback': _mywebform_expression_dec_table13_row701_totalc2, 'err': '071', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 701-978 +..+ 701-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row701_totalc3', 'callback': _mywebform_expression_dec_table13_row701_totalc3, 'err': '071', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 701-978 +..+ 701-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row701_totalc4', 'callback': _mywebform_expression_dec_table13_row701_totalc4, 'err': '071', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 701-978 +..+ 701-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row701_totalc5', 'callback': _mywebform_expression_dec_table13_row701_totalc5, 'err': '071', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 701-978 +..+ 701-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row701_totalc6', 'callback': _mywebform_expression_dec_table13_row701_totalc6, 'err': '071', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 701-978 +..+ 701-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row701_totalc7', 'callback': _mywebform_expression_dec_table13_row701_totalc7, 'err': '071', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 701-978 +..+ 701-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row701_totalc8', 'callback': _mywebform_expression_dec_table13_row701_totalc8, 'err': '071', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 701-978 +..+ 701-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 710.
            { 'rezField': 'dec_table13_row710_totalc1', 'callback': _mywebform_expression_dec_table13_row710_totalc1, 'err': '072', 'text': function () { return Drupal.t('Rind 710 col.@col = Rind. 710-978 +..+ 710-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row710_totalc2', 'callback': _mywebform_expression_dec_table13_row710_totalc2, 'err': '072', 'text': function () { return Drupal.t('Rind 710 col.@col = Rind. 710-978 +..+ 710-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row710_totalc3', 'callback': _mywebform_expression_dec_table13_row710_totalc3, 'err': '072', 'text': function () { return Drupal.t('Rind 710 col.@col = Rind. 710-978 +..+ 710-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row710_totalc4', 'callback': _mywebform_expression_dec_table13_row710_totalc4, 'err': '072', 'text': function () { return Drupal.t('Rind 710 col.@col = Rind. 710-978 +..+ 710-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row710_totalc5', 'callback': _mywebform_expression_dec_table13_row710_totalc5, 'err': '072', 'text': function () { return Drupal.t('Rind 710 col.@col = Rind. 710-978 +..+ 710-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row710_totalc6', 'callback': _mywebform_expression_dec_table13_row710_totalc6, 'err': '072', 'text': function () { return Drupal.t('Rind 710 col.@col = Rind. 710-978 +..+ 710-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row710_totalc7', 'callback': _mywebform_expression_dec_table13_row710_totalc7, 'err': '072', 'text': function () { return Drupal.t('Rind 710 col.@col = Rind. 710-978 +..+ 710-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row710_totalc8', 'callback': _mywebform_expression_dec_table13_row710_totalc8, 'err': '072', 'text': function () { return Drupal.t('Rind 710 col.@col = Rind. 710-978 +..+ 710-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 711.
            { 'rezField': 'dec_table13_row711_totalc1', 'callback': _mywebform_expression_dec_table13_row711_totalc1, 'err': '073', 'text': function () { return Drupal.t('Rind 711 col.@col = Rind. 711-978 +..+ 711-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row711_totalc2', 'callback': _mywebform_expression_dec_table13_row711_totalc2, 'err': '073', 'text': function () { return Drupal.t('Rind 711 col.@col = Rind. 711-978 +..+ 711-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row711_totalc3', 'callback': _mywebform_expression_dec_table13_row711_totalc3, 'err': '073', 'text': function () { return Drupal.t('Rind 711 col.@col = Rind. 711-978 +..+ 711-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row711_totalc4', 'callback': _mywebform_expression_dec_table13_row711_totalc4, 'err': '073', 'text': function () { return Drupal.t('Rind 711 col.@col = Rind. 711-978 +..+ 711-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row711_totalc5', 'callback': _mywebform_expression_dec_table13_row711_totalc5, 'err': '073', 'text': function () { return Drupal.t('Rind 711 col.@col = Rind. 711-978 +..+ 711-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row711_totalc6', 'callback': _mywebform_expression_dec_table13_row711_totalc6, 'err': '073', 'text': function () { return Drupal.t('Rind 711 col.@col = Rind. 711-978 +..+ 711-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row711_totalc7', 'callback': _mywebform_expression_dec_table13_row711_totalc7, 'err': '073', 'text': function () { return Drupal.t('Rind 711 col.@col = Rind. 711-978 +..+ 711-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row711_totalc8', 'callback': _mywebform_expression_dec_table13_row711_totalc8, 'err': '073', 'text': function () { return Drupal.t('Rind 711 col.@col = Rind. 711-978 +..+ 711-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 720.
            { 'rezField': 'dec_table13_row720_totalc1', 'callback': _mywebform_expression_dec_table13_row720_totalc1, 'err': '074', 'text': function () { return Drupal.t('Rind 720 col.@col = Rind. 720-978 +..+ 720-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row720_totalc2', 'callback': _mywebform_expression_dec_table13_row720_totalc2, 'err': '074', 'text': function () { return Drupal.t('Rind 720 col.@col = Rind. 720-978 +..+ 720-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row720_totalc3', 'callback': _mywebform_expression_dec_table13_row720_totalc3, 'err': '074', 'text': function () { return Drupal.t('Rind 720 col.@col = Rind. 720-978 +..+ 720-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row720_totalc4', 'callback': _mywebform_expression_dec_table13_row720_totalc4, 'err': '074', 'text': function () { return Drupal.t('Rind 720 col.@col = Rind. 720-978 +..+ 720-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row720_totalc5', 'callback': _mywebform_expression_dec_table13_row720_totalc5, 'err': '074', 'text': function () { return Drupal.t('Rind 720 col.@col = Rind. 720-978 +..+ 720-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row720_totalc6', 'callback': _mywebform_expression_dec_table13_row720_totalc6, 'err': '074', 'text': function () { return Drupal.t('Rind 720 col.@col = Rind. 720-978 +..+ 720-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row720_totalc7', 'callback': _mywebform_expression_dec_table13_row720_totalc7, 'err': '074', 'text': function () { return Drupal.t('Rind 720 col.@col = Rind. 720-978 +..+ 720-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row720_totalc8', 'callback': _mywebform_expression_dec_table13_row720_totalc8, 'err': '074', 'text': function () { return Drupal.t('Rind 720 col.@col = Rind. 720-978 +..+ 720-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 721.
            { 'rezField': 'dec_table13_row721_totalc1', 'callback': _mywebform_expression_dec_table13_row721_totalc1, 'err': '075', 'text': function () { return Drupal.t('Rind 721 col.@col = Rind. 721-978 +..+ 721-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row721_totalc2', 'callback': _mywebform_expression_dec_table13_row721_totalc2, 'err': '075', 'text': function () { return Drupal.t('Rind 721 col.@col = Rind. 721-978 +..+ 721-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row721_totalc3', 'callback': _mywebform_expression_dec_table13_row721_totalc3, 'err': '075', 'text': function () { return Drupal.t('Rind 721 col.@col = Rind. 721-978 +..+ 721-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row721_totalc4', 'callback': _mywebform_expression_dec_table13_row721_totalc4, 'err': '075', 'text': function () { return Drupal.t('Rind 721 col.@col = Rind. 721-978 +..+ 721-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row721_totalc5', 'callback': _mywebform_expression_dec_table13_row721_totalc5, 'err': '075', 'text': function () { return Drupal.t('Rind 721 col.@col = Rind. 721-978 +..+ 721-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row721_totalc6', 'callback': _mywebform_expression_dec_table13_row721_totalc6, 'err': '075', 'text': function () { return Drupal.t('Rind 721 col.@col = Rind. 721-978 +..+ 721-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row721_totalc7', 'callback': _mywebform_expression_dec_table13_row721_totalc7, 'err': '075', 'text': function () { return Drupal.t('Rind 721 col.@col = Rind. 721-978 +..+ 721-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row721_totalc8', 'callback': _mywebform_expression_dec_table13_row721_totalc8, 'err': '075', 'text': function () { return Drupal.t('Rind 721 col.@col = Rind. 721-978 +..+ 721-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 730.
            { 'rezField': 'dec_table13_row730_totalc1', 'callback': _mywebform_expression_dec_table13_row730_totalc1, 'err': '076', 'text': function () { return Drupal.t('Rind 730 col.@col = Rind. 730-978 +..+ 730-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row730_totalc2', 'callback': _mywebform_expression_dec_table13_row730_totalc2, 'err': '076', 'text': function () { return Drupal.t('Rind 730 col.@col = Rind. 730-978 +..+ 730-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row730_totalc3', 'callback': _mywebform_expression_dec_table13_row730_totalc3, 'err': '076', 'text': function () { return Drupal.t('Rind 730 col.@col = Rind. 730-978 +..+ 730-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row730_totalc4', 'callback': _mywebform_expression_dec_table13_row730_totalc4, 'err': '076', 'text': function () { return Drupal.t('Rind 730 col.@col = Rind. 730-978 +..+ 730-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row730_totalc5', 'callback': _mywebform_expression_dec_table13_row730_totalc5, 'err': '076', 'text': function () { return Drupal.t('Rind 730 col.@col = Rind. 730-978 +..+ 730-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row730_totalc6', 'callback': _mywebform_expression_dec_table13_row730_totalc6, 'err': '076', 'text': function () { return Drupal.t('Rind 730 col.@col = Rind. 730-978 +..+ 730-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row730_totalc7', 'callback': _mywebform_expression_dec_table13_row730_totalc7, 'err': '076', 'text': function () { return Drupal.t('Rind 730 col.@col = Rind. 730-978 +..+ 730-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row730_totalc8', 'callback': _mywebform_expression_dec_table13_row730_totalc8, 'err': '076', 'text': function () { return Drupal.t('Rind 730 col.@col = Rind. 730-978 +..+ 730-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 731.
            { 'rezField': 'dec_table13_row731_totalc1', 'callback': _mywebform_expression_dec_table13_row731_totalc1, 'err': '077', 'text': function () { return Drupal.t('Rind 731 col.@col = Rind. 731-978 +..+ 731-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row731_totalc2', 'callback': _mywebform_expression_dec_table13_row731_totalc2, 'err': '077', 'text': function () { return Drupal.t('Rind 731 col.@col = Rind. 731-978 +..+ 731-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row731_totalc3', 'callback': _mywebform_expression_dec_table13_row731_totalc3, 'err': '077', 'text': function () { return Drupal.t('Rind 731 col.@col = Rind. 731-978 +..+ 731-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row731_totalc4', 'callback': _mywebform_expression_dec_table13_row731_totalc4, 'err': '077', 'text': function () { return Drupal.t('Rind 731 col.@col = Rind. 731-978 +..+ 731-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row731_totalc5', 'callback': _mywebform_expression_dec_table13_row731_totalc5, 'err': '077', 'text': function () { return Drupal.t('Rind 731 col.@col = Rind. 731-978 +..+ 731-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row731_totalc6', 'callback': _mywebform_expression_dec_table13_row731_totalc6, 'err': '077', 'text': function () { return Drupal.t('Rind 731 col.@col = Rind. 731-978 +..+ 731-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row731_totalc7', 'callback': _mywebform_expression_dec_table13_row731_totalc7, 'err': '077', 'text': function () { return Drupal.t('Rind 731 col.@col = Rind. 731-978 +..+ 731-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row731_totalc8', 'callback': _mywebform_expression_dec_table13_row731_totalc8, 'err': '077', 'text': function () { return Drupal.t('Rind 731 col.@col = Rind. 731-978 +..+ 731-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 740.
            { 'rezField': 'dec_table13_row740_totalc1', 'callback': _mywebform_expression_dec_table13_row740_totalc1, 'err': '078', 'text': function () { return Drupal.t('Rind 740 col.@col = Rind. 740-978 +..+ 740-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row740_totalc2', 'callback': _mywebform_expression_dec_table13_row740_totalc2, 'err': '078', 'text': function () { return Drupal.t('Rind 740 col.@col = Rind. 740-978 +..+ 740-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row740_totalc3', 'callback': _mywebform_expression_dec_table13_row740_totalc3, 'err': '078', 'text': function () { return Drupal.t('Rind 740 col.@col = Rind. 740-978 +..+ 740-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row740_totalc4', 'callback': _mywebform_expression_dec_table13_row740_totalc4, 'err': '078', 'text': function () { return Drupal.t('Rind 740 col.@col = Rind. 740-978 +..+ 740-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row740_totalc5', 'callback': _mywebform_expression_dec_table13_row740_totalc5, 'err': '078', 'text': function () { return Drupal.t('Rind 740 col.@col = Rind. 740-978 +..+ 740-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row740_totalc6', 'callback': _mywebform_expression_dec_table13_row740_totalc6, 'err': '078', 'text': function () { return Drupal.t('Rind 740 col.@col = Rind. 740-978 +..+ 740-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row740_totalc7', 'callback': _mywebform_expression_dec_table13_row740_totalc7, 'err': '078', 'text': function () { return Drupal.t('Rind 740 col.@col = Rind. 740-978 +..+ 740-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row740_totalc8', 'callback': _mywebform_expression_dec_table13_row740_totalc8, 'err': '078', 'text': function () { return Drupal.t('Rind 740 col.@col = Rind. 740-978 +..+ 740-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 741.
            { 'rezField': 'dec_table13_row741_totalc1', 'callback': _mywebform_expression_dec_table13_row741_totalc1, 'err': '079', 'text': function () { return Drupal.t('Rind 741 col.@col = Rind. 741-978 +..+ 741-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row741_totalc2', 'callback': _mywebform_expression_dec_table13_row741_totalc2, 'err': '079', 'text': function () { return Drupal.t('Rind 741 col.@col = Rind. 741-978 +..+ 741-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row741_totalc3', 'callback': _mywebform_expression_dec_table13_row741_totalc3, 'err': '079', 'text': function () { return Drupal.t('Rind 741 col.@col = Rind. 741-978 +..+ 741-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row741_totalc4', 'callback': _mywebform_expression_dec_table13_row741_totalc4, 'err': '079', 'text': function () { return Drupal.t('Rind 741 col.@col = Rind. 741-978 +..+ 741-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row741_totalc5', 'callback': _mywebform_expression_dec_table13_row741_totalc5, 'err': '079', 'text': function () { return Drupal.t('Rind 741 col.@col = Rind. 741-978 +..+ 741-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row741_totalc6', 'callback': _mywebform_expression_dec_table13_row741_totalc6, 'err': '079', 'text': function () { return Drupal.t('Rind 741 col.@col = Rind. 741-978 +..+ 741-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row741_totalc7', 'callback': _mywebform_expression_dec_table13_row741_totalc7, 'err': '079', 'text': function () { return Drupal.t('Rind 741 col.@col = Rind. 741-978 +..+ 741-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row741_totalc8', 'callback': _mywebform_expression_dec_table13_row741_totalc8, 'err': '079', 'text': function () { return Drupal.t('Rind 741 col.@col = Rind. 741-978 +..+ 741-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 750.
            { 'rezField': 'dec_table13_row750_totalc1', 'callback': _mywebform_expression_dec_table13_row750_totalc1, 'err': '080', 'text': function () { return Drupal.t('Rind 750 col.@col = Rind. 750-978 +..+ 750-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row750_totalc2', 'callback': _mywebform_expression_dec_table13_row750_totalc2, 'err': '080', 'text': function () { return Drupal.t('Rind 750 col.@col = Rind. 750-978 +..+ 750-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row750_totalc3', 'callback': _mywebform_expression_dec_table13_row750_totalc3, 'err': '080', 'text': function () { return Drupal.t('Rind 750 col.@col = Rind. 750-978 +..+ 750-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row750_totalc4', 'callback': _mywebform_expression_dec_table13_row750_totalc4, 'err': '080', 'text': function () { return Drupal.t('Rind 750 col.@col = Rind. 750-978 +..+ 750-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row750_totalc5', 'callback': _mywebform_expression_dec_table13_row750_totalc5, 'err': '080', 'text': function () { return Drupal.t('Rind 750 col.@col = Rind. 750-978 +..+ 750-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row750_totalc6', 'callback': _mywebform_expression_dec_table13_row750_totalc6, 'err': '080', 'text': function () { return Drupal.t('Rind 750 col.@col = Rind. 750-978 +..+ 750-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row750_totalc7', 'callback': _mywebform_expression_dec_table13_row750_totalc7, 'err': '080', 'text': function () { return Drupal.t('Rind 750 col.@col = Rind. 750-978 +..+ 750-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row750_totalc8', 'callback': _mywebform_expression_dec_table13_row750_totalc8, 'err': '080', 'text': function () { return Drupal.t('Rind 750 col.@col = Rind. 750-978 +..+ 750-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 751.
            { 'rezField': 'dec_table13_row751_totalc1', 'callback': _mywebform_expression_dec_table13_row751_totalc1, 'err': '081', 'text': function () { return Drupal.t('Rind 751 col.@col = Rind. 751-978 +..+ 751-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row751_totalc2', 'callback': _mywebform_expression_dec_table13_row751_totalc2, 'err': '081', 'text': function () { return Drupal.t('Rind 751 col.@col = Rind. 751-978 +..+ 751-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row751_totalc3', 'callback': _mywebform_expression_dec_table13_row751_totalc3, 'err': '081', 'text': function () { return Drupal.t('Rind 751 col.@col = Rind. 751-978 +..+ 751-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row751_totalc4', 'callback': _mywebform_expression_dec_table13_row751_totalc4, 'err': '081', 'text': function () { return Drupal.t('Rind 751 col.@col = Rind. 751-978 +..+ 751-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row751_totalc5', 'callback': _mywebform_expression_dec_table13_row751_totalc5, 'err': '081', 'text': function () { return Drupal.t('Rind 751 col.@col = Rind. 751-978 +..+ 751-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row751_totalc6', 'callback': _mywebform_expression_dec_table13_row751_totalc6, 'err': '081', 'text': function () { return Drupal.t('Rind 751 col.@col = Rind. 751-978 +..+ 751-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row751_totalc7', 'callback': _mywebform_expression_dec_table13_row751_totalc7, 'err': '081', 'text': function () { return Drupal.t('Rind 751 col.@col = Rind. 751-978 +..+ 751-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row751_totalc8', 'callback': _mywebform_expression_dec_table13_row751_totalc8, 'err': '081', 'text': function () { return Drupal.t('Rind 751 col.@col = Rind. 751-978 +..+ 751-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 760.
            { 'rezField': 'dec_table13_row760_totalc1', 'callback': _mywebform_expression_dec_table13_row760_totalc1, 'err': '082', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 760-978 +..+ 760-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row760_totalc2', 'callback': _mywebform_expression_dec_table13_row760_totalc2, 'err': '082', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 760-978 +..+ 760-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row760_totalc3', 'callback': _mywebform_expression_dec_table13_row760_totalc3, 'err': '082', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 760-978 +..+ 760-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row760_totalc4', 'callback': _mywebform_expression_dec_table13_row760_totalc4, 'err': '082', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 760-978 +..+ 760-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row760_totalc5', 'callback': _mywebform_expression_dec_table13_row760_totalc5, 'err': '082', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 760-978 +..+ 760-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row760_totalc6', 'callback': _mywebform_expression_dec_table13_row760_totalc6, 'err': '082', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 760-978 +..+ 760-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row760_totalc7', 'callback': _mywebform_expression_dec_table13_row760_totalc7, 'err': '082', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 760-978 +..+ 760-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row760_totalc8', 'callback': _mywebform_expression_dec_table13_row760_totalc8, 'err': '082', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 760-978 +..+ 760-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 761.
            { 'rezField': 'dec_table13_row761_totalc1', 'callback': _mywebform_expression_dec_table13_row761_totalc1, 'err': '083', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 761-978 +..+ 761-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row761_totalc2', 'callback': _mywebform_expression_dec_table13_row761_totalc2, 'err': '083', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 761-978 +..+ 761-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row761_totalc3', 'callback': _mywebform_expression_dec_table13_row761_totalc3, 'err': '083', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 761-978 +..+ 761-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row761_totalc4', 'callback': _mywebform_expression_dec_table13_row761_totalc4, 'err': '083', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 761-978 +..+ 761-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row761_totalc5', 'callback': _mywebform_expression_dec_table13_row761_totalc5, 'err': '083', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 761-978 +..+ 761-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row761_totalc6', 'callback': _mywebform_expression_dec_table13_row761_totalc6, 'err': '083', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 761-978 +..+ 761-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row761_totalc7', 'callback': _mywebform_expression_dec_table13_row761_totalc7, 'err': '083', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 761-978 +..+ 761-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row761_totalc8', 'callback': _mywebform_expression_dec_table13_row761_totalc8, 'err': '083', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 761-978 +..+ 761-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 770.
            { 'rezField': 'dec_table13_row770_totalc1', 'callback': _mywebform_expression_dec_table13_row770_totalc1, 'err': '084', 'text': function () { return Drupal.t('Rind 770 col.@col = Rind. 770-978 +..+ 770-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row770_totalc2', 'callback': _mywebform_expression_dec_table13_row770_totalc2, 'err': '084', 'text': function () { return Drupal.t('Rind 770 col.@col = Rind. 770-978 +..+ 770-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row770_totalc3', 'callback': _mywebform_expression_dec_table13_row770_totalc3, 'err': '084', 'text': function () { return Drupal.t('Rind 770 col.@col = Rind. 770-978 +..+ 770-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row770_totalc4', 'callback': _mywebform_expression_dec_table13_row770_totalc4, 'err': '084', 'text': function () { return Drupal.t('Rind 770 col.@col = Rind. 770-978 +..+ 770-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row770_totalc5', 'callback': _mywebform_expression_dec_table13_row770_totalc5, 'err': '084', 'text': function () { return Drupal.t('Rind 770 col.@col = Rind. 770-978 +..+ 770-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row770_totalc6', 'callback': _mywebform_expression_dec_table13_row770_totalc6, 'err': '084', 'text': function () { return Drupal.t('Rind 770 col.@col = Rind. 770-978 +..+ 770-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row770_totalc7', 'callback': _mywebform_expression_dec_table13_row770_totalc7, 'err': '084', 'text': function () { return Drupal.t('Rind 770 col.@col = Rind. 770-978 +..+ 770-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row770_totalc8', 'callback': _mywebform_expression_dec_table13_row770_totalc8, 'err': '084', 'text': function () { return Drupal.t('Rind 770 col.@col = Rind. 770-978 +..+ 770-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 771.
            { 'rezField': 'dec_table13_row771_totalc1', 'callback': _mywebform_expression_dec_table13_row771_totalc1, 'err': '085', 'text': function () { return Drupal.t('Rind 771 col.@col = Rind. 771-978 +..+ 771-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row771_totalc2', 'callback': _mywebform_expression_dec_table13_row771_totalc2, 'err': '085', 'text': function () { return Drupal.t('Rind 771 col.@col = Rind. 771-978 +..+ 771-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row771_totalc3', 'callback': _mywebform_expression_dec_table13_row771_totalc3, 'err': '085', 'text': function () { return Drupal.t('Rind 771 col.@col = Rind. 771-978 +..+ 771-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row771_totalc4', 'callback': _mywebform_expression_dec_table13_row771_totalc4, 'err': '085', 'text': function () { return Drupal.t('Rind 771 col.@col = Rind. 771-978 +..+ 771-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row771_totalc5', 'callback': _mywebform_expression_dec_table13_row771_totalc5, 'err': '085', 'text': function () { return Drupal.t('Rind 771 col.@col = Rind. 771-978 +..+ 771-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row771_totalc6', 'callback': _mywebform_expression_dec_table13_row771_totalc6, 'err': '085', 'text': function () { return Drupal.t('Rind 771 col.@col = Rind. 771-978 +..+ 771-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row771_totalc7', 'callback': _mywebform_expression_dec_table13_row771_totalc7, 'err': '085', 'text': function () { return Drupal.t('Rind 771 col.@col = Rind. 771-978 +..+ 771-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row771_totalc8', 'callback': _mywebform_expression_dec_table13_row771_totalc8, 'err': '085', 'text': function () { return Drupal.t('Rind 771 col.@col = Rind. 771-978 +..+ 771-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 780.
            { 'rezField': 'dec_table13_row780_totalc1', 'callback': _mywebform_expression_dec_table13_row780_totalc1, 'err': '086', 'text': function () { return Drupal.t('Rind 780 col.@col = Rind. 780-978 +..+ 780-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row780_totalc2', 'callback': _mywebform_expression_dec_table13_row780_totalc2, 'err': '086', 'text': function () { return Drupal.t('Rind 780 col.@col = Rind. 780-978 +..+ 780-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row780_totalc3', 'callback': _mywebform_expression_dec_table13_row780_totalc3, 'err': '086', 'text': function () { return Drupal.t('Rind 780 col.@col = Rind. 780-978 +..+ 780-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row780_totalc4', 'callback': _mywebform_expression_dec_table13_row780_totalc4, 'err': '086', 'text': function () { return Drupal.t('Rind 780 col.@col = Rind. 780-978 +..+ 780-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row780_totalc5', 'callback': _mywebform_expression_dec_table13_row780_totalc5, 'err': '086', 'text': function () { return Drupal.t('Rind 780 col.@col = Rind. 780-978 +..+ 780-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row780_totalc6', 'callback': _mywebform_expression_dec_table13_row780_totalc6, 'err': '086', 'text': function () { return Drupal.t('Rind 780 col.@col = Rind. 780-978 +..+ 780-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row780_totalc7', 'callback': _mywebform_expression_dec_table13_row780_totalc7, 'err': '086', 'text': function () { return Drupal.t('Rind 780 col.@col = Rind. 780-978 +..+ 780-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row780_totalc8', 'callback': _mywebform_expression_dec_table13_row780_totalc8, 'err': '086', 'text': function () { return Drupal.t('Rind 780 col.@col = Rind. 780-978 +..+ 780-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 781.
            { 'rezField': 'dec_table13_row781_totalc1', 'callback': _mywebform_expression_dec_table13_row781_totalc1, 'err': '087', 'text': function () { return Drupal.t('Rind 781 col.@col = Rind. 781-978 +..+ 781-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row781_totalc2', 'callback': _mywebform_expression_dec_table13_row781_totalc2, 'err': '087', 'text': function () { return Drupal.t('Rind 781 col.@col = Rind. 781-978 +..+ 781-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row781_totalc3', 'callback': _mywebform_expression_dec_table13_row781_totalc3, 'err': '087', 'text': function () { return Drupal.t('Rind 781 col.@col = Rind. 781-978 +..+ 781-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row781_totalc4', 'callback': _mywebform_expression_dec_table13_row781_totalc4, 'err': '087', 'text': function () { return Drupal.t('Rind 781 col.@col = Rind. 781-978 +..+ 781-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row781_totalc5', 'callback': _mywebform_expression_dec_table13_row781_totalc5, 'err': '087', 'text': function () { return Drupal.t('Rind 781 col.@col = Rind. 781-978 +..+ 781-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row781_totalc6', 'callback': _mywebform_expression_dec_table13_row781_totalc6, 'err': '087', 'text': function () { return Drupal.t('Rind 781 col.@col = Rind. 781-978 +..+ 781-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row781_totalc7', 'callback': _mywebform_expression_dec_table13_row781_totalc7, 'err': '087', 'text': function () { return Drupal.t('Rind 781 col.@col = Rind. 781-978 +..+ 781-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row781_totalc8', 'callback': _mywebform_expression_dec_table13_row781_totalc8, 'err': '087', 'text': function () { return Drupal.t('Rind 781 col.@col = Rind. 781-978 +..+ 781-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 790.
            { 'rezField': 'dec_table13_row790_totalc1', 'callback': _mywebform_expression_dec_table13_row790_totalc1, 'err': '088', 'text': function () { return Drupal.t('Rind 790 col.@col = Rind. 790-978 +..+ 790-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row790_totalc2', 'callback': _mywebform_expression_dec_table13_row790_totalc2, 'err': '088', 'text': function () { return Drupal.t('Rind 790 col.@col = Rind. 790-978 +..+ 790-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row790_totalc3', 'callback': _mywebform_expression_dec_table13_row790_totalc3, 'err': '088', 'text': function () { return Drupal.t('Rind 790 col.@col = Rind. 790-978 +..+ 790-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row790_totalc4', 'callback': _mywebform_expression_dec_table13_row790_totalc4, 'err': '088', 'text': function () { return Drupal.t('Rind 790 col.@col = Rind. 790-978 +..+ 790-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row790_totalc5', 'callback': _mywebform_expression_dec_table13_row790_totalc5, 'err': '088', 'text': function () { return Drupal.t('Rind 790 col.@col = Rind. 790-978 +..+ 790-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row790_totalc6', 'callback': _mywebform_expression_dec_table13_row790_totalc6, 'err': '088', 'text': function () { return Drupal.t('Rind 790 col.@col = Rind. 790-978 +..+ 790-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row790_totalc7', 'callback': _mywebform_expression_dec_table13_row790_totalc7, 'err': '088', 'text': function () { return Drupal.t('Rind 790 col.@col = Rind. 790-978 +..+ 790-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row790_totalc8', 'callback': _mywebform_expression_dec_table13_row790_totalc8, 'err': '088', 'text': function () { return Drupal.t('Rind 790 col.@col = Rind. 790-978 +..+ 790-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 791.
            { 'rezField': 'dec_table13_row791_totalc1', 'callback': _mywebform_expression_dec_table13_row791_totalc1, 'err': '089', 'text': function () { return Drupal.t('Rind 791 col.@col = Rind. 791-978 +..+ 791-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row791_totalc2', 'callback': _mywebform_expression_dec_table13_row791_totalc2, 'err': '089', 'text': function () { return Drupal.t('Rind 791 col.@col = Rind. 791-978 +..+ 791-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row791_totalc3', 'callback': _mywebform_expression_dec_table13_row791_totalc3, 'err': '089', 'text': function () { return Drupal.t('Rind 791 col.@col = Rind. 791-978 +..+ 791-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row791_totalc4', 'callback': _mywebform_expression_dec_table13_row791_totalc4, 'err': '089', 'text': function () { return Drupal.t('Rind 791 col.@col = Rind. 791-978 +..+ 791-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row791_totalc5', 'callback': _mywebform_expression_dec_table13_row791_totalc5, 'err': '089', 'text': function () { return Drupal.t('Rind 791 col.@col = Rind. 791-978 +..+ 791-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row791_totalc6', 'callback': _mywebform_expression_dec_table13_row791_totalc6, 'err': '089', 'text': function () { return Drupal.t('Rind 791 col.@col = Rind. 791-978 +..+ 791-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row791_totalc7', 'callback': _mywebform_expression_dec_table13_row791_totalc7, 'err': '089', 'text': function () { return Drupal.t('Rind 791 col.@col = Rind. 791-978 +..+ 791-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row791_totalc8', 'callback': _mywebform_expression_dec_table13_row791_totalc8, 'err': '089', 'text': function () { return Drupal.t('Rind 791 col.@col = Rind. 791-978 +..+ 791-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 800.
            { 'rezField': 'dec_table13_row800_totalc1', 'callback': _mywebform_expression_dec_table13_row800_totalc1, 'err': '090', 'text': function () { return Drupal.t('Rind 800 col.@col = Rind. 800-978 +..+ 800-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row800_totalc2', 'callback': _mywebform_expression_dec_table13_row800_totalc2, 'err': '090', 'text': function () { return Drupal.t('Rind 800 col.@col = Rind. 800-978 +..+ 800-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row800_totalc3', 'callback': _mywebform_expression_dec_table13_row800_totalc3, 'err': '090', 'text': function () { return Drupal.t('Rind 800 col.@col = Rind. 800-978 +..+ 800-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row800_totalc4', 'callback': _mywebform_expression_dec_table13_row800_totalc4, 'err': '090', 'text': function () { return Drupal.t('Rind 800 col.@col = Rind. 800-978 +..+ 800-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row800_totalc5', 'callback': _mywebform_expression_dec_table13_row800_totalc5, 'err': '090', 'text': function () { return Drupal.t('Rind 800 col.@col = Rind. 800-978 +..+ 800-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row800_totalc6', 'callback': _mywebform_expression_dec_table13_row800_totalc6, 'err': '090', 'text': function () { return Drupal.t('Rind 800 col.@col = Rind. 800-978 +..+ 800-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row800_totalc7', 'callback': _mywebform_expression_dec_table13_row800_totalc7, 'err': '090', 'text': function () { return Drupal.t('Rind 800 col.@col = Rind. 800-978 +..+ 800-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row800_totalc8', 'callback': _mywebform_expression_dec_table13_row800_totalc8, 'err': '090', 'text': function () { return Drupal.t('Rind 800 col.@col = Rind. 800-978 +..+ 800-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 801.
            { 'rezField': 'dec_table13_row801_totalc1', 'callback': _mywebform_expression_dec_table13_row801_totalc1, 'err': '091', 'text': function () { return Drupal.t('Rind 801 col.@col = Rind. 801-978 +..+ 801-999 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row801_totalc2', 'callback': _mywebform_expression_dec_table13_row801_totalc2, 'err': '091', 'text': function () { return Drupal.t('Rind 801 col.@col = Rind. 801-978 +..+ 801-999 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row801_totalc3', 'callback': _mywebform_expression_dec_table13_row801_totalc3, 'err': '091', 'text': function () { return Drupal.t('Rind 801 col.@col = Rind. 801-978 +..+ 801-999 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row801_totalc4', 'callback': _mywebform_expression_dec_table13_row801_totalc4, 'err': '091', 'text': function () { return Drupal.t('Rind 801 col.@col = Rind. 801-978 +..+ 801-999 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row801_totalc5', 'callback': _mywebform_expression_dec_table13_row801_totalc5, 'err': '091', 'text': function () { return Drupal.t('Rind 801 col.@col = Rind. 801-978 +..+ 801-999 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row801_totalc6', 'callback': _mywebform_expression_dec_table13_row801_totalc6, 'err': '091', 'text': function () { return Drupal.t('Rind 801 col.@col = Rind. 801-978 +..+ 801-999 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row801_totalc7', 'callback': _mywebform_expression_dec_table13_row801_totalc7, 'err': '091', 'text': function () { return Drupal.t('Rind 801 col.@col = Rind. 801-978 +..+ 801-999 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row801_totalc8', 'callback': _mywebform_expression_dec_table13_row801_totalc8, 'err': '091', 'text': function () { return Drupal.t('Rind 801 col.@col = Rind. 801-978 +..+ 801-999 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 700, currency rows
            { 'rezField': 'dec_table13_row700_v978c1', 'callback': _mywebform_expression_dec_table13_row700_v978c1, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row700_v840c1', 'callback': _mywebform_expression_dec_table13_row700_v840c1, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row700_v642c1', 'callback': _mywebform_expression_dec_table13_row700_v642c1, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row700_v643c1', 'callback': _mywebform_expression_dec_table13_row700_v643c1, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row700_v999c1', 'callback': _mywebform_expression_dec_table13_row700_v999c1, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row700_v978c2', 'callback': _mywebform_expression_dec_table13_row700_v978c2, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row700_v840c2', 'callback': _mywebform_expression_dec_table13_row700_v840c2, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row700_v642c2', 'callback': _mywebform_expression_dec_table13_row700_v642c2, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row700_v643c2', 'callback': _mywebform_expression_dec_table13_row700_v643c2, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row700_v999c2', 'callback': _mywebform_expression_dec_table13_row700_v999c2, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row700_v978c3', 'callback': _mywebform_expression_dec_table13_row700_v978c3, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row700_v840c3', 'callback': _mywebform_expression_dec_table13_row700_v840c3, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row700_v642c3', 'callback': _mywebform_expression_dec_table13_row700_v642c3, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row700_v643c3', 'callback': _mywebform_expression_dec_table13_row700_v643c3, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row700_v999c3', 'callback': _mywebform_expression_dec_table13_row700_v999c3, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row700_v978c4', 'callback': _mywebform_expression_dec_table13_row700_v978c4, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row700_v840c4', 'callback': _mywebform_expression_dec_table13_row700_v840c4, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row700_v642c4', 'callback': _mywebform_expression_dec_table13_row700_v642c4, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row700_v643c4', 'callback': _mywebform_expression_dec_table13_row700_v643c4, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row700_v999c4', 'callback': _mywebform_expression_dec_table13_row700_v999c4, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row700_v978c5', 'callback': _mywebform_expression_dec_table13_row700_v978c5, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row700_v840c5', 'callback': _mywebform_expression_dec_table13_row700_v840c5, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row700_v642c5', 'callback': _mywebform_expression_dec_table13_row700_v642c5, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row700_v643c5', 'callback': _mywebform_expression_dec_table13_row700_v643c5, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row700_v999c5', 'callback': _mywebform_expression_dec_table13_row700_v999c5, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row700_v978c6', 'callback': _mywebform_expression_dec_table13_row700_v978c6, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row700_v840c6', 'callback': _mywebform_expression_dec_table13_row700_v840c6, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row700_v642c6', 'callback': _mywebform_expression_dec_table13_row700_v642c6, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row700_v643c6', 'callback': _mywebform_expression_dec_table13_row700_v643c6, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row700_v999c6', 'callback': _mywebform_expression_dec_table13_row700_v999c6, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row700_v978c7', 'callback': _mywebform_expression_dec_table13_row700_v978c7, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row700_v840c7', 'callback': _mywebform_expression_dec_table13_row700_v840c7, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row700_v642c7', 'callback': _mywebform_expression_dec_table13_row700_v642c7, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row700_v643c7', 'callback': _mywebform_expression_dec_table13_row700_v643c7, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row700_v999c7', 'callback': _mywebform_expression_dec_table13_row700_v999c7, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row700_v978c8', 'callback': _mywebform_expression_dec_table13_row700_v978c8, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row700_v840c8', 'callback': _mywebform_expression_dec_table13_row700_v840c8, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row700_v642c8', 'callback': _mywebform_expression_dec_table13_row700_v642c8, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row700_v643c8', 'callback': _mywebform_expression_dec_table13_row700_v643c8, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row700_v999c8', 'callback': _mywebform_expression_dec_table13_row700_v999c8, 'err': '092', 'text': function () { return Drupal.t('Rind 700 col.@col = Rind. 710 + Rind. 720 + Rind. 730 + Rind. 740 + Rind. 750 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 701, currency rows
            { 'rezField': 'dec_table13_row701_v978c1', 'callback': _mywebform_expression_dec_table13_row701_v978c1, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row701_v840c1', 'callback': _mywebform_expression_dec_table13_row701_v840c1, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row701_v642c1', 'callback': _mywebform_expression_dec_table13_row701_v642c1, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row701_v643c1', 'callback': _mywebform_expression_dec_table13_row701_v643c1, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row701_v999c1', 'callback': _mywebform_expression_dec_table13_row701_v999c1, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row701_v978c2', 'callback': _mywebform_expression_dec_table13_row701_v978c2, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row701_v840c2', 'callback': _mywebform_expression_dec_table13_row701_v840c2, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row701_v642c2', 'callback': _mywebform_expression_dec_table13_row701_v642c2, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row701_v643c2', 'callback': _mywebform_expression_dec_table13_row701_v643c2, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row701_v999c2', 'callback': _mywebform_expression_dec_table13_row701_v999c2, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row701_v978c3', 'callback': _mywebform_expression_dec_table13_row701_v978c3, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row701_v840c3', 'callback': _mywebform_expression_dec_table13_row701_v840c3, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row701_v642c3', 'callback': _mywebform_expression_dec_table13_row701_v642c3, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row701_v643c3', 'callback': _mywebform_expression_dec_table13_row701_v643c3, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row701_v999c3', 'callback': _mywebform_expression_dec_table13_row701_v999c3, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row701_v978c4', 'callback': _mywebform_expression_dec_table13_row701_v978c4, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row701_v840c4', 'callback': _mywebform_expression_dec_table13_row701_v840c4, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row701_v642c4', 'callback': _mywebform_expression_dec_table13_row701_v642c4, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row701_v643c4', 'callback': _mywebform_expression_dec_table13_row701_v643c4, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row701_v999c4', 'callback': _mywebform_expression_dec_table13_row701_v999c4, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row701_v978c5', 'callback': _mywebform_expression_dec_table13_row701_v978c5, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row701_v840c5', 'callback': _mywebform_expression_dec_table13_row701_v840c5, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row701_v642c5', 'callback': _mywebform_expression_dec_table13_row701_v642c5, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row701_v643c5', 'callback': _mywebform_expression_dec_table13_row701_v643c5, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row701_v999c5', 'callback': _mywebform_expression_dec_table13_row701_v999c5, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row701_v978c6', 'callback': _mywebform_expression_dec_table13_row701_v978c6, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row701_v840c6', 'callback': _mywebform_expression_dec_table13_row701_v840c6, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row701_v642c6', 'callback': _mywebform_expression_dec_table13_row701_v642c6, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row701_v643c6', 'callback': _mywebform_expression_dec_table13_row701_v643c6, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row701_v999c6', 'callback': _mywebform_expression_dec_table13_row701_v999c6, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row701_v978c7', 'callback': _mywebform_expression_dec_table13_row701_v978c7, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row701_v840c7', 'callback': _mywebform_expression_dec_table13_row701_v840c7, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row701_v642c7', 'callback': _mywebform_expression_dec_table13_row701_v642c7, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row701_v643c7', 'callback': _mywebform_expression_dec_table13_row701_v643c7, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row701_v999c7', 'callback': _mywebform_expression_dec_table13_row701_v999c7, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row701_v978c8', 'callback': _mywebform_expression_dec_table13_row701_v978c8, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row701_v840c8', 'callback': _mywebform_expression_dec_table13_row701_v840c8, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row701_v642c8', 'callback': _mywebform_expression_dec_table13_row701_v642c8, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row701_v643c8', 'callback': _mywebform_expression_dec_table13_row701_v643c8, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row701_v999c8', 'callback': _mywebform_expression_dec_table13_row701_v999c8, 'err': '093', 'text': function () { return Drupal.t('Rind 701 col.@col = Rind. 711 + Rind. 721 + Rind. 731 + Rind. 741 + Rind. 751 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 760, currency rows
            { 'rezField': 'dec_table13_row760_v978c1', 'callback': _mywebform_expression_dec_table13_row760_v978c1, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row760_v840c1', 'callback': _mywebform_expression_dec_table13_row760_v840c1, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row760_v642c1', 'callback': _mywebform_expression_dec_table13_row760_v642c1, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row760_v643c1', 'callback': _mywebform_expression_dec_table13_row760_v643c1, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row760_v999c1', 'callback': _mywebform_expression_dec_table13_row760_v999c1, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row760_v978c2', 'callback': _mywebform_expression_dec_table13_row760_v978c2, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row760_v840c2', 'callback': _mywebform_expression_dec_table13_row760_v840c2, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row760_v642c2', 'callback': _mywebform_expression_dec_table13_row760_v642c2, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row760_v643c2', 'callback': _mywebform_expression_dec_table13_row760_v643c2, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row760_v999c2', 'callback': _mywebform_expression_dec_table13_row760_v999c2, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row760_v978c3', 'callback': _mywebform_expression_dec_table13_row760_v978c3, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row760_v840c3', 'callback': _mywebform_expression_dec_table13_row760_v840c3, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row760_v642c3', 'callback': _mywebform_expression_dec_table13_row760_v642c3, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row760_v643c3', 'callback': _mywebform_expression_dec_table13_row760_v643c3, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row760_v999c3', 'callback': _mywebform_expression_dec_table13_row760_v999c3, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row760_v978c4', 'callback': _mywebform_expression_dec_table13_row760_v978c4, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row760_v840c4', 'callback': _mywebform_expression_dec_table13_row760_v840c4, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row760_v642c4', 'callback': _mywebform_expression_dec_table13_row760_v642c4, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row760_v643c4', 'callback': _mywebform_expression_dec_table13_row760_v643c4, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row760_v999c4', 'callback': _mywebform_expression_dec_table13_row760_v999c4, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row760_v978c5', 'callback': _mywebform_expression_dec_table13_row760_v978c5, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row760_v840c5', 'callback': _mywebform_expression_dec_table13_row760_v840c5, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row760_v642c5', 'callback': _mywebform_expression_dec_table13_row760_v642c5, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row760_v643c5', 'callback': _mywebform_expression_dec_table13_row760_v643c5, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row760_v999c5', 'callback': _mywebform_expression_dec_table13_row760_v999c5, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row760_v978c6', 'callback': _mywebform_expression_dec_table13_row760_v978c6, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row760_v840c6', 'callback': _mywebform_expression_dec_table13_row760_v840c6, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row760_v642c6', 'callback': _mywebform_expression_dec_table13_row760_v642c6, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row760_v643c6', 'callback': _mywebform_expression_dec_table13_row760_v643c6, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row760_v999c6', 'callback': _mywebform_expression_dec_table13_row760_v999c6, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row760_v978c7', 'callback': _mywebform_expression_dec_table13_row760_v978c7, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row760_v840c7', 'callback': _mywebform_expression_dec_table13_row760_v840c7, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row760_v642c7', 'callback': _mywebform_expression_dec_table13_row760_v642c7, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row760_v643c7', 'callback': _mywebform_expression_dec_table13_row760_v643c7, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row760_v999c7', 'callback': _mywebform_expression_dec_table13_row760_v999c7, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row760_v978c8', 'callback': _mywebform_expression_dec_table13_row760_v978c8, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row760_v840c8', 'callback': _mywebform_expression_dec_table13_row760_v840c8, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row760_v642c8', 'callback': _mywebform_expression_dec_table13_row760_v642c8, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row760_v643c8', 'callback': _mywebform_expression_dec_table13_row760_v643c8, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row760_v999c8', 'callback': _mywebform_expression_dec_table13_row760_v999c8, 'err': '094', 'text': function () { return Drupal.t('Rind 760 col.@col = Rind. 770 + Rind. 780 + Rind. 790 + Rind. 800 col.@col.', { '@col': 8 }); } },

            // Cap. 6, Row 761, currency rows
            { 'rezField': 'dec_table13_row761_v978c1', 'callback': _mywebform_expression_dec_table13_row761_v978c1, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row761_v840c1', 'callback': _mywebform_expression_dec_table13_row761_v840c1, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row761_v642c1', 'callback': _mywebform_expression_dec_table13_row761_v642c1, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row761_v643c1', 'callback': _mywebform_expression_dec_table13_row761_v643c1, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row761_v999c1', 'callback': _mywebform_expression_dec_table13_row761_v999c1, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 1 }); } },
            { 'rezField': 'dec_table13_row761_v978c2', 'callback': _mywebform_expression_dec_table13_row761_v978c2, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row761_v840c2', 'callback': _mywebform_expression_dec_table13_row761_v840c2, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row761_v642c2', 'callback': _mywebform_expression_dec_table13_row761_v642c2, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row761_v643c2', 'callback': _mywebform_expression_dec_table13_row761_v643c2, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row761_v999c2', 'callback': _mywebform_expression_dec_table13_row761_v999c2, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 2 }); } },
            { 'rezField': 'dec_table13_row761_v978c3', 'callback': _mywebform_expression_dec_table13_row761_v978c3, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row761_v840c3', 'callback': _mywebform_expression_dec_table13_row761_v840c3, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row761_v642c3', 'callback': _mywebform_expression_dec_table13_row761_v642c3, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row761_v643c3', 'callback': _mywebform_expression_dec_table13_row761_v643c3, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row761_v999c3', 'callback': _mywebform_expression_dec_table13_row761_v999c3, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 3 }); } },
            { 'rezField': 'dec_table13_row761_v978c4', 'callback': _mywebform_expression_dec_table13_row761_v978c4, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row761_v840c4', 'callback': _mywebform_expression_dec_table13_row761_v840c4, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row761_v642c4', 'callback': _mywebform_expression_dec_table13_row761_v642c4, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row761_v643c4', 'callback': _mywebform_expression_dec_table13_row761_v643c4, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row761_v999c4', 'callback': _mywebform_expression_dec_table13_row761_v999c4, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 4 }); } },
            { 'rezField': 'dec_table13_row761_v978c5', 'callback': _mywebform_expression_dec_table13_row761_v978c5, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row761_v840c5', 'callback': _mywebform_expression_dec_table13_row761_v840c5, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row761_v642c5', 'callback': _mywebform_expression_dec_table13_row761_v642c5, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row761_v643c5', 'callback': _mywebform_expression_dec_table13_row761_v643c5, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row761_v999c5', 'callback': _mywebform_expression_dec_table13_row761_v999c5, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 5 }); } },
            { 'rezField': 'dec_table13_row761_v978c6', 'callback': _mywebform_expression_dec_table13_row761_v978c6, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row761_v840c6', 'callback': _mywebform_expression_dec_table13_row761_v840c6, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row761_v642c6', 'callback': _mywebform_expression_dec_table13_row761_v642c6, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row761_v643c6', 'callback': _mywebform_expression_dec_table13_row761_v643c6, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row761_v999c6', 'callback': _mywebform_expression_dec_table13_row761_v999c6, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 6 }); } },
            { 'rezField': 'dec_table13_row761_v978c7', 'callback': _mywebform_expression_dec_table13_row761_v978c7, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row761_v840c7', 'callback': _mywebform_expression_dec_table13_row761_v840c7, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row761_v642c7', 'callback': _mywebform_expression_dec_table13_row761_v642c7, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row761_v643c7', 'callback': _mywebform_expression_dec_table13_row761_v643c7, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row761_v999c7', 'callback': _mywebform_expression_dec_table13_row761_v999c7, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 7 }); } },
            { 'rezField': 'dec_table13_row761_v978c8', 'callback': _mywebform_expression_dec_table13_row761_v978c8, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row761_v840c8', 'callback': _mywebform_expression_dec_table13_row761_v840c8, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row761_v642c8', 'callback': _mywebform_expression_dec_table13_row761_v642c8, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row761_v643c8', 'callback': _mywebform_expression_dec_table13_row761_v643c8, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 8 }); } },
            { 'rezField': 'dec_table13_row761_v999c8', 'callback': _mywebform_expression_dec_table13_row761_v999c8, 'err': '095', 'text': function () { return Drupal.t('Rind 761 col.@col = Rind. 771 + Rind. 781 + Rind. 791 + Rind. 801 col.@col.', { '@col': 8 }); } },
        ];


        for (var i = 0; i < autofield_exp.length; i++) {
            validate_autofields(autofield_exp[i]);
        }

        var comparable_err_msg_callback = function (row, col, op, comp_row, comp_col) {
            return function () {
                return Drupal.t('Rind. @row col.@col @op Rind @comp_row col.@comp_col', {
                    '@row': row,
                    '@col': col,
                    '@op': op,
                    '@comp_row': comp_row,
                    '@comp_col': comp_col
                });
            };
        };

        var comparable_fields = [
            // Cap. 5, Row 500
            { 'field': 'dec_table12_row500_totalc1', 'comparable_field': 'dec_table12_row501_totalc1', 'err': '056', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('500', 1, '>=', '501', 1) },
            { 'field': 'dec_table12_row500_totalc2', 'comparable_field': 'dec_table12_row501_totalc2', 'err': '056', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('500', 2, '>=', '501', 2) },
            { 'field': 'dec_table12_row500_totalc3', 'comparable_field': 'dec_table12_row501_totalc3', 'err': '056', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('500', 3, '>=', '501', 3) },
            { 'field': 'dec_table12_row500_totalc5', 'comparable_field': 'dec_table12_row501_totalc5', 'err': '056', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('500', 5, '>=', '501', 5) },

            // Cap. 5, Row 510
            { 'field': 'dec_table12_row510_totalc1', 'comparable_field': 'dec_table12_row511_totalc1', 'err': '057', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('510', 1, '>=', '511', 1) },
            { 'field': 'dec_table12_row510_totalc2', 'comparable_field': 'dec_table12_row511_totalc2', 'err': '057', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('510', 2, '>=', '511', 2) },
            { 'field': 'dec_table12_row510_totalc3', 'comparable_field': 'dec_table12_row511_totalc3', 'err': '057', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('510', 3, '>=', '511', 3) },
            { 'field': 'dec_table12_row510_totalc5', 'comparable_field': 'dec_table12_row511_totalc5', 'err': '057', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('510', 5, '>=', '511', 5) },

            // Cap. 5, Row 520
            { 'field': 'dec_table12_row520_totalc1', 'comparable_field': 'dec_table12_row521_totalc1', 'err': '058', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('520', 1, '>=', '521', 1) },
            { 'field': 'dec_table12_row520_totalc2', 'comparable_field': 'dec_table12_row521_totalc2', 'err': '058', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('520', 2, '>=', '521', 2) },
            { 'field': 'dec_table12_row520_totalc3', 'comparable_field': 'dec_table12_row521_totalc3', 'err': '058', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('520', 3, '>=', '521', 3) },
            { 'field': 'dec_table12_row520_totalc5', 'comparable_field': 'dec_table12_row521_totalc5', 'err': '058', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('520', 5, '>=', '521', 5) },

            // Cap. 5, Row 530
            { 'field': 'dec_table12_row530_totalc1', 'comparable_field': 'dec_table12_row531_totalc1', 'err': '059', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('530', 1, '>=', '531', 1) },
            { 'field': 'dec_table12_row530_totalc2', 'comparable_field': 'dec_table12_row531_totalc2', 'err': '059', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('530', 2, '>=', '531', 2) },
            { 'field': 'dec_table12_row530_totalc3', 'comparable_field': 'dec_table12_row531_totalc3', 'err': '059', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('530', 3, '>=', '531', 3) },
            { 'field': 'dec_table12_row530_totalc5', 'comparable_field': 'dec_table12_row531_totalc5', 'err': '059', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('530', 5, '>=', '531', 5) },

            // Cap. 5, Row 540
            { 'field': 'dec_table12_row540_totalc1', 'comparable_field': 'dec_table12_row541_totalc1', 'err': '060', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('540', 1, '>=', '541', 1) },
            { 'field': 'dec_table12_row540_totalc2', 'comparable_field': 'dec_table12_row541_totalc2', 'err': '060', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('540', 2, '>=', '541', 2) },
            { 'field': 'dec_table12_row540_totalc3', 'comparable_field': 'dec_table12_row541_totalc3', 'err': '060', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('540', 3, '>=', '541', 3) },
            { 'field': 'dec_table12_row540_totalc5', 'comparable_field': 'dec_table12_row541_totalc5', 'err': '060', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('540', 5, '>=', '541', 5) },

            // Cap. 5, Row 550
            { 'field': 'dec_table12_row550_totalc1', 'comparable_field': 'dec_table12_row551_totalc1', 'err': '060', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('550', 1, '>=', '551', 1) },
            { 'field': 'dec_table12_row550_totalc2', 'comparable_field': 'dec_table12_row551_totalc2', 'err': '060', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('550', 2, '>=', '551', 2) },
            { 'field': 'dec_table12_row550_totalc3', 'comparable_field': 'dec_table12_row551_totalc3', 'err': '060', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('550', 3, '>=', '551', 3) },
            { 'field': 'dec_table12_row550_totalc5', 'comparable_field': 'dec_table12_row551_totalc5', 'err': '060', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('550', 5, '>=', '551', 5) },

            // Cap. 5, Row 560
            { 'field': 'dec_table12_row560_totalc1', 'comparable_field': 'dec_table12_row561_totalc1', 'err': '061', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('560', 1, '>=', '561', 1) },
            { 'field': 'dec_table12_row560_totalc2', 'comparable_field': 'dec_table12_row561_totalc2', 'err': '061', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('560', 2, '>=', '561', 2) },
            { 'field': 'dec_table12_row560_totalc3', 'comparable_field': 'dec_table12_row561_totalc3', 'err': '061', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('560', 3, '>=', '561', 3) },
            { 'field': 'dec_table12_row560_totalc5', 'comparable_field': 'dec_table12_row561_totalc5', 'err': '061', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('560', 5, '>=', '561', 5) },

            // Cap. 5, Row 570
            { 'field': 'dec_table12_row570_totalc1', 'comparable_field': 'dec_table12_row571_totalc1', 'err': '062', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('570', 1, '>=', '571', 1) },
            { 'field': 'dec_table12_row570_totalc2', 'comparable_field': 'dec_table12_row571_totalc2', 'err': '062', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('570', 2, '>=', '571', 2) },
            { 'field': 'dec_table12_row570_totalc3', 'comparable_field': 'dec_table12_row571_totalc3', 'err': '062', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('570', 3, '>=', '571', 3) },
            { 'field': 'dec_table12_row570_totalc5', 'comparable_field': 'dec_table12_row571_totalc5', 'err': '062', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('570', 5, '>=', '571', 5) },

            // Cap. 5, Row 580
            { 'field': 'dec_table12_row580_totalc1', 'comparable_field': 'dec_table12_row581_totalc1', 'err': '063', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('580', 1, '>=', '581', 1) },
            { 'field': 'dec_table12_row580_totalc2', 'comparable_field': 'dec_table12_row581_totalc2', 'err': '063', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('580', 2, '>=', '581', 2) },
            { 'field': 'dec_table12_row580_totalc3', 'comparable_field': 'dec_table12_row581_totalc3', 'err': '063', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('580', 3, '>=', '581', 3) },
            { 'field': 'dec_table12_row580_totalc5', 'comparable_field': 'dec_table12_row581_totalc5', 'err': '063', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('580', 5, '>=', '581', 5) },

            // Cap. 5, Row 590
            { 'field': 'dec_table12_row590_totalc1', 'comparable_field': 'dec_table12_row591_totalc1', 'err': '064', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('590', 1, '>=', '591', 1) },
            { 'field': 'dec_table12_row590_totalc2', 'comparable_field': 'dec_table12_row591_totalc2', 'err': '064', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('590', 2, '>=', '591', 2) },
            { 'field': 'dec_table12_row590_totalc3', 'comparable_field': 'dec_table12_row591_totalc3', 'err': '064', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('590', 3, '>=', '591', 3) },
            { 'field': 'dec_table12_row590_totalc5', 'comparable_field': 'dec_table12_row591_totalc5', 'err': '064', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('590', 5, '>=', '591', 5) },

            // Cap. 5, Row 600
            { 'field': 'dec_table12_row600_totalc1', 'comparable_field': 'dec_table12_row601_totalc1', 'err': '065', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('600', 1, '>=', '601', 1) },
            { 'field': 'dec_table12_row600_totalc2', 'comparable_field': 'dec_table12_row601_totalc2', 'err': '065', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('600', 2, '>=', '601', 2) },
            { 'field': 'dec_table12_row600_totalc3', 'comparable_field': 'dec_table12_row601_totalc3', 'err': '065', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('600', 3, '>=', '601', 3) },
            { 'field': 'dec_table12_row600_totalc5', 'comparable_field': 'dec_table12_row601_totalc5', 'err': '065', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('600', 5, '>=', '601', 5) },

            // Cap. 6, Row 700
            { 'field': 'dec_table13_row700_totalc1', 'comparable_field': 'dec_table13_row701_totalc1', 'err': '098', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('700', 1, '>=', '701', 1) },
            { 'field': 'dec_table13_row700_totalc2', 'comparable_field': 'dec_table13_row701_totalc2', 'err': '098', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('700', 2, '>=', '701', 2) },
            { 'field': 'dec_table13_row700_totalc3', 'comparable_field': 'dec_table13_row701_totalc3', 'err': '098', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('700', 3, '>=', '701', 3) },
            { 'field': 'dec_table13_row700_totalc4', 'comparable_field': 'dec_table13_row701_totalc4', 'err': '098', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('700', 4, '>=', '701', 4) },
            { 'field': 'dec_table13_row700_totalc5', 'comparable_field': 'dec_table13_row701_totalc5', 'err': '098', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('700', 5, '>=', '701', 5) },
            { 'field': 'dec_table13_row700_totalc7', 'comparable_field': 'dec_table13_row701_totalc7', 'err': '098', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('700', 7, '>=', '701', 7) },
            { 'field': 'dec_table13_row700_totalc8', 'comparable_field': 'dec_table13_row701_totalc8', 'err': '098', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('700', 8, '>=', '701', 8) },

            // Cap. 6, Row 710
            { 'field': 'dec_table13_row710_totalc1', 'comparable_field': 'dec_table13_row711_totalc1', 'err': '099', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('710', 1, '>=', '711', 1) },
            { 'field': 'dec_table13_row710_totalc2', 'comparable_field': 'dec_table13_row711_totalc2', 'err': '099', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('710', 2, '>=', '711', 2) },
            { 'field': 'dec_table13_row710_totalc3', 'comparable_field': 'dec_table13_row711_totalc3', 'err': '099', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('710', 3, '>=', '711', 3) },
            { 'field': 'dec_table13_row710_totalc4', 'comparable_field': 'dec_table13_row711_totalc4', 'err': '099', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('710', 4, '>=', '711', 4) },
            { 'field': 'dec_table13_row710_totalc5', 'comparable_field': 'dec_table13_row711_totalc5', 'err': '099', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('710', 5, '>=', '711', 5) },
            { 'field': 'dec_table13_row710_totalc7', 'comparable_field': 'dec_table13_row711_totalc7', 'err': '099', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('710', 7, '>=', '711', 7) },
            { 'field': 'dec_table13_row710_totalc8', 'comparable_field': 'dec_table13_row711_totalc8', 'err': '099', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('710', 8, '>=', '711', 8) },

            // Cap. 6, Row 720
            { 'field': 'dec_table13_row720_totalc1', 'comparable_field': 'dec_table13_row721_totalc1', 'err': '100', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('720', 1, '>=', '721', 1) },
            { 'field': 'dec_table13_row720_totalc2', 'comparable_field': 'dec_table13_row721_totalc2', 'err': '100', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('720', 2, '>=', '721', 2) },
            { 'field': 'dec_table13_row720_totalc3', 'comparable_field': 'dec_table13_row721_totalc3', 'err': '100', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('720', 3, '>=', '721', 3) },
            { 'field': 'dec_table13_row720_totalc4', 'comparable_field': 'dec_table13_row721_totalc4', 'err': '100', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('720', 4, '>=', '721', 4) },
            { 'field': 'dec_table13_row720_totalc5', 'comparable_field': 'dec_table13_row721_totalc5', 'err': '100', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('720', 5, '>=', '721', 5) },
            { 'field': 'dec_table13_row720_totalc7', 'comparable_field': 'dec_table13_row721_totalc7', 'err': '100', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('720', 7, '>=', '721', 7) },
            { 'field': 'dec_table13_row720_totalc8', 'comparable_field': 'dec_table13_row721_totalc8', 'err': '100', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('720', 8, '>=', '721', 8) },

            // Cap. 6, Row 730
            { 'field': 'dec_table13_row730_totalc1', 'comparable_field': 'dec_table13_row731_totalc1', 'err': '101', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('730', 1, '>=', '731', 1) },
            { 'field': 'dec_table13_row730_totalc2', 'comparable_field': 'dec_table13_row731_totalc2', 'err': '101', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('730', 2, '>=', '731', 2) },
            { 'field': 'dec_table13_row730_totalc3', 'comparable_field': 'dec_table13_row731_totalc3', 'err': '101', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('730', 3, '>=', '731', 3) },
            { 'field': 'dec_table13_row730_totalc4', 'comparable_field': 'dec_table13_row731_totalc4', 'err': '101', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('730', 4, '>=', '731', 4) },
            { 'field': 'dec_table13_row730_totalc5', 'comparable_field': 'dec_table13_row731_totalc5', 'err': '101', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('730', 5, '>=', '731', 5) },
            { 'field': 'dec_table13_row730_totalc7', 'comparable_field': 'dec_table13_row731_totalc7', 'err': '101', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('730', 7, '>=', '731', 7) },
            { 'field': 'dec_table13_row730_totalc8', 'comparable_field': 'dec_table13_row731_totalc8', 'err': '101', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('730', 8, '>=', '731', 8) },

            // Cap. 6, Row 740
            { 'field': 'dec_table13_row740_totalc1', 'comparable_field': 'dec_table13_row741_totalc1', 'err': '102', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('740', 1, '>=', '741', 1) },
            { 'field': 'dec_table13_row740_totalc2', 'comparable_field': 'dec_table13_row741_totalc2', 'err': '102', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('740', 2, '>=', '741', 2) },
            { 'field': 'dec_table13_row740_totalc3', 'comparable_field': 'dec_table13_row741_totalc3', 'err': '102', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('740', 3, '>=', '741', 3) },
            { 'field': 'dec_table13_row740_totalc4', 'comparable_field': 'dec_table13_row741_totalc4', 'err': '102', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('740', 4, '>=', '741', 4) },
            { 'field': 'dec_table13_row740_totalc5', 'comparable_field': 'dec_table13_row741_totalc5', 'err': '102', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('740', 5, '>=', '741', 5) },
            { 'field': 'dec_table13_row740_totalc7', 'comparable_field': 'dec_table13_row741_totalc7', 'err': '102', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('740', 7, '>=', '741', 7) },
            { 'field': 'dec_table13_row740_totalc8', 'comparable_field': 'dec_table13_row741_totalc8', 'err': '102', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('740', 8, '>=', '741', 8) },

            // Cap. 6, Row 750
            { 'field': 'dec_table13_row750_totalc1', 'comparable_field': 'dec_table13_row751_totalc1', 'err': '103', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('750', 1, '>=', '751', 1) },
            { 'field': 'dec_table13_row750_totalc2', 'comparable_field': 'dec_table13_row751_totalc2', 'err': '103', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('750', 2, '>=', '751', 2) },
            { 'field': 'dec_table13_row750_totalc3', 'comparable_field': 'dec_table13_row751_totalc3', 'err': '103', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('750', 3, '>=', '751', 3) },
            { 'field': 'dec_table13_row750_totalc4', 'comparable_field': 'dec_table13_row751_totalc4', 'err': '103', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('750', 4, '>=', '751', 4) },
            { 'field': 'dec_table13_row750_totalc5', 'comparable_field': 'dec_table13_row751_totalc5', 'err': '103', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('750', 5, '>=', '751', 5) },
            { 'field': 'dec_table13_row750_totalc7', 'comparable_field': 'dec_table13_row751_totalc7', 'err': '103', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('750', 7, '>=', '751', 7) },
            { 'field': 'dec_table13_row750_totalc8', 'comparable_field': 'dec_table13_row751_totalc8', 'err': '103', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('750', 8, '>=', '751', 8) },

            // Cap. 6, Row 760
            { 'field': 'dec_table13_row760_totalc1', 'comparable_field': 'dec_table13_row761_totalc1', 'err': '104', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('760', 1, '>=', '761', 1) },
            { 'field': 'dec_table13_row760_totalc2', 'comparable_field': 'dec_table13_row761_totalc2', 'err': '104', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('760', 2, '>=', '761', 2) },
            { 'field': 'dec_table13_row760_totalc3', 'comparable_field': 'dec_table13_row761_totalc3', 'err': '104', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('760', 3, '>=', '761', 3) },
            { 'field': 'dec_table13_row760_totalc4', 'comparable_field': 'dec_table13_row761_totalc4', 'err': '104', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('760', 4, '>=', '761', 4) },
            { 'field': 'dec_table13_row760_totalc5', 'comparable_field': 'dec_table13_row761_totalc5', 'err': '104', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('760', 5, '>=', '761', 5) },
            { 'field': 'dec_table13_row760_totalc7', 'comparable_field': 'dec_table13_row761_totalc7', 'err': '104', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('760', 7, '>=', '761', 7) },
            { 'field': 'dec_table13_row760_totalc8', 'comparable_field': 'dec_table13_row761_totalc8', 'err': '104', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('760', 8, '>=', '761', 8) },

            // Cap. 6, Row 770
            { 'field': 'dec_table13_row770_totalc1', 'comparable_field': 'dec_table13_row771_totalc1', 'err': '105', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('770', 1, '>=', '771', 1) },
            { 'field': 'dec_table13_row770_totalc2', 'comparable_field': 'dec_table13_row771_totalc2', 'err': '105', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('770', 2, '>=', '771', 2) },
            { 'field': 'dec_table13_row770_totalc3', 'comparable_field': 'dec_table13_row771_totalc3', 'err': '105', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('770', 3, '>=', '771', 3) },
            { 'field': 'dec_table13_row770_totalc4', 'comparable_field': 'dec_table13_row771_totalc4', 'err': '105', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('770', 4, '>=', '771', 4) },
            { 'field': 'dec_table13_row770_totalc5', 'comparable_field': 'dec_table13_row771_totalc5', 'err': '105', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('770', 5, '>=', '771', 5) },
            { 'field': 'dec_table13_row770_totalc7', 'comparable_field': 'dec_table13_row771_totalc7', 'err': '105', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('770', 7, '>=', '771', 7) },
            { 'field': 'dec_table13_row770_totalc8', 'comparable_field': 'dec_table13_row771_totalc8', 'err': '105', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('770', 8, '>=', '771', 8) },

            // Cap. 6, Row 780
            { 'field': 'dec_table13_row780_totalc1', 'comparable_field': 'dec_table13_row781_totalc1', 'err': '106', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('780', 1, '>=', '781', 1) },
            { 'field': 'dec_table13_row780_totalc2', 'comparable_field': 'dec_table13_row781_totalc2', 'err': '106', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('780', 2, '>=', '781', 2) },
            { 'field': 'dec_table13_row780_totalc3', 'comparable_field': 'dec_table13_row781_totalc3', 'err': '106', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('780', 3, '>=', '781', 3) },
            { 'field': 'dec_table13_row780_totalc4', 'comparable_field': 'dec_table13_row781_totalc4', 'err': '106', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('780', 4, '>=', '781', 4) },
            { 'field': 'dec_table13_row780_totalc5', 'comparable_field': 'dec_table13_row781_totalc5', 'err': '106', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('780', 5, '>=', '781', 5) },
            { 'field': 'dec_table13_row780_totalc7', 'comparable_field': 'dec_table13_row781_totalc7', 'err': '106', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('780', 7, '>=', '781', 7) },
            { 'field': 'dec_table13_row780_totalc8', 'comparable_field': 'dec_table13_row781_totalc8', 'err': '106', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('780', 8, '>=', '781', 8) },

            // Cap. 6, Row 790
            { 'field': 'dec_table13_row790_totalc1', 'comparable_field': 'dec_table13_row791_totalc1', 'err': '107', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('790', 1, '>=', '791', 1) },
            { 'field': 'dec_table13_row790_totalc2', 'comparable_field': 'dec_table13_row791_totalc2', 'err': '107', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('790', 2, '>=', '791', 2) },
            { 'field': 'dec_table13_row790_totalc3', 'comparable_field': 'dec_table13_row791_totalc3', 'err': '107', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('790', 3, '>=', '791', 3) },
            { 'field': 'dec_table13_row790_totalc4', 'comparable_field': 'dec_table13_row791_totalc4', 'err': '107', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('790', 4, '>=', '791', 4) },
            { 'field': 'dec_table13_row790_totalc5', 'comparable_field': 'dec_table13_row791_totalc5', 'err': '107', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('790', 5, '>=', '791', 5) },
            { 'field': 'dec_table13_row790_totalc7', 'comparable_field': 'dec_table13_row791_totalc7', 'err': '107', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('790', 7, '>=', '791', 7) },
            { 'field': 'dec_table13_row790_totalc8', 'comparable_field': 'dec_table13_row791_totalc8', 'err': '107', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('790', 8, '>=', '791', 8) },

            // Cap. 6, Row 800
            { 'field': 'dec_table13_row800_totalc1', 'comparable_field': 'dec_table13_row801_totalc1', 'err': '108', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('800', 1, '>=', '801', 1) },
            { 'field': 'dec_table13_row800_totalc2', 'comparable_field': 'dec_table13_row801_totalc2', 'err': '108', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('800', 2, '>=', '801', 2) },
            { 'field': 'dec_table13_row800_totalc3', 'comparable_field': 'dec_table13_row801_totalc3', 'err': '108', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('800', 3, '>=', '801', 3) },
            { 'field': 'dec_table13_row800_totalc4', 'comparable_field': 'dec_table13_row801_totalc4', 'err': '108', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('800', 4, '>=', '801', 4) },
            { 'field': 'dec_table13_row800_totalc5', 'comparable_field': 'dec_table13_row801_totalc5', 'err': '108', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('800', 5, '>=', '801', 5) },
            { 'field': 'dec_table13_row800_totalc7', 'comparable_field': 'dec_table13_row801_totalc7', 'err': '108', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('800', 7, '>=', '801', 7) },
            { 'field': 'dec_table13_row800_totalc8', 'comparable_field': 'dec_table13_row801_totalc8', 'err': '108', 'validate': true, 'op': '<', 'text': comparable_err_msg_callback('800', 8, '>=', '801', 8) },
        ];

        for (var i = 0; i < comparable_fields.length; i++) {
            compare_fields(comparable_fields[i]);
        }

        var isStaticTableFilled = {
            't12': false,
            't13': false
        };
        var table13_rows = [];
        for (k in Drupal.settings.mywebform.fields) {
            var result;
            var t13_exp = /^dec_table13_([a-z]+\d*?_[a-z]+\d*?)c\d$/;
            var t12_exp = /^dec_table12_([a-z]+\d*?_[a-z]+\d*?)c\d$/;

            if ((result = k.match(t13_exp))) {
                if (table13_rows.indexOf(result[1]) === -1) {
                    table13_rows.push(result[1]);
                }

                if (Drupal.settings.mywebform.values[k] != '') {
                    isStaticTableFilled['t13'] = true;
                }
            } else if ((result = k.match(t12_exp))) {
                if (Drupal.settings.mywebform.values[k] != '') {
                    isStaticTableFilled['t12'] = true;
                }
            }
        }

        for (i = 0; i < table13_rows.length; i++) {
            var row = table13_rows[i].match(/row(\d{3})/);
            if (row) {
                row = row[1];
            }
            var currency = table13_rows[i].match(/row\d{3}_v(\d{3})/);
            if (currency) {
                currency = currency[1];
            }

            var c1_field_name = 'dec_table13_' + table13_rows[i] + 'c1';
            var c2_field_name = 'dec_table13_' + table13_rows[i] + 'c2';
            var c3_field_name = 'dec_table13_' + table13_rows[i] + 'c3';
            var c4_field_name = 'dec_table13_' + table13_rows[i] + 'c4';
            var c5_field_name = 'dec_table13_' + table13_rows[i] + 'c5';
            var c6_field_name = 'dec_table13_' + table13_rows[i] + 'c6';
            var c7_field_name = 'dec_table13_' + table13_rows[i] + 'c7';
            var c8_field_name = 'dec_table13_' + table13_rows[i] + 'c8';
            if (Decimal(values[c3_field_name] || 0).lessThan(values[c4_field_name] || 0)) {
                webform.errors.push({
                    'fieldName': c3_field_name,
                    'index': 0,
                    'weight': 96,
                    'msg': concatMessage('67-096', '', Drupal.t('Col.3 >= Col.4'))
                });
            }

            var c7_c8_sum = Decimal(values[c7_field_name] || 0).plus(values[c8_field_name] || 0);
            var c1_c2_c3_c5_c6_res = Decimal(values[c1_field_name] || 0)
                .plus(values[c2_field_name] || 0)
                .plus(values[c3_field_name] || 0)
                .minus(values[c5_field_name] || 0)
                .plus(values[c6_field_name] || 0);


            if (!c7_c8_sum.equals(c1_c2_c3_c5_c6_res)) {
                var title = '';
                if (row && currency) {
                    title = Drupal.t('Rind @row-@currency', { '@row': row, '@currency': currency });
                } else if (row) {
                    title = Drupal.t('Rind @row', { '@row': row })
                }

                webform.errors.push({ 'fieldName': c2_field_name, 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': c3_field_name, 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': c5_field_name, 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': c6_field_name, 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': c7_field_name, 'index': 0, 'msg': '' });
                webform.errors.push({ 'fieldName': c8_field_name, 'index': 0, 'msg': '' });

                webform.errors.push({
                    'fieldName': '',
                    'index': 0,
                    'weight': 97,
                    'msg': concatMessage('67-097', title, Drupal.t('(Col.7 + Col.8) = (Col.1 + Col.2 + Col.3 – Col.5 + Col.6)'))
                })
            }
        }

        if (!isSpecificCfp && !isStaticTableFilled['t12'] && !isStaticTableFilled['t13']) {
            webform.warnings.push({
                'fieldName': '',
                'index': 0,
                'msg': concatMessage('67-069', '', Drupal.t('Nu exista date in cap 5, 6'))
            });
        }

        validatePositiveFields('.cap-5', concatMessage('67-066', Drupal.t('Cap. @num', { '@num': 'V' }), Drupal.t('Valoarea trebuie sa fie pozitivă')), 66);
        validatePositiveFields('.cap-6', concatMessage('67-109', Drupal.t('Cap. @num', { '@num': 'VI' }), Drupal.t('Valoarea trebuie sa fie pozitivă')), 109);

        //Sort warnings & errors
        webform.warnings.sort(function (a, b) {
            return sort_errors_warinings(a, b);
        });

        webform.errors.sort(function (a, b) {
            return sort_errors_warinings(a, b);
        });

        webform.validatorsStatus['inv1_anual'] = 1;
        validateWebform();
    };

    function sort_errors_warinings(a, b) {
        if (!a.hasOwnProperty('weight')) {
            a.weight = 9999;
        }

        if (!b.hasOwnProperty('weight')) {
            b.weight = 9999;
        }

        return toFloat(a.weight) - toFloat(b.weight);
    }

    function validatePositiveFields(selector, msg, weight) {
        var values = Drupal.settings.mywebform.values;
        var error = false;

        jQuery(selector + ' input').each(function () {
            var fieldName = jQuery(this).attr('field');
            var allowNegative = jQuery(this).attr('allow-negative');

            if (!allowNegative && is_negative(values[fieldName])) {
                error = true;
                webform.errors.push({
                    'fieldName': fieldName,
                    'index': 0,
                    'msg': ''
                });
            }
        });

        if (error) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': weight,
                'msg': msg
            });
        }
    }

    function validate_autofields(item) {
        var values = Drupal.settings.mywebform.values;

        var field = Drupal.settings.mywebform.fields[item.rezField];
        var decimal_length = 0;
        switch (field.type) {
            case 'float':
                decimal_length = field.decimal_length;
                break
            case 'money':
                decimal_length = 2;
                break;
        }

        if (formatNumber(item.callback(), decimal_length) != formatNumber(values[item.rezField], decimal_length)) {
            var msg = item.text;
            if (typeof msg == 'function') {
                msg = msg();
            }

            webform.errors.push({
                'fieldName': item.rezField,
                'index': 0,
                'weight': parseInt(item.err),
                'msg': concatMessage('67-' + item.err, '', msg)
            });
        }
    }

    function validateGridPositiveFields(selector, msg, weight) {
        var values = Drupal.settings.mywebform.values;

        var fields = [];
        jQuery(selector + ' .drow input').each(function () {
            fields.push({
                'fieldName': jQuery(this).attr('field'),
                'allowNegative': jQuery(this).attr('allow-negative')
            });
        });

        if (!fields.length) {
            return;
        }

        for (var i = 0; i < values[fields[0].fieldName].length; i++) {
            for (var fi = 0; fi < fields.length; fi++) {
                var fieldName = fields[fi].fieldName;
                var allowNegative = fields[fi].allowNegative;

                if (!allowNegative && is_negative(values[fieldName][i])) {
                    webform.errors.push({
                        'fieldName': fieldName,
                        'index': i,
                        'weight': weight,
                        'msg': msg
                    });
                }
            }
        }
    }

    function concatMessage(errorCode, fieldTitle, msg) {
        var titleParts = [];

        if (fieldTitle) {
            titleParts.push(fieldTitle);
        }

        if (errorCode) {
            titleParts.push(getErrorMessage(errorCode));
        }

        if (titleParts.length) {
            msg = titleParts.join(' - ') + '. ' + msg;
        }

        return msg;
    }

    function getErrorMessage(errorCode) {
        return Drupal.t('Error code: @error_code', { '@error_code': errorCode });
    }

    function compare_fields(item) {
        var values = Drupal.settings.mywebform.values;
        var validate = !item.hasOwnProperty('validate') || item.validate;

        if (validate) {
            var value = values[item.field];
            var comparable_value = 0;
            if (typeof item.comparable_field == 'function') {
                comparable_value = item.comparable_field();
            } else {
                comparable_value = values[item.comparable_field];
            }

            var expression = toFloat(value) + item.op + toFloat(comparable_value);
            if (eval(expression)) {
                var msg = item.text;
                if (typeof msg == 'function') {
                    msg = msg();
                }

                webform.errors.push({
                    'fieldName': item.field,
                    'index': 0,
                    'weight': parseInt(item.err),
                    'msg': concatMessage('67-' + item.err, '', msg)
                });
            }
        }
    }
})(jQuery);

/**Tab2**********************/
function changeIdCountryNext2(elem) {
    var valName = elem.name;
    var valTab = (elem.name).substr(16, 1);
    var NumeTab = elem.name;
    /* Table10_row */
    if (valName.length > 27) {
        valTab = (elem.name).substr(16, 2);

    }
    var elemnt = jQuery(elem).closest('tr').find('input.dec_dinamicTable_row_cc');
    var elemnt_1 = jQuery(elem).closest('tr').find('input.dec_dinamicTable_row_cb');
    if (jQuery(elem).val() == elemnt.val())
        return;
    var i = 0;
    var cautare = 0;
    var FaraDen = 0;
    var ElementActiv = document.activeElement.id;
    var IdElementActiv = valName.substr(valName.indexOf("[") + 1, (valName.indexOf("]") - valName.indexOf("[") - 1));

    var fields_table1_c1 = jQuery('#tab_con1 tbody tr td:nth-child(4)').find('input');
    var fields_table1_c2 = jQuery('#tab_con1 tbody tr td:nth-child(2)').find('select');

    var fields_table1_c2_ = jQuery('#tab_con2 tbody tr td:nth-child(2)').find('select');
    var ddd = "dec_dinamicTable2_row_cc-" + IdElementActiv;
    var ddd1 = "dec_dinamicTable2_row_c1";
    if (valTab == 2) {
        fields_table1_c2_ = jQuery('#tab_con2 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable2_row_cc-" + IdElementActiv;
        ddd1 = "dec_dinamicTable2_row_c1";
    }
    if (valTab == 3) {
        fields_table1_c2_ = jQuery('#tab_con3 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable3_row_cc-" + IdElementActiv;
        ddd1 = "dec_dinamicTable3_row_c1";
    }
    if (valTab == 4) {
        fields_table1_c2_ = jQuery('#tab_con4 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable4_row_cc-" + IdElementActiv;
        ddd1 = "dec_dinamicTable4_row_c1";
    }
    if (valTab == 5) {
        fields_table1_c2_ = jQuery('#tab_con5 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable5_row_cc-" + IdElementActiv;
        ddd1 = "dec_dinamicTable5_row_c1";
    }
    if (valTab == 6) {
        fields_table1_c2_ = jQuery('#tab_con6 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable6_row_cc-" + IdElementActiv;
        ddd1 = "dec_dinamicTable6_row_c1";
    }
    if (valTab == 7) {
        fields_table1_c2_ = jQuery('#tab_con7 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable7_row_cc-" + IdElementActiv;
        ddd1 = "dec_dinamicTable7_row_c1";
    }
    if (valTab == 8) {
        fields_table1_c2_ = jQuery('#tab_con8 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable8_row_cc-" + IdElementActiv;
        ddd1 = "dec_dinamicTable8_row_c1";
    }
    if (valTab == 9) {
        fields_table1_c2_ = jQuery('#tab_con9 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable9_row_cc-" + IdElementActiv;
        ddd1 = "dec_dinamicTable9_row_c1";
    }
    if (valTab == 10) {

        fields_table1_c2_ = jQuery('#tab_con10 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable10_row_cc-" + IdElementActiv;
        ddd1 = "dec_dinamicTable10_row_c1";
    }
    if (valTab == 11) {

        fields_table1_c2_ = jQuery('#tab_con11 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable11_row_cc-" + IdElementActiv;
        ddd1 = "dec_dinamicTable11_row_c1";
    }

    var NameTara = fields_table1_c2_[IdElementActiv - 1].options[fields_table1_c2_[IdElementActiv - 1].selectedIndex].innerHTML;

    for (i = 0; i < (fields_table1_c2.length - 1); i++) {
        if ((NameTara == fields_table1_c2[i].options[fields_table1_c2[i].selectedIndex].innerHTML || (NumeTab.includes('Table10_row') || NumeTab.includes('Table11_row')))) {
            cautare = 1;
            document.getElementById(ddd).value = jQuery(fields_table1_c2_[IdElementActiv - 1]).val();
        }
        if (fields_table1_c2[i].options[fields_table1_c2[i].selectedIndex].innerHTML == "") {
            FaraDen = 0;
        }
    }
    if (FaraDen == 1) {
        mywebform_alert("1-INVEST(anual) - In Rind.020.*, 030.*,…, 090.* pot fi reflectate doar coduri tarilor care sunt in Rind.010");
        fields_table1_c2_[IdElementActiv - 1].selectedIndex = 0;
        document.getElementById(ddd).value = "";
    } else {
        if (cautare == 0) {
            mywebform_alert("1-INVEST(anual) - In Rind.020.*, 030..*,…, 090.* pot fi reflectate doar coduri tarilor care sunt in Rind.010");
            fields_table1_c2_[IdElementActiv - 1].selectedIndex = 0;
            document.getElementById(ddd).value = "";
        }
    }

    var cautare1 = 0;
    for (i = 0; i < (fields_table1_c2_.length - 1); i++) {
        if (((jQuery(elem).val() == jQuery(fields_table1_c2_[i]).val()) && ((IdElementActiv - 1) != i)) && (fields_table1_c2_[IdElementActiv - 1].selectedIndex != 0)) {
            var val_y = jQuery(elem).val();
            var selectedIndex = fields_table1_c2_[i].selectedIndex;
            var selection = fields_table1_c2_[i].options[fields_table1_c2_[i].selectedIndex].innerHTML;
            cautare1 = 1;
        }
    }
    if (cautare1 == 1) {
        mywebform_alert("1-INVEST(anual) - In Rind.020.*, 030...*,…, 090.* pot fi reflectate doar coduri tarilor care sunt in Rind.010");
        fields_table1_c2_[IdElementActiv - 1].selectedIndex = 0;
        document.getElementById(ddd).value = "";
        cautare1 = 0;
    }
}

function changeIdCountry(elem) {
    var elemnt = jQuery(elem).closest('tr').find('input.dec_dinamicTable_row_cc');
    var elemnt_1 = jQuery(elem).closest('tr').find('input.dec_dinamicTable_row_cb');
    if (jQuery(elem).val() == elemnt.val())
        return;

    var fields_table1_c1 = jQuery('#tab_con1 tbody tr td:nth-child(4)').find('input');
    var fields_table1_c2 = jQuery('#tab_con1 tbody tr td:nth-child(2)').find('select');
    var fields_table1_c3 = jQuery('#tab_con1 tbody tr td:nth-child(3)').find('input');
    var ElementActiv = document.activeElement.id;
    var IdElementActiv = ElementActiv.substring(25);
    var NameTara = fields_table1_c2[IdElementActiv - 1].options[fields_table1_c2[IdElementActiv - 1].selectedIndex].innerHTML;
    var i = 0;
    var cautare = 0;

    for (i = 0; i < (fields_table1_c1.length - 1); i++) {
        if ((jQuery(elem).val() == jQuery(fields_table1_c2[i]).val()) && ((IdElementActiv - 1) != i)) {
            var val_y = jQuery(elem).val();
            var selectedIndex = fields_table1_c2[i].selectedIndex;
            var selection = fields_table1_c2[i].options[fields_table1_c2[i].selectedIndex].innerHTML;
            mywebform_alert("Exista deja  tara - " + selection);
            cautare = 1;
        }
    }
    if (cautare == 1) {
        fields_table1_c2[IdElementActiv - 1].selectedIndex = 0;
        cautare = 0;
    } else {
        var field_name_cc = "dec_dinamicTable1_row_cc-" + IdElementActiv;
        var country_val = jQuery(fields_table1_c2[IdElementActiv - 1]).val();
        jQuery("#" + field_name_cc).val(country_val).trigger('change');
    }
}

function changeSelectCountry(elem) {
    var valName = elem.name;
    var valTab = (elem.name).substr(16, 1);
    if (valName.length > 27) {
        valTab = (elem.name).substr(16, 2);
    }

    var getValue = jQuery(elem).val();
    var ElementActiv = document.activeElement.id;

    IdElementActiv = valName.substr(valName.indexOf("[") + 1, (valName.indexOf("]") - valName.indexOf("[") - 1));

    var fields_table1_c2_ = jQuery('#tab_con1 tbody tr td:nth-child(2)').find('select');
    var ddd = "dec_dinamicTable1_row_cc-" + IdElementActiv;
    if (valTab == 1) {
        fields_table1_c2_ = jQuery('#tab_con1 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable1_row_cc-" + IdElementActiv;
    }
    if (valTab == 2) {
        fields_table1_c2_ = jQuery('#tab_con2 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable2_row_cc-" + IdElementActiv;
    }
    if (valTab == 3) {
        fields_table1_c2_ = jQuery('#tab_con3 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable3_row_cc-" + IdElementActiv;
    }
    if (valTab == 4) {
        fields_table1_c2_ = jQuery('#tab_con4 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable4_row_cc-" + IdElementActiv;
    }
    if (valTab == 5) {
        fields_table1_c2_ = jQuery('#tab_con5 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable5_row_cc-" + IdElementActiv;
    }
    if (valTab == 6) {
        fields_table1_c2_ = jQuery('#tab_con6 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable6_row_cc-" + IdElementActiv;
    }
    if (valTab == 7) {
        fields_table1_c2_ = jQuery('#tab_con7 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable7_row_cc-" + IdElementActiv;
    }
    if (valTab == 8) {
        fields_table1_c2_ = jQuery('#tab_con8 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable8_row_cc-" + IdElementActiv;
    }
    if (valTab == 9) {
        fields_table1_c2_ = jQuery('#tab_con9 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable9_row_cc-" + IdElementActiv;
    }
    if (valTab == 10) {
        fields_table1_c2_ = jQuery('#tab_con10 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable10_row_cc-" + IdElementActiv;
    }
    if (valTab == 11) {
        fields_table1_c2_ = jQuery('#tab_con11 tbody tr td:nth-child(2)').find('select');
        ddd = "dec_dinamicTable11_row_cc-" + IdElementActiv;
    }
    var fields_table1_c3 = jQuery('#tab_con1 tbody tr td:nth-child(3)').find('input');
    if (jQuery(elem).closest('tr').find('select.dec_dinamicTable_row_cb option[value=' + getValue + ']').length > 0) {
        jQuery(elem).closest('tr').find('select.dec_dinamicTable_row_cb').val(getValue).change();
        return true;
    }

    document.getElementById(ddd).value = '';
    fields_table1_c2_[IdElementActiv - 1].selectedIndex = 0;

    return false;
}