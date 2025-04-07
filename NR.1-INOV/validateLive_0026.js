function validate48_0026() {
    const r111_checked = jQuery('#CAPITOL1_R111_C1').is(':checked') || jQuery('#CAPITOL1_R111_C2').is(':checked');
    const r112_checked = jQuery('#CAPITOL1_R112_C1').is(':checked') || jQuery('#CAPITOL1_R112_C2').is(':checked');

    if (!(r111_checked || r112_checked)) return;

    const rows111 = ['1111', '1112', '1113'];

    const allChecked = rows111.every(row => {
        return jQuery(`#CAPITOL1_R${row}_C1`).is(':checked') || jQuery(`#CAPITOL1_R${row}_C2`).is(':checked');
    });

    if (!allChecked) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R1111_C1',
            weight: 25,
            msg: concatMessage(
                '48-0026',
                'Cap.1 – Secțiunea 1.11',
                Drupal.t('Cod eroare: 48-0026. Completați toate rândurile din 1.11 (1.11.1 – 1.11.3) cu DA sau NU.')
            )
        });
    }
}
