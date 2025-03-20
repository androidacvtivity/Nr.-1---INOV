var from = "";

$(document).ready(function () {
    form = $("#formDenShort").val();
    fINOV_AN1();

});

$(function () {
    // OnKeyPress ```````````````````````````````````````````````````````````````````````````````
    $("input:not([type='button']):not([readonly]):not([disabled])").on("change", function (e) {
        fINOV_AN1();
    });
});
function fINOV_AN1() {
    var R181_C1 = $("#48_1040_83555_1\\.8\\.1_1");
    var R182_C1 = $("#48_1040_83556_1\\.8\\.2_1");
    var R183_C1 = $("#48_1040_83557_1\\.8\\.3_1");
    var R184_C1 = $('#48_1040_83558_1\\.8\\.4_1');
    var R131_C1 = $("#48_1040_83520_1\\.3\\.1_1");
    var R132_C1 = $("#48_1040_83521_1\\.3\\.2_1");
    var R133_C1 = $("#48_1040_83522_1\\.3\\.3_1");
    var R134_C1 = $('#48_1040_83523_1\\.3\\.4_1');


    //--------------readOnly input -----------------------

    R184_C1.prop("readonly", true);
    R134_C1.prop("readonly", true);


    //-------------------------------Rind 184-----------------------------------------------------  

    //---- R184_C1.val(parseInt(R181_C1.val() * 1 + R182_C1.val() * 1 + R183_C1.val() * 1 ));

    R184_C1.val(Number(parseFloat(Number(R181_C1.val())) + parseFloat(Number(R182_C1.val())) + parseFloat(Number(R183_C1.val()))).toFixed(1));


    //-------------------------------Rind 134-----------------------------------------------------
    var R134_C1_value = Number(parseFloat(Number(R131_C1.val())) +
        parseFloat(Number(R132_C1.val())) + parseFloat(Number(R133_C1.val()))).toFixed(0);
    R134_C1.val(R134_C1_value);

    // Check if R134_C1_value is not equal to 100 and show message if necessary
    if (R134_C1_value !== "100" && (R131_C1.val() != "" || R132_C1.val() != "" || R133_C1.val() != "")) {
        $.messager.alert("Error", "Valoare din  Rind 1.3.4 este  =  " + R134_C1_value + ". Trebuie sa fie 100", "error");
    }
}


function DisableCheckboxesByCheckedState() {

}


this.ChangeCheckbox_1040 = function (itemId) {

    var isChecked = document.getElementById(itemId).checked;


    if (itemId == "48_1040_83509_1.1.1_1" && isChecked == true) {
        document.getElementById("48_1040_83509_1.1.1_2").checked = false;

    }
    else if (itemId == "48_1040_83509_1.1.1_2" && isChecked == true) {
        document.getElementById("48_1040_83509_1.1.1_1").checked = false;
    }


    if (itemId == "48_1040_83504_1.1.2_1" && isChecked == true) {
        document.getElementById("48_1040_83504_1.1.2_2").checked = false;

    }
    else if (itemId == "48_1040_83504_1.1.2_2" && isChecked == true) {
        document.getElementById("48_1040_83504_1.1.2_1").checked = false;
    }


    if (itemId == "48_1040_83516_1.2.1_1" && isChecked == true) {
        document.getElementById("48_1040_83516_1.2.1_2").checked = false;

    }
    else if (itemId == "48_1040_83516_1.2.1_2" && isChecked == true) {
        document.getElementById("48_1040_83516_1.2.1_1").checked = false;
    }


    if (itemId == "48_1040_83518_1.2.2_1" && isChecked == true) {
        document.getElementById("48_1040_83518_1.2.2_2").checked = false;

    }
    else if (itemId == "48_1040_83518_1.2.2_2" && isChecked == true) {
        document.getElementById("48_1040_83518_1.2.2_1").checked = false;
    }


    if (itemId == "48_1040_83532_1.5.1_1" && isChecked == true) {
        document.getElementById("48_1040_83532_1.5.1_2").checked = false;

    }
    else if (itemId == "48_1040_83532_1.5.1_2" && isChecked == true) {
        document.getElementById("48_1040_83532_1.5.1_1").checked = false;
    }


    if (itemId == "48_1040_83533_1.5.2_1" && isChecked == true) {
        document.getElementById("48_1040_83533_1.5.2_2").checked = false;

    }
    else if (itemId == "48_1040_83533_1.5.2_2" && isChecked == true) {
        document.getElementById("48_1040_83533_1.5.2_1").checked = false;
    }


    if (itemId == "48_1040_83534_1.5.3_1" && isChecked == true) {
        document.getElementById("48_1040_83534_1.5.3_2").checked = false;

    }
    else if (itemId == "48_1040_83534_1.5.3_2" && isChecked == true) {
        document.getElementById("48_1040_83534_1.5.3_1").checked = false;
    }


    if (itemId == "48_1040_83535_1.5.4_1" && isChecked == true) {
        document.getElementById("48_1040_83535_1.5.4_2").checked = false;

    }
    else if (itemId == "48_1040_83535_1.5.4_2" && isChecked == true) {
        document.getElementById("48_1040_83535_1.5.4_1").checked = false;
    }

    if (itemId == "48_1040_83536_1.5.5_1" && isChecked == true) {
        document.getElementById("48_1040_83536_1.5.5_2").checked = false;

    }
    else if (itemId == "48_1040_83536_1.5.5_2" && isChecked == true) {
        document.getElementById("48_1040_83536_1.5.5_1").checked = false;
    }

    if (itemId == "48_1040_83537_1.5.6_1" && isChecked == true) {
        document.getElementById("48_1040_83537_1.5.6_2").checked = false;

    }
    else if (itemId == "48_1040_83537_1.5.6_2" && isChecked == true) {
        document.getElementById("48_1040_83537_1.5.6_1").checked = false;
    }

    if (itemId == "48_1040_83538_1.5.7_1" && isChecked == true) {
        document.getElementById("48_1040_83538_1.5.7_2").checked = false;

    }
    else if (itemId == "48_1040_83538_1.5.7_2" && isChecked == true) {
        document.getElementById("48_1040_83538_1.5.7_1").checked = false;
    }

    if (itemId == "48_1040_83545_1.7.1_1" && isChecked == true) {
        document.getElementById("48_1040_83545_1.7.1_2").checked = false;

    }
    else if (itemId == "48_1040_83545_1.7.1_2" && isChecked == true) {
        document.getElementById("48_1040_83545_1.7.1_1").checked = false;
    }

    if (itemId == "48_1040_83546_1.7.2_1" && isChecked == true) {
        document.getElementById("48_1040_83546_1.7.2_2").checked = false;

    }
    else if (itemId == "48_1040_83546_1.7.2_2" && isChecked == true) {
        document.getElementById("48_1040_83546_1.7.2_1").checked = false;
    }

    if (itemId == "48_1040_83547_1.7.3_1" && isChecked == true) {
        document.getElementById("48_1040_83547_1.7.3_2").checked = false;

    }
    else if (itemId == "48_1040_83547_1.7.3_2" && isChecked == true) {
        document.getElementById("48_1040_83547_1.7.3_1").checked = false;
    }

    if (itemId == "48_1040_83548_1.7.4_1" && isChecked == true) {
        document.getElementById("48_1040_83548_1.7.4_2").checked = false;

    }
    else if (itemId == "48_1040_83548_1.7.4_2" && isChecked == true) {
        document.getElementById("48_1040_83548_1.7.4_1").checked = false;
    }

    if (itemId == "48_1040_83549_1.7.5_1" && isChecked == true) {
        document.getElementById("48_1040_83549_1.7.5_2").checked = false;

    }
    else if (itemId == "48_1040_83549_1.7.5_2" && isChecked == true) {
        document.getElementById("48_1040_83549_1.7.5_1").checked = false;
    }

    if (itemId == "48_1040_83550_1.7.6_1" && isChecked == true) {
        document.getElementById("48_1040_83550_1.7.6_2").checked = false;

    }
    else if (itemId == "48_1040_83550_1.7.6_2" && isChecked == true) {
        document.getElementById("48_1040_83550_1.7.6_1").checked = false;
    }

    if (itemId == "48_1040_83551_1.7.7_1" && isChecked == true) {
        document.getElementById("48_1040_83551_1.7.7_2").checked = false;

    }
    else if (itemId == "48_1040_83551_1.7.7_2" && isChecked == true) {
        document.getElementById("48_1040_83551_1.7.7_1").checked = false;
    }


    if (itemId == "48_1040_83560_1.9.1_1" && isChecked == true) {
        document.getElementById("48_1040_83561_1.9.2_1").checked = false;
        document.getElementById("48_1040_83562_1.9.3_1").checked = false;

    }
    else if (itemId == "48_1040_83561_1.9.2_1" && isChecked == true) {
        document.getElementById("48_1040_83560_1.9.1_1").checked = false;
        document.getElementById("48_1040_83562_1.9.3_1").checked = false;
    }


    else if (itemId == "48_1040_83562_1.9.3_1" && isChecked == true) {
        document.getElementById("48_1040_83560_1.9.1_1").checked = false;
        document.getElementById("48_1040_83561_1.9.2_1").checked = false;
    }

    if (itemId == "48_1040_83564_1.10.1_1" && isChecked == true) {
        document.getElementById("48_1040_83565_1.10.2_1").checked = false;
        document.getElementById("48_1040_83566_1.10.3_1").checked = false;

    }
    else if (itemId == "48_1040_83565_1.10.2_1" && isChecked == true) {
        document.getElementById("48_1040_83564_1.10.1_1").checked = false;
        document.getElementById("48_1040_83566_1.10.3_1").checked = false;
    }


    else if (itemId == "48_1040_83566_1.10.3_1" && isChecked == true) {
        document.getElementById("48_1040_83564_1.10.1_1").checked = false;
        document.getElementById("48_1040_83565_1.10.2_1").checked = false;
    }


    if (itemId == "48_1040_83568_1.11.1_1" && isChecked == true) {
        document.getElementById("48_1040_83568_1.11.1_2").checked = false;

    }
    else if (itemId == "48_1040_83568_1.11.1_2" && isChecked == true) {
        document.getElementById("48_1040_83568_1.11.1_1").checked = false;
    }

    if (itemId == "48_1040_83569_1.11.2_1" && isChecked == true) {
        document.getElementById("48_1040_83569_1.11.2_2").checked = false;

    }
    else if (itemId == "48_1040_83569_1.11.2_2" && isChecked == true) {
        document.getElementById("48_1040_83569_1.11.2_1").checked = false;
    }

    if (itemId == "48_1040_83570_1.11.3_1" && isChecked == true) {
        document.getElementById("48_1040_83570_1.11.3_2").checked = false;

    }
    else if (itemId == "48_1040_83570_1.11.3_2" && isChecked == true) {
        document.getElementById("48_1040_83570_1.11.3_1").checked = false;
    }


    if (itemId == "48_1040_83546_1.7.2_1" && isChecked == true) {

        document.getElementById("48_1040_83547_1.7.3_1").checked = false;
        document.getElementById("48_1040_83546_1.7.2_2").checked = false;
        document.getElementById("48_1040_83547_1.7.3_2").checked = false;
    }

    else if (itemId == "48_1040_83546_1.7.2_2" && isChecked == true) {
        document.getElementById("48_1040_83547_1.7.3_1").checked = false;
        document.getElementById("48_1040_83547_1.7.3_2").checked = false;
        document.getElementById("48_1040_83546_1.7.2_1").checked = false;

    }

    else if (itemId == "48_1040_83547_1.7.3_1" && isChecked == true) {
        document.getElementById("48_1040_83546_1.7.2_2").checked = false;
        document.getElementById("48_1040_83547_1.7.3_2").checked = false;
        document.getElementById("48_1040_83546_1.7.2_1").checked = false;

    }

    else if (itemId == "48_1040_83547_1.7.3_2" && isChecked == true) {
        document.getElementById("48_1040_83546_1.7.2_2").checked = false;
        document.getElementById("48_1040_83547_1.7.3_1").checked = false;
        document.getElementById("48_1040_83546_1.7.2_1").checked = false;

    }

    if (itemId == "48_1040_83509_1.1.1_1" || itemId == "48_1040_83509_1.1.1_2" || itemId == "48_1040_83504_1.1.2_1" || itemId == "48_1040_83504_1.1.2_2") {

        var isChecked_111_2 = document.getElementById("48_1040_83509_1.1.1_2").checked;
        var isChecked_112_2 = document.getElementById("48_1040_83504_1.1.2_2").checked;

        if (isChecked_111_2 && isChecked_112_2) {
            document.getElementById("48_1040_83516_1.2.1_1").checked = false;
            document.getElementById("48_1040_83516_1.2.1_2").checked = false;
            document.getElementById("48_1040_83518_1.2.2_1").checked = false;
            document.getElementById("48_1040_83518_1.2.2_2").checked = false;
            document.getElementById("48_1040_83525_1.4.1_1").checked = false;
            document.getElementById("48_1040_83526_1.4.2_1").checked = false;
            document.getElementById("48_1040_83527_1.4.3_1").checked = false;
            document.getElementById("48_1040_83528_1.4.4_1").checked = false;

            document.getElementById("48_1040_83509_1.1.1_1").checked = false;
            document.getElementById("48_1040_83504_1.1.2_1").checked = false;
            document.getElementById("48_1040_83516_1.2.1_1").disabled = true;
            document.getElementById("48_1040_83516_1.2.1_2").disabled = true;
            document.getElementById("48_1040_83518_1.2.2_1").disabled = true;
            document.getElementById("48_1040_83518_1.2.2_2").disabled = true;

            document.getElementById("48_1040_83525_1.4.1_1").disabled = true;
            document.getElementById("48_1040_83526_1.4.2_1").disabled = true;
            document.getElementById("48_1040_83527_1.4.3_1").disabled = true;
            document.getElementById("48_1040_83528_1.4.4_1").disabled = true;

            document.getElementById("48_1040_83520_1.3.1_1").disabled = true;
            document.getElementById("48_1040_83521_1.3.2_1").disabled = true;
            document.getElementById("48_1040_83522_1.3.3_1").disabled = true;
            document.getElementById("48_1040_83523_1.3.4_1").disabled = true;

            document.getElementById("48_1040_83520_1.3.1_1").value = "";
            document.getElementById("48_1040_83521_1.3.2_1").value = "";
            document.getElementById("48_1040_83522_1.3.3_1").value = "";
            document.getElementById("48_1040_83523_1.3.4_1").value = "";

        }
        else {
            /* document.getElementById("48_1040_83509_1.1.1_2").checked = false;
             document.getElementById("48_1040_83504_1.1.2_2").checked = false;*/
            document.getElementById("48_1040_83516_1.2.1_1").disabled = false;
            document.getElementById("48_1040_83516_1.2.1_2").disabled = false;
            document.getElementById("48_1040_83518_1.2.2_1").disabled = false;
            document.getElementById("48_1040_83518_1.2.2_2").disabled = false;

            document.getElementById("48_1040_83520_1.3.1_1").disabled = false;
            document.getElementById("48_1040_83521_1.3.2_1").disabled = false;
            document.getElementById("48_1040_83522_1.3.3_1").disabled = false;
            document.getElementById("48_1040_83523_1.3.4_1").disabled = false;

            document.getElementById("48_1040_83525_1.4.1_1").disabled = false;
            document.getElementById("48_1040_83526_1.4.2_1").disabled = false;
            document.getElementById("48_1040_83527_1.4.3_1").disabled = false;
            document.getElementById("48_1040_83528_1.4.4_1").disabled = false;
        }
    }



    if (itemId == "48_1040_83532_1.5.1_1" || itemId == "48_1040_83532_1.5.1_2" || itemId == "48_1040_83533_1.5.2_1" || itemId == "48_1040_83533_1.5.2_2" ||
        itemId == "48_1040_83534_1.5.3_1" || itemId == "48_1040_83534_1.5.3_2" || itemId == "48_1040_83535_1.5.4_1" || itemId == "48_1040_83535_1.5.4_2" ||
        itemId == "48_1040_83536_1.5.5_1" || itemId == "48_1040_83536_1.5.5_2" || itemId == "48_1040_83537_1.5.6_1" || itemId == "48_1040_83537_1.5.6_2" ||
        itemId == "48_1040_83538_1.5.7_1" || itemId == "48_1040_83538_1.5.7_2") {

        var isChecked_151_2 = document.getElementById("48_1040_83532_1.5.1_2").checked;
        var isChecked_152_2 = document.getElementById("48_1040_83533_1.5.2_2").checked;
        var isChecked_153_2 = document.getElementById("48_1040_83534_1.5.3_2").checked;
        var isChecked_154_2 = document.getElementById("48_1040_83535_1.5.4_2").checked;
        var isChecked_155_2 = document.getElementById("48_1040_83536_1.5.5_2").checked;
        var isChecked_156_2 = document.getElementById("48_1040_83537_1.5.6_2").checked;
        var isChecked_157_2 = document.getElementById("48_1040_83538_1.5.7_2").checked;

        if (isChecked_151_2 && isChecked_152_2 && isChecked_153_2 && isChecked_154_2 && isChecked_155_2 && isChecked_156_2 && isChecked_157_2) {
            document.getElementById("48_1040_83540_1.6.1_1").checked = false;
            document.getElementById("48_1040_83541_1.6.2_1").checked = false;
            document.getElementById("48_1040_83542_1.6.3_1").checked = false;
            document.getElementById("48_1040_83543_1.6.4_1").checked = false;

            document.getElementById("48_1040_83532_1.5.1_1").checked = false;
            document.getElementById("48_1040_83533_1.5.2_1").checked = false;
            document.getElementById("48_1040_83534_1.5.3_1").checked = false;
            document.getElementById("48_1040_83535_1.5.4_1").checked = false;
            document.getElementById("48_1040_83536_1.5.5_1").checked = false;
            document.getElementById("48_1040_83537_1.5.6_1").checked = false;
            document.getElementById("48_1040_83538_1.5.7_1").checked = false;


            document.getElementById("48_1040_83540_1.6.1_1").disabled = true;
            document.getElementById("48_1040_83541_1.6.2_1").disabled = true;
            document.getElementById("48_1040_83542_1.6.3_1").disabled = true;
            document.getElementById("48_1040_83543_1.6.4_1").disabled = true;


        }
        else {


            document.getElementById("48_1040_83540_1.6.1_1").disabled = false;
            document.getElementById("48_1040_83541_1.6.2_1").disabled = false;
            document.getElementById("48_1040_83542_1.6.3_1").disabled = false;
            document.getElementById("48_1040_83543_1.6.4_1").disabled = false;

        }
    }





    if (itemId == "48_1040_83545_1.7.1_1" || itemId == "48_1040_83545_1.7.1_2" || itemId == "48_1040_83548_1.7.4_1" || itemId == "48_1040_83548_1.7.4_2" ||
        itemId == "48_1040_83549_1.7.5_1" || itemId == "48_1040_83549_1.7.5_2" || itemId == "48_1040_83550_1.7.6_1" || itemId == "48_1040_83550_1.7.6_2" ||
        itemId == "48_1040_83551_1.7.7_1" || itemId == "48_1040_83551_1.7.7_2") {

        var isChecked_171_2 = document.getElementById("48_1040_83545_1.7.1_2").checked;
        var isChecked_174_2 = document.getElementById("48_1040_83548_1.7.4_2").checked;
        var isChecked_175_2 = document.getElementById("48_1040_83549_1.7.5_2").checked;
        var isChecked_176_2 = document.getElementById("48_1040_83550_1.7.6_2").checked;
        var isChecked_177_2 = document.getElementById("48_1040_83551_1.7.7_2").checked;

        if (isChecked_171_2 && isChecked_174_2 && isChecked_175_2 && isChecked_176_2 && isChecked_177_2) {

            document.getElementById("48_1040_83555_1.8.1_2").checked = false;
            document.getElementById("48_1040_83556_1.8.2_2").checked = false;
            document.getElementById("48_1040_83557_1.8.3_2").checked = false;

            document.getElementById("48_1040_83560_1.9.1_1").checked = false;
            document.getElementById("48_1040_83561_1.9.2_1").checked = false;
            document.getElementById("48_1040_83562_1.9.3_1").checked = false;


            document.getElementById("48_1040_83555_1.8.1_1").disabled = true;
            document.getElementById("48_1040_83556_1.8.2_1").disabled = true;
            document.getElementById("48_1040_83557_1.8.3_1").disabled = true;
            document.getElementById("48_1040_83558_1.8.4_1").disabled = true;

            document.getElementById("48_1040_83555_1.8.1_1").value = "";
            document.getElementById("48_1040_83556_1.8.2_1").value = "";
            document.getElementById("48_1040_83557_1.8.3_1").value = "";
            document.getElementById("48_1040_83558_1.8.4_1").value = "";

            document.getElementById("48_1040_83555_1.8.1_2").disabled = true;
            document.getElementById("48_1040_83556_1.8.2_2").disabled = true;
            document.getElementById("48_1040_83557_1.8.3_2").disabled = true;

            document.getElementById("48_1040_83560_1.9.1_1").disabled = true;
            document.getElementById("48_1040_83561_1.9.2_1").disabled = true;
            document.getElementById("48_1040_83562_1.9.3_1").disabled = true;



        }
        else {
            document.getElementById("48_1040_83555_1.8.1_2").disabled = false;
            document.getElementById("48_1040_83556_1.8.2_2").disabled = false;
            document.getElementById("48_1040_83557_1.8.3_2").disabled = false;
            document.getElementById("48_1040_83560_1.9.1_1").disabled = false;
            document.getElementById("48_1040_83561_1.9.2_1").disabled = false;
            document.getElementById("48_1040_83562_1.9.3_1").disabled = false;

            document.getElementById("48_1040_83555_1.8.1_1").disabled = false;
            document.getElementById("48_1040_83556_1.8.2_1").disabled = false;
            document.getElementById("48_1040_83557_1.8.3_1").disabled = false;
            document.getElementById("48_1040_83558_1.8.4_1").disabled = false;

        }
    }

    /* ACTUALIZAT 26.02.2025       
             
   if (itemId == "48_1040_83560_1.9.1_1" || itemId == "48_1040_83561_1.9.2_1"|| itemId == "48_1040_83562_1.9.3_1") {
      
       var isChecked_191_1 = document.getElementById("48_1040_83560_1.9.1_1").checked;
       var isChecked_192_1 = document.getElementById("48_1040_83561_1.9.2_1").checked;
       var isChecked_193_1 = document.getElementById("48_1040_83562_1.9.3_1").checked;
    
       if (isChecked_191_1 || isChecked_192_1 || isChecked_193_1) {
          
           document.getElementById("48_1040_83564_1.10.1_1").checked = false;       
           document.getElementById("48_1040_83565_1.10.2_1").checked = false;         
           document.getElementById("48_1040_83566_1.10.3_1").checked = false;
           
           document.getElementById("48_1040_83564_1.10.1_1").disabled = true;
           document.getElementById("48_1040_83565_1.10.2_1").disabled = true;
           document.getElementById("48_1040_83566_1.10.3_1").disabled = true;   
           
           }
      else {
           document.getElementById("48_1040_83564_1.10.1_1").disabled = false;       
           document.getElementById("48_1040_83565_1.10.2_1").disabled = false;         
           document.getElementById("48_1040_83566_1.10.3_1").disabled = false;
           
           document.getElementById("48_1040_83564_1.10.1_1").disabled = false;
           document.getElementById("48_1040_83565_1.10.2_1").disabled = false;
           document.getElementById("48_1040_83566_1.10.3_1").disabled = false;         
           }}
           
    */
    if (itemId == "48_1040_83568_1.11.1_1" || itemId == "48_1040_83568_1.11.1_2" || itemId == "48_1040_83569_1.11.2_1" || itemId == "48_1040_83569_1.11.2_2") {

        var isChecked_1111_2 = document.getElementById("48_1040_83568_1.11.1_2").checked;
        var isChecked_1112_2 = document.getElementById("48_1040_83569_1.11.2_2").checked;

        if (isChecked_1111_2 && isChecked_1112_2) {

            document.getElementById("48_1040_83570_1.11.3_1").checked = false;
            document.getElementById("48_1040_83570_1.11.3_2").checked = false;
            document.getElementById("48_1040_83676_1.12.1_1").checked = false;
            document.getElementById("48_1040_83676_1.12.1_2").checked = false;
            document.getElementById("48_1040_83676_1.12.1_3").checked = false;

            document.getElementById("48_1040_83677_1.12.2_1").checked = false;
            document.getElementById("48_1040_83677_1.12.2_2").checked = false;
            document.getElementById("48_1040_83677_1.12.2_3").checked = false;

            document.getElementById("48_1040_83678_1.12.3_1").checked = false;
            document.getElementById("48_1040_83678_1.12.3_2").checked = false;
            document.getElementById("48_1040_83678_1.12.3_3").checked = false;

            document.getElementById("48_1040_83679_1.12.4_1").checked = false;
            document.getElementById("48_1040_83679_1.12.4_2").checked = false;
            document.getElementById("48_1040_83679_1.12.4_3").checked = false;

            document.getElementById("48_1040_83680_1.12.5_1").checked = false;
            document.getElementById("48_1040_83680_1.12.5_2").checked = false;
            document.getElementById("48_1040_83680_1.12.5_3").checked = false;

            document.getElementById("48_1040_83682_1.12.6_1").checked = false;
            document.getElementById("48_1040_83682_1.12.6_2").checked = false;
            document.getElementById("48_1040_83682_1.12.6_3").checked = false;

            document.getElementById("48_1040_83683_1.12.7_1").checked = false;
            document.getElementById("48_1040_83683_1.12.7_2").checked = false;
            document.getElementById("48_1040_83683_1.12.7_3").checked = false;

            document.getElementById("48_1040_83684_1.12.8_1").checked = false;
            document.getElementById("48_1040_83684_1.12.8_2").checked = false;
            document.getElementById("48_1040_83684_1.12.8_3").checked = false;

            document.getElementById("48_1040_83685_1.12.9_1").checked = false;
            document.getElementById("48_1040_83685_1.12.9_2").checked = false;
            document.getElementById("48_1040_83685_1.12.9_3").checked = false;

            document.getElementById("48_1040_83570_1.11.3_1").disabled = true;
            document.getElementById("48_1040_83570_1.11.3_2").disabled = true;
            document.getElementById("48_1040_83676_1.12.1_1").disabled = true;
            document.getElementById("48_1040_83676_1.12.1_2").disabled = true;
            document.getElementById("48_1040_83676_1.12.1_3").disabled = true;

            document.getElementById("48_1040_83677_1.12.2_1").disabled = true;
            document.getElementById("48_1040_83677_1.12.2_2").disabled = true;
            document.getElementById("48_1040_83677_1.12.2_3").disabled = true;

            document.getElementById("48_1040_83678_1.12.3_1").disabled = true;
            document.getElementById("48_1040_83678_1.12.3_2").disabled = true;
            document.getElementById("48_1040_83678_1.12.3_3").disabled = true;

            document.getElementById("48_1040_83679_1.12.4_1").disabled = true;
            document.getElementById("48_1040_83679_1.12.4_2").disabled = true;
            document.getElementById("48_1040_83679_1.12.4_3").disabled = true;

            document.getElementById("48_1040_83680_1.12.5_1").disabled = true;
            document.getElementById("48_1040_83680_1.12.5_2").disabled = true;
            document.getElementById("48_1040_83680_1.12.5_3").disabled = true;

            document.getElementById("48_1040_83682_1.12.6_1").disabled = true;
            document.getElementById("48_1040_83682_1.12.6_2").disabled = true;
            document.getElementById("48_1040_83682_1.12.6_3").disabled = true;

            document.getElementById("48_1040_83683_1.12.7_1").disabled = true;
            document.getElementById("48_1040_83683_1.12.7_2").disabled = true;
            document.getElementById("48_1040_83683_1.12.7_3").disabled = true;

            document.getElementById("48_1040_83684_1.12.8_1").disabled = true;
            document.getElementById("48_1040_83684_1.12.8_2").disabled = true;
            document.getElementById("48_1040_83684_1.12.8_3").disabled = true;

            document.getElementById("48_1040_83685_1.12.9_1").disabled = true;
            document.getElementById("48_1040_83685_1.12.9_2").disabled = true;
            document.getElementById("48_1040_83685_1.12.9_3").disabled = true;


        }
        else {
            document.getElementById("48_1040_83570_1.11.3_1").disabled = false;
            document.getElementById("48_1040_83570_1.11.3_2").disabled = false;
            document.getElementById("48_1040_83676_1.12.1_1").disabled = false;
            document.getElementById("48_1040_83676_1.12.1_2").disabled = false;
            document.getElementById("48_1040_83676_1.12.1_3").disabled = false;

            document.getElementById("48_1040_83677_1.12.2_1").disabled = false;
            document.getElementById("48_1040_83677_1.12.2_2").disabled = false;
            document.getElementById("48_1040_83677_1.12.2_3").disabled = false;

            document.getElementById("48_1040_83678_1.12.3_1").disabled = false;
            document.getElementById("48_1040_83678_1.12.3_2").disabled = false;
            document.getElementById("48_1040_83678_1.12.3_3").disabled = false;

            document.getElementById("48_1040_83679_1.12.4_1").disabled = false;
            document.getElementById("48_1040_83679_1.12.4_2").disabled = false;
            document.getElementById("48_1040_83679_1.12.4_3").disabled = false;

            document.getElementById("48_1040_83680_1.12.5_1").disabled = false;
            document.getElementById("48_1040_83680_1.12.5_2").disabled = false;
            document.getElementById("48_1040_83680_1.12.5_3").disabled = false;

            document.getElementById("48_1040_83682_1.12.6_1").disabled = false;
            document.getElementById("48_1040_83682_1.12.6_2").disabled = false;
            document.getElementById("48_1040_83682_1.12.6_3").disabled = false;

            document.getElementById("48_1040_83683_1.12.7_1").disabled = false;
            document.getElementById("48_1040_83683_1.12.7_2").disabled = false;
            document.getElementById("48_1040_83683_1.12.7_3").disabled = false;

            document.getElementById("48_1040_83684_1.12.8_1").disabled = false;
            document.getElementById("48_1040_83684_1.12.8_2").disabled = false;
            document.getElementById("48_1040_83684_1.12.8_3").disabled = false;

            document.getElementById("48_1040_83685_1.12.9_1").disabled = false;
            document.getElementById("48_1040_83685_1.12.9_2").disabled = false;
            document.getElementById("48_1040_83685_1.12.9_3").disabled = false;
        }
    }


    if (itemId == "48_1040_83545_1.7.1_2" || itemId == "48_1040_83545_1.7.1_1") {

        var isChecked_171_2 = document.getElementById("48_1040_83545_1.7.1_2").checked;

        if (isChecked_171_2) {

            document.getElementById("48_1040_83546_1.7.2_1").checked = false;
            document.getElementById("48_1040_83546_1.7.2_2").checked = false;
            document.getElementById("48_1040_83547_1.7.3_1").checked = false;
            document.getElementById("48_1040_83547_1.7.3_2").checked = false;

            document.getElementById("48_1040_83546_1.7.2_1").disabled = true;
            document.getElementById("48_1040_83546_1.7.2_2").disabled = true;
            document.getElementById("48_1040_83547_1.7.3_1").disabled = true;
            document.getElementById("48_1040_83547_1.7.3_2").disabled = true;


        }
        else {
            document.getElementById("48_1040_83546_1.7.2_1").disabled = false;
            document.getElementById("48_1040_83546_1.7.2_2").disabled = false;
            document.getElementById("48_1040_83547_1.7.3_1").disabled = false;
            document.getElementById("48_1040_83547_1.7.3_2").disabled = false;



        }
    }



    if (itemId == "48_1040_83555_1.8.1_2" && isChecked == true) {
        document.getElementById("48_1040_83555_1.8.1_1").disabled = true;

        document.getElementById("48_1040_83555_1.8.1_1").value = "";
    }
    else {
        document.getElementById("48_1040_83555_1.8.1_1").disabled = false;

    }

    if (itemId == "48_1040_83556_1.8.2_2" && isChecked == true) {
        document.getElementById("48_1040_83556_1.8.2_1").disabled = true;

        document.getElementById("48_1040_83556_1.8.2_1").value = "";
    }
    else {
        document.getElementById("48_1040_83556_1.8.2_1").disabled = false;

    }


    if (itemId == "48_1040_83557_1.8.3_2" && isChecked == true) {
        document.getElementById("48_1040_83557_1.8.3_1").disabled = true;

        document.getElementById("48_1040_83557_1.8.3_1").value = "";
    }
    else {
        document.getElementById("48_1040_83557_1.8.3_1").disabled = false;

    }
}





