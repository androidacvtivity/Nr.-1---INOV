function watch48_008_LiveValidation() {
    function checkAndDisplayError() {
        const r193 = jQuery('#CAPITOL1_R193_C1').is(':checked');

        const fields = [
            ['CAPITOL1_R1111_C1', 'CAPITOL1_R1111_C2'],
            ['CAPITOL1_R1112_C1', 'CAPITOL1_R1112_C2'],
            ['CAPITOL1_R1113_C1', 'CAPITOL1_R1113_C2']
        ];

        let incomplete = false;

        fields.forEach(([yesID, noID]) => {
            const yesChecked = jQuery(`#${yesID}`).is(':checked');
            const noChecked = jQuery(`#${noID}`).is(':checked');
            if (!yesChecked && !noChecked) {
                incomplete = true;
            }
        });

        const errorID = 'error-48-008';
        jQuery(`#${errorID}`).remove();

        if (r193 && incomplete) {
            const errorMsg = `<div id="${errorID}" class="error" style="color: red; margin-top: 4px;">
                Cod eroare: 48-008. Ați bifat “DA” la 1.9.3, dar nu ați completat toate opțiunile DA/NU pentru 1.11.1 - 1.11.3.
            </div>`;
            jQuery('#CAPITOL1_R193_C1').closest('td').append(errorMsg);
        }
    }

    // Bind la toate cele 4 checkboxuri implicate
    const ids = [
        'CAPITOL1_R193_C1',
        'CAPITOL1_R1111_C1', 'CAPITOL1_R1111_C2',
        'CAPITOL1_R1112_C1', 'CAPITOL1_R1112_C2',
        'CAPITOL1_R1113_C1', 'CAPITOL1_R1113_C2'
    ];

    ids.forEach(id => {
        jQuery(`#${id}`).on('change', checkAndDisplayError);
    });

    // Rulează și o dată la inițializare
    checkAndDisplayError();
}
