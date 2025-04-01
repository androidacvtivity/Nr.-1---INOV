
function watchLiveValidation_48_0015() {
    jQuery('#CAPITOL1_R171_C1, #CAPITOL1_R171_C2, #CAPITOL1_R172_C1, #CAPITOL1_R172_C2, #CAPITOL1_R173_C1, #CAPITOL1_R173_C2').on('change', function () {
        const r171_da = jQuery('#CAPITOL1_R171_C1').is(':checked');
        const r171_nu = jQuery('#CAPITOL1_R171_C2').is(':checked');

        const r172_da = jQuery('#CAPITOL1_R172_C1').is(':checked');
        const r172_nu = jQuery('#CAPITOL1_R172_C2').is(':checked');
        const r173_da = jQuery('#CAPITOL1_R173_C1').is(':checked');
        const r173_nu = jQuery('#CAPITOL1_R173_C2').is(':checked');

        const r172_selected = r172_da || r172_nu;
        const r173_selected = r173_da || r173_nu;
        const both_da = r172_da && r173_da;
        const both_nu = r172_nu && r173_nu;

        jQuery('#error-48-0015').remove();

        if (r171_da && (!r172_selected || !r173_selected || both_da || both_nu)) {
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
                    Cod eroare: 48-0015. Dacă ați bifat DA la 1.7.1, trebuie completate cu DA sau NU rândurile 1.7.2 și 1.7.3. Nu pot fi ambele DA sau ambele NU.
                </div>
            `;
            jQuery('#CAPITOL1_R172_C1').closest('tr').after(errorMsg);
        }
    });
}

function toggle_48_0015(values) {
    const r171_da = values.CAPITOL1_R171_C1 === '1';
    const r171_nu = values.CAPITOL1_R171_C2 === '1';

    const r172_da = values.CAPITOL1_R172_C1 === '1';
    const r172_nu = values.CAPITOL1_R172_C2 === '1';
    const r173_da = values.CAPITOL1_R173_C1 === '1';
    const r173_nu = values.CAPITOL1_R173_C2 === '1';

    const r172_selected = r172_da || r172_nu;
    const r173_selected = r173_da || r173_nu;
    const both_da = r172_da && r173_da;
    const both_nu = r172_nu && r173_nu;

    jQuery('#error-48-0015').remove();

    if (r171_da && (!r172_selected || !r173_selected || both_da || both_nu)) {
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
                Cod eroare: 48-0015. Dacă ați bifat DA la 1.7.1, trebuie completate cu DA sau NU rândurile 1.7.2 și 1.7.3. Nu pot fi ambele DA sau ambele NU.
            </div>
        `;
        jQuery('#CAPITOL1_R172_C1').closest('tr').after(errorMsg);
    }
}
