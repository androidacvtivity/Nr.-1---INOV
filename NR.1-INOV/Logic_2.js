// Logic 2: If "NU" is selected for all options in 1.5, skip to 1.7, else continue with 1.6

function toggle151_157(values) {
    if (
        values.CAPITOL1_R151_C2 == '1' && values.CAPITOL1_R152_C2 == '1' &&
        values.CAPITOL1_R153_C2 == '1' && values.CAPITOL1_R154_C2 == '1' &&
        values.CAPITOL1_R155_C2 == '1' && values.CAPITOL1_R156_C2 == '1' &&
        values.CAPITOL1_R157_C2 == '1'
    ) {
        // Hide elements of 1.6 and move to 1.7
        jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').hide();

        // Clear input values
        var inputIDs = ["CAPITOL1_R161_C1", "CAPITOL1_R162_C1", "CAPITOL1_R163_C1", "CAPITOL1_R164_C1"];
        inputIDs.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.value = "";
            }
        });
    } else {
        // Show elements of 1.6
        jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').show();
    }
}

function check_151_157(values) {
    jQuery('input[type=checkbox]').change(function () {
        if (
            jQuery('#CAPITOL1_R151_C2').is(':checked') && jQuery('#CAPITOL1_R152_C2').is(':checked') &&
            jQuery('#CAPITOL1_R153_C2').is(':checked') && jQuery('#CAPITOL1_R154_C2').is(':checked') &&
            jQuery('#CAPITOL1_R155_C2').is(':checked') && jQuery('#CAPITOL1_R156_C2').is(':checked') &&
            jQuery('#CAPITOL1_R157_C2').is(':checked')
        ) {
            // Hide 1.6 and move to 1.7
            jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').hide();

            // Clear input values
            jQuery('#CAPITOL1_R161_C1, #CAPITOL1_R162_C1, #CAPITOL1_R163_C1, #CAPITOL1_R164_C1').val('');
        } else {
            // Show elements of 1.6
            jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').show();
        }
    });
}
