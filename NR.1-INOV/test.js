
function toggle111_112(values) {
    if (values.CAPITOL1_R111_C2 == '1' && values.CAPITOL1_R112_C2 == '1') {

        jQuery('#CAPITOL1_R12H, #CAPITOL1_R12H1, #CAPITOL1_R121, #CAPITOL1_R122, #CAPITOL1_R12H2, #CAPITOL1_R13H, #CAPITOL1_R13H1, #CAPITOL1_R13H2, #CAPITOL1_R131, #CAPITOL1_R132, #CAPITOL1_R133, #CAPITOL1_R134, #CAPITOL1_R14H, #CAPITOL1_R14H1, #CAPITOL1_R14H2, #CAPITOL1_R14H3, #CAPITOL1_R141, #CAPITOL1_R142, #CAPITOL1_R143, #CAPITOL1_R144').hide();

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
        jQuery('#CAPITOL1_R12H, #CAPITOL1_R12H1, #CAPITOL1_R121, #CAPITOL1_R122, #CAPITOL1_R12H2, #CAPITOL1_R13H, #CAPITOL1_R13H1, #CAPITOL1_R13H2, #CAPITOL1_R131, #CAPITOL1_R132, #CAPITOL1_R133, #CAPITOL1_R134, #CAPITOL1_R14H, #CAPITOL1_R14H1, #CAPITOL1_R14H2, #CAPITOL1_R14H3, #CAPITOL1_R141, #CAPITOL1_R142, #CAPITOL1_R143, #CAPITOL1_R144').show();
    }
}

//
function check_111_112(values) {

    jQuery('input[type=checkbox]').change(function () {

        if (jQuery('#CAPITOL1_R111_C2').is(':checked') && jQuery('#CAPITOL1_R112_C2').is(':checked')) {
            jQuery('#CAPITOL1_R12H').hide();
            jQuery('#CAPITOL1_R12H1').hide();
            jQuery('#CAPITOL1_R12H2').hide();
            jQuery('#CAPITOL1_R121').hide();
            jQuery('#CAPITOL1_R122').hide();

            jQuery('#CAPITOL1_R13H').hide();
            jQuery('#CAPITOL1_R13H1').hide();
            jQuery('#CAPITOL1_R13H2').hide();
            jQuery('#CAPITOL1_R131').hide();
            jQuery('#CAPITOL1_R132').hide();
            jQuery('#CAPITOL1_R133').hide();
            jQuery('#CAPITOL1_R134').hide();

            jQuery('#CAPITOL1_R14H').hide();
            jQuery('#CAPITOL1_R14H1').hide();
            jQuery('#CAPITOL1_R14H2').hide();
            jQuery('#CAPITOL1_R14H3').hide();
            jQuery('#CAPITOL1_R141').hide();
            jQuery('#CAPITOL1_R142').hide();
            jQuery('#CAPITOL1_R143').hide();
            jQuery('#CAPITOL1_R144').hide();


            jQuery('#CAPITOL1_R121_C1').attr("checked", false);
            jQuery('#CAPITOL1_R121_C2').attr("checked", false);
            jQuery('#CAPITOL1_R122_C1').attr("checked", false);
            jQuery('#CAPITOL1_R122_C2').attr("checked", false);
            jQuery('#CAPITOL1_R141_C1').attr("checked", false);
            jQuery('#CAPITOL1_R142_C1').attr("checked", false);
            jQuery('#CAPITOL1_R143_C1').attr("checked", false);
            jQuery('#CAPITOL1_R144_C1').attr("checked", false);




            document.getElementById("CAPITOL1_R121_C1").value = "";
            document.getElementById("CAPITOL1_R121_C2").value = "";
            document.getElementById("CAPITOL1_R122_C1").value = "";
            document.getElementById("CAPITOL1_R122_C2").value = "";

            document.getElementById("CAPITOL1_R131_C1").value = "";
            document.getElementById("CAPITOL1_R132_C1").value = "";

            document.getElementById("CAPITOL1_R133_C1").value = "";

            document.getElementById("CAPITOL1_R134_C1").value = "";

            document.getElementById("CAPITOL1_R141_C1").value = "";
            document.getElementById("CAPITOL1_R142_C1").value = "";
            document.getElementById("CAPITOL1_R143_C1").value = "";
            document.getElementById("CAPITOL1_R144_C1").value = "";


        }
        else if (!(jQuery('#CAPITOL1_R111_C2').is(':checked') && jQuery('#CAPITOL1_R112_C2').is(':checked'))) {
            jQuery('#CAPITOL1_R12H').show();
            jQuery('#CAPITOL1_R12H1').show();
            jQuery('#CAPITOL1_R12H2').show();
            jQuery('#CAPITOL1_R121').show();
            jQuery('#CAPITOL1_R122').show();

            jQuery('#CAPITOL1_R13H').show();
            jQuery('#CAPITOL1_R13H1').show();
            jQuery('#CAPITOL1_R13H2').show();
            jQuery('#CAPITOL1_R131').show();
            jQuery('#CAPITOL1_R132').show();
            jQuery('#CAPITOL1_R133').show();
            jQuery('#CAPITOL1_R134').show();

            jQuery('#CAPITOL1_R14H').show();
            jQuery('#CAPITOL1_R14H1').show();
            jQuery('#CAPITOL1_R14H2').show();
            jQuery('#CAPITOL1_R14H3').show();

            jQuery('#CAPITOL1_R141').show();
            jQuery('#CAPITOL1_R142').show();
            jQuery('#CAPITOL1_R143').show();
            jQuery('#CAPITOL1_R144').show();

        }

    });

}




Sa ascunda si sa faca clear data 

-------------------

     <tr id="CAPITOL1_R111H1">
            <td colspan="4"></td>
        </tr>
        <tr id="CAPITOL1_R111H2">
            <td colspan="4">
                <strong>1.11 În perioada celor trei ani 2022–2024, întreprinderea Dvs. <u> a cooperat cu alte
                        întreprinderi sau organizații?</u>
                </strong>
            </td>
        </tr>
        <tr id="CAPITOL1_R111H3">
            <td align="left" colspan="4">
                <em>Cooperarea are loc atunci când doi sau mai mulți participanți convin să-și asume responsabilitatea
                    pentru o sarcină sau
                    o serie de sarcini și informațiile sunt partajate între părți pentru a facilita acordul</em>
            </td>
        </tr>
        <tr id="CAPITOL1_R111H4">
            <td colspan="2"></td>
            <td align="center">Da</td>
            <td align="center">Nu</td>
        </tr>
        <tr id="CAPITOL1_R1111">
            <td colspan="2"> 1.11.1 În domeniul CD</td>
            <td align="center">@CAPITOL1_R1111_C1;</td>
            <td align="center">@CAPITOL1_R1111_C2;</td>
        </tr>
        <tr id="CAPITOL1_R1112">
            <td colspan="2">1.11.2 În alte activități de inovare (cu excepția cercetării și dezvoltării)</td>
            <td align="center">@CAPITOL1_R1112_C1;</td>
            <td align="center">@CAPITOL1_R1112_C2;</td>
        </tr>
        <tr id="CAPITOL1_R1113">
            <td colspan="2">1.11.3 În orice alte activități de afaceri</td>
            <td align="center">@CAPITOL1_R1113_C1;</td>
            <td align="center">@CAPITOL1_R1113_C2;</td>
        </tr>
        <tr id="CAPITOL1_R111H5">
            <td colspan="4">
                <strong>    <em>Dacă ați răspuns “DA” la oricare din opțiunile 1) sau 2), vă rugăm
                        treceți la întrebarea 1.12
                        Altfel, vă rugăm continuați cu întrebarea 2.1</em></strong>
            </td>
        </tr>
        <!--1.11 -->
        < !--1.12 -->
        <tr id="CAPITOL1_R112H1">
            <td colspan="4"></td>
        </tr>
        <tr id="CAPITOL1_R112H2">
            <td colspan="4"><strong>1.12 Vă rugăm să indicați <u>tipul partenerului de cooperare</u> după localizarea
                    geografică:
                </strong></td>
        </tr>
        <tr id="CAPITOL1_R112H3">
            <td align="right" colspan="4"><strong><em>Răspunsurile se vor referi doar la ”cooperarea în domeniul
                        inovării”</em>
                </strong></td>
        </tr>
        <tr id="CAPITOL1_R112H4">
            <td align="right" colspan="4"> <em>Bifați tot ce ați aplicat</em>
            </td>
        </tr>
        <tr  id ="CAPITOL1_R112H5">
            <td style=" width:62%"><strong>Tipul partenerului de cooperare</strong></td>
            <td align="center" style="width:16%"><strong>Moldova</strong></td>
            <td align="center" style="width:16%"><strong>Țările din UE* sau AELS**</strong></td>
            <td align="center" style="width:16%"><strong>Toate celelalte țări</strong></td>
        </tr>
        <tr id="CAPITOL1_R112H6">
            <td align="left" colspan="4" style="width:100%"><strong>Partener de cooperare din sectorul întreprinderilor
                    de afaceri</strong></td>
        </tr>
        <tr id="CAPITOL1_R1121">
            <td style="width:62%">1.12.1 Consultanți, laboratoare comerciale sau institute de cercetare private</td>
            <td align="center" style="width:12%">@CAPITOL1_R1121_C1;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1121_C2;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1121_C3;</td>
        </tr>
        <tr id="CAPITOL1_R1122">
            <td style="width:62%">1.12.2 Furnizori de echipamente, materiale, componente sau software</td>
            <td align="center" style="width:12%">@CAPITOL1_R1122_C1;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1122_C2;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1122_C3;</td>
        </tr>
        <tr id="CAPITOL1_R1123">
            <td style="width:62%">1.12.3 Întreprinderile care sunt clienții sau cumpărătorii dvs.</td>
            <td align="center" style="width:12%">@CAPITOL1_R1123_C1;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1123_C2;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1123_C3;</td>
        </tr>
        <tr id="CAPITOL1_R1124">
            <td style="width:62%">1.12.4 Întreprinderile care sunt concurenții dvs.</td>
            <td align="center" style="width:12%">@CAPITOL1_R1124_C1;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1124_C2;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1124_C3;</td>
        </tr>
        <tr id="CAPITOL1_R1125">
            <td style="width:62%">1.12.5 Alte întreprinderi</td>
            <td align="center" style="width:12%">@CAPITOL1_R1125_C1;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1125_C2;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1125_C3;</td>
        </tr>
        <tr id="CAPITOL1_R112H7">
            <td align="left" colspan="4" style="width:100%"><strong>Partener de cooperare din afara sectorului
                    întreprinderilor de afaceri</strong></td>
        </tr>
        <tr id="CAPITOL1_R1126">
            <td style="width:62%">1.12.6 Universități sau alte instituții de învățământ superior</td>
            <td align="center" style="width:12%">@CAPITOL1_R1126_C1;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1126_C2;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1126_C3;</td>
        </tr>
        <tr id="CAPITOL1_R1127">
            <td style="width:62%">1.12.7 Administrație publică, instituții de cercetare publice</td>
            <td align="center" style="width:12%">@CAPITOL1_R1127_C1;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1127_C2;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1127_C3;</td>
        </tr>
        <tr id="CAPITOL1_R1128">
            <td style="width:62%">1.12.8 Clienți sau cumpărători din sectorul public***</td>
            <td align="center" style="width:12%">@CAPITOL1_R1128_C1;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1128_C2;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1128_C3;</td>
        </tr>
        <tr id="CAPITOL1_R1129">
            <td style="width:62%">1.12.9 Organizații non-profit</td>
            <td align="center" style="width:12%">@CAPITOL1_R1129_C1;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1129_C2;</td>
            <td align="center" style="width:12%">@CAPITOL1_R1129_C3;</td>
        </tr>
        <tr id="CAPITOL1_R112H8">
            <td align="left" colspan="4">
                <em>* Statele membre ale Uniunii Europene sunt: Austria, Belgia, Bulgaria, Republica Cehă, Croația,
                    Cipru, Danemarca,
                    Estonia, Finlanda, Franța, Germania, Grecia, Irlanda, Italia, Letonia, Lituania, Luxemburg, Malta,
                    Olanda, Polonia,
                    Portugalia, România, Slovacia, Slovenia, Spania, Suedia, Ungaria.</em>
                <br />
                <em>** Sectorul public cuprinde organizațiile administrației publice, cum sunt cele din administrațiile
                    și agențiile locale,
                    regionale şi naționale, școli, spitale cât şi furnizori de servicii ai administrației publice, cum
                    ar fi cele pentru
                    securitate, transport, locuințe, energie</em>
            </td>
        </tr>