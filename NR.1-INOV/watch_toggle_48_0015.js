
// WatchLiveValidation for Cod eroare: 48-0015
function watchLiveValidation_48_0015() {
    jQuery('#CAPITOL1_R171_C1, #CAPITOL1_R172_C1, #CAPITOL1_R172_C2, #CAPITOL1_R173_C1, #CAPITOL1_R173_C2').on('change', function () {
        const r171_da = jQuery('#CAPITOL1_R171_C1').is(':checked');
        const r172_checked = jQuery('#CAPITOL1_R172_C1').is(':checked') || jQuery('#CAPITOL1_R172_C2').is(':checked');
        const r173_checked = jQuery('#CAPITOL1_R173_C1').is(':checked') || jQuery('#CAPITOL1_R173_C2').is(':checked');

        jQuery('#error-48-0015').remove();

        if (r171_da && !(r172_checked || r173_checked)) {
            const errorMsg = `
                <div id="error-48-0015" class="webform-inline-error" style="
                    color: red;
                    font-weight: bold;
                    margin-top: 6px;
                    padding: 6px 10px;
                    background-color: #fce4e4;
                    border: 1px solid #d32f2f;
                    border-radius: 4px;
                    display: inline-block;
                ">
                    Cod eroare: 48-0015. Completati Cap.1 Rindurile 1.7.2 si 1.7.3 – trebuie selectată cel puțin o opțiune.
                </div>
            `;
            jQuery('#CAPITOL1_R172_C1').closest('tr').after(errorMsg);
        }
    });
}

// Toggle for Cod eroare: 48-0015
function toggle_48_0015(values) {
    const r171_da = values.CAPITOL1_R171_C1 === '1';
    const r172_bifate = values.CAPITOL1_R172_C1 === '1' || values.CAPITOL1_R172_C2 === '1';
    const r173_bifate = values.CAPITOL1_R173_C1 === '1' || values.CAPITOL1_R173_C2 === '1';

    jQuery('#error-48-0015').remove();

    if (r171_da && !(r172_bifate || r173_bifate)) {
        const errorMsg = `
            <div id="error-48-0015" class="webform-inline-error" style="
                color: red;
                font-weight: bold;
                margin-top: 6px;
                padding: 6px 10px;
                background-color: #fce4e4;
                border: 1px solid #d32f2f;
                border-radius: 4px;
                display: inline-block;
            ">
                Cod eroare: 48-0015. Completati Cap.1 Rindurile 1.7.2 si 1.7.3 – trebuie selectată cel puțin o opțiune.
            </div>
        `;
        jQuery('#CAPITOL1_R172_C1').closest('tr').after(errorMsg);
    }
}
