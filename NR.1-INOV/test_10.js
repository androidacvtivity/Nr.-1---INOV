function toggle111_112(values) {
    if (
        values.CAPITOL1_R1111_C2 === '1' && values.CAPITOL1_R1112_C2 === '1' &&
        values.CAPITOL1_R151_C2 === '1' && values.CAPITOL1_R152_C2 === '1' &&
        values.CAPITOL1_R153_C2 === '1' && values.CAPITOL1_R154_C2 === '1' &&
        values.CAPITOL1_R155_C2 === '1' && values.CAPITOL1_R156_C2 === '1' &&
        values.CAPITOL1_R157_C2 === '1' &&
        values.CAPITOL1_R171_C2 === '1' && values.CAPITOL1_R172_C2 === '1' &&
        values.CAPITOL1_R173_C2 === '1' && values.CAPITOL1_R174_C2 === '1' &&
        values.CAPITOL1_R175_C2 === '1' && values.CAPITOL1_R176_C2 === '1' &&
        values.CAPITOL1_R177_C2 === '1' &&
        (
            values.CAPITOL1_R1101_C1 === '1' ||
            values.CAPITOL1_R1102_C1 === '1' ||
            values.CAPITOL1_R1103_C1 === '1'
        )
    ) {
        jQuery('#CAPITOL1_R111H1, #CAPITOL1_R111H2, #CAPITOL1_R111H3, #CAPITOL1_R111H4, #CAPITOL1_R1111, #CAPITOL1_R1112, #CAPITOL1_R1113, #CAPITOL1_R111H5, #CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R112H7, #CAPITOL1_R112H8, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129').hide();

        var inputIDs = [
            "CAPITOL1_R1111_C1", "CAPITOL1_R1111_C2",
            "CAPITOL1_R1112_C1", "CAPITOL1_R1112_C2",
            "CAPITOL1_R1113_C1", "CAPITOL1_R1113_C2",
            "CAPITOL1_R1121_C1", "CAPITOL1_R1121_C2", "CAPITOL1_R1121_C3",
            "CAPITOL1_R1122_C1", "CAPITOL1_R1122_C2", "CAPITOL1_R1122_C3",
            "CAPITOL1_R1123_C1", "CAPITOL1_R1123_C2", "CAPITOL1_R1123_C3",
            "CAPITOL1_R1124_C1", "CAPITOL1_R1124_C2", "CAPITOL1_R1124_C3",
            "CAPITOL1_R1125_C1", "CAPITOL1_R1125_C2", "CAPITOL1_R1125_C3",
            "CAPITOL1_R1126_C1", "CAPITOL1_R1126_C2", "CAPITOL1_R1126_C3",
            "CAPITOL1_R1127_C1", "CAPITOL1_R1127_C2", "CAPITOL1_R1127_C3",
            "CAPITOL1_R1128_C1", "CAPITOL1_R1128_C2", "CAPITOL1_R1128_C3",
            "CAPITOL1_R1129_C1", "CAPITOL1_R1129_C2", "CAPITOL1_R1129_C3"
        ];

        inputIDs.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = false;
                } else {
                    element.value = '';
                }
            }
        });
    } else {
        jQuery('#CAPITOL1_R111H1, #CAPITOL1_R111H2, #CAPITOL1_R111H3, #CAPITOL1_R111H4, #CAPITOL1_R1111, #CAPITOL1_R1112, #CAPITOL1_R1113, #CAPITOL1_R111H5, #CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R112H7, #CAPITOL1_R112H8, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129').show();
    }
}


function check_111_112(values) {
    jQuery('input[type=checkbox]').change(function () {
        var onlyNo =
            jQuery('#CAPITOL1_R1111_C2').is(':checked') &&
            jQuery('#CAPITOL1_R1112_C2').is(':checked') &&
            jQuery('#CAPITOL1_R151_C2').is(':checked') &&
            jQuery('#CAPITOL1_R152_C2').is(':checked') &&
            jQuery('#CAPITOL1_R153_C2').is(':checked') &&
            jQuery('#CAPITOL1_R154_C2').is(':checked') &&
            jQuery('#CAPITOL1_R155_C2').is(':checked') &&
            jQuery('#CAPITOL1_R156_C2').is(':checked') &&
            jQuery('#CAPITOL1_R157_C2').is(':checked') &&
            jQuery('#CAPITOL1_R171_C2').is(':checked') &&
            jQuery('#CAPITOL1_R172_C2').is(':checked') &&
            jQuery('#CAPITOL1_R173_C2').is(':checked') &&
            jQuery('#CAPITOL1_R174_C2').is(':checked') &&
            jQuery('#CAPITOL1_R175_C2').is(':checked') &&
            jQuery('#CAPITOL1_R176_C2').is(':checked') &&
            jQuery('#CAPITOL1_R177_C2').is(':checked');

        var anyYes =
            jQuery('#CAPITOL1_R1101_C1').is(':checked') ||
            jQuery('#CAPITOL1_R1102_C1').is(':checked') ||
            jQuery('#CAPITOL1_R1103_C1').is(':checked');

        if (onlyNo && anyYes) {
            jQuery('#CAPITOL1_R111H1, #CAPITOL1_R111H2, #CAPITOL1_R111H3, #CAPITOL1_R111H4, #CAPITOL1_R1111, #CAPITOL1_R1112, #CAPITOL1_R1113, #CAPITOL1_R111H5, #CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R112H7, #CAPITOL1_R112H8, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129').hide();

            var inputIDs = [
                "CAPITOL1_R1111_C1", "CAPITOL1_R1111_C2",
                "CAPITOL1_R1112_C1", "CAPITOL1_R1112_C2",
                "CAPITOL1_R1113_C1", "CAPITOL1_R1113_C2",
                "CAPITOL1_R1121_C1", "CAPITOL1_R1121_C2", "CAPITOL1_R1121_C3",
                "CAPITOL1_R1122_C1", "CAPITOL1_R1122_C2", "CAPITOL1_R1122_C3",
                "CAPITOL1_R1123_C1", "CAPITOL1_R1123_C2", "CAPITOL1_R1123_C3",
                "CAPITOL1_R1124_C1", "CAPITOL1_R1124_C2", "CAPITOL1_R1124_C3",
                "CAPITOL1_R1125_C1", "CAPITOL1_R1125_C2", "CAPITOL1_R1125_C3",
                "CAPITOL1_R1126_C1", "CAPITOL1_R1126_C2", "CAPITOL1_R1126_C3",
                "CAPITOL1_R1127_C1", "CAPITOL1_R1127_C2", "CAPITOL1_R1127_C3",
                "CAPITOL1_R1128_C1", "CAPITOL1_R1128_C2", "CAPITOL1_R1128_C3",
                "CAPITOL1_R1129_C1", "CAPITOL1_R1129_C2", "CAPITOL1_R1129_C3"
            ];

            inputIDs.forEach(function (id) {
                var element = document.getElementById(id);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = false;
                    } else {
                        element.value = '';
                    }
                }
            });

        } else {
            jQuery('#CAPITOL1_R111H1, #CAPITOL1_R111H2, #CAPITOL1_R111H3, #CAPITOL1_R111H4, #CAPITOL1_R1111, #CAPITOL1_R1112, #CAPITOL1_R1113, #CAPITOL1_R111H5, #CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R112H7, #CAPITOL1_R112H8, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129').show();
        }
    });
}
