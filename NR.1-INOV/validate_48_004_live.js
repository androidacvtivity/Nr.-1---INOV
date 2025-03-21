function validate_48_004_live() {
    let alertShown = false;

    function checkTotal() {
        const v1 = parseInt(jQuery('#CAPITOL1_R131_C1').val()) || 0;
        const v2 = parseInt(jQuery('#CAPITOL1_R132_C1').val()) || 0;
        const v3 = parseInt(jQuery('#CAPITOL1_R133_C1').val()) || 0;

        const total = v1 + v2 + v3;

        if (total !== 100 && !alertShown) {
            alertShown = true;
            alert(`Cod eroare: 48-004\nSuma valorilor 1.3.1 (${v1}) + 1.3.2 (${v2}) + 1.3.3 (${v3}) este ${total}, dar trebuie să fie exact 100.`);
        }

        if (total === 100) {
            alertShown = false; // Resetăm dacă devine valid
        }
    }

    // Ascultăm modificările prin evenimentul mywebform:sync
    jQuery('#mywebform-edit-form').on('mywebform:sync', '#CAPITOL1_R131_C1, #CAPITOL1_R132_C1, #CAPITOL1_R133_C1', checkTotal);

    // Verificare la inițializare
    checkTotal();
}
