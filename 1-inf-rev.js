(function ($) {
    var activity_options_default_value = '';
    var caemFill = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N'];
    Drupal.behaviors.inf1 = {
        attach: function (context, settings) {
            jQuery('input.numeric').keypress(function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });
            var rows1hideClear = [140, 150, 161, 162, 163, 164, 165, 170, 180, 210, 221, 222, 223, 224, 310, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 430,
                421, 422, 423, 511, 512, 513, 514, 515, 520, 611, 612, 651, 652, 653, 654, 660, 681, 682, 683, 684, 710, 721, 722]
            CAEMhide();
            jQuery('select').change(function () {
                CAEMhide();
            });

            jQuery('input[type=checkbox]').change(function () {
                var state = jQuery(this).is(':checked');
                var group = jQuery(this).attr('name');
                var pos = group.indexOf('_R');
                var res = group.substr(0, pos !== false ? pos + 5 : 0);

                var lengthChecs = null
                jQuery('input[type=checkbox]').each(function () {
                    if (jQuery(this).attr('name').indexOf(res) !== -1) {
                        jQuery(this).removeAttr('checked');
                        lengthChecs++;
                    }
                });
                jQuery(this).prop('checked', state);
                if (group == "CAPITOL1_R161_C1") {
                    jQuery('#CAPITOL1_R162_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R163_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R164_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R165_C1').attr("checked", false);
                }
                else if (group == "CAPITOL1_R162_C1") {
                    jQuery('#CAPITOL1_R161_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R163_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R164_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R165_C1').attr("checked", false);
                }
                else if (group == "CAPITOL1_R163_C1") {
                    jQuery('#CAPITOL1_R161_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R162_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R164_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R165_C1').attr("checked", false);
                }
                else if (group == "CAPITOL1_R164_C1") {
                    jQuery('#CAPITOL1_R161_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R162_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R163_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R165_C1').attr("checked", false);
                }
                else if (group == "CAPITOL1_R165_C1") {
                    jQuery('#CAPITOL1_R161_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R162_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R163_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R164_C1').attr("checked", false);
                }

                if (group == "CAPITOL1_R130_C2") {
                    jQuery('#CAPITOL2').hide(); jQuery('#CAPITOL2_HEADER').hide();
                    jQuery('#CAPITOL3').hide(); jQuery('#CAPITOL3_HEADER').hide();
                    jQuery('#CAPITOL4').hide(); jQuery('#CAPITOL4_HEADER').hide();
                    jQuery('#CAPITOL5').hide(); jQuery('#CAPITOL5_HEADER').hide(); jQuery('#CAPITOL5_HEADER_NOTE').hide();
                    jQuery('#CAPITOL6').hide(); jQuery('#CAPITOL6_HEADER').hide(); jQuery('#CAPITOL6_HEADER_NOTE').hide();
                    jQuery('#CAPITOL7').hide(); jQuery('#CAPITOL7_HEADER').hide(); jQuery('#CAPITOL7_HEADER_NOTE').hide();
                    jQuery('#CAPITOL1_R140').hide(); jQuery('#CAPITOL1_R141').hide(); jQuery('#CAPITOL1_R150').hide();
                    jQuery('#CAPITOL1_R160').hide(); jQuery('#CAPITOL1_R161').hide(); jQuery('#CAPITOL1_R162').hide(); jQuery('#CAPITOL1_R163').hide(); jQuery('#CAPITOL1_R164').hide();
                    jQuery('#CAPITOL1_R165').hide(); jQuery('#CAPITOL1_R170').hide(); jQuery('#CAPITOL1_R180').hide(); jQuery('#CAPITOL1_R181').hide();
                    jQuery('#CAPITOL1_R140_C1').attr("checked", false); jQuery('#CAPITOL1_R140_C2').attr("checked", false);
                    document.getElementById("CAPITOL1_R141_C1").value = "";
                    jQuery('#CAPITOL1_R150_C1').attr("checked", false); jQuery('#CAPITOL1_R150_C2').attr("checked", false);
                    jQuery('#CAPITOL1_R161_C1').attr("checked", false); jQuery('#CAPITOL1_R162_C1').attr("checked", false); jQuery('#CAPITOL1_R163_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R164_C1').attr("checked", false); jQuery('#CAPITOL1_R165_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R170_C1').attr("checked", false); jQuery('#CAPITOL1_R170_C2').attr("checked", false);
                    jQuery('#CAPITOL1_R180_C1').attr("checked", false); jQuery('#CAPITOL1_R180_C2').attr("checked", false);
                    document.getElementById("CAPITOL1_R181_C1").value = "";
                    jQuery('#CAPITOL2_R210_C1').attr("checked", false); jQuery('#CAPITOL2_R210_C2').attr("checked", false);
                    jQuery('#CAPITOL2_R221_C1').attr("checked", false); jQuery('#CAPITOL2_R221_C2').attr("checked", false);
                    jQuery('#CAPITOL2_R222_C1').attr("checked", false); jQuery('#CAPITOL2_R222_C2').attr("checked", false);
                    jQuery('#CAPITOL2_R223_C1').attr("checked", false); jQuery('#CAPITOL2_R223_C2').attr("checked", false);
                    jQuery('#CAPITOL2_R224_C1').attr("checked", false); jQuery('#CAPITOL2_R224_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R310_C1').attr("checked", false); jQuery('#CAPITOL3_R310_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R320_C1').attr("checked", false); jQuery('#CAPITOL3_R320_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R321_C1').attr("checked", false); jQuery('#CAPITOL3_R321_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R322_C1').attr("checked", false); jQuery('#CAPITOL3_R322_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R323_C1').attr("checked", false); jQuery('#CAPITOL3_R323_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R324_C1').attr("checked", false); jQuery('#CAPITOL3_R324_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R325_C1').attr("checked", false); jQuery('#CAPITOL3_R325_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R326_C1').attr("checked", false); jQuery('#CAPITOL3_R326_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R327_C1').attr("checked", false); jQuery('#CAPITOL3_R327_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R328_C1').attr("checked", false); jQuery('#CAPITOL3_R328_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R329_C1').attr("checked", false); jQuery('#CAPITOL3_R329_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R330_C1').attr("checked", false); jQuery('#CAPITOL3_R330_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R411_C1').attr("checked", false); jQuery('#CAPITOL4_R411_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R412_C1').attr("checked", false); jQuery('#CAPITOL4_R412_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R413_C1').attr("checked", false); jQuery('#CAPITOL4_R413_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R414_C1').attr("checked", false); jQuery('#CAPITOL4_R414_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R415_C1').attr("checked", false); jQuery('#CAPITOL4_R415_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R416_C1').attr("checked", false); jQuery('#CAPITOL4_R416_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R417_C1').attr("checked", false); jQuery('#CAPITOL4_R417_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R418_C1').attr("checked", false); jQuery('#CAPITOL4_R418_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R419_C1').attr("checked", false); jQuery('#CAPITOL4_R419_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R420_C1').attr("checked", false); jQuery('#CAPITOL4_R420_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R430_C1').attr("checked", false); jQuery('#CAPITOL4_R430_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R421_C1').attr("checked", false); jQuery('#CAPITOL4_R421_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R422_C1').attr("checked", false); jQuery('#CAPITOL4_R422_C2').attr("checked", false);
                    jQuery('#CAPITOL4_R423_C1').attr("checked", false); jQuery('#CAPITOL4_R423_C2').attr("checked", false);
                    jQuery('#CAPITOL5_R511_C1').attr("checked", false); jQuery('#CAPITOL5_R511_C2').attr("checked", false);
                    jQuery('#CAPITOL5_R512_C1').attr("checked", false); jQuery('#CAPITOL5_R512_C2').attr("checked", false);
                    jQuery('#CAPITOL5_R513_C1').attr("checked", false); jQuery('#CAPITOL5_R513_C2').attr("checked", false);
                    jQuery('#CAPITOL5_R514_C1').attr("checked", false); jQuery('#CAPITOL5_R514_C2').attr("checked", false);
                    jQuery('#CAPITOL5_R515_C1').attr("checked", false); jQuery('#CAPITOL5_R515_C2').attr("checked", false);
                    jQuery('#CAPITOL5_R520_C1').attr("checked", false); jQuery('#CAPITOL5_R520_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R611_C1').attr("checked", false); jQuery('#CAPITOL6_R611_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R612_C1').attr("checked", false); jQuery('#CAPITOL6_R612_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R620_C1').attr("checked", false); jQuery('#CAPITOL6_R620_C2').attr("checked", false);
                    document.getElementById("CAPITOL6_R620_C1").value = "";
                    document.getElementById("CAPITOL6_R631_C1").value = "";
                    document.getElementById("CAPITOL6_R632_C1").value = "";
                    document.getElementById("CAPITOL6_R633_C1").value = "";
                    document.getElementById("CAPITOL6_R641_C1").value = "";
                    document.getElementById("CAPITOL6_R642_C1").value = "";
                    document.getElementById("CAPITOL6_R643_C1").value = "";
                    jQuery('#CAPITOL6_R651_C1').attr("checked", false); jQuery('#CAPITOL6_R651_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R652_C1').attr("checked", false); jQuery('#CAPITOL6_R652_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R653_C1').attr("checked", false); jQuery('#CAPITOL6_R653_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R654_C1').attr("checked", false); jQuery('#CAPITOL6_R654_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R660_C1').attr("checked", false); jQuery('#CAPITOL6_R660_C2').attr("checked", false);
                    document.getElementById("CAPITOL6_R670_C1").value = "";
                    jQuery('#CAPITOL6_R681_C1').attr("checked", false); jQuery('#CAPITOL6_R681_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R682_C1').attr("checked", false); jQuery('#CAPITOL6_R682_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R683_C1').attr("checked", false); jQuery('#CAPITOL6_R683_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R684_C1').attr("checked", false); jQuery('#CAPITOL6_R684_C2').attr("checked", false);
                    jQuery('#CAPITOL7_R710_C1').attr("checked", false); jQuery('#CAPITOL7_R710_C2').attr("checked", false);
                    jQuery('#CAPITOL7_R721_C1').attr("checked", false); jQuery('#CAPITOL7_R721_C2').attr("checked", false);
                    jQuery('#CAPITOL7_R722_C1').attr("checked", false); jQuery('#CAPITOL7_R722_C2').attr("checked", false);
                }
                else if (group == "CAPITOL1_R130_C1") {
                    jQuery('#CAPITOL2').show(); jQuery('#CAPITOL2_HEADER').show();
                    jQuery('#CAPITOL3').show(); jQuery('#CAPITOL3_HEADER').show();
                    jQuery('#CAPITOL4').show(); jQuery('#CAPITOL4_HEADER').show();
                    jQuery('#CAPITOL5').show(); jQuery('#CAPITOL5_HEADER').show(); jQuery('#CAPITOL5_HEADER_NOTE').show();
                    jQuery('#CAPITOL6').show(); jQuery('#CAPITOL6_HEADER').show(); jQuery('#CAPITOL6_HEADER_NOTE').show();
                    jQuery('#CAPITOL7').show(); jQuery('#CAPITOL7_HEADER').show(); jQuery('#CAPITOL7_HEADER_NOTE').show();
                    jQuery('#CAPITOL1_R140').show(); jQuery('#CAPITOL1_R141').show(); jQuery('#CAPITOL1_R150').show(); jQuery('#CAPITOL1_R161').show();
                    jQuery('#CAPITOL1_R162').show(); jQuery('#CAPITOL1_R163').show(); jQuery('#CAPITOL1_R164').show(); jQuery('#CAPITOL1_R165').show();
                    jQuery('#CAPITOL1_R170').show(); jQuery('#CAPITOL1_R180').show(); jQuery('#CAPITOL1_R181').show();
                }
                else if (group == "CAPITOL1_R150_C2") {
                    jQuery('#CAPITOL1_R160').hide(); jQuery('#CAPITOL1_R161').hide(); jQuery('#CAPITOL1_R162').hide(); jQuery('#CAPITOL1_R163').hide(); jQuery('#CAPITOL1_R164').hide();
                    jQuery('#CAPITOL1_R165').hide();
                    jQuery('#CAPITOL1_R161_C1').attr("checked", false); jQuery('#CAPITOL1_R162_C1').attr("checked", false);
                    jQuery('#CAPITOL1_R163_C1').attr("checked", false); jQuery('#CAPITOL1_R164_C1').attr("checked", false); jQuery('#CAPITOL1_R165_C1').attr("checked", false);
                }
                else if (group == "CAPITOL1_R150_C1") {
                    jQuery('#CAPITOL1_R160').show(); jQuery('#CAPITOL1_R161').show(); jQuery('#CAPITOL1_R162').show(); jQuery('#CAPITOL1_R163').show(); jQuery('#CAPITOL1_R164').show();
                    jQuery('#CAPITOL1_R165').show();
                }
                else if (group == "CAPITOL1_R170_C2") {
                    jQuery('#CAPITOL1_R180').hide(); jQuery('#CAPITOL1_R181').hide();
                    jQuery('#CAPITOL1_R180_C1').attr("checked", false); jQuery('#CAPITOL1_R180_C2').attr("checked", false);
                    document.getElementById("CAPITOL1_R181_C1").value = "";
                }
                else if (group == "CAPITOL1_R170_C1") {
                    jQuery('#CAPITOL1_R180').show(); jQuery('#CAPITOL1_R181').show();
                }
                else if (group == "CAPITOL3_R310_C2") {
                    jQuery('#CAPITOL3_R320').hide(); jQuery('#CAPITOL3_R321').hide(); jQuery('#CAPITOL3_R322').hide(); jQuery('#CAPITOL3_R323').hide();
                    jQuery('#CAPITOL3_R324').hide(); jQuery('#CAPITOL3_R325').hide(); jQuery('#CAPITOL3_R326').hide(); jQuery('#CAPITOL3_R327').hide();
                    jQuery('#CAPITOL3_R328').hide(); jQuery('#CAPITOL3_R329').hide(); jQuery('#CAPITOL3_R330').hide();
                    document.getElementById("CAPITOL6_R632_C1").value = "";
                    jQuery('#CAPITOL3_R321_C1').attr("checked", false); jQuery('#CAPITOL3_R321_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R322_C1').attr("checked", false); jQuery('#CAPITOL3_R322_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R323_C1').attr("checked", false); jQuery('#CAPITOL3_R323_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R324_C1').attr("checked", false); jQuery('#CAPITOL3_R324_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R325_C1').attr("checked", false); jQuery('#CAPITOL3_R325_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R326_C1').attr("checked", false); jQuery('#CAPITOL3_R326_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R327_C1').attr("checked", false); jQuery('#CAPITOL3_R327_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R328_C1').attr("checked", false); jQuery('#CAPITOL3_R328_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R329_C1').attr("checked", false); jQuery('#CAPITOL3_R329_C2').attr("checked", false);
                    jQuery('#CAPITOL3_R330_C1').attr("checked", false); jQuery('#CAPITOL3_R330_C2').attr("checked", false);
                }
                else if (group == "CAPITOL3_R310_C1") {
                    jQuery('#CAPITOL3_R320').show(); jQuery('#CAPITOL3_R321').show(); jQuery('#CAPITOL3_R322').show(); jQuery('#CAPITOL3_R323').show();
                    jQuery('#CAPITOL3_R324').show(); jQuery('#CAPITOL3_R325').show(); jQuery('#CAPITOL3_R326').show(); jQuery('#CAPITOL3_R327').show();
                    jQuery('#CAPITOL3_R328').show(); jQuery('#CAPITOL3_R329').show(); jQuery('#CAPITOL3_R330').show();
                }
                else if (jQuery('#CAPITOL6_R611_C2').is(':checked') && jQuery('#CAPITOL6_R612_C2').is(':checked')) {
                    jQuery('#CAPITOL6_R620').hide(); jQuery('#CAPITOL6_R630').hide(); jQuery('#CAPITOL6_R631').hide(); jQuery('#CAPITOL6_R632').hide(); jQuery('#CAPITOL6_R633').hide();
                    jQuery('#CAPITOL6_R640').hide(); jQuery('#CAPITOL6_R641').hide(); jQuery('#CAPITOL6_R642').hide(); jQuery('#CAPITOL6_R643').hide(); jQuery('#CAPITOL6_R650').hide();
                    jQuery('#CAPITOL6_R651').hide(); jQuery('#CAPITOL6_R652').hide(); jQuery('#CAPITOL6_R653').hide(); jQuery('#CAPITOL6_R654').hide();

                    document.getElementById("CAPITOL6_R620_C1").value = "";
                    document.getElementById("CAPITOL6_R631_C1").value = "";
                    document.getElementById("CAPITOL6_R632_C1").value = "";
                    document.getElementById("CAPITOL6_R633_C1").value = "";
                    document.getElementById("CAPITOL6_R641_C1").value = "";
                    document.getElementById("CAPITOL6_R642_C1").value = "";
                    document.getElementById("CAPITOL6_R643_C1").value = "";
                    jQuery('#CAPITOL6_R651_C1').attr("checked", false); jQuery('#CAPITOL6_R651_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R652_C1').attr("checked", false); jQuery('#CAPITOL6_R652_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R653_C1').attr("checked", false); jQuery('#CAPITOL6_R653_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R654_C1').attr("checked", false); jQuery('#CAPITOL6_R654_C2').attr("checked", false);
                }
                else if (jQuery('#CAPITOL6_R611_C1').is(':checked') || jQuery('#CAPITOL6_R612_C1').is(':checked')) {
                    jQuery('#CAPITOL6_R620').show(); jQuery('#CAPITOL6_R630').show(); jQuery('#CAPITOL6_R631').show(); jQuery('#CAPITOL6_R632').show(); jQuery('#CAPITOL6_R633').show();
                    jQuery('#CAPITOL6_R640').show(); jQuery('#CAPITOL6_R641').show(); jQuery('#CAPITOL6_R642').show(); jQuery('#CAPITOL6_R643').show(); jQuery('#CAPITOL6_R650').show();
                    jQuery('#CAPITOL6_R651').show(); jQuery('#CAPITOL6_R652').show(); jQuery('#CAPITOL6_R653').show(); jQuery('#CAPITOL6_R654').show();
                }
                if (group == "CAPITOL1_R140_C2") {
                    jQuery('#CAPITOL1_R141').hide();
                }
                else if (group == "CAPITOL1_R140_C1") {
                    jQuery('#CAPITOL1_R141').show();
                }
                if (group == "CAPITOL1_R180_C2") {
                    jQuery('#CAPITOL1_R181').hide();
                }
                else if (group == "CAPITOL1_R180_C1") {
                    jQuery('#CAPITOL1_R181').show();
                }
                if (group == "CAPITOL6_R660_C2") {
                    jQuery('#CAPITOL6_R670').hide(); jQuery('#CAPITOL6_R680').hide(); jQuery('#CAPITOL6_R681').hide(); jQuery('#CAPITOL6_R682').hide();
                    jQuery('#CAPITOL6_R683').hide(); jQuery('#CAPITOL6_R684').hide();
                    document.getElementById("CAPITOL6_R670_C1").value = "";
                    jQuery('#CAPITOL6_R681_C1').attr("checked", false); jQuery('#CAPITOL6_R681_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R682_C1').attr("checked", false); jQuery('#CAPITOL6_R682_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R683_C1').attr("checked", false); jQuery('#CAPITOL6_R683_C2').attr("checked", false);
                    jQuery('#CAPITOL6_R684_C1').attr("checked", false); jQuery('#CAPITOL6_R684_C2').attr("checked", false);
                }
                else if (group == "CAPITOL6_R660_C1") {
                    jQuery('#CAPITOL6_R670').show(); jQuery('#CAPITOL6_R680').show(); jQuery('#CAPITOL6_R681').show(); jQuery('#CAPITOL6_R682').show();
                    jQuery('#CAPITOL6_R683').show(); jQuery('#CAPITOL6_R684').show();
                }
            });
        }
    };
    function CAEMhide() {
        var state = jQuery(this).is(':checked');
        var CAEM = jQuery('#CAEM').val();
        var CAEMletter = CAEM.substr(0, 1);
        var a = CAEM.substr(0, 4);
        if ((caemFill.indexOf(CAEMletter) !== -1) || (CAEM.substr(0, 4) == 'S951')) {
            jQuery('#CAPITOL5').show(); jQuery('#CAPITOL5_HEADER').show(); jQuery('#CAPITOL5_HEADER_NOTE').show();
            jQuery('#CAPITOL6').show(); jQuery('#CAPITOL6_HEADER').show(); jQuery('#CAPITOL6_HEADER_NOTE').show();
            jQuery('#CAPITOL7').show(); jQuery('#CAPITOL7_HEADER').show(); jQuery('#CAPITOL7_HEADER_NOTE').show();
        }
        else {
            jQuery('#CAPITOL5').hide(); jQuery('#CAPITOL5_HEADER').hide(); jQuery('#CAPITOL5_HEADER_NOTE').hide();
            jQuery('#CAPITOL6').hide(); jQuery('#CAPITOL6_HEADER').hide(); jQuery('#CAPITOL6_HEADER_NOTE').hide();
            jQuery('#CAPITOL7').hide(); jQuery('#CAPITOL7_HEADER').hide(); jQuery('#CAPITOL7_HEADER_NOTE').hide();
        }
    }

    webform.validators.inf1 = function (v, allowOverpass) {
        var values = Drupal.settings.mywebform.values;

        if (!(jQuery('#CAPITOL1_R130_C1').is(':checked') || jQuery('#CAPITOL1_R130_C2').is(':checked'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R130_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.1. Rind.130 trebuie sa fie DA sau NU')
            });
        }

        if (jQuery('#CAPITOL1_R130_C1').is(':checked') && !(jQuery('#CAPITOL1_R140_C1').is(':checked') || jQuery('#CAPITOL1_R140_C2').is(':checked'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R140_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.2. Rind.130 este Da atunci Rind.140 trebuie sa fie DA sau NU')
            });
        }

        if (jQuery('#CAPITOL1_R130_C1').is(':checked') && !(jQuery('#CAPITOL1_R150_C1').is(':checked') || jQuery('#CAPITOL1_R150_C2').is(':checked'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R150_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.3. Rind.130 este Da atunci Rind.150 trebuie sa fie DA sau NU')
            });
        }

        if (jQuery('#CAPITOL1_R150_C1').is(':checked') && !(jQuery('#CAPITOL1_R170_C1').is(':checked') || jQuery('#CAPITOL1_R170_C2').is(':checked'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R170_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.4. Rind.150 este Da atunci Rind.170 trebuie sa fie DA sau NU')
            });
        }

        if (jQuery('#CAPITOL1_R170_C1').is(':checked') && !(jQuery('#CAPITOL1_R180_C1').is(':checked') || jQuery('#CAPITOL1_R180_C2').is(':checked'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R180_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.5. Rind.170 este Da atunci Rind.180 trebuie sa fie DA sau NU')
            });
        }

        if (values.CAPITOL1_R180_C1 == true && (values.CAPITOL1_R181_C1 == 0)) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R181_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.6. Rind.180 este Da atunci Rind.181 > 0')
            });
        }

        if (values.CAPITOL1_R140_C1 == true && (values.CAPITOL1_R141_C1 == 0)) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R141_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.7. Rind.140 este Da atunci Rind.141 > 0')
            });
        }

        if (values.CAPITOL1_R150_C1 == true && (values.CAPITOL1_R161_C1 == false && values.CAPITOL1_R162_C1 == false && values.CAPITOL1_R163_C1 == false &&
            values.CAPITOL1_R164_C1 == false && values.CAPITOL1_R165_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R161_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.8. Rind.150 este Da atunci unul din Rind.161,162,163,164,165 trebuie sa fie selectat')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL2_R210_C1 == true || values.CAPITOL2_R210_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R210_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.9. Rind.130 este Da atunci Rind.210 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL2_R221_C1 == true || values.CAPITOL2_R221_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R221_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.10. Rind.130 este Da atunci Rind.221 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL2_R222_C1 == true || values.CAPITOL2_R222_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R222_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.11. Rind.130 este Da atunci Rind.222 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL2_R223_C1 == true || values.CAPITOL2_R223_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R223_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.12. Rind.130 este Da atunci Rind.223 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL2_R224_C1 == true || values.CAPITOL2_R224_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL2_R224_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.13. Rind.130 este Da atunci Rind.224 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL3_R310_C1 == true || values.CAPITOL3_R310_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R310_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.14. Rind.130 este Da atunci Rind.310 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL3_R310_C1 == true && !(values.CAPITOL3_R321_C1 == true || values.CAPITOL3_R321_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R321_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.15. Rind.310 este Da atunci Rind.321 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL3_R310_C1 == true && !(values.CAPITOL3_R322_C1 == true || values.CAPITOL3_R322_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R322_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.16. Rind.310 este Da atunci Rind.322 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL3_R310_C1 == true && !(values.CAPITOL3_R323_C1 == true || values.CAPITOL3_R323_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R323_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.17. Rind.310 este Da atunci Rind.323 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL3_R310_C1 == true && !(values.CAPITOL3_R324_C1 == true || values.CAPITOL3_R324_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R324_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.18. Rind.310 este Da atunci Rind.324 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL3_R310_C1 == true && !(values.CAPITOL3_R325_C1 == true || values.CAPITOL3_R325_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R325_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.19. Rind.310 este Da atunci Rind.325 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL3_R310_C1 == true && !(values.CAPITOL3_R326_C1 == true || values.CAPITOL3_R326_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R326_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.20. Rind.310 este Da atunci Rind.326 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL3_R310_C1 == true && !(values.CAPITOL3_R327_C1 == true || values.CAPITOL3_R327_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R327_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.21. Rind.310 este Da atunci Rind.327 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL3_R310_C1 == true && !(values.CAPITOL3_R328_C1 == true || values.CAPITOL3_R328_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R328_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.22. Rind.310 este Da atunci Rind.328 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL3_R310_C1 == true && !(values.CAPITOL3_R329_C1 == true || values.CAPITOL3_R329_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R329_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.23. Rind.310 este Da atunci Rind.329 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL3_R310_C1 == true && !(values.CAPITOL3_R330_C1 == true || values.CAPITOL3_R330_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL3_R330_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.24. Rind.310 este Da atunci Rind.330 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R411_C1 == true || values.CAPITOL4_R411_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R411_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.25. Rind.130 este Da atunci Rind.411 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R412_C1 == true || values.CAPITOL4_R412_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R412_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.26. Rind.130 este Da atunci Rind.412 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R413_C1 == true || values.CAPITOL4_R413_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R413_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.27. Rind.130 este Da atunci Rind.413 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R414_C1 == true || values.CAPITOL4_R414_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R414_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.28. Rind.130 este Da atunci Rind.414 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R415_C1 == true || values.CAPITOL4_R415_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R415_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.29. Rind.130 este Da atunci Rind.415 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R416_C1 == true || values.CAPITOL4_R416_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R416_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.30. Rind.130 este Da atunci Rind.416 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R417_C1 == true || values.CAPITOL4_R417_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R417_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.31. Rind.130 este Da atunci Rind.417 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R418_C1 == true || values.CAPITOL4_R418_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R418_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.32. Rind.130 este Da atunci Rind.418 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R419_C1 == true || values.CAPITOL4_R419_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R419_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.33. Rind.130 este Da atunci Rind.419 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R420_C1 == true || values.CAPITOL4_R420_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R420_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.34. Rind.130 este Da atunci Rind.420 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R430_C1 == true || values.CAPITOL4_R430_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R430_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.35. Rind.130 este Da atunci Rind.430 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R421_C1 == true || values.CAPITOL4_R421_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R421_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.36. Rind.130 este Da atunci Rind.421 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R422_C1 == true || values.CAPITOL4_R422_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R422_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.37. Rind.130 este Da atunci Rind.422 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL4_R423_C1 == true || values.CAPITOL4_R423_C2 == true)) {
            webform.errors.push({
                'fieldName': 'CAPITOL4_R423_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.38. Rind.130 este Da atunci Rind.423 trebuie sa fie selectat DA sau NU')
            });
        }
        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL5_R511_C1 == true || values.CAPITOL5_R511_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {

            var caem = values.CAEM.substr(0, 1);
            webform.errors.push({
                'fieldName': 'CAPITOL5_R511_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.39. Rind.130 este Da atunci Rind.511 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL5_R512_C1 == true || values.CAPITOL5_R512_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R512_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.40. Rind.130 este Da atunci Rind.512 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL5_R513_C1 == true || values.CAPITOL5_R513_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R513_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.41. Rind.130 este Da atunci Rind.513 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL5_R514_C1 == true || values.CAPITOL5_R514_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R514_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.42. Rind.130 este Da atunci Rind.514 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL5_R515_C1 == true || values.CAPITOL5_R515_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R515_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.43. Rind.130 este Da atunci Rind.515 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL6_R611_C1 == true || values.CAPITOL6_R611_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R611_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.44. Rind.130 este Da atunci Rind.611 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL6_R612_C1 == true || values.CAPITOL6_R612_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R612_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.45. Rind.130 este Da atunci Rind.612 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R611_C1 == true && values.CAPITOL6_R620_C1 <= 0) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R620_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.46. Rind.611 este Da atunci Rind.620 > 0')
            });
        }

        if (values.CAPITOL6_R612_C1 == true && values.CAPITOL6_R620_C1 <= 0) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R620_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.47. Rind.612 este Da atunci Rind.620 > 0')
            });
        }

        if (values.CAPITOL6_R611_C1 == true && !(values.CAPITOL6_R631_C1 > 0 && values.CAPITOL6_R631_C1 <= 100)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R631_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.48-49. Rind.611 este Da atunci Rind.631 apartine intervalului [0-100]')
            });
        }

        if (values.CAPITOL6_R612_C1 == true && !(values.CAPITOL6_R632_C1 > 0 && values.CAPITOL6_R632_C1 <= 100)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R632_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.50-51. Rind.612 este Da atunci Rind.632 apartine intervalului [0-100]')
            });
        }

        if ((values.CAPITOL6_R611_C1 == true || values.CAPITOL6_R612_C1 == true) && values.CAPITOL6_R633_C1 != 100) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R633_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.52. Rind.611 este Da atunci Rind.633 = 100')
            });
        }

        if ((values.CAPITOL6_R611_C1 == true || values.CAPITOL6_R612_C1 == true) && values.CAPITOL6_R643_C1 != 100) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R643_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.53. Rind.611 este Da atunci Rind.643 = 100')
            });
        }

        if (values.CAPITOL6_R611_C1 == true && values.CAPITOL6_R643_C1 != 100) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R643_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.53-54. Rind.611 este Da atunci Rind.643 apartine intervalului [0-100]')
            });
        }
        /*
        if (values.CAPITOL6_R612_C1 == true && !(values.CAPITOL6_R642_C1 > 0 && values.CAPITOL6_R642_C1 < 100)) {
          webform.errors.push({
            'fieldName': 'CAPITOL6_R642_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 71-001.55-56. Rind.612 este Da atunci Rind.642 apartine intervalului [0-100]')
          });
        }
        */
        if (values.CAPITOL6_R611_C1 == true && (values.CAPITOL6_R651_C1 == false && values.CAPITOL6_R652_C1 == false && values.CAPITOL6_R653_C1 == false &&
            values.CAPITOL6_R654_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R651_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.58. Rind.611 este Da atunci unul din Rind.651,652,653,654 trebuie sa fie selectat DA')
            });
        }

        if (values.CAPITOL6_R612_C1 == true && (values.CAPITOL6_R651_C1 == false && values.CAPITOL6_R652_C1 == false && values.CAPITOL6_R653_C1 == false &&
            values.CAPITOL6_R654_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R651_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.59. Rind.612 este Da atunci unul din Rind.651,652,653,654 trebuie sa fie selectat DA')
            });
        }

        if (values.CAPITOL6_R660_C1 == true && values.CAPITOL6_R670_C1 <= 0) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R670_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.60. Rind.660 este Da atunci Rind.670 > 0')
            });
        }

        if (values.CAPITOL6_R660_C1 == true && (values.CAPITOL6_R681_C1 == false && values.CAPITOL6_R682_C1 == false && values.CAPITOL6_R683_C1 == false &&
            values.CAPITOL6_R684_C1 == false)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R681_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.61. Rind.660 este Da atunci unul din Rind.681,682,683,684 trebuie sa fie selectat DA')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL7_R710_C1 == true || values.CAPITOL7_R710_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL7_R710_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.62. Rind.130 este Da atunci Rind.710 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL7_R721_C1 == true || values.CAPITOL7_R721_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL7_R721_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.63. Rind.130 este Da atunci Rind.721 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL7_R722_C1 == true || values.CAPITOL7_R722_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL7_R722_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.64. Rind.130 este Da atunci Rind.722 trebuie sa fie selectat DA sau NU')
            });
        }

        var r141 = toFloat(values.CAPITOL1_R141_C1);
        var r120 = toFloat(values.CAPITOL1_R120_C1);
        if (r141 > r120) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R141_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.65. Rind.141 > Rind 120 (dar trebuie sa fie <=)')
            });
        }

        var r181 = toFloat(values.CAPITOL1_R181_C1);
        if (r181 > r120) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R181_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.66. Rind.181 > Rind 120 (dar trebuie sa fie <=)')
            });
        }

        var r110 = toFloat(values.CAPITOL1_R110_C1);
        var r111 = toFloat(values.CAPITOL1_R111_C1);
        var r112 = toFloat(values.CAPITOL1_R112_C1);
        var r113 = toFloat(values.CAPITOL1_R113_C1);
        if (r112 == 0 && r113 == 0 && r181 != 0) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R181_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.67. Rind.112 = 0 si Rind.113 = 0 si Rind 181 > 0 (dar Rind.181 trebuie sa fie 0)')
            });
        }

        //var r181 = toFloat(values.CAPITOL1_R181_C1);
        if (r181 > r141) {
            webform.errors.push({
                'fieldName': 'CAPITOL1_R181_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.68. Rind.181 > Rind 141 (dar trebuie sa fie <=)')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL6_R660_C1 == true || values.CAPITOL6_R660_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R660_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.69. Rind.130 este Da atunci Rind.660 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R611_C1 == true && !(values.CAPITOL6_R651_C1 == true || values.CAPITOL6_R651_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R651_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.70. Rind.611 este Da atunci Rind.651 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R611_C1 == true && !(values.CAPITOL6_R652_C1 == true || values.CAPITOL6_R652_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R652_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.71. Rind.611 este Da atunci Rind.652 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R611_C1 == true && !(values.CAPITOL6_R653_C1 == true || values.CAPITOL6_R653_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R653_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.72. Rind.611 este Da atunci Rind.653 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R611_C1 == true && !(values.CAPITOL6_R654_C1 == true || values.CAPITOL6_R654_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R654_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.73. Rind.611 este Da atunci Rind.654 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R612_C1 == true && !(values.CAPITOL6_R651_C1 == true || values.CAPITOL6_R651_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R651_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.74. Rind.611 este Da atunci Rind.651 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R612_C1 == true && !(values.CAPITOL6_R652_C1 == true || values.CAPITOL6_R652_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R652_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.75. Rind.611 este Da atunci Rind.652 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R612_C1 == true && !(values.CAPITOL6_R653_C1 == true || values.CAPITOL6_R653_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R653_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.76. Rind.611 este Da atunci Rind.653 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R612_C1 == true && !(values.CAPITOL6_R654_C1 == true || values.CAPITOL6_R654_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R654_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.77. Rind.611 este Da atunci Rind.654 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R660_C1 == true && !(values.CAPITOL6_R681_C1 == true || values.CAPITOL6_R681_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R681_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.78. Rind.660 este Da atunci Rind.681 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R660_C1 == true && !(values.CAPITOL6_R682_C1 == true || values.CAPITOL6_R682_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R682_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.79. Rind.660 este Da atunci Rind.682 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R660_C1 == true && !(values.CAPITOL6_R683_C1 == true || values.CAPITOL6_R683_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R683_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.80. Rind.660 este Da atunci Rind.683 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R660_C1 == true && !(values.CAPITOL6_R684_C1 == true || values.CAPITOL6_R684_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R684_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.81. Rind.660 este Da atunci Rind.684 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && !(values.CAPITOL5_R520_C1 == true || values.CAPITOL5_R520_C2 == true) && (caemFill.indexOf(values.CAEM.substr(0, 1)) !== -1 && !(values.CAEM.substr(0, 4) == 'S951'))) {
            webform.errors.push({
                'fieldName': 'CAPITOL5_R520_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.82. Rind.130 este Da atunci Rind.520 trebuie sa fie selectat DA sau NU')
            });
        }

        if (values.CAPITOL6_R611_C1 == true && !(values.CAPITOL6_R631_C1 > 0)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R631_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.83. Rind.611 este Da atunci Rind.631 > 0')
            });
        }

        if (values.CAPITOL6_R612_C1 == true && !(values.CAPITOL6_R632_C1 > 0)) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R632_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.84. Rind.612 este Da atunci unul din Rind.632 > 0')
            });
        }

        if (values.CAPITOL6_R611_C2 == true && values.CAPITOL6_R631_C1 > 0) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R631_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.85. Rind.611 este NU atunci Rind.631 = 0')
            });
        }

        if (values.CAPITOL6_R612_C2 == true && values.CAPITOL6_R632_C1 > 0) {
            webform.errors.push({
                'fieldName': 'CAPITOL6_R632_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.86. Rind.612 este NU atunci unul din Rind.632 = 0')
            });
        }

        /*if (values.CAPITOL1_R140_C2 == true && values.CAPITOL1_R170_C2 == false ) {
          webform.errors.push({
            'fieldName': 'CAPITOL1_R170_C2',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 71-001.87. Rind.140 este NU atunci Rind.170 trebuie sa fie NU')
          });
        }*/

        /*if (!(caemFill.indexOf(values.CAEM.substr(0,1)) && !(values.CAEM.substr(0,4) == 'S951'))) {
          webform.errors.push({
            'fieldName': 'CAPITOL1_R110_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 71-003. Capitolul 5,6,7 nu trebuie completat')
          });
        }*/
        var r900 = toFloat(values.CAPITOL7_R900_C1);
        if (!(r900 > 0 && r900 < 600)) {
            webform.errors.push({
                'fieldName': 'CAPITOL7_R900_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-001.88. Rind.900 trebuie sa apartina intervalului 0-600')
            });
        }


        if (r110 > r111) {
            webform.warnings.push({
                'fieldName': 'CAPITOL1_R111_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-002.01. Rind.110 > Rind 111 (dar trebuie sa fie <=)')
            });
        }

        if (r110 > r112) {
            webform.warnings.push({
                'fieldName': 'CAPITOL1_R112_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-002.02. Rind.110 > Rind 112 (dar trebuie sa fie <=)')
            });
        }

        if ((r111 > 0 || r112 > 0) && r141 == 0) {
            webform.warnings.push({
                'fieldName': 'CAPITOL1_R141_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-002.03. Rind.111 sau 112 > 0 atunci Rind 141 = 0 (dar trebuie sa fie > 0)')
            });
        }

        if ((r112 > 0 || r113 > 0) && r181 == 0) {
            webform.warnings.push({
                'fieldName': 'CAPITOL1_R181_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-002.04. Rind.112 sau 113 > 0 atunci Rind 181 = 0 (dar trebuie sa fie > 0)')
            });
        }

        /*if (!(values.CAPITOL7_R900_C1 > 0 && values.CAPITOL7_R900_C1 < 600)) {
          webform.warnings.push({
            'fieldName': 'CAPITOL7_R900_C1',
            'index': 0,
            'msg': Drupal.t('Cod eroare: 71-002.05-06. Rind.900 trebuie sa apartina intervalului 0-600')
          });
        }*/

        if (values.CAPITOL3_R310_C1 == true && (values.CAPITOL3_R321_C1 == false && values.CAPITOL3_R322_C1 == false && values.CAPITOL3_R323_C1 == false &&
            values.CAPITOL3_R324_C1 == false && values.CAPITOL3_R325_C1 == false && values.CAPITOL3_R326_C1 == false && values.CAPITOL3_R327_C1 == false &&
            values.CAPITOL3_R328_C1 == false && values.CAPITOL3_R329_C1 == false && values.CAPITOL3_R330_C1 == false)) {
            webform.warnings.push({
                'fieldName': 'CAPITOL3_R310_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-002.07. Rind.310 ati selectat DA dar Rind.321,322,323,324,325,326,327,328,329,330 nu aveti nici un DA')
            });
        }

        if (r110 == 0 && r111 == 0 && r112 == 0 && r113 == 0 && (r120 > 0 || r141 > 0 || r181 > 0)) {
            webform.warnings.push({
                'fieldName': 'CAPITOL1_R110_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-002.08. Rind.110,111,112,113 = 0 atunci Rind.120,141,181 trebuie sa fie 0')
            });
        }

        if ((r111 > 0 || r112 > 0) && r120 == 0) {
            webform.warnings.push({
                'fieldName': 'CAPITOL1_R120_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-002.09. Rind.111 sau 112 > 0 atunci Rind 120 = 0 (dar trebuie sa fie > 0)')
            });
        }

        if (values.CAPITOL1_R140_C2 == true && values.CAPITOL1_R170_C2 == false) {
            webform.warnings.push({
                'fieldName': 'CAPITOL1_R170_C2',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-002.10. Rind.140 ati selectat NU atunci Rind 170 trebuie sa fie NU')
            });
        }

        if (values.CAPITOL1_R130_C1 == true && (values.CAPITOL1_R150_C1 == false && values.CAPITOL1_R170_C1 == false)) {
            webform.warnings.push({
                'fieldName': 'CAPITOL1_R150_C1',
                'index': 0,
                'msg': Drupal.t('Cod eroare: 71-002.11. Rind.130 ati selectat DA atunci unul din Rind 150,170 trebuie sa fie DA')
            });
        }

        webform.validatorsStatus.inf1 = 1;
        validateWebform();
    };
})(jQuery)