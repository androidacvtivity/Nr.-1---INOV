function validate48_004() {
    var values = Drupal.settings.mywebform.values;
    var v134 = parseInt(values['CAPITOL1_R134_C1'], 10);

    // Dacă există o valoare și nu este 100, generăm eroarea
    if (!isNaN(v134) && v134 !== 100) {
        webform.errors.push({
            fieldName: 'CAPITOL1_R134_C1',
            weight: 1,
            msg: concatMessage(
                '48-004',
                'Rândul 1.8.4 – Total (%)',
                Drupal.t(`Cod eroare: 48-004. Valoarea introdusă în Rândul 1.8.4 (CAPITOL1_R134_C1) trebuie să fie exact 100%. Valoare curentă: ${v134}.`)
            )
        });
    }
}
