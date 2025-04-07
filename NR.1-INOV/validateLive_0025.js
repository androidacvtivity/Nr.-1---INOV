function validate48_0025() {
    const r111_valid = jQuery('#CAPITOL1_R111_C1').is(':checked') || jQuery('#CAPITOL1_R111_C2').is(':checked');
    const r112_valid = jQuery('#CAPITOL1_R112_C1').is(':checked') || jQuery('#CAPITOL1_R112_C2').is(':checked');

    const r15_checked = [
        '151', '152', '153', '154', '155', '156', '157'
    ].some(row => {
        return jQuery(`#CAPITOL1_R${row}_C1`).is(':checked') || jQuery(`#CAPITOL1_R${row}_C2`).is(':checked');
    });

    const r17_checked = [
        '171', '174', '175', '176', '177'
    ].some(row => {
        return jQuery(`#CAPITOL1_R${row}_C1`).is(':checked') || jQuery(`#CAPITOL1_R${row}_C2`).is(':checked');
    });

    if (!(r111_valid || r112_valid || r15_checked || r17_checked)) return;

    const rows18 = ['181', '182', '183'];
    const allFilledOrChecked = rows18.every(row => {
        const val = jQuery(`#CAPITOL1_R${row}_C1`).val();
        const hasNumber = val && !isNaN(parseFloat(val)) && parseFloat(val) > 0;
        const checked = jQuery(`#CAPITOL1_R${row}_C2`).is(':checked');
        return hasNumber || checked;
    });

    if (!allFilledOrChecked) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R181_C1',
            weight: 24,
            msg: concatMessage(
                '48-0025',
                'Cap.1 – Cheltuieli pentru inovare și cercetare-dezvoltare',
                Drupal.t('Cod eroare: 48-0025. Completati Cap.1 Rindurile 1.8 – fiecare rând trebuie completat fie cu o valoare numerică fie bifat.')
            )
        });
    }
}
