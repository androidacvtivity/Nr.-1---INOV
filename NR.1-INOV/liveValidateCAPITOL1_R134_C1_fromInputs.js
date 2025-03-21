function liveValidateCAPITOL1_R134_C1_fromInputs() {
    // ID-urile câmpurilor care afectează 134 (ex: 1.3.1 – 1.3.3)
    const sourceIDs = ['CAPITOL1_R131_C1', 'CAPITOL1_R132_C1', 'CAPITOL1_R133_C1'];
    const targetID = 'CAPITOL1_R134_C1';
    const errorDivId = `${targetID}_error`;

    // Inițializare div de eroare (dacă nu există deja)
    if (!document.getElementById(errorDivId)) {
        const errorDiv = document.createElement('div');
        errorDiv.id = errorDivId;
        errorDiv.style.color = 'red';
        errorDiv.style.fontWeight = 'bold';
        errorDiv.style.marginTop = '4px';
        errorDiv.style.display = 'none';
        const target = document.getElementById(targetID);
        if (target) target.parentNode.appendChild(errorDiv);
    }

    function validateSum() {
        let total = 0;
        for (let id of sourceIDs) {
            const el = document.getElementById(id);
            if (el) {
                const val = parseInt(el.value, 10);
                total += isNaN(val) ? 0 : val;
            }
        }

        const errorBox = document.getElementById(errorDivId);
        const field = document.getElementById(targetID);
        if (!field || !errorBox) return;

        // Actualizează câmpul-țintă (dacă e necesar – simulăm autosumă)
        field.value = total;

        if (total !== 100) {
            field.classList.add('has-error');
            errorBox.textContent = `Cod eroare: 48-004 – Totalul trebuie să fie exact 100%. Valoare curentă: ${total}`;
            errorBox.style.display = 'block';
        } else {
            field.classList.remove('has-error');
            errorBox.style.display = 'none';
        }
    }

    // Atașăm listener pe surse
    sourceIDs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', validateSum);
        }
    });
}
