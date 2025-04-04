// Analizeaza acest cod

function check_181_182_183_logic5() {
    jQuery('#CAPITOL1_R181_C2, #CAPITOL1_R182_C2, #CAPITOL1_R183_C2').change(function () {
        let rowID = jQuery(this).attr('id').replace('_C2', '_C1'); // Get corresponding input ID
        let inputField = jQuery(`#${rowID}`);

        if (jQuery(this).is(':checked')) {
            inputField.val(''); // Clear value
            inputField.prop('checked', false); // Uncheck
            inputField.prop('readonly', true); // Set as readonly
        } else {
            inputField.prop('readonly', false); // Remove readonly if unchecked
        }
    });
}

function toggle_181_182_183_logic5(values) {
    let rows = ["181", "182", "183"];

    rows.forEach(row => {
        let checkBoxID = `CAPITOL1_R${row}_C2`;
        let inputFieldID = `CAPITOL1_R${row}_C1`;

        if (values[checkBoxID] == '1') {
            let inputField = jQuery(`#${inputFieldID}`);
            inputField.val(''); // Clear value
            inputField.prop('checked', false); // Uncheck
            inputField.prop('readonly', true); // Set as readonly
        } else {
            jQuery(`#${inputFieldID}`).prop('readonly', false); // Remove readonly
        }
    });
}


//Si acum acesta 

function watchAutoSum_184() {
    const inputIDs = ['#CAPITOL1_R181_C1', '#CAPITOL1_R182_C1', '#CAPITOL1_R183_C1'];
    const targetID = '#CAPITOL1_R184_C1';

    function getFloatValue(selector) {
        const val = parseFloat(jQuery(selector).val());
        return isNaN(val) ? 0 : val;
    }

    function updateSum() {
        const total = inputIDs
            .map(getFloatValue)
            .reduce((sum, val) => sum + val, 0);

        if (total > 0) {
            jQuery(targetID).val(total.toFixed(1));
        } else {
            jQuery(targetID).val('');
        }
    }

    //  Culoare pe td și input
    const $cell = jQuery(targetID).closest('td');
    $cell.css({
        'background-color': '#ebe9e6',
        'padding': '4px'
    });

    jQuery(targetID).css({
        'background-color': 'transparent',
        'border': 'none',
        // 'font-weight': 'bold',
        'text-align': 'right'
    });



    jQuery(targetID).closest('td').css({
        'background-color': '#ebe9e6'
    });



    // 📡 listen all possible triggers
    const events = 'input change keyup blur';
    inputIDs.forEach(selector => {
        jQuery(selector).on(events, updateSum);
    });

    updateSum();
}






// Nu se face reautosuma in (CAPITOL1_R184_C1) cand se face click pe CAPITOL1_R183_C2 sau CAPITOL1_R182_C2 sau CAPITOL1_R181_C2