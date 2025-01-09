(function ($) {

    var static_form_version;

    var form_versions = {
        'v1': {
            'year': 2019,
        },
        'v2': {
            'year': 2020,
        },
        // Warning: adding new version, make sure you have extended all rules that relies on previous version
    };

    var clonableAutocalc = [
        { 'resultF': 'CAPIa_R00_T_C2_FILIAL', 'simpleF': 'CAPIa_R01_T_C2_FILIAL', 'dynamicF': 'CAPIa_R_T_C2_FILIAL' },
        { 'resultF': 'CAPIa_R00_F_C2_FILIAL', 'simpleF': 'CAPIa_R01_F_C2_FILIAL', 'dynamicF': 'CAPIa_R_F_C2_FILIAL' },
        { 'resultF': 'CAPIa_R00_T_C3_FILIAL', 'simpleF': 'CAPIa_R01_T_C3_FILIAL', 'dynamicF': 'CAPIa_R_T_C3_FILIAL' },
        { 'resultF': 'CAPIa_R00_F_C3_FILIAL', 'simpleF': 'CAPIa_R01_F_C3_FILIAL', 'dynamicF': 'CAPIa_R_F_C3_FILIAL' },
        { 'resultF': 'CAPIa_R00_T_C4_FILIAL', 'simpleF': 'CAPIa_R01_T_C4_FILIAL', 'dynamicF': 'CAPIa_R_T_C4_FILIAL' },
        { 'resultF': 'CAPIa_R00_F_C4_FILIAL', 'simpleF': 'CAPIa_R01_F_C4_FILIAL', 'dynamicF': 'CAPIa_R_F_C4_FILIAL' },
        { 'resultF': 'CAPIa_R00_T_C5_FILIAL', 'simpleF': 'CAPIa_R01_T_C5_FILIAL', 'dynamicF': 'CAPIa_R_T_C5_FILIAL' },
        { 'resultF': 'CAPIa_R00_F_C5_FILIAL', 'simpleF': 'CAPIa_R01_F_C5_FILIAL', 'dynamicF': 'CAPIa_R_F_C5_FILIAL' },
        { 'resultF': 'CAPIa_R00_T_C6_FILIAL', 'simpleF': 'CAPIa_R01_T_C6_FILIAL', 'dynamicF': 'CAPIa_R_T_C6_FILIAL' },
        { 'resultF': 'CAPIa_R00_F_C6_FILIAL', 'simpleF': 'CAPIa_R01_F_C6_FILIAL', 'dynamicF': 'CAPIa_R_F_C6_FILIAL' },
        { 'resultF': 'CAPIa_R00_T_C7_FILIAL', 'simpleF': 'CAPIa_R01_T_C7_FILIAL', 'dynamicF': 'CAPIa_R_T_C7_FILIAL' },
        { 'resultF': 'CAPIa_R00_F_C7_FILIAL', 'simpleF': 'CAPIa_R01_F_C7_FILIAL', 'dynamicF': 'CAPIa_R_F_C7_FILIAL' },
        { 'resultF': 'CAPIa_R00_T_C8_FILIAL', 'simpleF': 'CAPIa_R01_T_C8_FILIAL', 'dynamicF': 'CAPIa_R_T_C8_FILIAL' },
        { 'resultF': 'CAPIa_R00_F_C8_FILIAL', 'simpleF': 'CAPIa_R01_F_C8_FILIAL', 'dynamicF': 'CAPIa_R_F_C8_FILIAL' },
        { 'resultF': 'CAPIa_R00_T_C9_FILIAL', 'simpleF': 'CAPIa_R01_T_C9_FILIAL', 'dynamicF': 'CAPIa_R_T_C9_FILIAL' },
        { 'resultF': 'CAPIa_R00_T_C10_FILIAL', 'simpleF': 'CAPIa_R01_T_C10_FILIAL', 'dynamicF': 'CAPIa_R_T_C10_FILIAL' },
        { 'resultF': 'CAPIa_R00_T_C11_FILIAL', 'simpleF': 'CAPIa_R01_T_C11_FILIAL', 'dynamicF': 'CAPIa_R_T_C11_FILIAL' },

        { 'resultF': 'CAPII_R00_T_C2_FILIAL', 'simpleF': 'CAPII_R01_T_C2_FILIAL', 'dynamicF': 'CAPII_R_T_C2_FILIAL' },
        { 'resultF': 'CAPII_R00_F_C2_FILIAL', 'simpleF': 'CAPII_R01_F_C2_FILIAL', 'dynamicF': 'CAPII_R_F_C2_FILIAL' },
        { 'resultF': 'CAPII_R00_T_C3_FILIAL', 'simpleF': 'CAPII_R01_T_C3_FILIAL', 'dynamicF': 'CAPII_R_T_C3_FILIAL' },
        { 'resultF': 'CAPII_R00_T_C4_FILIAL', 'simpleF': 'CAPII_R01_T_C4_FILIAL', 'dynamicF': 'CAPII_R_T_C4_FILIAL' },
        { 'resultF': 'CAPII_R00_F_C4_FILIAL', 'simpleF': 'CAPII_R01_F_C4_FILIAL', 'dynamicF': 'CAPII_R_F_C4_FILIAL' },
        { 'resultF': 'CAPII_R00_T_C5_FILIAL', 'simpleF': 'CAPII_R01_T_C5_FILIAL', 'dynamicF': 'CAPII_R_T_C5_FILIAL' },
        { 'resultF': 'CAPII_R00_F_C5_FILIAL', 'simpleF': 'CAPII_R01_F_C5_FILIAL', 'dynamicF': 'CAPII_R_F_C5_FILIAL' },
        { 'resultF': 'CAPII_R00_T_C6_FILIAL', 'simpleF': 'CAPII_R01_T_C6_FILIAL', 'dynamicF': 'CAPII_R_T_C6_FILIAL' },
        { 'resultF': 'CAPII_R00_F_C6_FILIAL', 'simpleF': 'CAPII_R01_F_C6_FILIAL', 'dynamicF': 'CAPII_R_F_C6_FILIAL' },
        { 'resultF': 'CAPII_R00_T_C7_FILIAL', 'simpleF': 'CAPII_R01_T_C7_FILIAL', 'dynamicF': 'CAPII_R_T_C7_FILIAL' },
        { 'resultF': 'CAPII_R00_F_C7_FILIAL', 'simpleF': 'CAPII_R01_F_C7_FILIAL', 'dynamicF': 'CAPII_R_F_C7_FILIAL' },
        { 'resultF': 'CAPII_R00_T_C8_FILIAL', 'simpleF': 'CAPII_R01_T_C8_FILIAL', 'dynamicF': 'CAPII_R_T_C8_FILIAL' },
        { 'resultF': 'CAPII_R00_F_C8_FILIAL', 'simpleF': 'CAPII_R01_F_C8_FILIAL', 'dynamicF': 'CAPII_R_F_C8_FILIAL' },
    ];

    var autocalcFix = {
        'CAPIa_R00__TYPE__C_COL_': [
            'CAPIa_R01__TYPE__C_COL_',
            'CAPIa_R__TYPE__C_COL_'
        ],
        'CAPII_R00__TYPE__C_COL_': [
            'CAPII_R01__TYPE__C_COL_',
            'CAPII_R__TYPE__C_COL_'
        ],
        'CAPIa_R00__TYPE__C_COL__FILIAL': [
            'CAPIa_R01__TYPE__C_COL__FILIAL',
            'CAPIa_R__TYPE__C_COL__FILIAL'
        ],
        'CAPII_R00__TYPE__C_COL__FILIAL': [
            'CAPII_R01__TYPE__C_COL__FILIAL',
            'CAPII_R__TYPE__C_COL__FILIAL'
        ],
        'CAPIa_R00_T_C3': [
            'CAPIa_R01_T_C4',
            'CAPIa_R01_T_C6',
            'CAPIa_R_T_C4',
            'CAPIa_R_T_C6'
        ],
        'CAPIa_R01_T_C3': [
            'CAPIa_R01_T_C4',
            'CAPIa_R01_T_C6'
        ],
        'CAPIa_R_T_C3': [
            'CAPIa_R_T_C4',
            'CAPIa_R_T_C6'
        ],
        'CAPIa_R00_T_C3_FILIAL': [
            'CAPIa_R01_T_C4_FILIAL',
            'CAPIa_R01_T_C6_FILIAL',
            'CAPIa_R_T_C4_FILIAL',
            'CAPIa_R_T_C6_FILIAL'
        ],
        'CAPIa_R01_T_C3_FILIAL': [
            'CAPIa_R01_T_C4_FILIAL',
            'CAPIa_R01_T_C6_FILIAL'
        ],
        'CAPIa_R_T_C3_FILIAL': [
            'CAPIa_R_T_C4_FILIAL',
            'CAPIa_R_T_C6_FILIAL'
        ],
        'CAPV_R1_C1': [
            'CAPV_R2_C1',
            'CAPV_R3_C1',
            'CAPV_R4_C1',
            'CAPV_R5_C1'
        ],
        'CAPV_R3_C1': [
            'CAPV_R3_1_C1',
            'CAPV_R3_2_C1'
        ]
    };

    var mainCaemFields = [
        'CAPIa_R01_T_C1',
        'CAPIa_R01_T_C1_FILIAL',
        'CAPII_R01_T_C1',
        'CAPII_R01_T_C1_FILIAL'
    ];

    Drupal.behaviors.munca3 = {
        attach: function (context) {
            jQuery('#mywebform-edit-form').on('change', '.dynamic-cuatm', function () {
                var cuatm = jQuery(this).val();
                //var region = get_region_by_cuatm(cuatm);
                //jQuery(this).closest('.row').find('.dynamic-region').val(String(region).trim()).trigger('change');
            });

            jQuery('#mywebform-edit-form').on('mywebform:gridRefreshField', 'input.dynamic-region', function () {
                var val = String(jQuery(this).val());
                var processed_val = val.trim();

                if (val != processed_val) {
                    jQuery(this).val(processed_val).trigger('change');
                }
            });

            jQuery('#mywebform-edit-form', context).on('keypress', 'input.numeric, input.money, input.float', function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });

            jQuery('#mywebform-edit-form', context).on('paste', 'input.numeric, input.money, input.float', function (event) {
                var obj = event.originalEvent || event;

                if (typeof obj.clipboardData !== 'undefined') {
                    var value = obj.clipboardData.getData('text/plain');
                    var number = Number(value);

                    if (isNaN(number) || is_negative(number)) {
                        event.preventDefault();
                    }
                }
            });

            jQuery('#mywebform-edit-form').on('mywebform:sync', 'input', function () {
                var $this = jQuery(this);
                var fieldName = $this.attr('field');

                for (var i = 0; i < clonableAutocalc.length; i++) {
                    var specs = clonableAutocalc[i];
                    if (fieldName == specs.simpleF || fieldName == specs.dynamicF) {
                        calculate_clonable_table_result($this, specs);
                    }
                }
            });

            jQuery('#mywebform-edit-form').on('mywebform:sync', 'input.autofield', function () {
                fix_autocalc_fields(jQuery(this));
            });

            jQuery('#CAEM').on('mywebform:sync', function () {
                fill_main_caem_fields();
            });

            jQuery('#mywebform-edit-form').on('mywebform:sync', 'select.dynamic-table-caem', function () {
                fill_dynamic_table2_caem_field(jQuery(this));
            });

            jQuery('#mywebform-edit-form').on('mywebform:sync', 'select.dynamic-section-caem', function () {
                fill_dynamic_section2_caem_field(jQuery(this));
            });

            jQuery('#mywebform-edit-form').on('mywebform:sync', 'select.dynamicSection-cuatm', function () {
                fill_dynamic_section2_cuatm_fields(jQuery(this));
            });

            jQuery('#CAPIa').on('row_added', function () {
                var gridObject = jQuery(this).getGridObject();
                var $grid2 = jQuery('#CAPII');
                if (gridObject.count > 1) {
                    $grid2.find('.CAPII-grid-addrow').trigger('click');
                }
            });

            jQuery('#CAPIa').on('row_deleted', function (event, rowIndex) {
                jQuery('.CAPII-row.row-' + rowIndex + ' .CAPII-grid-delrow').trigger('click');
            });

            jQuery('#FILIAL_CAPIa').on('row_added', function (event) {
                jQuery('#FILIAL_CAPII .FILIAL_CAPII-grid-addrow').trigger('click');
            });

            jQuery('#FILIAL_CAPIa').on('row_deleted', function (event, rowIndex) {
                jQuery('.FILIAL_CAPII-row.row-' + rowIndex + ' .FILIAL_CAPII-grid-delrow').trigger('click');
            });

            jQuery('#FILIAL_CAPIa').on('row_added', '.FILIAL_CAPIa-CAPIa-wrapper', function (event) {
                event.stopPropagation();

                var gridObject = jQuery(this).getGridObject();
                var $grid2 = jQuery('#CAPII_FILIAL-' + gridObject.parentIndex);

                if (gridObject.count > 1) {
                    $grid2.find('.grid-addrow').trigger('click');
                }
            });

            jQuery('#FILIAL_CAPIa').on('row_deleted', '.FILIAL_CAPIa-CAPIa-wrapper', function (event, rowIndex) {
                event.stopPropagation();

                var gridObject = jQuery(this).getGridObject();
                var $grid2 = jQuery('#CAPII_FILIAL-' + gridObject.parentIndex);
                $grid2.find('.row-' + rowIndex + ' .delrow a').trigger('click');
            });

            jQuery('#YEAR').on('mywebform:sync', function () {
                if (static_form_version != get_form_version(true)) {
                    show_specific_form_version();
                }
            });

            if (!Drupal.settings.mywebform.preview) {
                show_specific_form_version(false);
            }
        }
    };

    webform.afterLoad.munca3 = function () {
        if (!Drupal.settings.mywebform.preview) {
            fill_main_caem_fields();

            jQuery('#mywebform-edit-form').once('grid-init', function () {
                show_specific_form_version(false);
            });
        }
    };

    function calculate_clonable_table_result($element, specs) {
        var rowIndex = Number($element.attr('row-index'));
        var parentIndex = Number($element.attr('parent-index'));
        var index = parentIndex ? parentIndex - 1 : rowIndex - 1;

        var result = sum(Drupal.settings.mywebform.values[specs.dynamicF][index]) + toFloat(Drupal.settings.mywebform.values[specs.simpleF][index]);
        jQuery('#' + specs.resultF + '-' + (index + 1)).val(toFloat(result)).trigger('change');
    }

    function fix_autocalc_fields($element) {
        var resultFieldName = $element.attr('field');
        var rowIndex = $element.attr('row-index');
        var parentIndex = $element.attr('parent-index');
        var dependentFields = [];

        if (!autocalcFix.hasOwnProperty(resultFieldName)) {
            var regExp = /([T|F])+_C(\d)/;
            var matches = resultFieldName.match(regExp);
            if (matches != null && matches.length) {
                var template = resultFieldName.replace(regExp, '_TYPE__C_COL_');
                if (autocalcFix.hasOwnProperty(template)) {
                    for (var i = 0; i < autocalcFix[template].length; i++) {
                        var dependentField = autocalcFix[template][i].replace('_TYPE__C_COL_', matches[1] + '_C' + matches[2]);
                        dependentFields.push(dependentField);
                    }
                }
            }
        } else {
            dependentFields = autocalcFix[resultFieldName];
        }

        var total = dependentFields.length;
        if (total) {
            var someFieldIsFilled = false;

            for (var i = 0; i < total; i++) {
                var fieldName = dependentFields[i];
                var field = Drupal.settings.mywebform.fields[fieldName];
                if (isFieldValueFilled(field, rowIndex, parentIndex)) {
                    someFieldIsFilled = true;
                    break;
                }
            }

            if (!someFieldIsFilled && $element.val() !== '') {
                $element.val('').trigger('change')
            }
        }
    }

    function isFieldValueFilled(field, index, parentIndex) {
        var value = [];
        parentIndex = toFloat(parentIndex);
        index = toFloat(index);

        if (field.parent_grid_name && field.grid_name) {
            if (!parentIndex && index) {
                value = Drupal.settings.mywebform.values[field.name][index - 1];
            } else if (parentIndex && index) {
                value.push(Drupal.settings.mywebform.values[field.name][parentIndex - 1][index - 1]);
            }
        } else if (field.grid_name) {
            if (index) {
                value.push(Drupal.settings.mywebform.values[field.name][index - 1]);
            } else {
                value = Drupal.settings.mywebform.values[field.name];
            }
        } else {
            value.push(Drupal.settings.mywebform.values[field.name]);
        }

        if (value instanceof Array && value.length) {
            for (var i = 0; i < value.length; i++) {
                if (value[i] !== '') {
                    return true;
                }
            }
        }

        return false;
    }

    function fill_main_caem_fields() {
        var caem = get_caem();
        for (var i = 0; i < mainCaemFields.length; i++) {
            var field = Drupal.settings.mywebform.fields[mainCaemFields[i]];

            if (field.grid_name) {
                for (var k = 0; k < Drupal.settings.mywebform.values[mainCaemFields[i]].length; k++) {
                    fill_caem_field(mainCaemFields[i], caem, k);
                }
            }

            fill_caem_field(mainCaemFields[i], caem, false);
        }
    }

    function fill_caem_field(fieldName, caem, index) {
        var id = '#' + fieldName;

        if (typeof index === 'number') {
            id += '-' + (parseInt(index) + 1);
        }

        var $field = jQuery(id);
        $field.myWebformSelect2SetVal(caem).trigger('change');
    }

    function fill_dynamic_section2_cuatm_fields($element) {
        var rowIndex = $element.attr('row-index');
        var cuatm = $element.val();

        if (rowIndex) {
            jQuery('.FILIAL_CAPII-row.row-' + rowIndex + ' select.dynamicSection2-cuatm')
                .myWebformSelect2SetVal(cuatm)
                .trigger('change');
        }
    }

    function fill_dynamic_table2_caem_field($element) {
        var rowIndex = $element.attr('row-index');
        var caem = $element.val();

        if (rowIndex) {
            jQuery('.CAPII-row.row-' + rowIndex + ' select.dynamic-table2-caem')
                .myWebformSelect2SetVal(caem)
                .trigger('change');
        }
    }

    function fill_dynamic_section2_caem_field($element) {
        var rowIndex = $element.attr('row-index');
        var parentIndex = $element.attr('parent-index');
        var caem = $element.val();

        if (parentIndex && rowIndex) {
            jQuery('.CAPII_FILIAL-' + parentIndex + '-row.row-' + rowIndex + ' select.dynamic-section2-caem')
                .myWebformSelect2SetVal(caem)
                .trigger('change');
        }
    }

    function concatMessage(errorCode, fieldTitle, errorMessage) {
        var codeMessage = errorCodeMessage(errorCode);
        var title;
        var titleOfMessage = [];

        if (errorCode) {
            titleOfMessage.push(codeMessage);
        }

        if (fieldTitle) {
            titleOfMessage.push(fieldTitle);
        }

        if (titleOfMessage.length) {
            title = titleOfMessage.join(', ');
        }

        if (title && errorMessage) {
            errorMessage = title + ' - ' + errorMessage;
        }

        return errorMessage;
    }

    function errorCodeMessage(errorCode) {
        return Drupal.t('Cod eroare: @error_code', { '@error_code': errorCode });
    }

    webform.validators.validate_m3 = function () {
        var values = Drupal.settings.mywebform.values;

        var comparison_fields_table3 = [
            { 'f1': 'CAPIII_R1_C1', 'f2': 'CAPIII_R1_C2', 'row': 1 },
            { 'f1': 'CAPIII_R2_C1', 'f2': 'CAPIII_R2_C2', 'row': 2 },
            { 'f1': 'CAPIII_R3_C1', 'f2': 'CAPIII_R3_C2', 'row': 3 },
            { 'f1': 'CAPIII_R4_C1', 'f2': 'CAPIII_R4_C2', 'row': 4 },
        ];

        for (i = 0; i < comparison_fields_table3.length; i++) {
            var f1 = Drupal.settings.mywebform.values[comparison_fields_table3[i].f1];
            var f2 = Drupal.settings.mywebform.values[comparison_fields_table3[i].f2];

            if (toFloat(f1) < toFloat(f2)) {
                webform.errors.push({
                    'fieldName': comparison_fields_table3[i].f2,
                    'index': i,
                    'weight': 92,
                    'options': {
                        'hide_title': true
                    },
                    'msg': Drupal.t('Cod eroare: 03-092 - CAP.III., Rândul @row, col. 2 <= Rândul @row, col. 1', {
                        '@row': comparison_fields_table3[i].row
                    })
                });
            }
        }

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

        var cap1a_c1_00T = toFloat(values.CAPIa_R00_T_C2);
        var cap3_c1_fields = [
            { 'field': 'CAPIII_R1_C1', 'row': 1 },
            { 'field': 'CAPIII_R2_C1', 'row': 2 },
            { 'field': 'CAPIII_R3_C1', 'row': 3 },
            { 'field': 'CAPIII_R4_C1', 'row': 4 }
        ];

        for (var i = 0; i < cap3_c1_fields.length; i++) {
            var c1_specs = cap3_c1_fields[i];
            if (toFloat(values[c1_specs.field]) > cap1a_c1_00T) {
                webform.warnings.push({
                    'fieldName': c1_specs.field,
                    'index': 0,
                    'weight': 66,
                    'options': {
                        'hide_title': true
                    },
                    'msg': Drupal.t('Cod eroare: 03-066 - Cap III, Col.1, Rândul 1-4 <= Cap I,  Col.1, „Total salariați”, Rândul @row pentru fiecare rând aparte', {
                        '@row': c1_specs.row
                    })
                });
            }
        }

        var cap2_c1_00T = toFloat(values.CAPII_R00_T_C2);
        var cap3_c3_fields = [
            { 'field': 'CAPIII_R1_C3', 'row': 1 },
            { 'field': 'CAPIII_R2_C3', 'row': 2 },
            { 'field': 'CAPIII_R3_C3', 'row': 3 },
            { 'field': 'CAPIII_R4_C3', 'row': 4 }
        ];
        for (var i = 0; i < cap3_c3_fields.length; i++) {
            var c3_specs = cap3_c3_fields[i];
            if (toFloat(values[c3_specs.field]) > cap2_c1_00T) {
                webform.warnings.push({
                    'fieldName': c3_specs.field,
                    'index': 0,
                    'weight': 69,
                    'options': {
                        'hide_title': true
                    },
                    'msg': Drupal.t('Cod eroare: 03-069 - Cap III, Col.3, Rândul 1-4 <= Cap II, Col. 1, „Total salariați”, Rândul @row pentru fiecare rând aparte', {
                        '@row': c3_specs.row
                    })
                });
            }
        }

        for (var i = 0; i < cap3_c1_fields.length; i++) {
            var c1_specs = cap3_c1_fields[i];
            var c3_specs = cap3_c3_fields[i];

            if (values[c1_specs.field] && !values[c3_specs.field]) {
                webform.warnings.push({
                    'fieldName': c3_specs.field,
                    'index': i,
                    'weight': 140,
                    'options': {
                        'hide_title': true
                    },
                    'msg': Drupal.t('Cod eroare: 03-140 - Cap. III, Rândul @row, dacă col. 1 > 0, atunci col. 3 > 0 si invers pe fiecare rând', {
                        '@row': c3_specs.row
                    })
                });
            } else if (!values[c1_specs.field] && values[c3_specs.field]) {
                webform.warnings.push({
                    'fieldName': c1_specs.field,
                    'index': i,
                    'weight': 140,
                    'options': {
                        'hide_title': true
                    },
                    'msg': Drupal.t('Cod eroare: 03-140 - Cap. III, Rândul @row, dacă col. 1 > 0, atunci col. 3 > 0 si invers pe fiecare rând', {
                        '@row': c1_specs.row
                    })
                });
            }
        }
        //trebuie sters?
        /*var val_t2_r0_c9t = toFloat(values.dec_dynamicTable2_r0_c9t);
        var val_t5_row_r411c1 = toFloat(values.dec_table5_row_r411c1);
        if (val_t2_r0_c9t == val_t5_row_r411c1) {
          webform.warnings.push({
            'fieldName' : 'dec_table5_row_r411c1',
            'index' : 0,
            'weight': 146,
            'options': {
              'hide_title': true
            },
            'msg' : Drupal.t('Cod eroare: 03-146 - Cap.II, R.00-T, Col.9 ≠ Cap.V, R.4.1.1, (@val1 ; @val2)', {
              '@val1': formatNumber(val_t2_r0_c9t, 2),
              '@val2': formatNumber(val_t5_row_r411c1, 2)
            })
          });
        }*/
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
        if (values.CAPV_R11_C1) {
            webform.warnings.push({
                'fieldName': 'CAPV_R11_C1',
                'index': 0,
                'weight': 139,
                'options': {
                    'hide_title': true
                },
                'msg': Drupal.t('Cod eroare: 03-139 - CAP.V rândul 11 conține date, asigurați-vă de relevanța lor')
            });
        }

        var caem_equal_fields_static = {
            'col1a': 'CAPIa_R01_T_C1',
            'col2': 'CAPII_R01_T_C1'
        };

        var caem_equal_fields_static_row = {
            'col1a': 'CAPIa_R_T_C1',
            'col2': 'CAPII_R_T_C1'
        };

        var caem_equal_fields_dynamic = {
            'col1a': 'CAPIa_R01_T_C1_FILIAL',
            'col2': 'CAPII_R01_T_C1_FILIAL'
        };

        var caem_equal_fields_dynamic_row = {
            'col1a': 'CAPIa_R_T_C1_FILIAL',
            'col2': 'CAPII_R_T_C1_FILIAL'
        };

        var cap1a_c1_c2_static = [
            { 'f1': 'CAPIa_R00_T_C2', 'f2': 'CAPIa_R00_T_C3' },
            { 'f1': 'CAPIa_R00_F_C2', 'f2': 'CAPIa_R00_F_C3' },
            { 'f1': 'CAPIa_R01_T_C2', 'f2': 'CAPIa_R01_T_C3' },
            { 'f1': 'CAPIa_R01_F_C2', 'f2': 'CAPIa_R01_F_C3' }
        ];

        var cap1a_c1_c2_static_row = [
            { 'f1': 'CAPIa_R_T_C2', 'f2': 'CAPIa_R_T_C3' },
            { 'f1': 'CAPIa_R_F_C2', 'f2': 'CAPIa_R_T_C3' }
        ];

        var cap1a_c1_c2_dynamic = [
            { 'f1': 'CAPIa_R00_T_C2_FILIAL', 'f2': 'CAPIa_R00_T_C3_FILIAL' },
            { 'f1': 'CAPIa_R00_F_C2_FILIAL', 'f2': 'CAPIa_R00_F_C3_FILIAL' },
            { 'f1': 'CAPIa_R01_T_C2_FILIAL', 'f2': 'CAPIa_R01_T_C3_FILIAL' },
            { 'f1': 'CAPIa_R01_F_C2_FILIAL', 'f2': 'CAPIa_R01_F_C3_FILIAL' },
        ];

        var cap1a_c1_c2_dynamic_row = [
            { 'f1': 'CAPIa_R_T_C2_FILIAL', 'f2': 'CAPIa_R_T_C3_FILIAL' },
            { 'f1': 'CAPIa_R_F_C2_FILIAL', 'f2': 'CAPIa_R_F_C3_FILIAL' },
        ];

        var comparison_fields_c2_c3_static = [
            { 'f1': 'CAPII_R00_T_C4', 'f2': 'CAPII_R00_T_C3' },
            { 'f1': 'CAPII_R01_T_C4', 'f2': 'CAPII_R01_T_C3' }
        ];

        var comparison_fields_c2_c3_static_row = { 'f1': 'CAPII_R_T_C4', 'f2': 'CAPII_R_T_C3' };

        var comparison_fields_c2_c3_dynamic = [
            { 'f1': 'CAPII_R00_T_C4_FILIAL', 'f2': 'CAPII_R00_T_C3_FILIAL' },
            { 'f1': 'CAPII_R01_T_C4_FILIAL', 'f2': 'CAPII_R01_T_C3_FILIAL' }
        ];

        var comparison_fields_c2_c3_dynamic_row = { 'f1': 'CAPII_R_T_C4_FILIAL', 'f2': 'CAPII_R_T_C3_FILIAL' };

        var col1a_c4_c7_static = [
            { 'f1': 'CAPIa_R00_T_C5', 'f2': 'CAPIa_R00_T_C8' },
            { 'f1': 'CAPIa_R01_T_C5', 'f2': 'CAPIa_R01_T_C8' }
        ];

        var col1a_c4_c7_static_row = { 'f1': 'CAPIa_R_T_C5', 'f2': 'CAPIa_R_T_C8' };

        var col1a_c4_c7_dynamic = [
            { 'f1': 'CAPIa_R00_T_C5_FILIAL', 'f2': 'CAPIa_R00_T_C8_FILIAL' },
            { 'f1': 'CAPIa_R01_T_C5_FILIAL', 'f2': 'CAPIa_R01_T_C8_FILIAL' }
        ];

        var col1a_c4_c7_dynamic_row = { 'f1': 'CAPIa_R_T_C5_FILIAL', 'f2': 'CAPIa_R_T_C8_FILIAL' };

        var cap2_c1_c7_static = [
            { 'f1': 'CAPII_R00_T_C2', 'f2': 'CAPII_R00_T_C8' },
            { 'f1': 'CAPII_R00_F_C2', 'f2': 'CAPII_R00_F_C8' },
            { 'f1': 'CAPII_R01_T_C2', 'f2': 'CAPII_R01_T_C8' },
            { 'f1': 'CAPII_R01_F_C2', 'f2': 'CAPII_R01_F_C8' }
        ];

        var cap2_c1_c7_static_row = [
            { 'f1': 'CAPII_R_T_C2', 'f2': 'CAPII_R_T_C8' },
            { 'f1': 'CAPII_R_F_C2', 'f2': 'CAPII_R_F_C8' }
        ];

        var cap2_c1_c7_dynamic = [
            { 'f1': 'CAPII_R00_T_C2_FILIAL', 'f2': 'CAPII_R00_T_C8_FILIAL' },
            { 'f1': 'CAPII_R00_F_C2_FILIAL', 'f2': 'CAPII_R00_F_C8_FILIAL' },
            { 'f1': 'CAPII_R01_T_C2_FILIAL', 'f2': 'CAPII_R01_T_C8_FILIAL' },
            { 'f1': 'CAPII_R01_F_C2_FILIAL', 'f2': 'CAPII_R01_F_C8_FILIAL' },
        ];

        var cap2_c1_c7_dynamic_row = [
            { 'f1': 'CAPII_R_T_C2_FILIAL', 'f2': 'CAPII_R_T_C8_FILIAL' },
            { 'f1': 'CAPII_R_F_C2_FILIAL', 'f2': 'CAPII_R_F_C8_FILIAL' },
        ];
        /*
        var cap2_c1_c9_static = [
          {'f1': 'dec_dynamicTable2_r0_c1t', 'f2': 'dec_dynamicTable2_r0_c9t'},
          {'f1': 'dec_dynamicTable2_r0_c1f', 'f2': 'dec_dynamicTable2_r0_c9f'},
          {'f1': 'dec_dynamicTable2_r1_c1t', 'f2': 'dec_dynamicTable2_r1_c9t'},
          {'f1': 'dec_dynamicTable2_r1_c1f', 'f2': 'dec_dynamicTable2_r1_c9f'}
        ];
    
        var cap2_c1_c9_static_row = [
          {'f1': 'dec_dynamicTable2_row_c1t', 'f2': 'dec_dynamicTable2_row_c9t'},
          {'f1': 'dec_dynamicTable2_row_c1f', 'f2': 'dec_dynamicTable2_row_c9f'}
        ];
    
        var cap2_c1_c9_dynamic = [
          {'f1': 'dec_dynamicSection2_row_r0c1t', 'f2': 'dec_dynamicSection2_row_r0c9t'},
          {'f1': 'dec_dynamicSection2_row_r0c1f', 'f2': 'dec_dynamicSection2_row_r0c9f'},
          {'f1': 'dec_dynamicSection2_row_r1c1t', 'f2': 'dec_dynamicSection2_row_r1c9t'},
          {'f1': 'dec_dynamicSection2_row_r1c1f', 'f2': 'dec_dynamicSection2_row_r1c9f'},
        ];
    
        var cap2_c1_c9_dynamic_row = [
          {'f1': 'dec_dynamicSection2_row_dynSectDynTable2_row_c1t', 'f2': 'dec_dynamicSection2_row_dynSectDynTable2_row_c9t'},
          {'f1': 'dec_dynamicSection2_row_dynSectDynTable2_row_c1f', 'f2': 'dec_dynamicSection2_row_dynSectDynTable2_row_c9f'},
        ];*/

        var cap2_5_13_percent_static = [
            { 'f1': 'CAPII_R00_T_C8', 'f2': 'CAPII_R00_T_C2', 'f3': 'CAPII_R00_T_C7' },
            { 'f1': 'CAPII_R00_F_C8', 'f2': 'CAPII_R00_F_C2', 'f3': 'CAPII_R00_F_C7' },
            { 'f1': 'CAPII_R01_T_C8', 'f2': 'CAPII_R01_T_C2', 'f3': 'CAPII_R01_T_C7' },
            { 'f1': 'CAPII_R01_F_C8', 'f2': 'CAPII_R01_F_C2', 'f3': 'CAPII_R01_F_C7' }
        ];

        var cap2_5_13_percent_static_row = [
            { 'f1': 'CAPII_R_T_C8', 'f2': 'CAPII_R_T_C2', 'f3': 'CAPII_R_T_C7' },
            { 'f1': 'CAPII_R_F_C8', 'f2': 'CAPII_R_F_C2', 'f3': 'CAPII_R_F_C7' }
        ];

        var cap2_5_13_percent_dynamic = [
            { 'f1': 'CAPII_R00_T_C8_FILIAL', 'f2': 'CAPII_R00_T_C2_FILIAL', 'f3': 'CAPII_R00_T_C7_FILIAL' },
            { 'f1': 'CAPII_R00_F_C8_FILIAL', 'f2': 'CAPII_R00_F_C2_FILIAL', 'f3': 'CAPII_R00_F_C7_FILIAL' },
            { 'f1': 'CAPII_R01_T_C8_FILIAL', 'f2': 'CAPII_R01_T_C2_FILIAL', 'f3': 'CAPII_R01_T_C7_FILIAL' },
            { 'f1': 'CAPII_R01_F_C8_FILIAL', 'f2': 'CAPII_R01_F_C2_FILIAL', 'f3': 'CAPII_R01_F_C7_FILIAL' }
        ];

        var cap2_5_13_percent_dynamic_row = [
            { 'f1': 'CAPII_R_T_C8_FILIAL', 'f2': 'CAPII_R_T_C2_FILIAL', 'f3': 'CAPII_R_T_C7_FILIAL' },
            { 'f1': 'CAPII_R_F_C8_FILIAL', 'f2': 'CAPII_R_F_C2_FILIAL', 'f3': 'CAPII_R_F_C7_FILIAL' }
        ];

        var comparison_fields_c4_c5_static = [
            { 'f1': 'CAPIa_R00_T_C5', 'f2': 'CAPIa_R00_T_C6' },
            { 'f1': 'CAPIa_R01_T_C5', 'f2': 'CAPIa_R01_T_C6' }
        ];

        var comparison_fields_c4_c5_static_row = { 'f1': 'CAPIa_R_T_C5', 'f2': 'CAPIa_R_T_C6' };

        var comparison_fields_c4_c5_dynamic = [
            { 'f1': 'CAPIa_R00_T_C5_FILIAL', 'f2': 'CAPIa_R00_T_C6_FILIAL' },
            { 'f1': 'CAPIa_R01_T_C5_FILIAL', 'f2': 'CAPIa_R01_T_C6_FILIAL' },
        ];

        var comparison_fields_c4_c5_dynamic_row = { 'f1': 'CAPIa_R_T_C5_FILIAL', 'f2': 'CAPIa_R_T_C6_FILIAL' };

        var cap1a_c6_c8_static = [
            { 'f1': 'CAPIa_R00_T_C7', 'f2': 'CAPIa_R00_T_C9' },
            { 'f1': 'CAPIa_R01_T_C7', 'f2': 'CAPIa_R01_T_C9' }
        ];

        var cap1a_c6_c8_static_row = { 'f1': 'CAPIa_R_T_C7', 'f2': 'CAPIa_R_T_C9' };

        var cap1a_c6_c8_dynamic = [
            { 'f1': 'CAPIa_R00_T_C7_FILIAL', 'f2': 'CAPIa_R00_T_C9_FILIAL' },
            { 'f1': 'CAPIa_R01_T_C7_FILIAL', 'f2': 'CAPIa_R01_T_C9_FILIAL' }
        ];

        var cap1a_c6_c8_dynamic_row = { 'f1': 'CAPIa_R_T_C7_FILIAL', 'f2': 'CAPIa_R_T_C9_FILIAL' };

        var cap1a_c7_c9_static = [
            { 'f1': 'CAPIa_R00_T_C8', 'f2': 'CAPIa_R00_T_C10' },
            { 'f1': 'CAPIa_R01_T_C8', 'f2': 'CAPIa_R01_T_C10' }
        ];

        var cap1a_c7_c9_static_row = { 'f1': 'CAPIa_R_T_C8', 'f2': 'CAPIa_R_T_C10' };

        var cap1a_c10_c1_static = { 'f1': 'CAPIa_R00_T_C11', 'f2': 'CAPIa_R00_T_C2' };

        var cap1a_c10_c1_dynamic = { 'f1': 'CAPIa_R00_T_C11_FILIAL', 'f2': 'CAPIa_R00_T_C2_FILIAL', 'f3': 'CAPIa_CUATM_R_INDEX_FILIAL' };

        var cap1a_c7_c9_dynamic = [
            { 'f1': 'CAPIa_R00_T_C8_FILIAL', 'f2': 'CAPIa_R00_T_C10_FILIAL' },
            { 'f1': 'CAPIa_R01_T_C8_FILIAL', 'f2': 'CAPIa_R01_T_C10_FILIAL' }
        ];

        var cap1a_c7_c9_dynamic_row = { 'f1': 'CAPIa_R_T_C8_FILIAL', 'f2': 'CAPIa_R_T_C10_FILIAL' };

        var valid_077_static = [
            { 'f1': 'CAPIa_R00_T_C9', 'f2': 'CAPIa_R00_T_C10', 'f3': 'CAPII_R00_T_C5' },
            { 'f1': 'CAPIa_R01_T_C9', 'f2': 'CAPIa_R01_T_C10', 'f3': 'CAPII_R01_T_C5' }
        ];

        var valid_077_static_row = { 'f1': 'CAPIa_R_T_C9', 'f2': 'CAPIa_R_T_C10', 'f3': 'CAPII_R_T_C5' };

        var valid_077_dynamic = [
            { 'f1': 'CAPIa_R00_T_C9_FILIAL', 'f2': 'CAPIa_R00_T_C10_FILIAL', 'f3': 'CAPII_R00_T_C5_FILIAL' },
            { 'f1': 'CAPIa_R01_T_C9_FILIAL', 'f2': 'CAPIa_R01_T_C10_FILIAL', 'f3': 'CAPII_R01_T_C5_FILIAL' }
        ];
        var valid_077_dynamic_row = { 'f1': 'CAPIa_R_T_C9_FILIAL', 'f2': 'CAPIa_R_T_C10_FILIAL', 'f3': 'CAPII_R_T_C5_FILIAL' };

        var valid_078_static = [
            { 'f1': 'CAPIa_R00_T_C7', 'f2': 'CAPIa_R00_T_C8', 'f3': 'CAPII_R00_T_C2' },
            { 'f1': 'CAPIa_R00_F_C7', 'f2': 'CAPIa_R00_F_C8', 'f3': 'CAPII_R00_F_C2' },
            { 'f1': 'CAPIa_R01_T_C7', 'f2': 'CAPIa_R01_T_C8', 'f3': 'CAPII_R01_T_C2' },
            { 'f1': 'CAPIa_R01_F_C7', 'f2': 'CAPIa_R01_T_C8', 'f3': 'CAPII_R01_F_C2' }
        ];

        var valid_078_static_row = [
            { 'f1': 'CAPIa_R_T_C7', 'f2': 'CAPIa_R_T_C8', 'f3': 'CAPII_R_T_C2' },
            { 'f1': 'CAPIa_R_F_C7', 'f2': 'CAPIa_R_F_C8', 'f3': 'CAPII_R_F_C2' }
        ];

        var valid_078_dynamic = [
            { 'f1': 'CAPIa_R00_T_C7_FILIAL', 'f2': 'CAPIa_R00_T_C8_FILIAL', 'f3': 'CAPII_R00_T_C2_FILIAL' },
            { 'f1': 'CAPIa_R00_F_C7_FILIAL', 'f2': 'CAPIa_R00_F_C8_FILIAL', 'f3': 'CAPII_R00_F_C2_FILIAL' },
            { 'f1': 'CAPIa_R01_T_C7_FILIAL', 'f2': 'CAPIa_R01_T_C8_FILIAL', 'f3': 'CAPII_R01_T_C2_FILIAL' },
            { 'f1': 'CAPIa_R01_F_C7_FILIAL', 'f2': 'CAPIa_R01_F_C8_FILIAL', 'f3': 'CAPII_R01_T_C2_FILIAL' }
        ];

        var valid_078_dynamic_row = [
            { 'f1': 'CAPIa_R_T_C7_FILIAL', 'f2': 'CAPIa_R_T_C8_FILIAL', 'f3': 'CAPII_R_T_C2_FILIAL' },
            { 'f1': 'CAPIa_R_F_C7_FILIAL', 'f2': 'CAPIa_R_F_C8_FILIAL', 'f3': 'CAPII_R_F_C2_FILIAL' }
        ];

        var valid_124_static = [
            { 'f1': 'CAPIa_R00_F_C7', 'f2': 'CAPIa_R00_F_C8', 'f3': 'CAPIa_R00_F_C3' },
            { 'f1': 'CAPIa_R01_F_C7', 'f2': 'CAPIa_R01_F_C8', 'f3': 'CAPIa_R01_F_C3' }
        ];

        var valid_124_static_row = { 'f1': 'CAPIa_R_F_C7', 'f2': 'CAPIa_R_F_C8', 'f3': 'CAPIa_R_F_C3' };

        var valid_124_dynamic = [
            { 'f1': 'CAPIa_R00_F_C7_FILIAL', 'f2': 'CAPIa_R00_F_C8_FILIAL', 'f3': 'CAPIa_R00_F_C3_FILIAL' },
            { 'f1': 'CAPIa_R01_F_C7_FILIAL', 'f2': 'CAPIa_R01_F_C8_FILIAL', 'f3': 'CAPIa_R01_F_C3_FILIAL' }
        ];

        var valid_124_dynamic_row = {
            'f1': 'CAPIa_R_T_C7_FILIAL',
            'f2': 'CAPIa_R_T_C8_FILIAL',
            'f3': 'CAPIa_R_T_C3_FILIAL'
        };

        var info_03138_static = [
            { 't1': 'CAPIa_R00_T_C2', 't2': 'CAPIa_R00_T_C3', 'f1': 'CAPIa_R00_F_C2', 'f2': 'CAPIa_R00_F_C3' },
            { 't1': 'CAPIa_R01_T_C2', 't2': 'CAPIa_R01_T_C3', 'f1': 'CAPIa_R01_F_C2', 'f2': 'CAPIa_R01_F_C3' }
        ];
        var info_03138_dynTable = {
            't1': 'CAPIa_R_T_C2', 't2': 'CAPIa_R_T_C3', 'f1': 'CAPIa_R_F_C2', 'f2': 'CAPIa_R_F_C3',
        };

        validate_rule_03076(caem_equal_fields_static);
        //validate_rule_03109('dec_dynamicTable2_r0_c9t', 'dec_table5_row_r411c1');
        validate_rule_03110('CAPIa_R00_T_C3', 'CAPV_R3_1_1_C1');
        validate_rule_03156(cap1a_c10_c1_static);
        validate_rule_03046('CAPIa_R01_T_C1');
        validate_rule_03046('CAPII_R01_T_C1');
        validate_rule_03114(get_rule_param('03114', 'static'));
        validate_rule_03028();
        //validate_rule_03030();
        validate_rule_03064(get_rule_param('03064', 'static'));
        validate_rule_03064(get_rule_param('03064', 'static2'));
        validate_rule_03155(get_rule_param('03155', 'static')[0]);

        for (var j = 0; j < 2; j++) {
            validate_rule_03124(valid_124_static[j]);
            validate_rule_03081(get_rule_param('03081', 'static')[j]);
            validate_rule_03082(col1a_c4_c7_static[j]);
            validate_rule_03003(get_rule_param('03003', 'static')[j]);
            validate_rule_03004(get_rule_param('03004', 'static')[j]);
            validate_rule_03005(cap1a_c6_c8_static[j]);
            validate_rule_03006(cap1a_c7_c9_static[j]);
            validate_rule_03113(comparison_fields_c4_c5_static[j]);
            validate_rule_03011(comparison_fields_c2_c3_static[j]);
            validate_rule_03077(valid_077_static[j]);
            validate_rule_03138(info_03138_static[j]);
            validate_rule_03085(get_rule_param('03085', 'static')[j]);
            validate_rule_03105(get_rule_param('03105', 'static')[j]);
            validate_rule_03106(get_rule_param('03106', 'static')[j]);
            validate_rule_03127(get_rule_param('03127', 'static')[j]);
            validate_rule_03144(get_rule_param('03144', 'static')[j]);
            validate_rule_03137(get_rule_param('03137', 'static')[j]);
            validate_rule_03137(get_rule_param('03137', 'static2')[j]);
            validate_rule_03083(get_rule_param('03083', 'static')[j]);
        }

        for (var j = 0; j < 4; j++) {
            validate_rule_03123(cap1a_c1_c2_static[j]);
            validate_rule_03078(valid_078_static[j]);
            //validate_rule_03001(cap1a_c1_c2_static[j]);
            validate_rule_03013(get_rule_param('03013', 'static')[j]);
            //validate_rule_03014(cap2_c1_c7_static[j]);
            validate_rule_03015(cap2_5_13_percent_static[j]);
            //validate_rule_03128(cap2_c1_c9_static[j]);
            validate_rule_03084(get_rule_param('03084', 'static')[j]);
            validate_rule_03084(get_rule_param('03084', 'static2')[j]);
        }


        var total = values.CAPIa_R_INDEX.length;
        for (var i = 0; i < total; i++) {
            validate_rule_03124(valid_124_static_row, i);
            validate_rule_03082(col1a_c4_c7_static_row, i);
            validate_rule_03077(valid_077_static_row, i);
            validate_rule_03113(comparison_fields_c4_c5_static_row, i);
            validate_rule_03076(caem_equal_fields_static_row, i);
            validate_rule_03003(get_rule_param('03003', 'dynamic_row'), i);
            validate_rule_03004(get_rule_param('03004', 'dynamic_row'), i);
            validate_rule_03005(cap1a_c6_c8_static_row, i);
            validate_rule_03006(cap1a_c7_c9_static_row, i);
            validate_rule_03138(info_03138_dynTable, i);
            validate_rule_03046('CAPIa_R_T_C1', i);
            validate_rule_03085(get_rule_param('03085', 'dynamic_row'), i);
            validate_rule_03105(get_rule_param('03105', 'dynamic_row'), i);
            validate_rule_03106(get_rule_param('03106', 'dynamic_row'), i);
            validate_rule_03127(get_rule_param('03127', 'dynamic_row'), i);
            validate_rule_03144(get_rule_param('03144', 'dynamic_row'), i);
            validate_rule_03137(get_rule_param('03137', 'dynamic_row'), i);
            validate_rule_03083(get_rule_param('03083', 'dynamic_row'), i);
            validate_rule_03081(get_rule_param('03081', 'dynamic_row'), i);

            for (var j = 0; j < 2; j++) {
                validate_rule_03123(cap1a_c1_c2_static_row[j], i);
                validate_rule_03078(valid_078_static_row[j], i);
                ///validate_rule_03001(cap1a_c1_c2_static_row[j], i);
                validate_rule_03084(get_rule_param('03084', 'dynamic_row')[j], i);
            }
        }


        var total = values.CAPIa_CUATM_R_INDEX_FILIAL.length;
        for (var i = 0; i < total; i++) {
            validate_rule_03076(caem_equal_fields_dynamic, i);
            validate_rule_03046('CAPIa_R_T_C1_FILIAL', i);
            validate_rule_03064(get_rule_param('03064', 'dynamic_section'), i);

            for (var j = 0; j < 2; j++) {
                validate_rule_03124(valid_124_dynamic[j], i);
                validate_rule_03082(col1a_c4_c7_dynamic[j], i);
                validate_rule_03077(valid_077_dynamic[j], i);
                validate_rule_03003(get_rule_param('03003', 'dynamic_section')[j], i);
                validate_rule_03004(get_rule_param('03004', 'dynamic_section')[j], i);
                validate_rule_03005(cap1a_c6_c8_dynamic[j], i);
                validate_rule_03006(cap1a_c7_c9_dynamic[j], i);
                validate_rule_03113(comparison_fields_c4_c5_dynamic[j], i);
                validate_rule_03085(get_rule_param('03085', 'dynamic_section')[j], i);
                validate_rule_03105(get_rule_param('03105', 'dynamic_section')[j], i);
                validate_rule_03106(get_rule_param('03106', 'dynamic_section')[j], i);
                validate_rule_03127(get_rule_param('03127', 'dynamic_section')[j], i);
                validate_rule_03144(get_rule_param('03144', 'dynamic_section')[j], i);
                validate_rule_03137(get_rule_param('03137', 'dynamic_section')[j], i);
                validate_rule_03083(get_rule_param('03083', 'dynamic_section')[j], i);
                validate_rule_03081(get_rule_param('03081', 'dynamic_section')[j], i);
            }

            for (var j = 0; j < 4; j++) {
                validate_rule_03123(cap1a_c1_c2_dynamic[j], i);
                validate_rule_03078(valid_078_dynamic[j], i);
                //validate_rule_03001(cap1a_c1_c2_dynamic[j], i);
            }

            var clonable_total = values.CAPIa_R_INDEX_FILIAL[i].length;
            for (var k = 0; k < clonable_total; k++) {
                validate_rule_03156(cap1a_c10_c1_dynamic);
                validate_rule_03124(valid_124_dynamic_row, k, i);
                validate_rule_03082(col1a_c4_c7_dynamic_row, k, i);
                validate_rule_03077(valid_077_dynamic_row, k, i);
                validate_rule_03003(get_rule_param('03003', 'dynamic_section_row'), k, i);
                validate_rule_03004(get_rule_param('03004', 'dynamic_section_row'), k, i);
                validate_rule_03005(cap1a_c6_c8_dynamic_row, k, i);
                validate_rule_03006(cap1a_c7_c9_dynamic_row, k, i);
                validate_rule_03113(comparison_fields_c4_c5_dynamic_row, k, i);
                validate_rule_03076(caem_equal_fields_dynamic_row, k, i);
                validate_rule_03046('CAPIa_R_T_C1_FILIAL', k, i);
                validate_rule_03085(get_rule_param('03085', 'dynamic_section_row'), k, i);
                validate_rule_03105(get_rule_param('03105', 'dynamic_section_row'), k, i);
                validate_rule_03106(get_rule_param('03106', 'dynamic_section_row'), k, i);
                validate_rule_03127(get_rule_param('03127', 'dynamic_section_row'), k, i);
                validate_rule_03144(get_rule_param('03144', 'dynamic_section_row'), k, i);
                validate_rule_03137(get_rule_param('03137', 'dynamic_section_row'), k, i);
                validate_rule_03083(get_rule_param('03083', 'dynamic_section_row'), k, i);
                validate_rule_03081(get_rule_param('03081', 'dynamic_section_row'), k, i);

                for (var j = 0; j < 2; j++) {
                    validate_rule_03123(cap1a_c1_c2_dynamic_row[j], k, i);
                    validate_rule_03078(valid_078_dynamic_row[j], k, i);
                    //validate_rule_03001(cap1a_c1_c2_dynamic_row[j], k, i);
                }
            }
        }

        var total = values.CAPII_R_INDEX.length;
        for (var i = 0; i < total; i++) {
            validate_rule_03011(comparison_fields_c2_c3_static_row, i);
            validate_rule_03046('CAPII_R_T_C1', i);
            validate_rule_03137(get_rule_param('03137', 'dynamic2_row'), i);

            for (var j = 0; j < 2; j++) {
                //validate_rule_03128(cap2_c1_c9_static_row[j], i);
                validate_rule_03013(get_rule_param('03013', 'dynamic_row')[j], i);
                //validate_rule_03014(cap2_c1_c7_static_row[j], i);
                validate_rule_03015(cap2_5_13_percent_static_row[j], i);
                validate_rule_03084(get_rule_param('03084', 'dynamic2_row')[j], i);
            }
        }

        var total = values.CAPII_CUATM_R_INDEX_FILIAL.length;
        for (var i = 0; i < total; i++) {
            validate_rule_03046('CAPII_R01_T_C1_FILIAL', i);
            validate_rule_03114(get_rule_param('03114', 'dynamic_section'), i);
            validate_rule_03064(get_rule_param('03064', 'dynamic_section2'), i);

            for (var j = 0; j < 2; j++) {
                validate_rule_03011(comparison_fields_c2_c3_dynamic[j], i);
                validate_rule_03137(get_rule_param('03137', 'dynamic_section2')[j], i);
            }

            for (var j = 0; j < 4; j++) {
                //validate_rule_03128(cap2_c1_c9_dynamic[j], i);
                validate_rule_03013(get_rule_param('03013', 'dynamic_section')[j], i);
                //validate_rule_03014(cap2_c1_c7_dynamic[j], i);
                validate_rule_03015(cap2_5_13_percent_dynamic[j], i);
            }

            var clonable_total = values.CAPII_R_INDEX_FILIAL[i].length;
            for (var k = 0; k < clonable_total; k++) {
                validate_rule_03011(comparison_fields_c2_c3_dynamic_row, k, i);
                validate_rule_03046('CAPII_R_T_C1_FILIAL', k, i);
                validate_rule_03137(get_rule_param('03137', 'dynamic_section2_row'), k, i);

                for (var j = 0; j < 2; j++) {
                    //validate_rule_03128(cap2_c1_c9_dynamic_row[j], k, i);
                    validate_rule_03013(get_rule_param('03013', 'dynamic_section_row')[j], k, i);
                    //validate_rule_03014(cap2_c1_c7_dynamic_row[j], k, i);
                    validate_rule_03015(cap2_5_13_percent_dynamic_row[j], i);
                }
            }
        }

        validate_rule_03147('CAPIa_CUATM_R_FILIAL');

        // Sort warnings
        webform.warnings.sort(function (a, b) {
            return sort_errors_warinings(a, b);
        });

        // Sort errors
        webform.errors.sort(function (a, b) {
            return sort_errors_warinings(a, b);
        });

        // Mark this validator as done and call validation to check the next validator.
        webform.validatorsStatus.validate_m3 = 1;
        validateWebform();
    };

    function get_caem() {
        return Drupal.settings.mywebform.values.CAEM;
    }

    function get_field_value(fieldName, index, parentIndex) {
        var value = Drupal.settings.mywebform.values[fieldName];

        if (typeof parentIndex !== 'undefined') {
            value = typeof value[parentIndex] == 'undefined' ? [] : value[parentIndex];
        }

        if (typeof index !== 'undefined') {
            value = typeof value[index] == 'undefined' ? '' : value[index];
        }

        return value;
    }

    function field_exists(fieldName, index, parentIndex) {
        var value = Drupal.settings.mywebform.values[fieldName];

        if (typeof parentIndex !== 'undefined') {
            if (typeof value[parentIndex] == 'undefined') {
                return false;
            }
            value = value[parentIndex];
        }

        if (typeof index !== 'undefined') {
            if (typeof value[index] == 'undefined') {
                return false;
            }
        }

        return true;
    }

    function validate_rule_03001(fieldsInfo, index, parentIndex) {
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);

        if (toFloat(f1) < toFloat(f2)) {
            var msg = Drupal.t('Cap. I.a., Rândul @row, Col1 >= Rândul @row, Col2, pentru fiecare rând', {
                '@row': getRowFromFieldName(fieldsInfo.f1, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f1,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 1,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-001', msg, fieldsInfo.f1, index, parentIndex)
            });
        }
    }

    function validate_rule_03005(fieldsInfo, index, parentIndex) {
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);

        if (toFloat(f1) < toFloat(f2)) {
            var msg = Drupal.t('Cap. I., Rândul @row, Col.8 <= Rândul @row, Col.6, pentru rândurile TOTAL', {
                '@row': getRowFromFieldName(fieldsInfo.f2, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f2,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 5,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-005', msg, fieldsInfo.f2, index, parentIndex)
            });
        }
    }

    function validate_rule_03006(fieldsInfo, index, parentIndex) {
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);

        if (toFloat(f1) < toFloat(f2)) {
            var msg = Drupal.t('Cap. I., Rândul @row, Col.9 <= Rândul @row, Col.7, pentru rândurile TOTAL', {
                '@row': getRowFromFieldName(fieldsInfo.f2, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f2,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 6,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-006', msg, fieldsInfo.f2, index, parentIndex)
            });
        }
    }

    function validate_rule_03011(fieldsInfo, index, parentIndex) {
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);

        if (f1 !== '' && f2 !== '' && toFloat(f1) >= toFloat(f2)) {
            var msg = Drupal.t('Cap II., Rândul @row, Col3 < Rândul @row, Col2, pentru rândurile Total', {
                '@row': getRowFromFieldName(fieldsInfo.f1, index)
            });
            webform.errors.push({
                'fieldName': fieldsInfo.f1,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 11,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-011', msg, fieldsInfo.f1, index, parentIndex)
            });
        }
    }

    function validate_rule_03013(fieldsInfo, index, parentIndex) {
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);
        var rez = toFloat((toFloat(f2) * 100) / toFloat(f1));
        var matches = fieldsInfo.f1.match(/([T|F])+_C(\d)/);
        var rowIsFilled = false;

        var cols = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        if (matches) {
            if (matches[1] == 'F') {
                cols = [2, 7, 8];
            }

            for (var k = 0; k < cols.length; k++) {
                var col = cols[k];
                var field = fieldsInfo.f1.replace(matches[1] + '_C' + matches[2], matches[1] + '_C' + col);
                var field_val = get_field_value(field, index, parentIndex);

                if (field_val != '' || field_val != 'undefined') {
                    rowIsFilled = true;
                    break;
                }
            }
        }

        if (rowIsFilled && (rez < 8 || rez > 10)) {
            var msg = Drupal.t('Cap II., Rândul @row, Col6 * 100 / Rândul @row, Col1 trebuie să fie în intervalul [8%-10%], (@result)', {
                '@row': getRowFromFieldName(fieldsInfo.f2, index),
                '@result': formatNumber(rez, 2)
            });

            webform.warnings.push({
                'fieldName': fieldsInfo.f2,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 13,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-013', msg, fieldsInfo.f2, index, parentIndex)
            });
        }
    }

    function validate_rule_03014(fieldsInfo, index, parentIndex) {
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);
        var rez = toFloat((toFloat(f2) * 100) / toFloat(f1));
        var matches = fieldsInfo.f1.match(/([T|F])+_C(\d)/);
        var rowIsFilled = false;

        var cols = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        if (matches) {
            if (matches[2] == 'f') {
                cols = [2, 7, 8];
            }

            for (var k = 0; k < cols.length; k++) {
                var col = cols[k];
                var field = fieldsInfo.f1.replace(matches[1] + '_C' + matches[2], matches[1] + '_C' + col);
                var field_val = get_field_value(field, index, parentIndex);

                if (field_val != '') {
                    rowIsFilled = true;
                    break;
                }
            }
        }

        if (rowIsFilled && (rez < 4 || rez > 5)) {
            var msg = Drupal.t('Cap II., Rândul @row, Col7 * 100/ Rândul @row, Col1 trebuie să fie în intervalul [4%-5%], (@result)', {
                '@row': getRowFromFieldName(fieldsInfo.f2, index),
                '@result': formatNumber(rez, 2)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f2,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 14,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-014', msg, fieldsInfo.f2, index, parentIndex)
            });
        }
    }

    function validate_rule_03015(fieldsInfo, index, parentIndex) {
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);
        var f3 = get_field_value(fieldsInfo.f3, index, parentIndex);
        //var f4 = get_field_value(fieldsInfo.f4, index, parentIndex);
        var rez = toFloat((toFloat(f1) * 100) / (toFloat(f2) - toFloat(f3)));
        var matches = fieldsInfo.f1.match(/([T|F])+_C(\d)/);
        var rowIsFilled = false;

        var cols = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        if (matches) {
            if (matches[2] == 'F') {
                cols = [2, 7, 8];
            }

            for (var k = 0; k < cols.length; k++) {
                var col = cols[k];
                var field = fieldsInfo.f1.replace(matches[1] + '_C' + matches[2], matches[1] + '_C' + col);
                var field_val = get_field_value(field, index, parentIndex);

                if (field_val != '' || field_val != 'undefined') {
                    rowIsFilled = true;
                    break;
                }
            }
        }

        if (rowIsFilled && (rez < 1 || rez > 13) || rez == 'Infinity') {
            var msg = Drupal.t('Cap II., Rândul @row, Col7 * 100 / Rândul @row, (Col1-Col6) trebuie să fie în intervalul [1%-13%], (@result)', {
                '@row': getRowFromFieldName(fieldsInfo.f1, index),
                '@result': formatNumber(rez, 2)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f1,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 15,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-015', msg, fieldsInfo.f1, index, parentIndex)
            });
        }
    }

    function validate_rule_03076(fieldsInfo, index, parentIndex) {
        var values = Drupal.settings.mywebform.values;
        var msg = Drupal.t('Cap. I.a., CAEM = Cap. II., CAEM, pentru toate Rând');
        var f1 = (values[fieldsInfo.col1a].length > 0) ? get_field_value(fieldsInfo.col1a, index, parentIndex) : false;
        var f2 = (values[fieldsInfo.col2].length > 0) ? get_field_value(fieldsInfo.col2, index, parentIndex) : false;

        if (f1 && f2 && f1 != f2) {
            webform.errors.push({
                'fieldName': fieldsInfo.col2,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 16,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-076', msg, fieldsInfo.col2, index, parentIndex)
            });
        }
    }

    function validate_rule_03077(fieldsInfo, index, parentIndex) {
        var values = Drupal.settings.mywebform.values;
        var f1 = toFloat(get_field_value(fieldsInfo.f1, index, parentIndex));
        var f2 = toFloat(get_field_value(fieldsInfo.f2, index, parentIndex));
        var f3 = toFloat(get_field_value(fieldsInfo.f3, index, parentIndex));

        if ((f1 || f2) && (field_exists(fieldsInfo.f3, index, parentIndex) && !f3)) {
            var msg = Drupal.t('Daca este Rândul @row, Col.8 sau Col.9 Cap. I., atunci trebuie sa fie Rândul @row, Col.4 Cap II. si invers, pentru fiecare rând', {
                '@row': getRowFromFieldName(fieldsInfo.f3, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f3,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 77,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-077', msg, fieldsInfo.f3, index, parentIndex)
            });
        } else if (!f1 && !f2 && field_exists(fieldsInfo.f3, index, parentIndex) && f3) {
            var msg = Drupal.t('Daca este Rândul @row, Col.8 sau Col.9 Cap. I., atunci trebuie sa fie Rândul @row, Col.4 Cap II. si invers, pentru fiecare rând', {
                '@row': getRowFromFieldName(fieldsInfo.f1, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f1,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 77,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-077', msg, fieldsInfo.f1, index, parentIndex)
            });
        }
    }

    function validate_rule_03078(fieldsInfo, index, parentIndex) {
        var values = Drupal.settings.mywebform.values;
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);
        var f3 = get_field_value(fieldsInfo.f3, index, parentIndex);

        if ((f1 || f2) && (field_exists(fieldsInfo.f3, index, parentIndex) && !f3)) {
            var msg = Drupal.t('Daca este Rândul @row, Col.6 sau Col. 7 Cap. I., atunci trebuie sa fie Rândul @row, Col.1 Cap II. si invers, pentru fiecare rând', {
                '@row': getRowFromFieldName(fieldsInfo.f3, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f3,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 78,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-078', msg, fieldsInfo.f3, index, parentIndex)
            });
        } else if (!f1 && !f2 && f3 && field_exists(fieldsInfo.f1, index, parentIndex)) {
            var msg = Drupal.t('Daca este Rândul @row, Col.6 sau Col. 7 Cap. I., atunci trebuie sa fie Rândul @row, Col.1 Cap II. si invers, pentru fiecare rând', {
                '@row': getRowFromFieldName(fieldsInfo.f1, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f1,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 78,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-078', msg, fieldsInfo.f1, index, parentIndex)
            });
        }
    }

    function validate_rule_03081(fieldsInfo, index, parentIndex) {
        var f1 = toFloat(get_field_value(fieldsInfo.f1, index, parentIndex));
        var f2 = toFloat(get_field_value(fieldsInfo.f2, index, parentIndex));

        if (toFloat(f1) > 0 && !toFloat(f2)) {
            var msg = Drupal.t('Cap. I., Daca în Rândul @row, Col.3 > 0 atunci si Rândul @row, Col.6 > 0 pe rândurile Total, și invers', {
                '@row': getRowFromFieldName(fieldsInfo.f2, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f2,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 81,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-081', msg, fieldsInfo.f2, index, parentIndex)
            });
        } else if (toFloat(f2) > 0 && !toFloat(f1)) {
            var msg = Drupal.t('Cap. I., Daca în Rândul @row, Col.6 > 0 atunci si Rândul @row, Col.3 > 0 pe rândurile Total, și invers', {
                '@row': getRowFromFieldName(fieldsInfo.f1, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f1,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 81,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-081', msg, fieldsInfo.f1, index, parentIndex)
            });
        }
    }

    function validate_rule_03082(fieldsInfo, index, parentIndex) {
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);

        if (f1 && !f2) {
            var msg = Drupal.t('Cap. I., Daca în Rândul @row, Col.4 > 0 atunci si Rândul @row, Col.7 > 0 pe rândurile Total, si invers', {
                '@row': getRowFromFieldName(fieldsInfo.f2, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f2,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 82,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-082', msg, fieldsInfo.f2, index, parentIndex)
            });
        } else if (!f1 && f2) {
            var msg = Drupal.t('Cap. I., Daca în Rândul @row, Col.4 > 0 atunci si Rândul @row, Col.7 > 0 pe rândurile Total, si invers', {
                '@row': getRowFromFieldName(fieldsInfo.f1, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f1,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 82,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-082', msg, fieldsInfo.f1, index, parentIndex)
            });
        }
    }

    function validate_rule_03113(fieldsInfo, index, parentIndex) {
        var values = Drupal.settings.mywebform.values;
        var msg = Drupal.t('Dacă este completat Cap.I., Rândul @row, "Total salariați", Col. 4, atunci trebuie să fie completat și Cap.I., Rândul @row, "Total salariați", Col. 5, și invers.', {
            '@row': getRowFromFieldName(fieldsInfo.f2, index)
        });

        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);

        if ((f1 != 0 && f2 == 0) || (f1 == 0 && f2 != 0)) {
            webform.errors.push({
                'fieldName': fieldsInfo.f2,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 113,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-113', msg, fieldsInfo.f2, index, parentIndex)
            });
        }
    }

    function validate_rule_03083(param, index, parentIndex) {
        var values = Drupal.settings.mywebform.values;
        var msg = Drupal.t('Valoarea din Cap. I., Rândul @row, "Total salariați", Col.4, trebuie sa fie mai mare decât valoarea din Col.5 (pe același rând).', {
            '@row': getRowFromFieldName(param.f1, index)
        });
        var f1 = get_field_value(param.f1, index, parentIndex);
        var f2 = get_field_value(param.f2, index, parentIndex);
        if (toFloat(f1) <= toFloat(f2) && toFloat(f2)) {
            webform.errors.push({
                'fieldName': param.f1,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 83,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-083', msg, param.f1, index, parentIndex)
            });
        }
    }

    function validate_rule_03123(fieldsInfo, index, parentIndex) {
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);

        if (f1 && !f2) {
            var msg = Drupal.t('Daca este Rândul @row, col. 1, Cap. I., atunci trebuie sa fie Rândul @row, col. 2 si invers, pentru fiecare rând', {
                '@row': getRowFromFieldName(fieldsInfo.f2, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f2,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 123,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-123', msg, fieldsInfo.f2, index, parentIndex)
            });
        } else if (!f1 && f2) {
            var msg = Drupal.t('Daca este Rândul @row, col. 1, Cap. I., atunci trebuie sa fie Rândul @row, col. 2 si invers, pentru fiecare rând', {
                '@row': getRowFromFieldName(fieldsInfo.f1, index)
            });
            webform.warnings.push({
                'fieldName': fieldsInfo.f1,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 123,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-123', msg, fieldsInfo.f1, index, parentIndex)
            });
        }
    }

    function validate_rule_03124(fieldsInfo, index, parentIndex) {
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);
        var f3 = get_field_value(fieldsInfo.f3, index, parentIndex);
        var rez = (((toFloat(f1) + toFloat(f2)) / toFloat(f3)) * 1000).toFixed(1);
        var msg = Drupal.t('Cap. I., Rândul @row, ((Col6 + Col7) / Col2) * 1000 trebuie să fie în intervalul [1500-2300] pentru Rândul Femei, (@result)', {
            '@row': getRowFromFieldName(fieldsInfo.f1, index),
            '@result': formatNumber(rez, 2)
        });
        if (rez < 1500 || rez > 2300) {
            webform.warnings.push({
                'fieldName': '',
                'index': index,
                'parentIndex': parentIndex,
                'weight': 124,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-124', msg, fieldsInfo.f1, index, parentIndex)
            });
        }
    }

    function validate_rule_03128(fieldsInfo, index, parentIndex) {
        var f1 = get_field_value(fieldsInfo.f1, index, parentIndex);
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);
        var result = formatNumber(toFloat(f2) / toFloat(f1) * 100, 1);
        var msg = Drupal.t('Cap.II, Rândul @row, "@row_type", Suma calculată salariaților din bugetul asigurărilor sociale de stat, nu poate depăși 14%, (@result).', {
            '@row': getRowFromFieldName(fieldsInfo.f2, index),
            '@row_type': getRowTypeFromFieldName(fieldsInfo.f2),
            '@result': formatNumber(result, 2)
        });

        if (f1 && f2 && result > 14) {
            webform.warnings.push({
                'fieldName': fieldsInfo.f2,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 128,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-128', msg, fieldsInfo.f2, index, parentIndex)
            });
        }
    }

    function validate_rule_03137(param, index, parentIndex) {
        for (var k = 0; k < param.cols.length; k++) {
            var i = param.cols[k];
            var f1 = param.fieldTemplate.replace('_COL_', i).replace('_TYPE_', 'T');
            var f2 = param.fieldTemplate.replace('_COL_', i).replace('_TYPE_', 'F');
            var f1_val = get_field_value(f1, index, parentIndex);
            var f2_val = get_field_value(f2, index, parentIndex);
            var msg = Drupal.t('Cap. @table, Rândul @row, Total, col. @col >= Rândul @row, Femei, col. @col', {
                '@table': param.table,
                '@row': getRowFromFieldName(f1, index),
                '@col': i - 1
            });

            if (toFloat(f1_val) < toFloat(f2_val)) {
                webform.errors.push({
                    'fieldName': f1,
                    'index': index,
                    'parentIndex': parentIndex,
                    'weight': 137,
                    'options': {
                        'hide_title': true
                    },
                    'msg': generateMessageTitle('03-137', msg, f1, index, parentIndex)
                });
            }
        }
    }

    function validate_rule_03003(param, index, parentIndex) {
        var f1 = toFloat(get_field_value(param.f1, index, parentIndex));
        var f2 = toFloat(get_field_value(param.f2, index, parentIndex));

        if (f2) {
            var result = f1 * 1000 / f2;
            var msg = Drupal.t('Cap. I., Rândul @row, Col6 * 1000 / Rândul @row, Col3 trebuie să fie în intervalul [1500-2300], (@result)', {
                '@row': getRowFromFieldName(param.f1, index),
                '@result': formatNumber(result, 2)
            });
            if (result < 1500 || result > 2300) {
                webform.warnings.push({
                    'fieldName': '',
                    'index': 0,
                    'weight': 3,
                    'options': {
                        'hide_title': true
                    },
                    'msg': generateMessageTitle('03-003', msg, param.f1, index, parentIndex)
                });
            }
        }
    }

    function validate_rule_03004(param, index, parentIndex) {
        var f1 = toFloat(get_field_value(param.f1, index, parentIndex));
        var f2 = toFloat(get_field_value(param.f2, index, parentIndex));

        if (f2) {
            var result = toFloat(f1 * 1000 / f2);
            var msg = Drupal.t('Cap. I., Rândul @row, Col7 * 1000 / Rândul @row, Col5 trebuie să fie în intervalul [1500-2300], (@result)', {
                '@row': getRowFromFieldName(param.f1, index),
                '@result': formatNumber(result, 2)
            });
            if (result < 1500 || result > 2300) {
                webform.warnings.push({
                    'fieldName': '',
                    'index': 0,
                    'weight': 4,
                    'options': {
                        'hide_title': true
                    },
                    'msg': generateMessageTitle('03-004', msg, param.f1, index, parentIndex)
                });
            }
        }
    }

    function validate_rule_03109(field1, field2) {
        var f1 = toFloat(get_field_value(field1));
        var f2 = toFloat(get_field_value(field2));

        var msg = Drupal.t('Cap.II rd.00-T COL9 > 0 atunci Cap.V rd.4.1.1 COL1 > 0 si invers');
        if (f1 > 0 && !f2) {
            webform.warnings.push({
                'fieldName': field2,
                'index': 0,
                'weight': 109,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-109', msg, field2)
            });
        } else if (f2 > 0 && !f1) {
            webform.warnings.push({
                'fieldName': field1,
                'index': 0,
                'weight': 109,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-109', msg, field1)
            });
        }
    }

    function validate_rule_03110(field1, field2) {
        var f1 = toFloat(get_field_value(field1));
        var f2 = toFloat(get_field_value(field2));
        var msg = Drupal.t('Cap. I rd.00-T Col.2 >= 70 atunci Cap.V rd.3.1.1 Col.1 > 0');

        if (f1 >= 70 && !f2) {
            webform.warnings.push({
                'fieldName': field2,
                'index': 0,
                'weight': 110,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-110', msg, field2)
            });
        }
    }

    function validate_rule_03156(fieldsInfo, index, parentIndex) {
        var f1 = toFloat(get_field_value(fieldsInfo.f1, index, parentIndex));
        var f2 = get_field_value(fieldsInfo.f2, index, parentIndex);
        var f3 = get_field_value(fieldsInfo.f3, index, parentIndex);
        var msg = Drupal.t('Cap. I rd.00-T Col.10 <= Col.1');
        if (toFloat(f1) > toFloat(f2)) {
            webform.warnings.push({
                'fieldName': '',
                'index': index,
                'parentIndex': parentIndex,
                'weight': 156,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-156', msg, fieldsInfo.f1, index, parentIndex)
            });
        }
    }

    function validate_rule_03138(fieldsInfo, index, parentIndex) {
        var t1 = toFloat(get_field_value(fieldsInfo.t1, index, parentIndex));
        var t2 = toFloat(get_field_value(fieldsInfo.t2, index, parentIndex));
        var f1 = toFloat(get_field_value(fieldsInfo.f1, index, parentIndex));
        var f2 = toFloat(get_field_value(fieldsInfo.f2, index, parentIndex));
        var tres = Math.abs(t1 - t2);
        var fres = Math.abs(f1 - f2);
        var msg = Drupal.t('Cap. I., Rândul @row, Total, col. 1 - col. 2 >= Rândul @row, Femei, col. 1 - col. 2, (@tres ; @fres)', {
            '@row': getRowFromFieldName(fieldsInfo.t1, index),
            '@tres': formatNumber(tres, 2),
            '@fres': formatNumber(fres, 2)
        });

        if (tres < fres) {
            webform.warnings.push({
                'fieldName': '',
                'index': 0,
                'weight': 138,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-138', msg, fieldsInfo.t1, index, parentIndex)
            });
        }
    }

    function validate_rule_03147(cuatmField) {
        var values = Drupal.settings.mywebform.values[cuatmField];

        var locations = {};
        var codes_statistic = {};
        for (var i in cuatm_munca3) {
            locations['key_' + cuatm_munca3[i].code] = String(cuatm_munca3[i].code);
            codes_statistic['key_' + cuatm_munca3[i].code] = String(cuatm_munca3[i].cod_statistic).substr(0, 2);
        }

        var regions = [];
        var statistics = [];
        for (var i = 0; i < values.length; i++) {
            var value = String(values[i]);
            var location = locations['key_' + value];
            var statistic_code = codes_statistic['key_' + value];
            regions.push(location);
            statistics.push(statistic_code);
        }

        var duplicates = [];
        for (var i = 0; i < regions.length; i++) {
            var value = String(regions[i]);
            var index = regions.indexOf(value);
            if (index != -1 && index != i) {
                duplicates.push(index);
            }
        }

        for (var i = 0; i < statistics.length; i++) {
            var value = String(statistics[i]);
            var index = statistics.indexOf(value);
            if (index != -1 && index != i) {
                duplicates.push(index);
            }
        }

        for (var i = 0; i < duplicates.length; i++) {
            var key = duplicates[i];
            webform.errors.push({
                'fieldName': cuatmField,
                'index': key,
                'weight': 147,
                'options': {
                    'hide_title': true
                },
                'msg': Drupal.t('Cod eroare: 03-147 - Cap I.a, Cap II. Nr @table. În tabelele adăugătoare, raionul nu trebuie să fie dublat.', { '@table': key + 1 }),
            });
        }
    }

    function validate_rule_03046(field, index, parentIndex) {
        var row = '1';
        if (typeof index !== 'undefined') {
            row = Number(index) + 2;
        }

        var msg = Drupal.t('Dacă sunt date în rândul @row, atunci în coloana "C" trebuie să fie indicat codul CAEM corespunzător.', {
            '@row': row,
        });

        var val = get_field_value(field, index, parentIndex);
        var rowIsFilled = false;

        for (var i = 2; i <= 11; i++) {
            var fieldNameT = field.replace('_C1', '_C' + i);
            var fieldNameF = field.replace('_T_C1', '_F_' + 'C' + i);
            var f_val = '';
            var t_val = '';

            if (Drupal.settings.mywebform.values.hasOwnProperty(fieldNameT)) {
                t_val = get_field_value(fieldNameT, index, parentIndex);
            }

            if (Drupal.settings.mywebform.values.hasOwnProperty(fieldNameF)) {
                f_val = get_field_value(fieldNameF, index, parentIndex);
            }

            if (f_val != '' || t_val != '') {
                rowIsFilled = true;
                break;
            }
        }

        if (rowIsFilled && !val) {
            webform.errors.push({
                'fieldName': field,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 46,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-046', msg, field, index, parentIndex)
            });
        }
    }

    function validate_rule_03084(param, index) {
        var cols;
        if (param.table == 'II.') {
            cols = param.cols || [2, 3, 4, 5, 6, 7, 8];
        }
        else {
            cols = param.cols || [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        }

        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            var result_field = param.result_field.replace('_COL_', col);
            var field = param.field.replace('_COL_', col);
            var total = get_field_value(result_field, index);
            var result = validation_rule_03084_get_result(field, index, param);
            var msg = Drupal.t('Valoarea din @table (tab. de bază), Rândul @row, Col.@col, trebuie să fie egală cu suma valorilor similare pentru fiecare activitate (pe tabelele adaugătoare), (@result).', {
                '@table': param.table,
                '@row': getRowFromFieldName(param.result_field, index),
                '@col': col - 1,
                '@result': formatNumber(result.result, 2)
            });

            if (result.exists && formatNumber(total, 1) != formatNumber(result.result, 1) || result.diferent_caem) {
                webform.errors.push({
                    'fieldName': result_field,
                    'index': index,
                    'weight': 84,
                    'options': {
                        'hide_title': true
                    },
                    'msg': generateMessageTitle('03-084', msg, result_field, index),
                });
            }
        }
    }

    function validation_rule_03084_get_result(field, index, param) {
        var result = {
            'exists': false,
            'result': 0,
            'diferent_caem': false
        };

        var value = Drupal.settings.mywebform.values[field];
        var total = Drupal.settings.mywebform.values[field].length;
        var basic_caem = typeof param.basic_caem == 'undefined' ? '' : get_field_value(param.basic_caem, index);
        if (typeof index == 'undefined') {
            for (var i = 0; i < total; i++) {
                var caem = typeof param.caem_field == 'undefined' ? '' : get_field_value(param.caem_field, i);
                if (caem == basic_caem) {
                    result.exists = true;
                    result.result += toFloat(get_field_value(field, i));
                } else if (caem != basic_caem && value[i][index]) {
                    result.diferent_caem = true;
                }
            }
        } else {
            for (var i = 0; i < total; i++) {
                var caem = get_field_value(param.caem_field, index, i);
                if (caem == basic_caem) {
                    result.exists = true;
                    result.result += toFloat(get_field_value(field, index, i));
                } else if (caem != basic_caem && value[i][index]) {
                    result.diferent_caem = true;
                }
            }
        }

        return result;
    }

    function validate_rule_03085(param, index, parentIndex) {
        if (field_exists(param.t1, index, parentIndex) && field_exists(param.t2, index, parentIndex)) {
            var t1_val = toFloat(get_field_value(param.t1, index, parentIndex));
            var t2_val = toFloat(get_field_value(param.t2, index, parentIndex));
            var result = (t2_val * 1000 / t1_val) / 12;
            var msg = Drupal.t('Cap. II., Rândul @row, col. 1F * 1000 / Cap. I., Rândul @row, Col.2F / 12 => 2935 < 20000, pentru fiecare rând Femei, (@result)', {
                '@row': getRowFromFieldName(param.t1, index),
                '@result': formatNumber(result, 2)
            });

            var report_year = String(Drupal.settings.mywebform.values.dec_fiscCod1_datefisc).split('/');
            report_year = report_year.length == 2 && report_year[1] ? Number(report_year[1]) : new Date().getFullYear() - 1;
            var mutable_value = report_year >= 2021 ? 2935 : 2000;

            if (result < mutable_value || result >= 20000) {
                webform.warnings.push({
                    'fieldName': param.t1,
                    'index': index,
                    'parentIndex': parentIndex,
                    'weight': 85,
                    'options': {
                        'hide_title': true
                    },
                    'msg': generateMessageTitle('03-085', msg, param.t1, index, parentIndex)
                });
            }
        }
    }

    function validate_rule_03105(param, index, parentIndex) {
        var c8_val = toFloat(get_field_value(param.c8, index, parentIndex));
        var c3_val = toFloat(get_field_value(param.c3, index, parentIndex));
        var rowIsFilled = false;

        /*for (var i = 1; i <= 9; i++) {
          var field_T = param.c8.replace(/c\dt$/, 'c' + i + 't');
          var val_T = get_field_value(field_T, index, parentIndex);
    
          if (val_T !== '') {
            rowIsFilled = true;
            break;
          }
        }*/

        //if (rowIsFilled) {
        var result = toFloat(c8_val * 1000 / c3_val / 8);
        var msg = Drupal.t('Cap. I., Rândul @row, Col. 8 * 1000 / Rândul @row, Col. 3 / 8 trebuie să fie < 50, (@result)', {
            '@row': getRowFromFieldName(param.c8, index),
            '@result': formatNumber(result, 2)
        });
        if (result > 50) {
            webform.warnings.push({
                'fieldName': param.c8,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 105,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-105', msg, param.c8, index, parentIndex),
            });
        }
        //}
    }

    function validate_rule_03106(param, index, parentIndex) {
        var c9_val = toFloat(get_field_value(param.c9, index, parentIndex));
        var c4_val = toFloat(get_field_value(param.c4, index, parentIndex));
        var rowIsFilled = false;

        /*for (var i = 1; i <= 9; i++) {
          var field_T = param.c9.replace(/c\dt$/, 'c' + i + 't');
          var val_T = get_field_value(field_T, index, parentIndex);
    
          if (val_T) {
            rowIsFilled = true;
            break;
          }
        }*/

        //if (rowIsFilled) {
        var result = toFloat(c9_val * 1000 / c4_val / 8);
        var msg = Drupal.t('Cap. I.a., Rândul @row, Col. 9 * 1000 / Rândul @row, Col. 4 / 8 trebuie să fie < 50, (@result)', {
            '@row': getRowFromFieldName(param.c9, index),
            '@result': formatNumber(result, 2)
        });
        if (result > 50) {
            webform.warnings.push({
                'fieldName': param.c9,
                'index': index,
                'parentIndex': parentIndex,
                'weight': 106,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-106', msg, param.c9, index, parentIndex)
            });
        }
        //}
    }

    function validate_rule_03127(param, index, parentIndex) {
        if (field_exists(param.t1_T, index, parentIndex) && field_exists(param.t2_T, index, parentIndex)) {
            var t1_T = get_field_value(param.t1_T, index, parentIndex);
            var t1_F = get_field_value(param.t1_F, index, parentIndex);
            var t2_T = get_field_value(param.t2_T, index, parentIndex);
            var t2_F = get_field_value(param.t2_F, index, parentIndex);
            var result = (t2_T - t2_F) * 1000 / (t1_T - t1_F) / 12;
            var msg = Drupal.t('Cap. II., Rândul @row, col. 1 (T-F) * 1000 / Cap. I., Rândul @row, Col. 2 (T-F) / 12 => 2935 < 20000 pt fiecare rînd (@result)', {
                '@row': getRowFromFieldName(param.t1_T, index),
                '@result': formatNumber(result, 2)
            });

            var report_year = String(Drupal.settings.mywebform.values.YEAR).split('/');
            report_year = report_year.length == 2 && report_year[1] ? Number(report_year[1]) : new Date().getFullYear() - 1;
            //var mutable_value = report_year >= 2020 ? 2000 : 1100;
            var mutable_value = 2935;

            if (result < mutable_value || result >= 20000) {
                webform.warnings.push({
                    'fieldName': param.t1_T,
                    'index': index,
                    'parentIndex': parentIndex,
                    'weight': 127,
                    'options': {
                        'hide_title': true
                    },
                    'msg': generateMessageTitle('03-127', msg, param.t1_T, index, parentIndex)
                });
            }
        }
    }

    function validate_rule_03144(param, index, parentIndex) {
        if (field_exists(param.t1_T, index, parentIndex) && field_exists(param.t2_T, index, parentIndex)) {
            var msg = Drupal.t('Dacă în Cap. II., Rândul @row, Col.1, valorile răndurilor "Total salariați" și "Femei" sunt egale, atunci și în Cap. I., Col.2, valorile rândurilor "Total salariați" și "Femei" trebuie să fie egale (T=F).', {
                '@row': getRowFromFieldName(param.t1_T, index)
            });
            var t1_T = get_field_value(param.t1_T, index, parentIndex);
            var t1_F = get_field_value(param.t1_F, index, parentIndex);
            var t2_T = get_field_value(param.t2_T, index, parentIndex);
            var t2_F = get_field_value(param.t2_F, index, parentIndex);
            var t1_val = t1_T - t1_F;
            var t2_val = t2_T - t2_F;

            var row_part = Drupal.t('Rândurile "Total salariați" (T) și "Femei" (F)');
            if (t2_val == 0 && t1_val != 0) {
                var titleParts = generateTitleFromField(param.t1_T, index, parentIndex);
                var fieldTitle = titleParts.table + ', ' + row_part + ', ' + titleParts.col;

                webform.warnings.push({
                    'fieldName': param.t1_T,
                    'index': index,
                    'parentIndex': parentIndex,
                    'weight': 144,
                    'options': {
                        'hide_title': true
                    },
                    'msg': concatMessage('03-144', fieldTitle, msg)
                });
            }
        }
    }

    function validate_rule_03155(param, index, parentIndex) {
        if (field_exists(param.t1_T, index, parentIndex) && field_exists(param.t2_T, index, parentIndex)) {
            var t1_T = toFloat(get_field_value(param.t1_T, index, parentIndex));
            var t1_F = toFloat(get_field_value(param.t1_F, index, parentIndex));
            var t2_T = toFloat(get_field_value(param.t2_T, index, parentIndex));
            var t2_F = toFloat(get_field_value(param.t2_F, index, parentIndex));
            var t1_val = t1_T - t1_F;
            var t2_val = t2_T - t2_F;
            var result = (t2_val * 100 / t1_val) / (t2_F / t1_F);

            var msg = Drupal.t('Valoarea din Cap. II, Col. 1, Rîndul "Total unitate", (T-F) * 100 / Cap. I., Col.2, Rândul "Total unitate", (T-F)] / [Cap. II., Col. 1, Rândul "Total unitate", F / Cap. I., Col. 2, Rândul "Total unitate", F], trebuie sa fie mai mică decăt 90 sau mai mare decăt 110, (@result).', {
                '@result': formatNumber(result, 2)
            });

            if (result >= 90 && result <= 110) {
                var titleParts = generateTitleFromField(param.t1_T, index, parentIndex);
                var fieldTitle = titleParts.table + ', ' + Drupal.t('Rândurile "Total salariați" (T) și "Femei" (F)') + ', ' + titleParts.col;

                webform.warnings.push({
                    'fieldName': param.t1_T,
                    'index': index,
                    'parentIndex': parentIndex,
                    'weight': 155,
                    'options': {
                        'hide_title': true
                    },
                    'msg': concatMessage('03-155', fieldTitle, msg)
                });
            }
        }
    }

    function validate_rule_03114(param, index) {
        var f1 = param.fieldTemplate.replace('_COL_', 2);
        var f1_val = get_field_value(f1, index);

        for (var i = 7; i <= 8; i++) {
            var msg = Drupal.t('Cap.II., Rândul 00-T, col. 1 > Cap.II., Rândul 00-T, col. @col', { '@col': i - 1 });
            var f2 = param.fieldTemplate.replace('_COL_', i);
            var f2_val = get_field_value(f2, index);

            if (f2_val !== '' && toFloat(f1_val) <= toFloat(f2_val)) {
                webform.errors.push({
                    'fieldName': f1,
                    'index': 0,
                    'weight': 114,
                    'options': {
                        'hide_title': true
                    },
                    'msg': generateMessageTitle('03-114', msg, f1, index),
                });
            }
        }
    }

    function validate_rule_03028() {
        var t5 = get_field_value('CAPV_R2_C1');
        var t2 = get_field_value('CAPII_R00_T_C2');
        var result = toFloat(toFloat(t5) * 100 / toFloat(t2));

        if (result < '23' || result > '30') {
            webform.warnings.push({
                'fieldName': 'CAPV_R2_C1',
                'index': 0,
                'weight': 28,
                'options': {
                    'hide_title': true
                },
                'msg': Drupal.t('Cod eroare: 03-028 - Cap V, Rândul 2 * 100 / Cap II Rândul "00-T" Col1 trebuie să fie în intervalul [23%-30%], (@result)', {
                    '@result': formatNumber(result, 2)
                })
            });
        }
    }

    function validate_rule_03030() {
        var t5 = get_field_value('CAPV_R3_C1');
        var t2 = get_field_value('dec_dynamicTable2_r0_c1t');
        var result = toFloat(toFloat(t5) * 100 / toFloat(t2));

        var show_error = false;
        var message = '';
        if (get_form_version() == 'v1') {
            show_error = result < 20 || result > 24;
            message = Drupal.t('Cod eroare: 03-030 - Cap V, Rândul 3 * 100 / Cap II Rândul "00-T" Col1 trebuie să fie în intervalul [20%-24%], (@result)', {
                '@result': formatNumber(result, 2)
            });
        } else {
            show_error = result < 17 || result > 24;
            Drupal.t('Cod eroare: 03-030 - Cap V, Rândul 3 * 100 / Cap II Rândul "00-T" Col1 trebuie să fie în intervalul [17%-24%], (@result)', {
                '@result': formatNumber(result, 2)
            });
        }

        if (show_error) {
            webform.warnings.push({
                'fieldName': 'dec_table5_row_r3c1',
                'index': 0,
                'weight': 30,
                'options': {
                    'hide_title': true
                },
                'msg': message
            });
        }
    }

    function validate_rule_03064(param, index, parentIndex) {
        var msg = Drupal.t('Cap @table Rândul 1 total lipsesc datele în CAEM principal', { '@table': param.table });
        var rowIsFilled = false;

        if (param.table == 'I.') {
            for (var i = 2; i <= 11; i++) {
                var field_T = param.fieldTemplate.replace('_COL_', i).replace('_TYPE_', 'T');
                var val_T = get_field_value(field_T, index, parentIndex);

                if (val_T) {
                    rowIsFilled = true;
                    break;
                }
            }
        }
        else {
            for (var i = 2; i <= 8; i++) {
                var field_T = param.fieldTemplate.replace('_COL_', i).replace('_TYPE_', 'T');
                var val_T = get_field_value(field_T, index, parentIndex);

                if (val_T) {
                    rowIsFilled = true;
                    break;
                }
            }

        }

        if (!rowIsFilled) {
            webform.warnings.push({
                'fieldName': '',
                'index': 0,
                'weight': 64,
                'options': {
                    'hide_title': true
                },
                'msg': generateMessageTitle('03-064', msg, field_T, index, parentIndex),
            });
        }
    }

    function get_region_by_cuatm(cuatm) {
        var region = '';
        if (typeof cuatm_munca3 != 'undefined') {
            for (var i in cuatm_munca3) {
                if (cuatm == cuatm_munca3[i].code) {
                    region = cuatm_munca3[i].description;
                    break;
                }
            }
        }

        return region;
    }

    function get_rule_param(rule, key) {
        var param = {};
        switch (rule) {
            case '03084':
                param = {
                    'static': [
                        {
                            'result_field': 'CAPIa_R00_T_C_COL_',
                            'field': 'CAPIa_R00_T_C_COL__FILIAL',
                            'table': 'I.',
                            'row': '0',
                        },
                        {
                            'result_field': 'CAPIa_R00_F_C_COL_',
                            'field': 'CAPIa_R00_F_C_COL__FILIAL',
                            'cols': [2, 3, 7, 8],
                            'table': 'I.',
                            'row': '0',
                        },
                        {
                            'result_field': 'CAPIa_R01_T_C_COL_',
                            'field': 'CAPIa_R01_T_C_COL__FILIAL',
                            'table': 'I.',
                            'basic_caem': 'CAPIa_R01_T_C1',
                            'caem_field': 'CAPIa_R01_T_C1_FILIAL',
                            'row': '1',
                        },
                        {
                            'result_field': 'CAPIa_R01_F_C_COL_',
                            'field': 'CAPIa_R01_F_C_COL__FILIAL',
                            'cols': [2, 3, 7, 8],
                            'table': 'I.',
                            'basic_caem': 'CAPIa_R01_T_C1',
                            'caem_field': 'CAPIa_R01_T_C1_FILIAL',
                            'row': '1',
                        }
                    ],
                    'static2': [
                        {
                            'result_field': 'CAPII_R00_T_C_COL_',
                            'field': 'CAPII_R00_T_C_COL__FILIAL',
                            'table': 'II.',
                            'row': '0',
                        },
                        {
                            'result_field': 'CAPII_R00_F_C_COL_',
                            'field': 'CAPII_R00_F_C_COL__FILIAL',
                            'cols': [2, 7, 8],
                            'table': 'II.',
                            'row': '0',
                        },
                        {
                            'result_field': 'CAPII_R01_T_C_COL_',
                            'field': 'CAPII_R01_T_C_COL__FILIAL',
                            'table': 'II.',
                            'basic_caem': 'CAPII_R01_T_C1',
                            'caem_field': 'CAPII_R01_T_C1_FILIAL',
                            'row': '1',
                        },
                        {
                            'result_field': 'CAPII_R01_F_C_COL_',
                            'field': 'CAPII_R01_F_C_COL__FILIAL',
                            'cols': [2, 7, 8],
                            'table': 'II.',
                            'basic_caem': 'CAPII_R01_T_C1',
                            'caem_field': 'CAPII_R01_T_C1_FILIAL',
                            'row': '1',
                        }
                    ],
                    'dynamic_row': [
                        {
                            'result_field': 'CAPIa_R_T_C_COL_',
                            'field': 'CAPIa_R_T_C_COL__FILIAL',
                            'table': 'I.',
                            'basic_caem': 'CAPIa_R_T_C1',
                            'caem_field': 'CAPIa_R_T_C1_FILIAL'
                        },
                        {
                            'result_field': 'CAPIa_R_F_C_COL_',
                            'field': 'CAPIa_R_F_C_COL__FILIAL',
                            'cols': [2, 7, 8],
                            'table': 'I.',
                            'basic_caem': 'CAPIa_R_T_C1',
                            'caem_field': 'CAPIa_R_T_C1_FILIAL'
                        }
                    ],
                    'dynamic2_row': [
                        {
                            'result_field': 'CAPII_R_T_C_COL_',
                            'field': 'CAPII_R_T_C_COL__FILIAL',
                            'table': 'II.',
                            'basic_caem': 'CAPII_R_T_C1',
                            'caem_field': 'CAPII_R_T_C1_FILIAL'
                        },
                        {
                            'result_field': 'CAPII_R_F_C_COL_',
                            'field': 'CAPII_R_F_C_COL__FILIAL',
                            'cols': [2, 7, 8],
                            'table': 'II.',
                            'basic_caem': 'CAPII_R_T_C1',
                            'caem_field': 'CAPII_R_T_C1_FILIAL'
                        }
                    ]
                };
                break;
            case '03085':
                param = {
                    'static': [
                        { 't1': 'CAPIa_R00_F_C3', 't2': 'CAPII_R00_F_C2' },
                        { 't1': 'CAPIa_R01_F_C3', 't2': 'CAPII_R01_F_C2' },
                    ],
                    'dynamic_row': { 't1': 'CAPIa_R_F_C3', 't2': 'CAPII_R_F_C2' },
                    'dynamic_section': [
                        { 't1': 'CAPIa_R00_F_C3_FILIAL', 't2': 'CAPII_R00_F_C2_FILIAL' },
                        { 't1': 'CAPIa_R01_F_C3_FILIAL', 't2': 'CAPII_R01_F_C2_FILIAL' },
                    ],
                    'dynamic_section_row': { 't1': 'CAPIa_R_F_C3_FILIAL', 't2': 'CAPII_R_F_C2_FILIAL' }
                };
                break;
            case '03105':
                param = {
                    'static': [
                        { 'c8': 'CAPIa_R00_T_C9', 'c3': 'CAPIa_R00_T_C4' },
                        { 'c8': 'CAPIa_R01_T_C9', 'c3': 'CAPIa_R01_T_C4' },
                    ],
                    'dynamic_row': { 'c8': 'CAPIa_R_T_C9', 'c3': 'CAPIa_R_T_C4' },
                    'dynamic_section': [
                        { 'c8': 'CAPIa_R00_T_C9_FILIAL', 'c3': 'CAPIa_R00_T_C4_FILIAL' },
                        { 'c8': 'CAPIa_R01_T_C9_FILIAL', 'c3': 'CAPIa_R01_T_C4_FILIAL' },
                    ],
                    'dynamic_section_row': { 'c8': 'CAPIa_R_T_C9_FILIAL', 'c3': 'CAPIa_R_T_C4_FILIAL' }
                };
                break;
            case '03106':
                param = {
                    'static': [
                        { 'c9': 'CAPIa_R00_T_C10', 'c4': 'CAPIa_R00_T_C5' },
                        { 'c9': 'CAPIa_R01_T_C10', 'c4': 'CAPIa_R01_T_C5' },
                    ],
                    'dynamic_row': { 'c9': 'CAPIa_R_T_C10', 'c4': 'CAPIa_R_T_C5' },
                    'dynamic_section': [
                        { 'c9': 'CAPIa_R00_T_C10_FILIAL', 'c4': 'CAPIa_R00_T_C5_FILIAL' },
                        { 'c9': 'CAPIa_R01_T_C10_FILIAL', 'c4': 'CAPIa_R01_T_C5_FILIAL' },
                    ],
                    'dynamic_section_row': { 'c9': 'CAPIa_R_T_C10_FILIAL', 'c4': 'CAPIa_R_T_C5_FILIAL' }
                };
                break;
            case '03127':
            case '03143':
            case '03144':
            case '03155':
                param = {
                    'static': [
                        { 't1_T': 'CAPIa_R00_T_C3', 't1_F': 'CAPIa_R00_F_C3', 't2_T': 'CAPII_R00_T_C2', 't2_F': 'CAPII_R00_F_C2' },
                        { 't1_T': 'CAPIa_R01_T_C3', 't1_F': 'CAPIa_R01_F_C3', 't2_T': 'CAPII_R01_T_C2', 't2_F': 'CAPII_R01_F_C2' }
                    ],
                    'dynamic_row': {
                        't1_T': 'CAPIa_R_T_C3', 't1_F': 'CAPIa_R_F_C3', 't2_T': 'CAPII_R_T_C2', 't2_F': 'CAPII_R_F_C2'
                    },
                    'dynamic_section': [
                        { 't1_T': 'CAPIa_R00_T_C3_FILIAL', 't1_F': 'CAPIa_R00_F_C3_FILIAL', 't2_T': 'CAPII_R00_T_C2_FILIAL', 't2_F': 'CAPII_R00_F_C2_FILIAL', 'row': '0' },
                        { 't1_T': 'CAPIa_R01_T_C3_FILIAL', 't1_F': 'CAPIa_R01_F_C3_FILIAL', 't2_T': 'CAPII_R01_T_C2_FILIAL', 't2_F': 'CAPII_R01_F_C2_FILIAL', 'row': '1' }
                    ],
                    'dynamic_section_row': {
                        't1_T': 'CAPIa_R_T_C3_FILIAL', 't1_F': 'CAPIa_R_F_C3_FILIAL',
                        't2_T': 'CAPII_R_T_C2_FILIAL', 't2_F': 'CAPII_R_F_C2_FILIAL'
                    }
                };
                break;
            case '03114':
                param = {
                    'static': { 'fieldTemplate': 'CAPII_R00_T_C_COL_' },
                    'dynamic_section': { 'fieldTemplate': 'CAPII_R00_T_C_COL__FILIAL' }
                };
                break;
            case '03083':
                param = {
                    'static': [
                        { 'f1': 'CAPIa_R00_T_C5', 'f2': 'CAPIa_R00_T_C6' },
                        { 'f1': 'CAPIa_R01_T_C5', 'f2': 'CAPIa_R01_T_C6' },
                    ],
                    'dynamic_row': { 'f1': 'CAPIa_R_T_C5', 'f2': 'CAPIa_R_T_C6' },
                    'dynamic_section': [
                        { 'f1': 'CAPIa_R00_T_C5_FILIAL', 'f2': 'CAPIa_R00_T_C6_FILIAL' },
                        { 'f1': 'CAPIa_R01_T_C5_FILIAL', 'f2': 'CAPIa_R01_T_C6_FILIAL' }
                    ],
                    'dynamic_section_row': {
                        'f1': 'CAPIa_R_T_C5_FILIAL',
                        'f2': 'CAPIa_R_T_C6_FILIAL'
                    }
                };
                break;
            case '03013':
                param = {
                    'static': [
                        { 'f1': 'CAPII_R00_T_C2', 'f2': 'CAPII_R00_T_C7' },
                        { 'f1': 'CAPII_R00_F_C2', 'f2': 'CAPII_R00_F_C7' },
                        { 'f1': 'CAPII_R01_T_C2', 'f2': 'CAPII_R01_T_C7' },
                        { 'f1': 'CAPII_R01_F_C2', 'f2': 'CAPII_R01_F_C7' }
                    ],
                    'dynamic_row': [
                        { 'f1': 'CAPII_R_T_C2', 'f2': 'CAPII_R_T_C7' },
                        { 'f1': 'CAPII_R_F_C2', 'f2': 'CAPII_R_F_C7' }
                    ],
                    'dynamic_section': [
                        { 'f1': 'CAPII_R00_T_C2_FILIAL', 'f2': 'CAPII_R00_T_C7_FILIAL' },
                        { 'f1': 'CAPII_R00_F_C2_FILIAL', 'f2': 'CAPII_R00_F_C7_FILIAL' },
                        { 'f1': 'CAPII_R01_T_C2_FILIAL', 'f2': 'CAPII_R01_T_C7_FILIAL' },
                        { 'f1': 'CAPII_R01_F_C2_FILIAL', 'f2': 'CAPII_R01_F_C7_FILIAL' },
                    ],
                    'dynamic_section_row': [
                        { 'f1': 'CAPII_R_T_C2_FILIAL', 'f2': 'CAPII_R_T_C7_FILIAL' },
                        { 'f1': 'CAPII_R_F_C2_FILIAL', 'f2': 'CAPII_R_F_C7_FILIAL' },
                    ]
                };
                break;
            case '03137':
                param = {
                    'static': [
                        { 'fieldTemplate': 'CAPIa_R00__TYPE__C_COL_', 'cols': [2, 3, 7, 8], 'table': 'I.' },
                        { 'fieldTemplate': 'CAPIa_R00__TYPE__C_COL_', 'cols': [2, 3, 7, 8], 'table': 'I.' },
                    ],
                    'dynamic_row': { 'fieldTemplate': 'CAPIa_R__TYPE__C_COL_', 'cols': [2, 3, 7, 8], 'table': 'I.' },
                    'dynamic_section': [
                        { 'fieldTemplate': 'CAPIa_R00__TYPE__C_COL__FILIAL', 'cols': [2, 3, 7, 8], 'table': 'I.' },
                        { 'fieldTemplate': 'CAPIa_R01__TYPE__C_COL__FILIAL', 'cols': [2, 3, 7, 8], 'table': 'I.' }
                    ],
                    'dynamic_section_row': { 'fieldTemplate': 'CAPIa_R__TYPE__C_COL__FILIAL', 'cols': [2, 3, 7, 8], 'table': 'I.' },
                    'static2': [
                        { 'fieldTemplate': 'CAPII_R00__TYPE__C_COL_', 'cols': [2, 7, 8], 'table': 'II.' },
                        { 'fieldTemplate': 'CAPII_R01__TYPE__C_COL_', 'cols': [2, 7, 8], 'table': 'II.' },
                    ],
                    'dynamic2_row': { 'fieldTemplate': 'CAPII_R__TYPE__C_COL_', 'cols': [2, 7, 8], 'table': 'II.' },
                    'dynamic_section2': [
                        { 'fieldTemplate': 'CAPII_R00__TYPE__C_COL__FILIAL', 'cols': [2, 7, 8], 'table': 'II.' },
                        { 'fieldTemplate': 'CAPII_R01__TYPE__C_COL__FILIAL', 'cols': [2, 7, 8], 'table': 'II.' }
                    ],
                    'dynamic_section2_row': { 'fieldTemplate': 'CAPII_R__TYPE__C_COL__FILIAL', 'cols': [2, 7, 8], 'table': 'II.' }
                };
                break;
            case '03064':
                param = {
                    'static': { 'fieldTemplate': 'CAPIa_R01__TYPE__C_COL_', 'table': 'I.' },
                    'dynamic_section': { 'fieldTemplate': 'CAPIa_R__TYPE__C_COL_', 'table': 'I.' },
                    'static2': { 'fieldTemplate': 'CAPII_R01__TYPE__C_COL_', 'table': 'II.' },
                    'dynamic_section2': { 'fieldTemplate': 'CAPII_R__TYPE__C_COL_', 'table': 'II.' },
                };
                break;
            case '03003':
                param = {
                    'static': [
                        { 'f1': 'CAPIa_R00_T_C7', 'f2': 'CAPIa_R00_T_C4' },
                        { 'f1': 'CAPIa_R01_T_C7', 'f2': 'CAPIa_R01_T_C4' },
                    ],
                    'dynamic_row': { 'f1': 'CAPIa_R_T_C7', 'f2': 'CAPIa_R_T_C4' },
                    'dynamic_section': [
                        { 'f1': 'CAPIa_R00_T_C7_FILIAL', 'f2': 'CAPIa_R00_T_C4_FILIAL' },
                        { 'f1': 'CAPIa_R01_T_C7_FILIAL', 'f2': 'CAPIa_R01_T_C4_FILIAL' },
                    ],
                    'dynamic_section_row': { 'f1': 'CAPIa_R_T_C7_FILIAL', 'f2': 'CAPIa_R_T_C4_FILIAL' }
                };
                break;
            case '03004':
                param = {
                    'static': [
                        { 'f1': 'CAPIa_R00_T_C8', 'f2': 'CAPIa_R00_T_C6' },
                        { 'f1': 'CAPIa_R01_T_C8', 'f2': 'CAPIa_R01_T_C6' },
                    ],
                    'dynamic_row': { 'f1': 'CAPIa_R_T_C8', 'f2': 'CAPIa_R_T_C6' },
                    'dynamic_section': [
                        { 'f1': 'CAPIa_R00_T_C8_FILIAL', 'f2': 'CAPIa_R00_T_C6_FILIAL' },
                        { 'f1': 'CAPIa_R01_T_C8_FILIAL', 'f2': 'CAPIa_R01_T_C6_FILIAL' },
                    ],
                    'dynamic_section_row': { 'f1': 'CAPIa_R_T_C8_FILIAL', 'f2': 'CAPIa_R_T_C6_FILIAL' }
                };
                break;
            case '03081': {
                param = {
                    'static': [
                        { 'f1': 'CAPIa_R00_T_C4', 'f2': 'CAPIa_R00_T_C7' },
                        { 'f1': 'CAPIa_R01_T_C4', 'f2': 'CAPIa_R01_T_C7' }
                    ],
                    'dynamic_row': { 'f1': 'CAPIa_R_T_C4', 'f2': 'CAPIa_R_T_C7' },
                    'dynamic_section': [
                        { 'f1': 'CAPIa_R00_T_C4_FILIAL', 'f2': 'CAPIa_R00_T_C7_FILIAL' },
                        { 'f1': 'CAPIa_R01_T_C4_FILIAL', 'f2': 'CAPIa_R01_T_C7_FILIAL' }
                    ],
                    'dynamic_section_row': {
                        'f1': 'CAPIa_R_T_C4_FILIAL',
                        'f2': 'CAPIa_R_T_C7_FILIAL'
                    }
                };
                break;
            }
        }

        if (param.hasOwnProperty(key)) {
            return param[key];
        }

        return param;
    }

    function generateTitleFromField(fieldName, index, parentIndex) {
        var titleParts = {
            'table': '',
            'row': '',
            'col': '',
        };

        //var matches = fieldName.match(/^(CAPIa_|CAPII_)?\w+c(\d)?/);
        var matches = fieldName.split('_'); //match(/^(CAPIa_|CAPII_)?\w+c(\d)?/);

        if (matches == null) {
            return false;
        }

        if (matches[0] == 'CAPIa' || typeof matches[1] == 'undefined') {
            titleParts.table = Drupal.t('Cap. I.');
        } else {
            titleParts.table = Drupal.t('Cap II.');
        }

        if (matches[4] == 'undefined') {
            titleParts.table = titleParts.table + ' ' + Drupal.t('(tab. de bază)');
        } else if (matches[4] == 'FILIAL') {
            if (typeof parentIndex != 'undefined') {
                table_index = parentIndex + 1;
            } else if (typeof index != 'undefined') {
                table_index = index + 1;
            }
            titleParts.table = titleParts.table + ' ' + Drupal.t('(tab. №@tabNum)', { '@tabNum': table_index });
        }

        //var lastChar = fieldName[fieldName.length - 1];
        if (matches[2] == 'T' && matches[3] != 'C1') {
            titleParts.row = Drupal.t('Rândul "Total salariați"');
        } else if (matches[2] == 'F' && matches[3] != 'C1') {
            titleParts.row = Drupal.t('Rândul "Femei"');
        }

        if (matches[3] != 'C1') {
            titleParts.col = Drupal.t('Col.@col', { '@col': matches[3].substr(1, 2) - 1 });
        }

        return titleParts;
    }

    function generateMessageTitle(errorCode, message, fieldName, index, parentIndex) {
        var titleParts = generateTitleFromField(fieldName, index, parentIndex);

        if (!titleParts) {
            if (errorCode) {
                return concatMessage(errorCode, '', message)
            } else {
                return message;
            }
        }

        var title = '';
        var titleArr = [];
        if (titleParts.table) {
            titleArr.push(titleParts.table);
        }

        if (titleParts.row) {
            titleArr.push(titleParts.row);
        }

        if (titleParts.col) {
            titleArr.push(titleParts.col);
        }

        if (titleArr.length) {
            title = titleArr.join(', ');
        }

        return concatMessage(errorCode, title, message);
    }

    function sort_errors_warinings(a, b) {
        if (!a.hasOwnProperty('weight')) {
            a.weight = 9999;
        }

        if (!b.hasOwnProperty('weight')) {
            b.weight = 9999;
        }

        return toFloat(a.weight) - toFloat(b.weight);
    }

    function getRowFromFieldName(fieldName, index) {
        var row = '';
        var matches = String(fieldName).match(/^(CAPIa_|CAPII_)+R(\d)+(\d)/);
        if (matches) {
            row = matches[3];
        } else if (typeof index !== 'undefined') {
            return Number(index) + 2;
        }

        return row;
    }

    function getRowTypeFromFieldName(fieldName) {
        var row_type = '';

        if (fieldName) {
            var lastChar = fieldName[fieldName.length - 1];
            if (lastChar == 'T') {
                row_type = Drupal.t('Total salariați');
            } else if (lastChar == 'F') {
                row_type = Drupal.t('Femei');
            }
        }

        return row_type;
    }

    function show_specific_form_version(triggerChange) {
        triggerChange = typeof triggerChange === typeof undefined ? true : triggerChange;
        var form_version = get_form_version();

        for (var version in form_versions) {
            if (form_version !== version) {
                jQuery('.version-' + version).hide();

                if (!Drupal.settings.mywebform.preview) {
                    clear_version_grids('.version-' + version, '.version-' + form_version);
                    clear_version_fields('.version-' + version, '.version-' + form_version);
                }

                if (triggerChange) {
                    jQuery('.version-' + version).find('select, input').trigger('change');
                }
            }
        }

        if (triggerChange) {
            jQuery('.version-' + form_version).show();
        }

        jQuery('.version-' + form_version).show();
    }

    function clear_version_grids(selector, except_selector) {
        jQuery(selector + '.grid-table').not(except_selector).each(function () {
            var id = jQuery(this).attr('id');
            if (id && Drupal.settings.mywebform.grids.hasOwnProperty(id)) {
                grid_reset(id);
            }
        });
    }

    function clear_version_fields(selector, except_selector) {
        var processedGF = {};
        jQuery(selector).not(except_selector).find('input, select')
            .each(function (k, v) {
                var fieldName = jQuery(this).attr('field');
                if (fieldName) {
                    var field = Drupal.settings.mywebform.fields[fieldName];

                    if (field.grid_name != '') {
                        if (!(fieldName in processedGF)) {
                            var total = Drupal.settings.mywebform.values[fieldName].length;
                            for (var i = 0; i < total; i++) {
                                Drupal.settings.mywebform.values[fieldName][i] = '';
                            }
                            processedGF[fieldName] = true;
                        }
                    } else {
                        Drupal.settings.mywebform.values[fieldName] = '';
                    }

                    if (field.widget == 'checkbox') {
                        jQuery(this).prop('checked', false);
                    } else {
                        jQuery(this).val('');
                    }
                }
            });
    }

    function get_form_version(reset) {
        if (!static_form_version || reset) {
            var year = parseInt(Drupal.settings.mywebform.values.YEAR);

            if (!year) {
                var dateObj = new Date();
                var curYear = dateObj.getFullYear();

                year = curYear;
            }

            static_form_version = 'v1';
            for (var version in form_versions) {
                if (year > form_versions[version].year || year == form_versions[version].year) {
                    static_form_version = version;
                }
            }

        }

        return static_form_version;
    }

})(jQuery);