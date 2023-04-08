//Simplify the if statement: The if statement at the beginning of the code is quite long and can be difficult to read.It might be helpful to break it up into smaller pieces or use more descriptive variable names to make it clearer what conditions are being checked.

//Remove code duplication: The code that checks each group of checkboxes for completion is repeated three times.This duplication could be eliminated by creating a function that takes the group of checkboxes as a parameter and checks each checkbox in the group.

//Improve error messages: The error messages that are pushed onto the webform.errors array are currently hard - coded and not very user - friendly.It might be better to use more descriptive and informative error messages that explain exactly what needs to be done to complete the form.

//Use querySelectorAll: Instead of calling jQuery multiple times to check each checkbox, you can use document.querySelectorAll to select all the relevant checkboxes and then loop through them.

  //  Here's an example of how these improvements could be implemented:


function checkFormCompletion() {
    const capitolCheckboxes = ['#CAPITOL1_R111_C1', '#CAPITOL1_R112_C1', '#CAPITOL1_R113_C1',];

    const groupCheckboxes = [['#CAPITOL7_R_711_C1', '#CAPITOL7_R_711_C2'],
    ['#CAPITOL7_R_712_C1', '#CAPITOL7_R_712_C2'],
    ['#CAPITOL7_R_713_C1', '#CAPITOL7_R_713_C2'],
    ];

    const allCapitolChecked = capitolCheckboxes.some((checkbox) =>
        jQuery(checkbox).is(':checked')
    );

    const allGroupsChecked = groupCheckboxes.every((group) =>
        group.some((checkbox) => jQuery(checkbox).is(':checked'))
    );

    if (allCapitolChecked && !allGroupsChecked) {
        groupCheckboxes.forEach((group) => {
            const groupChecked = group.some((checkbox) =>
                jQuery(checkbox).is(':checked')
            );
            if (!groupChecked) {
                group.forEach((checkbox) => {
                    webform.errors.push({
                        fieldName: checkbox,
                        index: 0,
                        msg: 'Please complete this required field.',
                    });
                });
            }
        });
    }
}
//This code simplifies the if statement by using the Array.some and Array.every methods to check if any of the checkboxes in the groups are checked.It also uses a loop to check each group of checkboxes, eliminating the code duplication.Finally, it uses a more descriptive error message.





