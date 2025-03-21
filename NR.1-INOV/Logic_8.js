function toggle111_112_M(values) {
    const onlyNoSelected = (
        values.CAPITOL1_R1111_C2 === '1' &&
        values.CAPITOL1_R1112_C2 === '1' &&
        values.CAPITOL1_R151_C2 === '1' &&
        values.CAPITOL1_R152_C2 === '1' &&
        values.CAPITOL1_R153_C2 === '1' &&
        values.CAPITOL1_R154_C2 === '1' &&
        values.CAPITOL1_R155_C2 === '1' &&
        values.CAPITOL1_R156_C2 === '1' &&
        values.CAPITOL1_R157_C2 === '1' &&
        values.CAPITOL1_R171_C2 === '1' &&
        values.CAPITOL1_R172_C2 === '1' &&
        values.CAPITOL1_R173_C2 === '1' &&
        values.CAPITOL1_R174_C2 === '1' &&
        values.CAPITOL1_R175_C2 === '1' &&
        values.CAPITOL1_R176_C2 === '1' &&
        values.CAPITOL1_R177_C2 === '1'
    );

    const anyYesIn110 = (
        values.CAPITOL1_R1101_C1 === '1' ||
        values.CAPITOL1_R1102_C1 === '1' ||
        values.CAPITOL1_R1103_C1 === '1'
    );

    if (onlyNoSelected && anyYesIn110) {
        const rowsToHide = [
            '#CAPITOL1_R111H1', '#CAPITOL1_R111H2', '#CAPITOL1_R111H3', '#CAPITOL1_R111H4',
            '#CAPITOL1_R1111', '#CAPITOL1_R1112', '#CAPITOL1_R1113', '#CAPITOL1_R111H5',
            '#CAPITOL1_R112H1', '#CAPITOL1_R112H2', '#CAPITOL1_R112H3', '#CAPITOL1_R112H4',
            '#CAPITOL1_R112H5', '#CAPITOL1_R112H6', '#CAPITOL1_R112H7', '#CAPITOL1_R112H8',
            '#CAPITOL1_R1121', '#CAPITOL1_R1122', '#CAPITOL1_R1123', '#CAPITOL1_R1124',
            '#CAPITOL1_R1125', '#CAPITOL1_R1126', '#CAPITOL1_R1127', '#CAPITOL1_R1128', '#CAPITOL1_R1129'
        ];
        const inputIDs = [
            'CAPITOL1_R1111_C1', 'CAPITOL1_R1111_C2',
            'CAPITOL1_R1112_C1', 'CAPITOL1_R1112_C2',
            'CAPITOL1_R1113_C1', 'CAPITOL1_R1113_C2',
            // 1.12 section
            'CAPITOL1_R1121_C1', 'CAPITOL1_R1121_C2', 'CAPITOL1_R1121_C3',
            'CAPITOL1_R1122_C1', 'CAPITOL1_R1122_C2', 'CAPITOL1_R1122_C3',
            'CAPITOL1_R1123_C1', 'CAPITOL1_R1123_C2', 'CAPITOL1_R1123_C3',
            'CAPITOL1_R1124_C1', 'CAPITOL1_R1124_C2', 'CAPITOL1_R1124_C3',
            'CAPITOL1_R1125_C1', 'CAPITOL1_R1125_C2', 'CAPITOL1_R1125_C3',
            'CAPITOL1_R1126_C1', 'CAPITOL1_R1126_C2', 'CAPITOL1_R1126_C3',
            'CAPITOL1_R1127_C1', 'CAPITOL1_R1127_C2', 'CAPITOL1_R1127_C3',
            'CAPITOL1_R1128_C1', 'CAPITOL1_R1128_C2', 'CAPITOL1_R1128_C3',
            'CAPITOL1_R1129_C1', 'CAPITOL1_R1129_C2', 'CAPITOL1_R1129_C3'
        ];

        rowsToHide.forEach(id => jQuery(id).hide());
        inputIDs.forEach(id => {
            let el = jQuery(`#${id}`);
            if (el.is(':checkbox')) el.prop('checked', false);
            else el.val('');
            el.trigger('change');
        });
    } else {
        jQuery([
            '#CAPITOL1_R111H1', '#CAPITOL1_R111H2', '#CAPITOL1_R111H3', '#CAPITOL1_R111H4',
            '#CAPITOL1_R1111', '#CAPITOL1_R1112', '#CAPITOL1_R1113', '#CAPITOL1_R111H5',
            '#CAPITOL1_R112H1', '#CAPITOL1_R112H2', '#CAPITOL1_R112H3', '#CAPITOL1_R112H4',
            '#CAPITOL1_R112H5', '#CAPITOL1_R112H6', '#CAPITOL1_R112H7', '#CAPITOL1_R112H8',
            '#CAPITOL1_R1121', '#CAPITOL1_R1122', '#CAPITOL1_R1123', '#CAPITOL1_R1124',
            '#CAPITOL1_R1125', '#CAPITOL1_R1126', '#CAPITOL1_R1127', '#CAPITOL1_R1128', '#CAPITOL1_R1129'
        ].join(',')).show();
    }
}

function check_111_112_M() {
    const allCheckIDs = [
        'CAPITOL1_R1111_C2', 'CAPITOL1_R1112_C2',
        'CAPITOL1_R151_C2', 'CAPITOL1_R152_C2', 'CAPITOL1_R153_C2', 'CAPITOL1_R154_C2',
        'CAPITOL1_R155_C2', 'CAPITOL1_R156_C2', 'CAPITOL1_R157_C2',
        'CAPITOL1_R171_C2', 'CAPITOL1_R172_C2', 'CAPITOL1_R173_C2',
        'CAPITOL1_R174_C2', 'CAPITOL1_R175_C2', 'CAPITOL1_R176_C2', 'CAPITOL1_R177_C2',
        'CAPITOL1_R1101_C1', 'CAPITOL1_R1102_C1', 'CAPITOL1_R1103_C1'
    ];

    function evaluateAndToggle() {
        const onlyNo = allCheckIDs.slice(0, 16).every(id => jQuery(`#${id}`).is(':checked'));
        const anyYes = allCheckIDs.slice(16).some(id => jQuery(`#${id}`).is(':checked'));

        if (onlyNo && anyYes) {
            toggle111_112_M(Drupal.settings.mywebform.values);
        } else {
            toggle111_112_M({}); // show all
        }
    }

    allCheckIDs.forEach(id => {
        jQuery(`#${id}`).on('change', evaluateAndToggle);
    });

    // Initial check
    evaluateAndToggle();
}
