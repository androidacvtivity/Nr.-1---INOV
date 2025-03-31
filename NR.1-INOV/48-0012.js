// ✅ VALIDARE 48-0012 – Completati Cap.1 Rindurile 1.6
function validate48_0012() {
    const r111_nu = jQuery('#CAPITOL1_R111_C2').is(':checked');
    const r112_nu = jQuery('#CAPITOL1_R112_C2').is(':checked');

    const r151_da = jQuery('#CAPITOL1_R151_C1').is(':checked');
    const r152_da = jQuery('#CAPITOL1_R152_C1').is(':checked');
    const r153_da = jQuery('#CAPITOL1_R153_C1').is(':checked');
    const r154_da = jQuery('#CAPITOL1_R154_C1').is(':checked');
    const r155_da = jQuery('#CAPITOL1_R155_C1').is(':checked');
    const r156_da = jQuery('#CAPITOL1_R156_C1').is(':checked');
    const r157_da = jQuery('#CAPITOL1_R157_C1').is(':checked');

    const r161 = jQuery('#CAPITOL1_R161_C1').is(':checked');
    const r162 = jQuery('#CAPITOL1_R162_C1').is(':checked');
    const r163 = jQuery('#CAPITOL1_R163_C1').is(':checked');
    const r164 = jQuery('#CAPITOL1_R164_C1').is(':checked');

    const atLeastOne15_DA = r151_da || r152_da || r153_da || r154_da || r155_da || r156_da || r157_da;
    const all16_empty = !(r161 || r162 || r163 || r164);

    if (r111_nu && r112_nu && atLeastOne15_DA && all16_empty) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R161_C1',
            weight: 11,
            msg: concatMessage(
                '48-0012',
                'Întrebarea 1.6 – Activități de sprijin',
                Drupal.t('Cod eroare: 48-0012. Completati Cap.1 Rindurile 1.6 – trebuie bifată cel puțin o opțiune DA.')
            )
        });
    }
}

// 🔄 TOGGLE după reîncărcare raport
function toggle_48_0012(values) {
    const r111_nu = values.CAPITOL1_R111_C2 == '1';
    const r112_nu = values.CAPITOL1_R112_C2 == '1';

    const r151 = values.CAPITOL1_R151_C1 == '1';
    const r152 = values.CAPITOL1_R152_C1 == '1';
    const r153 = values.CAPITOL1_R153_C1 == '1';
    const r154 = values.CAPITOL1_R154_C1 == '1';
    const r155 = values.CAPITOL1_R155_C1 == '1';
    const r156 = values.CAPITOL1_R156_C1 == '1';
    const r157 = values.CAPITOL1_R157_C1 == '1';

    const r161 = values.CAPITOL1_R161_C1 == '1';
    const r162 = values.CAPITOL1_R162_C1 == '1';
    const r163 = values.CAPITOL1_R163_C1 == '1';
    const r164 = values.CAPITOL1_R164_C1 == '1';

    const atLeastOne15_DA = r151 || r152 || r153 || r154 || r155 || r156 || r157;
    const all16_empty = !(r161 || r162 || r163 || r164);

    if (r111_nu && r112_nu && atLeastOne15_DA && all16_empty) {
        showStickyError(
            '48-0012',
            'Întrebarea 1.6 – Activități de sprijin',
            'Cod eroare: 48-0012. Completati Cap.1 Rindurile 1.6 – trebuie bifată cel puțin o opțiune DA.'
        );
    }
}

// 👁️ Watch live validation când user-ul bifează/completează
function watchLiveValidation_48_0012() {
    jQuery('input[type="checkbox"]').change(function () {
        validate48_0012();
    });
}
