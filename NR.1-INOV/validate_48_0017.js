
function validate48_0017() {
    const r111_checked = jQuery('#CAPITOL1_R111_C1').is(':checked') || jQuery('#CAPITOL1_R111_C2').is(':checked');
    const r112_checked = jQuery('#CAPITOL1_R112_C1').is(':checked') || jQuery('#CAPITOL1_R112_C2').is(':checked');
    
    const r151_checked = jQuery('#CAPITOL1_R151_C1').is(':checked') || jQuery('#CAPITOL1_R151_C2').is(':checked');
    const r152_checked = jQuery('#CAPITOL1_R152_C1').is(':checked') || jQuery('#CAPITOL1_R152_C2').is(':checked');
    const r153_checked = jQuery('#CAPITOL1_R153_C1').is(':checked') || jQuery('#CAPITOL1_R153_C2').is(':checked');
    const r154_checked = jQuery('#CAPITOL1_R154_C1').is(':checked') || jQuery('#CAPITOL1_R154_C2').is(':checked');
    const r155_checked = jQuery('#CAPITOL1_R155_C1').is(':checked') || jQuery('#CAPITOL1_R155_C2').is(':checked');
    const r156_checked = jQuery('#CAPITOL1_R156_C1').is(':checked') || jQuery('#CAPITOL1_R156_C2').is(':checked');
    const r157_checked = jQuery('#CAPITOL1_R157_C1').is(':checked') || jQuery('#CAPITOL1_R157_C2').is(':checked');

    const all15_checked = r151_checked && r152_checked && r153_checked && r154_checked && r155_checked && r156_checked && r157_checked;

    const r171_da = jQuery('#CAPITOL1_R171_C1').is(':checked');

    const r174_da = jQuery('#CAPITOL1_R174_C1').is(':checked');
    const r175_da = jQuery('#CAPITOL1_R175_C1').is(':checked');
    const r176_da = jQuery('#CAPITOL1_R176_C1').is(':checked');
    const r177_da = jQuery('#CAPITOL1_R177_C1').is(':checked');

    const atLeastOne17_da = r171_da  || r174_da || r175_da || r176_da || r177_da;

    const r1101 = jQuery('#CAPITOL1_R1101_C1').is(':checked');
    const r1102 = jQuery('#CAPITOL1_R1102_C1').is(':checked');
    const r1103 = jQuery('#CAPITOL1_R1103_C1').is(':checked');

    const r111_and_r112_checked = r111_checked && r112_checked;
    const no110_selected = !(r1101 || r1102 || r1103);

    if (r111_and_r112_checked && all15_checked && atLeastOne17_da && no110_selected) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R1101_C1',
            weight: 17,
            msg: concatMessage(
                '48-0017',
                'Întrebarea 1.11 – Colaborare',
                Drupal.t('Cod eroare: 48-0017. Completati Cap.1 Rindurile 1.11 – trebuie bifată cel puțin o opțiune.')
            )
        });
    }
}
