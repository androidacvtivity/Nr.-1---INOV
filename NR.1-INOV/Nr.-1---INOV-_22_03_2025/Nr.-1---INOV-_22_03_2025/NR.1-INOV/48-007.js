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
