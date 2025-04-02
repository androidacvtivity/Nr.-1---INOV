
function validate48_0019() {
    const r111_da = jQuery('#CAPITOL1_R111_C1').is(':checked');
    const r112_da = jQuery('#CAPITOL1_R112_C1').is(':checked');

    const r151_da = jQuery('#CAPITOL1_R151_C1').is(':checked');
    const r152_da = jQuery('#CAPITOL1_R152_C1').is(':checked');
    const r153_da = jQuery('#CAPITOL1_R153_C1').is(':checked');
    const r154_da = jQuery('#CAPITOL1_R154_C1').is(':checked');
    const r155_da = jQuery('#CAPITOL1_R155_C1').is(':checked');
    const r156_da = jQuery('#CAPITOL1_R156_C1').is(':checked');
    const r157_da = jQuery('#CAPITOL1_R157_C1').is(':checked');

    const r171_da = jQuery('#CAPITOL1_R171_C1').is(':checked');
    const r173_da = jQuery('#CAPITOL1_R173_C1').is(':checked');
    const r174_da = jQuery('#CAPITOL1_R174_C1').is(':checked');
    const r175_da = jQuery('#CAPITOL1_R175_C1').is(':checked');
    const r176_da = jQuery('#CAPITOL1_R176_C1').is(':checked');
    const r177_da = jQuery('#CAPITOL1_R177_C1').is(':checked');

    const r191 = jQuery('#CAPITOL1_R191_C1').is(':checked');
    const r192 = jQuery('#CAPITOL1_R192_C1').is(':checked');
    const r193 = jQuery('#CAPITOL1_R193_C1').is(':checked');

    const valid_111_or_112 = r111_da || r112_da;
    const valid_15_any_da = r151_da || r152_da || r153_da || r154_da || r155_da || r156_da || r157_da;
    const valid_1_1_or_1_5 = valid_111_or_112 || valid_15_any_da;

    const no_1_7_da = !(r171_da || r173_da || r174_da || r175_da || r176_da || r177_da);
    const no_1_9_selected = !(r191 || r192 || r193);

    if (valid_1_1_or_1_5 && no_1_7_da && no_1_9_selected) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R191_C1',
            weight: 19,
            msg: concatMessage(
                '48-0019',
                'Întrebarea 1.9 – Motive pentru care nu s-a implementat inovația',
                Drupal.t('Cod eroare: 48-0019. Completati Cap.1 Rindurile 1.9 – trebuie bifată cel puțin o opțiune.')
            )
        });
    }
}
