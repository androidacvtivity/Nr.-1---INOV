function check_111_112_logic4(values) {
    jQuery('input[type=checkbox]').change(function () {
        if (
            jQuery('#CAPITOL1_R1111_C2').is(':checked') && // NU la 1.11.1
            jQuery('#CAPITOL1_R1112_C2').is(':checked')    // NU la 1.11.2
        ) {
            // Ascunde întrebarea 1.12 și toate rândurile asociate
            jQuery('#CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R112H7, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129, #CAPITOL1_R112H8').hide();

            // Șterge valorile inputurilor asociate
            let inputIDs = [
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
                let element = document.getElementById(id);
                if (element) {
                    element.value = "";
                    element.checked = false;
                }
            });
        } else {
            // Afișează secțiunile în cazul în care cel puțin un răspuns este "DA"
            jQuery('#CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R112H7, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129, #CAPITOL1_R112H8').show();
        }
    });
}

function toggle_111_112_logic4(values) {
    if (
        values.CAPITOL1_R1111_C2 == '1' &&  // NU la 1.11.1
        values.CAPITOL1_R1112_C2 == '1'     // NU la 1.11.2
    ) {
        jQuery('#CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R112H7, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129, #CAPITOL1_R112H8').hide();

        // Șterge valorile inputurilor asociate
        let inputIDs = [
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
            let element = document.getElementById(id);
            if (element) {
                element.value = "";
                element.checked = false;
            }
        });
    } else {
        jQuery('#CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R112H7, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129, #CAPITOL1_R112H8').show();
    }
}

// Se atașează logica în comportamentul Drupal
Drupal.behaviors.inov1.attach = function (context, settings) {
    var values = Drupal.settings.mywebform.values;

    check_111_112_logic4(values);  // Apelare Logică 4
    toggle_111_112_logic4(values); // Apelare Logică 4
};
