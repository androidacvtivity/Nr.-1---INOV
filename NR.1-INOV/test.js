
//Modify validation according to the new logic -- 48-006		Cap.1 Ati bifat cu "Da" Rind. 1.7.1 - Completati Rind 1.8.1 sau 1.8.2 "DA"

function validate48_005() {
    var r171_checked = jQuery('#CAPITOL1_R171_C1').is(':checked');

    var r172_c1 = jQuery('#CAPITOL1_R172_C1').is(':checked');
    var r172_c2 = jQuery('#CAPITOL1_R172_C2').is(':checked');
    var r173_c1 = jQuery('#CAPITOL1_R173_C1').is(':checked');
    var r173_c2 = jQuery('#CAPITOL1_R173_C2').is(':checked');

    var r172_has_value = r172_c1 || r172_c2;
    var r173_has_value = r173_c1 || r173_c2;

    var no_172_173 = !r172_has_value && !r173_has_value;

    // ➤ Caz 1: Ai bifat 1.7.1 = DA dar nu ai completat nimic în 1.7.2 / 1.7.3
    if (r171_checked && no_172_173) {
        webform.warnings.push({
            fieldName: 'CAPITOL1_R171_C1',
            weight: 1,
            msg: concatMessage(
                '48-005',
                'Rândul 1.7.1 – Activități CD',
                Drupal.t('Cod eroare: 48-005. Ați bifat “DA” la Rândul 1.7.1, dar nu ați completat nici Rândul 1.7.2 și nici 1.7.3. Trebuie bifat cel puțin un câmp în 1.7.2 sau 1.7.3.')
            )
        });
    }

    // ➤ Caz 2: Ai completat 1.7.2 / 1.7.3 dar NU ai bifat 1.7.1 = DA
    if (!r171_checked && (r172_has_value || r173_has_value)) {
        webform.warnings.push({
            fieldName: 'CAPITOL1_R171_C1',
            weight: 1,
            msg: concatMessage(
                '48-005',
                'Rândul 1.7.1 – Activități CD',
                Drupal.t('Cod eroare: 48-005. Ați completat Rândul 1.7.2 sau 1.7.3 fără să fi bifat “DA” la Rândul 1.7.1.')
            )
        });
    }
}


//Modify validation according to the new logic -- 48-006		Cap.1 Ati bifat cu "Da" Rind. 1.7.1 - Completati Rind 1.8.1 sau 1.8.2 "DA"
