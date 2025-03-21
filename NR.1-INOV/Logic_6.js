function check_184_logic5() {
    jQuery('#CAPITOL1_R181_C2, #CAPITOL1_R182_C2, #CAPITOL1_R183_C2, #CAPITOL1_R181_C1, #CAPITOL1_R182_C1, #CAPITOL1_R183_C1').on('change keyup', function () {
        applyLogic5_CAPITOL1_R184();
    });
}

function toggle_184_logic5(values) {
    let allNoChecked =
        values.CAPITOL1_R181_C2 == '1' &&
        values.CAPITOL1_R182_C2 == '1' &&
        values.CAPITOL1_R183_C2 == '1';

    let allEmpty =
        !values.CAPITOL1_R181_C1 &&
        !values.CAPITOL1_R182_C1 &&
        !values.CAPITOL1_R183_C1;

    if (allNoChecked || allEmpty) {
        let field = jQuery('#CAPITOL1_R184_C1');
        field.val('');
        field.prop('readonly', true);
    } else {
        jQuery('#CAPITOL1_R184_C1').prop('readonly', false);
    }
}

function applyLogic5_CAPITOL1_R184() {
    const r181C2 = jQuery('#CAPITOL1_R181_C2').is(':checked');
    const r182C2 = jQuery('#CAPITOL1_R182_C2').is(':checked');
    const r183C2 = jQuery('#CAPITOL1_R183_C2').is(':checked');

    const r181C1 = jQuery('#CAPITOL1_R181_C1').val().trim();
    const r182C1 = jQuery('#CAPITOL1_R182_C1').val().trim();
    const r183C1 = jQuery('#CAPITOL1_R183_C1').val().trim();

    const allNoChecked = r181C2 && r182C2 && r183C2;
    const allEmpty = r181C1 === '' && r182C1 === '' && r183C1 === '';

    if (allNoChecked || allEmpty) {
        let field = jQuery('#CAPITOL1_R184_C1');
        field.val('');
        field.prop('readonly', true);
    } else {
        jQuery('#CAPITOL1_R184_C1').prop('readonly', false);
    }
}


Drupal.behaviors.inov1.attach = function (context, settings) {
    var values = Drupal.settings.mywebform.values;

    check_111_112_logic4(values);     // Logic 4
    toggle_111_112_logic4(values);

    check_181_182_183_logic5();       // Existing Logic 5 rows 181–183
    toggle_181_182_183_logic5(values);

    check_184_logic5();               /
    toggle_184_logic5(values);
};
