(function ($) {
    var specificCondition = null;
    var completedTables = {
        'processed': false,
        'tables': {}
    };
    var tablesLimitations = [
        { 'id': '3', 'lim': 5, 'rd': '020' },
        { 'id': '4', 'lim': 5, 'rd': '030' },
        { 'id': '5', 'lim': 5, 'rd': '040' },
        { 'id': '6', 'lim': 5, 'rd': '050' },
        { 'id': '7', 'lim': 5, 'rd': '070' },
        { 'id': '8', 'lim': 5, 'rd': '080' },
        { 'id': '9', 'lim': 5, 'rd': '090' },
        { 'id': '10', 'lim': 5, 'rd': '100' },
        { 'id': '11', 'lim': 7, 'rd': '020' },
        { 'id': '12', 'lim': 7, 'rd': '030' },
        { 'id': '13', 'lim': 7, 'rd': '040' },
        { 'id': '14', 'lim': 7, 'rd': '040' },
        { 'id': '15', 'lim': 7, 'rd': '060' },
        { 'id': '16', 'lim': 15, 'rd': '080' },
        { 'id': '18', 'lim': 7, 'rd': '090' },
        { 'id': '19', 'lim': 7, 'rd': '100' },
        { 'id': '20', 'lim': 10, 'rd': '110' },
        { 'id': '21', 'lim': 5, 'rd': '020' },
        { 'id': '23', 'lim': 5, 'rd': '030' },
        { 'id': '24', 'lim': 5, 'rd': '040' },
        { 'id': '25', 'lim': 5, 'rd': '050' },
        { 'id': '26', 'lim': 5, 'rd': '070' },
        { 'id': '27', 'lim': 5, 'rd': '080' },
        { 'id': '28', 'lim': 5, 'rd': '090' },
        { 'id': '29', 'lim': 5, 'rd': '100' },
        { 'id': '30', 'lim': 5, 'rd': '110' },
        { 'id': '31', 'lim': 50, 'rd': '020' },
        { 'id': '32', 'lim': 50, 'rd': '030' },
        { 'id': '33', 'lim': 10, 'rd': '040' },
        { 'id': '34', 'lim': 10, 'rd': '050' },
        { 'id': '35', 'lim': 20, 'rd': '060' },
        { 'id': '36', 'lim': 50, 'rd': '080' },
        { 'id': '37', 'lim': 50, 'rd': '090' },
        { 'id': '38', 'lim': 25, 'rd': '100' },
        { 'id': '39', 'lim': 30, 'rd': '110' },
        { 'id': '42', 'lim': 5, 'rd': '020' },
        { 'id': '43', 'lim': 5, 'rd': '030' },
        { 'id': '44', 'lim': 5, 'rd': '050' },
        { 'id': '45', 'lim': 5, 'rd': '060' },
        { 'id': '46', 'lim': 7, 'rd': '010' },
        { 'id': '47', 'lim': 15, 'rd': '020' },
        { 'id': '48', 'lim': 7, 'rd': '030' },
        { 'id': '49', 'lim': 15, 'rd': '020' },
        { 'id': '50', 'lim': 20, 'rd': '030' },
        { 'id': '51', 'lim': 7, 'rd': '040' },
        { 'id': '52', 'lim': 15, 'rd': '050' },
        { 'id': '53', 'lim': 50, 'rd': '060' },
        { 'id': '54', 'lim': 15, 'rd': '080' },
        { 'id': '55', 'lim': 10, 'rd': '090' },
        { 'id': '56', 'lim': 15, 'rd': '100' },
        { 'id': '57', 'lim': 50, 'rd': '100' },
    ];

    Drupal.behaviors.rsf1 = {
        attach: function (context, settings) {
            $('#mywebform-edit-form').on('change', 'input:not(".input-country")', function () {
                var fieldName = $(this).attr('field');

                if (fieldName && Drupal.settings.mywebform.fields.hasOwnProperty(fieldName)) {
                    switch (Drupal.settings.mywebform.fields[fieldName].type) {
                        case 'numeric':
                            var val = $(this).val();
                            if (val.length) {
                                val = toFloat(val);
                                $(this).val(val);
                            }
                            break;
                    }
                }
            });

            jQuery('#mywebform-edit-form').on('keypress', 'input.numeric, input.float, input.money', function (event) {
                var allowNegative = jQuery(this).attr('allow-negative') || false;
                if (isNumberPressed(this, event, allowNegative) === false) {
                    event.preventDefault();
                }
            });

            jQuery('#mywebform-edit-form', context).on('paste', 'input.numeric, input.money, input.float', function (event) {
                var obj = event.originalEvent || event;

                if (typeof obj.clipboardData !== 'undefined') {
                    var value = obj.clipboardData.getData('text/plain');
                    var number = Number(value);
                    var isNotNumber = isNaN(number);

                    if (jQuery(this).hasClass('allow-negative')) {
                        if (isNotNumber) {
                            event.preventDefault();
                        }
                    } else {
                        if (isNotNumber || is_negative(number)) {
                            event.preventDefault();
                        }
                    }
                }
            });

            if (!Drupal.settings.mywebform.preview) {
                var periodInfo = Drupal.settings.mywebform.period;
                $("#dec_period_from").datepicker("option", "minDate", new Date(periodInfo.start.year, periodInfo.start.month - 1, periodInfo.start.day));
                $("#dec_period_from").datepicker("option", "maxDate", new Date(periodInfo.end.year, periodInfo.end.month - 1, periodInfo.end.day));

                $("#dec_period_to").datepicker("option", "minDate", new Date(periodInfo.start.year, periodInfo.start.month - 1, periodInfo.start.day));
                $("#dec_period_to").datepicker("option", "maxDate", new Date(periodInfo.end.year, periodInfo.end.month - 1, periodInfo.end.day));
            }

            $('#dec_period_to').on('change', function () {
                var val = $(this).val();
                var year = '';

                if (val) {
                    var periodArr = val.split('.');
                    if (periodArr.length == 3) {
                        year = periodArr[2];
                    }
                }
                var periodYearEl = $('#nalogPeriodYear');
                periodYearEl.val(year).trigger('change');
                if (periodYearEl.val() !== year) {
                    mywebform_alert('Anul ' + year + ' nu este o valoare admisibilă');
                }
            });
        }
    };

    webform.beforeLoad.rsf1 = function () {
        $('#dinamicAttachments').on('mywebform:showFileInfo', '.mywebform-file-widget', function () {
            $(this).parents('div.row').find('.delrow').show();
        });

        $('#dinamicAttachments').on('mywebform:sync', '.mywebform-file-widget', function () {
            var length = Drupal.settings.mywebform.values.dec_dinamicAttachments_row_file.length;
            if (Drupal.settings.mywebform.values.dec_dinamicAttachments_row_file[length - 1] != '') {
                $('#dinamicAttachments .grid-addrow').trigger('click');
            }
        });
    };

    webform.afterLoad.rsf1_tablesLimits = function () {
        if (!Drupal.settings.mywebform.preview) {
            for (var i = 0; i < tablesLimitations.length; i++) {
                var table = tablesLimitations[i];
                (function (e) {
                    var fieldName = 'dec_dinamicTable' + e.id + '_row_r1';
                    var addButton = jQuery('#dinamicTable' + e.id + ' .dinamicTable' + e.id + '-grid-addrow');

                    if (Drupal.settings.mywebform.values[fieldName].length > e.lim) {
                        addButton.css('display', 'none');
                        addButton.addClass("disabled");
                    }

                    jQuery('#dinamicTable' + e.id).on('row_added', function () {
                        if (Drupal.settings.mywebform.values[fieldName].length == e.lim) {
                            addButton.css('display', 'none');
                            addButton.addClass("disabled");
                        }
                    });

                    jQuery('#dinamicTable' + e.id).on('row_deleted', function () {
                        if (Drupal.settings.mywebform.values[fieldName].length < e.lim) {
                            addButton.css('display', 'block');
                            addButton.removeClass("disabled");
                        }
                    });
                })(table);
            }
        } else {
            if (!Drupal.settings.mywebform.values.dec_lichidare) {
                $(".lichidare").hide();
            }
        }
    };

    webform.validators.validate_rsf1_1 = function () {
        var values = Drupal.settings.mywebform.values;

        isSpecificCondition(true);
        identifyCompletedTables(true);

        for (var i = 0; i < tablesLimitations.length; i++) {
            var table = tablesLimitations[i];
            (function (e) {
                var fieldName = 'dec_dinamicTable' + e.id + '_row_r1';

                if (Drupal.settings.mywebform.values[fieldName].length > e.lim) {
                    webform.errors.push({
                        'fieldName': fieldName,
                        'index': 0,
                        'weight': 0,
                        'table': anexa9_getTableNumber(e.id),
                        'row': e.rd,
                        'options': {
                            'hide_title': true
                        },
                        'msg': concatMessage('RF1-360', '', Drupal.t('Anexa 9 tab @tab rd @rd - Numarul de randuri nu poate depasi @lim', {
                            '@tab': anexa9_getTableNumber(e.id),
                            '@rd': e.rd,
                            '@lim': e.lim
                        })),
                    });
                }
            })(table);
        }

        var orgs = [890, 899, 900, 930, 700, 940, 970, 910, 960];
        var excludeIdno = ['1016600004811', '1015600041312', '1002600008706', '1007607008364', '1011604000182', '1016600017134'];
        if (orgs.indexOf(toFloat(values.dec_fiscCod_cfoj)) !== -1) {
            webform.errors.push({
                'fieldName': 'dec_fiscCod_cfoj',
                'index': 0,
                'weight': 4,
                'msg': concatMessage('RF1-004', '', Drupal.t('Dacă forma organizatorico-juridică este 890,899,900,930,700,940,970,910,960 – entitatea prezintă raportul "Situaţii financiare ale organizaţiilor necomerciale"')),
            });
        }

        if (values.dec_fiscCod_nrScriptic.length == 0) {
            webform.warnings.push({
                'fieldName': 'dec_fiscCod_nrScriptic',
                'index': 0,
                'weight': 1,
                'msg': concatMessage('RF1-001', '', Drupal.t('Nu este completat numărul mediu scriptic al personalului pentru perioada anului trecut')),
            });
        }

        var startPeriod = values.dec_period_from.split(".");
        var startYear = parseInt(startPeriod[2]);
        var lastYear = new Date().getFullYear() - 1;
        if (startYear < lastYear) {
            webform.errors.push({
                'fieldName': 'dec_period_from',
                'index': 0,
                'weight': 351,
                'msg': concatMessage('RF1-351', '', Drupal.t('Data inceputului perioadei de raportare nu este corecta')),
            });
        }

        var fiscCodes = [
            { 'code': '1016600004811' },
            { 'code': '1015600041312' },
            { 'code': '1002600008706' },
            { 'code': '1007607008364' },
            { 'code': '1011604000182' },
            { 'code': '1016600017134' }
        ];
        var currentDate = new Date();
        var lastYear = new Date().getFullYear() - 1;
        var plusDays = isLeap(new Date().getFullYear()) ? 151 : 150;
        var validDate = new Date(lastYear, 11, 31 + plusDays, 23, 59, 59); // lastYear/12/31 + 150 || 151 days
        var endPeriod = values.dec_period_to.split(".");
        var validEndPeriod = new Date(endPeriod[2], parseInt(endPeriod[1]) - 1, parseInt(endPeriod[0]) + plusDays, 23, 59, 59);
        var isOneFromList = false;
        for (var i = 0; i < fiscCodes.length; i++) {
            if (values.dec_fiscCod_fiscal == fiscCodes[i].code) {
                isOneFromList = true;
                break;
            }
        }
        var erObj350 = {
            'index': 0,
            'weight': 350,
            'msg': concatMessage('RF1-350', '', Drupal.t('Termenul prezentarii a Situatiilor financiare a expirat')),
        };

        if (Drupal.settings.declarations.declarations_submission_deadline_rsf1) {
            if (!isOneFromList) {
                if (currentDate > validDate) {
                    erObj350.fieldName = 'dec_period_from';
                    webform.errors.push(erObj350);
                }
            } else {
                if (currentDate > validEndPeriod) {
                    erObj350.fieldName = 'dec_period_to';
                    webform.errors.push(erObj350);
                }
            }
        }

        var r13_suma = toFloat(values.dec_table6_r13_suma);
        var suma_250_260 = toFloat(values.dec_table2_row_r250c5) + toFloat(values.dec_table2_row_r260c5);
        if (errorActuality(['table6', 'table2']) && r13_suma > suma_250_260) {
            webform.errors.push({
                'fieldName': 'dec_table6_r13_suma',
                'index': 0,
                'weight': 42,
                'msg': concatMessage('RF1-042', '', Drupal.t('Anexa 6 rd.13 <= Anexa 1 (rd.250 + rd.260) col.5, (@val1 ; @val2)', {
                    '@val1': r13_suma,
                    '@val2': suma_250_260
                })),
            });
        }

        var r14_suma = toFloat(values.dec_table6_r14_suma);
        var suma_250_260 = toFloat(values.dec_table2_row_r250c5) + toFloat(values.dec_table2_row_r260c5);
        if (errorActuality(['table6', 'table2']) && r14_suma > suma_250_260) {
            webform.errors.push({
                'fieldName': 'dec_table6_r14_suma',
                'index': 0,
                'weight': 43,
                'msg': concatMessage('RF1-043', '', Drupal.t('Anexa 6 rd.14 <= Anexa 1 (rd.250 + rd.260) col.5, (@val1 ; @val2)', {
                    '@val1': r14_suma,
                    '@val2': suma_250_260
                })),
            });
        }

        var r9_vgaj = toFloat(values.dec_table6_r9_vgaj);
        var r310c5 = toFloat(values.dec_table2_row_r310c5);
        if (errorActuality(['table6', 'table2']) && r9_vgaj > r310c5) {
            webform.errors.push({
                'fieldName': 'dec_table6_r9_vgaj',
                'index': 0,
                'weight': 44,
                'msg': concatMessage('RF1-044', '', Drupal.t('Anexa 6 rd.9 1) <= Anexa 1 rd.310 col.5, (@val1 ; @val2)', {
                    '@val1': r9_vgaj,
                    '@val2': r310c5
                })),
            });
        }

        var vcontabil = toFloat(values.dec_table6_r9_vcontabil);
        var r310c5 = toFloat(values.dec_table2_row_r310c5);
        if (errorActuality(['table6', 'table2']) && vcontabil > r310c5) {
            webform.errors.push({
                'fieldName': 'dec_table6_r9_vcontabil',
                'index': 0,
                'weight': 45,
                'msg': concatMessage('RF1-045', '', Drupal.t('Anexa 6 rd.9 2) <= Anexa 1 rd.310 col.5, (@val1 ; @val2)', {
                    '@val1': vcontabil,
                    '@val2': r310c5
                })),
            });
        }

        if (values.dec_table3_row_r120c4 != values.dec_table2_row_r360c5) {
            webform.errors.push({
                'fieldName': 'dec_table3_row_r120c4',
                'index': 0,
                'weight': 68,
                'msg': concatMessage('RF1-068', '', Drupal.t('Anexa 2 rd.120 col.4 = Anexa 1 rd.360 col.5, (@val1 ; @val2)', {
                    '@val1': values.dec_table3_row_r120c4,
                    '@val2': values.dec_table2_row_r360c5
                })),
            });
        }

        if ((toFloat(values.dec_table3_row_r020c3) && toFloat(values.dec_table3_row_r020c4)) > 0 && (values.dec_table3_row_r010c3 && values.dec_table3_row_r010c4) == 0) {
            webform.errors.push({
                'fieldName': 'dec_table3_row_r010c3',
                'index': 0,
                'weight': 69,
                'msg': concatMessage('RF1-069', '', Drupal.t('Anexa 2 Daca rd.20 col.3,4 > 0, atunci si rd.10 col.3,4 > 0')),
            });
            webform.errors.push({
                'fieldName': 'dec_table3_row_r010c4',
                'index': 0,
                'weight': 69,
                'msg': '',
            });
        }

        var str2 = ['010', '020', '040', '050', '060', '070'];
        var col2 = [3, 4];
        for (var i = 0; i < str2.length; i++) {
            for (var k = 0; k < col2.length; k++) {
                var fieldName = 'dec_table3_row_r' + str2[i] + 'c' + col2[k];
                if (toFloat(values[fieldName]) < 0) {
                    webform.errors.push({
                        'fieldName': fieldName,
                        'index': 0,
                        'weight': 70,
                        'msg': concatMessage('RF1-070', '', Drupal.t('Anexa 2 Valoarea rîndului trebuie sa fie pozitivă')),
                    });
                }
            }
        }

        var row_suma = toFloat(sum(values.dec_dinamicTable2_row_suma));
        var r13_suma = toFloat(values.dec_table6_r13_suma);
        if (errorActuality(['table6', 'table2']) && row_suma != r13_suma) {
            webform.errors.push({
                'fieldName': 'dec_table6_r13_suma',
                'index': 0,
                'weight': 93,
                'msg': concatMessage('RF1-093', '', Drupal.t('Anexa 6 Rd.13 „Total„ = suma rîndurilor pe valute, (@val1 ; @val2)', {
                    '@val1': row_suma,
                    '@val2': r13_suma
                })),
            });
        }

        var cfpNum = toFloat(values.dec_fiscCod_cfp);
        if ((cfpNum == 12 || cfpNum == 13) && (toFloat(values.dec_table6_r2_n1cotas) != toFloat(values.dec_table6_r2_suma))) {
            var obj094 = {
                'fieldName': 'dec_table6_r2_n1cotas',
                'index': 0,
                'weight': 94,
                'msg': concatMessage('RF1-094', '', Drupal.t('Anexa 6 Dacă cod CFP = 12, 13, atunci cota statului este egal cu capitalul social')),
            };

            if (values.dec_table6_r2_n1cotas) {
                webform.errors.push(obj094);
            } else {
                webform.warnings.push(obj094);
            }
        }

        if (cfpNum && cfpNum == 20 && !toFloat(values.dec_table6_r2_n1cotas)) {
            webform.errors.push({
                'fieldName': 'dec_table6_r2_n1cotas',
                'index': 0,
                'weight': 95,
                'msg': concatMessage('RF1-095', '', Drupal.t('Anexa 6 Dacă cod CFP = 20, trebuie să fie completat cota statului (rd.2)')),
            });
        }

        var cfojArr = ['500', '510', '520'];
        if (cfojArr.indexOf(values.dec_fiscCod_cfoj) === -1) {
            if (toFloat(values.dec_table6_r10_unitati) > 0) {
                webform.errors.push({
                    'fieldName': 'dec_table6_r10_unitati',
                    'index': 0,
                    'weight': 78,
                    'msg': concatMessage('RF1-078', '', Drupal.t('Anexa 6 Rd.10 se completează de către Societăţile pe Acţiuni')),
                });
            }
            if ((toFloat(values.dec_table6_r11_profit) > 0 || toFloat(values.dec_table6_r11_pierdere) > 0)) {
                webform.errors.push({
                    'fieldName': 'dec_table6_r11_profit',
                    'index': 0,
                    'weight': 78,
                    'msg': concatMessage('RF1-078', '', Drupal.t('Anexa 6 Rd.11 se completează de către Societăţile pe Acţiuni')),
                });
                webform.errors.push({
                    'fieldName': 'dec_table6_r11_pierdere',
                    'index': 0,
                    'weight': 78,
                    'msg': '',
                });
            }
            if ((toFloat(values.dec_table6_r12_platite) > 0 || toFloat(values.dec_table6_r12_planificate) > 0)) {
                webform.errors.push({
                    'fieldName': 'dec_table6_r12_platite',
                    'index': 0,
                    'weight': 78,
                    'msg': concatMessage('RF1-078', '', Drupal.t('Anexa 6 Rd.12 se completează de către Societăţile pe Acţiuni')),
                });
                webform.errors.push({
                    'fieldName': 'dec_table6_r12_planificate',
                    'index': 0,
                    'weight': 78,
                    'msg': '',
                });
            }
        }

        var rowsA7 = ['100', '200', '210', '220', '230', '300', '400', '500', '510', '520', '530', '531', '540', '550', '560', '570', '580', '590', '600', '700'];
        for (var i = 0; i < rowsA7.length; i++) {
            var field = 'dec_table7_row_r' + rowsA7[i] + 'c';
            var fieldsC2 = field + '2';
            var fieldsC3 = field + '3';
            var fieldsC4 = field + '4';
            var rez234 = values[fieldsC2] - values[fieldsC3] - values[fieldsC4];
            if (rez234 < 0) {
                webform.errors.push({
                    'fieldName': fieldsC2,
                    'index': 0,
                    'weight': 145,
                    'msg': concatMessage('RF1-145', '', Drupal.t('Anexa 7 Valoare de bilanț nu poate fi negativă col.2 - col.3 – col.4 >= 0')),
                });
            }

            var fieldsC7 = field + '7';
            var fieldsC8 = field + '8';
            var fieldsC9 = field + '9';
            var rez789 = values[fieldsC7] - values[fieldsC8] - values[fieldsC9];
            if (rez789 < 0) {
                webform.errors.push({
                    'fieldName': fieldsC7,
                    'index': 0,
                    'weight': 146,
                    'msg': concatMessage('RF1-146', '', Drupal.t('Anexa 7 Valoare de bilanț nu poate fi negativă col.7 - col.8 – col.9 >= 0')),
                });
            }
        }

        if (values.dec_table6_r5_pers == 0) {
            webform.warnings.push({
                'fieldName': 'dec_table6_r5_pers',
                'index': 0,
                'weight': 96,
                'msg': concatMessage('RF1-096', '', Drupal.t('Anexa 6 La sfirsitul perioadei nu este personal (rd.5)?')),
            });
        }

        if (!toFloat(values.dec_table6_r4_nrmediu)) {
            webform.errors.push({
                'fieldName': 'dec_table6_r4_nrmediu',
                'index': 0,
                'weight': 79,
                'msg': concatMessage('RF1-079', '', Drupal.t('Anexa 6 Indicați numărul de personal rd.4 (mai mult de 0)')),
            });
        }

        var r4_nrmediu = toFloat(values.dec_table6_r4_nrmediu);
        var r4_pa_mun = toFloat(values.dec_table6_r4_pa) + toFloat(values.dec_table6_r4_mun);
        if (r4_nrmediu < r4_pa_mun) {
            webform.errors.push({
                'fieldName': 'dec_table6_r4_nrmediu',
                'index': 0,
                'weight': 80,
                'msg': concatMessage('RF1-080', '', Drupal.t('Anexa 6 rd.4 >= rd.4 1) + rd.4 2), (@val1 ; @val2)', {
                    '@val1': r4_nrmediu,
                    '@val2': r4_pa_mun
                })),
            });
        }

        var r9_vgaj = values.dec_table6_r9_vgaj;
        var r9_vcontabil = values.dec_table6_r9_vcontabil;
        if (r9_vgaj > 0 && r9_vcontabil == 0) {
            webform.errors.push({
                'fieldName': 'dec_table6_r9_vcontabil',
                'index': 0,
                'weight': 90,
                'msg': concatMessage('RF1-090', '', Drupal.t('Anexa 6 Dacă Rd.9 col.1>0, atunci şi Rd.9 col.2>0, (@val1 ; @val2)', {
                    '@val1': r9_vgaj,
                    '@val2': r9_vcontabil
                })),
            });
        }

        if (r9_vcontabil > 0 && r9_vgaj == 0) {
            webform.errors.push({
                'fieldName': 'dec_table6_r9_vgaj',
                'index': 0,
                'weight': 91,
                'msg': concatMessage('RF1-091', '', Drupal.t('Anexa 6 Dacă Rd.9 col.2>0, atunci şi Rd.9 col.1>0, (@val1 ; @val2)', {
                    '@val1': r9_vcontabil,
                    '@val2': r9_vgaj
                })),
            });
        }

        var r8_suma = toFloat(values.dec_table6_r8_suma);
        var r8_sumaramb = toFloat(values.dec_table6_r8_sumaramb);
        if (r8_suma < r8_sumaramb) {
            webform.errors.push({
                'fieldName': 'dec_table6_r8_suma',
                'index': 0,
                'weight': 92,
                'msg': concatMessage('RF1-092', '', Drupal.t('Anexa 6 Rd.8 col.1>= Rd.8 col.2, (@val1 ; @val2)', {
                    '@val1': r8_suma,
                    '@val2': r8_sumaramb
                })),
            });
        }

        jQuery('.positiv input').each(function () {
            var fieldName = jQuery(this).attr("field");
            if (toFloat(fieldName) < 0) {
                webform.errors.push({
                    'fieldName': fieldName,
                    'index': 0,
                    'weight': 238,
                    'msg': concatMessage('RF1-238', '', Drupal.t('Anexa 6 valoarea trebuie sa fie pozitivă')),
                });
            }
        });

        var r590c5 = formatNumber(values['dec_table2_row_r590c5'], 0);
        var r310c5 = formatNumber(values['dec_table2_row_r310c5'], 0);
        if (r310c5 != r590c5) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r590c5',
                'index': 0,
                'weight': 27,
                'msg': concatMessage('RF1-027', '', Drupal.t('Anexa 1 Rd.310 col.5 = Rd.590 col.5, (@val1 ; @val2)', {
                    '@val1': r310c5,
                    '@val2': r590c5
                })),
            });
        }

        var r590c4 = formatNumber(values['dec_table2_row_r590c4'], 0);
        var r310c4 = formatNumber(values['dec_table2_row_r310c4'], 0);
        if (r590c4 != r310c4) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r590c4',
                'index': 0,
                'weight': 27,
                'msg': concatMessage('RF1-027', '', Drupal.t('Anexa 1 Rd.310 col.4 = Rd.590 col.4, (@val1 ; @val2)', {
                    '@val1': r310c4,
                    '@val2': r590c4
                })),
            });
        }

        var excludeFields = [
            'dec_table2_row_r340c5',
            'dec_table2_row_r350c4',
            'dec_table2_row_r350c5',
            'dec_table2_row_r360c5',
            'dec_table2_row_r390c4',
            'dec_table2_row_r390c5'
        ];

        var annex1IsEmpty = true;
        jQuery('table.annex-1 input').each(function () {
            var $this = jQuery(this);
            var fieldName = $this.attr('field');

            if (fieldName && fieldName in values) {
                if (excludeFields.indexOf(fieldName) === -1) {
                    if (values[fieldName] && is_negative(values[fieldName])) {
                        webform.errors.push({
                            'fieldName': fieldName,
                            'index': 0,
                            'weight': 26,
                            'msg': concatMessage('RF1-026', '', Drupal.t('The specified number must be a positive.')),
                        });
                    }
                }

                if (values[fieldName] != '') {
                    annex1IsEmpty = false;
                }
            }
        });

        if (annex1IsEmpty) {
            webform.warnings.push({
                'fieldName': '',
                'index': 0,
                'weight': 6,
                'msg': concatMessage('RF1-006', '', Drupal.t('Nu este completată Anexa 1 "Bilanţul"'))
            });
        }

        var annex2IsEmpty = true;
        jQuery('table.annex-2 input').each(function () {
            var $this = jQuery(this);
            var fieldName = $this.attr('field');

            if (fieldName && fieldName in values) {
                if (values[fieldName] != '') {
                    annex2IsEmpty = false;
                }
            }
        });

        if (annex2IsEmpty) {
            webform.warnings.push({
                'fieldName': '',
                'index': 0,
                'weight': 7,
                'msg': concatMessage('RF1-007', '', Drupal.t('Nu este completată Anexa 2 „Situaţia de profit şi pierdere”'))
            });
        }

        var periodFromArr = values.dec_period_from.split('.');
        var periodToArr = values.dec_period_to.split('.');

        if (periodFromArr.length == 3 && periodToArr.length == 3) {
            var fromDate = new Date(periodFromArr[2], periodFromArr[1] - 1, periodFromArr[0]);
            var toDate = new Date(periodToArr[2], periodToArr[1] - 1, periodToArr[0]);

            var diffDays = Math.ceil(Math.abs(toDate.getTime() - fromDate.getTime()) / (86400000));
            var currentYear = new Date().getFullYear();
            if ((isLeap(currentYear) && diffDays > 366) || (!isLeap(currentYear) && diffDays > 365)) {
                webform.errors.push({
                    'fieldName': 'dec_period_to',
                    'index': 0,
                    'weight': 353,
                    'msg': concatMessage('RF1-353', '', Drupal.t('Perioada de raportare este mai mare de un an de zile')),
                });
            }
        }

        var filesExists = false;
        var files = values.dec_dinamicAttachments_row_file;
        for (var i = 0; i < files.length; i++) {
            if (files[i]) {
                filesExists = true;
            }
        }

        if (!filesExists) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 8,
                'msg': concatMessage('RF1-008', '', Drupal.t('Lipseşte Notă explicativă')),
            });
        }

        if (values.dec_lichidare && values.dec_table2_row_r590c5 > 0) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r590c5',
                'index': 0,
                'weight': 354,
                'msg': concatMessage('RF1-354', '', Drupal.t('Situatia financiare nu corespunde bilantului de lichidare')),
            });
        }


        var result = toFloat(values.dec_table6_r6_suma) / toFloat(values.dec_table6_r4_nrmediu) / 12;
        if (result > 30000) {
            webform.warnings.push({
                'fieldName': 'dec_table6_r6_suma',
                'index': 0,
                'weight': 357,
                'msg': concatMessage('RF1-357', '', Drupal.t('Salariul mediu lunar nu poate fi mai mare decăt 30 000 lei. Verificați corectitudinea datelor indicate în Anexa 6, rd. 4 și 6, (@val1 ; @val2)', {
                    '@val1': formatNumber(result, 2),
                    '@val2': 30000
                })),
            });
        }

        webform.validatorsStatus.validate_rsf1_1 = 1;
        validateWebform();
    };

    webform.validators.validate_rsf1_2 = function () {
        var values = Drupal.settings.mywebform.values;

        var r080c4 = toFloat(values.dec_table1_row_r080c4);
        var r6_suma = toFloat(values.dec_table6_r6_suma);
        if (errorActuality(['table6', 'table1']) && r080c4 > r6_suma) {
            webform.errors.push({
                'fieldName': 'dec_table1_row_r080c4',
                'index': 0,
                'weight': 10,
                'msg': concatMessage('RF1-010', '', Drupal.t('Anexa 8 rd. 80 col. 4 <= Anexa 6 rd. 6, (@val1 ; @val2)', {
                    '@val1': r080c4,
                    '@val2': r6_suma
                })),
            });
        }

        var equal_fields = [
            { 'c': 'RF1-012', 'f': 'dec_table1_row_r160c3', 'fa': 8, 'fr': 160, 'fc': 3, 'ef': 'dec_table3_row_r120c3', 'efa': 2, 'efr': 120, 'efc': 3, 't': ['table1', 'table3'], 'op': '=' },
            { 'c': 'RF1-013', 'f': 'dec_table1_row_r160c4', 'fa': 8, 'fr': 160, 'fc': 4, 'ef': 'dec_table3_row_r120c4', 'efa': 2, 'efr': 120, 'efc': 4, 't': ['table1', 'table3'], 'op': '=' },
            { 'c': 'RF1-014', 'f': 'dec_table1_row_r140c3', 'fa': 8, 'fr': 140, 'fc': 3, 'ef': 'dec_table3_row_r100c3', 'efa': 2, 'efr': 100, 'efc': 3, 't': ['table1', 'table3'], 'op': '=' },
            { 'c': 'RF1-015', 'f': 'dec_table1_row_r140c4', 'fa': 8, 'fr': 140, 'fc': 4, 'ef': 'dec_table3_row_r100c4', 'efa': 2, 'efr': 100, 'efc': 4, 't': ['table1', 'table3'], 'op': '=' },
            { 'c': 'RF1-016', 'f': 'dec_table1_row_r010c3', 'fa': 8, 'fr': 10, 'fc': 3, 'ef': 'dec_table3_row_r010c3', 'efa': 2, 'efr': 10, 'efc': 3, 't': ['table1', 'table3'], 'op': '=' },
            { 'c': 'RF1-017', 'f': 'dec_table1_row_r010c4', 'fa': 8, 'fr': 10, 'fc': 4, 'ef': 'dec_table3_row_r010c4', 'efa': 2, 'efr': 10, 'efc': 4, 't': ['table1', 'table3'], 'op': '=' },
            { 'c': 'RF1-018', 'f': 'dec_table1_row_r020c3', 'fa': 8, 'fr': 20, 'fc': 3, 'ef': 'dec_table3_row_r040c3', 'efa': 2, 'efr': 40, 'efc': 3, 't': ['table1', 'table3'], 'op': '=' },
            { 'c': 'RF1-019', 'f': 'dec_table1_row_r020c4', 'fa': 8, 'fr': 20, 'fc': 4, 'ef': 'dec_table3_row_r040c4', 'efa': 2, 'efr': 40, 'efc': 4, 't': ['table1', 'table3'], 'op': '=' },
            { 'c': 'RF1-020', 'f': 'dec_table1_row_r060c3', 'fa': 8, 'fr': 60, 'fc': 3, 'ef': 'dec_table3_row_r020c3', 'efa': 2, 'efr': 20, 'efc': 3, 't': ['table1', 'table3'], 'op': '<=' },
            { 'c': 'RF1-021', 'f': 'dec_table1_row_r060c4', 'fa': 8, 'fr': 60, 'fc': 4, 'ef': 'dec_table3_row_r020c4', 'efa': 2, 'efr': 20, 'efc': 4, 't': ['table1', 'table3'], 'op': '<=' },
            { 'c': 'RF1-022', 'f': 'dec_table1_row_r150c3', 'fa': 8, 'fr': 150, 'fc': 3, 'ef': 'dec_table3_row_r110c3', 'efa': 2, 'efr': 110, 'efc': 3, 't': ['table1', 'table3'], 'op': '=' },
            { 'c': 'RF1-023', 'f': 'dec_table1_row_r150c4', 'fa': 8, 'fr': 150, 'fc': 4, 'ef': 'dec_table3_row_r110c4', 'efa': 2, 'efr': 110, 'efc': 4, 't': ['table1', 'table3'], 'op': '=' },
            { 'c': 'RF1-028', 'f': 'dec_table4_row_r060c4', 'fa': 3, 'fr': 60, 'fc': 4, 'ef': 'dec_table2_row_r320c4', 'efa': 1, 'efr': 320, 'efc': 4, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-029', 'f': 'dec_table4_row_r060c7', 'fa': 3, 'fr': 60, 'fc': 7, 'ef': 'dec_table2_row_r320c5', 'efa': 1, 'efr': 320, 'efc': 5, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-030', 'f': 'dec_table4_row_r100c4', 'fa': 3, 'fr': 100, 'fc': 4, 'ef': 'dec_table2_row_r330c4', 'efa': 1, 'efr': 330, 'efc': 4, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-031', 'f': 'dec_table4_row_r100c7', 'fa': 3, 'fr': 100, 'fc': 4, 'ef': 'dec_table2_row_r330c5', 'efa': 1, 'efr': 330, 'efc': 5, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-032', 'f': 'dec_table4_row_r110c7', 'fa': 3, 'fr': 110, 'fc': 7, 'ef': 'dec_table2_row_r340c5', 'efa': 1, 'efr': 340, 'efc': 5, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-033', 'f': 'dec_table4_row_r120c4', 'fa': 3, 'fr': 120, 'fc': 4, 'ef': 'dec_table2_row_r350c4', 'efa': 1, 'efr': 350, 'efc': 4, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-034', 'f': 'dec_table4_row_r120c7', 'fa': 3, 'fr': 120, 'fc': 7, 'ef': 'dec_table2_row_r350c5', 'efa': 1, 'efr': 350, 'efc': 5, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-035', 'f': 'dec_table4_row_r130c7', 'fa': 3, 'fr': 130, 'fc': 7, 'ef': 'dec_table2_row_r360c5', 'efa': 1, 'efr': 360, 'efc': 5, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-037', 'f': 'dec_table4_row_r140c7', 'fa': 3, 'fr': 140, 'fc': 7, 'ef': 'dec_table2_row_r370c5', 'efa': 1, 'efr': 370, 'efc': 5, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-038', 'f': 'dec_table4_row_r170c4', 'fa': 3, 'fr': 170, 'fc': 4, 'ef': 'dec_table2_row_r380c4', 'efa': 1, 'efr': 380, 'efc': 4, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-039', 'f': 'dec_table4_row_r170c7', 'fa': 3, 'fr': 170, 'fc': 7, 'ef': 'dec_table2_row_r380c5', 'efa': 1, 'efr': 380, 'efc': 5, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-040', 'f': 'dec_table4_row_r180c4', 'fa': 3, 'fr': 180, 'fc': 4, 'ef': 'dec_table2_row_r390c4', 'efa': 1, 'efr': 390, 'efc': 4, 't': ['table2', 'table4'], 'op': '=' },
            { 'c': 'RF1-041', 'f': 'dec_table4_row_r180c7', 'fa': 3, 'fr': 180, 'fc': 7, 'ef': 'dec_table2_row_r390c5', 'efa': 1, 'efr': 390, 'efc': 5, 't': ['table2', 'table4'], 'op': '=' },
        ];

        var positive_fields = [
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r010c3', 'fa': 8, 'fr': '010', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r010c4', 'fa': 8, 'fr': '010', 'fc': 4 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r020c3', 'fa': 8, 'fr': '020', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r020c4', 'fa': 8, 'fr': '020', 'fc': 4 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r030c3', 'fa': 8, 'fr': '030', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r030c4', 'fa': 8, 'fr': '030', 'fc': 4 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r040c3', 'fa': 8, 'fr': '040', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r040c4', 'fa': 8, 'fr': '040', 'fc': 4 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r060c3', 'fa': 8, 'fr': '060', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r060c4', 'fa': 8, 'fr': '060', 'fc': 4 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r070c3', 'fa': 8, 'fr': '070', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r070c4', 'fa': 8, 'fr': '070', 'fc': 4 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r080c3', 'fa': 8, 'fr': '080', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r080c4', 'fa': 8, 'fr': '080', 'fc': 4 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r090c3', 'fa': 8, 'fr': '090', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r090c4', 'fa': 8, 'fr': '090', 'fc': 4 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r100c3', 'fa': 8, 'fr': '100', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r100c4', 'fa': 8, 'fr': '100', 'fc': 4 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r110c3', 'fa': 8, 'fr': '110', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r110c4', 'fa': 8, 'fr': '110', 'fc': 4 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r120c3', 'fa': 8, 'fr': '120', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r120c4', 'fa': 8, 'fr': '120', 'fc': 4 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r130c3', 'fa': 8, 'fr': '130', 'fc': 3 },
            { 'c': 'RF1-009', 'f': 'dec_table1_row_r130c4', 'fa': 8, 'fr': '130', 'fc': 4 },
        ];

        for (var i = 0; i < equal_fields.length; i++) {
            var specs = equal_fields[i];
            var specsF = toFloat(values[specs.f]);
            var specsEF = toFloat(values[specs.ef]);
            if (specs.op == '=') {
                if (errorActuality(specs.t) && specsF != specsEF) {
                    comparisonErrorPush(specs);
                }
            } else if (specs.op == '<=') {
                if (errorActuality(specs.t) && specsF > specsEF) {
                    comparisonErrorPush(specs);
                }
            }
        }

        for (var i = 0; i < positive_fields.length; i++) {
            var specs = positive_fields[i];
            var anexa = specs.fa;
            var row = specs.fr;
            if (is_negative(values[specs.f])) {
                webform.errors.push({
                    'fieldName': specs.f,
                    'index': 0,
                    'anexa': anexa,
                    'row': row,
                    'weight': getWeightFromErrorCode(specs.c),
                    'msg': concatMessage(specs.c, '', Drupal.t('Anexa @annex rd. @row col. @col valoarea trebuie sa fie pozitivă', {
                        '@annex': anexa,
                        '@row': row,
                        '@col': specs.fc
                    })),
                });
            }
        }

        webform.validatorsStatus.validate_rsf1_2 = 1;
        validateWebform();
    };

    webform.validators.validate_rsf1_a3 = function () {
        var values = Drupal.settings.mywebform.values;

        for (var i = 4; i <= 7; i++) {
            var result = formatNumber(toFloat(values['dec_table4_row_r171c' + i]) + toFloat(values['dec_table4_row_r172c' + i]), 0);
            var r170c = formatNumber(values['dec_table4_row_r170c' + i], 0);
            if (r170c < result) {
                webform.errors.push({
                    'fieldName': 'dec_table4_row_r170c' + i,
                    'index': 0,
                    'weight': 73,
                    'msg': concatMessage('RF1-073', '', Drupal.t('Anexa 3 Rd. 170 Col.@col>= Rd. 171 Col.@col + Rd. 172 Col.@col, (@val1 ; @val2)', {
                        '@val1': r170c,
                        '@val2': result,
                        '@col': i
                    })),
                });
            }

            var result = formatNumber(toFloat(values['dec_table4_row_r010c' + i]) +
                toFloat(values['dec_table4_row_r020c' + i]) -
                toFloat(values['dec_table4_row_r030c' + i]) +
                toFloat(values['dec_table4_row_r040c' + i]) -
                toFloat(values['dec_table4_row_r050c' + i]), 0);
            var r060c = formatNumber(values['dec_table4_row_r060c' + i], 0);
            if (result != r060c) {
                webform.errors.push({
                    'fieldName': 'dec_table4_row_r060c' + i,
                    'index': 0,
                    'weight': 220,
                    'msg': concatMessage('RF1-220', '', Drupal.t('Anexa 3 Rd. 060 Col.@col = Rd. 010 + Rd. 020 - Rd. 030 + Rd. 040 - Rd. 050, (@val1 ; @val2)', {
                        '@val1': r060c,
                        '@val2': result,
                        '@col': i
                    })),
                });
            }

            var result = formatNumber(toFloat(values['dec_table4_row_r070c' + i]) +
                toFloat(values['dec_table4_row_r080c' + i]) +
                toFloat(values['dec_table4_row_r090c' + i]), 0);
            var r100c = formatNumber(values['dec_table4_row_r100c' + i], 0);
            if (r100c != result) {
                webform.errors.push({
                    'fieldName': 'dec_table4_row_r100c' + i,
                    'index': 0,
                    'weight': 221,
                    'msg': concatMessage('RF1-221', '', Drupal.t('Anexa 3 Rd. 100 Col.@col = Rd. 070 + Rd. 080 + Rd. 090, (@val1 ; @val2)', {
                        '@val1': r100c,
                        '@val2': result,
                        '@col': i
                    })),
                });
            }

            var result = formatNumber(toFloat(values['dec_table4_row_r110c' + i]) +
                toFloat(values['dec_table4_row_r120c' + i]) +
                toFloat(values['dec_table4_row_r130c' + i]) -
                toFloat(values['dec_table4_row_r140c' + i]) +
                toFloat(values['dec_table4_row_r150c' + i]), 0);
            var r160c = formatNumber(values['dec_table4_row_r160c' + i], 0);
            if (r160c != result) {
                webform.errors.push({
                    'fieldName': 'dec_table4_row_r160c' + i,
                    'index': 0,
                    'weight': 222,
                    'msg': concatMessage('RF1-222', '', Drupal.t('Anexa 3 Rd. 160 Col.@col = Rd. 110 + Rd. 120 + Rd. 130 - Rd. 140 + Rd. 150, (@val1 ; @val2)', {
                        '@val1': r160c,
                        '@val2': result,
                        '@col': i
                    })),
                });
            }
        }

        var canBeNegativeFields = [
            'dec_table4_row_r020c4',
            'dec_table4_row_r020c5',
            'dec_table4_row_r020c6',
            'dec_table4_row_r020c7',

            'dec_table4_row_r060c5',
            'dec_table4_row_r060c6',

            'dec_table4_row_r110c5',
            'dec_table4_row_r110c6',
            'dec_table4_row_r110c7',

            'dec_table4_row_r120c4',
            'dec_table4_row_r120c5',
            'dec_table4_row_r120c6',
            'dec_table4_row_r120c7',

            'dec_table4_row_r130c5',
            'dec_table4_row_r130c6',
            'dec_table4_row_r130c7',

            'dec_table4_row_r150c4',
            'dec_table4_row_r150c5',
            'dec_table4_row_r150c6',
            'dec_table4_row_r150c7',

            'dec_table4_row_r160c4',
            'dec_table4_row_r160c5',
            'dec_table4_row_r160c6',
            'dec_table4_row_r160c7',

            'dec_table4_row_r180c4',
            'dec_table4_row_r180c5',
            'dec_table4_row_r180c6',
            'dec_table4_row_r180c7',
        ];

        validatePositiveFields('.annex-3', 3, 'RF1-071', canBeNegativeFields);

        webform.validatorsStatus.validate_rsf1_a3 = 1;
        validateWebform();
    };

    webform.validators.validate_rsf1_a4 = function () {
        var values = Drupal.settings.mywebform.values;

        var canBeNegativeFields = [
            'dec_table5_row_r080c3',
            'dec_table5_row_r080c4',
            'dec_table5_row_r130c3',
            'dec_table5_row_r130c4',
            'dec_table5_row_r140c3',
            'dec_table5_row_r140c4',
            'dec_table5_row_r190c3',
            'dec_table5_row_r190c4',
            'dec_table5_row_r200c3',
            'dec_table5_row_r200c4',
            'dec_table5_row_r210c3',
            'dec_table5_row_r210c4',
            'dec_table5_row_r220c3',
            'dec_table5_row_r220c4',
        ];

        validatePositiveFields('.annex-4', 4, 'RF1-074', canBeNegativeFields);

        var result = formatNumber(toFloat(values.dec_table2_row_r250c4) + toFloat(values.dec_table2_row_r260c4), 0);
        var r230c = formatNumber(values.dec_table5_row_r230c4, 0);
        if (errorActuality(['table2', 'table5']) && r230c != result) {
            webform.errors.push({
                'fieldName': 'dec_table5_row_r230c4',
                'index': 0,
                'weight': 76,
                'msg': concatMessage('RF1-076', '', Drupal.t('Anexa 4 rd. 230 col. 4 = Anexa 1 rd. (250 + 260) col. 4, (@val1 ; @val2)', {
                    '@val1': r230c,
                    '@val2': result
                })),
            });
        }

        var result = formatNumber(toFloat(values.dec_table2_row_r250c5) + toFloat(values.dec_table2_row_r260c5), 0);
        var r230c = formatNumber(values.dec_table5_row_r240c4, 0);
        if (errorActuality(['table2', 'table5']) && r230c != result) {
            webform.errors.push({
                'fieldName': 'dec_table5_row_r240c4',
                'index': 0,
                'weight': 77,
                'msg': concatMessage('RF1-077', '', Drupal.t('Anexa 4 rd. 240 col. 4 = Anexa 1 rd. (250 + 260) col. 5, (@val1 ; @val2)', {
                    '@val1': r230c,
                    '@val2': result
                })),
            });
        }

        for (var k = 3; k <= 4; k++) {
            var result = formatNumber(toFloat(values['dec_table5_row_r090c' + k]) -
                toFloat(values['dec_table5_row_r100c' + k]) +
                toFloat(values['dec_table5_row_r110c' + k]) +
                toFloat(values['dec_table5_row_r120c' + k]) +
                toFloat(values['dec_table5_row_r130c' + k]), 0);
            var r140c = formatNumber(values['dec_table5_row_r140c' + k], 0);

            if (r140c != result) {
                webform.errors.push({
                    'fieldName': 'dec_table5_row_r140c' + k,
                    'index': 0,
                    'weight': 231,
                    'msg': concatMessage('RF1-231', '', Drupal.t('Anexa 4 Rd. 140 Col.@col = Rd. 090 - Rd. 100 + Rd. 110 + Rd. 120 + Rd. 130, (@val1 ; @val2)', {
                        '@val1': r140c,
                        '@val2': result,
                        '@col': k
                    })),
                });
            }

            var result = formatNumber(toFloat(values['dec_table5_row_r150c' + k]) -
                toFloat(values['dec_table5_row_r160c' + k]) -
                toFloat(values['dec_table5_row_r170c' + k]) +
                toFloat(values['dec_table5_row_r180c' + k]) +
                toFloat(values['dec_table5_row_r190c' + k]), 0);
            var r200c = formatNumber(values['dec_table5_row_r200c' + k], 0);

            if (r200c != result) {
                webform.errors.push({
                    'fieldName': 'dec_table5_row_r200c' + k,
                    'index': 0,
                    'weight': 232,
                    'msg': concatMessage('RF1-232', '', Drupal.t('Anexa 4 Rd.200 Col.@col = Rd. 150 - Rd. 160 - Rd. 170 + Rd. 180 + Rd. 190, (@val1 ; @val2)', {
                        '@val1': r200c,
                        '@val2': result,
                        '@col': k
                    })),
                });
            }

            var result = formatNumber(toFloat(values['dec_table5_row_r080c' + k]) +
                toFloat(values['dec_table5_row_r140c' + k]) +
                toFloat(values['dec_table5_row_r200c' + k]), 0);
            var r210c = formatNumber(values['dec_table5_row_r210c' + k], 0);

            if (r210c != result) {
                webform.errors.push({
                    'fieldName': 'dec_table5_row_r210c' + k,
                    'index': 0,
                    'weight': 233,
                    'msg': concatMessage('RF1-233', '', Drupal.t('Anexa 4 Rd. 210 Col.@col = Rd. 080 + Rd. 140 + Rd. 200, (@val1 ; @val2)', {
                        '@val1': r210c,
                        '@val2': result,
                        '@col': k
                    })),
                });
            }

            var result = formatNumber(toFloat(values['dec_table5_row_r210c' + k]) +
                toFloat(values['dec_table5_row_r220c' + k]) +
                toFloat(values['dec_table5_row_r230c' + k]), 0);

            if (formatNumber(values['dec_table5_row_r240c' + k], 0) != result) {
                webform.errors.push({
                    'fieldName': 'dec_table5_row_r240c' + k,
                    'index': 0,
                    'weight': 234,
                    'msg': concatMessage('RF1-234', '', Drupal.t('Anexa 4 Rd. 240 Col.@col = Rd. 210 + Rd. 220 + Rd. 230, (@val1 ; @val2)', {
                        '@val1': formatNumber(values['dec_table5_row_r240c' + k], 0),
                        '@val2': result,
                        '@col': k
                    })),
                });
            }
        }

        var r230c4 = formatNumber(values.dec_table5_row_r230c4, 0);
        var r240c3 = formatNumber(values.dec_table5_row_r240c3, 0);

        if (r230c4 != r240c3) {
            webform.warnings.push({
                'fieldName': 'dec_table5_row_r230c4',
                'index': 0,
                'weight': 75,
                'msg': concatMessage('RF1-075', '', Drupal.t('Anexa 4 rd. 230 col. 4 = rd. 240 col. 3, (@val1 ; @val2)', {
                    '@val1': r230c4,
                    '@val2': r240c3
                })),
            });
        }

        webform.validatorsStatus.validate_rsf1_a4 = 1;
        validateWebform();
    };

    webform.validators.validate_rsf1_a7 = function () {
        var values = Drupal.settings.mywebform.values;

        validatePositiveFields('.annex-7', 7, 'RF1-140');

        for (var i = 2; i <= 9; i++) {
            var result = formatNumber(toFloat(values['dec_table7_row_r210c' + i]) +
                toFloat(values['dec_table7_row_r220c' + i]) +
                toFloat(values['dec_table7_row_r230c' + i]), 0);
            var r200c = formatNumber(values['dec_table7_row_r200c' + i], 0);

            if (toFloat(r200c) < toFloat(result)) {
                webform.errors.push({
                    'fieldName': 'dec_table7_row_r200c' + i,
                    'index': 0,
                    'weight': 141,
                    'msg': concatMessage('RF1-141', '', Drupal.t('Anexa 7 rd. 200 col. @col >= rd. (210 + 220 + 230) col. @col, (@val1 ; @val2)', {
                        '@col': i,
                        '@val1': r200c,
                        '@val2': result
                    })),
                });
            }

            var result = formatNumber(toFloat(values['dec_table7_row_r510c' + i]) +
                toFloat(values['dec_table7_row_r520c' + i]) +
                toFloat(values['dec_table7_row_r530c' + i]) +
                toFloat(values['dec_table7_row_r540c' + i]) +
                toFloat(values['dec_table7_row_r550c' + i]) +
                toFloat(values['dec_table7_row_r560c' + i]) +
                toFloat(values['dec_table7_row_r570c' + i]) +
                toFloat(values['dec_table7_row_r580c' + i]) +
                toFloat(values['dec_table7_row_r590c' + i]), 0);
            var r500c = formatNumber(values['dec_table7_row_r500c' + i], 0);

            if (toFloat(r500c) != toFloat(result)) {
                webform.errors.push({
                    'fieldName': 'dec_table7_row_r500c' + i,
                    'index': 0,
                    'weight': 142,
                    'msg': concatMessage('RF1-142', '', Drupal.t('Anexa 7 rd.500 col. @col = rd.(510 + 520 + 530 + 540 + 550 + 560 + 560 + 570 + 580 + 590) col. @col, (@val1 ; @val2)', {
                        '@col': i,
                        '@val1': r500c,
                        '@val2': result
                    })),
                });
            }

            var r530c = formatNumber(values['dec_table7_row_r530c' + i], 0);
            var r531c = formatNumber(values['dec_table7_row_r531c' + i], 0);

            if (toFloat(r530c) < toFloat(r531c)) {
                webform.errors.push({
                    'fieldName': 'dec_table7_row_r530c' + i,
                    'index': 0,
                    'weight': 143,
                    'msg': concatMessage('RF1-143', '', Drupal.t('Anexa 7 rd. 530 col. @col >= rd. 531 col. @col, (@val1 ; @val2)', {
                        '@col': i,
                        '@val1': r530c,
                        '@val2': r531c
                    })),
                });
            }
        }

        jQuery('.annex-7 tbody tr td:nth-child(2)').each(function () {
            var row = jQuery(this).text();

            var result = formatNumber(toFloat(values['dec_table7_row_r' + row + 'c2']) +
                toFloat(values['dec_table7_row_r' + row + 'c5']) -
                toFloat(values['dec_table7_row_r' + row + 'c6']), 0);
            var c7 = formatNumber(values['dec_table7_row_r' + row + 'c7'], 0);

            if (toFloat(c7) != toFloat(result)) {
                webform.errors.push({
                    'fieldName': 'dec_table7_row_r' + row + 'c7',
                    'index': 0,
                    'weight': 144,
                    'row': row,
                    'msg': concatMessage('RF1-144', '', Drupal.t('Anexa 7 rd. @row col.7 = col.2 + col.5 – col.6, (@val1 ; @val2)', {
                        '@row': row,
                        '@val1': c7,
                        '@val2': result
                    })),
                });
            }
        });

        var result = formatNumber((toFloat(values.dec_table7_row_r100c7) - toFloat(values.dec_table7_row_r100c8) - toFloat(values.dec_table7_row_r100c9)) +
            (toFloat(values.dec_table7_row_r200c7) - toFloat(values.dec_table7_row_r200c8) - toFloat(values.dec_table7_row_r200c9)), 0);
        var r010c5 = formatNumber(values.dec_table2_row_r010c5, 0);

        if (errorActuality(['table2', 'table7']) && r010c5 != result) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r010c5',
                'index': 0,
                'weight': 147,
                'msg': concatMessage('RF1-147', '', Drupal.t('Anexa 7 rd. (100 + 200) col.(7-8-9) = Anexa 1 rd.10 col.5, (@val1 ; @val2)', {
                    '@val1': result,
                    '@val2': r010c5
                })),
            });
        }

        // c - error code
        // a - annex of field
        // f - field
        // r - row of field
        // sc - subtraction columns
        // cf - comparable field
        // ca - annex of comparable field
        // cc - column of comparable field
        // cr - row of comparable fields
        var equal_fields = [
            { 'c': 'RF1-148', 'a': 7, 'f': 'dec_table7_row_r300c', 'r': '300', 'sc': [2, 3, 4], 'ca': 1, 'cf': 'dec_table2_row_r020c4', 'cr': 20, 'cc': 4, 't': ['table2', 'table7'] },
            { 'c': 'RF1-149', 'a': 7, 'f': 'dec_table7_row_r300c', 'r': '300', 'sc': [7, 8, 9], 'ca': 1, 'cf': 'dec_table2_row_r020c5', 'cr': 20, 'cc': 5, 't': ['table2', 'table7'] },
            { 'c': 'RF1-150', 'a': 7, 'f': 'dec_table7_row_r400c', 'r': '400', 'sc': [2, 3, 4], 'ca': 1, 'cf': 'dec_table2_row_r030c4', 'cr': 30, 'cc': 4, 't': ['table2', 'table7'] },
            { 'c': 'RF1-151', 'a': 7, 'f': 'dec_table7_row_r400c', 'r': '400', 'sc': [7, 8, 9], 'ca': 1, 'cf': 'dec_table2_row_r030c5', 'cr': 30, 'cc': 5, 't': ['table2', 'table7'] },
            { 'c': 'RF1-152', 'a': 7, 'f': 'dec_table7_row_r500c', 'r': '500', 'sc': [2, 3, 4], 'ca': 1, 'cf': 'dec_table2_row_r040c4', 'cr': 40, 'cc': 4, 't': ['table2', 'table7'] },
            { 'c': 'RF1-153', 'a': 7, 'f': 'dec_table7_row_r500c', 'r': '500', 'sc': [7, 8, 9], 'ca': 1, 'cf': 'dec_table2_row_r040c5', 'cr': 40, 'cc': 5, 't': ['table2', 'table7'] },
            { 'c': 'RF1-154', 'a': 7, 'f': 'dec_table7_row_r600c', 'r': '600', 'sc': [2, 3, 4], 'ca': 1, 'cf': 'dec_table2_row_r050c4', 'cr': 50, 'cc': 4, 't': ['table2', 'table7'] },
            { 'c': 'RF1-155', 'a': 7, 'f': 'dec_table7_row_r600c', 'r': '600', 'sc': [7, 8, 9], 'ca': 1, 'cf': 'dec_table2_row_r050c5', 'cr': 50, 'cc': 5, 't': ['table2', 'table7'] },
            { 'c': 'RF1-156', 'a': 7, 'f': 'dec_table7_row_r700c', 'r': '700', 'sc': [2, 3, 4], 'ca': 1, 'cf': 'dec_table2_row_r090c4', 'cr': 90, 'cc': 4, 't': ['table2', 'table7'] },
            { 'c': 'RF1-157', 'a': 7, 'f': 'dec_table7_row_r700c', 'r': '700', 'sc': [7, 8, 9], 'ca': 1, 'cf': 'dec_table2_row_r090c5', 'cr': 90, 'cc': 5, 't': ['table2', 'table7'] }
        ];

        for (var i = 0; i < equal_fields.length; i++) {
            var specs = equal_fields[i];

            var result = 0;
            for (var c = 0; c < specs.sc.length; c++) {
                var fieldName = specs.f + specs.sc[c];
                if (c === 0) {
                    result = toFloat(values[fieldName]);
                } else {
                    result -= toFloat(values[fieldName]);
                }
            }

            result = formatNumber(result, 0);
            var val2 = formatNumber(values[specs.cf], 0);
            if (errorActuality(specs.t) && result != val2) {
                webform.errors.push({
                    'fieldName': specs.cf,
                    'index': 0,
                    'anexa': specs.a,
                    'row': specs.r,
                    'weight': getWeightFromErrorCode(specs.c),
                    'msg': concatMessage(specs.c, '', Drupal.t('Anexa @annex rd. @row col. (@cols) = Anexa @dep_annex rd. @dep_row col. @dep_col, (@val1 ; @val2)', {
                        '@error_code': specs.c,
                        '@annex': specs.a,
                        '@row': specs.r,
                        '@cols': specs.sc.join('-'),
                        '@dep_annex': specs.ca,
                        '@dep_row': specs.cr,
                        '@dep_col': specs.cc,
                        '@val1': result,
                        '@val2': val2
                    })),
                });
            }
        }

        var result = formatNumber((toFloat(values.dec_table7_row_r100c2) - toFloat(values.dec_table7_row_r100c3) - toFloat(values.dec_table7_row_r100c4)) +
            (toFloat(values.dec_table7_row_r200c2) - toFloat(values.dec_table7_row_r200c3) - toFloat(values.dec_table7_row_r200c4)), 0);
        var r010c4 = formatNumber(values.dec_table2_row_r010c4, 0);
        if (errorActuality(['table2', 'table7']) && r010c4 != result) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r010c4',
                'index': 0,
                'weight': 158,
                'msg': concatMessage('RF1-158', '', Drupal.t('Anexa 7 rd. (100 + 200) col. (2-3-4) = Anexa 1 rd.10 col.4, (@val1 ; @val2)', {
                    '@val1': result,
                    '@val2': r010c4
                })),
            });
        }

        webform.validatorsStatus.validate_rsf1_a7 = 1;
        validateWebform();
    };

    webform.validators.validate_rsf1_a8 = function () {
        var values = Drupal.settings.mywebform.values;

        var r050c4 = toFloat(values.dec_table1_row_r050c4);
        var summ = toFloat(values.dec_table2_row_r170c4) - toFloat(values.dec_table2_row_r170c5);
        if (errorActuality(['table1', 'table2']) && r050c4 != summ) {
            webform.errors.push({
                'fieldName': 'dec_table1_row_r050c4',
                'index': 0,
                'weight': 11,
                'msg': concatMessage('RF1-011', '', Drupal.t('Anexa 8 rd.50 col.4 = Anexa 1 rd.170 col.4 – rd170 col.5, (@val1 ; @val2)', {
                    '@val1': r050c4,
                    '@val2': summ
                })),
            });
        }

        var r090c4 = toFloat(values.dec_table3_row_r090c4);
        var summ = toFloat(values.dec_table1_row_r030c4) - toFloat(values.dec_table1_row_r120c4);
        if (errorActuality(['table1', 'table3']) && r090c4 != summ) {
            webform.errors.push({
                'fieldName': 'dec_table3_row_r090c4',
                'index': 0,
                'weight': 25,
                'msg': concatMessage('RF1-025', '', Drupal.t('Anexa 8 rd.30 col.4 - rd.120 col.4 = Anexa 2 rd.90 col.4, (@val1 ; @val2)', {
                    '@val1': summ,
                    '@val2': r090c4
                })),
            });
        }

        var r040c3 = toFloat(values.dec_table1_row_r040c3);
        var summ = toFloat(values.dec_table1_row_r010c3) + toFloat(values.dec_table1_row_r020c3) + toFloat(values.dec_table1_row_r030c3);
        if (r040c3 != summ) {
            webform.errors.push({
                'fieldName': 'dec_table1_row_r040c3',
                'index': 0,
                'weight': 240,
                'msg': concatMessage('RF1-240', '', Drupal.t('Anexa 8 Rd.040 Col.3 = Rd 010 + Rd 020 + Rd 030, (@val1 ; @val2)', {
                    '@val1': r040c3,
                    '@val2': summ
                })),
            });
        }

        var r040c4 = toFloat(values.dec_table1_row_r040c4);
        var summ = toFloat(values.dec_table1_row_r010c4) + toFloat(values.dec_table1_row_r020c4) + toFloat(values.dec_table1_row_r030c4);
        if (r040c4 != summ) {
            webform.errors.push({
                'fieldName': 'dec_table1_row_r040c4',
                'index': 0,
                'weight': 240,
                'msg': concatMessage('RF1-240', '', Drupal.t('Anexa 8 Rd.040 Col.4 = Rd 010 + Rd 020 + Rd 030, (@val1 ; @val2)', {
                    '@val1': r040c4,
                    '@val2': summ
                })),
            });
        }

        var r130c3 = toFloat(values.dec_table1_row_r130c3);
        var summ = toFloat(values.dec_table1_row_r050c3) + toFloat(values.dec_table1_row_r060c3) + toFloat(values.dec_table1_row_r070c3) + toFloat(values.dec_table1_row_r080c3) + toFloat(values.dec_table1_row_r090c3) + toFloat(values.dec_table1_row_r100c3) + toFloat(values.dec_table1_row_r110c3) + toFloat(values.dec_table1_row_r120c3);
        if (r130c3 != summ) {
            webform.errors.push({
                'fieldName': 'dec_table1_row_r130c3',
                'index': 0,
                'weight': 241,
                'msg': concatMessage('RF1-241', '', Drupal.t('Anexa 8 Rd.130 Col.3 = Rd 050 + Rd 060 + Rd 070 + Rd 080 + Rd 090 + Rd 100 + Rd 110 + Rd 120, (@val1 ; @val2)', {
                    '@val1': r130c3,
                    '@val2': summ
                })),
            });
        }

        var r130c4 = toFloat(values.dec_table1_row_r130c4);
        var summ = toFloat(values.dec_table1_row_r050c4) + toFloat(values.dec_table1_row_r060c4) + toFloat(values.dec_table1_row_r070c4) + toFloat(values.dec_table1_row_r080c4) + toFloat(values.dec_table1_row_r090c4) + toFloat(values.dec_table1_row_r100c4) + toFloat(values.dec_table1_row_r110c4) + toFloat(values.dec_table1_row_r120c4);
        if (r130c4 != summ) {
            webform.errors.push({
                'fieldName': 'dec_table1_row_r130c4',
                'index': 0,
                'weight': 241,
                'msg': concatMessage('RF1-241', '', Drupal.t('Anexa 8 Rd.130 Col.4 = Rd 050 + Rd 060 + Rd 070 + Rd 080 + Rd 090 + Rd 100 + Rd 110 + Rd 120, (@val1 ; @val2)', {
                    '@val1': r130c4,
                    '@val2': summ
                })),
            });
        }

        var r140c3 = toFloat(values.dec_table1_row_r140c3);
        var summ = toFloat(values.dec_table1_row_r040c3) - toFloat(values.dec_table1_row_r130c3);
        if (r140c3 != summ) {
            webform.errors.push({
                'fieldName': 'dec_table1_row_r140c3',
                'index': 0,
                'weight': 242,
                'msg': concatMessage('RF1-242', '', Drupal.t('Anexa 8 Rd.140 Col.3 = Rd 040 - Rd 130, (@val1 ; @val2)', {
                    '@val1': r140c3,
                    '@val2': summ
                })),
            });
        }

        var r140c4 = toFloat(values.dec_table1_row_r140c4);
        var summ = toFloat(values.dec_table1_row_r040c4) - toFloat(values.dec_table1_row_r130c4);
        if (r140c4 != summ) {
            webform.errors.push({
                'fieldName': 'dec_table1_row_r140c4',
                'index': 0,
                'weight': 242,
                'msg': concatMessage('RF1-242', '', Drupal.t('Anexa 8 Rd.140 Col.4 = Rd 040 - Rd 130, (@val1 ; @val2)', {
                    '@val1': r140c4,
                    '@val2': summ
                })),
            });
        }

        var r160c3 = toFloat(values.dec_table1_row_r160c3);
        var summ = toFloat(values.dec_table1_row_r140c3) - toFloat(values.dec_table1_row_r150c3);
        if (r160c3 != summ) {
            webform.errors.push({
                'fieldName': 'dec_table1_row_r160c3',
                'index': 0,
                'weight': 243,
                'msg': concatMessage('RF1-243', '', Drupal.t('Anexa 8 Rd.160 Col.3 = Rd 140 - Rd 150, (@val1 ; @val2)', {
                    '@val1': r160c3,
                    '@val2': summ
                })),
            });
        }

        var r160c4 = toFloat(values.dec_table1_row_r160c4);
        var summ = toFloat(values.dec_table1_row_r140c4) - toFloat(values.dec_table1_row_r150c4);
        if (r160c4 != summ) {
            webform.errors.push({
                'fieldName': 'dec_table1_row_r160c4',
                'index': 0,
                'weight': 243,
                'msg': concatMessage('RF1-243', '', Drupal.t('Anexa 8 Rd.160 Col.4 = Rd 140 - Rd 150, (@val1 ; @val2)', {
                    '@val1': r160c4,
                    '@val2': summ
                })),
            });
        }

        var r090c3 = toFloat(values.dec_table3_row_r090c3);
        var summ = toFloat(values.dec_table1_row_r030c3) - toFloat(values.dec_table1_row_r120c3);
        if (errorActuality(['table1', 'table3']) && r090c3 != summ) {
            webform.warnings.push({
                'fieldName': 'dec_table3_row_r090c3',
                'index': 0,
                'weight': 24,
                'msg': concatMessage('RF1-024', '', Drupal.t('Anexa 8 rd.30 col.3 - rd.120 col.3 = Anexa 2 rd.90 Col.3, (@val1 ; @val2)', {
                    '@val1': summ,
                    '@val2': r090c3
                })),
            });
        }

        webform.validatorsStatus.validate_rsf1_a8 = 1;
        validateWebform();
    };

    webform.validators.validate_rsf1_a9 = function () {
        var values = Drupal.settings.mywebform.values;
        var value1 = 0,
            value2 = 0;

        var equal_summ_fields = [
            { resultField: 'dec_table14_row_r010c3', sumFields: ['dec_table14_row_r020c3', 'dec_table14_row_r030c3', 'dec_table14_row_r040c3', 'dec_table14_row_r050c3', 'dec_table14_row_r060c3'], e: 'RF1-310', sm: 'Rd 020 + Rd 030 + Rd 040 + Rd 050 + Rd 060', t: '6', r: '010', c: '3' },
            { resultField: 'dec_table14_row_r010c4', sumFields: ['dec_table14_row_r020c4', 'dec_table14_row_r030c4', 'dec_table14_row_r040c4', 'dec_table14_row_r050c4', 'dec_table14_row_r060c4'], e: 'RF1-310', sm: 'Rd 020 + Rd 030 + Rd 040 + Rd 050 + Rd 060', t: '6', r: '010', c: '4' },

            { resultField: 'dec_table14_row_r070c3', sumFields: ['dec_table14_row_r080c3', 'dec_table14_row_r090c3', 'dec_table14_row_r100c3', 'dec_table14_row_r110c3'], e: 'RF1-311', sm: 'Rd 080 + Rd 090 + Rd 100+ Rd 110', t: '6', r: '070', c: '3' },
            { resultField: 'dec_table14_row_r070c4', sumFields: ['dec_table14_row_r080c4', 'dec_table14_row_r090c4', 'dec_table14_row_r100c4', 'dec_table14_row_r110c4'], e: 'RF1-311', sm: 'Rd 080 + Rd 090 + Rd 100+ Rd 110', t: '6', r: '070', c: '4' },
        ];
        for (var i = 0; i < equal_summ_fields.length; i++) {
            var result = 0;
            for (var k = 0; k < equal_summ_fields[i].sumFields.length; k++) {
                result += toFloat(values[equal_summ_fields[i].sumFields[k]]);
            }
            var resF = toFloat(values[equal_summ_fields[i].resultField]);
            result = formatNumber(result, 0);
            if (errorActuality(['table14']) && resF != result) {
                var specs = equal_summ_fields[i];
                webform.errors.push({
                    'fieldName': specs.resultField,
                    'index': 0,
                    'table': specs.t,
                    'row': specs.r,
                    'weight': getWeightFromErrorCode(specs.e),
                    'msg': concatMessage(specs.e, '', Drupal.t('Anexa 9 tab.@tab rd. @row col.(@col) = @rows col.(@col), (@val1 ; @val2)', {
                        '@tab': specs.t,
                        '@row': specs.r,
                        '@col': specs.c,
                        '@rows': specs.sm,
                        '@val1': resF,
                        '@val2': result
                    })),
                });
            }
        }

        var equal_summ_t3andt4 = [
            { resultFields: ['dec_table10_row_r010c9', 'dec_table10_row_r010c10'], sumFields: ['dec_table10_row_r010c3', 'dec_table10_row_r010c4', 'dec_table10_row_r010c5', 'dec_table10_row_r010c7', 'dec_table10_row_r010c8'], e: 'RF1-121', t: '3', r: '010' },
            { resultFields: ['dec_table10_row_r020c9', 'dec_table10_row_r020c10'], sumFields: ['dec_table10_row_r020c3', 'dec_table10_row_r020c4', 'dec_table10_row_r020c5', 'dec_table10_row_r020c7', 'dec_table10_row_r020c8'], e: 'RF1-121', t: '3', r: '020' },
            { resultFields: ['dec_table10_row_r030c9', 'dec_table10_row_r030c10'], sumFields: ['dec_table10_row_r030c3', 'dec_table10_row_r030c4', 'dec_table10_row_r030c5', 'dec_table10_row_r030c7', 'dec_table10_row_r030c8'], e: 'RF1-121', t: '3', r: '030' },
            { resultFields: ['dec_table10_row_r040c9', 'dec_table10_row_r040c10'], sumFields: ['dec_table10_row_r040c3', 'dec_table10_row_r040c4', 'dec_table10_row_r040c5', 'dec_table10_row_r040c7', 'dec_table10_row_r040c8'], e: 'RF1-121', t: '3', r: '040' },
            { resultFields: ['dec_table10_row_r050c9', 'dec_table10_row_r050c10'], sumFields: ['dec_table10_row_r050c3', 'dec_table10_row_r050c4', 'dec_table10_row_r050c5', 'dec_table10_row_r050c7', 'dec_table10_row_r050c8'], e: 'RF1-121', t: '3', r: '050' },
            { resultFields: ['dec_table10_row_r060c9', 'dec_table10_row_r060c10'], sumFields: ['dec_table10_row_r060c3', 'dec_table10_row_r060c4', 'dec_table10_row_r060c5', 'dec_table10_row_r060c7', 'dec_table10_row_r060c8'], e: 'RF1-121', t: '3', r: '060' },
            { resultFields: ['dec_table10_row_r070c9', 'dec_table10_row_r070c10'], sumFields: ['dec_table10_row_r070c3', 'dec_table10_row_r070c4', 'dec_table10_row_r070c5', 'dec_table10_row_r070c7', 'dec_table10_row_r070c8'], e: 'RF1-121', t: '3', r: '070' },
            { resultFields: ['dec_table10_row_r080c9', 'dec_table10_row_r080c10'], sumFields: ['dec_table10_row_r080c3', 'dec_table10_row_r080c4', 'dec_table10_row_r080c5', 'dec_table10_row_r080c7', 'dec_table10_row_r080c8'], e: 'RF1-121', t: '3', r: '080' },
            { resultFields: ['dec_table10_row_r090c9', 'dec_table10_row_r090c10'], sumFields: ['dec_table10_row_r090c3', 'dec_table10_row_r090c4', 'dec_table10_row_r090c5', 'dec_table10_row_r090c7', 'dec_table10_row_r090c8'], e: 'RF1-121', t: '3', r: '090' },
            { resultFields: ['dec_table10_row_r100c9', 'dec_table10_row_r100c10'], sumFields: ['dec_table10_row_r100c3', 'dec_table10_row_r100c4', 'dec_table10_row_r100c5', 'dec_table10_row_r100c7', 'dec_table10_row_r100c8'], e: 'RF1-121', t: '3', r: '100' },
            { resultFields: ['dec_table10_row_r110c9', 'dec_table10_row_r110c10'], sumFields: ['dec_table10_row_r110c3', 'dec_table10_row_r110c4', 'dec_table10_row_r110c5', 'dec_table10_row_r110c7', 'dec_table10_row_r110c8'], e: 'RF1-121', t: '3', r: '110' },

            { resultFields: ['dec_table11_row_r010c9', 'dec_table11_row_r010c10'], sumFields: ['dec_table11_row_r010c3', 'dec_table11_row_r010c4', 'dec_table11_row_r010c5', 'dec_table11_row_r010c7', 'dec_table11_row_r010c8'], e: 'RF1-122', t: '4', r: '010' },
            { resultFields: ['dec_table11_row_r020c9', 'dec_table11_row_r020c10'], sumFields: ['dec_table11_row_r020c3', 'dec_table11_row_r020c4', 'dec_table11_row_r020c5', 'dec_table11_row_r020c7', 'dec_table11_row_r020c8'], e: 'RF1-122', t: '4', r: '020' },
            { resultFields: ['dec_table11_row_r030c9', 'dec_table11_row_r030c10'], sumFields: ['dec_table11_row_r030c3', 'dec_table11_row_r030c4', 'dec_table11_row_r030c5', 'dec_table11_row_r030c7', 'dec_table11_row_r030c8'], e: 'RF1-122', t: '4', r: '030' },
            { resultFields: ['dec_table11_row_r040c9', 'dec_table11_row_r040c10'], sumFields: ['dec_table11_row_r040c3', 'dec_table11_row_r040c4', 'dec_table11_row_r040c5', 'dec_table11_row_r040c7', 'dec_table11_row_r040c8'], e: 'RF1-122', t: '4', r: '040' },
            { resultFields: ['dec_table11_row_r050c9', 'dec_table11_row_r050c10'], sumFields: ['dec_table11_row_r050c3', 'dec_table11_row_r050c4', 'dec_table11_row_r050c5', 'dec_table11_row_r050c7', 'dec_table11_row_r050c8'], e: 'RF1-122', t: '4', r: '050' },
            { resultFields: ['dec_table11_row_r060c9', 'dec_table11_row_r060c10'], sumFields: ['dec_table11_row_r060c3', 'dec_table11_row_r060c4', 'dec_table11_row_r060c5', 'dec_table11_row_r060c7', 'dec_table11_row_r060c8'], e: 'RF1-122', t: '4', r: '060' },
            { resultFields: ['dec_table11_row_r070c9', 'dec_table11_row_r070c10'], sumFields: ['dec_table11_row_r070c3', 'dec_table11_row_r070c4', 'dec_table11_row_r070c5', 'dec_table11_row_r070c7', 'dec_table11_row_r070c8'], e: 'RF1-122', t: '4', r: '070' },
            { resultFields: ['dec_table11_row_r080c9', 'dec_table11_row_r080c10'], sumFields: ['dec_table11_row_r080c3', 'dec_table11_row_r080c4', 'dec_table11_row_r080c5', 'dec_table11_row_r080c7', 'dec_table11_row_r080c8'], e: 'RF1-122', t: '4', r: '080' },
            { resultFields: ['dec_table11_row_r090c9', 'dec_table11_row_r090c10'], sumFields: ['dec_table11_row_r090c3', 'dec_table11_row_r090c4', 'dec_table11_row_r090c5', 'dec_table11_row_r090c7', 'dec_table11_row_r090c8'], e: 'RF1-122', t: '4', r: '090' },
            { resultFields: ['dec_table11_row_r100c9', 'dec_table11_row_r100c10'], sumFields: ['dec_table11_row_r100c3', 'dec_table11_row_r100c4', 'dec_table11_row_r100c5', 'dec_table11_row_r100c7', 'dec_table11_row_r100c8'], e: 'RF1-122', t: '4', r: '100' },
            { resultFields: ['dec_table11_row_r110c9', 'dec_table11_row_r110c10'], sumFields: ['dec_table11_row_r110c3', 'dec_table11_row_r110c4', 'dec_table11_row_r110c5', 'dec_table11_row_r110c7', 'dec_table11_row_r110c8'], e: 'RF1-122', t: '4', r: '110' },
        ];
        for (var i = 0; i < equal_summ_t3andt4.length; i++) {
            var summ_c9c10 = 0;
            var summ_other = 0;

            for (var k = 0; k < equal_summ_t3andt4[i].resultFields.length; k++) {
                summ_c9c10 += toFloat(values[equal_summ_t3andt4[i].resultFields[k]]);
            }

            var summMassiv = equal_summ_t3andt4[i].sumFields;
            summ_other = (toFloat(values[summMassiv[0]]) + toFloat(values[summMassiv[1]])) + toFloat(values[summMassiv[2]]) - toFloat(values[summMassiv[3]]) + toFloat(values[summMassiv[4]]);

            var er_code = getWeightFromErrorCode(equal_summ_t3andt4[i].e);
            var summ_c9c10 = formatNumber(summ_c9c10, 0);
            var summ_other = formatNumber(summ_other, 0);

            if (toFloat(summ_c9c10) != toFloat(summ_other)) {
                var specs = equal_summ_t3andt4[i];
                webform.errors.push({
                    'fieldName': '',
                    'index': 0,
                    'table': specs.t,
                    'row': specs.r,
                    'weight': er_code,
                    'msg': concatMessage(specs.e, '', Drupal.t('Anexa 9 tab.@tab rd. @row Col.(9+10) = col.(3 + 4) + col.5 - col.7 + col.8 pe toate rândurile, (@val1 ; @val2)', {
                        '@tab': specs.t,
                        '@row': specs.r,
                        '@val1': summ_c9c10,
                        '@val2': summ_other
                    })),
                });
            }
        }

        var equal_summ_t1andt2 = [
            { resultFields: 'dec_table8_row_r010c7', sumFields: ['dec_table8_row_r010c3', 'dec_table8_row_r010c4', 'dec_table8_row_r010c5', 'dec_table8_row_r010c6'], e: 'RF1-250', t: '1', r: '010' },
            { resultFields: 'dec_table8_row_r020c7', sumFields: ['dec_table8_row_r020c3', 'dec_table8_row_r020c4', 'dec_table8_row_r020c5', 'dec_table8_row_r020c6'], e: 'RF1-250', t: '1', r: '020' },
            { resultFields: 'dec_table8_row_r030c7', sumFields: ['dec_table8_row_r030c3', 'dec_table8_row_r030c4', 'dec_table8_row_r030c5', 'dec_table8_row_r030c6'], e: 'RF1-250', t: '1', r: '030' },
            { resultFields: 'dec_table8_row_r040c7', sumFields: ['dec_table8_row_r040c3', 'dec_table8_row_r040c4', 'dec_table8_row_r040c5', 'dec_table8_row_r040c6'], e: 'RF1-250', t: '1', r: '040' },
            { resultFields: 'dec_table8_row_r050c7', sumFields: ['dec_table8_row_r050c3', 'dec_table8_row_r050c4', 'dec_table8_row_r050c5', 'dec_table8_row_r050c6'], e: 'RF1-250', t: '1', r: '050' },
            { resultFields: 'dec_table8_row_r060c7', sumFields: ['dec_table8_row_r060c3', 'dec_table8_row_r060c4', 'dec_table8_row_r060c5', 'dec_table8_row_r060c6'], e: 'RF1-250', t: '1', r: '060' },
            { resultFields: 'dec_table8_row_r070c7', sumFields: ['dec_table8_row_r070c3', 'dec_table8_row_r070c4', 'dec_table8_row_r070c5', 'dec_table8_row_r070c6'], e: 'RF1-250', t: '1', r: '070' },
            { resultFields: 'dec_table8_row_r080c7', sumFields: ['dec_table8_row_r080c3', 'dec_table8_row_r080c4', 'dec_table8_row_r080c5', 'dec_table8_row_r080c6'], e: 'RF1-250', t: '1', r: '080' },
            { resultFields: 'dec_table8_row_r090c7', sumFields: ['dec_table8_row_r090c3', 'dec_table8_row_r090c4', 'dec_table8_row_r090c5', 'dec_table8_row_r090c6'], e: 'RF1-250', t: '1', r: '090' },
            { resultFields: 'dec_table8_row_r100c7', sumFields: ['dec_table8_row_r100c3', 'dec_table8_row_r100c4', 'dec_table8_row_r100c5', 'dec_table8_row_r100c6'], e: 'RF1-250', t: '1', r: '100' },

            { resultFields: 'dec_table9_row_r010c7', sumFields: ['dec_table9_row_r010c3', 'dec_table9_row_r010c4', 'dec_table9_row_r010c5', 'dec_table9_row_r010c6'], e: 'RF1-255', t: '2', r: '010' },
            { resultFields: 'dec_table9_row_r020c7', sumFields: ['dec_table9_row_r020c3', 'dec_table9_row_r020c4', 'dec_table9_row_r020c5', 'dec_table9_row_r020c6'], e: 'RF1-255', t: '2', r: '020' },
            { resultFields: 'dec_table9_row_r030c7', sumFields: ['dec_table9_row_r030c3', 'dec_table9_row_r030c4', 'dec_table9_row_r030c5', 'dec_table9_row_r030c6'], e: 'RF1-255', t: '2', r: '030' },
            { resultFields: 'dec_table9_row_r040c7', sumFields: ['dec_table9_row_r040c3', 'dec_table9_row_r040c4', 'dec_table9_row_r040c5', 'dec_table9_row_r040c6'], e: 'RF1-255', t: '2', r: '040' },
            { resultFields: 'dec_table9_row_r050c7', sumFields: ['dec_table9_row_r050c3', 'dec_table9_row_r050c4', 'dec_table9_row_r050c5', 'dec_table9_row_r050c6'], e: 'RF1-255', t: '2', r: '050' },
            { resultFields: 'dec_table9_row_r060c7', sumFields: ['dec_table9_row_r060c3', 'dec_table9_row_r060c4', 'dec_table9_row_r060c5', 'dec_table9_row_r060c6'], e: 'RF1-255', t: '2', r: '060' },
            { resultFields: 'dec_table9_row_r070c7', sumFields: ['dec_table9_row_r070c3', 'dec_table9_row_r070c4', 'dec_table9_row_r070c5', 'dec_table9_row_r070c6'], e: 'RF1-255', t: '2', r: '070' },
            { resultFields: 'dec_table9_row_r080c7', sumFields: ['dec_table9_row_r080c3', 'dec_table9_row_r080c4', 'dec_table9_row_r080c5', 'dec_table9_row_r080c6'], e: 'RF1-255', t: '2', r: '080' },
            { resultFields: 'dec_table9_row_r090c7', sumFields: ['dec_table9_row_r090c3', 'dec_table9_row_r090c4', 'dec_table9_row_r090c5', 'dec_table9_row_r090c6'], e: 'RF1-255', t: '2', r: '090' },
            { resultFields: 'dec_table9_row_r100c7', sumFields: ['dec_table9_row_r100c3', 'dec_table9_row_r100c4', 'dec_table9_row_r100c5', 'dec_table9_row_r100c6'], e: 'RF1-255', t: '2', r: '100' },
        ];
        for (var i = 0; i < equal_summ_t1andt2.length; i++) {
            var col7 = 0;
            var summ_other = 0;

            col7 = toFloat(values[equal_summ_t1andt2[i].resultFields]);

            var summMassiv = equal_summ_t1andt2[i].sumFields;
            summ_other = toFloat(values[summMassiv[0]]) + toFloat(values[summMassiv[1]]) - toFloat(values[summMassiv[2]]) + toFloat(values[summMassiv[3]]);

            var er_code = getWeightFromErrorCode(equal_summ_t1andt2[i].e);
            var col7 = formatNumber(col7, 0);
            var summ_other = formatNumber(summ_other, 0);

            if (col7 != summ_other) {
                var specs = equal_summ_t1andt2[i];
                webform.errors.push({
                    'fieldName': '',
                    'index': 0,
                    'table': specs.t,
                    'row': specs.r,
                    'weight': er_code,
                    'msg': concatMessage(specs.e, '', Drupal.t('Anexa 9 tab.@tab rd. @row Col.7 = col.3 + col.4 – col.5 +col.6 pe toate rândurile, (@val1 ; @val2)', {
                        '@tab': specs.t,
                        '@row': specs.r,
                        '@val1': col7,
                        '@val2': summ_other
                    })),
                });
            }
        }

        var countrysT5 = getCountrysOfTable5();
        var codesT1 = [
            'dec_dinamicTable3_row_r1',
            'dec_dinamicTable4_row_r1',
            'dec_dinamicTable5_row_r1',
            'dec_dinamicTable6_row_r1',
            'dec_dinamicTable7_row_r1',
            'dec_dinamicTable8_row_r1',
            'dec_dinamicTable9_row_r1',
            'dec_dinamicTable10_row_r1'
        ];
        for (var i = 0; i < codesT1.length; i++) {
            var code = values[codesT1[i]];
            for (var j = 0; j < code.length; j++) {
                var row = code[j];
                if (row && countrysT5.indexOf(row) == -1) {
                    webform.errors.push({
                        'fieldName': codesT1[i],
                        'index': j,
                        'row': row,
                        'weight': 97,
                        'msg': concatMessage('RF1-097', '', Drupal.t('Anexa 9 tab.1 rd.@rd Codul ţării nu corespunde cu ţara de origine a fondatorului (Rd. 50 şi 60 Anexa 9 tab.5)', {
                            '@rd': row
                        })),
                    });
                }
            }
        }

        var codesT3 = [
            'dec_dinamicTable21_row_r1',
            'dec_dinamicTable23_row_r1',
            'dec_dinamicTable24_row_r1',
            'dec_dinamicTable25_row_r1',
            'dec_dinamicTable26_row_r1',
            'dec_dinamicTable27_row_r1',
            'dec_dinamicTable28_row_r1',
            'dec_dinamicTable29_row_r1',
            'dec_dinamicTable30_row_r1',
        ];
        for (var i = 0; i < codesT3.length; i++) {
            var code = values[codesT3[i]];
            for (var j = 0; j < code.length; j++) {
                var row = code[j];
                if (row && countrysT5.indexOf(row) == -1) {
                    webform.errors.push({
                        'fieldName': codesT3[i],
                        'index': j,
                        'weight': 120,
                        'row': row,
                        'msg': concatMessage('RF1-120', '', Drupal.t('Anexa 9 tab.3 rd.@rd Codul ţării nu corespunde cu ţara de origine a fondatorului (Rd. 50 şi 60 Anexa 9 tab.5)', {
                            '@rd': row
                        })),
                    });
                }
            }
        }

        value1 = toFloat(values.dec_table8_row_r060c3) + toFloat(values.dec_table9_row_r070c3);
        value2 = toFloat(values.dec_table2_row_r440c4);
        if (errorActuality(['table2', 'table8']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r440c4',
                'index': 0,
                'weight': 46,
                'msg': concatMessage('RF1-046', '', Drupal.t('Anexa 9 tab.1 rd.60 col.3 + tab.2 rd.70 col.3 <= Anexa 1 rd.440 col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table8_row_r060c7) + toFloat(values.dec_table9_row_r070c7);
        value2 = toFloat(values.dec_table2_row_r440c5);
        if (errorActuality(['table2', 'table8']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r440c5',
                'index': 0,
                'weight': 47,
                'msg': concatMessage('RF1-047', '', Drupal.t('Anexa 9 tab.1 rd.60 col.7 + tab.2 rd.70 col.7 <= Anexa 1 rd.440 col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r060c3) + toFloat(values.dec_table10_row_r060c4) + toFloat(values.dec_table11_row_r070c3) + toFloat(values.dec_table11_row_r070c4);
        value2 = toFloat(values.dec_table2_row_r580c4);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r580c4',
                'index': 0,
                'weight': 48,
                'msg': concatMessage('RF1-048', '', Drupal.t('Anexa 9 tab.3 rd.60 (col.3 + col.4) + tab.4 rd.70 (col.3 + col.4) <= Anexa 1 rd.580 col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r060c9) + toFloat(values.dec_table10_row_r060c10) + toFloat(values.dec_table11_row_r070c9) + toFloat(values.dec_table11_row_r070c10);
        value2 = toFloat(values.dec_table2_row_r580c5);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r580c5',
                'index': 0,
                'weight': 49,
                'msg': concatMessage('RF1-049', '', Drupal.t('Anexa 9 tab.3 rd.60 (col.9+col.10) + tab.4 rd.70 (col.9 + col.10) <= Anexa 1 rd.580 col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table8_row_r010c3) + toFloat(values.dec_table9_row_r010c3);
        value2 = toFloat(values.dec_table2_row_r070c4) + toFloat(values.dec_table2_row_r080c4) + toFloat(values.dec_table2_row_r090c4) + toFloat(values.dec_table2_row_r100c4) + toFloat(values.dec_table2_row_r110c4) + toFloat(values.dec_table2_row_r120c4);
        if (errorActuality(['table2', 'table8']) && value1 > value2) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 50,
                'msg': concatMessage('RF1-050', '', Drupal.t('Anexa 9 tab.1 rd.10 col.3 + tab.2 rd.10 col.3 <= Anexa 1 rd.(70 + 80 + 100 + 110 + 120) col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table8_row_r010c7) + toFloat(values.dec_table9_row_r010c7);
        value2 = toFloat(values.dec_table2_row_r070c5) + toFloat(values.dec_table2_row_r080c5) + toFloat(values.dec_table2_row_r090c5) + toFloat(values.dec_table2_row_r100c5) + toFloat(values.dec_table2_row_r110c5) + toFloat(values.dec_table2_row_r120c5);
        if (errorActuality(['table2', 'table8']) && value1 > value2) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 51,
                'msg': concatMessage('RF1-051', '', Drupal.t('Anexa 9 tab.1 rd.10 col.7 + tab.2 rd.10 col.7 <= Anexa 1 rd.(70 + 80 + 100 + 110 + 120) col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r010c3) + toFloat(values.dec_table10_row_r010c4) + toFloat(values.dec_table11_row_r010c3) + toFloat(values.dec_table11_row_r010c4);
        value2 = toFloat(values.dec_table2_row_r190c4) + toFloat(values.dec_table2_row_r200c4) + toFloat(values.dec_table2_row_r210c4) + toFloat(values.dec_table2_row_r240c4) + toFloat(values.dec_table2_row_r270c4) + toFloat(values.dec_table2_row_r280c4);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 52,
                'msg': concatMessage('RF1-052', '', Drupal.t('Anexa 9 tab.3 rd.10 (col.3 + col.4) + tab.4 rd.10 (col.3 + col.4) <= Anexa 1 rd.(190 + 200 + 210 + 240 + 270 + 280) col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r010c9) + toFloat(values.dec_table10_row_r010c10) + toFloat(values.dec_table11_row_r010c9) + toFloat(values.dec_table11_row_r010c10);
        value2 = toFloat(values.dec_table2_row_r190c5) + toFloat(values.dec_table2_row_r200c5) + toFloat(values.dec_table2_row_r210c5) + toFloat(values.dec_table2_row_r240c5) + toFloat(values.dec_table2_row_r270c5) + toFloat(values.dec_table2_row_r280c5);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 53,
                'msg': concatMessage('RF1-053', '', Drupal.t('Anexa 9 tab.3 rd.10 (col.9 + col.10) + tab.4 rd.10 (col.9 + col.10) <= Anexa 1 rd.(190 + 200 + 210 + 240 + 270 + 280) col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r020c3) + toFloat(values.dec_table10_row_r020c4) + toFloat(values.dec_table11_row_r020c3) + toFloat(values.dec_table11_row_r020c4);
        value2 = toFloat(values.dec_table2_row_r190c4) + toFloat(values.dec_table2_row_r200c4);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 54,
                'msg': concatMessage('RF1-054', '', Drupal.t('Anexa 9 tab.3 rd.20 (col.3 + col.4) + tab.4 rd.20 (col.3 + col.4) <= Anexa 1 rd.(190 + 200) col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r020c9) + toFloat(values.dec_table10_row_r020c10) + toFloat(values.dec_table11_row_r020c9) + toFloat(values.dec_table11_row_r020c10);
        value2 = toFloat(values.dec_table2_row_r190c5) + toFloat(values.dec_table2_row_r200c5);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 55,
                'msg': concatMessage('RF1-055', '', Drupal.t('Anexa 9 tab.3 rd.20 (col.9 + col.10) + tab.4 rd.20 (col.9 + col.10) <= Anexa 1 rd.(190 + 200)col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r030c3) + toFloat(values.dec_table10_row_r030c4) + toFloat(values.dec_table11_row_r030c3) + toFloat(values.dec_table11_row_r030c4);
        value2 = toFloat(values.dec_table2_row_r210c4);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r210c4',
                'index': 0,
                'weight': 56,
                'msg': concatMessage('RF1-056', '', Drupal.t('Anexa 9 tab.3 rd.30 (col.3 + col.4) + tab.4 rd.30 (col.3 + col.4) <= Anexa 1 rd.210 col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r030c9) + toFloat(values.dec_table10_row_r030c10) + toFloat(values.dec_table11_row_r030c9) + toFloat(values.dec_table11_row_r030c10);
        value2 = toFloat(values.dec_table2_row_r210c5);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r210c5',
                'index': 0,
                'weight': 57,
                'msg': concatMessage('RF1-057', '', Drupal.t('Anexa 9 tab.3 rd.30 (col.9 + col.10) + tab.4 rd.30 (col.9 + col.10) <= Anexa 1 rd.210 col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r100c3) + toFloat(values.dec_table10_row_r100c4);
        value2 = toFloat(values.dec_table2_row_r540c4);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r210c5',
                'index': 0,
                'weight': 58,
                'msg': concatMessage('RF1-058', '', Drupal.t('Anexa 9 tab.3 rd.100 (col.3 + col.4) <= Anexa 1 rd.540 col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r100c9) + toFloat(values.dec_table10_row_r100c10);
        value2 = toFloat(values.dec_table2_row_r540c5);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r540c5',
                'index': 0,
                'weight': 59,
                'msg': concatMessage('RF1-059', '', Drupal.t('Anexa 9 tab.3 rd.100 (col.9 + col.10) <= Anexa 1 rd.540 col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r070c3) + toFloat(values.dec_table10_row_r070c4) + toFloat(values.dec_table11_row_r080c3) + toFloat(values.dec_table11_row_r080c4);
        value2 = toFloat(values.dec_table2_row_r470c4) + toFloat(values.dec_table2_row_r480c4);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 60,
                'msg': concatMessage('RF1-060', '', Drupal.t('Anexa 9 tab.3 rd.70 (col.3 + col.4) + tab.4 rd.80 (col.3 + col.4) <= Anexa 1 rd.(470 + 480)col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r070c9) + toFloat(values.dec_table10_row_r070c10) + toFloat(values.dec_table11_row_r080c9) + toFloat(values.dec_table11_row_r080c10);
        value2 = toFloat(values.dec_table2_row_r470c5) + toFloat(values.dec_table2_row_r480c5);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 61,
                'msg': concatMessage('RF1-061', '', Drupal.t('Anexa 9 tab.3 rd.70 (col.9 + col.10) + tab.4 rd.80 (col.9 + col.10) <= Anexa 1 rd.(470 + 480)col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r080c3) + toFloat(values.dec_table10_row_r080c4) + toFloat(values.dec_table11_row_r090c3) + toFloat(values.dec_table11_row_r090c4);
        value2 = toFloat(values.dec_table2_row_r490c4);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r490c4',
                'index': 0,
                'weight': 62,
                'msg': concatMessage('RF1-062', '', Drupal.t('Anexa 9 tab.3 rd.80 (col.3 + col.4) + tab.4 rd.90 (col.3 + col.4) <= Anexa 1 rd.490 col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table10_row_r080c9) + toFloat(values.dec_table10_row_r080c10) + toFloat(values.dec_table11_row_r090c9) + toFloat(values.dec_table11_row_r090c10);
        value2 = toFloat(values.dec_table2_row_r490c5);
        if (errorActuality(['table2', 'table10']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r490c5',
                'index': 0,
                'weight': 63,
                'msg': concatMessage('RF1-063', '', Drupal.t('Anexa 9 tab.3 rd.80 (col.9 + col.10) + tab.4 rd.90 (col.9 + col.10) <= Anexa 1 rd.490 col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table8_row_r030c3) + toFloat(values.dec_table9_row_r030c3);
        value2 = toFloat(values.dec_table2_row_r110c4);
        if (errorActuality(['table2', 'table8']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r110c4',
                'index': 0,
                'weight': 64,
                'msg': concatMessage('RF1-064', '', Drupal.t('Anexa 9 tab.1 rd.30 col.3 + tab.2 rd.30 col.3 <= Anexa 1 rd.110 col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table8_row_r030c7) + toFloat(values.dec_table9_row_r030c7);
        value2 = toFloat(values.dec_table2_row_r110c5);
        if (errorActuality(['table2', 'table8']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table2_row_r110c5',
                'index': 0,
                'weight': 65,
                'msg': concatMessage('RF1-065', '', Drupal.t('Anexa 9 tab.1 rd.30 col.7 + tab.2 rd.30 col.7 <= Anexa 1 rd.110 col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table8_row_r090c3) + toFloat(values.dec_table9_row_r100c3);
        value2 = toFloat(values.dec_table2_row_r400c4) + toFloat(values.dec_table2_row_r410c4) + toFloat(values.dec_table2_row_r420c4);
        if (errorActuality(['table2', 'table8']) && value1 > value2) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 66,
                'msg': concatMessage('RF1-066', '', Drupal.t('Anexa 9 tab.1 rd.90 col.3 + tab.2 rd.100 col.3 <= Anexa 1 rd.(400 + 410 + 420) col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table8_row_r090c7) + toFloat(values.dec_table9_row_r100c7);
        value2 = toFloat(values.dec_table2_row_r400c5) + toFloat(values.dec_table2_row_r410c5) + toFloat(values.dec_table2_row_r420c5);
        if (errorActuality(['table2', 'table8']) && value1 > value2) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 67,
                'msg': concatMessage('RF1-067', '', Drupal.t('Anexa 9 tab.1 rd.90 col.7 + tab.2 rd.100 col.7 <= Anexa 1 rd.(400 + 410 + 420) col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        var cfpArr = values.dec_fiscCod_cfp.split(',');
        var cfpNum = toFloat(cfpArr[0]);
        var cfpOrgs = [23, 24, 25, 26, 28];
        var cfpOrgsErr129 = [23, 24, 25, 26];
        if (cfpOrgs.indexOf(cfpNum) == -1 && values.dec_table12_row_r040c6) {
            webform.errors.push({
                'fieldName': 'dec_table12_row_r040c6',
                'index': 0,
                'weight': 123,
                'msg': concatMessage('RF1-123', '', Drupal.t('Anexa 9 tab.5 Dacă cod CFP<> 23, 24, 25, 26, 28, atunci Rd.40 col.6 = 0')),
            });
        }

        var r040c6 = toFloat(values.dec_table12_row_r040c6);
        var r320c5 = toFloat(values.dec_table2_row_r320c5);
        if (errorActuality(['table2', 'table12']) && cfpNum == 28 && r040c6 > r320c5) {
            webform.warnings.push({
                'fieldName': 'dec_table12_row_r040c6',
                'index': 0,
                'weight': 131,
                'msg': concatMessage('RF1-131', '', Drupal.t('Anexa 9 tab.5 Dacă cod CFP = 28, atunci rd.40 col.6 <= Anexa 1 rd.320 col5, (@val1 ; @val2)', {
                    '@val1': r040c6,
                    '@val2': r320c5
                })),
            });
        }

        if (errorActuality(['table2', 'table12']) && cfpOrgsErr129.indexOf(cfpNum) != -1 && (r040c6 != r320c5)) {
            webform.warnings.push({
                'fieldName': 'dec_table12_row_r040c6',
                'index': 0,
                'weight': 129,
                'msg': concatMessage('RF1-129', '', Drupal.t('Anexa 9 tab.5 Dacă cod CFP = 23, 24, 25, 26, atunci rd.40 col.6 = Anexa 1 rd.320 col5, (@val1 ; @val2)', {
                    '@val1': r040c6,
                    '@val2': r320c5
                })),
            });
        }

        if (cfpOrgs.indexOf(cfpNum) == -1 && (values.dec_table8_row_r060c7 != 0 || values.dec_table8_row_r010c7 != 0)) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 251,
                'msg': concatMessage('RF1-251', '', Drupal.t('Anexa 9 tab.1 Col.7 pentru CFP <> 23, 24, 25, 26, 28 egal cu 0')),
            });
        }

        var summ_r10 = toFloat(values.dec_table10_row_r010c9) + toFloat(values.dec_table10_row_r010c10);
        var summ_r60 = toFloat(values.dec_table10_row_r060c9) + toFloat(values.dec_table10_row_r060c10);
        if (cfpOrgs.indexOf(cfpNum) == -1 && (summ_r10 != 0 || summ_r60 != 0)) {
            webform.errors.push({
                'fieldName': '',
                'index': 0,
                'weight': 271,
                'msg': concatMessage('RF1-271', '', Drupal.t('Anexa 9 tab.3 Col.9+10 pentru CFP <> 23, 24, 25, 26, 28 egal cu 0')),
            });
        }

        value1 = toFloat(values.dec_table12_row_r010c3);
        value2 = toFloat(values.dec_table2_row_r070c4) + toFloat(values.dec_table2_row_r080c4);
        if (errorActuality(['table2', 'table12']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table12_row_r010c3',
                'index': 0,
                'weight': 132,
                'msg': concatMessage('RF1-132', '', Drupal.t('Anexa 9 tab.5 rd.10 col.3 <= Anexa 1 rd.(70 + 80) col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table12_row_r010c6);
        value2 = toFloat(values.dec_table2_row_r070c5) + toFloat(values.dec_table2_row_r080c5);
        if (errorActuality(['table2', 'table12']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table12_row_r010c6',
                'index': 0,
                'weight': 133,
                'msg': concatMessage('RF1-133', '', Drupal.t('Anexa 9 tab.5 rd.10 col.6 <= Anexa 1 rd.(70 + 80) col.5, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table14_row_r010c3);
        value2 = toFloat(values.dec_table1_row_r040c3);
        if (errorActuality(['table1', 'table14']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table14_row_r010c3',
                'index': 0,
                'weight': 136,
                'msg': concatMessage('RF1-136', '', Drupal.t('Anexa 9 tab.6 rd.10 col.3 <= Anexa 8 rd.40 col.3, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table14_row_r010c4);
        value2 = toFloat(values.dec_table1_row_r040c4);
        if (errorActuality(['table1', 'table14']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table14_row_r010c4',
                'index': 0,
                'weight': 137,
                'msg': concatMessage('RF1-137', '', Drupal.t('Anexa 9 tab.6 rd.10 col.4 <= Anexa 8 rd.40 col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table14_row_r070c3);
        value2 = toFloat(values.dec_table1_row_r130c3);
        if (errorActuality(['table1', 'table14']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table14_row_r070c3',
                'index': 0,
                'weight': 138,
                'msg': concatMessage('RF1-138', '', Drupal.t('Anexa 9 tab.6 rd.70 col.3 <= Anexa 8 rd.130 col.3, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table14_row_r070c4);
        value2 = toFloat(values.dec_table1_row_r130c4);
        if (errorActuality(['table1', 'table14']) && value1 > value2) {
            webform.errors.push({
                'fieldName': 'dec_table14_row_r070c4',
                'index': 0,
                'weight': 139,
                'msg': concatMessage('RF1-139', '', Drupal.t('Anexa 9 tab.6 rd.70 col.4 <= Anexa 8 rd.130 col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        value1 = toFloat(values.dec_table14_row_r010c4);
        value2 = toFloat(values.dec_table14_row_r020c4) + toFloat(values.dec_table14_row_r030c4) + toFloat(values.dec_table14_row_r040c4) + toFloat(values.dec_table14_row_r050c4) + toFloat(values.dec_table14_row_r060c4);
        if (value1 != value2) {
            webform.errors.push({
                'fieldName': 'dec_table14_row_r010c4',
                'index': 0,
                'weight': 310,
                'msg': concatMessage('RF1-310', '', Drupal.t('Anexa 9 tab.6 Rd 010 col.4 = Rd 020 + Rd 030 + Rd 040 + Rd 050 + Rd 060 col.4, (@val1 ; @val2)', {
                    '@val1': value1,
                    '@val2': value2
                })),
            });
        }

        for (var i = 3; i <= 57; i++) {
            if (i == 17 || i == 22 || i == 40 || i == 41) {
                continue;
            }
            var fieldName = "dec_dinamicTable" + i + "_row_r2";
            var fieldValues = values[fieldName];

            var countryCodes = {};
            for (var j = 0; j <= fieldValues.length; j++) {
                var code = fieldValues[j];
                var key = 'h' + code;
                if (!(key in countryCodes)) {
                    countryCodes[key] = {
                        'rows': []
                    };
                }

                countryCodes[key].rows.push(j);
            }

            for (var key in countryCodes) {
                var errorExist = false;
                if (countryCodes[key].rows.length > 1) {
                    for (var k = 0; k < countryCodes[key].rows.length; k++) {
                        if (errorExist) {
                            break;
                        } else {
                            errorExist = true;
                        }

                        for (var b = 0; b < tablesLimitations.length; b++) {
                            var table = tablesLimitations[b];
                            (function (e) {
                                if (e.id == i) {
                                    webform.errors.push({
                                        'fieldName': fieldName,
                                        'index': countryCodes[key].rows[k],
                                        'weight': '',
                                        'anexa': 9,
                                        'table': anexa9_getTableNumber(i),
                                        'row': e.rd,
                                        'msg': concatMessage('RF1-359', '', Drupal.t('Anexa 9 , tab @tab, rd @row - Codul tarii nu trebuie sa se repete', {
                                            '@tab': anexa9_getTableNumber(i),
                                            '@row': e.rd
                                        })),
                                    });
                                }
                            })(table);
                        }
                    }
                }
            }
        }

        var autofield_exp = [
            { 'rezField': 'dec_table1_row_r130c3', 'callback': _mywebform_expression_dec_table1_row_r130c3, 'err': 200, 'text': Drupal.t('Anexa 1 Rd.130 = Rd 010 + Rd 020 + Rd 030 + Rd 040 + Rd 050 + Rd 060 + Rd 070 + Rd 080 + Rd 090 + Rd 100 + Rd 110 + Rd 120') },
            { 'rezField': 'dec_table1_row_r130c4', 'callback': _mywebform_expression_dec_table1_row_r130c4, 'err': 200, 'text': Drupal.t('Anexa 1 Rd.130 = Rd 010 + Rd 020 + Rd 030 + Rd 040 + Rd 050 + Rd 060 + Rd 070 + Rd 080 + Rd 090 + Rd 100 + Rd 110 + Rd 120') },
            { 'rezField': 'dec_table2_row_r130c4', 'callback': _mywebform_expression_dec_table2_row_r130c4, 'err': 200, 'text': Drupal.t('Anexa 1 Rd.130 = Rd 010 + Rd 020 + Rd 030 + Rd 040 + Rd 050 + Rd 060 + Rd 070 + Rd 080 + Rd 090 + Rd 100 + Rd 110 + Rd 120') },
            { 'rezField': 'dec_table2_row_r130c5', 'callback': _mywebform_expression_dec_table2_row_r130c5, 'err': 200, 'text': Drupal.t('Anexa 1 Rd.130 = Rd 010 + Rd 020 + Rd 030 + Rd 040 + Rd 050 + Rd 060 + Rd 070 + Rd 080 + Rd 090 + Rd 100 + Rd 110 + Rd 120') },
            { 'rezField': 'dec_table2_row_r300c4', 'callback': _mywebform_expression_dec_table2_row_r300c4, 'err': 201, 'text': Drupal.t('Anexa 1 Rd.300 = Rd 140 + Rd 150 + Rd 160 + Rd 170 + Rd 180 + Rd 190 + Rd 200 + Rd 210 + Rd 220 + Rd 230 + Rd 240 + Rd 250 + Rd 260 + Rd 270 + Rd 280 + Rd 290') },
            { 'rezField': 'dec_table2_row_r300c5', 'callback': _mywebform_expression_dec_table2_row_r300c5, 'err': 201, 'text': Drupal.t('Anexa 1 Rd.300 = Rd 140 + Rd 150 + Rd 160 + Rd 170 + Rd 180 + Rd 190 + Rd 200 + Rd 210 + Rd 220 + Rd 230 + Rd 240 + Rd 250 + Rd 260 + Rd 270 + Rd 280 + Rd 290') },
            { 'rezField': 'dec_table2_row_r310c4', 'callback': _mywebform_expression_dec_table2_row_r310c4, 'err': 202, 'text': Drupal.t('Anexa 1 Rd.310 = Rd 130 + Rd 300') },
            { 'rezField': 'dec_table1_row_r130c4', 'callback': _mywebform_expression_dec_table1_row_r130c4, 'err': 202, 'text': Drupal.t('Anexa 1 Rd.310 = Rd 130 + Rd 300') },
            { 'rezField': 'dec_table2_row_r390c4', 'callback': _mywebform_expression_dec_table2_row_r390c4, 'err': 203, 'text': Drupal.t('Anexa 1 Rd.390 = Rd 320 + Rd 330 + Rd 340 + Rd 350 + Rd 360 - Rd 370 + Rd 380') },
            { 'rezField': 'dec_table2_row_r390c5', 'callback': _mywebform_expression_dec_table2_row_r390c5, 'err': 203, 'text': Drupal.t('Anexa 1 Rd.390 = Rd 320 + Rd 330 + Rd 340 + Rd 350 + Rd 360 - Rd 370 + Rd 380') },
            { 'rezField': 'dec_table2_row_r440c4', 'callback': _mywebform_expression_dec_table2_row_r440c4, 'err': 204, 'text': Drupal.t('Anexa 1 Rd.440 = Rd 400 + Rd 410 + Rd 420 + Rd 430') },
            { 'rezField': 'dec_table2_row_r440c5', 'callback': _mywebform_expression_dec_table2_row_r440c5, 'err': 204, 'text': Drupal.t('Anexa 1 Rd.440 = Rd 400 + Rd 410 + Rd 420 + Rd 430') },
            { 'rezField': 'dec_table2_row_r580c4', 'callback': _mywebform_expression_dec_table2_row_r580c4, 'err': 205, 'text': Drupal.t('Anexa 1 Rd.580 = Rd 450 + Rd 460 + Rd 470 + Rd 480 + Rd 490 + Rd 500 + Rd 510 + Rd 520 + Rd 530 + Rd 540 + Rd 550 + Rd 560 + Rd 570') },
            { 'rezField': 'dec_table2_row_r580c5', 'callback': _mywebform_expression_dec_table2_row_r580c5, 'err': 205, 'text': Drupal.t('Anexa 1 Rd.580 = Rd 450 + Rd 460 + Rd 470 + Rd 480 + Rd 490 + Rd 500 + Rd 510 + Rd 520 + Rd 530 + Rd 540 + Rd 550 + Rd 560 + Rd 570') },
            { 'rezField': 'dec_table2_row_r590c4', 'callback': _mywebform_expression_dec_table2_row_r590c4, 'err': 206, 'text': Drupal.t('Anexa 1 Rd.590 = Rd 390 + Rd 440 + Rd 580') },
            { 'rezField': 'dec_table2_row_r590c5', 'callback': _mywebform_expression_dec_table2_row_r590c5, 'err': 206, 'text': Drupal.t('Anexa 1 Rd.590 = Rd 390 + Rd 440 + Rd 580') },
            { 'rezField': 'dec_table3_row_r030c3', 'callback': _mywebform_expression_dec_table3_row_r030c3, 'err': 210, 'text': Drupal.t('Anexa 2 Rd.030 = Rd 010 - Rd 020') },
            { 'rezField': 'dec_table3_row_r030c4', 'callback': _mywebform_expression_dec_table3_row_r030c4, 'err': 210, 'text': Drupal.t('Anexa 2 Rd.030 = Rd 010 - Rd 020') },
            { 'rezField': 'dec_table3_row_r080c3', 'callback': _mywebform_expression_dec_table3_row_r080c3, 'err': 211, 'text': Drupal.t('Anexa 2 Rd.080 = Rd 030+ Rd 040 - Rd 050 - Rd 060 - Rd 070') },
            { 'rezField': 'dec_table3_row_r080c4', 'callback': _mywebform_expression_dec_table3_row_r080c4, 'err': 211, 'text': Drupal.t('Anexa 2 Rd.080 = Rd 030+ Rd 040 - Rd 050 - Rd 060 - Rd 070') },
            { 'rezField': 'dec_table3_row_r100c3', 'callback': _mywebform_expression_dec_table3_row_r100c3, 'err': 212, 'text': Drupal.t('Anexa 2 Rd.100 = Rd 080 + Rd 090') },
            { 'rezField': 'dec_table3_row_r100c4', 'callback': _mywebform_expression_dec_table3_row_r100c4, 'err': 212, 'text': Drupal.t('Anexa 2 Rd.100 = Rd 080 + Rd 090') },
            { 'rezField': 'dec_table3_row_r120c3', 'callback': _mywebform_expression_dec_table3_row_r120c3, 'err': 213, 'text': Drupal.t('Anexa 2 Rd.120 = Rd 100 - Rd 110') },
            { 'rezField': 'dec_table3_row_r120c4', 'callback': _mywebform_expression_dec_table3_row_r120c4, 'err': 213, 'text': Drupal.t('Anexa 2 Rd.120 = Rd 100 - Rd 110') },
            { 'rezField': 'dec_table5_row_r080c3', 'callback': _mywebform_expression_dec_table5_row_r080c3, 'err': 230, 'text': Drupal.t('Anexa 4 Rd. 080 = Rd. 010 - Rd. 020 - Rd. 030 - Rd. 040 - Rd. 050 + Rd. 060 - Rd. 070') },
            { 'rezField': 'dec_table5_row_r080c4', 'callback': _mywebform_expression_dec_table5_row_r080c4, 'err': 230, 'text': Drupal.t('Anexa 4 Rd. 080 = Rd. 010 - Rd. 020 - Rd. 030 - Rd. 040 - Rd. 050 + Rd. 060 - Rd. 070') }
        ];

        for (var i = 0; i < autofield_exp.length; i++) {
            autofield_expression(autofield_exp[i]);
        }

        validatePositiveFieldsWithFind('#dinamicTable3, #dinamicTable4, #dinamicTable5, #dinamicTable6, #dinamicTable7, #dinamicTable8, #dinamicTable9, #dinamicTable10', 9, 'RF1-252', 1);

        validatePositiveFieldsWithFind('#dinamicTable11, #dinamicTable12, #dinamicTable13, #dinamicTable14, #dinamicTable15, #dinamicTable16, #dinamicTable18, #dinamicTable19, #dinamicTable20', 9, 'RF1-256', 2);

        validatePositiveFieldsWithFind('#dinamicTable21, #dinamicTable23, #dinamicTable24, #dinamicTable25, #dinamicTable26, #dinamicTable27, #dinamicTable28, #dinamicTable29, #dinamicTable30', 9, 'RF1-272', 3);

        validatePositiveFieldsWithFind('#dinamicTable46, #dinamicTable47, #dinamicTable48', 9, 'RF1-333', 7);

        if (!values.dec_group2_adres) {
            webform.warnings.push({
                "fieldName": "dec_group2_adres",
                "msg": Drupal.t('Câmpul nu este completat')
            });
        }

        webform.validatorsStatus.validate_rsf1_a9 = 1;
        validateWebform();
    };

    webform.validators.rsf1_last_validator = function () {
        prepare_errors('errors');
        prepare_errors('warnings');

        //Sort warnings & errors
        sort_warnings_errors(webform.warnings);
        sort_warnings_errors(webform.errors);

        webform.validatorsStatus.rsf1_last_validator = 1;
        validateWebform();
    };

    function sort_by_property(a, b, property) {
        if (!a.hasOwnProperty(property)) {
            a[property] = 9999;
        }

        if (!b.hasOwnProperty(property)) {
            b[property] = 9999;
        }

        return toFloat(a[property]) - toFloat(b[property]);
    }

    function sort_warnings_errors(array) {
        array.sort(function (a, b) {
            var res = sort_by_property(a, b, 'weight');

            if (res == 0) {
                res = sort_by_property(a, b, 'anexa');

                if (res == 0) {
                    res = sort_by_property(a, b, 'table');

                    if (res == 0) {
                        res = sort_by_property(a, b, 'row');
                    }
                }
            }

            return res;
        });
    }

    function prepare_errors(type) {
        var dateFields = {};
        var requiredFields = {};
        var total = webform[type].length;
        var dateError = Drupal.t('Wrong field format: date needed');
        var requiredError = Drupal.t('This field is required');
        var countryFields = [
            { 'f1': 'dec_dinamicTable3_row_r1', 'f2': 'dec_dinamicTable3_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable4_row_r1', 'f2': 'dec_dinamicTable4_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable5_row_r1', 'f2': 'dec_dinamicTable5_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable6_row_r1', 'f2': 'dec_dinamicTable6_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable7_row_r1', 'f2': 'dec_dinamicTable7_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable8_row_r1', 'f2': 'dec_dinamicTable8_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable9_row_r1', 'f2': 'dec_dinamicTable9_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable10_row_r1', 'f2': 'dec_dinamicTable10_row_r2', 'error': false },

            { 'f1': 'dec_dinamicTable11_row_r1', 'f2': 'dec_dinamicTable11_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable12_row_r1', 'f2': 'dec_dinamicTable12_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable13_row_r1', 'f2': 'dec_dinamicTable13_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable14_row_r1', 'f2': 'dec_dinamicTable14_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable15_row_r1', 'f2': 'dec_dinamicTable15_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable16_row_r1', 'f2': 'dec_dinamicTable16_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable18_row_r1', 'f2': 'dec_dinamicTable18_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable19_row_r1', 'f2': 'dec_dinamicTable19_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable20_row_r1', 'f2': 'dec_dinamicTable20_row_r2', 'error': false },

            { 'f1': 'dec_dinamicTable21_row_r1', 'f2': 'dec_dinamicTable21_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable23_row_r1', 'f2': 'dec_dinamicTable23_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable24_row_r1', 'f2': 'dec_dinamicTable24_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable25_row_r1', 'f2': 'dec_dinamicTable25_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable26_row_r1', 'f2': 'dec_dinamicTable26_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable27_row_r1', 'f2': 'dec_dinamicTable27_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable28_row_r1', 'f2': 'dec_dinamicTable28_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable29_row_r1', 'f2': 'dec_dinamicTable29_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable30_row_r1', 'f2': 'dec_dinamicTable30_row_r2', 'error': false },

            { 'f1': 'dec_dinamicTable31_row_r1', 'f2': 'dec_dinamicTable31_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable32_row_r1', 'f2': 'dec_dinamicTable32_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable33_row_r1', 'f2': 'dec_dinamicTable33_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable34_row_r1', 'f2': 'dec_dinamicTable34_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable35_row_r1', 'f2': 'dec_dinamicTable35_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable36_row_r1', 'f2': 'dec_dinamicTable36_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable37_row_r1', 'f2': 'dec_dinamicTable37_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable38_row_r1', 'f2': 'dec_dinamicTable38_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable39_row_r1', 'f2': 'dec_dinamicTable39_row_r2', 'error': false },

            { 'f1': 'dec_dinamicTable42_row_r1', 'f2': 'dec_dinamicTable42_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable43_row_r1', 'f2': 'dec_dinamicTable43_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable44_row_r1', 'f2': 'dec_dinamicTable44_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable45_row_r1', 'f2': 'dec_dinamicTable45_row_r2', 'error': false },

            { 'f1': 'dec_dinamicTable49_row_r1', 'f2': 'dec_dinamicTable49_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable50_row_r1', 'f2': 'dec_dinamicTable50_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable51_row_r1', 'f2': 'dec_dinamicTable51_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable52_row_r1', 'f2': 'dec_dinamicTable52_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable53_row_r1', 'f2': 'dec_dinamicTable53_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable54_row_r1', 'f2': 'dec_dinamicTable54_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable55_row_r1', 'f2': 'dec_dinamicTable55_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable56_row_r1', 'f2': 'dec_dinamicTable56_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable57_row_r1', 'f2': 'dec_dinamicTable57_row_r2', 'error': false },

            { 'f1': 'dec_dinamicTable46_row_r1', 'f2': 'dec_dinamicTable46_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable47_row_r1', 'f2': 'dec_dinamicTable47_row_r2', 'error': false },
            { 'f1': 'dec_dinamicTable48_row_r1', 'f2': 'dec_dinamicTable48_row_r2', 'error': false }
        ];

        for (var i = 0; i < total; i++) {
            var error = webform[type][i];
            var fieldName = error.fieldName;
            var field = Drupal.settings.mywebform.fields.hasOwnProperty(fieldName) ? Drupal.settings.mywebform.fields[fieldName] : false;

            if (field) {
                if (field.type == 'date') {
                    if (error.msg == dateError) {
                        error.msg = '';
                        dateFields[fieldName] = field.title;
                    }
                } else if (field.type == 'period') {
                    error.msg = '';
                }

                if (field.required && error.msg == requiredError) {
                    error.msg = '';
                    var setError = true;

                    for (var j = 0; j < countryFields.length; j++) {
                        if (field.name == countryFields[j].f2) {
                            if (!countryFields[j].error) {
                                field = Drupal.settings.mywebform.fields[countryFields[j].f1];
                                countryFields[j].error = true;
                            } else {
                                setError = false;
                            }
                        } else if (field.name == countryFields[j].f1) {
                            if (countryFields[j].error) {
                                setError = false;
                            } else {
                                countryFields[j].error = true;
                            }
                        }
                    }

                    if (setError) {
                        requiredFields[fieldName] = field.title;
                    }
                }
            }

            if (isErrorMessageWithCode(error.msg)) {
                if (!error.hasOwnProperty('options')) {
                    error.options = {};
                }

                error.options.hide_title = true;
            }
        }

        if (Object.keys(requiredFields).length) {
            var elements = Object.values(requiredFields).join('<br />');

            webform[type].push({
                'fieldName': '',
                'weight': 10000,
                'msg': Drupal.t("<u>Cîmpuri obligatorii pentru completare:</u><br />!fields", { '!fields': elements })
            });
        }

        if (Object.keys(dateFields).length) {
            var elements = Object.values(dateFields).join('<br />');
            webform[type].push({
                'fieldName': '',
                'weight': 10001,
                'msg': Drupal.t("<u>Data trebuie să fie în formatul: ZZ.LL.AAAA, pentru:</u><br />!fields", { '!fields': elements })
            });
        }
    }

    function isErrorMessageWithCode(msg) {
        if (msg) {
            var regexp = /RF1-\d+/;
            if (regexp.test(msg)) {
                return true;
            }
        }

        return false;
    }

    function isSpecificCondition(reset) {
        if (specificCondition === null || reset) {
            var values = Drupal.settings.mywebform.values;
            var actives = values.dec_table2_row_r310c4 > 63600000;
            var workers = values.dec_fiscCod_nrScriptic > 50;
            var incomes = values.dec_table3_row_r010c3 > 127200000;

            var conditionA = actives && incomes;
            var conditionB = actives && workers;
            var conditionC = incomes && workers;

            specificCondition = conditionA || conditionB || conditionC;
        }

        return specificCondition;
    }

    function errorActuality(tables) {
        return (isSpecificCondition() || (!isSpecificCondition() && isTablesCompleted(tables)));
    }

    function validatePositiveFields(selector, annex, errorCode, canBeNegativeFields) {
        canBeNegativeFields = is_array(canBeNegativeFields) ? canBeNegativeFields : [];
        var values = Drupal.settings.mywebform.values;

        jQuery(selector + ' input').each(function () {
            var fieldName = jQuery(this).attr('field');
            if (canBeNegativeFields.indexOf(fieldName) == -1) {
                if (is_negative(values[fieldName])) {
                    webform.errors.push({
                        'fieldName': fieldName,
                        'index': 0,
                        'anexa': annex,
                        'weight': getWeightFromErrorCode(errorCode),
                        'msg': concatMessage(errorCode, '', Drupal.t('Anexa @annex Valoarea rîndului trebuie sa fie pozitivă', {
                            '@annex': annex
                        }))
                    });
                }
            }
        });
    }

    function validatePositiveFieldsWithFind(selector, annex, errorCode, tab) {
        var values = Drupal.settings.mywebform.values;

        jQuery(selector).find('td:not(.negative) input').each(function () {
            var fieldName = jQuery(this).attr('field');
            if (is_negative(values[fieldName])) {
                webform.errors.push({
                    'fieldName': fieldName,
                    'index': 0,
                    'anexa': annex,
                    'weight': getWeightFromErrorCode(errorCode),
                    'msg': concatMessage(errorCode, '', Drupal.t('Anexa @annex tab. @tab valoarea trebuie sa fie pozitivă', {
                        '@error_code': errorCode,
                        '@annex': annex,
                        '@tab': tab
                    })),
                });
            }
        });
    }

    function comparisonErrorPush(info) {
        var values = Drupal.settings.mywebform.values;

        webform.errors.push({
            'fieldName': info.f,
            'index': 0,
            'anexa': info.fa,
            'row': info.fr,
            'weight': getWeightFromErrorCode(info.c),
            'msg': concatMessage(info.c, '', Drupal.t('Anexa @annex rd. @row col. @col @op Anexa @dep_annex rd. @dep_row col. @dep_col, (@val1 ; @val2)', {
                '@error_code': info.c,
                '@annex': info.fa,
                '@row': info.fr,
                '@col': info.fc,
                '@dep_annex': info.efa,
                '@dep_row': info.efr,
                '@dep_col': info.efc,
                '@op': info.op,
                '@val1': formatNumber(values[info.f], 0),
                '@val2': formatNumber(values[info.ef], 0),
            })),
        });
    }

    function getCountrysOfTable5() {
        var rows = Drupal.settings.mywebform.values;
        var countrys = [];

        for (var i = 44; i <= 45; i++) {
            var field = 'dec_dinamicTable' + i + '_row_r1';
            for (var j = 0; j < rows[field].length; j++) {
                var value = rows[field][j];
                if (value != '') {
                    countrys.push(value);
                }
            }
        }
        return countrys;
    }

    function autofield_expression(massItem) {
        var values = Drupal.settings.mywebform.values;
        if (massItem.callback() != values[massItem.rezField]) {
            webform.errors.push({
                'fieldName': massItem.rezField,
                'index': 0,
                'weight': massItem.err,
                'msg': concatMessage('RF1-' + massItem.err, '', massItem.text)
            });
        }
    }

    function concatMessage(errorCode, fieldTitle, msg) {
        var titleParts = [];

        if (errorCode) {
            titleParts.push(getErrorMessage(errorCode));
        }

        if (fieldTitle) {
            titleParts.push(fieldTitle);
        }

        if (titleParts.length) {
            msg = titleParts.join(', ') + ' - ' + msg;
        }

        return msg;
    }

    function getFieldTitle(field) {
        return Drupal.settings.mywebform.fields[field].title;
    }

    function isLeap(year) {
        return new Date(year, 1, 29).getDate() === 29;
    }

    function getErrorMessage(errorCode) {
        return Drupal.t('Cod eroare: @error_code', { '@error_code': errorCode });
    }

    function getWeightFromErrorCode(errorCode) {
        var weight = parseInt(String(errorCode).substr(4));
        weight = weight ? weight : 9999;
        return weight;
    }

    function identifyCompletedTables(reset) {
        if (!completedTables.processed || reset) {
            var values = Drupal.settings.mywebform.values;
            completedTables = {
                'processed': true,
                'tables': {}
            };
            for (var fieldName in values) {
                var exp = /^dec_(table\d*|dinamicTable\d*)_/;
                var result = fieldName.match(exp);

                if (result) {
                    if (!completedTables.tables.hasOwnProperty(result[1])) {
                        if (values[fieldName] instanceof Array) {
                            if (values[fieldName].length > 1) {
                                completedTables.tables[result[1]] = true;
                            } else if (values[fieldName].length == 1) {
                                var gridName = Drupal.settings.mywebform.fields[fieldName].grid_name;
                                var indexField = Drupal.settings.mywebform.grids[gridName].defField;

                                if (fieldName != indexField) {
                                    if (values[fieldName][0] !== '' && values[fieldName][0] !== null) {
                                        completedTables.tables[result[1]] = true;
                                    }
                                }
                            }
                        } else {
                            if (values[fieldName] !== '' && values[fieldName] !== null) {
                                completedTables.tables[result[1]] = true;
                            }
                        }
                    }
                }
            }
        }
    }

    function isTableCompleted(table) {
        if (completedTables.tables.hasOwnProperty(table) && completedTables.tables[table]) {
            return true;
        }

        return false;
    }

    function isTablesCompleted(tables) {
        for (var i = 0; i < tables.length; i++) {
            if (!isTableCompleted(tables[i])) {
                return false;
            }
        }

        return true;
    }

    function anexa9_getTableNumber(ind) {
        if (ind <= 10) {
            return 1;
        } else if (ind <= 20) {
            return 2;
        } else if (ind <= 30) {
            return 3;
        } else if (ind <= 39) {
            return 4;
        } else if (ind <= 45) {
            return 5;
        } else if (ind <= 48) {
            return 7;
        } else if (ind <= 57) {
            return 6;
        }
    }
})(jQuery);

function changeCountryCodeInput(elem) {
    var inputCountry = jQuery(elem).closest('tr').find('input.input-country');
    if (jQuery(elem).val() == inputCountry.val())
        return;
    inputCountry.val(jQuery(elem).val()).change();
}

function changeCountrySelect(elem) {
    var getValue = jQuery(elem).val();
    if (jQuery(elem).closest('tr').find('select.select-country option[value=' + getValue + ']').length > 0) {
        jQuery(elem).closest('tr').find('select.select-country').val(getValue).change();
        return true;
    }
    mywebform_alert('Nu exista tara cu acest cod');
    return false;
}

function changeValutaCodeInput(elem) {
    var inputValuta = jQuery(elem).closest('tr').find('input.input-valuta');
    if (jQuery(elem).val() == inputValuta.val())
        return;

    inputValuta.val(jQuery(elem).val()).change();
}

function changeValutaSelect(elem) {
    var getValue = jQuery(elem).val();

    if (jQuery(elem).closest('tr').find('select.select-valuta option[value=' + getValue + ']').length > 0) {
        jQuery(elem).closest('tr').find('select.select-valuta').val(getValue).change();
        return true;
    }
    mywebform_alert('Nu exista valuta cu acest cod');
    return false;
}