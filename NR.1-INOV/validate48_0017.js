function validate48_0017() {
    const r111_selected = jQuery('#CAPITOL1_R111_C1').is(':checked') || jQuery('#CAPITOL1_R111_C2').is(':checked');
    const r112_selected = jQuery('#CAPITOL1_R112_C1').is(':checked') || jQuery('#CAPITOL1_R112_C2').is(':checked');

    const r15_complete = [
        '#CAPITOL1_R151_C1', '#CAPITOL1_R151_C2',
        '#CAPITOL1_R152_C1', '#CAPITOL1_R152_C2',
        '#CAPITOL1_R153_C1', '#CAPITOL1_R153_C2',
        '#CAPITOL1_R154_C1', '#CAPITOL1_R154_C2',
        '#CAPITOL1_R155_C1', '#CAPITOL1_R155_C2',
        '#CAPITOL1_R156_C1', '#CAPITOL1_R156_C2',
        '#CAPITOL1_R157_C1', '#CAPITOL1_R157_C2',
    ].every(id => jQuery(id).is(':checked'));

    const r17_da = [
        '#CAPITOL1_R171_C1',
        '#CAPITOL1_R174_C1',
        '#CAPITOL1_R175_C1',
        '#CAPITOL1_R176_C1',
        '#CAPITOL1_R177_C1',
    ].some(id => jQuery(id).is(':checked'));

    const r110_bifate = [
        '#CAPITOL1_R1101_C1',
        '#CAPITOL1_R1102_C1',
        '#CAPITOL1_R1103_C1'
    ].some(id => jQuery(id).is(':checked'));

    const r111_bifate = [
        '#CAPITOL1_R1111_C1', '#CAPITOL1_R1111_C2',
        '#CAPITOL1_R1112_C1', '#CAPITOL1_R1112_C2',
        '#CAPITOL1_R1113_C1', '#CAPITOL1_R1113_C2'
    ].some(id => jQuery(id).is(':checked'));

    if (r111_selected && r112_selected && r15_complete && r17_da && !r110_bifate && !r111_bifate) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R1111_C1',
            weight: 17,
            msg: concatMessage(
                '48-0017',
                'Întrebarea 1.11 – Cooperare',
                Drupal.t('Cod eroare: 48-0017. Completati Cap.1 Rindurile 1.11.')
            )
        });
    }
}