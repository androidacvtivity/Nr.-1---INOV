function toggle111_112(values) {
    if (values.CAPITOL1_R111_C2 == '1' && values.CAPITOL1_R112_C2 == '1') {

        jQuery('#CAPITOL1_R12H, #CAPITOL1_R12H1, #CAPITOL1_R121, #CAPITOL1_R122, #CAPITOL1_R12H2, #CAPITOL1_R13H, #CAPITOL1_R13H1, #CAPITOL1_R13H2, #CAPITOL1_R131, #CAPITOL1_R132, #CAPITOL1_R133, #CAPITOL1_R134, #CAPITOL1_R14H, #CAPITOL1_R14H1, #CAPITOL1_R14H2, #CAPITOL1_R14H3').hide();

        // Ștergem valorile din inputurile asociate
        var inputIDs = [
            "CAPITOL1_R121_C1", "CAPITOL1_R121_C2", "CAPITOL1_R122_C1",
            "CAPITOL1_R123_C2", "CAPITOL1_R131_C1", "CAPITOL1_R131_C2",
            "CAPITOL1_R132_C1", "CAPITOL1_R132_C2", "CAPITOL1_R133_C1",
            "CAPITOL1_R133_C2", "CAPITOL1_R134_C1", "CAPITOL1_R134_C2",
            "CAPITOL1_R141_C1", "CAPITOL1_R142_C1", "CAPITOL1_R143_C1", "CAPITOL1_R144_C1"
        ];

        inputIDs.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.value = "";
            }
        });
    } else {
        jQuery('#CAPITOL1_R12H, #CAPITOL1_R12H1, #CAPITOL1_R121, #CAPITOL1_R122, #CAPITOL1_R12H2, #CAPITOL1_R13H, #CAPITOL1_R13H1, #CAPITOL1_R13H2, #CAPITOL1_R131, #CAPITOL1_R132, #CAPITOL1_R133, #CAPITOL1_R134, #CAPITOL1_R14H, #CAPITOL1_R14H1, #CAPITOL1_R14H2, #CAPITOL1_R14H3').show();
    }
}
