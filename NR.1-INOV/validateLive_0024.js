function watchLiveValidation_48_0024() {
    const targetField = '#CAPITOL4_R42_C1';
    const errorID = 'error-48-0024-live';
    const counterID = 'counter-48-0024';

    // Inițializează containerul pentru counter dacă nu există
    if (jQuery(`#${counterID}`).length === 0) {
        jQuery(targetField).after(`<div id="${counterID}" style="font-size: 0.85em; margin-top: 4px; color: #555;"></div>`);
    }

    function is111_112_valid() {
        return (
            jQuery('#CAPITOL1_R111_C1').is(':checked') || jQuery('#CAPITOL1_R111_C2').is(':checked')
        ) && (
                jQuery('#CAPITOL1_R112_C1').is(':checked') || jQuery('#CAPITOL1_R112_C2').is(':checked')
            );
    }

    function validateLive_0024() {
        jQuery(`#${errorID}`).remove();

        const textVal = jQuery(targetField).val()?.trim() || '';
        const len = textVal.length;

        // Counter vizual live
        jQuery(`#${counterID}`).text(`${len} / 7 caractere`);

        if (!is111_112_valid()) return;

        // ✅ Verificare: exact 7 caractere și NU este "Nu sunt"
        if (len === 7 && textVal.toLowerCase() !== 'nu sunt') {
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
                    Textul conține exact 7 caractere, dar nu este "Nu sunt". Verificați descrierea.
                </div>
            `;
            jQuery(targetField).after(errorMsg);
        }
    }

    jQuery(targetField).on('input', validateLive_0024);
    validateLive_0024();
}
