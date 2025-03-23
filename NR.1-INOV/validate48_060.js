//  Live validation (în timp real)
function watchLiveValidation_48_060() {
    const errorID = 'error-48-060';

    const watchedSelectors = [
        '#CAPITOL1_R1111_C1', '#CAPITOL1_R1111_C2',
        '#CAPITOL1_R1112_C1', '#CAPITOL1_R1112_C2',
        '#CAPITOL1_R1113_C1', '#CAPITOL1_R1113_C2',
        ...Array.from({ length: 9 }, (_, i) => `#CAPITOL1_R112${i + 1}_C1`),
        ...Array.from({ length: 9 }, (_, i) => `#CAPITOL1_R112${i + 1}_C2`),
        ...Array.from({ length: 9 }, (_, i) => `#CAPITOL1_R112${i + 1}_C3`)
    ];

    jQuery(watchedSelectors.join(',')).on('change', function () {
        jQuery(`#${errorID}`).remove();
        if (shouldTrigger_48_060()) {
            const errorMsg = `
                <div id="${errorID}" class="webform-inline-error" style="
                    color: red;
                    font-weight: bold;
                    margin-top: 6px;
                    padding: 6px 10px;
                    background-color: #fce4e4;
                    border: 1px solid #d32f2f;
                    border-radius: 4px;
                    display: inline-block;
                ">
                    Cod eroare: 48-060. Ați bifat “DA” la 1.11.1 și/sau 1.11.2 și/sau 1.11.3, dar nu ați bifat nicio opțiune în 1.12.
                </div>
            `;
            jQuery('#CAPITOL1_R1111_C1').closest('tr').after(errorMsg);
        }
    });
}

//  Submit validation
function validate_48_060() {
    if (shouldTrigger_48_060()) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R1121_C1',
            weight: 1,
            msg: concatMessage(
                '48-060',
                'Capitol 1 – Cooperare și parteneriate',
                Drupal.t('Cod eroare: 48-060. Ați bifat “DA” la 1.11.1 și/sau 1.11.2 și/sau 1.11.3, dar nu ați bifat nicio opțiune în 1.12.')
            )
        });
    }
}

//  Condiție comună
function shouldTrigger_48_060() {
    const has111 = jQuery('#CAPITOL1_R1111_C1').is(':checked');
    const has112 = jQuery('#CAPITOL1_R1112_C1').is(':checked');
    const has113 = jQuery('#CAPITOL1_R1113_C1').is(':checked');

    const any111Checked = has111 || has112 || has113;

    const r112_checkboxes = [
        '#CAPITOL1_R1121_C1', '#CAPITOL1_R1121_C2', '#CAPITOL1_R1121_C3',
        '#CAPITOL1_R1122_C1', '#CAPITOL1_R1122_C2', '#CAPITOL1_R1122_C3',
        '#CAPITOL1_R1123_C1', '#CAPITOL1_R1123_C2', '#CAPITOL1_R1123_C3',
        '#CAPITOL1_R1124_C1', '#CAPITOL1_R1124_C2', '#CAPITOL1_R1124_C3',
        '#CAPITOL1_R1125_C1', '#CAPITOL1_R1125_C2', '#CAPITOL1_R1125_C3',
        '#CAPITOL1_R1126_C1', '#CAPITOL1_R1126_C2', '#CAPITOL1_R1126_C3',
        '#CAPITOL1_R1127_C1', '#CAPITOL1_R1127_C2', '#CAPITOL1_R1127_C3',
        '#CAPITOL1_R1128_C1', '#CAPITOL1_R1128_C2', '#CAPITOL1_R1128_C3',
        '#CAPITOL1_R1129_C1', '#CAPITOL1_R1129_C2', '#CAPITOL1_R1129_C3'
    ];

    const any112Checked = r112_checkboxes.some(sel => jQuery(sel).is(':checked'));

    return any111Checked && !any112Checked;
}
