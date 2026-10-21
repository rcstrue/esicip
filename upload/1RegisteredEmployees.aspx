

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="ctl00_Head1"><title>
	EmployeeRegistration
</title><link rel="stylesheet" type="text/css" href="../App_Themes/CSS/esicCSSglobal.css" /><link rel="stylesheet" type="text/css" href="../App_Themes/CSS/esiccsstaskhome.css" /><link rel="stylesheet" type="text/css" href="../App_Themes/CSS/esiclayout.css" />

    <script type="text/javascript" src="~/App_Themes/JS/javaScript1.js"></script>

    <script type="text/javascript">
        var isClose = false;
        var closeCtr = 1;
        function disableBackButton() {
            window.history.forward();
        }
        setTimeout("disableBackButton()", 0);
        function getPage() {
            window.opener = self;
            window.close();

        }
        openWins = new Array();
        curWin = 0;

        function openWin(page) {
            openWins[curWin++] = window.open(page, '_blank', 'width=2000,height=2000, scrollbars=auto');
        }

        function closeAll() {

            for (i = 0; i < openWins.length; i++)
                if (openWins[i] && !openWins[i].closed) openWins[i].close();
        }
        function doClick(field, event) {
            var key;

            if (event.keyCode == 13) {
                var btn = document.getElementById(field);
                btn.click();

            }
        }
        getdate();
        javascript: window.history.forward(1);
        function doClick(field, event) {
            var key;

            if (event.keyCode == 13) {
                var btn = document.getElementById(field);
                btn.click();

            }
        }
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
      
    </script>

    
    
    <link href="/InsuranceGlobalWebV4/WebResource.axd?d=Vfq88GPHnLgpA1DfLBXAPAwN_9jTbDofysm8I3AVqU4yagjMRkxIkW9HMIwDMWYxD8Kl9DudY51VML9nrAVybpypDgfMrPK1aNyatsrMxM50K5Wy-C0-U5Wca6uBQ-1pVtrelQ2&amp;t=636010848540000000" type="text/css" rel="stylesheet" /></head>
<body onkeydown="checkForRefresh(event)" onload="actionsOnLoad();" oncontextmenu="return false">
    <div id="minHeight" >
    </div>
    <form method="post" action="./RegisteredEmployees.aspx?userPk=UKzg%2founps0MYEuhR3DRN82Bj2yTYxpN" onsubmit="javascript:return WebForm_OnSubmit();" onkeypress="javascript:return WebForm_FireDefaultButton(event, 'ctl00_Test')" id="aspnetForm">
<div class="aspNetHidden">
<input type="hidden" name="__LASTFOCUS" id="__LASTFOCUS" value="" />
<input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
<input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="cy3ZsiiwlHkoJxn+qALN8XZcFZfqAa6Xpddvl2hhTmHYTgyDnzkvLM1tzdkO7fDe+6Q2g7MhnlwEKKWV8KVoKjS//FNLMHMRxjH2zqENiu4ekW3lmDo6HSCty/Jxgs6dSeysNVtwkxTtrrtqpSyWMSWdnojLc+YmurthdsDDb3WIGZP5mR6owwN0LGsNBJZrNqYOMpg0nSmX//ocyLu0PDZDtphVeLMkgZxKPuuiuz1/2x1VaNEoBvCN4CRE1PMrZBCC3UC7QSvf1FjJ2Gm9zIgNChZ3XxXYIsL3drSN5d58Ahg9toB9JZXmAsDBJK97hFWYv66v/l3DjLT28Fynz3MzrDiHFokdBvWlpSZLBQOZWrYYnZO8eXUbhUtYDmr3Od/Y8GISa2VdiZDYpVAlcv2W/xvWuCKhbpIm5+sR42d7wOPNQELYNMKM9p7qcDTGfZV5Guht0DP1GYlCk47wKRAEmB0EISAAC+09+3v/f/nKtdm5jntD8IJZ5S/2aJWPwLM9BXpdlMBhXUgbjHWircrTxHTS7Fo4OmnDQTf36mAMZHZDjjqnB077qU83vMSh1BdMVhOQEW5pzvYE2GW8ZYx7N3mY4nTO54+fy9Uwsnd+iH6+hr1PCmp5vTlBNtG6ywf0fSeWpGJclhwvvbYEaVuh8C12nzyzF5WLGXd8NlS95Zot7npv6Ak1+shPZZeWBtGucsfI89KkoWvCsYPbB9lB5damjroQHFQgw35XxN4ranntsn6lW9VIl7E8SUnGIAEcMaQMN9T9ihDVmwMNfB+OHL+npbn6Hp0rJUF6sLs7JDHCUh5FwVySZkhTfcyJODQeMIf85CMnRuhQdYxdImmBwYU=" />
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


<script src="/InsuranceGlobalWebV4/WebResource.axd?d=pynGkmcFUV13He1Qd6_TZPEcwF2MLbN130Art7N7lKPSxy8K4H0W4eCuiJdyRSpPmcCZag2&amp;t=639163520397840507" type="text/javascript"></script>


<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=nv7asgRUU0tRmHNR2D6t1Jf2DS_HIF2rfS5uJ-pm13bUEGsCLuOwjdAAQk-I7XSyN6AbJbMwMXU6OJCzQM3j_4Z4YUp8vMrw9zO-Sp03XEbhfGh3ksVsK4L1AGZprjsZ3bl3lA2&amp;t=ffffffffa0bc9515" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=NJmAwtEo3Ipnlaxl6CMhvslJlHH3G7HumwC1wwNRVj3k2yOnV0bbKbacGbCOQPqH-l2V1NS7CbNNvnW01NT7qa9P454WAVI6jTIvgH_26YKJAiImKFt5hVa2DTQ5DQdOinK_kZ90r9ZtqiooTZJFzyaQZJY1&amp;t=ffffffffe6d5a9ac" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=dwY9oWetJoJoVpgL6Zq8OL6ygv_uCtqgdaixDSvMyoZOa3hxGH5JpTZGPZqbYxSFImy_uHVdhYEwzayROwmuB9hOA5Z4zPHzl9bEGmkPMO17aZIV-oFcYH8yNe7-gIM-AddpzzmdmGI0H0u55ke0JWP8hec1&amp;t=ffffffffe6d5a9ac" type="text/javascript"></script>
<script src="../App_Themes/JS/jquery1.js" type="text/javascript"></script>
<script src="../App_Themes/JS/esic.js" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=LkSbRRtTbnpvh0g927IxkDnUNt3e2Oxr8tl396fAwV2OgYPb6ZYQiU88xDwKP7Cx3jO4QRVkc_syQlRfjyMKhhbF2TFba6j-2FNXs-j4VlYa-LTRFe9hqsZJbZKQAvJOoazoqQ2&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=JcDYB5KVMsBIe_7HUCQE4Jc7QdBKhue_LPixnZteF-AUNdyBy8zjfZeux6D7DslJZDVrJ0i4IEeUkg_1FkoS99tHl-MuL4T4xojEDfjFAaJWeRrrklWP0JCfLBK6lLeC39e7ZA2&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=dMtrWYtYVdP90oUUR-ZVm9cBkkvXq7qllH4OqEvcfUuuntoHYkMc4IDmybts3QBI8uxLCWeOatujIz2kthpoMccWJTGh-FSa0ePzVKSNhJUe9Xkm47H2G7bdhrs92csB8bhtPA2&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=beb9cQ9ZLEsvO0Gw0Ci-lLlxCSwCPXx1VR4bStvFHmbtfGjqq0loIcNp42Rc4s9gBDg1qvgumMNkoJFRZ5RFXGXQ_wujBDWAEL6meqoKjTUTvLeZWpcw6fasdCeIykmX30JYbw2&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=8CjII1v0OLoMNKf5zGXmek6ohMvZjCCPcRcIiqYLmOOAPQf3A2BbK37eN908WIzOAUNhl-GFUaat8zUw5H5sU71mnMaV1jynd0Bm52Bzgkc6hv2pifs6DXYTIc3Q6yLOu8VXtdvpiUaWIJIPqd-YMwW_L2I1&amp;t=ffffffff87636c38" type="text/javascript"></script>
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
<script src="/InsuranceGlobalWebV4/WebResource.axd?d=JoBkLzP19aTuxbWOhHobYja7TAa1WKFf6iz3O_hG8BA-M_AIfn8tijF8Ot0M2SI2RdHuvA2&amp;t=639163520397840507" type="text/javascript"></script>
<script type="text/javascript">
//<![CDATA[
function WebForm_OnSubmit() {
if (typeof(ValidatorOnSubmit) == "function" && ValidatorOnSubmit() == false) return false;
return true;
}
//]]>
</script>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="E2E012FF" />
	<input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value="" />
	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="jOM3o0EToUsx5WL9shF0hTTtx80WRoFXdZlpVAK1qVclyzWSDjE+njc/hIcuqz6WSAV3NfJlwfjxq7PZz4SnnOOjoHbAkDyAejyy6fqp8QnT4B3/dNd8IXeoxPz7+Xb6qA/tjKU7lzK0WiAAOVAlT6kyPv4AEsA6aUkO/OrlxzqfPyPdwNX4uHlNLjkh83Ocu3y+FjXI3kToGM1zT1+m6vm8zcJgBAVhadgvQS2vE0E7uKqEmCXN8Fg7hHcZivczaBjI8cn4lOQTzXiQe5jge3WNCqprGWF+esdYXRU7j5DbWbuKILSkHJzCr9V2YW8xOp41mJR1UlxPjYRbCjRkRWKXm2V749Zvr443DIIle+c3gGRbS0GWnEnXJK1ubedoZBs8LSUgjUJ9hsG3SJEGlwqlX2oB7a+vVbJ9eHYdsA/QPo851+K3WaZepER9IZebVtXwpwfYWZXgL1NhyFsPurBA3A4=" />
</div>
   <script type="text/javascript">
//<![CDATA[
Sys.WebForms.PageRequestManager._initialize('ctl00$ScriptManager1', 'aspnetForm', ['tctl00$HomePageContent$UpdatePanel1',''], [], ['ctl00$HomePageContent$btnContinue','','ctl00$HomePageContent$button',''], 90, 'ctl00');
//]]>
</script>

    <div id="outer">
        <table id="ctl00_Table2" cellspacing="0" cellpadding="0" align="Center" style="border-width:0px;height:60px;width:100%;border-collapse:collapse;">
	<tr>
		<td class="tHeadImage" align="left"><img id="ctl00_ESICLogo" src="../App_Themes/Images/Small%20Logo.jpg" align="absmiddle" style="border-width:0px;" /></td><td class="tHeadImage" align="center"></td><td class="tHeadImage" align="right"><img id="ctl00_Image1" src="../App_Themes/Images/IndianSymbol.jpg" align="absmiddle" style="border-width:0px;" /></td>
	</tr><tr>
		<td align="center" colspan="3" style="height:25px;width:100%;"><table id="ctl00_Table3" cellspacing="0" cellpadding="0" style="height:100%;width:100%;border-collapse:collapse;">
			<tr>
				<td class="dataBlock" align="left" style="width:8%;">
                                    User Login:    
                            </td><td class="dataBlock" align="left" style="width:58%;"><span id="ctl00_lbluserName" style="background-color:Transparent;">39000547790001019</span></td><td class="dataBlock" style="width:23%;">
                                    <div id="raw">Tuesday, October 20, 2026 1:14:48 PM</div>
                            </td><td class="homelink" align="right">
                                &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                                <input type="submit" name="ctl00$Test" value="Button" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$Test&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_Test" style="display: none;" /><input type="submit" name="ctl00$dummybutton" value="" id="ctl00_dummybutton" style="border-width:0px;font-weight:bold;height:0px;width:0px;" /></td>
			</tr>
		</table></td>
	</tr>
</table>
        <table id="ctl00_Table5" cellspacing="0" cellpadding="0" align="Center" style="border-width:0px;width:100%;border-collapse:collapse;">
	<tr>
		<td colspan="5" style="background-color:White;width:100%;">
                    <div align="center"  Style="position:relative;">
                        
                    </div>
                </td>
	</tr><tr>
		<td class="tContentPlace" colspan="5" style="background-color:White;width:100%;">
		   <div id="caldisp" Style="position:relative;">
                    
    <div id="ctl00_HomePageContent_Panel1" onkeypress="javascript:return WebForm_FireDefaultButton(event, &#39;ctl00_HomePageContent_btnContinue&#39;)">
			

        <script type="text/javascript" language="javascript">
            function validationIdp(source, args) {
                var Ip = document.getElementById("ctl00_HomePageContent_txtEmployerCode").value;
                if (Ip != null && Ip != "") {
                    if (parseInt(Ip.length) < 17 || parseInt(Ip.length) > 17) {
                        args.IsValid = false;
                    }
                    else {
                        args.IsValid = true;
                    }
                }
                else {
                    document.getElementById("ctl00_HomePageContent_txtEmployerCode").focus();

                }
            }
            
            function CheckTabVal(e) {
                return (e.keyCode == 9);
            }
            function ClosePopup(e){
            document.getElementById('ctl00_HomePageContent_ctrlTxtAppointmentDate').value='';
            $find("behUserDetail").hide();
            }
             function check_Date(sender, args) {
             
           
            if (sender._selectedDate > new Date()) {
                sender._textbox.set_Value("");
                alert("Future date is not allowed");
                sender._selectedDate = new Date();
            }
            else {
            
            var currentdate1=document.getElementById('ctl00_HomePageContent_hdncurrentdate').value;
            var parts =currentdate1.split('/');
        //var mydate = new Date(parts[2], parts[1] - 1, parts[0]);
            
            var currentdate= new Date(""+ parts[1]+"/"+ parts[0] +"/"+ parts[2] +"");//parts[1]'/'parts[0],'/' , parts[2]);
            var year=currentdate.getFullYear();
	    var month=parts[1];
	    var day=parts[0];
            var nextyear=year+1;
	        if(month=='11' || month=='12')
	        {
	         nextyear=year+1;
            }
	        else if (month >= 01 && month <= 5 && day<= 12){
		        nextyear=year;
		        year=year-1;
            }	
            else{
	     nextyear=year;
	   }	
            var contrnov=new Date("11/12/"+year+"");
            var contrmay=new Date("05/13/" + nextyear + "");
            var maycontr=new Date("05/12/" + year + "");
            var novcontr=new Date("11/12/" + year + "");
            var regdate = new Date();
                    regdate.setDate(regdate.getDate() - 10);
            if (currentdate > contrnov && currentdate < contrmay)
            {
                if(sender._selectedDate>new Date("03/31/" + year + ""))
                {
                                    if (sender._selectedDate < regdate) {
                                     $find("behUserDetail").show();
//if (confirm('You have not complied with the provisions of Regulation 10B read with Regulation 11 & 12 of the Employees  State Insurance (General) Regulation, 1950, regarding registration of employee within 10 days of the Date of Appointment. Therefore, the Date of Appointment of this employee will be subject to confirmation by the concerned RO/SRO after due verification of relevant records. Until then, the date of registration shall be deemed as the date of appointment. Please submit the relevant records/documents to the designated RO/SRO within 15 days in the prescribed format. Please also take note that in case of failure to do the needful, the date of registration will be treated as the date of appointment, for all purposes.')) {
//   return;
//} else {
//    

//   

//                        sender._textbox.set_Value('')
//                       // alert("Restricted! The date of registration of an Employee must be within 10 days of the date of Appointment.");
//}
                    }  
                }
                else{
                sender._textbox.set_Value("");
                alert("You cannot select a date prior to 1st day of the previous contribution period.");
                }
            }
            else if (currentdate > maycontr && currentdate < novcontr)
            {
                var curryear = year - 1;
                if(sender._selectedDate>new Date("09/30/" + curryear + ""))
                {
                    if (sender._selectedDate < regdate) {
                     $find("behUserDetail").show();
//if (confirm('You have not complied with the provisions of Regulation 10B read with Regulation 11 & 12 of the Employees  State Insurance (General) Regulation, 1950, regarding registration of employee within 10 days of the Date of Appointment. Therefore, the Date of Appointment of this employee will be subject to confirmation by the concerned RO/SRO after due verification of relevant records. Until then, the date of registration shall be deemed as the date of appointment. Please submit the relevant records/documents to the designated RO/SRO within 15 days in the prescribed format. Please also take note that in case of failure to do the needful, the date of registration will be treated as the date of appointment, for all purposes.')) {
//   return;
//} else {
//    

//   

//                        sender._textbox.set_Value('')
//                       // alert("Restricted! The date of registration of an Employee must be within 10 days of the date of Appointment.");
//}
                    }  
                
                }
                else{
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
            
            
            //MRID 2423
            // added by Ramakrishna
            function check_Date3(sender, args) {
                var today = new Date();
                if (sender._selectedDate > today) {
                    sender._textbox.set_Value('')
                    alert("You cannot select a future date");
                }
                else {
                     var currentdate1=document.getElementById('ctl00_HomePageContent_hdncurrentdate').value;
            var parts =currentdate1.split('/');
        //var mydate = new Date(parts[2], parts[1] - 1, parts[0]);
            
            var currentdate= new Date(""+ parts[0]+"/"+ parts[1] +"/"+ parts[2] +"");//parts[1]'/'parts[0],'/' , parts[2]);
            var year=currentdate.getFullYear();
            var nextyear=year+1;
            var contrnov=new Date("12/11/"+year+"");
            var contrmay=new Date("13/05/" + nextyear + "");
            var maycontr=new Date("12/05/" + year + "");
            var novcontr=new Date("12/11/" + year + "");
            var regdate = new Date();
                    regdate.setDate(regdate.getDate() - 10);
            if (currentdate > contrnov && currentdate < contrmay)
            {
                if(sender._selectedDate>new Date("31/03/" + year + ""))
                {
                                    if (sender._selectedDate < regdate) {
if (confirm('You have not complied with the provisions of Regulation 10B read with Regulation 11 & 12 of the Employees  State Insurance (General) Regulation, 1950, regarding registration of employee within 10 days of the Date of Appointment. Therefore, the Date of Appointment of this employee will be subject to confirmation by the concerned RO/SRO after due verification of relevant records. Until then, the date of registration shall be deemed as the date of appointment. Please submit the relevant records/documents to the designated RO/SRO within 15 days in the prescribed format. Please also take note that in case of failure to do the needful, the date of registration will be treated as the date of appointment, for all purposes.')) {
   return;
} else {
    

   

                        sender._textbox.set_Value('')
                       // alert("Restricted! The date of registration of an Employee must be within 10 days of the date of Appointment.");
}
                    }  
                }
                else{
                sender._textbox.set_Value("");
                alert("You cannot select a date prior to 1st day of the previous contribution period.");
                }
            }
            else if (currentdate > maycontr && currentdate < novcontr)
            {
                var curryear = year - 1;
                if(sender._selectedDate>new Date("30/09/" + curryear + ""))
                {
                    if (sender._selectedDate < regdate) {
if (confirm('You have not complied with the provisions of Regulation 10B read with Regulation 11 & 12 of the Employees  State Insurance (General) Regulation, 1950, regarding registration of employee within 10 days of the Date of Appointment. Therefore, the Date of Appointment of this employee will be subject to confirmation by the concerned RO/SRO after due verification of relevant records. Until then, the date of registration shall be deemed as the date of appointment. Please submit the relevant records/documents to the designated RO/SRO within 15 days in the prescribed format. Please also take note that in case of failure to do the needful, the date of registration will be treated as the date of appointment, for all purposes.')) {
   return;
} else {
    

   

                        sender._textbox.set_Value('')
                       // alert("Restricted! The date of registration of an Employee must be within 10 days of the date of Appointment.");
}
                    }  
                
                }
                else{
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
            //MRID 2423 End

            function checkIP(e) {
                var ip = document.getElementById("ctl00_HomePageContent_ctrlTxtIPNumber").value;
                if (ip.length < 10) {
                    alert("Please enter a valid 10 digit IP number");
                }
            }

            function SubmitConfirm() {
                //var radios = document.getElementById("ctl00_HomePageContent_rbtnlistIsregistered");
                if (document.getElementById("ctl00_HomePageContent_rbtnlistIsregistered_1").checked == true) {
                    var r = confirm("Be sure that the Employee being registered does not have any INSURANCE NUMBER generated earlier.");
                    if (r) { } else {
                        return false;
                    }
                }
            }

            function SubmitContinue() {
                if (document.getElementById("ctl00_HomePageContent_rbtnlistIsregistered_1").checked == true) {
                    var r = confirm("Please use earlier generated INSURANCE NUMBER, if any, in respect of the EMPLOYEE.");
                    if (r) { } else {
                        return false;
                    }
                }
            }
            debugger
             function startTimer()
            {
    
                 var timer = $find("Timer1");
                 Sys.Debug.trace(timer.get_interval());
                 timer.set_interval(100);
                Sys.Debug.trace(timer.get_interval());
                var timer = $find("Timer1");
                timer._startTimer();
            }
             //Except only numbers for textbox
        function onlyNumbers(event) {
            var charCode = (event.which) ? event.which : event.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;

            return true;
        }
        </script>

        <table width="100%" border="0" cellpadding="2" cellspacing="0">
            <tr id="ctl00_HomePageContent_trsubunit" class="lastData_Section">
				<td valign="top" align="left" class="contentTabletd">
                    <div id="ctl00_HomePageContent_UpdatePanel1">
					
                            <table width="100%" border="0" cellpadding="2" cellspacing="0" class="formlevel">
                                <tr>
                                    <td class="pageHeader" colspan="4">
                                        <table width="100%">
                                            <tr>
                                                <td class="pageHeaderText">
                                                    Track Registered Employees
                                                </td>
                                                <td valign="bottom" class="mandatoryField">
                                                    &nbsp;
                                                </td>
                                                <td>
                                                    <span id="ctl00_HomePageContent_lblErrorMsg"></span>
                                                    <span id="ctl00_HomePageContent_lblmodal"></span>
                                                    <span id="ctl00_HomePageContent_Label2"></span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr align="center">
                                    <td>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td class="lastFormValue" colspan="4">
                                        &nbsp;
                                        
                                        <span class="errordisplay" id="diverror" style="display: none">Employee's Insurance
                                        No. Field Cannot be Empty.</div>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellpadding="2" cellspacing="0" class="formlevel border">
                                <tr>
                                    <td class="leftTopFormLabelgrid" colspan="4">
                                        <div>

					</div>
                                    </td>
                                </tr>
                                <div id="ctl00_HomePageContent_pnlEmprCode">
						
                                    <tr class="lastData_Section" id="trGetEmprNo">
                                        <td colspan="2" class="leftTopFormLabel">
                                            Employer/Subunit Code No:<span class="mandatoryField">*</span>
                                        </td>
                                        <td colspan="2" class="lastFormValue">
                                            <input name="ctl00$HomePageContent$txtEmployerCode" type="text" value="39000547790001019" maxlength="17" id="ctl00_HomePageContent_txtEmployerCode" disabled="disabled" class="aspNetDisabled txtbox numericAlignRight" onkeyup="checkNumerOnly(this)" />
                                            <span id="ctl00_HomePageContent_rfvEmployerCode" style="display:none;">Please Enter Employer/Subunit Code No</span>
                                            
                                        </td>
                                    </tr>
                                
					</div>
                                <tr class="lastData_Section" id="RowForNew">
                                    <td class="leftTopFormLabel" colspan="2" width="40%">
                                        Was the Employee ever allotted a ESI Number?**:
                                    </td>
                                    <td class="lastFormValue" colspan="2" width="60%">
                                        <span id="ctl00_HomePageContent_ctrlLblCount" class="pageHeaderText" style="color:Red;"></span>
                                        <table id="ctl00_HomePageContent_rbtnlistIsregistered" onchange="javascript:return SubmitConfirm();">
						<tr>
							<td><input id="ctl00_HomePageContent_rbtnlistIsregistered_0" type="radio" name="ctl00$HomePageContent$rbtnlistIsregistered" value="0" checked="checked" /><label for="ctl00_HomePageContent_rbtnlistIsregistered_0">Yes</label></td><td><input id="ctl00_HomePageContent_rbtnlistIsregistered_1" type="radio" name="ctl00$HomePageContent$rbtnlistIsregistered" value="1" onclick="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$rbtnlistIsregistered$1\&#39;,\&#39;\&#39;)&#39;, 0)" /><label for="ctl00_HomePageContent_rbtnlistIsregistered_1">No</label></td>
						</tr>
					</table>
                                    </td>
                                </tr>
                            </table>
                            
                            
                            
                            
                            <div id="ctl00_HomePageContent_pnlEnterDetails">
						
                                <table width="100%" border="0" cellpadding="2" cellspacing="0" class="internalTable3">
                                    <tr>
                                        <td colspan="4" class="sectionHeader">
                                            Enter Details
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="leftTopFormLabel" width="40%">
                                            Employee's Insurance No:<span class="mandatoryField">*</span>
                                        </td>
                                        <td colspan="2" class="lastFormValue" width="60%">
                                            <input name="ctl00$HomePageContent$ctrlTxtIPNumber" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTxtIPNumber" class="txtbox numericAlignRight" onkeyup="checkNumerOnly(this)" onchange="checkIP(this)" />
                                            <span id="ctl00_HomePageContent_RequiredFieldValidator1" class="errordisplay" style="display:none;">Please Enter I.P.No</span>
                                            <span id="ctl00_HomePageContent_RegularExpressionValidator2" class="errordisplay" style="display:none;">Please Enter Only Digits</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="leftTopFormLabel" width="40%">
                                            Date of Appointment:<span class="mandatoryField">*</span>
                                        </td>
                                        <td colspan="2" class="lastFormValue" width="60%">
                                            <input name="ctl00$HomePageContent$ctrlTxtAppointmentDate" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTxtAppointmentDate" class="txtbox_mid numericAlignRight" AutoComplete="Off" onKeyPress="return false;" />
                                            
                                            <span id="ctl00_HomePageContent_RequiredFieldValidator2" class="errordisplay" style="display:none;">Please Enter Appointment Date</span>
                                            <span id="ctl00_HomePageContent_rev_ctrlTxtAppointmentDate" style="visibility:hidden;">Please check date format(dd/mm/yyyy)</span>
                                            <span id="ctl00_HomePageContent_lblerrTrckDOA" style="color:Red;"></span>
                                            <input type="hidden" name="ctl00$HomePageContent$hfErrTrckDOA" id="ctl00_HomePageContent_hfErrTrckDOA" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="lastFormValue" colspan="4">
<span id="ctl00_HomePageContent_lblfooterIPMessage" style="color:Red;font-weight:bold;">** One IP, One Insurance Number, One Nation. An employee shall have only One ESI Insurance Number in his/her lifetime irrespective of number of change of employment or Employer.</span> <br /><br />
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td cla ss="lastFormValue" colspan="4">
                                            <span id="ctl00_HomePageContent_lblfooterMessage" style="color:Red;font-weight:bold;">As per the provisions of Regulation 10B read with Regulation 11 & 12 of the Employees` State Insurance (General) Regulation, 1950, Registration of an employee is required to be done within 10 days from  the Date of Appointment. Where, the Date of Registration of an employee is more than 10 days from the date of Appointment, the matter may be forwarded to the concerned RO/SRO for examination/verification. Until then, the date of registration shall be treated  as the date of appointment.</span>
                                        </td>
                                    </tr>
                                </table>
                            
					</div>
                            <div class="pagesubmission" style="text-align: center">
                                <div class="primary">
                                    <input type="submit" name="ctl00$HomePageContent$btnContinue" value="Continue" onclick="javascript:return SubmitContinue();WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$btnContinue&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_btnContinue" class="btn" onkeydown="if (event.keyCode == 13) document.getElementById(&#39;ctl00_HomePageContent_btnContinue&#39;).click()" />
                                    <input type="submit" name="ctl00$HomePageContent$button" value="Close" onclick="window.close();" id="ctl00_HomePageContent_button" title="Go back to Main Menu" class="btn" onkeydown="if (event.keyCode == 13) document.getElementById(&#39;ctl00_HomePageContent_button&#39;).click()" />
                                </div>
                            </div>
                            <table width="100%" border="0" cellpadding="2" cellspacing="0" id="Table5" class="internalTable3">
                                <tr class="lastData_Section" id="Tr11">
                                    <td colspan="4" class="leftTopFormLabel">
                                        <span id="ctl00_HomePageContent_ctrlLblCount1" class="pageHeaderText" style="color:Blue;"></span>
                                        </br>
                                        
                                        <span id="ctl00_HomePageContent_ctrlLblCount2" class="pageHeaderText" style="color:Red;"></span>
                                    </td>
                                </tr>
                            </table>
                            
                            
                            
                            
                            
                            
                            
                            <div id="ctl00_HomePageContent_panMessage" style="width:70%;">
						
                                <table class="internalTable" border="0" cellpadding="2" cellspacing="0">
                                    <tr>
                                        <td class="leftTopFormLabelgrid">
                                            You have not complied with the provisions of Regulation 10B read with Regulation 11 & 12 of the Employees' State Insurance (General) Regulation. 1950, regarding registration
of employee within 10 days ot the Date of Appointment. Therefore, the Date of Appointment of this employee will be subject to confirmation by the concerned RO/SRO after
due verification of relevant records. Until then, the date of registration shall be deemed as the date of appointment. Please Submit the relevant records/documents to the
designated RO/SRO within 15 days in the prescribed format. Please also take note that in case of failure to do the needful, the date of registration will be treated as the date
of appointment, for all purposes.<br />
                                            <br />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td class="pageFooter1">
                                            <input type="submit" name="ctl00$HomePageContent$btnAgree" value="I Agree" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$btnAgree&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_btnAgree" title="Close" class="btn" />
                                            <input type="submit" name="ctl00$HomePageContent$Button1" value="Cancel" onclick="ClosePopup();WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$Button1&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_Button1" title="Close" class="btn" />
                                        </td>
                                    </tr>
                                </table>
                            
					</div>
                            <div id="ctl00_HomePageContent_Panel3" style="width:70%;">
						
                                <table class="internalTable" border="0" cellpadding="2" cellspacing="0">
                                    <tr>
                                        <td class="leftTopFormLabelgrid">
                                            <span id="ctl00_HomePageContent_lblpopup"></span>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td class="pageFooter1">
                                            <input type="submit" name="ctl00$HomePageContent$btncancel" value="Back" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$btncancel&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_btncancel" title="Close" class="btn" />
                                            <input type="submit" name="ctl00$HomePageContent$btnmobile" value="Proceed" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$btnmobile&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_btnmobile" title="Close" class="btn" />
                                        </td>
                                    </tr>
                                </table>
                            
					</div>
                        
				</div>
                    <div id="ctl00_HomePageContent_UpdateProgress1" style="display:none;">
					
                            <iframe frameborder="0" src="about:blank" style="border: 0px; position: absolute;
                                z-index: 9; left: 0px; top: 0px; width: expression(this.offsetParent.scrollWidth);
                                height: expression(this.offsetParent.scrollHeight); filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100, FinishOpacity=0, Style=0, StartX=0, FinishX=100, StartY=0, FinishY=100);">
                            </iframe>
                            <div style="position: absolute; z-index: 10; left: expression((this.offsetParent.clientWidth/2)-(this.clientWidth/2)+this.offsetParent.scrollLeft);
                                top: expression((this.offsetParent.clientHeight/2)-(this.clientHeight/2)+this.offsetParent.scrollTop);">
                                Please Wait...<br />
                                <img src="../App_Themes/Images/PleaseWait.gif" />
                            </div>
                        
				</div>
                </td>
			</tr>
			
            
        </table>
    
		</div>
    <input type="hidden" name="ctl00$HomePageContent$hdncurrentdate" id="ctl00_HomePageContent_hdncurrentdate" value="20/10/2026" />

		   </div>
                </td>
	</tr>
</table>
        <div id="clearfooter" >
        </div>
    </div>
    <div id="footersection" Style="z-index:0;" >
        <table id="ctl00_Table1" cellspacing="0" cellpadding="0" align="Center" style="border-width:0px;height:60px;width:100%;border-collapse:collapse;">
	<tr class="dBlockFooter" style="background-color:White;">
		<td class="dBlockFooter" colspan="5">
                    DISCLAIMER: &copy; Copyright 2021, ESIC, India. All Rights Reserved. Best viewed
                    in 1024 x 768 pixels, Site maintained by : ESIC. Designed and Developed by CMS Computers LTD.<span id="ctl00_lblIP" style="color:White;">IP Address : 60.</span><span id="ctl00_Label1" style="color:#742902;">ASP Session ID : 0qcnasn5aunlectc1ai2cwgg</span><span id="ctl00_Label2">Your IP Address is : 10.10.17.242</span></td>
	</tr>
</table>
    </div>
    <input type="hidden" name="ctl00$hdnhmedate" id="ctl00_hdnhmedate" value="2026 10 20" />
    <input type="hidden" name="ctl00$hdnLogout" id="ctl00_hdnLogout" value="0" />
    
<script type="text/javascript">
//<![CDATA[
var Page_Validators =  new Array(document.getElementById("ctl00_HomePageContent_rfvEmployerCode"), document.getElementById("ctl00_HomePageContent_RequiredFieldValidator1"), document.getElementById("ctl00_HomePageContent_RegularExpressionValidator2"), document.getElementById("ctl00_HomePageContent_RequiredFieldValidator2"), document.getElementById("ctl00_HomePageContent_rev_ctrlTxtAppointmentDate"));
//]]>
</script>

<script type="text/javascript">
//<![CDATA[
var ctl00_HomePageContent_rfvEmployerCode = document.all ? document.all["ctl00_HomePageContent_rfvEmployerCode"] : document.getElementById("ctl00_HomePageContent_rfvEmployerCode");
ctl00_HomePageContent_rfvEmployerCode.controltovalidate = "ctl00_HomePageContent_txtEmployerCode";
ctl00_HomePageContent_rfvEmployerCode.focusOnError = "t";
ctl00_HomePageContent_rfvEmployerCode.errormessage = "Please Enter Employer/Subunit Code No";
ctl00_HomePageContent_rfvEmployerCode.display = "Dynamic";
ctl00_HomePageContent_rfvEmployerCode.validationGroup = "Trackemployees";
ctl00_HomePageContent_rfvEmployerCode.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_rfvEmployerCode.initialvalue = "";
var ctl00_HomePageContent_RequiredFieldValidator1 = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidator1"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidator1");
ctl00_HomePageContent_RequiredFieldValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTxtIPNumber";
ctl00_HomePageContent_RequiredFieldValidator1.focusOnError = "t";
ctl00_HomePageContent_RequiredFieldValidator1.errormessage = "Please Enter I.P.No";
ctl00_HomePageContent_RequiredFieldValidator1.display = "Dynamic";
ctl00_HomePageContent_RequiredFieldValidator1.validationGroup = "Trackemployees";
ctl00_HomePageContent_RequiredFieldValidator1.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidator1.initialvalue = "";
var ctl00_HomePageContent_RegularExpressionValidator2 = document.all ? document.all["ctl00_HomePageContent_RegularExpressionValidator2"] : document.getElementById("ctl00_HomePageContent_RegularExpressionValidator2");
ctl00_HomePageContent_RegularExpressionValidator2.controltovalidate = "ctl00_HomePageContent_ctrlTxtIPNumber";
ctl00_HomePageContent_RegularExpressionValidator2.errormessage = "Please Enter Only Digits";
ctl00_HomePageContent_RegularExpressionValidator2.display = "Dynamic";
ctl00_HomePageContent_RegularExpressionValidator2.enabled = "False";
ctl00_HomePageContent_RegularExpressionValidator2.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_RegularExpressionValidator2.validationexpression = "^[0-9]{1,45}$";
var ctl00_HomePageContent_RequiredFieldValidator2 = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidator2"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidator2");
ctl00_HomePageContent_RequiredFieldValidator2.controltovalidate = "ctl00_HomePageContent_ctrlTxtAppointmentDate";
ctl00_HomePageContent_RequiredFieldValidator2.focusOnError = "t";
ctl00_HomePageContent_RequiredFieldValidator2.errormessage = "Please Enter Appointment Date";
ctl00_HomePageContent_RequiredFieldValidator2.display = "Dynamic";
ctl00_HomePageContent_RequiredFieldValidator2.validationGroup = "Trackemployees";
ctl00_HomePageContent_RequiredFieldValidator2.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidator2.initialvalue = "";
var ctl00_HomePageContent_rev_ctrlTxtAppointmentDate = document.all ? document.all["ctl00_HomePageContent_rev_ctrlTxtAppointmentDate"] : document.getElementById("ctl00_HomePageContent_rev_ctrlTxtAppointmentDate");
ctl00_HomePageContent_rev_ctrlTxtAppointmentDate.controltovalidate = "ctl00_HomePageContent_ctrlTxtAppointmentDate";
ctl00_HomePageContent_rev_ctrlTxtAppointmentDate.focusOnError = "t";
ctl00_HomePageContent_rev_ctrlTxtAppointmentDate.errormessage = "Please check date format(dd/mm/yyyy)";
ctl00_HomePageContent_rev_ctrlTxtAppointmentDate.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_rev_ctrlTxtAppointmentDate.validationexpression = "^(((0[1-9]|[12]\\d|3[01])\\/(0[13578]|1[02])\\/((19|[2-9]\\d)\\d{2}))|((0[1-9]|[12]\\d|30)\\/(0[13456789]|1[012])\\/((19|[2-9]\\d)\\d{2}))|((0[1-9]|1\\d|2[0-8])\\/02\\/((19|[2-9]\\d)\\d{2}))|(29\\/02\\/((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$";
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
        WebForm_AutoFocus('ctl00_HomePageContent_txtEmployerCode');
document.getElementById('ctl00_HomePageContent_rfvEmployerCode').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_rfvEmployerCode'));
}

document.getElementById('ctl00_HomePageContent_RequiredFieldValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidator1'));
}

document.getElementById('ctl00_HomePageContent_RegularExpressionValidator2').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RegularExpressionValidator2'));
}
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.CalendarBehavior, {"format":"dd/MM/yyyy","id":"ctl00_HomePageContent_cEDOA"}, {"dateSelectionChanged":check_Date}, null, $get("ctl00_HomePageContent_ctrlTxtAppointmentDate"));
});

document.getElementById('ctl00_HomePageContent_RequiredFieldValidator2').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidator2'));
}

document.getElementById('ctl00_HomePageContent_rev_ctrlTxtAppointmentDate').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_rev_ctrlTxtAppointmentDate'));
}
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.ModalPopupBehavior, {"BackgroundCssClass":"modalBackground","PopupControlID":"ctl00_HomePageContent_panMessage","dynamicServicePath":"/InsuranceGlobalWebV4/Employee/RegisteredEmployees.aspx","id":"behUserDetail"}, null, null, $get("ctl00_HomePageContent_lblmodal"));
});
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.ModalPopupBehavior, {"BackgroundCssClass":"modalBackground","PopupControlID":"ctl00_HomePageContent_Panel3","dynamicServicePath":"/InsuranceGlobalWebV4/Employee/RegisteredEmployees.aspx","id":"behUserDetail1"}, null, null, $get("ctl00_HomePageContent_Label2"));
});
Sys.Application.add_init(function() {
    $create(Sys.UI._UpdateProgress, {"associatedUpdatePanelId":"ctl00_HomePageContent_UpdatePanel1","displayAfter":500,"dynamicLayout":true}, null, null, $get("ctl00_HomePageContent_UpdateProgress1"));
});
//]]>
</script>
</form>

<script>

 
	// var contextPath = "http://www.esic.in/InsuranceGlobalWebV20/Digsig/docwebsigner4.6.jar";
               var contextPath = "../DigitalSigComponents/docwebsigner4.6.jar";
 
    if (deployJava.versionCheck("1.6+") == false) {
        var java_message = 'Websigner requires JRE1.5 or higher. Please download it from <a href="http://10.80.100.146:8088/websigner4.0/jre6u21.exe">Click here</a> to download jre. <br>Once Installation is done. Close the browser and relogin.';
        if (document.all) {
            javaRequiredDiv.innerHTML = java_message;
        } else if (document.getElementById) {
            rng = document.createRange();
            el = document.getElementById("javaRequiredDiv");
            rng.setStartBefore(el);
            htmlFrag = rng.createContextualFragment(java_message);
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
            el.appendChild(htmlFrag);
        }
    } else {
        var attributes = {
            code: 'emas.WebsignerApplet.class',
            archive: contextPath,
            width: 1,
            height: 1,
            name: 'websignerapplet'
        };
        var parameters = {
            MAYSCRIPT: 'true',
            scriptable: 'true',
            enableExpiryCheck: 'true',
            regexFilterIssuerName: "e-Mudhra Sub CA for Class 3 Platinum Organisation 2011|e-Mudhra Sub CA for Class 2 Gold Individual 2011"
        };
        var version = '1.5';
        deployJava.runApplet(attributes, parameters, version);
    }

</script>
</body>

<script type="text/javascript">
    currentServerDate = '20-10-2026'
    dateSeperator = '-'


    var isClose = 1;
    window.onbeforeunload = function(e) {
        if ($('#ctl00_hdnLogout').val() == '1') {
            window.open("../Errors/SessionExpired.aspx", "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=yes, width=200, height=200");
            window.close();        
        }

    }
    $("#ctl00_imgbtnLogout").click(function(event) {
        $('#ctl00_hdnLogout').val('1');
    });

    function checkForRefresh(event) {
        if (event.which == 116)
            isClose = 0;
    }
    function mouseDown(e) {
        var ctrlPressed = 0;
        var altPressed = 0;
        var shiftPressed = 0;
        if (parseInt(navigator.appVersion) > 3) {
            var evt = e ? e : window.event;
            if (document.layers && navigator.appName == "Netscape" && parseInt(navigator.appVersion) == 4) {
                var mString = (e.modifiers + 32).toString(2).substring(3, 6);
                shiftPressed = (mString.charAt(0) == "1");
                ctrlPressed = (mString.charAt(1) == "1");
                altPressed = (mString.charAt(2) == "1");
                self.status = "modifiers=" + e.modifiers + " (" + mString + ")"
            }
            else {
                shiftPressed = evt.shiftKey;
                altPressed = evt.altKey;
                ctrlPressed = evt.ctrlKey;
                self.status = "" + "shiftKey=" + shiftPressed + ", altKey=" + altPressed + ", ctrlKey=" + ctrlPressed
            }
            if (shiftPressed || altPressed || ctrlPressed)
                alert("Navigation Cancelled !\n" + (shiftPressed ? "" : "") + (altPressed ? "" : "") + (ctrlPressed ? "" : ""));
        }
        return true;
    }

    document.onmousedown = mouseDown;

    function actionsOnLoad() {
        rightclickControl();
        disableBackButton();
    }
</script>

</html>
