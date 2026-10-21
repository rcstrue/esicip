
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="ctl00_Head1"><title>
	ESIC
</title><link media="screen" href="../App_Themes/CSS/layout.css" rel="stylesheet" type="text/css" /><link rel="stylesheet" type="text/css" href="../App_Themes/CSS/CSSglobal.css" /><link rel="stylesheet" type="text/css" href="../App_Themes/CSS/csstaskhome.css" />
    <base target="_self" />

     <script type="text/javascript">
        
      function disableBackButton() {
                window.history.forward();
            }
            setTimeout("disableBackButton()", 0);
    </script>
    <script language="javascript" type="text/javascript">

        function getPage() {
            window.opener = self;
            window.close();

        }
        openWins = new Array();
        curWin = 0;

        function openWin(page) {
            openWins[curWin++] = window.open(page, '_blank','width=2000,height=2000, scrollbars=auto');
        }

        function closeAll() {
            
            for (i = 0; i < openWins.length; i++)
                if (openWins[i] && !openWins[i].closed) openWins[i].close();
        }
     </script>
<script type="text/javascript" language="javascript">
    
     // New code to control right Click.
     function rightclickControl() {

         var allElements = document.getElementsByTagName("*");
         if (allElements.length > 0) {
             for (j = 0; j < allElements.length; j++) {
                 if (allElements[j].tagName == "A") {
                     allElements[j].onmouseout = function() {
                         document.oncontextmenu = function() {
                             return true;
                         };
                     };
                     allElements[j].onmouseover = function() {
                         document.oncontextmenu = function() {
                             return false;
                         };
                     };
                 }
             }
         }
     }


     function mouseDown(e) {


         var ctrlPressed = 0;
         var altPressed = 0;
         var shiftPressed = 0;

         if (parseInt(navigator.appVersion) > 3) {

             var evt = e ? e : window.event;

             if (document.layers && navigator.appName == "Netscape" && parseInt(navigator.appVersion) == 4) {
                 // NETSCAPE 4 CODE
                 var mString = (e.modifiers + 32).toString(2).substring(3, 6);
                 shiftPressed = (mString.charAt(0) == "1");
                 ctrlPressed = (mString.charAt(1) == "1");
                 altPressed = (mString.charAt(2) == "1");
                 self.status = "modifiers=" + e.modifiers + " (" + mString + ")"
             }
             else {
                 // NEWER BROWSERS [CROSS-PLATFORM]
                 shiftPressed = evt.shiftKey;
                 altPressed = evt.altKey;
                 ctrlPressed = evt.ctrlKey;
                 self.status = "" + "shiftKey=" + shiftPressed + ", altKey=" + altPressed + ", ctrlKey=" + ctrlPressed
             }
             if (shiftPressed || altPressed || ctrlPressed)
                 alert("Navigation Cancelled !\n" + (shiftPressed ? "" : "") + (altPressed ? "" : "") + (ctrlPressed ? "" : ""))
         }
         return true;
     }
     if (parseInt(navigator.appVersion) > 3) {
         document.onmousedown = mouseDown;
         if (navigator.appName == "Netscape")
             document.captureEvents(Event.MOUSEDOWN);
     }

   //  rightclickControl();

     //End New code to control right click.
        
    </script>
   


<script type="text/Javascript" language="javascript" src="../App_Themes/JS/esic.js"></script>
<link href="/InsuranceGlobalWebV4/WebResource.axd?d=Vfq88GPHnLgpA1DfLBXAPAwN_9jTbDofysm8I3AVqU4yagjMRkxIkW9HMIwDMWYxD8Kl9DudY51VML9nrAVybpypDgfMrPK1aNyatsrMxM50K5Wy-C0-U5Wca6uBQ-1pVtrelQ2&amp;t=636010848540000000" type="text/css" rel="stylesheet" /></head>
<body onload="rightclickControl()" onload="disableBackButton()" onunload="closeAll()"   oncontextmenu="return false" >
<div id="minHeight"></div>
    <form method="post" action="./EmployeeCounterFoilRegistration.aspx?emprMasterPk=ihwL+TeeZPI%3d&amp;emprTmpPK=&amp;subUnitCode=&amp;Flag=5vmQrXZYNNo%3d&amp;emprCode=UKzg%2founps0MYEuhR3DRN82Bj2yTYxpN&amp;Mobile=7gYFMOA84QdDRA5tZ5Q5+Q%3d%3d&amp;Mobileseed=JUGm1Rbj4gM%3d&amp;status=&amp;aadhaarNo=" onsubmit="javascript:return WebForm_OnSubmit();" onkeypress="javascript:return WebForm_FireDefaultButton(event, 'ctl00_Test')" id="aspnetForm" enctype="multipart/form-data">
<div class="aspNetHidden">
<input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
<input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
<input type="hidden" name="__LASTFOCUS" id="__LASTFOCUS" value="" />
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="zIw+cG6wItz0sJ3aTKBnEAf4yrcDzyoaHP6Hc+MLEzv0VnThag0PUBwLlQnUcc8/P1M8qj0lBjuZhWcOXqJPlLp6kVxaHp9EV6OkcaW3VdOT3SRSIxtREdMqquCfLrEP4GF4EbSLZWienE1ZivytjlEhTsTLeVLCcbnoHlVZ0Dp1Ho7qA7U6XIW8RgJGjaqOOkI11JQSb/iTlBP+mWW8A8Q0a8mZHIgv+XsB1CvOzCb9H/CdrwdHqDxgfK2/TSt/bkqhK6713xt5vEJXOV0gywpGE8ZeVmQNPNLkAKboPRp/N3ko/tUgJVjs20GuJiHL3ay/ToPbFr23eEMGhXfACx4UU6xd2mny4/sB80zQiQ2JR3codJeEh+8Iu8DR9o4vSshD6TC+SrXEGCqfxL+Mz3oICKIzwQW4+4clFsQRWWsXvxQecnADKkczKA/nmNdjTlYZ2GQ0Q6NR8g/MIHPBpBbFstUbutCDeI8d8RpmLvSH0TZmQHr6LOiJbFjBOsnUguqlwvx6gKR6F3usyhQiugHJWlwFV1hmpV93MK0ME0qgFi6DzqBrs8Q44EEaOLRkpinQAcGhgJ6dhzNxvjtiJiyAOQ90ZG8GQ6kbgBu40IjeRBmCxB3rHwbxJUf0O76lRL9vg0gdcVSB7fYm9UCmg41Y2tSPbJ6eYwcojXEM7MTA1qbR7gsFgBt4RoV80zXb8+GAhYH20s0jMEiXKKwGOvwqQZre4R6P0y8zEjkV5vMQ+QA/ILvWgGxmeOBhgLE4Q4xIE1/GYfVrc/wVb8wm7jdYNapnliilYb/XMZdzGNUUz6gROpEE8ofiAkw5BGy96kTKpBwZjrEVPzJce+V5TL/ZY5wlDbyMJSnorR8gDOUCCVJiP+gbNqcK3XJrRE3Jg/lVAFh+Rq28xYWtsMtMKZupwu2FpTv5QEiFtGbiGE5mdPmX" />
</div>

<script type="text/javascript">
//<![CDATA[
var theForm = document.forms['aspnetForm'];
if (!theForm) {
    theForm = document.aspnetForm;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>
</script>


<script src="/InsuranceGlobalWebV4/WebResource.axd?d=pynGkmcFUV13He1Qd6_TZPEcwF2MLbN130Art7N7lKPSxy8K4H0W4eCuiJdyRSpPmcCZag2&amp;t=639230470023533686" type="text/javascript"></script>


<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=nv7asgRUU0tRmHNR2D6t1Jf2DS_HIF2rfS5uJ-pm13bUEGsCLuOwjdAAQk-I7XSyN6AbJbMwMXU6OJCzQM3j_4Z4YUp8vMrw9zO-Sp03XEbhfGh3ksVsK4L1AGZprjsZ3bl3lA2&amp;t=ffffffffa0bc9515" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=NJmAwtEo3Ipnlaxl6CMhvslJlHH3G7HumwC1wwNRVj3k2yOnV0bbKbacGbCOQPqH-l2V1NS7CbNNvnW01NT7qa9P454WAVI6jTIvgH_26YKJAiImKFt5hVa2DTQ5DQdOinK_kZ90r9ZtqiooTZJFzyaQZJY1&amp;t=ffffffffe6d5a9ac" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=dwY9oWetJoJoVpgL6Zq8OL6ygv_uCtqgdaixDSvMyoZOa3hxGH5JpTZGPZqbYxSFImy_uHVdhYEwzayROwmuB9hOA5Z4zPHzl9bEGmkPMO17aZIV-oFcYH8yNe7-gIM-AddpzzmdmGI0H0u55ke0JWP8hec1&amp;t=ffffffffe6d5a9ac" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=LkSbRRtTbnpvh0g927IxkDnUNt3e2Oxr8tl396fAwV2OgYPb6ZYQiU88xDwKP7Cx3jO4QRVkc_syQlRfjyMKhhbF2TFba6j-2FNXs-j4VlYa-LTRFe9hqsZJbZKQAvJOoazoqQ2&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=8CjII1v0OLoMNKf5zGXmek6ohMvZjCCPcRcIiqYLmOOAPQf3A2BbK37eN908WIzOAUNhl-GFUaat8zUw5H5sU71mnMaV1jynd0Bm52Bzgkc6hv2pifs6DXYTIc3Q6yLOu8VXtdvpiUaWIJIPqd-YMwW_L2I1&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=qiCbui8_q4m0BAPh1b3lI6d86V5wXha8Ft6_fuycOr-BR3F96gn-WQNREw0cPcRgbEGAz_CbMJd48cFrePkO03Gv-b2cZvcNjV8dNeDlEcc6bem5L13V2qr_B_pTNMzEzV38lPOEAt26LsOPTqE9P_hFOfEmbkwTPmrIV60L2THLLMGx0&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=JcDYB5KVMsBIe_7HUCQE4Jc7QdBKhue_LPixnZteF-AUNdyBy8zjfZeux6D7DslJZDVrJ0i4IEeUkg_1FkoS99tHl-MuL4T4xojEDfjFAaJWeRrrklWP0JCfLBK6lLeC39e7ZA2&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=dMtrWYtYVdP90oUUR-ZVm9cBkkvXq7qllH4OqEvcfUuuntoHYkMc4IDmybts3QBI8uxLCWeOatujIz2kthpoMccWJTGh-FSa0ePzVKSNhJUe9Xkm47H2G7bdhrs92csB8bhtPA2&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=beb9cQ9ZLEsvO0Gw0Ci-lLlxCSwCPXx1VR4bStvFHmbtfGjqq0loIcNp42Rc4s9gBDg1qvgumMNkoJFRZ5RFXGXQ_wujBDWAEL6meqoKjTUTvLeZWpcw6fasdCeIykmX30JYbw2&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=C9WdBxfNqt6Csn74N1Lo1OPLsCgv5S107CHFaSwTEacYvvnpKaUYSAiyELKOMZSABt3Y3rkk-4K3aUiCiVM-VQKwvYQQmXPyewUDpDvmenWyz1fEWkdUy9S5nPmuS3c732NNsJe_Kp1e_aBsfdatlezKjyw1&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=EwsiQnKDlVgWkam2Dn1gFMA6OutqPgivM2eYPGMHHBc4otVK_7zJLPMoBrRZD20p17RTRrXlSrSVilCHHB_7mu_tVZ724OUuHiPe20oH23L9O5u7QDhgO_PW6dAfgJ63KJmBI5eDFyhAs3iQ4zwdVNSbU9A1&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=qOXJv4kGrdDSKonndTkxcraXUAammeXV127z9S6slN3vHM5t80b_lueTs4-J1YOFJfFgNIiorKg3o9g_BjqS_uFv8rckJuqNERD2GvZQxkRQFMVD-uY5UpyJnfGcK5OAk0Fz5A2&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=TIsuG4CcHpFynuzefqZk6sAXBsLL-ZZMhBSKMQCU2TX7b9oFRupcN3cjwyyOnFZJCz2k1DNcGlMUqQWzNjXoJhzMBq-zgroPA9oFpsDb9H8_EwXCt5wQlozKdVuqNavPaf6xa9BYqXCInn-FcXPmnr5WbBs1&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=5JV_HzXC51KbVUbSK0puXDWWyB16CGNgi8TLbSKN3oOeHOzJEtN434rdbBRIxxWa0y8g76ug2gBt0L4WcfArJ2tG5yqI0s18nhc2J4Nc7tlSPYWLiC_9k0PhjR90MrjypSjM88rJGmPCFJFs9RNMod5GkNA1&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=5FocryJ2cv5qg4FLY9c9yj1TIcw9bk3cC9NXR-W-bYmQQAP-GKfNeQyzQ3kfGuxjXXBeu1Iq5P1JiQS_n0Wk1kq43yzgKb7GWPG_X9p4E_pGffST5JqPMJqpljvCWvSTKHK7be8LsQPcXWCLwzQHzcBKYyU1&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=KX4QNANnKa1x0eXaV-mU8eTQ7TPEJvAbLm3-jIJfnaiGa6zQtWD1Xk_44Bj85J-DaDqM7HlH-Hc1Qg_VjQ5PRhmI9Fh2FQrsXGqEsOa-pWJL2vibKGzgtnYKXbM0bW8kz0vh3mvsHfOunqaUeL8IReavOd1DuuDJG9mAVs63IQvg3fOm0&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=xBoAaY2gMNDIXUBp-mSd-E4Q8BiYLRaE8KBiNxtrz9lFuTQDt_Eg8IGpQIsZ8ZLzMtcqowM0nTpxX4AXRdIL-B1mKHd0QyQLO0On_rHIJAVJe-cdZ5HwzfeXWurrMOD4Rh7eLX5ns90eZt7pXgkLYo0HPUw1&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=ARLCQT9A5Y3qvwz7XXyq1PbPtcBp9CzCnH8VnkfTu9F2K8-pVAVOyQrid5_MSpCFSERv4ybRRWdnhoivIxy0ayHc1TrccK9eBzA5kbYZa-ok6L1GLftcmabv9qwGm5RtDRYYhWxH4-scTgJV-ToKCUPGEJ14XLsMIsEGZJdrnJ9VJrp10&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=bA03AV4s9-VFMjh0KH3xxdO0EAsnZQXigw8ehQEeHLVT3J2ofyIz94vX2qp47Vuga3vmPqmBdLX_tNitu65b2ahCYZtgDKJk9LH41B7oL7XVnkDKFspYBczWWufJX3gyS55Y61bVe2q2UB6W24C3vuv2qFE1&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script type="text/javascript">
//<![CDATA[
function WebForm_OnSubmit() {
if (typeof(ValidatorOnSubmit) == "function" && ValidatorOnSubmit() == false) return false;
return true;
}
//]]>
</script>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="0DBF46BF" />
</div>
    <div id="outer">
    
   
    <table id="ctl00_Table2" cellspacing="0" cellpadding="0" align="Center" style="border-width:0px;height:60px;width:100%;border-collapse:collapse;">
	<tr>
		<td class="tHeadImage" align="left"><img id="ctl00_ESICLogo" src="../App_Themes/Images/Small%20Logo.jpg" align="absmiddle" style="border-width:0px;" /></td><td class="tHeadImage" align="center"></td><td class="tHeadImage" align="right"><img id="ctl00_Image1" src="../App_Themes/Images/IndianSymbol.jpg" align="absmiddle" style="border-width:0px;" /></td>
	</tr><tr>
		<td align="center" colspan="3" style="height:25px;width:100%;"><table id="ctl00_Table3" cellspacing="0" cellpadding="0" style="height:100%;width:100%;border-collapse:collapse;">
			<tr>
				<td class="dataBlock" align="left" style="width:8%;">
                                    Employer Login:    
                                    </td><td class="dataBlock" align="left" style="width:58%;"><span id="ctl00_lbluserName" style="background-color:Transparent;">39000547790001019</span></td><td class="dataBlock" style="width:23%;">
                                    <div id="raw">Tuesday, October 20, 2026 1:05:25 PM</div>
                                    <div id="Div1">0</div>
                                    </td><td class="homelink" align="right">

                                    
                                            </a>&nbsp;&nbsp;
                                        &nbsp;&nbsp;
                                        
&nbsp;&nbsp;

                                            <input type="submit" name="ctl00$Test" value="Button" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$Test&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_Test" style="display:none;" /><input type="submit" name="ctl00$dummybutton" value="" id="ctl00_dummybutton" style="border-width:0px;font-weight:bold;height:0px;width:0px;" /></td>
			</tr>
		</table></td>
	</tr>
</table>

                        <table id="ctl00_Table5" cellspacing="0" cellpadding="0" align="Center" style="border-width:0px;width:100%;border-collapse:collapse;">
	<tr>
		<td colspan="5" style="background-color:White;width:100%;">
                            
                            
                            <div align="center">
                                
                            </div>
                            
                            
                            
                        </td>
	</tr><tr>
		<td colspan="5" style="background-color:White;width:100%;">
    <style type="text/css">
        .modalBackground {
            background-color: Black;
            filter: alpha(opacity=60);
            opacity: 0.6;
        }

        .modalPopup {
            background-color: #FFFFFF;
            width: 500px;
            border: 3px solid #FFFFFF;
            border-radius: 12px;
            padding: 0;
        }
    </style>
    <style type="text/css">
        .divModalDialog {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: none;
            text-align: center;
            z-index: 101;
        }

            .divModalDialog:target {
                display: block;
            }

        #ctl00_HomePageContent_cEDOA_popupDiv {
            background: #fff !important;
            z-index: 99999 !important;
        }
    </style>

    <script src="stateDist.js" type="text/javascript"></script>

    <script src="../App_Themes/JS/jquery1.js" type="text/javascript">
    </script>

    <script type="text/javascript" src="../App_Themes/JS/jquery.min.js"></script>

    <script type="text/javascript" src="../App_Themes/JS/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

    <script type="text/javascript" src="../App_Themes/JS/jquery.maskedinput-1.3.js"></script>

    <script type="text/javascript" language="JavaScript">

        function checkTime() {

            var timestamp = document.getElementById('ctl00_HomePageContent_txteiddate').value;
            var Idnum = document.getElementsByName('timezone2');
            if (validateTimestamp(timestamp)) {

            } else {
                return false;
            }
            if (Idnum.value == "") {
                alert("Please Enter Enrolment ID");
                Idnum.focus();
                return false;
            }
        }
        function validateTimestamp(timestamp) {
            var parts = timestamp.split('/');
            var partdiff1 = timestamp.split(':');

            if (parts.length < 3)
                return false;
            else {
                var day = parseInt(parts[0]);
                var month = parseInt(parts[1]);
                var year = parseInt(parts[2]);
                if (isNaN(day) || isNaN(month) || isNaN(year)) {
                    return false;
                }

                if (day < 1 || year < 1)
                    return false;
                if (month > 12 || month < 1)
                    return false;
                if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31)
                    return false;
                if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30)
                    return false;
                if (month == 2) {
                    if (((year % 4) == 0 && (year % 100) != 0) || ((year % 400) == 0 && (year % 100) == 0)) {
                        if (day > 29)
                            return false;
                    } else {
                        if (day > 28)
                            return false;
                    }
                }
                return true;
            }
        }
		        //MRID C57958916 to show the if gender radio button is not selected 

		 function validateAndOpenFamilyPopup() {
     var rblGender = document.getElementsByName('ctl00$HomePageContent$ctrlRDMale');
     //var rblSelection = document.getElementsByName('ctl00$HomePageContent$ctrlFatherOrHus');

     var isGenderSelected = false;
    // var isSelectionSelected = false;

     for (var i = 0; i < rblGender.length; i++) {
         if (rblGender[i].checked) {
             isGenderSelected = true;
             break;
         }
     }

     //for (var j = 0; j < rblSelection.length; j++) {
     //    if (rblSelection[j].checked) {
     //        isSelectionSelected = true;
     //        break;
     //    }
     //}

     if (!isGenderSelected) {
         alert('Please select  Gender before entering Family Details.');
         return false;
     }

     openWin('FamilyDetails_New.aspx', '', 'dialogWidth:1000px; dialogHeight:800px; center:yes');
     return true;
 }

    </script>

    <script src="stateDist.js" type="text/javascript"></script>

    <script src="loc.js" type="text/javascript"></script>

    <div id="ctl00_HomePageContent_cover" class="divModalDialog">
    </div>
   <script type="text/javascript">
//<![CDATA[
Sys.WebForms.PageRequestManager._initialize('ctl00$HomePageContent$ScriptManager1', 'aspnetForm', ['tctl00$HomePageContent$UpdatePanel1','','tctl00$HomePageContent$upDispIMPState','','tctl00$HomePageContent$UpdatePanel2',''], [], ['ctl00$HomePageContent$Submit','','ctl00$HomePageContent$btnSubmit','','ctl00$HomePageContent$ctrlRDIpDisable','','ctl00$HomePageContent$ctrlTextDisableType','','ctl00$HomePageContent$ctrlTextEmpName','','ctl00$HomePageContent$Reset','','ctl00$HomePageContent$btncancel','','ctl00$HomePageContent$ddlDispensaryState','','ctl00$HomePageContent$ddldependantDispensaryState','','ctl00$HomePageContent$UploadButton',''], 90, 'ctl00');
		//]]>
</script>

    <table width="100%" align="center" cellpadding="0" cellspacing="0" rules="Dynamic">
        <tr class="lastData_Section">
            <td valign="top" class="contentTabletd" align="left">
                <table width="100%" border="0" cellpadding="2" valign="middle" align="center" cellspacing="0"
                    class="separator" id="Table7">
                    <tr class="lastData_Section">
                        <td>
                            <span class="bread"><b>Employer</b> &gt;</span> <span class="breadtitle">Employee Registration</span>
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellpadding="2" valign="middle" align="center" cellspacing="0"
                    class="separator" id="tblUser">
                    <tr class="lastData_Section">
                        <td valign="top" align="left">
                            <div id="ctl00_HomePageContent_UpdatePanel1">
			
                                    <div id="ctl00_HomePageContent_Panel1" onkeypress="javascript:return WebForm_FireDefaultButton(event, &#39;ctl00_HomePageContent_Submit&#39;)">
				
                                        <table width="100%" border="0" cellpadding="2" cellspacing="0" class="internalTable">
                                            <tr>
                                                <td class="pageHeader" colspan="6">
                                                    <table width="100%">
                                                        <tr>
                                                            <td class="pageHeaderText">Employees Registration Form-1
                                                            </td>
                                                            <td valign="bottom" class="mandatoryField">* Required Fields
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr id="RowCreate1">
                                                <td colspan="6" class="sectionHeader">Insured Person's Particulars &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                                    <span id="ctl00_HomePageContent_ctrlLabelSaved"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="leftTopFormLabel" colspan="2" width="20%">1.(a) Is IP Disabled:<span class="mandatoryField">*</span>
                                                </td>
                                                <td class="lastFormValue" colspan="1">
                                                    <table id="ctl00_HomePageContent_ctrlRDIpDisable">
					<tr>
						<td><input id="ctl00_HomePageContent_ctrlRDIpDisable_0" type="radio" name="ctl00$HomePageContent$ctrlRDIpDisable" value="Yes" onclick="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlRDIpDisable$0\&#39;,\&#39;\&#39;)&#39;, 0)" tabindex="1" /><label for="ctl00_HomePageContent_ctrlRDIpDisable_0">Yes</label></td><td><input id="ctl00_HomePageContent_ctrlRDIpDisable_1" type="radio" name="ctl00$HomePageContent$ctrlRDIpDisable" value="No" checked="checked" tabindex="1" /><label for="ctl00_HomePageContent_ctrlRDIpDisable_1">No</label></td>
					</tr>
				</table>
                                                </td>
                                                <td class="leftTopFormLabel" colspan="2" width="20%">1.(b) Type of Disability:
                                                </td>
                                                <td class="lastFormValue" colspan="1">
                                                    <select name="ctl00$HomePageContent$ctrlTextDisableType" id="ctl00_HomePageContent_ctrlTextDisableType" disabled="disabled" tabindex="2" class="aspNetDisabled" class="txtbox">
					<option selected="selected" value="0">---Please Select---</option>
					<option value="1">BLINDNESS</option>
					<option value="2">LOW VISION</option>
					<option value="3">HEARING IMPAIRED</option>
					<option value="4">LOCO MOTOR DISABILITY/ CEREBRAL PALSY</option>
					<option value="5">MENTAL RETARDATION</option>
					<option value="7">LEPROSY CURE</option>
					<option value="6">MENTAL ILLNESS</option>
					<option value="7">LEPROSY CURE</option>
					<option value="8">AUTISM</option>
					<option value="9">MULTIPLE DISABILITY</option>
					<option value="10">UNSPECIFIED DISABILITY</option>

				</select>
                                                    <span id="ctl00_HomePageContent_reqtxtdisabled" class="errordisplay" style="display:none;">Please Select</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="leftTopFormLabel">1.(c) Select Certificate:
                                                </td>
                                                <td colspan="4" class="lastFormValue">
                                                    <input type="file" name="ctl00$HomePageContent$ctrlFISelectFile" id="ctl00_HomePageContent_ctrlFISelectFile" disabled="disabled" tabindex="3" class="aspNetDisabled txtbox" style="width:25%;" />
                                                    <input type="submit" name="ctl00$HomePageContent$btnSubmit" value="Upload" id="ctl00_HomePageContent_btnSubmit" disabled="disabled" class="aspNetDisabled btn" />
                                                    <span id="ctl00_HomePageContent_StatusLabel"></span>
                                                    <a id="ctl00_HomePageContent_href_filedownload" target="_blank" title="hello"></a>
                                                    
                                                    <input type="hidden" name="ctl00$HomePageContent$ctrlFileName" id="ctl00_HomePageContent_ctrlFileName" />
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="RowForNew">
                                                <td colspan="2" class="leftTopFormLabel">2. Name:<span class="mandatoryField">*</span>
                                                    
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <input name="ctl00$HomePageContent$ctrlTextEmpName" type="text" maxlength="45" id="ctl00_HomePageContent_ctrlTextEmpName" tabindex="4" class="cssUpperCaseTextBox" onchange="RestrictSpace(this);" />
                                                    <span id="ctl00_HomePageContent_NameInBlockRequiredFieldVal" class="errordisplay" style="display:none;">Please Enter Name</span>
                                                    
                                                    
                                                </td>
                                                <td class="leftTopFormLabel" colspan="2">3. Name of<span class="mandatoryField">*</span>
                                                      <table id="ctl00_HomePageContent_ctrlFatherOrHus" onclick="assignFather(this.id,&#39;ctrlRDMarried&#39;,&#39;ctrlRDMale&#39;)">
					<tr>
						<td><input id="ctl00_HomePageContent_ctrlFatherOrHus_0" type="radio" name="ctl00$HomePageContent$ctrlFatherOrHus" value="Father" checked="checked" tabindex="5" /><label for="ctl00_HomePageContent_ctrlFatherOrHus_0">Father</label></td><td><input id="ctl00_HomePageContent_ctrlFatherOrHus_1" type="radio" name="ctl00$HomePageContent$ctrlFatherOrHus" value="Husband" onclick="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlFatherOrHus$1\&#39;,\&#39;\&#39;)&#39;, 0)" tabindex="5" /><label for="ctl00_HomePageContent_ctrlFatherOrHus_1">Husband</label></td>
					</tr>
				</table>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <input name="ctl00$HomePageContent$ctrlTextFatherHusName" type="text" maxlength="50" id="ctl00_HomePageContent_ctrlTextFatherHusName" tabindex="6" class="txtbox" onchange="RestrictSpace(this);" />
                                                    <span id="ctl00_HomePageContent_FatherOrHusRequiredVal1" class="errordisplay" style="display:none;">Please Enter Name</span>
                                                    
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="RowForNew">
                                                <td class="leftTopFormLabel" colspan="2">4. Date of Birth:<span class="mandatoryField">*</span>
                                                </td>
                                                <td class="lastFormValue" colspan="1">
                                                    <input name="ctl00$HomePageContent$ctrlTxtIpDate" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTxtIpDate" tabindex="7" class="txtbox_mid numericAlignRight" onkeypress="return CheckTabVal(event)" name="ctrlTxtIpDate" onpaste="return false" onchange="lockTextBox(this)" contenteditable="false" readonly="readonly" />
                                                    
                                                    <span id="ctl00_HomePageContent_errorLabel" style="color:Red;"></span>
                                                    <input type="hidden" name="ctl00$HomePageContent$hfErrEmpeDOB" id="ctl00_HomePageContent_hfErrEmpeDOB" />
                                                    <span id="ctl00_HomePageContent_DOBRequiredVal" class="errordisplay" style="display:none;">Please Enter A Valid Date (dd/mm/yyyy)</span>
                                                    <span id="ctl00_HomePageContent_ref_ctrlTxtIpDate" style="color:red;visibility:hidden;">Please check date format(dd/mm/yyyy)</span>
                                                </td>
                                                

                                                <td class="leftTopFormLabel" colspan="2">5. Upload Self Photo:<span class="mandatoryField">*</span> </br> 
                                                 <span style="color: red; font-size: 9.5px;">Size 50-100 KB, Format JPG, JPEG</span>
                                                    <td colspan="1" class="lastFormValue">

                                                        <input type="file" name="ctl00$HomePageContent$FileUpload_Photo" id="ctl00_HomePageContent_FileUpload_Photo" class="txtbox" />
                                                        <input type="submit" name="ctl00$HomePageContent$UploadButton" value="Upload Photo" id="ctl00_HomePageContent_UploadButton" class="btn" />
                                                        <span id="ctl00_HomePageContent_PhotoStatusLabel" style="color:Red;font-weight:bold;"></span>
                                                        <a id="ctl00_HomePageContent_href_fileUpload_Photo" target="_blank" title="hello"></a>
                                                        
                                                        <input type="hidden" name="ctl00$HomePageContent$hdnupload_Photo" id="ctl00_HomePageContent_hdnupload_Photo" />

                                                    </td>

                                                    
                                            </tr>
                                            
                                            <tr class="lastData_Section" id="Tr10">
                                                <td class="leftTopFormLabel" colspan="2">6. Marital Status:<span class="mandatoryField">*</span>
                                                </td>
                                                <td class="lastFormValue" colspan="1">
                                                    <select name="ctl00$HomePageContent$ctrlRDMarried" id="ctl00_HomePageContent_ctrlRDMarried" tabindex="11" class="txtbox" onchange="assignGender(this,&#39;ctrlRDMale&#39;,&#39;ctrlFatherOrHus&#39;)">
					<option selected="selected" value="1">UnMarried</option>
					<option value="2">Married</option>
					<option value="3">Widow</option>
					<option value="4">Widower</option>

				</select>
                                                    <span id="ctl00_HomePageContent_RequiredFieldValidatormarried" class="errordisplay" style="display:none;">Please Select Marital Status</span>
                                                </td>
                                                <td class="leftTopFormLabel" colspan="2">7. Gender:<span class="mandatoryField">*</span>
                                                </td>
                                                <td class="lastFormValue" colspan="1">
                                                     <table id="ctl00_HomePageContent_ctrlRDMale" Checked="true" onclick="assigngendermale(this.id)">
					<tr>
						<td><input id="ctl00_HomePageContent_ctrlRDMale_0" type="radio" name="ctl00$HomePageContent$ctrlRDMale" value="M" onclick="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlRDMale$0\&#39;,\&#39;\&#39;)&#39;, 0)" tabindex="12" /><label for="ctl00_HomePageContent_ctrlRDMale_0">M</label></td><td><input id="ctl00_HomePageContent_ctrlRDMale_1" type="radio" name="ctl00$HomePageContent$ctrlRDMale" value="F" onclick="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlRDMale$1\&#39;,\&#39;\&#39;)&#39;, 0)" tabindex="12" /><label for="ctl00_HomePageContent_ctrlRDMale_1">F</label></td><td><input id="ctl00_HomePageContent_ctrlRDMale_2" type="radio" name="ctl00$HomePageContent$ctrlRDMale" value="TG" onclick="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlRDMale$2\&#39;,\&#39;\&#39;)&#39;, 0)" tabindex="12" /><label for="ctl00_HomePageContent_ctrlRDMale_2">TG</label></td>
					</tr>
				</table>
                                                    <span id="ctl00_HomePageContent_RequiredFieldValidator1" class="errordisplay" style="display:none;">Please Select Gender</span>
                                                </td>
                                                <!-- <td class="lastFormValue"></td> -->
                                            </tr>
                                            

                                            

                                            <tr class="lastData_Section" id="">
                                                <td class="leftTopFormLabel" colspan="2">8.&nbspNationality:

                                                </td>
                                                <td class="lastFormValue" colspan="1">
                                                    <span id="ctl00_HomePageContent_lblNationality"></span>
                                                
                                                </td>
                                                <td class="leftTopFormLabel" colspan="2">9.&nbspAadhaar Status:
                                                </td>
                                                <td class="lastFormValue" colspan="1">
                                                    <span id="ctl00_HomePageContent_lblAadhaarStatus"></span>
                                                </td>
                                            </tr>
                                            
                                            <tr class="lastData_Section" id="Tr1">
                                                <td colspan="6" class="leftTopFormLabel">10. Present Address
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr2">
                                                <td colspan="2" class="leftTopFormLabel">Address :<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <input name="ctl00$HomePageContent$ctrlTextPresentAddress1" type="text" maxlength="50" id="ctl00_HomePageContent_ctrlTextPresentAddress1" tabindex="13" class="txtboxAddress" onchange="RestrictSpace(this); clearchkbox();" />
                                                    <span id="ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1" class="errordisplay" style="display:none;">Please Enter Address</span>
                                                    <span id="ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1" class="errordisplay" style="display:none;">Please enter valid Characters</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Pin Code:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTxtPresentPinCode" type="text" maxlength="6" id="ctl00_HomePageContent_ctrlTxtPresentPinCode" tabindex="16" class="txtbox numericAlignRight" onchange="clearchkbox();" onKeyPress="return checkNumeric(event)" />
                                                    <span id="ctl00_HomePageContent_SaveValPresPin" class="errordisplay" style="display:none;">Please Enter Valid Pin Code</span>
                                                    
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr3">
                                                <td class="leftTopFormLabel" colspan="2"></td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <input name="ctl00$HomePageContent$ctrlTextPresentAddress2" type="text" maxlength="50" id="ctl00_HomePageContent_ctrlTextPresentAddress2" tabindex="14" class="txtboxAddress" onchange="RestrictSpace(this); clearchkbox();" onkeypress="return checkSpace();" />
                                                    <span id="ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1" class="errordisplay" style="display:none;">Please enter valid Characters</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Phone No.:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPresentSTDCode" type="text" maxlength="5" id="ctl00_HomePageContent_ctrlTextPresentSTDCode" tabindex="17" class="txtbox_small numericAlignRight" onchange="clearchkbox();" onKeyPress="return checkNumeric(event)" />
                                                    -
                                                    <input name="ctl00$HomePageContent$ctrlTextPresentphoneNo" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTextPresentphoneNo" tabindex="18" class="txtbox numericAlignRight" onchange="clearchkbox();" onKeyPress="return checkNumeric(event)" />
                                                    <span id="ctl00_HomePageContent_ctrlTextPresentphonevalidator" class="errordisplay" style="visibility:hidden;">Please enter valid phone no</span>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr4">
                                                <td class="leftTopFormLabel" colspan="2"></td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <input name="ctl00$HomePageContent$ctrlTextPresentAddress3" type="text" maxlength="50" id="ctl00_HomePageContent_ctrlTextPresentAddress3" tabindex="15" class="txtboxAddress" onchange=" RestrictSpace(this); clearchkbox();" onkeypress="return checkSpace();" />
                                                    <span id="ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1" class="errordisplay" style="display:none;">Please enter valid Characters</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Mobile No.:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPresentMobNoCode" type="text" id="ctl00_HomePageContent_ctrlTextPresentMobNoCode" disabled="disabled" tabindex="-1" class="aspNetDisabled txtboxdisabled_small numericAlignRight" value="91" />
                                                    -
                                                    <input name="ctl00$HomePageContent$ctrlTextPresentMobileNo" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTextPresentMobileNo" tabindex="18" class="txtbox numericAlignRight" onchange="clearchkbox();" onKeyPress="return checkNumeric(event)" />
                                                    <span id="ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1" class="errordisplay" style="display:none;">Please Enter Valid Mobile number</span>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr14">
                                                <td colspan="2" class="leftTopFormLabel">State:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <select name="ctl00$HomePageContent$ctrlTxtPresentState" id="ctl00_HomePageContent_ctrlTxtPresentState" tabindex="19" class="txtbox" onchange="selectPresentStates();" style="width:160px;">
					<option value="-1">---Please Select---</option>

				</select>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Email:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPresentEmail" type="text" maxlength="45" id="ctl00_HomePageContent_ctrlTextPresentEmail" tabindex="21" class="txtbox" onchange="clearchkbox();" />
                                                    <span id="ctl00_HomePageContent_TextPresentEmailRegularExpressionVal" class="errordisplay" style="display:none;">Please Enter Valid Email ID</span>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr16">
                                                <td colspan="2" class="leftTopFormLabel">District:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <select name="ctl00$HomePageContent$ctrlTextPresentDistrict" id="ctl00_HomePageContent_ctrlTextPresentDistrict" tabindex="20" class="txtbox" onChange="selectpresentDistrict();" style="width:160px;">
					<option selected="selected" value="-1">---Please Select---</option>

				</select>
                                                </td>
                                                
                                            </tr>
                                            <tr class="lastData_Section" id="Tr15">
                                                <td colspan="6" class="sectionHeader">
                                                    <input id="ctl00_HomePageContent_chkboxCopyPresentAddress" type="checkbox" name="ctl00$HomePageContent$chkboxCopyPresentAddress" onclick="CopyAddress();" tabindex="22" /><label for="ctl00_HomePageContent_chkboxCopyPresentAddress">Copy Present Address to Permanent Address</label>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr16">
                                                <td colspan="6" class="leftTopFormLabel1">11. Permanent Address
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="leftTopFormLabel">Address :<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <input name="ctl00$HomePageContent$ctrlTextPermanentAddress1" type="text" maxlength="50" id="ctl00_HomePageContent_ctrlTextPermanentAddress1" tabindex="22" class="txtboxAddress" onchange="RestrictSpace(this);" />
                                                    
                                                    <span id="ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1" class="errordisplay" style="display:none;">Please enter valid Characters</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Pin Code:<span class="mandatoryField"></span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPermanentPinCode" type="text" maxlength="6" id="ctl00_HomePageContent_ctrlTextPermanentPinCode" tabindex="26" class="txtbox numericAlignRight" onKeyPress="return checkNumeric(event)" />
                                                    <span id="ctl00_HomePageContent_SaveValPermPin" class="errordisplay" style="display:none;">Please Enter Valid Pin Code</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="leftTopFormLabel" colspan="2"></td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <input name="ctl00$HomePageContent$ctrlTextPermanentAddress2" type="text" maxlength="50" id="ctl00_HomePageContent_ctrlTextPermanentAddress2" tabindex="23" class="txtboxAddress" onchange="RestrictSpace(this);" />
                                                    
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Phone No.:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPermanentSTDCode" type="text" maxlength="5" id="ctl00_HomePageContent_ctrlTextPermanentSTDCode" tabindex="27" class="txtbox_small numericAlignRight" onKeyPress="return checkNumeric(event)" />
                                                    -
                                                    <input name="ctl00$HomePageContent$ctrlTextPermanentphoneNo" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTextPermanentphoneNo" tabindex="28" class="txtbox numericAlignRight" onKeyPress="return checkNumeric(event)" />
                                                    
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="leftTopFormLabel"></td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <input name="ctl00$HomePageContent$ctrlTextPermanentAddress3" type="text" maxlength="50" id="ctl00_HomePageContent_ctrlTextPermanentAddress3" tabindex="23" class="txtboxAddress" onchange="RestrictSpace(this);" />
                                                    <span id="ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1" class="errordisplay" style="display:none;">Please enter valid Characters</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Mobile No.:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPermMobNoCode" type="text" id="ctl00_HomePageContent_ctrlTextPermMobNoCode" disabled="disabled" tabindex="-1" class="aspNetDisabled txtboxdisabled_small numericAlignRight" value="91" />
                                                    -
                                                    <input name="ctl00$HomePageContent$ctrlTextPermanantMobileNo" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTextPermanantMobileNo" tabindex="29" class="txtbox numericAlignRight" onKeyPress="return checkNumeric(event)" />
                                                    
                                                    <span id="ctl00_HomePageContent_RegularExpressionValidator1" class="errordisplay" style="display:none;">Please Enter Valid Mobile Number</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="leftTopFormLabel">State:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <select name="ctl00$HomePageContent$ctrlTextPermanentState" id="ctl00_HomePageContent_ctrlTextPermanentState" tabindex="30" class="txtbox" onchange="selectPermanentStates();" style="width:160px;">
					<option value="-1">---Please Select---</option>

				</select>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Email:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPermanentEmailID" type="text" maxlength="45" id="ctl00_HomePageContent_ctrlTextPermanentEmailID" tabindex="32" class="txtbox" />
                                                    <span id="ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal" class="errordisplay" style="display:none;">Please Enter Valid Email ID</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="leftTopFormLabel">District:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <select name="ctl00$HomePageContent$ctrlTextPermanentDistrict" id="ctl00_HomePageContent_ctrlTextPermanentDistrict" tabindex="31" class="txtbox" onchange="selectpermanentDistrict();" style="width:160px;">
					<option value="-1">---Please Select---</option>

				</select>
                                                </td>
                                                
                                            </tr>
                                            <tr class="lastData_Section" id="Tr19">
                                                <td colspan="6" class="leftTopFormLabel1">12 a. Dispensary Or IMP or mEUD For IP:<span class="mandatoryField">*</span>
                                                </td>
                                            </tr>
                                            <div id="ctl00_HomePageContent_upDispIMPState">
					
                                                    <tr class="lastData_Section" id="Tr5">
                                                        <td colspan="2" class="leftTopFormLabel">State:
                                                        </td>
                                                        <td class="lastFormValue">
                                                            <select name="ctl00$HomePageContent$ddlDispensaryState" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ddlDispensaryState\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_HomePageContent_ddlDispensaryState" tabindex="32" class="txtbox" style="width:160px;">
						<option selected="selected" value="-1">---Please Select---</option>

					</select>
                                                        </td>
                                                        <td colspan="2" class="leftTopFormLabel">District:
                                                        </td>
                                                        <td class="lastFormValue">
                                                            <select name="ctl00$HomePageContent$ddlDispensaryDistrict" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ddlDispensaryDistrict\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_HomePageContent_ddlDispensaryDistrict" tabindex="33" class="txtbox" style="width:160px;">
						<option selected="selected" value="-1">---Please Select---</option>

					</select>
                                                        </td>
                                                    </tr>
                                                    <tr class="lastData_Section">
                                                        <td colspan="2" class="leftTopFormLabel">
                                                            <table id="ctl00_HomePageContent_ctrlRBDispensaryIMP">
						<tr>
							<td><input id="ctl00_HomePageContent_ctrlRBDispensaryIMP_0" type="radio" name="ctl00$HomePageContent$ctrlRBDispensaryIMP" value="Dispensary" checked="checked" tabindex="34" /><label for="ctl00_HomePageContent_ctrlRBDispensaryIMP_0">Dispensary</label></td><td><input id="ctl00_HomePageContent_ctrlRBDispensaryIMP_1" type="radio" name="ctl00$HomePageContent$ctrlRBDispensaryIMP" value="IMP" onclick="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlRBDispensaryIMP$1\&#39;,\&#39;\&#39;)&#39;, 0)" tabindex="34" /><label for="ctl00_HomePageContent_ctrlRBDispensaryIMP_1">IMP</label></td><td><input id="ctl00_HomePageContent_ctrlRBDispensaryIMP_2" type="radio" name="ctl00$HomePageContent$ctrlRBDispensaryIMP" value="EMud" onclick="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlRBDispensaryIMP$2\&#39;,\&#39;\&#39;)&#39;, 0)" tabindex="34" /><label for="ctl00_HomePageContent_ctrlRBDispensaryIMP_2">mEUD</label></td>
						</tr>
					</table>
                                                        </td>
                                                        <td class="lastFormValue">
                                                            <select name="ctl00$HomePageContent$ctrlTextDispensary" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlTextDispensary\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_HomePageContent_ctrlTextDispensary" tabindex="35" class="txtbox" style="width:160px;">
						<option selected="selected" value="-1">---Please Select---</option>

					</select>
                                                        </td>
                                                        <td colspan="2" class="leftTopFormLabel">Address:
                                                        </td>
                                                        <td class="lastFormValue">
                                                            <textarea name="ctl00$HomePageContent$txtDispensaryAddress" rows="2" cols="20" readonly="readonly" id="ctl00_HomePageContent_txtDispensaryAddress" tabindex="-1" style="height:35px;width:280px;">
</textarea>
                                                        </td>
                                                    </tr>
                                                
				</div>
                                            <tr class="lastData_Section" id="Tr20">
                                                <td colspan="6" class="leftTopFormLabel1">12 b. Dispensary Or IMP or mEUD for Family Members:<span class="mandatoryField">*</span>
                                                </td>
                                            </tr>
                                            <div id="ctl00_HomePageContent_UpdatePanel2">
					
                                                    <tr class="lastData_Section" id="Tr21">
                                                        <td colspan="2" class="leftTopFormLabel">State:
                                                        </td>
                                                        <td class="lastFormValue">
                                                            <select name="ctl00$HomePageContent$ddldependantDispensaryState" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ddldependantDispensaryState\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_HomePageContent_ddldependantDispensaryState" tabindex="32" class="txtbox" style="width:160px;">
						<option selected="selected" value="-1">---Please Select---</option>

					</select>
                                                        </td>
                                                        <td colspan="2" class="leftTopFormLabel">District:
                                                        </td>
                                                        <td class="lastFormValue">
                                                            <select name="ctl00$HomePageContent$ddldependantDispensaryDistrict" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ddldependantDispensaryDistrict\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_HomePageContent_ddldependantDispensaryDistrict" tabindex="33" class="txtbox" style="width:160px;">
						<option selected="selected" value="-1">---Please Select---</option>

					</select>
                                                        </td>
                                                    </tr>
                                                    <tr class="lastData_Section">
                                                        <td colspan="2" class="leftTopFormLabel">
                                                            <table id="ctl00_HomePageContent_ctrlRBDependantDispensaryIMP">
						<tr>
							<td><input id="ctl00_HomePageContent_ctrlRBDependantDispensaryIMP_0" type="radio" name="ctl00$HomePageContent$ctrlRBDependantDispensaryIMP" value="Dispensary" checked="checked" tabindex="34" /><label for="ctl00_HomePageContent_ctrlRBDependantDispensaryIMP_0">Dispensary</label></td><td><input id="ctl00_HomePageContent_ctrlRBDependantDispensaryIMP_1" type="radio" name="ctl00$HomePageContent$ctrlRBDependantDispensaryIMP" value="IMP" onclick="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlRBDependantDispensaryIMP$1\&#39;,\&#39;\&#39;)&#39;, 0)" tabindex="34" /><label for="ctl00_HomePageContent_ctrlRBDependantDispensaryIMP_1">IMP</label></td><td><input id="ctl00_HomePageContent_ctrlRBDependantDispensaryIMP_2" type="radio" name="ctl00$HomePageContent$ctrlRBDependantDispensaryIMP" value="EMud" onclick="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlRBDependantDispensaryIMP$2\&#39;,\&#39;\&#39;)&#39;, 0)" tabindex="34" /><label for="ctl00_HomePageContent_ctrlRBDependantDispensaryIMP_2">mEUD</label></td>
						</tr>
					</table>
                                                        </td>
                                                        <td class="lastFormValue">
                                                            <select name="ctl00$HomePageContent$ddldependantdispensary" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ddldependantdispensary\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_HomePageContent_ddldependantdispensary" tabindex="35" class="txtbox" style="width:160px;">
						<option selected="selected" value="-1">---Please Select---</option>

					</select>
                                                        </td>
                                                        <td colspan="2" class="leftTopFormLabel">Address:
                                                        </td>
                                                        <td class="lastFormValue">
                                                            <textarea name="ctl00$HomePageContent$txtdependantdispaddress" rows="2" cols="20" readonly="readonly" id="ctl00_HomePageContent_txtdependantdispaddress" tabindex="-1" style="height:35px;width:280px;">
</textarea>
                                                        </td>
                                                    </tr>
                                                
				</div>
                                            <tr>
                                                <td class="leftTopFormLabel" colspan="6">&nbsp;
                                                </td>
                                            </tr>
                                            <tr id="RowCreate">
                                                <td colspan="3" class="sectionHeader">13. Current Employer's Particulars
                                                </td>
                                                <td colspan="3" class="sectionHeader">13.(b) In case of any Previous employment please fill up the details below:
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="RowForNew">
                                                <td colspan="2" class="leftTopFormLabel">Employer's Code No.:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextCurEmployersCode" type="text" maxlength="17" id="ctl00_HomePageContent_ctrlTextCurEmployersCode" class="txtbox" name="txtUserName" />
                                                    <span id="ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1" class="errordisplay" style="display:none;">Please Enter 17 digit Employer Code</span>
                                                    
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Employer's Code No.:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPreviousEmployerCodeNumber" type="text" maxlength="17" id="ctl00_HomePageContent_ctrlTextPreviousEmployerCodeNumber" disabled="disabled" class="aspNetDisabled txtbox" name="txtUserName" />
                                                    <span id="ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1" class="errordisplay" style="display:none;">Please Enter 17 digit Employer Code</span>
                                                    
                                                    <input type="hidden" name="ctl00$HomePageContent$IsEmployerRegd" id="ctl00_HomePageContent_IsEmployerRegd" />
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="RowForNew">
                                                <td colspan="2" class="leftTopFormLabel">Date of Appointment:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlDIDateOfAppointmentDy" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlDIDateOfAppointmentDy" tabindex="36" class="txtbox_mid numericAlignRight" AutoComplete="Off" onkeypress="return CheckTabVal(event)" onpaste="return false;" name="txtUserName" />
                                                    
                                                    <span id="ctl00_HomePageContent_ErrorLabel2" style="color:Red;"></span>
                                                    <input type="hidden" name="ctl00$HomePageContent$hfErrEmpeDOA" id="ctl00_HomePageContent_hfErrEmpeDOA" />
                                                    <span id="ctl00_HomePageContent_RegularExpressionValidator2" style="visibility:hidden;">Please check date format(dd/mm/yyyy)</span>
                                                    
                                                    <span id="ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy" class="errordisplay" style="display:none;">Please enter a valid Date</span>
                                                    <span id="ctl00_HomePageContent_lblDateDiff" style="color:Red;">The minimum age of the Employee should be 18 yrs</span>

                                                    
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Previous Insurance No.:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPreviousInsuranceNumber" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTextPreviousInsuranceNumber" disabled="disabled" tabindex="49" class="aspNetDisabled txtbox numericAlignRight" name="txtUserName" />
                                                    <span id="ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal" class="errordisplay" style="display:none;">Please Enter Only Digits</span>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="RowForNew">
                                                <td colspan="2" class="leftTopFormLabel">Name of the Employer:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextNameOfCurEmployer" type="text" maxlength="50" id="ctl00_HomePageContent_ctrlTextNameOfCurEmployer" class="txtboxAddress" name="txtUserName" />
                                                    <span id="ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal" class="errordisplay" style="display:none;">Please Enter Name of The Employer</span>
                                                    
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Name of the Employer:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPreviousEmployername" type="text" maxlength="45" id="ctl00_HomePageContent_ctrlTextPreviousEmployername" disabled="disabled" class="aspNetDisabled txtboxAddress" name="txtUserName" />
                                                    
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" class="leftTopFormLabel1">Address of the Employer
                                                </td>
                                                <td colspan="3" class="leftTopFormLabel1">Address of the Employer
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="RowForNew">
                                                <td colspan="2" class="leftTopFormLabel">Address :<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextCurEmployerAddress1" type="text" maxlength="51" id="ctl00_HomePageContent_ctrlTextCurEmployerAddress1" class="txtboxAddress" />
                                                    <span id="ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal" class="errordisplay" style="display:none;">Please Enter Address</span>
                                                    <span id="ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal" class="errordisplay" style="display:none;">Please enter valid Characters</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Address :<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPreviousEmployerAddress1" type="text" maxlength="50" id="ctl00_HomePageContent_ctrlTextPreviousEmployerAddress1" disabled="disabled" class="aspNetDisabled txtboxAddress" />
                                                    
                                                    <span id="ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal" class="errordisplay" style="display:none;">Please enter valid Characters</span>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="RowForNew">
                                                <td colspan="2" class="leftTopFormLabel"></td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextCurEmployerAddress2" type="text" maxlength="100" id="ctl00_HomePageContent_ctrlTextCurEmployerAddress2" class="txtboxAddress" />
                                                    <span id="ctl00_HomePageContent_RegularExpressionValidator4" class="errordisplay" style="display:none;">Please enter valid Characters</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel"></td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPreviousEmployerAddress2" type="text" maxlength="100" id="ctl00_HomePageContent_ctrlTextPreviousEmployerAddress2" disabled="disabled" class="aspNetDisabled txtboxAddress" />
                                                    <span id="ctl00_HomePageContent_RegularExpressionValidator5" class="errordisplay" style="display:none;">Please enter valid Characters</span>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr13">
                                                <td colspan="2" class="leftTopFormLabel"></td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextCurEmployerAddress3" type="text" maxlength="100" id="ctl00_HomePageContent_ctrlTextCurEmployerAddress3" class="txtboxAddress" />
                                                    <span id="ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal" class="errordisplay" style="display:none;">Please enter valid Characters</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel"></td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPreviousEmployerAddress3" type="text" maxlength="100" id="ctl00_HomePageContent_ctrlTextPreviousEmployerAddress3" disabled="disabled" class="aspNetDisabled txtboxAddress" />
                                                    <span id="ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal" class="errordisplay" style="display:none;">Please enter valid Characters</span>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr8">
                                                <td colspan="2" class="leftTopFormLabel">State:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <select name="ctl00$HomePageContent$ctrlTextCurEmployerState" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlTextCurEmployerState\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_HomePageContent_ctrlTextCurEmployerState" disabled="disabled" class="aspNetDisabled txtbox" style="width:160px;">
					<option selected="selected" value="-1">---Please Select---</option>

				</select>
                                                    <span id="ctl00_HomePageContent_CurEmployerStateRequiredFieldVal" class="errordisplay" style="display:none;">Please Select State</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">State:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <select name="ctl00$HomePageContent$ctrlTextPreviousEmployerState" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlTextPreviousEmployerState\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_HomePageContent_ctrlTextPreviousEmployerState" disabled="disabled" class="aspNetDisabled txtbox" style="width:160px;">
					<option selected="selected" value="-1">---Please Select---</option>

				</select>
                                                    
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr7">
                                                <td colspan="2" class="leftTopFormLabel">District:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <select name="ctl00$HomePageContent$ctrlTextCurEmployerDistrict" id="ctl00_HomePageContent_ctrlTextCurEmployerDistrict" disabled="disabled" class="aspNetDisabled txtbox" style="width:160px;">
					<option selected="selected" value="-1">---Please Select---</option>

				</select>
                                                    <span id="ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal" class="errordisplay" style="display:none;">Please Select District</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">District:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <select name="ctl00$HomePageContent$ctrlTextPreviousEmployerDistrict" id="ctl00_HomePageContent_ctrlTextPreviousEmployerDistrict" disabled="disabled" class="aspNetDisabled txtbox" style="width:160px;">
					<option selected="selected" value="-1">---Please Select---</option>

				</select>
                                                    
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr23">
                                                <td colspan="2" class="leftTopFormLabel">Sub District:</td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input type="hidden" name="ctl00$HomePageContent$hdncurrentemprsubdistrict" id="ctl00_HomePageContent_hdncurrentemprsubdistrict" />
                                                    
                                                    <span id="ctl00_HomePageContent_lblcurrentemprsubdistrict"></span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Sub District:</td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <span id="ctl00_HomePageContent_lblpreviousemprsubdistrict"></span>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr24">
                                                <td colspan="2" class="leftTopFormLabel">Village:</td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <span id="ctl00_HomePageContent_lblpresentemprvillage"></span>
                                                    <input type="hidden" name="ctl00$HomePageContent$hdnpresentemprvillage" id="ctl00_HomePageContent_hdnpresentemprvillage" />
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Village:</td>
                                                <td colspan="1" class="lastFormValue">
                                                    
                                                    <span id="ctl00_HomePageContent_lblpreviousemprvillage"></span>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="RowForNew">
                                                <td colspan="2" class="leftTopFormLabel">Pin Code:<span class="mandatoryField"></span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextCurEmployerPinCode" type="text" maxlength="6" id="ctl00_HomePageContent_ctrlTextCurEmployerPinCode" class="txtbox numericAlignRight" onKeyPress="return checkNumeric(event)" />
                                                    
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Pin Code:<span class="mandatoryField"></span>
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPreviousemployerPinCode" type="text" maxlength="6" id="ctl00_HomePageContent_ctrlTextPreviousemployerPinCode" disabled="disabled" class="aspNetDisabled txtbox numericAlignRight" onKeyPress="return checkNumeric(event)" />
                                                    
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="RowForNew">
                                                <td colspan="2" class="leftTopFormLabel">Email
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextCurEmployerEmail" type="text" maxlength="45" id="ctl00_HomePageContent_ctrlTextCurEmployerEmail" class="txtbox" />
                                                    <span id="ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal" class="errordisplay" style="display:none;">Please Enter Valid Email ID</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Email
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPreviousEmployerEmail" type="text" maxlength="45" id="ctl00_HomePageContent_ctrlTextPreviousEmployerEmail" disabled="disabled" class="aspNetDisabled txtbox" />
                                                    <span id="ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal" class="errordisplay" style="display:none;">Please Enter Valid Email ID</span>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="RowForNew">
                                                <td colspan="2" class="leftTopFormLabel">Phone No.:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextCurEmployerPhoneNumberCode" type="text" maxlength="5" id="ctl00_HomePageContent_ctrlTextCurEmployerPhoneNumberCode" class="txtbox_small numericAlignRight" onKeyPress="return checkNumeric(event)" />
                                                    -
                                                        <input name="ctl00$HomePageContent$ctrlTextEmployerPhoneNumber" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTextEmployerPhoneNumber" class="txtbox numericAlignRight" onKeyPress="return checkNumeric(event)" />
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Phone No.:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPreviousEmployerPhoneNumberCode" type="text" maxlength="5" id="ctl00_HomePageContent_ctrlTextPreviousEmployerPhoneNumberCode" disabled="disabled" class="aspNetDisabled txtbox_small numericAlignRight" onKeyPress="return checkNumeric(event)" />
                                                    -
                                                        <input name="ctl00$HomePageContent$ctrlTextPreviousEmployerPhoneNumber" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTextPreviousEmployerPhoneNumber" disabled="disabled" class="aspNetDisabled txtbox numericAlignRight" />
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr9">
                                                <td colspan="2" class="leftTopFormLabel">Mobile No.:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextCurMobileCode" type="text" value="91" id="ctl00_HomePageContent_ctrlTextCurMobileCode" disabled="disabled" class="aspNetDisabled txtboxdisabled_small numericAlignRight" />
                                                    -
                                                        <input name="ctl00$HomePageContent$ctrlTextCurMobile" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTextCurMobile" tabindex="46" class="txtbox numericAlignRight" onKeyPress="return checkNumeric(event)" />
                                                    <span id="ctl00_HomePageContent_CurMobileRegularExpressionVal" class="errordisplay" style="display:none;">Please Enter Valid Mobile Number</span>
                                                </td>
                                                <td colspan="2" class="leftTopFormLabel">Mobile No.:
                                                </td>
                                                <td colspan="1" class="lastFormValue">
                                                    <input name="ctl00$HomePageContent$ctrlTextPrevMobileCode" type="text" value="91" id="ctl00_HomePageContent_ctrlTextPrevMobileCode" disabled="disabled" class="aspNetDisabled txtboxdisabled_small numericAlignRight" />
                                                    -
                                                        <input name="ctl00$HomePageContent$ctrlTextPrevMobile" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTextPrevMobile" disabled="disabled" class="aspNetDisabled txtbox numericAlignRight" onKeyPress="return checkNumeric(event)" />
                                                    <span id="ctl00_HomePageContent_PrevMobileRegularExpressionVal" class="errordisplay" style="display:none;">Please Enter Valid Mobile Number</span>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr6">
                                                <td colspan="2" class="leftTopFormLabel">13.(a) Have Previous Employer:
                                                </td>
                                                <td colspan="4" class="lastFormValue">
                                                    <table id="ctl00_HomePageContent_ctrlRDPrevEmployer">
					<tr>
						<td><span class="aspNetDisabled"><input id="ctl00_HomePageContent_ctrlRDPrevEmployer_0" type="radio" name="ctl00$HomePageContent$ctrlRDPrevEmployer" value="Yes" disabled="disabled" onclick="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$ctrlRDPrevEmployer$0\&#39;,\&#39;\&#39;)&#39;, 0)" /><label for="ctl00_HomePageContent_ctrlRDPrevEmployer_0">Yes</label></span></td><td><span><input id="ctl00_HomePageContent_ctrlRDPrevEmployer_1" type="radio" name="ctl00$HomePageContent$ctrlRDPrevEmployer" value="No" checked="checked" /><label for="ctl00_HomePageContent_ctrlRDPrevEmployer_1">No</label></span></td>
					</tr>
				</table>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr11">
                                                <td colspan="4" class="leftTopFormLabel">14. Details of Nominee :<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="2" class="lastFormValue">
                                                    
                                                    <a onclick="return validateAndOpenNominee();" id="ctl00_HomePageContent_enterDetailsLink" class="link-button" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$enterDetailsLink&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Enter Details Here</a>

                                                    
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr12">
                                                <td colspan="4" class="leftTopFormLabel">15. Family Particulars of Insured Person:
                                                </td>
                                                <td colspan="2" class="lastFormValue">


                                            <a onclick="validateAndOpenFamilyPopup(); return false;"
   target="_blank" 
   style="text-decoration: underline; color: Blue; cursor: pointer;">
   Enter Details Here
</a>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr18">
                                                <td colspan="4" class="leftTopFormLabel">16. Details of Bank Accounts of Insured Person:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="2" class="lastFormValue">
                                                    

                                                    <a onclick="openNewWindow1(); return false;" id="ctl00_HomePageContent_enterBankLink" class="link-button" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$enterBankLink&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, true))">Enter Details Here</a>
                                                    

                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr25">
                                                <td colspan="4" class="leftTopFormLabel">17. Select SMS Preferred Language:<span class="mandatoryField">*</span>
                                                </td>
                                                <td colspan="2" class="lastFormValue">
                                                    <select name="ctl00$HomePageContent$ddllanguage" id="ctl00_HomePageContent_ddllanguage" tabindex="33" class="txtbox" style="width:160px;">
					<option value="-1">---Please Select---</option>

				</select>
                                                </td>
                                            </tr>
                                            <tr class="lastData_Section" id="Tr17">
                                                <td colspan="6" class="sectionHeader">
                                                    <input id="ctl00_HomePageContent_dec_chkbox" type="checkbox" name="ctl00$HomePageContent$dec_chkbox" onclick="validchkButton(this);" tabindex="64" /><label for="ctl00_HomePageContent_dec_chkbox">I hereby declare that the statement provided/documented above is correct to the best of my knowledge and belief. I certify that all the information collected and published here is with the permission and consent obtained from the beneficiaries for collecting, storing and using their personal data.</br>
                                                              I also undertake to intimate any changes in the demographic profiles of the beneficiaries from time to time.</label><span class="mandatoryField">*</span>
                                                    <br></br>
                                                    
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <td colspan="8" class="lastFormValue">
                                                    <span id="ctl00_HomePageContent_lblVerifyAaddareMessage" style="color:Red;font-weight:bold;"></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td cla ss="lastFormValue" colspan="8">
                                                    <span id="ctl00_HomePageContent_lblfooterMessage" style="color:Red;font-weight:bold;">Employees` registration permitted online within 10 days of date of appointment. Register in time to avail benefits and avoid penal provisions.</span>
                                                </td>
                                            </tr>
                                            
                                            <tr id="ctl00_HomePageContent_DSCPnl">
					<td colspan="8" class="pageFooter1">
                                                    <input type="hidden" name="ctl00$HomePageContent$lblhidden" id="ctl00_HomePageContent_lblhidden" />
                                                    
                                                </td>
				</tr>
				
                                            
                                            <tr>
                                                
                                            </tr>
                                        </table>
                                        <div class="pagesubmission" style="text-align: center">
                                            <div class="primary">
                                                
                                                <input type="submit" name="ctl00$HomePageContent$Submit" value="Submit" onclick="saveDispIMP();WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$Submit&quot;, &quot;&quot;, true, &quot;EmpDetails&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_Submit" tabindex="66" class="btn" onkeydown="if (event.keyCode == 13) document.getElementById(&#39;ctl00_HomePageContent_Submit&#39;).click()" />
                                                <input type="submit" name="ctl00$HomePageContent$Reset" value="Reset" id="ctl00_HomePageContent_Reset" tabindex="67" class="btn" onkeydown="if (event.keyCode == 13) document.getElementById(&#39;ctl00_HomePageContent_Reset&#39;).click()" />
                                                <input type="submit" name="ctl00$HomePageContent$btncancel" value="Cancel" id="ctl00_HomePageContent_btncancel" tabindex="68" class="btn" onkeydown="if (event.keyCode == 13) document.getElementById(&#39;ctl00_HomePageContent_btncancel&#39;).click()" />
                                            </div>
                                        </div>
                                        
                                        <div id="ctl00_HomePageContent_panMessage" style="width:70%;">
					
                                            <table class="internalTable" border="0" cellpadding="2" cellspacing="0">
                                                <tr>
                                                    <td class="leftTopFormLabelgrid">You have not complied with the provisions of Regulation 10B read with Regulation
                                                        11 & 12 of the Employees’ State Insurance (General) Regulation, 1950, regarding
                                                        registration of employee within 10 days of the Date of Appointment. Therefore, the
                                                        Date of Appointment of this employee will be subject to confirmation by the concerned
                                                        RO/SRO after due verification of relevant records. Until then, the date of registration
                                                        shall be deemed as the date of appointment. Please submit the relevant records/documents
                                                        to the designated RO/SRO within 15 days in the prescribed format. Please also take
                                                        note that in case of failure to do the needful, the date of registration will be
                                                        treated as the date of appointment, for all purposes.<br />
                                                        <br />
                                                    </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td class="pageFooter1">
                                                        <input type="submit" name="ctl00$HomePageContent$btnAgree" value="I Agree" id="ctl00_HomePageContent_btnAgree" title="Close" class="btn" />
                                                        <input type="submit" name="ctl00$HomePageContent$Button1" value="Cancel" onclick="ClosePopup();WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$Button1&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_Button1" title="Close" class="btn" />
                                                    </td>
                                                </tr>
                                            </table>
                                        
				</div>
                                        <div class="hiddenfields">
                                            
                                            
                                            
                                            
                                            
                                            
                                            <span id="ctl00_HomePageContent_lblmodal"></span>
                                        </div>
                                    
			</div>
                                
		</div>
                            <div id="ctl00_HomePageContent_UpdateProgress1" style="display:none;">
			
                                    <iframe frameborder="0" src="about:blank" style="border: 0px; position: absolute; z-index: 9; left: 0px; top: 0px; width: expression(this.offsetParent.scrollWidth); height: expression(this.offsetParent.scrollHeight); filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100, FinishOpacity=0, Style=0, StartX=0, FinishX=100, StartY=0, FinishY=100);"></iframe>
                                    <div style="position: absolute; z-index: 10; left: expression((this.offsetParent.clientWidth/2)-(this.clientWidth/2)+this.offsetParent.scrollLeft); top: expression((this.offsetParent.clientHeight/2)-(this.clientHeight/2)+this.offsetParent.scrollTop);">
                                        Please Wait...<br />
                                        <img src="../App_Themes/Images/PleaseWait.gif" />
                                    </div>
                                
		</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <input type="submit" name="ctl00$HomePageContent$btnShow" value="" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$btnShow&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_btnShow" style="display: none" />
    
    <div id="ctl00_HomePageContent_pnlPopup" class="modalPopup" style="display: none">
			
        <span style="padding: 10px; font-size: large">Transaction Status</span> :
        <span id="ctl00_HomePageContent_lblVerifyStat" style="font-size: large; color: Maroon"></span>
        <div class="footer" align="center">
            <input type="submit" name="ctl00$HomePageContent$btnNo" value="Close" onclick="CloseDiv();WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$btnNo&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_btnNo" class="btn" />
        </div>
    
		</div>
    <input type="hidden" name="ctl00$HomePageContent$hidpresentdenState" id="ctl00_HomePageContent_hidpresentdenState" />
    <input type="hidden" name="ctl00$HomePageContent$hiddenpresentdistrict" id="ctl00_HomePageContent_hiddenpresentdistrict" />
    <input type="hidden" name="ctl00$HomePageContent$hdnpermsubdistrict" id="ctl00_HomePageContent_hdnpermsubdistrict" />
    <input type="hidden" name="ctl00$HomePageContent$hdnpressubdistrict" id="ctl00_HomePageContent_hdnpressubdistrict" />
    <input type="hidden" name="ctl00$HomePageContent$hdnpresentvillage" id="ctl00_HomePageContent_hdnpresentvillage" />
    <input type="hidden" name="ctl00$HomePageContent$hdnpermvillage" id="ctl00_HomePageContent_hdnpermvillage" />
    <input type="hidden" name="ctl00$HomePageContent$hidpermenantState" id="ctl00_HomePageContent_hidpermenantState" />
    <input type="hidden" name="ctl00$HomePageContent$hiddenpermenantdistrict" id="ctl00_HomePageContent_hiddenpermenantdistrict" />
    <input type="hidden" name="ctl00$HomePageContent$hidpresentdenState1" id="ctl00_HomePageContent_hidpresentdenState1" />
    <input type="hidden" name="ctl00$HomePageContent$hiddenpresentdistrict1" id="ctl00_HomePageContent_hiddenpresentdistrict1" />
    <input type="hidden" name="ctl00$HomePageContent$hidpermenantState1" id="ctl00_HomePageContent_hidpermenantState1" />
    <input type="hidden" name="ctl00$HomePageContent$hiddenpermenantdistrict1" id="ctl00_HomePageContent_hiddenpermenantdistrict1" />
    <input type="hidden" name="ctl00$HomePageContent$hidpermenantState2" id="ctl00_HomePageContent_hidpermenantState2" />
    <input type="hidden" name="ctl00$HomePageContent$hiddenpermenantdistrict2" id="ctl00_HomePageContent_hiddenpermenantdistrict2" />
    <input type="hidden" name="ctl00$HomePageContent$hiddenDispensaryState1" id="ctl00_HomePageContent_hiddenDispensaryState1" />
    <input type="hidden" name="ctl00$HomePageContent$hiddenDispensaryDistrict1" id="ctl00_HomePageContent_hiddenDispensaryDistrict1" />
    <input type="hidden" name="ctl00$HomePageContent$hdnState" id="ctl00_HomePageContent_hdnState" />
    <input type="hidden" name="ctl00$HomePageContent$hdnDistrict" id="ctl00_HomePageContent_hdnDistrict" />
    <input type="hidden" name="ctl00$HomePageContent$hdnDisIMP" id="ctl00_HomePageContent_hdnDisIMP" />
    <input type="hidden" name="ctl00$HomePageContent$hdncurrentdate" id="ctl00_HomePageContent_hdncurrentdate" value="20/10/2026" />
    
    <input type="hidden" name="ctl00$HomePageContent$hdnImpname" id="ctl00_HomePageContent_hdnImpname" />
    <input type="hidden" name="ctl00$HomePageContent$hdnImpaddress" id="ctl00_HomePageContent_hdnImpaddress" />
    <input type="hidden" name="ctl00$HomePageContent$hiddenDispensaryState" id="ctl00_HomePageContent_hiddenDispensaryState" />
    <input type="hidden" name="ctl00$HomePageContent$hiddenDispensaryDistrict" id="ctl00_HomePageContent_hiddenDispensaryDistrict" />
    <input type="hidden" name="ctl00$HomePageContent$hdnDispState" id="ctl00_HomePageContent_hdnDispState" />
    <input type="hidden" name="ctl00$HomePageContent$hdnDispDistrict" id="ctl00_HomePageContent_hdnDispDistrict" />
    <input type="hidden" name="ctl00$HomePageContent$hdnDispName" id="ctl00_HomePageContent_hdnDispName" />
    <input type="hidden" name="ctl00$HomePageContent$hdnDispAddress" id="ctl00_HomePageContent_hdnDispAddress" />
    
    
    
    <input type="hidden" name="ctl00$HomePageContent$hdnAadhaarData" id="ctl00_HomePageContent_hdnAadhaarData" />

    <script src="../App_Themes/JS/JavaScript1.js" type="text/javascript"></script>

    <script type="text/javascript">
        function openNewWindow() {
            var url = 'NomineeDetails.aspx';
            window.open(url, '_blank', 'width=1000,height=800,toolbar=0,location=0,status=0,menubar=0,scrollbars=1,resizable=1');
        }
    </script>
    <script type="text/javascript">
        function openNewWindow1() {
            var url = 'EmployeeBankDetails.aspx';
            window.open(url, '_blank', 'width=1000,height=800,toolbar=0,location=0,status=0,menubar=0,scrollbars=1,resizable=1');
        }
    </script>

    <script language="javascript" type="text/javascript">
        function CloseDiv() {
            document.getElementById('ctl00_HomePageContent_cover').style.display = 'none';
            document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1').checked = false;

        }
    </script>

    <script language="javascript" type="text/javascript">
        function ValidateDSData() {
            if (document.getElementById('ctl00_HomePageContent_dec_chkbox').checked == false) {
                alert('Please accept the declaration statement, by selecting the check box.')
                document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1').checked = false;
            }
            else if (!validchkButton(document.getElementById('ctl00_HomePageContent_dec_chkbox'))) {
                return false;
            }
            else {
                var Name = document.getElementById("ctl00_HomePageContent_ctrlTextEmpName").value;
                var Father = document.getElementById("ctl00_HomePageContent_ctrlTextFatherHusName").value;
                if (Name == "") {
                    alert('Please enter Name');
                    document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1').checked = false;
                    return false;
                }
                else if (Father == "") {
                    alert('Please enter Fathher/Husband Name');
                    document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1').checked = false;
                    return false;
                }
                else {

                    if (document.getElementById('ctl00_HomePageContent_cover')) {
                        document.getElementById('ctl00_HomePageContent_cover').style.display = 'inline';
                    }
                    if (confirm('Click on Ok to digitally sign the data using e-token or Click on Cancel to exit the window')) {
                        GetRegisterEmployeeData();
                    }
                    else {
                        document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1').checked = false;
                        document.getElementById('ctl00_HomePageContent_cover').style.display = 'none';
                    }
                }
            }
        }
    </script>

    <script type="text/javascript">

        function GetRegisterEmployeeData() {
            var fileName1 = location.pathname.split("/").slice(-1);
            var dd = document.getElementById('ctl00_HomePageContent_Xmldatahidden').value;
            var xmlChild = GenerateXMLDocument_Javascript(dd);
            PageMethods.EmployeeData(xmlChild, true, Success);
        }

        function Success(result) {
            document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_Xmldatahidden').value = result;
            createEmployeeXMLDocument_Javascript();
        }
    </script>

    <script type="text/javascript">
        //Phone no validation
        //debugger
        function checkFutureDate(sender, args) {
            

            // 1. Calculate the date exactly one month from today
            var maxAllowedDate = new Date();
            maxAllowedDate.setMonth(maxAllowedDate.getMonth() + 1);

            // 2. Prevent selecting a date beyond 1 month from today
            if (sender._selectedDate > maxAllowedDate) {
                sender._textbox.set_Value("");
                alert("Date cannot be more than 1 month in the future.");
                sender._selectedDate = new Date(); // Reset to today
            }
            else {

                var currentdate1 = document.getElementById('ctl00_HomePageContent_hdncurrentdate').value;
                var parts = currentdate1.split('/');
                //var mydate = new Date(parts[2], parts[1] - 1, parts[0]);

                var currentdate = new Date("" + parts[1] + "/" + parts[0] + "/" + parts[2] + "");//parts[1]'/'parts[0],'/' , parts[2]);
                var year = currentdate.getFullYear();
                var month = parts[1];
                var day = parts[0];
                var nextyear = year + 1;
                if (month == '11' || month == '12') {
                    nextyear = year + 1;
                }
                else if (month >= 01 && month <= 5) {

                    if (month == 5) {
                        if (day <= 12) {
                            nextyear = year;
                            year = year - 1;
                        }
                        else {
                            nextyear = year;
                        }
                    }
                    else {

                        nextyear = year;
                        year = year - 1;
                    }
                }
                else {
                    nextyear = year;


                }
                var contrnov = new Date("11/12/" + year + "");
                var contrmay = new Date("05/13/" + nextyear + "");
                var maycontr = new Date("05/12/" + year + "");
                var novcontr = new Date("11/12/" + year + "");
                var regdate = new Date();
                regdate.setDate(regdate.getDate() - 10);
                if (currentdate > contrnov && currentdate < contrmay) {
                    if (sender._selectedDate > new Date("03/31/" + year + "")) {
                        if (sender._selectedDate < regdate) {
                            $find("behUserDetail").show();
                            //if (confirm('You have not complied with the provisions of Regulation 10B read with Regulation 11 & 12 of the Employees’ State Insurance (General) Regulation, 1950, regarding registration of employee within 10 days of the Date of Appointment. Therefore, the Date of Appointment of this employee will be subject to confirmation by the concerned RO/SRO after due verification of relevant records. Until then, the date of registration shall be deemed as the date of appointment. Please submit the relevant records/documents to the designated RO/SRO within 15 days in the prescribed format. Please also take note that in case of failure to do the needful, the date of registration will be treated as the date of appointment, for all purposes.')) {
                            //   return;
                            //} else {
                            //    

                            //   

                            //                        sender._textbox.set_Value('')
                            //                       // alert("Restricted! The date of registration of an Employee must be within 10 days of the date of Appointment.");
                            //}
                        }
                    }
                    else {
                        sender._textbox.set_Value("");
                        alert("You cannot select a date prior to 1st day of the previous contribution period.");
                    }
                }
                else if (currentdate > maycontr && currentdate < novcontr) {
                    var curryear = year - 1;
                    if (sender._selectedDate > new Date("09/30/" + curryear + "")) {
                        if (sender._selectedDate < regdate) {
                            $find("behUserDetail").show();
                            //if (confirm('You have not complied with the provisions of Regulation 10B read with Regulation 11 & 12 of the Employees’ State Insurance (General) Regulation, 1950, regarding registration of employee within 10 days of the Date of Appointment. Therefore, the Date of Appointment of this employee will be subject to confirmation by the concerned RO/SRO after due verification of relevant records. Until then, the date of registration shall be deemed as the date of appointment. Please submit the relevant records/documents to the designated RO/SRO within 15 days in the prescribed format. Please also take note that in case of failure to do the needful, the date of registration will be treated as the date of appointment, for all purposes.')) {
                            //   return;
                            //} else {
                            //    

                            //   

                            //                        sender._textbox.set_Value('')
                            //                       // alert("Restricted! The date of registration of an Employee must be within 10 days of the date of Appointment.");
                            //}
                        }

                    }
                    else {
                        sender._textbox.set_Value("");
                        alert("You cannot select a date prior to 1st day of the previous contribution period.");
                    }
                }


                //var regdate = new Date();
                //regdate.setDate(regdate.getDate() - 10);
                //if (sender._selectedDate < regdate) {
                // sender._textbox.set_Value('')
                //  alert("Restricted! The date of registration of an Employee must be within 10 days of the date of Appointment.");
                //}
            }
        }
        function checkFutureDate1(sender, args) {
            if (sender._selectedDate > new Date()) {
                sender._textbox.set_Value("");
                alert("Future date is not allowed");
                sender._selectedDate = new Date();
            }


        }
        function ClosePopup(e) {
            document.getElementById('ctl00_HomePageContent_ctrlDIDateOfAppointmentDy').value = '';//document.getElementById('ctl00_HomePageContent_hdnDOA1').value;
            $find("behUserDetail").hide();
        }
        function check_Date(sender, args) {
            var today = new Date();
            if (sender._selectedDate > today) {
                sender._textbox.set_Value('')
                alert("You cannot select a future date");
            }
            else {
                var regdate = new Date();
                regdate.setDate(regdate.getDate() - 10);

                if (sender._selectedDate < regdate) {
                    $find("behUserDetail").show();
                    //if (confirm('You have not complied with the provision of Regulation 10B read with Regulation 11 & 12 of the Employees State Insurance(General) Regulation, 1950 regarding registration of employee within 10 days of the Date of Appointment. Therefore, the Date of Appointment of this employee will be subject to confirmation by the concerned RO/SRO after due verification of relevant records until then date of registration shall be deemed date of appointment.Please submit the relevant records/documents to the designated RO/SRO within 15 days in the prescribed format. Please take not that in case of failure to do the needful, the date of registration will be treated as deemed date of appointment for all purpose')) {
                    //   return;
                    //} else {
                    //    

                    //   

                    //                        sender._textbox.set_Value('')
                    //                       // alert("Restricted! The date of registration of an Employee must be within 10 days of the date of Appointment.");
                    //}
                }
            }
        }

        function validationphoneno(source, args) {
            var Ip = document.getElementById("ctl00_HomePageContent_ctrlTextPresentphoneNo").value;
            if (Ip != null && Ip != "") {
                if (parseInt(Ip.length) > 5 && parseInt(Ip.length) < 11) {
                    if (parseInt(Ip) == 0)
                        args.IsValid = false;

                    else {

                        args.IsValid = true;
                    }
                }

                else {
                    args.IsValid = false;
                }
            }
        }
        function validatefileupload(sourece, args) {

            var fuData = document.getElementById('ctl00_HomePageContent_ctrlFileName').value;
            var FileUploadPath = fuData.value;
            if (fuData == '') {
                // There is no file selected

                args.IsValid = false;
            }
            else {

                args.IsValid = true; // Valid file type

            }
        }
        function validchkButton(chkBtn) {

            var DOB = document.getElementById("ctl00_HomePageContent_ctrlTxtIpDate").value;

            var idSpilt = chkBtn.id.toString().indexOf('_', 6)
            if (comparedate()) {
                return true;
            }
            else {
                chkBtn.checked = false;
                document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1').checked = false;
                return false;
            }
            if (document.getElementById('ctl00_HomePageContent_dec_chkbox').checked == false) {
                alert('Please accept the declaration statement, by selecting the check box.')
            }
        }
        function comparedate() {

            var DOB = document.getElementById("ctl00_HomePageContent_ctrlTxtIpDate").value;
            var DOA = document.getElementById("ctl00_HomePageContent_ctrlDIDateOfAppointmentDy").value;

            var Name = document.getElementById("ctl00_HomePageContent_ctrlTextEmpName").value;
            var Father = document.getElementById("ctl00_HomePageContent_ctrlTextFatherHusName").value;
            if (Name == "") {
                alert('Please enter Name');
                document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1').checked = false;
                return false;
            }
            else if (Father == "") {
                alert('Please enter Fathher/Husband Name');
                document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1').checked = false;
                return false;
            }

            if ((DOA == "")) {
                alert("DOA should not be Empty");
                return false;
            }
            else if ((DOB == "")) {
                alert("DOB should not be Empty");
                return false;
            } else if (!validatation()) {
                return false;
            }
            else {

                var bdt1 = parseInt(DOB.substring(0, 2), 10);
                var bmon1 = parseInt(DOB.substring(3, 5), 10);
                var byr1 = parseInt(DOB.substring(6, 10), 10);
                var adt2 = parseInt(DOA.substring(0, 2), 10);
                var amon2 = parseInt(DOA.substring(3, 5), 10);
                var ayr2 = parseInt(DOA.substring(6, 10), 10);
                var DOBdate1 = new Date(byr1, bmon1, bdt1);
                var DOAdate2 = new Date(ayr2, amon2, adt2);
                var ageyear = (DOAdate2.getTime() - DOBdate1.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
                //years = Math.floor((DOAdate2.getTime() - DOBdate1.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

                if (ageyear < 14) {
                    document.getElementById("ctl00_HomePageContent_ctrlDIDateOfAppointmentDy").value = "";
                    document.getElementById("ctl00_HomePageContent_ctrlDIDateOfAppointmentDy").focus();
                    alert('Date of Appointment(DOA) should be greater that 14 years from Date of Birth (DOB)');
                    return false;

                }
                else {
                    return true;
                }
            }
        }

        function selectPresentStates() {

            var selectedval = document.getElementById("ctl00_HomePageContent_ctrlTxtPresentState").selectedIndex - 1;

            document.getElementById("ctl00_HomePageContent_hidpresentdenState").value = states[selectedval][1];
            document.getElementById("ctl00_HomePageContent_hidpresentdenState1").value = selectedval;
            var distElem = document.getElementById("ctl00_HomePageContent_ctrlTextPresentDistrict");


            if (selectedval >= 0) {
                var j = 0;
                clearpresentDistricts();
                distElem.options[j] = new Option("---Please Select---"); j++;
                for (var i = 0; i < districts[selectedval].length; i++) {
                    distElem.options[j] = new Option(districts[selectedval][i][0]);
                    j++;
                }
            }
        }
        function checkLength() {

        }

        function selectPermanentStates() {

            var selectedval = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentState").selectedIndex - 1;
            document.getElementById("ctl00_HomePageContent_hidpermenantState").value = states[selectedval][1];
            document.getElementById("ctl00_HomePageContent_hidpermenantState1").value = selectedval;
            var distElem = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentDistrict");


            if (selectedval >= 0) {
                var j = 0;
                clearpermanentDistricts();
                distElem.options[j] = new Option("---Please Select---"); j++;
                for (var i = 0; i < districts[selectedval].length; i++) {
                    distElem.options[j] = new Option(districts[selectedval][i][0]);
                    j++;
                }
            }
        }
        function clearpermanentDistricts() {
            for (var i = (document.getElementById("ctl00_HomePageContent_ctrlTextPermanentDistrict")).options.length - 1; i >= 1; i--) {
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentDistrict").options[i] = null;
            }
        }

        function clearpresentDistricts() {

            for (var i = (document.getElementById("ctl00_HomePageContent_ctrlTextPresentDistrict")).options.length - 1; i >= 1; i--) {
                document.getElementById("ctl00_HomePageContent_ctrlTextPresentDistrict").options[i] = null;
            }
        }

        function selectpermanentDistrict() {
            var distselectedindx = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentDistrict").selectedIndex - 1;
            var stateselectedindx = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentState").selectedIndex - 1;
            document.getElementById("ctl00_HomePageContent_hiddenpermenantdistrict").value = districts[stateselectedindx][distselectedindx][1];
            document.getElementById("ctl00_HomePageContent_hiddenpermenantdistrict1").value = distselectedindx;

        }
        function selectpresentDistrict() {
            var distselectedindx = document.getElementById("ctl00_HomePageContent_ctrlTextPresentDistrict").selectedIndex - 1;
            var stateselectedindx = document.getElementById("ctl00_HomePageContent_ctrlTxtPresentState").selectedIndex - 1;
            document.getElementById("ctl00_HomePageContent_hiddenpresentdistrict").value = districts[stateselectedindx][distselectedindx][1];
            document.getElementById("ctl00_HomePageContent_hiddenpresentdistrict1").value = distselectedindx;
        }

        function loadpresentstates() {
            var statesdd = document.getElementById("ctl00_HomePageContent_ctrlTxtPresentState");
            var Districtsdd = document.getElementById("ctl00_HomePageContent_ctrlTextPresentDistrict");
            var j = 0;
            statesdd.options[j] = new Option("---Please Select---");

            j++;
            for (i = 0; i < states.length; i++) {
                statesdd.options[j] = new Option(states[i][0]);
                j++;
            }
            var previousVal = document.getElementById("ctl00_HomePageContent_hidpresentdenState1").value;
            if (previousVal != '') {
                previousVal++;

                statesdd.options[previousVal].selected = true;
                selectPresentStates();

                var previousdistval = document.getElementById("ctl00_HomePageContent_hiddenpresentdistrict1").value;
                previousdistval++;
                Districtsdd.options[previousdistval].selected = true;
            }
        }

        function loadpermanentstates() {

            var statesdd = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentState");
            var Districtsdd = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentDistrict");
            var j = 0;
            statesdd.options[j] = new Option("---Please Select---");

            j++;
            for (i = 0; i < states.length; i++) {
                statesdd.options[j] = new Option(states[i][0]);
                j++;
            }
            var previousVal = document.getElementById("ctl00_HomePageContent_hidpermenantState1").value;
            if (previousVal != '') {
                previousVal++;

                statesdd.options[previousVal].selected = true;
                selectPermanentStates();

                var previousdistval = document.getElementById("ctl00_HomePageContent_hiddenpermenantdistrict1").value;
                previousdistval++;
                Districtsdd.options[previousdistval].selected = true;
            }
        }

        function num(e) {
            if (e.shiftKey == 1 || e.altkey == 1) { return false; }
            var k;
            document.all ? k = e.keyCode : k = e.which;
            return ((k > 47 && k < 58) || k == 46 || k == 26 || k == 27 || k == 8 || k == 37 || k == 39 || k == 0);
        }

        function CopyAddress() {

            if (document.getElementById("ctl00_HomePageContent_chkboxCopyPresentAddress").checked == true) {
                document.getElementById("ctl00_HomePageContent_hiddenpermenantdistrict").value = document.getElementById("ctl00_HomePageContent_hiddenpresentdistrict").value;
                document.getElementById("ctl00_HomePageContent_hiddenpermenantdistrict1").value = document.getElementById("ctl00_HomePageContent_hiddenpresentdistrict1").value;

                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress1").value = document.getElementById("ctl00_HomePageContent_ctrlTextPresentAddress1").value;
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentPinCode").value = document.getElementById("ctl00_HomePageContent_ctrlTxtPresentPinCode").value;
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress2").value = document.getElementById("ctl00_HomePageContent_ctrlTextPresentAddress2").value;
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentSTDCode").value = document.getElementById("ctl00_HomePageContent_ctrlTextPresentSTDCode").value;
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress3").value = document.getElementById("ctl00_HomePageContent_ctrlTextPresentAddress3").value;
                document.getElementById("ctl00_HomePageContent_ctrlTextPermMobNoCode").value = document.getElementById("ctl00_HomePageContent_ctrlTextPresentMobNoCode").value;
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanantMobileNo").value = document.getElementById("ctl00_HomePageContent_ctrlTextPresentMobileNo").value;
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentEmailID").value = document.getElementById("ctl00_HomePageContent_ctrlTextPresentEmail").value;
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentphoneNo").value = document.getElementById("ctl00_HomePageContent_ctrlTextPresentphoneNo").value;
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress2").value = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress2").value;
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanantMobileNo").value = document.getElementById("ctl00_HomePageContent_ctrlTextPermanantMobileNo").value;
                //document.getElementById("ctl00_HomePageContent_ctrlTextPermanentState").value = document.getElementById("ctl00_HomePageContent_ctrlTxtPresentState").value;

                var PresentState = document.getElementById('ctl00_HomePageContent_ctrlTxtPresentState');
                var PermanentState = document.getElementById('ctl00_HomePageContent_ctrlTextPermanentState');
                for (var i = 0; i <= PermanentState.options.length; i++) {
                    if (PermanentState.options[i].text == PresentState.options[PresentState.selectedIndex].text) {
                        PermanentState.options[i].selected = true;
                        break;
                    }
                }
                selectPermanentStates();
                var PresentDt = document.getElementById('ctl00_HomePageContent_ctrlTextPresentDistrict');
                var PermanentDt = document.getElementById('ctl00_HomePageContent_ctrlTextPermanentDistrict');
                for (var i = 0; i <= PermanentDt.options.length; i++) {
                    if (PermanentDt.options[i].text == PresentDt.options[PresentDt.selectedIndex].text) {
                        PermanentDt.options[i].selected = true;
                        break;
                    }
                }
            }
            else {
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress1").value = "";
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentPinCode").value = "";
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress2").value = "";
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentSTDCode").value = "";
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress3").value = "";
                document.getElementById("ctl00_HomePageContent_ctrlTextPermMobNoCode").value = "";

                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentEmailID").value = "";

                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentphoneNo").value = "";
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress2").value = "";
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanantMobileNo").disabled = "";

                document.getElementById('ctl00_HomePageContent_ctrlTextPermanentState').options[0].selected = true;
                document.getElementById('ctl00_HomePageContent_ctrlTextPermanentDistrict').options[0].selected = true;
            }
        }

        function validatation() {
            var reg = true;
            //if (document.getElementById("ctl00_HomePageContent_ctrlTxtPresentState").value == "" || document.getElementById("ctl00_HomePageContent_ctrlTxtPresentState").value == "---Please Select---") {
            if (document.getElementById("ctl00_HomePageContent_ctrlTxtPresentState").selectedIndex == 0) {
                alert("Please select state in Present address"); //pyare
                document.getElementById("ctl00_HomePageContent_ctrlTxtPresentState").focus();
                reg = false;


            }
            if (document.getElementById("ctl00_HomePageContent_ddllanguage").selectedIndex == 0) {
                alert("Please select preferred language"); //pyare
                document.getElementById("ctl00_HomePageContent_ddllanguage").focus();
                reg = false;


            }
            //else if (document.getElementById("ctl00_HomePageContent_ctrlTextPresentDistrict").value == "" || document.getElementById("ctl00_HomePageContent_ctrlTextPresentDistrict").value == "---Please Select---") {
            else if (document.getElementById("ctl00_HomePageContent_ctrlTextPresentDistrict").selectedIndex == 0) {
                document.getElementById("ctl00_HomePageContent_ctrlTextPresentDistrict").focus();
                alert("Please select district in Present address "); //pyare
                reg = false;
            }
            //else if (document.getElementById("ctl00_HomePageContent_ctrlTextPermanentState").value == "" || document.getElementById("ctl00_HomePageContent_ctrlTextPermanentState").value == "---Please Select---") {
            else if (document.getElementById("ctl00_HomePageContent_ctrlTextPermanentState").selectedIndex == 0) {
                alert("Please select State.in Permanent.address");
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentState").focus();
                reg = false;


            }
            //else if (document.getElementById("ctl00_HomePageContent_ctrlTextPermanentDistrict").value == "" || document.getElementById("ctl00_HomePageContent_ctrlTextPermanentDistrict").value == "---Please Select---") {
            else if (document.getElementById("ctl00_HomePageContent_ctrlTextPermanentDistrict").selectedIndex == 0) {
                alert("Please select District in Permanent.address");
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentDistrict").focus();
                reg = false;
            }
            //Changes Done By Goutham
            else if ((document.getElementById("ctl00_HomePageContent_ddlDispensaryState").selectedIndex == 0) || (document.getElementById("ctl00_HomePageContent_ddlDispensaryDistrict").selectedIndex == 0) || (document.getElementById("ctl00_HomePageContent_ctrlTextDispensary").selectedIndex == 0)) {
                alert("Please select IP Dispensary Details");
                document.getElementById("ctl00_HomePageContent_ctrlTextPermanentDistrict").focus();
                reg = false;
            }

            //Added by sudheer (photo path)
            else if (document.getElementById("ctl00_HomePageContent_hdnupload_Photo").value == "") {
                alert("Please upload a photo");
                document.getElementById("ctl00_HomePageContent_FileUpload_Photo").focus();
                reg = false;
            }
             // else if (document.getElementById("ctl00_HomePageContent_ddlDispensaryDistrict").selectedIndex == 0) {
                //  alert("Please select IP Dispensary District");
              //  document.getElementById("ctl00_HomePageContent_ddlDispensaryDistrict").focus();
                //  reg = false;
                // }
              //else if (document.getElementById("ctl00_HomePageContent_ctrlTextDispensary").selectedIndex == 0) {
                //  alert("Please select IP Dispensary");
              //  document.getElementById("ctl00_HomePageContent_ctrlTextDispensary").focus();
            //  reg = false;
            //}
            //Dependant Dispensary
            else if ((document.getElementById("ctl00_HomePageContent_ddldependantDispensaryState").selectedIndex == 0) || (document.getElementById("ctl00_HomePageContent_ddldependantDispensaryDistrict").selectedIndex == 0) || (document.getElementById("ctl00_HomePageContent_ddldependantdispensary").selectedIndex == 0)) {
                alert("Please select Dependant Dispensary Details");
                document.getElementById("ctl00_HomePageContent_ddldependantDispensaryState").focus();
                reg = false;
            }
             // else if (document.getElementById("ctl00_HomePageContent_ddldependantDispensaryDistrict").selectedIndex == 0) {
                // alert("Please select Dependant Dispensary District");
                //document.getElementById("ctl00_HomePageContent_ddldependantDispensaryDistrict").focus();
                //reg = false;
                //}
              //else if (document.getElementById("ctl00_HomePageContent_ddldependantdispensary").selectedIndex == 0) {
                //alert("Please select Dependant Dispensary");
                //document.getElementById("ctl00_HomePageContent_ddldependantdispensary").focus();
            //reg = false;
            //}
            else
                reg = true;
            return reg;
        }

        function assignGender(ddlGender, rblist, ftherrbList) {

            var mrbutton = document.getElementById(ddlGender.id.substring(0, ddlGender.id.lastIndexOf('_') + 1) + rblist + '_0');
            var frbutton = document.getElementById(ddlGender.id.substring(0, ddlGender.id.lastIndexOf('_') + 1) + rblist + '_1');
            var hrbutton = document.getElementById(ddlGender.id.substring(0, ddlGender.id.lastIndexOf('_') + 1) + ftherrbList + '_1');

            if (hrbutton.checked) {
                mrbutton.checked = false;
                frbutton.checked = true;
                frbutton.disabled = false;
                mrbutton.disabled = true;
            }

            else if (ddlGender.value == 3) {

                mrbutton.checked = false;
                frbutton.checked = true;
                frbutton.disabled = false;
                mrbutton.disabled = true;
            }

            else if (ddlGender.value == 4) {

                mrbutton.checked = true;
                frbutton.checked = false;
                mrbutton.disabled = false;
                frbutton.disabled = true;
            }
            else {

                mrbutton.checked = false;
                frbutton.checked = false;
                mrbutton.disabled = false;
                frbutton.disabled = false;
                frbutton.disabled = false;
            }
        }

        function assignFather(ddlGender, ddlMarried, rblist) {
            var Fathrbutton = document.getElementById(ddlGender + '_0');
            var Husrbutton = document.getElementById(ddlGender + '_1');
            var ddlMarr = document.getElementById(ddlGender.substring(0, ddlGender.lastIndexOf('_') + 1) + ddlMarried);
            var mrbutton = document.getElementById(ddlGender.substring(0, ddlGender.lastIndexOf('_') + 1) + rblist + '_0');
            var frbutton = document.getElementById(ddlGender.substring(0, ddlGender.lastIndexOf('_') + 1) + rblist + '_1');
            var tgrbutton = document.getElementById(ddlGender.substring(0, ddlGender.lastIndexOf('_') + 1) + rblist + '_2');
            if (Husrbutton.checked) {

                mrbutton.checked = false;
                frbutton.checked = true;
                mrbutton.disabled = true;

                for (var i = 0; i < ddlMarr.options.length; i++) {
                    ddlMarr.remove(i);
                }
                var newOption = document.createElement("option");
                ddlMarr.options[0] = new Option("Married", "2");
                ddlMarr.options[1] = new Option("Widow", "3");
            }

            else {
                var newOption = document.createElement("option");
                ddlMarr.options[0] = new Option("UnMarried", "1");
                ddlMarr.options[1] = new Option("Married", "2");
                ddlMarr.options[2] = new Option("Widow", "3");
                ddlMarr.options[3] = new Option("Widower", "4");
                mrbutton.disabled = false;
                mrbutton.checked = false;
                frbutton.checked = false;
                tgrbutton.checked = false;
            }
            if (Husrbutton.checked || Fathrbutton.checked) {
                document.getElementById("ctl00_HomePageContent_ctrlTextFatherHusName").disabled = false;
            }
            else {
                document.getElementById("ctl00_HomePageContent_ctrlTextFatherHusName").disabled = true;
            }
        }

        function assignDis(ddlGender, ddldis) {
            var Yrbutton = document.getElementById(ddlGender + '_0');
            var Nrbutton = document.getElementById(ddlGender + '_1');
            var ddlMarr = document.getElementById(ddlGender.substring(0, ddlGender.lastIndexOf('_') + 1) + ddldis);
            if (Yrbutton.checked) {
                ddlMarr.disabled = false;
                reqtxtdisabled.disabled = false;
                ctrlFISelectFile.disabled = false;
                btnSubmit.disabled = false;
            }
            else {
                ddlMarr.disabled = true;
                ddlMarr.options[0].selected = true;
                reqtxtdisabled.disabled = true;
                ctrlFISelectFile.disabled = true;
                btnSubmit.disabled = true;
            }
        }
        function fnLaunch(name) {

            var aForm;
            aForm = document.getElementsByTagName('INPUT');;
            var myObject = new Object();
            for (var a = 0; a < aForm.length; a++) {
                if (aForm[a].id.indexOf("Permanent") != -1) {
                    myObject.Address1 = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress1").value;
                    myObject.PinCode = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentPinCode").value;
                    myObject.Address2 = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress2").value;
                    myObject.STDCode = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentSTDCode").value;
                    myObject.Address3 = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentAddress3").value;
                    myObject.MobNoCode = document.getElementById("ctl00_HomePageContent_ctrlTextPermMobNoCode").value;
                    myObject.MobileNo = document.getElementById("ctl00_HomePageContent_ctrlTextPermanantMobileNo").value;
                    myObject.EmailId = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentEmailID").value;
                    myObject.phoneNo = document.getElementById("ctl00_HomePageContent_ctrlTextPermanentphoneNo").value;
                    myObject.state = -1;
                    myObject.district = -1;
                    myObject.districtNo = "";

                }

            }
            window.showModalDialog(name, myObject, 'dialogWidth:1000px; dialogHeight:800px; center:yes');
        }
        function clearchkbox() {

            if (document.getElementById("ctl00_HomePageContent_chkboxCopyPresentAddress").checked == true)
                CopyAddress();
        }
        function CheckTabVal(e) {
            return (e.keyCode == 9 || e.keyCode == 8);
        }
        //bindStates("ddlDispensaryState");
    </script>

    

    <script type="text/javascript">
        $(document).ready(function () {

            fnbindingcontrols();
        });

        function fnbindingcontrols() {

            // assignAadhaarEID();
        }
    </script>

    <script type="text/javascript" language="javascript">
        function assignAadhaarEID() {

        }
    </script>

    <script type="text/javascript" language="javascript">

        function CheckAadhaarEidValue() {

        }

    </script>

    <script language="javascript" type="text/javascript">
        function createEmployeeXMLDocument_Javascript() {
            var xmlchilddata;
            if (document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1') != null) {
                var fileName = location.pathname.split("/").slice(-1);

                if (document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1').checked) {
                    var dd = document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_Xmldatahidden').value;
                    var xmlParent;
                    xmlParent = dd;

                    websignerPopUp(xmlParent);
                }
            }
            else {
                document.getElementById('ctl00_HomePageContent_cover').style.display = 'none';
            }
        }
        function assigngendermale(ddlGender) {
            var male = document.getElementById(ddlGender + '_0');
            var female = document.getElementById(ddlGender + '_1');
            var TG = document.getElementById(ddlGender + '_2');
            if (male.checked) {
                var response = confirm("You have selected gender as Male");
                if (response) {
                    male.checked = true;
                }
                else {
                    male.checked = false;
                }
            }
            if (female.checked) {
                var response = confirm("You have selected gender as Female");
                if (response) {
                    female.checked = true;
                }
                else {
                    female.checked = false;
                }
            }
            if (TG.checked) {
                var response = confirm("You have selected gender as Transgender");
                if (response) {
                    TG.checked = true;
                }
                else {
                    TG.checked = false;
                }
            }
        }
        function websignerPopUp(data) {
            try {
                if (document.getElementById('ctl00_HomePageContent_cover')) {
                    document.getElementById('ctl00_HomePageContent_cover').style.display = 'inline';
                }
                data = data.replace(/\n/g, "");
                // remove whitespace (space and tabs) before tags
                data = data.replace(/[\t ]+\</g, "<");
                // remove whitespace after tags
                data = data.replace(/\>[\t ]+$/g, ">");


                var tbs = data;

                if (tbs !== '') {
                    websignerapplet = document.websignerapplet;
                    websignerapplet.open(tbs, "sign", "", "", "emasSubmit()", "emasCancel()");
                }
                else {
                    alert('Please enter Username to Sign!');
                    document.getElementById('ctl00_HomePageContent_cover').style.display = 'none';
                    return false;
                }
            }
            catch (e) {
                //alert(e);
            }
        }

        function emasSubmit() {
            var signData = websignerapplet.getGeneratedSignature();
            document.getElementById('ctl00_HomePageContent_lblhidden').value = signData; //Getting Hash Data.
            document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1').checked = true;
            document.getElementById("ctl00_HomePageContent_Submit").click();
        }

        function emasCancel() {
            alert('Emas Cancelled!');
            document.getElementById('ctl00_HomePageContent_DigitalSignatureComp1_CheckBox1').checked = false;
            document.getElementById('ctl00_HomePageContent_cover').style.display = 'none';
        }
//MRID C57958916 to show the if gender radio button is not selected 
		    function validateAndOpenNominee() {
        var rblGender = document.getElementsByName('ctl00$HomePageContent$ctrlRDMale');
var isGenderSelected = false;

if (rblGender && rblGender.length > 0) {
    for (var i = 0; i < rblGender.length; i++) {
        if (rblGender[i].checked) {
            isGenderSelected = true;
            break;
        }
    }
}

if (!isGenderSelected) {
    alert('Please select Gender before entering Nominee Details.');
    return false; 
}

var urlParams = new URLSearchParams(window.location.search);
var ipNum = urlParams.get('No') || '';
var flagDb = urlParams.get('F') || '';
var baseDb = urlParams.get('B') || '';

        var genderEnc = '';

        if (genderEnc === '') {
            var keys = Array.from(urlParams.keys());
            if (keys.length > 4) {
                genderEnc = encodeURIComponent(urlParams.get(keys[4]));
            }
        }

        var url = 'NomineeDetails.aspx?No=' + encodeURIComponent(ipNum) +
            '&F=' + encodeURIComponent(flagDb) +
            '&B=' + encodeURIComponent(baseDb) +
            '&G=' + genderEnc;

        window.open(url, '_blank', 'width=1000,height=800,toolbar=0,location=0,status=0,menubar=0,scrollbars=1,resizable=1');

        return false; 
    }
	function lockTextBox(element) {
    element.readOnly = true;  
}
    </script>


</td>
	</tr>
</table>
                   <div id="clearfooter"></div>
                    </div>

                    <div id="footersection">
                        <table id="ctl00_Table1" cellspacing="0" cellpadding="0" align="Center" style="border-width:0px;height:60px;width:100%;border-collapse:collapse;">
	<tr class="dBlockFooter" style="background-color:White;">
		<td class="dBlockFooter" colspan="5">
             DISCLAIMER: &copy; Copyright 2021, ESIC, India. All Rights Reserved. Best viewed
                    in 1024 x 768 pixels, Site maintained by : ESIC. Designed and Developed by CMS Computers LTD. Release Version No.: V2.5.427. <span id="ctl00_lblIP" style="color:White;">IP Address : 57. </span><span id="ctl00_Label1" style="color:#742902;">ASP Session ID : 0qcnasn5aunlectc1ai2cwgg</span></td>
	</tr>
</table>
           </div>
         <input type="hidden" name="ctl00$hdnhmedate" id="ctl00_hdnhmedate" value="2026 10 20" /> 
    
<script type="text/javascript">
//<![CDATA[
var Page_Validators =  new Array(document.getElementById("ctl00_HomePageContent_reqtxtdisabled"), document.getElementById("ctl00_HomePageContent_NameInBlockRequiredFieldVal"), document.getElementById("ctl00_HomePageContent_FatherOrHusRequiredVal1"), document.getElementById("ctl00_HomePageContent_DOBRequiredVal"), document.getElementById("ctl00_HomePageContent_ref_ctrlTxtIpDate"), document.getElementById("ctl00_HomePageContent_RequiredFieldValidatormarried"), document.getElementById("ctl00_HomePageContent_RequiredFieldValidator1"), document.getElementById("ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1"), document.getElementById("ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1"), document.getElementById("ctl00_HomePageContent_SaveValPresPin"), document.getElementById("ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1"), document.getElementById("ctl00_HomePageContent_ctrlTextPresentphonevalidator"), document.getElementById("ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1"), document.getElementById("ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1"), document.getElementById("ctl00_HomePageContent_TextPresentEmailRegularExpressionVal"), document.getElementById("ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1"), document.getElementById("ctl00_HomePageContent_SaveValPermPin"), document.getElementById("ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1"), document.getElementById("ctl00_HomePageContent_RegularExpressionValidator1"), document.getElementById("ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal"), document.getElementById("ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1"), document.getElementById("ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1"), document.getElementById("ctl00_HomePageContent_RegularExpressionValidator2"), document.getElementById("ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy"), document.getElementById("ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal"), document.getElementById("ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal"), document.getElementById("ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal"), document.getElementById("ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal"), document.getElementById("ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal"), document.getElementById("ctl00_HomePageContent_RegularExpressionValidator4"), document.getElementById("ctl00_HomePageContent_RegularExpressionValidator5"), document.getElementById("ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal"), document.getElementById("ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal"), document.getElementById("ctl00_HomePageContent_CurEmployerStateRequiredFieldVal"), document.getElementById("ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal"), document.getElementById("ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal"), document.getElementById("ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal"), document.getElementById("ctl00_HomePageContent_CurMobileRegularExpressionVal"), document.getElementById("ctl00_HomePageContent_PrevMobileRegularExpressionVal"));
//]]>
</script>

<script type="text/javascript">
//<![CDATA[
var ctl00_HomePageContent_reqtxtdisabled = document.all ? document.all["ctl00_HomePageContent_reqtxtdisabled"] : document.getElementById("ctl00_HomePageContent_reqtxtdisabled");
ctl00_HomePageContent_reqtxtdisabled.controltovalidate = "ctl00_HomePageContent_ctrlTextDisableType";
ctl00_HomePageContent_reqtxtdisabled.focusOnError = "t";
ctl00_HomePageContent_reqtxtdisabled.errormessage = "Please Select";
ctl00_HomePageContent_reqtxtdisabled.display = "Dynamic";
ctl00_HomePageContent_reqtxtdisabled.enabled = "False";
ctl00_HomePageContent_reqtxtdisabled.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_reqtxtdisabled.initialvalue = "0";
var ctl00_HomePageContent_NameInBlockRequiredFieldVal = document.all ? document.all["ctl00_HomePageContent_NameInBlockRequiredFieldVal"] : document.getElementById("ctl00_HomePageContent_NameInBlockRequiredFieldVal");
ctl00_HomePageContent_NameInBlockRequiredFieldVal.controltovalidate = "ctl00_HomePageContent_ctrlTextEmpName";
ctl00_HomePageContent_NameInBlockRequiredFieldVal.focusOnError = "t";
ctl00_HomePageContent_NameInBlockRequiredFieldVal.errormessage = "Please Enter Name";
ctl00_HomePageContent_NameInBlockRequiredFieldVal.display = "Dynamic";
ctl00_HomePageContent_NameInBlockRequiredFieldVal.validationGroup = "EmpDetails";
ctl00_HomePageContent_NameInBlockRequiredFieldVal.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_NameInBlockRequiredFieldVal.initialvalue = "";
var ctl00_HomePageContent_FatherOrHusRequiredVal1 = document.all ? document.all["ctl00_HomePageContent_FatherOrHusRequiredVal1"] : document.getElementById("ctl00_HomePageContent_FatherOrHusRequiredVal1");
ctl00_HomePageContent_FatherOrHusRequiredVal1.controltovalidate = "ctl00_HomePageContent_ctrlTextFatherHusName";
ctl00_HomePageContent_FatherOrHusRequiredVal1.focusOnError = "t";
ctl00_HomePageContent_FatherOrHusRequiredVal1.errormessage = "Please Enter Name";
ctl00_HomePageContent_FatherOrHusRequiredVal1.display = "Dynamic";
ctl00_HomePageContent_FatherOrHusRequiredVal1.validationGroup = "EmpDetails";
ctl00_HomePageContent_FatherOrHusRequiredVal1.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_FatherOrHusRequiredVal1.initialvalue = "";
var ctl00_HomePageContent_DOBRequiredVal = document.all ? document.all["ctl00_HomePageContent_DOBRequiredVal"] : document.getElementById("ctl00_HomePageContent_DOBRequiredVal");
ctl00_HomePageContent_DOBRequiredVal.controltovalidate = "ctl00_HomePageContent_ctrlTxtIpDate";
ctl00_HomePageContent_DOBRequiredVal.focusOnError = "t";
ctl00_HomePageContent_DOBRequiredVal.errormessage = "Please Enter A Valid Date (dd/mm/yyyy)";
ctl00_HomePageContent_DOBRequiredVal.display = "Dynamic";
ctl00_HomePageContent_DOBRequiredVal.validationGroup = "EmpDetails";
ctl00_HomePageContent_DOBRequiredVal.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_DOBRequiredVal.initialvalue = "";
var ctl00_HomePageContent_ref_ctrlTxtIpDate = document.all ? document.all["ctl00_HomePageContent_ref_ctrlTxtIpDate"] : document.getElementById("ctl00_HomePageContent_ref_ctrlTxtIpDate");
ctl00_HomePageContent_ref_ctrlTxtIpDate.controltovalidate = "ctl00_HomePageContent_ctrlTxtIpDate";
ctl00_HomePageContent_ref_ctrlTxtIpDate.focusOnError = "t";
ctl00_HomePageContent_ref_ctrlTxtIpDate.errormessage = "Please check date format(dd/mm/yyyy)";
ctl00_HomePageContent_ref_ctrlTxtIpDate.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_ref_ctrlTxtIpDate.validationexpression = "^(((0[1-9]|[12]\\d|3[01])\\/(0[13578]|1[02])\\/((19|[2-9]\\d)\\d{2}))|((0[1-9]|[12]\\d|30)\\/(0[13456789]|1[012])\\/((19|[2-9]\\d)\\d{2}))|((0[1-9]|1\\d|2[0-8])\\/02\\/((19|[2-9]\\d)\\d{2}))|(29\\/02\\/((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$";
var ctl00_HomePageContent_RequiredFieldValidatormarried = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidatormarried"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidatormarried");
ctl00_HomePageContent_RequiredFieldValidatormarried.controltovalidate = "ctl00_HomePageContent_ctrlRDMarried";
ctl00_HomePageContent_RequiredFieldValidatormarried.focusOnError = "t";
ctl00_HomePageContent_RequiredFieldValidatormarried.errormessage = "Please Select Marital Status";
ctl00_HomePageContent_RequiredFieldValidatormarried.display = "Dynamic";
ctl00_HomePageContent_RequiredFieldValidatormarried.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidatormarried.initialvalue = "-1";
var ctl00_HomePageContent_RequiredFieldValidator1 = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidator1"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidator1");
ctl00_HomePageContent_RequiredFieldValidator1.controltovalidate = "ctl00_HomePageContent_ctrlRDMale";
ctl00_HomePageContent_RequiredFieldValidator1.focusOnError = "t";
ctl00_HomePageContent_RequiredFieldValidator1.errormessage = "Please Select Gender";
ctl00_HomePageContent_RequiredFieldValidator1.display = "Dynamic";
ctl00_HomePageContent_RequiredFieldValidator1.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidator1.initialvalue = "";
var ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1 = document.all ? document.all["ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1"] : document.getElementById("ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1");
ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTextPresentAddress1";
ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1.focusOnError = "t";
ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1.errormessage = "Please Enter Address";
ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1.display = "Dynamic";
ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1.validationGroup = "EmpDetails";
ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1.initialvalue = "";
var ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1 = document.all ? document.all["ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1"] : document.getElementById("ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1");
ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTextPresentAddress1";
ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1.focusOnError = "t";
ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1.errormessage = "Please enter valid Characters";
ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1.display = "Dynamic";
ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_SaveValPresPin = document.all ? document.all["ctl00_HomePageContent_SaveValPresPin"] : document.getElementById("ctl00_HomePageContent_SaveValPresPin");
ctl00_HomePageContent_SaveValPresPin.controltovalidate = "ctl00_HomePageContent_ctrlTxtPresentPinCode";
ctl00_HomePageContent_SaveValPresPin.focusOnError = "t";
ctl00_HomePageContent_SaveValPresPin.errormessage = "Please Enter Valid Pin Code";
ctl00_HomePageContent_SaveValPresPin.display = "Dynamic";
ctl00_HomePageContent_SaveValPresPin.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_SaveValPresPin.validationexpression = "^[1-9][0-9]{5}$";
var ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1 = document.all ? document.all["ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1"] : document.getElementById("ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1");
ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTextPresentAddress2";
ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1.focusOnError = "t";
ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1.errormessage = "Please enter valid Characters";
ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1.display = "Dynamic";
ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_ctrlTextPresentphonevalidator = document.all ? document.all["ctl00_HomePageContent_ctrlTextPresentphonevalidator"] : document.getElementById("ctl00_HomePageContent_ctrlTextPresentphonevalidator");
ctl00_HomePageContent_ctrlTextPresentphonevalidator.controltovalidate = "ctl00_HomePageContent_ctrlTextPresentphoneNo";
ctl00_HomePageContent_ctrlTextPresentphonevalidator.errormessage = "Please enter valid phone no";
ctl00_HomePageContent_ctrlTextPresentphonevalidator.evaluationfunction = "CustomValidatorEvaluateIsValid";
ctl00_HomePageContent_ctrlTextPresentphonevalidator.clientvalidationfunction = "validationphoneno";
var ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1 = document.all ? document.all["ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1"] : document.getElementById("ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1");
ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTextPresentAddress3";
ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1.focusOnError = "t";
ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1.errormessage = "Please enter valid Characters";
ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1.display = "Dynamic";
ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1 = document.all ? document.all["ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1"] : document.getElementById("ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1");
ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTextPresentMobileNo";
ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1.focusOnError = "t";
ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1.errormessage = "Please Enter Valid Mobile number";
ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1.display = "Dynamic";
ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1.validationexpression = "^[0-9]{10}$";
var ctl00_HomePageContent_TextPresentEmailRegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_TextPresentEmailRegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_TextPresentEmailRegularExpressionVal");
ctl00_HomePageContent_TextPresentEmailRegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextPresentEmail";
ctl00_HomePageContent_TextPresentEmailRegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_TextPresentEmailRegularExpressionVal.errormessage = "Please Enter Valid Email ID";
ctl00_HomePageContent_TextPresentEmailRegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_TextPresentEmailRegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_TextPresentEmailRegularExpressionVal.validationexpression = "^([a-zA-Z0-9_\\.\\-\\+])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$";
var ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1 = document.all ? document.all["ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1"] : document.getElementById("ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1");
ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTextPermanentAddress1";
ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1.focusOnError = "t";
ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1.errormessage = "Please enter valid Characters";
ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1.display = "Dynamic";
ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_SaveValPermPin = document.all ? document.all["ctl00_HomePageContent_SaveValPermPin"] : document.getElementById("ctl00_HomePageContent_SaveValPermPin");
ctl00_HomePageContent_SaveValPermPin.controltovalidate = "ctl00_HomePageContent_ctrlTextPermanentPinCode";
ctl00_HomePageContent_SaveValPermPin.focusOnError = "t";
ctl00_HomePageContent_SaveValPermPin.errormessage = "Please Enter Valid Pin Code";
ctl00_HomePageContent_SaveValPermPin.display = "Dynamic";
ctl00_HomePageContent_SaveValPermPin.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_SaveValPermPin.validationexpression = "^[0-9]{6}$";
var ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1 = document.all ? document.all["ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1"] : document.getElementById("ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1");
ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTextPermanentAddress3";
ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1.focusOnError = "t";
ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1.errormessage = "Please enter valid Characters";
ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1.display = "Dynamic";
ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_RegularExpressionValidator1 = document.all ? document.all["ctl00_HomePageContent_RegularExpressionValidator1"] : document.getElementById("ctl00_HomePageContent_RegularExpressionValidator1");
ctl00_HomePageContent_RegularExpressionValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTextPermanantMobileNo";
ctl00_HomePageContent_RegularExpressionValidator1.focusOnError = "t";
ctl00_HomePageContent_RegularExpressionValidator1.errormessage = "Please Enter Valid Mobile Number";
ctl00_HomePageContent_RegularExpressionValidator1.display = "Dynamic";
ctl00_HomePageContent_RegularExpressionValidator1.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_RegularExpressionValidator1.validationexpression = "^[0-9]{10}$";
var ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal");
ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextPermanentEmailID";
ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal.errormessage = "Please Enter Valid Email ID";
ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal.validationexpression = "^([a-zA-Z0-9_\\.\\-\\+])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$";
var ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1 = document.all ? document.all["ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1"] : document.getElementById("ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1");
ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTextCurEmployersCode";
ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1.focusOnError = "t";
ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1.errormessage = "Please Enter 17 digit Employer Code";
ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1.display = "Dynamic";
ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1.validationexpression = "^[0-9]{1,17}$";
var ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1 = document.all ? document.all["ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1"] : document.getElementById("ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1");
ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTextPreviousEmployerCodeNumber";
ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1.focusOnError = "t";
ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1.errormessage = "Please Enter 17 digit Employer Code";
ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1.display = "Dynamic";
ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1.validationexpression = "^[0-9]{1,17}$";
var ctl00_HomePageContent_RegularExpressionValidator2 = document.all ? document.all["ctl00_HomePageContent_RegularExpressionValidator2"] : document.getElementById("ctl00_HomePageContent_RegularExpressionValidator2");
ctl00_HomePageContent_RegularExpressionValidator2.controltovalidate = "ctl00_HomePageContent_ctrlDIDateOfAppointmentDy";
ctl00_HomePageContent_RegularExpressionValidator2.focusOnError = "t";
ctl00_HomePageContent_RegularExpressionValidator2.errormessage = "Please check date format(dd/mm/yyyy)";
ctl00_HomePageContent_RegularExpressionValidator2.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_RegularExpressionValidator2.validationexpression = "^(((0[1-9]|[12]\\d|3[01])\\/(0[13578]|1[02])\\/((19|[2-9]\\d)\\d{2}))|((0[1-9]|[12]\\d|30)\\/(0[13456789]|1[012])\\/((19|[2-9]\\d)\\d{2}))|((0[1-9]|1\\d|2[0-8])\\/02\\/((19|[2-9]\\d)\\d{2}))|(29\\/02\\/((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$";
var ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy = document.all ? document.all["ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy"] : document.getElementById("ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy");
ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy.controltovalidate = "ctl00_HomePageContent_ctrlDIDateOfAppointmentDy";
ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy.errormessage = "Please enter a valid Date";
ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy.display = "Dynamic";
ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy.validationGroup = "EmpDetails";
ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy.initialvalue = "";
var ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal");
ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextPreviousInsuranceNumber";
ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal.errormessage = "Please Enter Only Digits";
ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal.validationexpression = "^[0-9]{1,10}$";
var ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal = document.all ? document.all["ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal"] : document.getElementById("ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal");
ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal.controltovalidate = "ctl00_HomePageContent_ctrlTextNameOfCurEmployer";
ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal.focusOnError = "t";
ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal.errormessage = "Please Enter Name of The Employer";
ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal.display = "Dynamic";
ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal.initialvalue = "";
var ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal = document.all ? document.all["ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal"] : document.getElementById("ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal");
ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal.controltovalidate = "ctl00_HomePageContent_ctrlTextCurEmployerAddress1";
ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal.errormessage = "Please Enter Address";
ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal.display = "Dynamic";
ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal.initialvalue = "";
var ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal");
ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextCurEmployerAddress1";
ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal.errormessage = "Please enter valid Characters";
ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal");
ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextPreviousEmployerAddress1";
ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal.errormessage = "Please enter valid Characters";
ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_RegularExpressionValidator4 = document.all ? document.all["ctl00_HomePageContent_RegularExpressionValidator4"] : document.getElementById("ctl00_HomePageContent_RegularExpressionValidator4");
ctl00_HomePageContent_RegularExpressionValidator4.controltovalidate = "ctl00_HomePageContent_ctrlTextCurEmployerAddress2";
ctl00_HomePageContent_RegularExpressionValidator4.focusOnError = "t";
ctl00_HomePageContent_RegularExpressionValidator4.errormessage = "Please enter valid Characters";
ctl00_HomePageContent_RegularExpressionValidator4.display = "Dynamic";
ctl00_HomePageContent_RegularExpressionValidator4.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_RegularExpressionValidator4.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_RegularExpressionValidator5 = document.all ? document.all["ctl00_HomePageContent_RegularExpressionValidator5"] : document.getElementById("ctl00_HomePageContent_RegularExpressionValidator5");
ctl00_HomePageContent_RegularExpressionValidator5.controltovalidate = "ctl00_HomePageContent_ctrlTextPreviousEmployerAddress2";
ctl00_HomePageContent_RegularExpressionValidator5.focusOnError = "t";
ctl00_HomePageContent_RegularExpressionValidator5.errormessage = "Please enter valid Characters";
ctl00_HomePageContent_RegularExpressionValidator5.display = "Dynamic";
ctl00_HomePageContent_RegularExpressionValidator5.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_RegularExpressionValidator5.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal");
ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextCurEmployerAddress3";
ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal.errormessage = "Please enter valid Characters";
ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal");
ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextPreviousEmployerAddress3";
ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal.errormessage = "Please enter valid Characters";
ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_CurEmployerStateRequiredFieldVal = document.all ? document.all["ctl00_HomePageContent_CurEmployerStateRequiredFieldVal"] : document.getElementById("ctl00_HomePageContent_CurEmployerStateRequiredFieldVal");
ctl00_HomePageContent_CurEmployerStateRequiredFieldVal.controltovalidate = "ctl00_HomePageContent_ctrlTextCurEmployerState";
ctl00_HomePageContent_CurEmployerStateRequiredFieldVal.focusOnError = "t";
ctl00_HomePageContent_CurEmployerStateRequiredFieldVal.errormessage = "Please Select State";
ctl00_HomePageContent_CurEmployerStateRequiredFieldVal.display = "Dynamic";
ctl00_HomePageContent_CurEmployerStateRequiredFieldVal.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_CurEmployerStateRequiredFieldVal.initialvalue = "-1";
var ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal = document.all ? document.all["ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal"] : document.getElementById("ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal");
ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal.controltovalidate = "ctl00_HomePageContent_ctrlTextCurEmployerDistrict";
ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal.focusOnError = "t";
ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal.errormessage = "Please Select District";
ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal.display = "Dynamic";
ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal.initialvalue = "-1";
var ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal");
ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextCurEmployerEmail";
ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal.errormessage = "Please Enter Valid Email ID";
ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal.validationexpression = "^([a-zA-Z0-9_\\.\\-\\+])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$";
var ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal");
ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextPreviousEmployerEmail";
ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal.errormessage = "Please Enter Valid Email ID";
ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal.validationexpression = "^([a-zA-Z0-9_\\.\\-\\+])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$";
var ctl00_HomePageContent_CurMobileRegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_CurMobileRegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_CurMobileRegularExpressionVal");
ctl00_HomePageContent_CurMobileRegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextCurMobile";
ctl00_HomePageContent_CurMobileRegularExpressionVal.errormessage = "Please Enter Valid Mobile Number";
ctl00_HomePageContent_CurMobileRegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_CurMobileRegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_CurMobileRegularExpressionVal.validationexpression = "^[0-9]{10}$";
var ctl00_HomePageContent_PrevMobileRegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_PrevMobileRegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_PrevMobileRegularExpressionVal");
ctl00_HomePageContent_PrevMobileRegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextPrevMobile";
ctl00_HomePageContent_PrevMobileRegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_PrevMobileRegularExpressionVal.errormessage = "Please Enter Valid Mobile Number";
ctl00_HomePageContent_PrevMobileRegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_PrevMobileRegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_PrevMobileRegularExpressionVal.validationexpression = "^[0-9]{10}$";
//]]>
</script>


<script type="text/javascript">
//<![CDATA[

var Page_ValidationActive = false;
if (typeof(ValidatorOnLoad) == "function") {
    ValidatorOnLoad();
}

function ValidatorOnSubmit() {
    if (Page_ValidationActive) {
        return ValidatorCommonOnSubmit();
    }
    else {
        return true;
    }
}
        
document.getElementById('ctl00_HomePageContent_reqtxtdisabled').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_reqtxtdisabled'));
}

document.getElementById('ctl00_HomePageContent_NameInBlockRequiredFieldVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_NameInBlockRequiredFieldVal'));
}
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.FilteredTextBoxBehavior, {"FilterType":13,"ValidChars":". ","id":"ctl00_HomePageContent_ftbEmpName"}, null, null, $get("ctl00_HomePageContent_ctrlTextEmpName"));
});

document.getElementById('ctl00_HomePageContent_FatherOrHusRequiredVal1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_FatherOrHusRequiredVal1'));
}
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.FilteredTextBoxBehavior, {"FilterType":13,"ValidChars":".\u0027 ","id":"ctl00_HomePageContent_ftbFatherHusName"}, null, null, $get("ctl00_HomePageContent_ctrlTextFatherHusName"));
});
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.CalendarBehavior, {"format":"dd/MM/yyyy","id":"ctl00_HomePageContent_CalendarExtenderCtrlTxtEndDate"}, {"dateSelectionChanged":checkFutureDate1}, null, $get("ctl00_HomePageContent_ctrlTxtIpDate"));
});

document.getElementById('ctl00_HomePageContent_DOBRequiredVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_DOBRequiredVal'));
}

document.getElementById('ctl00_HomePageContent_ref_ctrlTxtIpDate').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_ref_ctrlTxtIpDate'));
}

document.getElementById('ctl00_HomePageContent_RequiredFieldValidatormarried').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidatormarried'));
}

document.getElementById('ctl00_HomePageContent_RequiredFieldValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidator1'));
}

document.getElementById('ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PresentAddress1RequiredFieldValidator1'));
}

document.getElementById('ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PresentAddress1RegularExpressionValidator1'));
}

document.getElementById('ctl00_HomePageContent_SaveValPresPin').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_SaveValPresPin'));
}
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.FilteredTextBoxBehavior, {"FilterType":2,"id":"ctl00_HomePageContent_FTBPresentPinCode"}, null, null, $get("ctl00_HomePageContent_ctrlTxtPresentPinCode"));
});

document.getElementById('ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PresentAddress2RegularExpressionValidator1'));
}

document.getElementById('ctl00_HomePageContent_ctrlTextPresentphonevalidator').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_ctrlTextPresentphonevalidator'));
}

document.getElementById('ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PresentAddress3RegularExpressionValidator1'));
}

document.getElementById('ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PresentMobileNoRegularExpressionValidator1'));
}

document.getElementById('ctl00_HomePageContent_TextPresentEmailRegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_TextPresentEmailRegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PermanentAddress1RegularExpressionValidator1'));
}

document.getElementById('ctl00_HomePageContent_SaveValPermPin').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_SaveValPermPin'));
}
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.FilteredTextBoxBehavior, {"FilterType":2,"id":"ctl00_HomePageContent_FilteredTextBoxExtender1"}, null, null, $get("ctl00_HomePageContent_ctrlTextPermanentSTDCode"));
});
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.FilteredTextBoxBehavior, {"FilterType":2,"id":"ctl00_HomePageContent_FilteredTextBoxExtender2"}, null, null, $get("ctl00_HomePageContent_ctrlTextPermanentphoneNo"));
});

document.getElementById('ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PermanentAddress3RegularExpressionValidator1'));
}
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.FilteredTextBoxBehavior, {"FilterType":2,"id":"ctl00_HomePageContent_FilteredTextBoxExtender3"}, null, null, $get("ctl00_HomePageContent_ctrlTextPermanantMobileNo"));
});

document.getElementById('ctl00_HomePageContent_RegularExpressionValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RegularExpressionValidator1'));
}

document.getElementById('ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_TextPermanentEmailIDRegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_CurEmployersCodeRegularExpressionValidator1'));
}

document.getElementById('ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PreviousEmployerCodeNumberRegularExpressionValidator1'));
}
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.CalendarBehavior, {"format":"dd/MM/yyyy","id":"ctl00_HomePageContent_cEDOA"}, {"dateSelectionChanged":checkFutureDate}, null, $get("ctl00_HomePageContent_ctrlDIDateOfAppointmentDy"));
});

document.getElementById('ctl00_HomePageContent_RegularExpressionValidator2').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RegularExpressionValidator2'));
}

document.getElementById('ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RFVctrlDIDateOfAppointmentDy'));
}

document.getElementById('ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PreviousInsuranceNumberRegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_NameOfCurEmployerRequiredFieldVal'));
}
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.FilteredTextBoxBehavior, {"FilterType":15,"ValidChars":".\u0027-,.()\u0026 ","id":"ctl00_HomePageContent_ftbNameOfCurEmployer"}, null, null, $get("ctl00_HomePageContent_ctrlTextNameOfCurEmployer"));
});
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.FilteredTextBoxBehavior, {"FilterType":13,"ValidChars":".\u0027()-,\u0026 ","id":"ctl00_HomePageContent_ftbPreviousEmployername"}, null, null, $get("ctl00_HomePageContent_ctrlTextPreviousEmployername"));
});

document.getElementById('ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_CurEmployerAddress1RequiredFieldVal'));
}

document.getElementById('ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_CurEmployerAddress1RegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PreviousEmployerAddress1RegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_RegularExpressionValidator4').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RegularExpressionValidator4'));
}

document.getElementById('ctl00_HomePageContent_RegularExpressionValidator5').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RegularExpressionValidator5'));
}

document.getElementById('ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_CurEmployerAddress3RegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PreviousEmployerAddress3RegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_CurEmployerStateRequiredFieldVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_CurEmployerStateRequiredFieldVal'));
}

document.getElementById('ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_CurEmployerDistrictRequiredFieldVal'));
}

document.getElementById('ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_CurEmployerEmailRegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PreviousEmployerEmailRegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_CurMobileRegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_CurMobileRegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_PrevMobileRegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_PrevMobileRegularExpressionVal'));
}
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.ModalPopupBehavior, {"BackgroundCssClass":"modalBackground","PopupControlID":"ctl00_HomePageContent_panMessage","dynamicServicePath":"/InsuranceGlobalWebV4/Employee/EmployeeCounterFoilRegistration.aspx","id":"behUserDetail"}, null, null, $get("ctl00_HomePageContent_lblmodal"));
});
Sys.Application.add_init(function() {
    $create(Sys.UI._UpdateProgress, {"associatedUpdatePanelId":"ctl00_HomePageContent_UpdatePanel1","displayAfter":500,"dynamicLayout":true}, null, null, $get("ctl00_HomePageContent_UpdateProgress1"));
});
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.ModalPopupBehavior, {"BackgroundCssClass":"modalBackground","CancelControlID":"ctl00_HomePageContent_btnNo","PopupControlID":"ctl00_HomePageContent_pnlPopup","dynamicServicePath":"/InsuranceGlobalWebV4/Employee/EmployeeCounterFoilRegistration.aspx","id":"ctl00_HomePageContent_ModalPopupExtender1"}, null, null, $get("ctl00_HomePageContent_btnShow"));
});
//]]>
</script>
</form>
  
</body>

<script type="text/javascript">
    javascript: window.history.forward(1);
    function doClick(field, event) {
        var key;

        if (event.keyCode == 13) {
            //Get the button the user wants to have clicked
            var btn = document.getElementById(field);
            //alert(btn.id);
            btn.click();

        }
    }
    currentServerDate = '20-10-2026'
    dateSeperator = '-'
//    MRID-2175
    getdate(); 
    javascript: window.history.forward(1);
    function doClick(field, event) {
        var key;

        if (event.keyCode == 13) {
            //Get the button the user wants to have clicked
            var btn = document.getElementById(field);
            //alert(btn.id);
            btn.click();

        }
    }
</script>


</html>
