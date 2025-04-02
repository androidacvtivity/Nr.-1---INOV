
function validate48_0018() {
    const r111_da = jQuery('#CAPITOL1_R111_C1').is(':checked');
    const r111_nu = jQuery('#CAPITOL1_R111_C2').is(':checked');
    const r112_da = jQuery('#CAPITOL1_R112_C1').is(':checked');
    const r112_nu = jQuery('#CAPITOL1_R112_C2').is(':checked');

    const rows_15 = ['151', '152', '153', '154', '155', '156', '157'];
    const all_15_answered = rows_15.every(id =>
        jQuery(`#CAPITOL1_R${id}_C1`).is(':checked') || jQuery(`#CAPITOL1_R${id}_C2`).is(':checked')
    );

    const at_least_one_17_da = ['171', '174', '175', '176', '177'].some(id =>
        jQuery(`#CAPITOL1_R${id}_C1`).is(':checked')
    );

    const at_least_one_110 = ['1101', '1102', '1103'].some(id =>
        jQuery(`#CAPITOL1_R${id}_C1`).is(':checked')
    );

    const at_least_one_111 = ['1111', '1112', '1113'].some(id =>
        jQuery(`#CAPITOL1_R${id}_C1`).is(':checked') || jQuery(`#CAPITOL1_R${id}_C2`).is(':checked')
    );

    const any_112_checked = [
        '1121','1122','1123','1124','1125',
        '1126','1127','1128','1129'
    ].some(id =>
        jQuery(`#CAPITOL1_R${id}_C1`).is(':checked') ||
        jQuery(`#CAPITOL1_R${id}_C2`).is(':checked') ||
        jQuery(`#CAPITOL1_R${id}_C3`).is(':checked')
    );

    jQuery('#error-48-0018').remove();

    if (
        (r111_da || r111_nu) && (r112_da || r112_nu) &&
        all_15_answered &&
        at_least_one_17_da &&
        at_least_one_110 &&
        at_least_one_111 &&
        !any_112_checked
    ) {
        const errorMsg = `
            <div id="error-48-0018" class="webform-inline-error" style="
                color: red;
                font-weight: bold;
                margin-top: 6px;
                padding: 6px 10px;
                background-color: #fce4e4;
                border: 1px solid #d32f2f;
                border-radius: 4px;
                display: inline-block;
            ">
                Cod eroare: 48-0018. Completati Cap.1 Rindurile 1.12 – trebuie bifată cel puțin o opțiune.
            </div>
        `;
        jQuery('#CAPITOL1_R1121_C1').closest('tr').after(errorMsg);
    }
}
