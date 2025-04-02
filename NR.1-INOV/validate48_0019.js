
function validate48_0019() {
    const r111_da = jQuery('#CAPITOL1_R111_C1').is(':checked');
    const r112_da = jQuery('#CAPITOL1_R112_C1').is(':checked');

    const one_11_da = r111_da || r112_da;

    const one_15_da = [
        '#CAPITOL1_R151_C1',
        '#CAPITOL1_R152_C1',
        '#CAPITOL1_R153_C1',
        '#CAPITOL1_R154_C1',
        '#CAPITOL1_R155_C1',
        '#CAPITOL1_R156_C1',
        '#CAPITOL1_R157_C1'
    ].some(id => jQuery(id).is(':checked'));

    const any_17_da = [
        '#CAPITOL1_R171_C1',
        '#CAPITOL1_R174_C1',
        '#CAPITOL1_R175_C1',
        '#CAPITOL1_R176_C1',
        '#CAPITOL1_R177_C1'
    ].some(id => jQuery(id).is(':checked'));

    const any_19_checked = [
        '#CAPITOL1_R191_C1',
        '#CAPITOL1_R192_C1',
        '#CAPITOL1_R193_C1'
    ].some(id => jQuery(id).is(':checked'));

    if ((one_11_da || one_15_da) && !any_17_da && !any_19_checked) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R191_C1',
            weight: 19,
            msg: concatMessage(
                '48-0019',
                'Întrebarea 1.9 – Activități de inovare',
                Drupal.t('Cod eroare: 48-0019. Completati Cap.1 Rindurile 1.9')
            )
        });
    }
}
