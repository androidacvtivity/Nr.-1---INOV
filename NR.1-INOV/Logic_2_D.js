function toggle151_157(values) {
    // Verifică dacă toate checkbox-urile "NU" din 1.5 sunt bifate
    const allNo = [
        'CAPITOL1_R151_C2', 'CAPITOL1_R152_C2', 'CAPITOL1_R153_C2',
        'CAPITOL1_R154_C2', 'CAPITOL1_R155_C2', 'CAPITOL1_R156_C2', 'CAPITOL1_R157_C2'
    ].every(id => values[id] === '1');

    if (allNo) {
        // Ascunde secțiunea 1.6
        jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R16H4, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').hide();

        // Șterge valorile din 1.6
        ['CAPITOL1_R161_C1', 'CAPITOL1_R162_C1', 'CAPITOL1_R163_C1', 'CAPITOL1_R164_C1'].forEach(id => {
            document.getElementById(id) && (document.getElementById(id).value = "");
        });
    } else {
        // Afișează secțiunea 1.6
        jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R16H4, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').show();
    }
}

function check_151_157(values) {
    // Ascultă modificări la checkbox-urile din 1.5
    jQuery('input[type=checkbox][id^="CAPITOL1_R15"]').on('change', function () {
        const allNo = [
            'CAPITOL1_R151_C2', 'CAPITOL1_R152_C2', 'CAPITOL1_R153_C2',
            'CAPITOL1_R154_C2', 'CAPITOL1_R155_C2', 'CAPITOL1_R156_C2', 'CAPITOL1_R157_C2'
        ].every(id => jQuery(`#${id}`).is(':checked'));

        toggle151_157(values);
    });
}