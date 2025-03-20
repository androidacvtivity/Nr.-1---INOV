function check_111_157_177(values) {
    jQuery('input[type=checkbox]').change(function () {
        if (
            jQuery('#CAPITOL1_R111_C2').is(':checked') && jQuery('#CAPITOL1_R112_C2').is(':checked') &&
            jQuery('#CAPITOL1_R151_C2').is(':checked') && jQuery('#CAPITOL1_R152_C2').is(':checked') &&
            jQuery('#CAPITOL1_R153_C2').is(':checked') && jQuery('#CAPITOL1_R154_C2').is(':checked') &&
            jQuery('#CAPITOL1_R155_C2').is(':checked') && jQuery('#CAPITOL1_R156_C2').is(':checked') &&
            jQuery('#CAPITOL1_R157_C2').is(':checked') && jQuery('#CAPITOL1_R171_C2').is(':checked') &&
            jQuery('#CAPITOL1_R172_C2').is(':checked') && jQuery('#CAPITOL1_R173_C2').is(':checked') &&
            jQuery('#CAPITOL1_R174_C2').is(':checked') && jQuery('#CAPITOL1_R175_C2').is(':checked') &&
            jQuery('#CAPITOL1_R176_C2').is(':checked') && jQuery('#CAPITOL1_R177_C2').is(':checked')
        ) {
            // Hide 1.8 and move to 1.10
            jQuery('#CAPITOL1_R18H1, #CAPITOL1_R18H2, #CAPITOL1_R18H3, #CAPITOL1_R181, #CAPITOL1_R182, #CAPITOL1_R183, #CAPITOL1_R184').hide();

            // Clear and uncheck input values
            jQuery('#CAPITOL1_R181_C1, #CAPITOL1_R182_C1, #CAPITOL1_R183_C1, #CAPITOL1_R184_C1').val('').prop('checked', false);
        } else {
            // Show elements of 1.8
            jQuery('#CAPITOL1_R18H1, #CAPITOL1_R18H2, #CAPITOL1_R18H3, #CAPITOL1_R181, #CAPITOL1_R182, #CAPITOL1_R183, #CAPITOL1_R184').show();
        }
    });
}


function toggle111_157_177(values) {
    if (
        values.CAPITOL1_R111_C2 == '1' && values.CAPITOL1_R112_C2 == '1' &&
        values.CAPITOL1_R151_C2 == '1' && values.CAPITOL1_R152_C2 == '1' &&
        values.CAPITOL1_R153_C2 == '1' && values.CAPITOL1_R154_C2 == '1' &&
        values.CAPITOL1_R155_C2 == '1' && values.CAPITOL1_R156_C2 == '1' &&
        values.CAPITOL1_R157_C2 == '1' && values.CAPITOL1_R171_C2 == '1' &&
        values.CAPITOL1_R172_C2 == '1' && values.CAPITOL1_R173_C2 == '1' &&
        values.CAPITOL1_R174_C2 == '1' && values.CAPITOL1_R175_C2 == '1' &&
        values.CAPITOL1_R176_C2 == '1' && values.CAPITOL1_R177_C2 == '1'
    ) {
        // Hide 1.8 and move to 1.10
        jQuery('#CAPITOL1_R18H1, #CAPITOL1_R18H2, #CAPITOL1_R18H3, #CAPITOL1_R181, #CAPITOL1_R182, #CAPITOL1_R183, #CAPITOL1_R184').hide();

        // Clear and uncheck input values
        jQuery('#CAPITOL1_R181_C1, #CAPITOL1_R182_C1, #CAPITOL1_R183_C1, #CAPITOL1_R184_C1').val('').prop('checked', false);
    } else {
        // Show elements of 1.8
        jQuery('#CAPITOL1_R18H1, #CAPITOL1_R18H2, #CAPITOL1_R18H3, #CAPITOL1_R181, #CAPITOL1_R182, #CAPITOL1_R183, #CAPITOL1_R184').show();
    }
}