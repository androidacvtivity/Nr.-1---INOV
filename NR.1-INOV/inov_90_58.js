(function ($) {
    var activity_options_default_value = '';
    Drupal.behaviors.inov1 = {
        attach: function (context, settings) {
            jQuery('input.numeric').on('keypress', function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });

            jQuery('input.float').on('keypress', function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });
            
            

            var values = Drupal.settings.mywebform.values;
            check_all(values);
            
            
            check_111_112(values);  //Logic 1
            toggle111_112(values);  //Logic 1 


            toggle151_157(values);  //Logic 2
            check_151_157(values);  //Logic 2

            toggle111_157_177(values);   //Logic 3
            check_111_157_177(values);   //Logic 3

            check_181_182_183_logic5();  // Logic 5 (Row 181, 182, 183)
            toggle_181_182_183_logic5(values); // Logic 5 (Row 181, 182, 183)

            check_184_logic5();               
            toggle_184_logic5(values);


            watchR134LiveValidation();
         
            check_111_1129(values);
            toggle111_1129(values);
          
            watchLiveValidation_48_0001();
         
            toggle111_112_required();

            watchLiveValidation_A09();
            toggle_A09(values);
          

            watchLiveValidation_48_0006_0007();
            toggle_48_0006_0007(values);

            

        }

    }


})(jQuery)


//----------------------------------------------------------------
function watchLiveValidation_48_0006_0007() {
    jQuery('#CAPITOL1_R131_C1, #CAPITOL1_R132_C1, #CAPITOL1_R121_C1, #CAPITOL1_R122_C1').on('input change', function () {
        const errorID_6 = 'error-48-0006';
        const errorID_7 = 'error-48-0007';

        const r131_val = parseInt(jQuery('#CAPITOL1_R131_C1').val()) || 0;
        const r132_val = parseInt(jQuery('#CAPITOL1_R132_C1').val()) || 0;

        const r121_checked = jQuery('#CAPITOL1_R121_C1').is(':checked');
        const r122_checked = jQuery('#CAPITOL1_R122_C1').is(':checked');

        jQuery(`#${errorID_6}, #${errorID_7}`).remove(); // remove old messages

        if (r131_val > 0 && !r121_checked) {
            jQuery('#CAPITOL1_R121_C1').closest('td').append(`
                <div id="${errorID_6}" class="webform-inline-error" style="margin-top: 4px; color: red;">
                    Cod eroare 48-0006. Completati Cap.1 Rindurile 1.2.1 "DA"
                </div>
            `);
        }

        if (r132_val > 0 && !r122_checked) {
            jQuery('#CAPITOL1_R122_C1').closest('td').append(`
                <div id="${errorID_7}" class="webform-inline-error" style="margin-top: 4px; color: red;">
                    Cod eroare 48-0007. Completati Cap.1 Rindurile 1.2.2 "DA"
                </div>
            `);
        }
    });
}

function toggle_48_0006_0007(values) {
    const errorID6 = 'error-48-0006';
    const errorID7 = 'error-48-0007';

    const r111_c2 = values.CAPITOL1_R111_C2 == '1';
    const r112_c2 = values.CAPITOL1_R112_C2 == '1';

    const r131_val = parseInt(values.CAPITOL1_R131_C1) || 0;
    const r132_val = parseInt(values.CAPITOL1_R132_C1) || 0;

    const r121_checked = values.CAPITOL1_R121_C1 == '1';
    const r122_checked = values.CAPITOL1_R122_C1 == '1';

    const bothNotChecked = r111_c2 && r112_c2;

    jQuery(`#${errorID6}, #${errorID7}`).remove();

    if (!bothNotChecked && r131_val > 0 && !r121_checked) {
        jQuery('#CAPITOL1_R121_C1').closest('td').append(`
            <div id="${errorID6}" class="webform-inline-error" style="margin-top: 4px; color: red;">
                Cod eroare 48-0006. Completati Cap.1 Rindurile 1.2.1 "DA"
            </div>
        `);
    }

    if (!bothNotChecked && r132_val > 0 && !r122_checked) {
        jQuery('#CAPITOL1_R122_C1').closest('td').append(`
            <div id="${errorID7}" class="webform-inline-error" style="margin-top: 4px; color: red;">
                Cod eroare 48-0007. Completati Cap.1 Rindurile 1.2.2 "DA"
            </div>
        `);
    }
}


//------------------------------------------------------------------

function watchLiveValidation_A09() {
    const inputSelector = '#PHONE';
    const errorID = 'error-A09';

    function showError(msg) {
        jQuery(`#${errorID}`).remove();
        const error = `<div id="${errorID}" class="webform-inline-error" style="
            color: red;
            font-weight: bold;
            margin-top: 6px;
            padding: 6px 10px;
            background-color: #fce4e4;
            border: 1px solid #d32f2f;
            border-radius: 4px;
            display: inline-block;
        ">${msg}</div>`;
        jQuery(inputSelector).after(error);
    }

    function validatePhoneLive() {
        const phone = jQuery(inputSelector).val().trim();
        jQuery(`#${errorID}`).remove();

        if (!/^[0-9]{9}$/.test(phone)) {
            showError('A.09 – Introduceți doar un număr de telefon format din 9 cifre');
        } else if (phone[0] !== '0') {
            showError('A.09 – Prima cifră a numărului de telefon trebuie să fie 0');
        }
    }

    jQuery(inputSelector).on('input blur', validatePhoneLive);
}

function toggle_A09(values) {
    const phone = values.PHONE || '';
    const errorID = 'error-A09';

    jQuery(`#${errorID}`).remove();

    if (!/^[0-9]{9}$/.test(phone)) {
        const errorMsg = 'A.09 – Introduceți doar un număr de telefon format din 9 cifre';
        jQuery('#PHONE').after(`<div id="${errorID}" class="webform-inline-error" style="
            color: red;
            font-weight: bold;
            margin-top: 6px;
            padding: 6px 10px;
            background-color: #fce4e4;
            border: 1px solid #d32f2f;
            border-radius: 4px;
            display: inline-block;
        ">${errorMsg}</div>`);
    } else if (phone[0] !== '0') {
        const errorMsg = 'A.09 – Prima cifră a numărului de telefon trebuie să fie 0';
        jQuery('#PHONE').after(`<div id="${errorID}" class="webform-inline-error" style="
            color: red;
            font-weight: bold;
            margin-top: 6px;
            padding: 6px 10px;
            background-color: #fce4e4;
            border: 1px solid #d32f2f;
            border-radius: 4px;
            display: inline-block;
        ">${errorMsg}</div>`);
    }
}


//-------------------------------------------------------------

function watchLiveValidation_48_0001() {
    const errorID = 'error-48-0001';

    function showError(message) {
        jQuery(`#${errorID}`).remove();
        const errorHtml = `
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
                ${message}
            </div>
        `;
        jQuery('#CAPITOL1_R111_C1').closest('tr').after(errorHtml);
    }

    function validate() {
        const r111_da = jQuery('#CAPITOL1_R111_C1').is(':checked');
        const r111_nu = jQuery('#CAPITOL1_R111_C2').is(':checked');
        const r112_da = jQuery('#CAPITOL1_R112_C1').is(':checked');
        const r112_nu = jQuery('#CAPITOL1_R112_C2').is(':checked');

        const r111_selected = r111_da || r111_nu;
        const r112_selected = r112_da || r112_nu;

        jQuery(`#${errorID}`).remove();

        if (!r111_selected && !r112_selected) {
            showError('Cod eroare: 48-0001. Trebuie să fie selectate rândurile 1.1.1 și 1.1.2 – Bifați opțiunea DA sau NU.');
        } else if ((r111_selected && !r112_selected) || (!r111_selected && r112_selected)) {
            showError('Cod eroare: 48-0001. Dacă ați selectat un rând, trebuie completat și celălalt (1.1.1 și 1.1.2).');
        }
    }

    jQuery('#CAPITOL1_R111_C1, #CAPITOL1_R111_C2, #CAPITOL1_R112_C1, #CAPITOL1_R112_C2').on('change', validate);
}


function toggle111_112_required() {
    const errorID = 'error-48-0001';

    function showError(message) {
        jQuery(`#${errorID}`).remove();
        const errorHtml = `
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
                ${message}
            </div>
        `;
        jQuery('#CAPITOL1_R111_C1').closest('tr').after(errorHtml);
    }

    const r111_da = jQuery('#CAPITOL1_R111_C1').is(':checked');
    const r111_nu = jQuery('#CAPITOL1_R111_C2').is(':checked');
    const r112_da = jQuery('#CAPITOL1_R112_C1').is(':checked');
    const r112_nu = jQuery('#CAPITOL1_R112_C2').is(':checked');

    const r111_selected = r111_da || r111_nu;
    const r112_selected = r112_da || r112_nu;

    jQuery(`#${errorID}`).remove();

    if (!r111_selected && !r112_selected) {
        showError('Cod eroare: 48-0001. Trebuie să fie selectate rândurile 1.1.1 și 1.1.2 – Bifați opțiunea DA sau NU.');
    } else if ((r111_selected && !r112_selected) || (!r111_selected && r112_selected)) {
        showError('Cod eroare: 48-0001. Dacă ați selectat un rând, trebuie completat și celălalt (1.1.1 și 1.1.2).');
    }
}

//-----------------------------------------------------------


//-----------------------------------------------------



//----------------------------------------------------------------
function watchLiveValidation_48_008() {
    const checkAndShowError = () => {
        const r193 = jQuery('#CAPITOL1_R193_C1').is(':checked');

        const r1111_c1 = jQuery('#CAPITOL1_R1111_C1').is(':checked');
        const r1111_c2 = jQuery('#CAPITOL1_R1111_C2').is(':checked');
        const r1112_c1 = jQuery('#CAPITOL1_R1112_C1').is(':checked');
        const r1112_c2 = jQuery('#CAPITOL1_R1112_C2').is(':checked');
        const r1113_c1 = jQuery('#CAPITOL1_R1113_C1').is(':checked');
        const r1113_c2 = jQuery('#CAPITOL1_R1113_C2').is(':checked');

        const incomplete =
            !(r1111_c1 || r1111_c2) ||
            !(r1112_c1 || r1112_c2) ||
            !(r1113_c1 || r1113_c2);

        const errorID = 'error-48-008';
        jQuery(`#${errorID}`).remove();

        if (r193 && incomplete) {
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
                    Cod eroare: 48-008. Ați bifat “DA” la 1.9.3, dar nu ați completat toate opțiunile DA/NU pentru 1.11.1 – 1.11.3.
                </div>
            `;
            jQuery('#CAPITOL1_R193_C1').closest('tr').after(errorMsg);
        }
    };

    // Ascultăm TOATE checkbox-urile relevante
    const fields = [
        '#CAPITOL1_R193_C1',
        '#CAPITOL1_R1111_C1', '#CAPITOL1_R1111_C2',
        '#CAPITOL1_R1112_C1', '#CAPITOL1_R1112_C2',
        '#CAPITOL1_R1113_C1', '#CAPITOL1_R1113_C2'
    ];

    fields.forEach(selector => {
        jQuery(selector).on('change', checkAndShowError);
    });
}

//---------------------------------------------
function check_111_1129(values) {
    jQuery('input[type=checkbox]').change(function () {
        if (jQuery('#CAPITOL1_R1111_C2').is(':checked') && jQuery('#CAPITOL1_R1112_C2').is(':checked')  ) {
            // Hide 1.6 and move to 1.7
            jQuery('#CAPITOL1_R1113,  #CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R112H7, #CAPITOL1_R112H8, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129').hide();

            // Clear input values


            var inputIDs = [
               
                "CAPITOL1_R1113_C1", "CAPITOL1_R1113_C2",
                "CAPITOL1_R1121_C1", "CAPITOL1_R1121_C2", "CAPITOL1_R1121_C3",
                "CAPITOL1_R1122_C1", "CAPITOL1_R1122_C2", "CAPITOL1_R1122_C3",
                "CAPITOL1_R1123_C1", "CAPITOL1_R1123_C2", "CAPITOL1_R1123_C3",
                "CAPITOL1_R1124_C1", "CAPITOL1_R1124_C2", "CAPITOL1_R1124_C3",
                "CAPITOL1_R1125_C1", "CAPITOL1_R1125_C2", "CAPITOL1_R1125_C3",
                "CAPITOL1_R1126_C1", "CAPITOL1_R1126_C2", "CAPITOL1_R1126_C3",
                "CAPITOL1_R1127_C1", "CAPITOL1_R1127_C2", "CAPITOL1_R1127_C3",
                "CAPITOL1_R1128_C1", "CAPITOL1_R1128_C2", "CAPITOL1_R1128_C3",
                "CAPITOL1_R1129_C1", "CAPITOL1_R1129_C2", "CAPITOL1_R1129_C3"
            ];

            inputIDs.forEach(function (id) {
                var element = document.getElementById(id);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = false;
                    } else {
                        element.value = '';
                    }
                }
            });


        } else {
            // Show elements of 1.6
            jQuery('#CAPITOL1_R1113, #CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R112H7, #CAPITOL1_R112H8, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129').show();
        }
    });
}


function toggle111_1129(values) {
    if (jQuery('#CAPITOL1_R1111_C2').is(':checked') && jQuery('#CAPITOL1_R1112_C2').is(':checked')
    ) {
        jQuery('#CAPITOL1_R1113, #CAPITOL1_R111H5, #CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R112H7, #CAPITOL1_R112H8, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129').hide();

        var inputIDs = [
          
            "CAPITOL1_R1113_C1", "CAPITOL1_R1113_C2",
            "CAPITOL1_R1121_C1", "CAPITOL1_R1121_C2", "CAPITOL1_R1121_C3",
            "CAPITOL1_R1122_C1", "CAPITOL1_R1122_C2", "CAPITOL1_R1122_C3",
            "CAPITOL1_R1123_C1", "CAPITOL1_R1123_C2", "CAPITOL1_R1123_C3",
            "CAPITOL1_R1124_C1", "CAPITOL1_R1124_C2", "CAPITOL1_R1124_C3",
            "CAPITOL1_R1125_C1", "CAPITOL1_R1125_C2", "CAPITOL1_R1125_C3",
            "CAPITOL1_R1126_C1", "CAPITOL1_R1126_C2", "CAPITOL1_R1126_C3",
            "CAPITOL1_R1127_C1", "CAPITOL1_R1127_C2", "CAPITOL1_R1127_C3",
            "CAPITOL1_R1128_C1", "CAPITOL1_R1128_C2", "CAPITOL1_R1128_C3",
            "CAPITOL1_R1129_C1", "CAPITOL1_R1129_C2", "CAPITOL1_R1129_C3"
        ];

        inputIDs.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = false;
                } else {
                    element.value = '';
                }
            }
        });
    } else {
        jQuery('#CAPITOL1_R1113, #CAPITOL1_R111H5, #CAPITOL1_R112H1, #CAPITOL1_R112H2, #CAPITOL1_R112H3, #CAPITOL1_R112H4, #CAPITOL1_R112H5, #CAPITOL1_R112H6, #CAPITOL1_R112H7, #CAPITOL1_R112H8, #CAPITOL1_R1121, #CAPITOL1_R1122, #CAPITOL1_R1123, #CAPITOL1_R1124, #CAPITOL1_R1125, #CAPITOL1_R1126, #CAPITOL1_R1127, #CAPITOL1_R1128, #CAPITOL1_R1129').show();
    }
}



//----------------------------------------------------

//---------------------------------------------------------------

function watch48_005LiveValidation() {
    const errorBoxId = 'CAPITOL1_R171_C1_error_48_005';

    // Creează div de eroare vizuală dacă nu există
    if (!document.getElementById(errorBoxId)) {
        const errorDiv = document.createElement('div');
        errorDiv.id = errorBoxId;
        errorDiv.style.color = 'red';
        errorDiv.style.fontWeight = 'bold';
        errorDiv.style.marginTop = '4px';
        errorDiv.style.display = 'none';

        const field = document.getElementById('CAPITOL1_R171_C1');
        if (field) field.parentNode.appendChild(errorDiv);
    }

    function checkAndDisplayError() {
        const r171_checked = jQuery('#CAPITOL1_R171_C1').is(':checked');
        const r172_c1 = jQuery('#CAPITOL1_R172_C1').is(':checked');
        const r172_c2 = jQuery('#CAPITOL1_R172_C2').is(':checked');
        const r173_c1 = jQuery('#CAPITOL1_R173_C1').is(':checked');
        const r173_c2 = jQuery('#CAPITOL1_R173_C2').is(':checked');

        const r172_has_value = r172_c1 || r172_c2;
        const r173_has_value = r173_c1 || r173_c2;

        const no_172_173 = !r172_has_value && !r173_has_value;

        const errorBox = document.getElementById(errorBoxId);
        const field = document.getElementById('CAPITOL1_R171_C1');

        if (!errorBox || !field) return;

        // Caz 1: bifat 1.7.1 dar nimic în 1.7.2 sau 1.7.3
        if (r171_checked && no_172_173) {
            errorBox.textContent = 'Cod eroare: 48-005 – Ați bifat “DA” la 1.7.1, dar nu ați completat nici Rândul 1.7.2 și nici 1.7.3.';
            errorBox.style.display = 'block';
            field.classList.add('has-error');
        }
        // Caz 2: completat 1.7.2 / 1.7.3 dar 1.7.1 nu e bifat
        else if (!r171_checked && (r172_has_value || r173_has_value)) {
            errorBox.textContent = 'Cod eroare: 48-005 – Ați completat 1.7.2 sau 1.7.3 fără să fi bifat “DA” la 1.7.1.';
            errorBox.style.display = 'block';
            field.classList.add('has-error');
        }
        // Totul valid
        else {
            errorBox.textContent = '';
            errorBox.style.display = 'none';
            field.classList.remove('has-error');
        }
    }

    // Ascultă toate câmpurile implicate
    const ids = [
        '#CAPITOL1_R171_C1',
        '#CAPITOL1_R172_C1', '#CAPITOL1_R172_C2',
        '#CAPITOL1_R173_C1', '#CAPITOL1_R173_C2'
    ];

    ids.forEach(id => {
        jQuery(id).on('change', checkAndDisplayError);
    });

    checkAndDisplayError(); // Validare la inițializare
}





// ----------------------------------------------------------
function validate48_005() {
    var r171_checked = jQuery('#CAPITOL1_R171_C1').is(':checked');

    var r172_c1 = jQuery('#CAPITOL1_R172_C1').is(':checked');
    var r172_c2 = jQuery('#CAPITOL1_R172_C2').is(':checked');
    var r173_c1 = jQuery('#CAPITOL1_R173_C1').is(':checked');
    var r173_c2 = jQuery('#CAPITOL1_R173_C2').is(':checked');

    var r172_has_value = r172_c1 || r172_c2;
    var r173_has_value = r173_c1 || r173_c2;

    var no_172_173 = !r172_has_value && !r173_has_value;

    // ➤ Caz 1: Ai bifat 1.7.1 = DA dar nu ai completat nimic în 1.7.2 / 1.7.3
    if (r171_checked && no_172_173) {
        webform.warnings.push({
            fieldName: 'CAPITOL1_R171_C1',
            weight: 1,
            msg: concatMessage(
                '48-005',
                'Rândul 1.7.1 – Activități CD',
                Drupal.t('Cod eroare: 48-005. Ați bifat “DA” la Rândul 1.7.1, dar nu ați completat nici Rândul 1.7.2 și nici 1.7.3. Trebuie bifat cel puțin un câmp în 1.7.2 sau 1.7.3.')
            )
        });
    }

    // ➤ Caz 2: Ai completat 1.7.2 / 1.7.3 dar NU ai bifat 1.7.1 = DA
    if (!r171_checked && (r172_has_value || r173_has_value)) {
        webform.warnings.push({
            fieldName: 'CAPITOL1_R171_C1',
            weight: 1,
            msg: concatMessage(
                '48-005',
                'Rândul 1.7.1 – Activități CD',
                Drupal.t('Cod eroare: 48-005. Ați completat Rândul 1.7.2 sau 1.7.3 fără să fi bifat “DA” la Rândul 1.7.1.')
            )
        });
    }
}


//  ---------------------------------------------------

function watchR134LiveValidation() {
    const fieldTargetId = 'CAPITOL1_R134_C1';
    const sourceIDs = ['CAPITOL1_R131_C1', 'CAPITOL1_R132_C1', 'CAPITOL1_R133_C1'];
    const errorDivId = `${fieldTargetId}_error`;

    // Creează mesajul de eroare dacă nu există
    if (!document.getElementById(errorDivId)) {
        const errorDiv = document.createElement('div');
        errorDiv.id = errorDivId;
        errorDiv.style.color = 'red';
        errorDiv.style.fontWeight = 'bold';
        errorDiv.style.marginTop = '4px';
        errorDiv.style.display = 'none';

        const targetField = document.getElementById(fieldTargetId);
        if (targetField) targetField.parentNode.appendChild(errorDiv);
    }

    function validateTotal() {
        const v1 = parseInt(jQuery('#CAPITOL1_R131_C1').val()) || 0;
        const v2 = parseInt(jQuery('#CAPITOL1_R132_C1').val()) || 0;
        const v3 = parseInt(jQuery('#CAPITOL1_R133_C1').val()) || 0;
        const total = v1 + v2 + v3;

        const field = document.getElementById(fieldTargetId);
        const errorBox = document.getElementById(errorDivId);

        if (!field || !errorBox) return;

        if (total !== 100 && total !== 0) {
            errorBox.textContent = `Cod eroare: 48-004 – Totalul 1.3.1 (${v1}) + 1.3.2 (${v2}) + 1.3.3 (${v3}) este ${total}, trebuie să fie exact 100.`;
            errorBox.style.display = 'block';
            field.classList.add('has-error');
        } else {
            errorBox.style.display = 'none';
            errorBox.textContent = '';
            field.classList.remove('has-error');
        }
    }

    // Ascultă modificările pentru toate cele 3 câmpuri
    sourceIDs.forEach(id => {
        jQuery(`#${id}`).on('input', validateTotal);
    });

    // Validare inițială la încărcare
    validateTotal();
}

//



//

webform.validators.inov1 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;
    
    validatePhoneNumber(values.PHONE);
    
    check_111_112(values);

    check_151_157(values);
    check_111_157_177(values);   //Logic 3
    check_184_logic5();     
    check_181_182_183_logic5();  // Logic 5 (Row 181, 182, 183)

    check_111_157_177(values);

    validate48_007();
    validate48_004();

    validate48_005();
    validate48_006();

    validate48_008(); 

    validate48_0001();

    validate48_0002();

    validate48_0003();

    validate48_0004();

    validate48_0005();

    validate48_0006_0007();

    validate48_0008();
  

    

    //Sort warnings & errors
    webform.warnings.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.errors.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.validatorsStatus['inov1'] = 1;
    validateWebform();

}

//---------------------------------------------------------------------------------------
//Your version is not correct. I modified the code a little. This is correct according to our logic.
function validate48_0008() {
    const r111_c2 = jQuery('#CAPITOL1_R111_C2').is(':checked');
    const r112_c2 = jQuery('#CAPITOL1_R112_C2').is(':checked');
    const r121_c2 = jQuery('#CAPITOL1_R121_C2').is(':checked');
    const r122_c2 = jQuery('#CAPITOL1_R122_C2').is(':checked');

    const r121_c1 = jQuery('#CAPITOL1_R121_C1').is(':checked');
    const r122_c1 = jQuery('#CAPITOL1_R122_C1').is(':checked');

    const r131_val = parseInt(jQuery('#CAPITOL1_R131_C1').val()) || 0;
    const r132_val = parseInt(jQuery('#CAPITOL1_R132_C1').val()) || 0;

    const r141 = jQuery('#CAPITOL1_R141_C1').is(':checked');
    const r142 = jQuery('#CAPITOL1_R142_C1').is(':checked');
    const r143 = jQuery('#CAPITOL1_R143_C1').is(':checked');
    const r144 = jQuery('#CAPITOL1_R144_C1').is(':checked');

    const logic_1_1_valid = r111_c2 && r112_c2;
    const logic_1_2_valid = r121_c2 && r122_c2;

    const suma_valida = (r121_c1 && r131_val > 0) || (r122_c1 && r132_val > 0);
    const niciunul_selectat_1_4 = !(r141 || r142 || r143 || r144);

    if (!logic_1_1_valid && !logic_1_2_valid && suma_valida && niciunul_selectat_1_4) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R141_C1',
            weight: 8,
            msg: concatMessage(
                '48-0008',
                'Întrebarea 1.4 – Dezvoltarea produselor',
                Drupal.t('Cod eroare 48-0008. Completati Cap.1 Rindurile 1.4 – trebuie selectată cel puțin o opțiune.')
            )
        });
    }
}

//--------------------------------------------------------------------------------------

function validate48_0005() {
    const r111_c2 = jQuery('#CAPITOL1_R111_C2').is(':checked'); // 1.1.1 NU
    const r112_c2 = jQuery('#CAPITOL1_R112_C2').is(':checked'); // 1.1.2 NU
    const r122_c1 = jQuery('#CAPITOL1_R122_C1').is(':checked'); // 1.1.2 DA

    const r132_val_raw = jQuery('#CAPITOL1_R132_C1').val();
    let r132_val = parseInt(r132_val_raw, 10);

    // dacă valoarea este necompletată sau NaN, o considerăm 0
    if (isNaN(r132_val)) {
        r132_val = 0;
    }

    const bothNotChecked = r111_c2 && r112_c2;
    const valInvalid = r132_val <= 0;

    if (!bothNotChecked && r122_c1 && valInvalid) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R132_C1',
            weight: 3,
            msg: concatMessage(
                '48-0004',
                'Întrebarea 1.3.2 – Suma cheltuielilor',
                Drupal.t('Cod eroare: 48-0004. Completati Cap.1 Rindurile 1.3.2 - "suma"')
            )
        });
    }
}


//--------------------------------------------------------------------------------------

function validate48_0006_0007() {

    const r111_c2 = jQuery('#CAPITOL1_R111_C2').is(':checked'); // 1.1.1 NU
    const r112_c2 = jQuery('#CAPITOL1_R112_C2').is(':checked'); // 1.1.2 NU

    const bothNotChecked = r111_c2 && r112_c2;

    const r131_val = parseInt(jQuery('#CAPITOL1_R131_C1').val()) || 0;
    const r132_val = parseInt(jQuery('#CAPITOL1_R132_C1').val()) || 0;

    const r121_checked = jQuery('#CAPITOL1_R121_C1').is(':checked');
    const r122_checked = jQuery('#CAPITOL1_R122_C1').is(':checked');

    if (!bothNotChecked &&  r131_val > 0 && !r121_checked) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R121_C1',
            weight: 6,
            msg: concatMessage(
                '48-0006',
                'Întrebarea 1.2.1 – Activități de inovare',
                Drupal.t('Cod eroare 48-0006. Completati Cap.1 Rindurile 1.2.1 "DA"')
            )
        });
    }

    if (!bothNotChecked &&  r132_val > 0 && !r122_checked) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R122_C1',
            weight: 7,
            msg: concatMessage(
                '48-0007',
                'Întrebarea 1.2.2 – Activități de inovare',
                Drupal.t('Cod eroare 48-0007. Completati Cap.1 Rindurile 1.2.2 "DA"')
            )
        });
    }
}


//-------------------------------------------------------------------------------------

function validate48_0004() {
    const r111_c2 = jQuery('#CAPITOL1_R111_C2').is(':checked'); // 1.1.1 NU
    const r112_c2 = jQuery('#CAPITOL1_R112_C2').is(':checked'); // 1.1.2 NU
    const r121_c1 = jQuery('#CAPITOL1_R121_C1').is(':checked'); // 1.1.2 DA

    const r131_val_raw = jQuery('#CAPITOL1_R131_C1').val();
    let r131_val = parseInt(r131_val_raw, 10);

    // dacă valoarea este necompletată sau NaN, o considerăm 0
    if (isNaN(r131_val)) {
        r131_val = 0;
    }

    const bothNotChecked = r111_c2 && r112_c2;
    const valInvalid = r131_val <= 0;

    if (!bothNotChecked && r121_c1 && valInvalid) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R131_C1',
            weight: 3,
            msg: concatMessage(
                '48-0004',
                'Întrebarea 1.3.1 – Suma cheltuielilor',
                Drupal.t('Cod eroare: 48-0004. Completati Cap.1 Rindurile 1.3.1 - "suma"')
            )
        });
    }
}


//----------------------------------------------------------------------------------

function validate48_0003() {
    const r111_c1 = jQuery('#CAPITOL1_R111_C1').is(':checked');
    const r111_c2 = jQuery('#CAPITOL1_R111_C2').is(':checked');
    const r112_c1 = jQuery('#CAPITOL1_R112_C1').is(':checked');
    const r112_c2 = jQuery('#CAPITOL1_R112_C2').is(':checked');

    const r121_c2 = jQuery('#CAPITOL1_R121_C2').is(':checked');
    const r122_c2 = jQuery('#CAPITOL1_R122_C2').is(':checked');

    const cond_111_112_valid =
        (r111_c1 && r112_c1) ||
        (r111_c1 && r112_c2) ||
        (r111_c2 && r112_c1);

    const cond_121_122_nu = r121_c2 && r122_c2;

    if (cond_111_112_valid && cond_121_122_nu) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R121_C1',
            weight: 1,
            msg: concatMessage(
                '48-0003',
                'Întrebarea 1.2 – Lansare produse',
                Drupal.t('Cod eroare: 48-0003. Completati Cap.1 Rindurile 1.2.1 sau 1.2.2 "DA"')
            )
        });
    }
}

//--------------------------------------------------------------------------------


function validate48_0002() {
    const r111_c1 = jQuery('#CAPITOL1_R111_C1').is(':checked');
    const r111_c2 = jQuery('#CAPITOL1_R111_C2').is(':checked');
    const r112_c1 = jQuery('#CAPITOL1_R112_C1').is(':checked');
    const r112_c2 = jQuery('#CAPITOL1_R112_C2').is(':checked');

    const r121_c1 = jQuery('#CAPITOL1_R121_C1').is(':checked');
    const r121_c2 = jQuery('#CAPITOL1_R121_C2').is(':checked');
    const r122_c1 = jQuery('#CAPITOL1_R122_C1').is(':checked');
    const r122_c2 = jQuery('#CAPITOL1_R122_C2').is(':checked');

    const cond111_112 =
        (r111_c1 && r112_c1) ||
        (r111_c2 && r112_c1) ||
        (r111_c1 && r112_c2);

    const cond121_122 =
        (r121_c1 && r122_c1) ||
        (r121_c1 && r122_c2) ||
        (r121_c2 && r122_c1) ||
        (r121_c2 && r122_c2);

    if (cond111_112 && !cond121_122) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R121_C1',
            weight: 2,
            msg: concatMessage(
                '48-0002',
                'Întrebarea 1.2 – Lansare produse',
                Drupal.t('Cod eroare: 48-0002. Completati Cap.1 Rindurile 1.2')
            )
        });
    }
}

//-----------------------------------------------------------------------------





//---------------------------------------------------------------------------

function validate48_0001() {
    const r111_da = jQuery('#CAPITOL1_R111_C1').is(':checked');
    const r111_nu = jQuery('#CAPITOL1_R111_C2').is(':checked');
    const r112_da = jQuery('#CAPITOL1_R112_C1').is(':checked');
    const r112_nu = jQuery('#CAPITOL1_R112_C2').is(':checked');

    const r111_selected = r111_da || r111_nu;
    const r112_selected = r112_da || r112_nu;

    // ✅ Logica EXISTENTĂ – dacă niciuna din opțiuni nu e bifată
    if (!r111_selected || !r112_selected) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R111_C1',
            weight: 1,
            msg: concatMessage(
                '48-0001',
                'Întrebarea 1.1 – Lansare produse/servicii',
                Drupal.t('Cod eroare: 48-0001. Trebuie să fie selectate rândurile 1.1.1 și 1.1.2 – Bifați opțiunea DA sau NU.')
            )
        });
    }

    // ✅ NOU: dacă doar un rând este completat și celălalt NU
    if ((r111_selected && !r112_selected) || (!r111_selected && r112_selected)) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R112_C1',
            weight: 2,
            msg: concatMessage(
                '48-0001',
                'Întrebarea 1.1 – Lansare produse/servicii',
                Drupal.t('Cod eroare: 48-0001. Dacă ați selectat un rând, trebuie completat și celălalt (1.1.1 și 1.1.2).')
            )
        });
    }
}




// 
function validate48_008() {
    const r193_checked = jQuery('#CAPITOL1_R193_C1').is(':checked');

    const r1111_da = jQuery('#CAPITOL1_R1111_C1').is(':checked');
    const r1111_nu = jQuery('#CAPITOL1_R1111_C2').is(':checked');

    const r1112_da = jQuery('#CAPITOL1_R1112_C1').is(':checked');
    const r1112_nu = jQuery('#CAPITOL1_R1112_C2').is(':checked');

    const r1113_da = jQuery('#CAPITOL1_R1113_C1').is(':checked');
    const r1113_nu = jQuery('#CAPITOL1_R1113_C2').is(':checked');

    const all_111_empty = !(r1111_da || r1111_nu) || !(r1112_da || r1112_nu) || !(r1113_da || r1113_nu);

    if (r193_checked && all_111_empty) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R193_C1',
            weight: 1,
            msg: concatMessage(
                '48-008',
                'Rândul 1.9.3 – Lipsa cooperării',
                Drupal.t('Cod eroare: 48-059. Ați bifat “DA” la 1.9.3, dar nu ați completat toate opțiunile DA/NU pentru întrebările 1.11.1, 1.11.2 și 1.11.3.')
            )
        });
    }
}

// 


//48-006


function validate48_006() {
    const r171_checked = jQuery('#CAPITOL1_R171_C1').is(':checked');

    const r181_val = jQuery('#CAPITOL1_R181_C1').val();
    const r182_val = jQuery('#CAPITOL1_R182_C1').val();

    const r181_has_value = r181_val && !isNaN(parseFloat(r181_val));
    const r182_has_value = r182_val && !isNaN(parseFloat(r182_val));

    // ➤ Caz 1: 1.7.1 = DA, dar 1.8.1 și 1.8.2 goale
    if (r171_checked && !r181_has_value && !r182_has_value) {
        webform.warnings.push({
            fieldName: 'CAPITOL1_R171_C1',
            weight: 1,
            msg: concatMessage(
                '48-006',
                'Rândul 1.7.1 – Corelare cu 1.8.1 / 1.8.2',
                Drupal.t('Cod eroare: 48-006. Ați bifat “DA” la Rândul 1.7.1, dar nu ați completat nici Rândul 1.8.1 și nici 1.8.2. Trebuie introdusă o valoare numerică în cel puțin unul.')
            )
        });
    }

    // ➤ Caz 2: 1.7.1 ≠ DA, dar 1.8.1 sau 1.8.2 are valori numerice
    if (!r171_checked && (r181_has_value || r182_has_value)) {
        webform.warnings.push({
            fieldName: 'CAPITOL1_R171_C1',
            weight: 1,
            msg: concatMessage(
                '48-006',
                'Rândul 1.7.1 – Corelare inversă cu 1.8.1 / 1.8.2',
                Drupal.t('Cod eroare: 48-006. Ați completat Rândul 1.8.1 sau 1.8.2 fără să fi bifat “DA” la Rândul 1.7.1.')
            )
        });
    }
}

//48-006

//48-004

function validate48_004() {
    var values = Drupal.settings.mywebform.values;
    var v134 = parseInt(values['CAPITOL1_R134_C1'], 10);

    if (!isNaN(v134) && v134 !== 100) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R134_C1',
            weight: 1,
            msg: concatMessage(
                '48-004',
                'Rândul 1.3.4 – Total (%)',
                Drupal.t(`Cod eroare: 48-004. Valoarea introdusă în Rândul 1.3.4  trebuie să fie exact 100%. Valoare curentă: ${v134}.`)
            )
        });
    }
}


//48-004


// 48-007

function validate48_007() {
    // Obține valorile din formular
    var values = Drupal.settings.mywebform.values;

    // Convertim la float și normalizăm la 0 dacă sunt NaN
    var v181 = parseFloat(values['CAPITOL1_R181_C1']);
    var v182 = parseFloat(values['CAPITOL1_R182_C1']);
    var v183 = parseFloat(values['CAPITOL1_R183_C1']);
    var v184 = parseFloat(values['CAPITOL1_R184_C1']);

    v181 = isNaN(v181) ? 0 : v181;
    v182 = isNaN(v182) ? 0 : v182;
    v183 = isNaN(v183) ? 0 : v183;
    v184 = isNaN(v184) ? 0 : v184;

    // Calculăm suma și rotunjim la o zecimală
    var sum = parseFloat((v181 + v182 + v183).toFixed(1));

    // Validare cu toleranță de 0.1 (1 zecimală)
    if (Math.abs(v184 - sum) > 0.09) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R184_C1',
            weight: 1,
            msg: concatMessage(
                '48-007',
                'Rândul 1.8.4',
                Drupal.t(`Cod eroare: 48-007. Valoarea din Rândul 1.8.4 (${v184.toFixed(1)}) trebuie să fie egală cu suma valorilor din 1.8.1 (${v181.toFixed(1)}), 1.8.2 (${v182.toFixed(1)}), 1.8.3 (${v183.toFixed(1)}), adică ${sum.toFixed(1)}.`)
            )
        });
    }
}


// 48-007

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

// 


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



//Logic 1
// Dacă răspundeți “NU” la ambele opțiuni din 1.1, vă rugăm treceți la întrebarea 1.5. Altfel, vă rugăm continuați cu întrebarea 1.2.
function toggle111_112(values) {
    if (values.CAPITOL1_R111_C2 == '1' && values.CAPITOL1_R112_C2 == '1') {

        jQuery('#CAPITOL1_R12H, #CAPITOL1_R12H1, #CAPITOL1_R121, #CAPITOL1_R122, #CAPITOL1_R12H2, #CAPITOL1_R13H, #CAPITOL1_R13H1, #CAPITOL1_R13H2, #CAPITOL1_R131, #CAPITOL1_R132, #CAPITOL1_R133, #CAPITOL1_R134, #CAPITOL1_R14H, #CAPITOL1_R14H1, #CAPITOL1_R14H2, #CAPITOL1_R14H3, #CAPITOL1_R141, #CAPITOL1_R142, #CAPITOL1_R143, #CAPITOL1_R144').hide();

        // Ștergem valorile din inputurile asociate
        var inputIDs = [
            "CAPITOL1_R121_C1", "CAPITOL1_R121_C2", "CAPITOL1_R122_C1",
            "CAPITOL1_R123_C2", "CAPITOL1_R131_C1", "CAPITOL1_R131_C2",
            "CAPITOL1_R132_C1", "CAPITOL1_R132_C2", "CAPITOL1_R133_C1",
            "CAPITOL1_R133_C2", "CAPITOL1_R134_C1", "CAPITOL1_R134_C2",
            "CAPITOL1_R141_C1", "CAPITOL1_R142_C1", "CAPITOL1_R143_C1", "CAPITOL1_R144_C1"
        ];

        inputIDs.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.value = "";
            }
        });
    } else {
        jQuery('#CAPITOL1_R12H, #CAPITOL1_R12H1, #CAPITOL1_R121, #CAPITOL1_R122, #CAPITOL1_R12H2, #CAPITOL1_R13H, #CAPITOL1_R13H1, #CAPITOL1_R13H2, #CAPITOL1_R131, #CAPITOL1_R132, #CAPITOL1_R133, #CAPITOL1_R134, #CAPITOL1_R14H, #CAPITOL1_R14H1, #CAPITOL1_R14H2, #CAPITOL1_R14H3, #CAPITOL1_R141, #CAPITOL1_R142, #CAPITOL1_R143, #CAPITOL1_R144').show();
    }
}

//Logic 1
// Dacă răspundeți “NU” la ambele opțiuni 1.1, vă rugăm treceți la întrebarea 1.5. Altfel, vă rugăm continuați cu întrebarea 1.2.
function check_111_112(values) {

    jQuery('input[type=checkbox]').change(function () {

        if (jQuery('#CAPITOL1_R111_C2').is(':checked') && jQuery('#CAPITOL1_R112_C2').is(':checked')) {
            jQuery('#CAPITOL1_R12H').hide();
            jQuery('#CAPITOL1_R12H1').hide();
            jQuery('#CAPITOL1_R12H2').hide();
            jQuery('#CAPITOL1_R121').hide();
            jQuery('#CAPITOL1_R122').hide();

            jQuery('#CAPITOL1_R13H').hide();
            jQuery('#CAPITOL1_R13H1').hide();
            jQuery('#CAPITOL1_R13H2').hide();
            jQuery('#CAPITOL1_R131').hide();
            jQuery('#CAPITOL1_R132').hide();
            jQuery('#CAPITOL1_R133').hide();
            jQuery('#CAPITOL1_R134').hide();

            jQuery('#CAPITOL1_R14H').hide();
            jQuery('#CAPITOL1_R14H1').hide();
            jQuery('#CAPITOL1_R14H2').hide();
            jQuery('#CAPITOL1_R14H3').hide();
            jQuery('#CAPITOL1_R141').hide();
            jQuery('#CAPITOL1_R142').hide();
            jQuery('#CAPITOL1_R143').hide();
            jQuery('#CAPITOL1_R144').hide();
            

            jQuery('#CAPITOL1_R121_C1').attr("checked", false);
            jQuery('#CAPITOL1_R121_C2').attr("checked", false);
            jQuery('#CAPITOL1_R122_C1').attr("checked", false);
            jQuery('#CAPITOL1_R122_C2').attr("checked", false);
            jQuery('#CAPITOL1_R141_C1').attr("checked", false);
            jQuery('#CAPITOL1_R142_C1').attr("checked", false);
            jQuery('#CAPITOL1_R143_C1').attr("checked", false);
            jQuery('#CAPITOL1_R144_C1').attr("checked", false);
            



            document.getElementById("CAPITOL1_R121_C1").value = "";
            document.getElementById("CAPITOL1_R121_C2").value = "";
            document.getElementById("CAPITOL1_R122_C1").value = "";
            document.getElementById("CAPITOL1_R122_C2").value = "";

            document.getElementById("CAPITOL1_R131_C1").value = "";
            document.getElementById("CAPITOL1_R132_C1").value = "";
           
            document.getElementById("CAPITOL1_R133_C1").value = "";
           
            document.getElementById("CAPITOL1_R134_C1").value = "";

            document.getElementById("CAPITOL1_R141_C1").value = "";
            document.getElementById("CAPITOL1_R142_C1").value = "";
            document.getElementById("CAPITOL1_R143_C1").value = "";
            document.getElementById("CAPITOL1_R144_C1").value = "";
           
           
        }
        else if (!(jQuery('#CAPITOL1_R111_C2').is(':checked') && jQuery('#CAPITOL1_R112_C2').is(':checked'))) {
            jQuery('#CAPITOL1_R12H').show();
            jQuery('#CAPITOL1_R12H1').show();
            jQuery('#CAPITOL1_R12H2').show();
            jQuery('#CAPITOL1_R121').show();
            jQuery('#CAPITOL1_R122').show();

            jQuery('#CAPITOL1_R13H').show();
            jQuery('#CAPITOL1_R13H1').show();
            jQuery('#CAPITOL1_R13H2').show();
            jQuery('#CAPITOL1_R131').show();
            jQuery('#CAPITOL1_R132').show();
            jQuery('#CAPITOL1_R133').show();
            jQuery('#CAPITOL1_R134').show();

            jQuery('#CAPITOL1_R14H').show();
            jQuery('#CAPITOL1_R14H1').show();
            jQuery('#CAPITOL1_R14H2').show();
            jQuery('#CAPITOL1_R14H3').show();

            jQuery('#CAPITOL1_R141').show();
            jQuery('#CAPITOL1_R142').show();
            jQuery('#CAPITOL1_R143').show();
            jQuery('#CAPITOL1_R144').show();

        }

    });

}

// Logic 2

// Logic 2: If "NU" is selected for all options in 1.5, skip to 1.7, else continue with 1.6

function toggle151_157(values) {
    if (
        values.CAPITOL1_R151_C2 == '1' && values.CAPITOL1_R152_C2 == '1' &&
        values.CAPITOL1_R153_C2 == '1' && values.CAPITOL1_R154_C2 == '1' &&
        values.CAPITOL1_R155_C2 == '1' && values.CAPITOL1_R156_C2 == '1' &&
        values.CAPITOL1_R157_C2 == '1'
    ) {
        // Hide elements of 1.6 and move to 1.7
        jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').hide();

        // Clear input values
        var inputIDs = ["CAPITOL1_R161_C1", "CAPITOL1_R162_C1", "CAPITOL1_R163_C1", "CAPITOL1_R164_C1"];
        inputIDs.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.value = "";
            }
        });
    } else {
        // Show elements of 1.6
        jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').show();
    }
}

function check_151_157(values) {
    jQuery('input[type=checkbox]').change(function () {
        if (
            jQuery('#CAPITOL1_R151_C2').is(':checked') && jQuery('#CAPITOL1_R152_C2').is(':checked') &&
            jQuery('#CAPITOL1_R153_C2').is(':checked') && jQuery('#CAPITOL1_R154_C2').is(':checked') &&
            jQuery('#CAPITOL1_R155_C2').is(':checked') && jQuery('#CAPITOL1_R156_C2').is(':checked') &&
            jQuery('#CAPITOL1_R157_C2').is(':checked')
        ) {
            // Hide 1.6 and move to 1.7
            jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').hide();
            // jQuery('#CAPITOL1_R161_C1').attr("checked", false);
            // jQuery('#CAPITOL1_R162_C1').attr("checked", false);
            // jQuery('#CAPITOL1_R163_C1').attr("checked", false);
            // jQuery('#CAPITOL1_R164_C1').attr("checked", false);
            // Clear input values
            jQuery('#CAPITOL1_R161_C1, #CAPITOL1_R162_C1, #CAPITOL1_R163_C1, #CAPITOL1_R164_C1').val('').prop('checked', false);
        } else {
            // Show elements of 1.6
            jQuery('#CAPITOL1_R16H1, #CAPITOL1_R16H2, #CAPITOL1_R16H3, #CAPITOL1_R161, #CAPITOL1_R162, #CAPITOL1_R163, #CAPITOL1_R164').show();
        }
    });
}


// Logic 2

// Logic 3

function check_111_157_177(values) {
    jQuery('input[type=checkbox]').change(function () {
        if (
            jQuery('#CAPITOL1_R111_C2').is(':checked') && jQuery('#CAPITOL1_R112_C2').is(':checked') &&
            jQuery('#CAPITOL1_R151_C2').is(':checked') && jQuery('#CAPITOL1_R152_C2').is(':checked') &&
            jQuery('#CAPITOL1_R153_C2').is(':checked') && jQuery('#CAPITOL1_R154_C2').is(':checked') &&
            jQuery('#CAPITOL1_R155_C2').is(':checked') && jQuery('#CAPITOL1_R156_C2').is(':checked') &&
            jQuery('#CAPITOL1_R157_C2').is(':checked') && jQuery('#CAPITOL1_R171_C2').is(':checked') &&
            jQuery('#CAPITOL1_R172_C2').is(':checked') && jQuery('#CAPITOL1_R173_C2').is(':checked') &&
            jQuery('#CAPITOL1_R174_C2').is(':checked') && jQuery('#CAPITOL1_R175_C2').is(':checked') &&
            jQuery('#CAPITOL1_R176_C2').is(':checked') && jQuery('#CAPITOL1_R177_C2').is(':checked')
        ) {
            // Hide 1.8 and 1.9 and move to 1.10
            jQuery('#CAPITOL1_R18H1, #CAPITOL1_R18H2, #CAPITOL1_R18H3, #CAPITOL1_R181, #CAPITOL1_R182, #CAPITOL1_R183, #CAPITOL1_R184, #CAPITOL1_R18H5, #CAPITOL1_R19H1, #CAPITOL1_R19H2, #CAPITOL1_R19H3, #CAPITOL1_R191, #CAPITOL1_R192, #CAPITOL1_R193, #CAPITOL1_R19H4').hide();

            // Clear and uncheck input values for 1.8 and 1.9
            jQuery('#CAPITOL1_R181_C1, #CAPITOL1_R182_C1, #CAPITOL1_R183_C1, #CAPITOL1_R184_C1, #CAPITOL1_R191_C1, #CAPITOL1_R192_C1, #CAPITOL1_R193_C1').val('').prop('checked', false);
            jQuery('#CAPITOL1_R181_C2, #CAPITOL1_R182_C2, #CAPITOL1_R183_C2, #CAPITOL1_R184_C2').prop('checked', false);
        } else {
            // Show elements of 1.8 and 1.9
            jQuery('#CAPITOL1_R18H1, #CAPITOL1_R18H2, #CAPITOL1_R18H3, #CAPITOL1_R181, #CAPITOL1_R182, #CAPITOL1_R183, #CAPITOL1_R184, #CAPITOL1_R18H5, #CAPITOL1_R19H1, #CAPITOL1_R19H2, #CAPITOL1_R19H3, #CAPITOL1_R191, #CAPITOL1_R192, #CAPITOL1_R193, #CAPITOL1_R19H4').show();
        }
    });
}

function toggle111_157_177(values) {
    if (
        values.CAPITOL1_R111_C2 == '1' && values.CAPITOL1_R112_C2 == '1' &&
        values.CAPITOL1_R151_C2 == '1' && values.CAPITOL1_R152_C2 == '1' &&
        values.CAPITOL1_R153_C2 == '1' && values.CAPITOL1_R154_C2 == '1' &&
        values.CAPITOL1_R155_C2 == '1' && values.CAPITOL1_R156_C2 == '1' &&
        values.CAPITOL1_R157_C2 == '1' && values.CAPITOL1_R171_C2 == '1' &&
        values.CAPITOL1_R172_C2 == '1' && values.CAPITOL1_R173_C2 == '1' &&
        values.CAPITOL1_R174_C2 == '1' && values.CAPITOL1_R175_C2 == '1' &&
        values.CAPITOL1_R176_C2 == '1' && values.CAPITOL1_R177_C2 == '1'
    ) {
        // Hide 1.8 and 1.9 and move to 1.10
        jQuery('#CAPITOL1_R18H1, #CAPITOL1_R18H2, #CAPITOL1_R18H3, #CAPITOL1_R181, #CAPITOL1_R182, #CAPITOL1_R183, #CAPITOL1_R184, #CAPITOL1_R18H4,#CAPITOL1_R18H5, #CAPITOL1_R19H1, #CAPITOL1_R19H2, #CAPITOL1_R19H3, #CAPITOL1_R191, #CAPITOL1_R192, #CAPITOL1_R193, #CAPITOL1_R19H4').hide();

        // Clear and uncheck input values for 1.8 and 1.9
        jQuery('#CAPITOL1_R181_C1, #CAPITOL1_R182_C1, #CAPITOL1_R183_C1, #CAPITOL1_R184_C1, #CAPITOL1_R191_C1, #CAPITOL1_R192_C1, #CAPITOL1_R193_C1').val('').prop('checked', false);
        jQuery('#CAPITOL1_R181_C2, #CAPITOL1_R182_C2, #CAPITOL1_R183_C2, #CAPITOL1_R184_C2, #CAPITOL1_R191_C1, #CAPITOL1_R192_C1, #CAPITOL1_R193_C1').prop('checked', false);
    } else {
        // Show elements of 1.8 and 1.9
        jQuery('#CAPITOL1_R18H1, #CAPITOL1_R18H2, #CAPITOL1_R18H3, #CAPITOL1_R181, #CAPITOL1_R182, #CAPITOL1_R183, #CAPITOL1_R184, #CAPITOL1_R18H4,#CAPITOL1_R18H5, #CAPITOL1_R19H1, #CAPITOL1_R19H2, #CAPITOL1_R19H3, #CAPITOL1_R191, #CAPITOL1_R192, #CAPITOL1_R193, #CAPITOL1_R19H4').show();
    }
}
// Logic 3
//Analyze files and create - 
//Create toggle and watchLiveValidation for this validation
function validatePhoneNumber(phone) {
    // Check if the phone number is valid (exactly 9 digits)
    if (!phone || !/^[0-9]{9}$/.test(phone)) {
        webform.errors.push({
            'fieldName': 'PHONE',
            'weight': 29,
            'msg': concatMessage('A.09', '', Drupal.t('Introduceți doar un număr de telefon format din 9 cifre'))
        });
    }

    // Check if the first digit is 0
    if (phone && phone[0] !== '0') {
        webform.errors.push({
            'fieldName': 'PHONE',
            'weight': 30,
            'msg': concatMessage('A.09', '', Drupal.t('Prima cifră a numărului de telefon trebuie să fie 0'))
        });
    }
}

function concatMessage(errorCode, fieldTitle, msg) {
    var titleParts = [];

    if (errorCode) {
        titleParts.push(getErrorMessage(errorCode));
    }

    if (fieldTitle) {
        titleParts.push(fieldTitle);
    }

    if (titleParts.length) {
        msg = titleParts.join(', ') + '. ' + msg;
    }

    return msg;
}


function getErrorMessage(errorCode) {
    return Drupal.t('Error code: @error_code', { '@error_code': errorCode });
}

function sort_errors_warinings(a, b) {
    if (!a.hasOwnProperty('weight')) {
        a.error_code = 9999;
    }

    if (!b.hasOwnProperty('weight')) {
        b.error_code = 9999;
    }

    return toFloat(a.error_code) - toFloat(b.error_code);
}

function check_all(values) {
    jQuery('input[type=checkbox]').change(function () {
        var state = jQuery(this).is(':checked');
        var group = jQuery(this).attr('name');

        // Exclude checkboxes that start with CAPITOL1_R112 (do not process these)
        var excludedPattern = /^CAPITOL1_R112\d+_C\d+$/;
        if (excludedPattern.test(group)) {
            return; // Skip processing for these variables
        }

        // Handle mutual exclusivity for CAPITOL1_R111X_C1 and CAPITOL1_R111X_C2
        var exclusivePairs = {
            "CAPITOL1_R1111_C1": "CAPITOL1_R1111_C2",
            "CAPITOL1_R1111_C2": "CAPITOL1_R1111_C1",
            "CAPITOL1_R1112_C1": "CAPITOL1_R1112_C2",
            "CAPITOL1_R1112_C2": "CAPITOL1_R1112_C1",
            "CAPITOL1_R1113_C1": "CAPITOL1_R1113_C2",
            "CAPITOL1_R1113_C2": "CAPITOL1_R1113_C1"
        };

        if (exclusivePairs.hasOwnProperty(group)) {
            if (state) {
                jQuery(`input[name="${exclusivePairs[group]}"]`).prop('checked', false);
            }
            return; // Stop further processing
        }

        // Define mutual exclusivity row-wise
        var rowGroups = {
            "CAPITOL21_R211_C1": ["CAPITOL21_R211_C2", "CAPITOL21_R211_C3"],
            "CAPITOL21_R211_C2": ["CAPITOL21_R211_C1", "CAPITOL21_R211_C3"],
            "CAPITOL21_R211_C3": ["CAPITOL21_R211_C1", "CAPITOL21_R211_C2"],

            "CAPITOL21_R212_C1": ["CAPITOL21_R212_C2", "CAPITOL21_R212_C3"],
            "CAPITOL21_R212_C2": ["CAPITOL21_R212_C1", "CAPITOL21_R212_C3"],
            "CAPITOL21_R212_C3": ["CAPITOL21_R212_C1", "CAPITOL21_R212_C2"],

            "CAPITOL21_R211_C4": ["CAPITOL21_R211_C5"],
            "CAPITOL21_R211_C5": ["CAPITOL21_R211_C4"],

            "CAPITOL21_R212_C4": ["CAPITOL21_R212_C5"],
            "CAPITOL21_R212_C5": ["CAPITOL21_R212_C4"],

            // New Groups - First Group (C1, C2)
            "CAPITOL22_R221_C1": ["CAPITOL22_R221_C2"],
            "CAPITOL22_R221_C2": ["CAPITOL22_R221_C1"],
            "CAPITOL22_R222_C1": ["CAPITOL22_R222_C2"],
            "CAPITOL22_R222_C2": ["CAPITOL22_R222_C1"],
            "CAPITOL22_R223_C1": ["CAPITOL22_R223_C2"],
            "CAPITOL22_R223_C2": ["CAPITOL22_R223_C1"],
            "CAPITOL22_R224_C1": ["CAPITOL22_R224_C2"],
            "CAPITOL22_R224_C2": ["CAPITOL22_R224_C1"],

            // Second Group (C3, C4)
            "CAPITOL22_R221_C3": ["CAPITOL22_R221_C4"],
            "CAPITOL22_R221_C4": ["CAPITOL22_R221_C3"],
            "CAPITOL22_R222_C3": ["CAPITOL22_R222_C4"],
            "CAPITOL22_R222_C4": ["CAPITOL22_R222_C3"],
            "CAPITOL22_R223_C3": ["CAPITOL22_R223_C4"],
            "CAPITOL22_R223_C4": ["CAPITOL22_R223_C3"],
            "CAPITOL22_R224_C3": ["CAPITOL22_R224_C4"],
            "CAPITOL22_R224_C4": ["CAPITOL22_R224_C3"]
        };

        // New CAPITOL3 Group (C1, C2, C3) Mutual Exclusivity
        for (var i = 311; i <= 3112; i++) {
            rowGroups[`CAPITOL3_R${i}_C1`] = [`CAPITOL3_R${i}_C2`, `CAPITOL3_R${i}_C3`];
            rowGroups[`CAPITOL3_R${i}_C2`] = [`CAPITOL3_R${i}_C1`, `CAPITOL3_R${i}_C3`];
            rowGroups[`CAPITOL3_R${i}_C3`] = [`CAPITOL3_R${i}_C1`, `CAPITOL3_R${i}_C2`];
        }

        if (rowGroups.hasOwnProperty(group)) {
            if (state) {
                jQuery(rowGroups[group].map(name => `input[name="${name}"]`).join(', ')).prop('checked', false);
            }
            return; // Stop further processing
        }

        var pos = group.indexOf('_R');
        var res = group.substr(0, pos !== false ? pos + 5 : 0);

        var lengthChecs = 0;
        jQuery('input[type=checkbox]').each(function () {
            if (jQuery(this).attr('name').indexOf(res) !== -1) {
                jQuery(this).removeAttr('checked');
                lengthChecs++;
            }
        });

        jQuery(this).prop('checked', state);

        // Ensure only one of CAPITOL1_R191_C1, CAPITOL1_R192_C1, CAPITOL1_R193_C1 is selected
        var specialGroup = ["CAPITOL1_R191_C1", "CAPITOL1_R192_C1", "CAPITOL1_R193_C1"];
        if (specialGroup.includes(group)) {
            jQuery('input[name="CAPITOL1_R191_C1"], input[name="CAPITOL1_R192_C1"], input[name="CAPITOL1_R193_C1"]').not(this).prop('checked', false);
        }
    });
}


function concatMessage(errorCode, fieldTitle, msg) {
    var titleParts = [];

    if (errorCode) {
        titleParts.push(getErrorMessage(errorCode));
    }

    if (fieldTitle) {
        titleParts.push(fieldTitle);
    }

    if (titleParts.length) {
        msg = titleParts.join(', ') + '. ' + msg;
    }

    return msg;

}

function getErrorMessage(errorCode) {
    return Drupal.t('Error code: @error_code', { '@error_code': errorCode });
}
