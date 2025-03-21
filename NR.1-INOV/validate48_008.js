function validate48_008() {
    const r193_checked = jQuery('#CAPITOL1_R193_C1').is(':checked');

    const r1111_da = jQuery('#CAPITOL1_R1111_C1').is(':checked');
    const r1111_nu = jQuery('#CAPITOL1_R1111_C2').is(':checked');

    const r1112_da = jQuery('#CAPITOL1_R1112_C1').is(':checked');
    const r1112_nu = jQuery('#CAPITOL1_R1112_C2').is(':checked');

    const r1113_da = jQuery('#CAPITOL1_R1113_C1').is(':checked');
    const r1113_nu = jQuery('#CAPITOL1_R1113_C2').is(':checked');

    const all_111_empty = !(r1111_da || r1111_nu) || !(r1112_da || r1112_nu) || !(r1113_da || r1113_nu);

    if (r193_checked && all_111_empty) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R193_C1',
            weight: 1,
            msg: concatMessage(
                '48-008',
                'Rândul 1.9.3 – Lipsa cooperării',
                Drupal.t('Cod eroare: 48-059. Ați bifat “DA” la 1.9.3, dar nu ați completat toate opțiunile DA/NU pentru întrebările 1.11.1, 1.11.2 și 1.11.3.')
            )
        });
    }
}
