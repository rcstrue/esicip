

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="ctl00_Head1"><title>
	NomineeDetails
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

    
    <base target="_self" />
</head>
<body onkeydown="checkForRefresh(event)" onload="actionsOnLoad();" oncontextmenu="return false">
    <div id="minHeight" >
    </div>
    <form method="post" action="./NomineeDetails.aspx?No=&amp;F=&amp;B=&amp;G=UKzg%2founps0MYEuhR3DRN82Bj2yTYxpN" onsubmit="javascript:return WebForm_OnSubmit();" onkeypress="javascript:return WebForm_FireDefaultButton(event, 'ctl00_Test')" id="aspnetForm">
<div class="aspNetHidden">
<input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
<input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
<input type="hidden" name="__LASTFOCUS" id="__LASTFOCUS" value="" />
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="1+IT/JBTE2rUR7Q5og5/2H6wbFuIyN+cmXyGeGC+uX1zq/cJF1cR6Yrc2/aS9PavDM63gCF4D3o1E2D/ytdJ4LVwfW0dvh7IPb2pwNnz7paG4FmOYt7jQXjmCv6CEDFEMo+BQDX6ERipRibVRBdfDhk1OAK39VDMOrcjWwmRrT7OY1SriwBwwhVDo6B8NcjEGxeAE5QYei91eZI4Mu6FL3inpycN/lkxIiNtkigVGc0XqoHl+XhAuJ1ll+xaJjU9TKGB7pLRBDb8paxIR+hIbkXt/fHD2BoNzPqJ19dLpQT7fPIUaHn+qRlGxH90VJkz9MkYfVH6zxLM62GMVimBpFAPQxI50/vwuWbGQiN4kDuD6RLOK5Wf+zveqLBtqvRKqTmEFwx6h9ns/4GNj72dpRyqhmdeu7k0Hg4lX9ZxDduNRnXGTYfA68FFVetgNpuWK6cUdAa1apb7/q0qm+cUKof4a7PL5/28vObPV5rRo5VObSAjXSgkturkowkX974U+8MyRz19tTyEVVAZrjlTpER9/QUmfhc7RibD7KCQ+1QP/ruINkOVX/HrQ08TJ6R9UeMlOKn2S7m8Cb+mQS+J+cdaPmPMsypcW5+v3/Ing5XYJr1Xeuf1Uywd0ERZFB4cLO4ocZFqv8ItkMLChBrrSrHp3uS/2LHoXfGomz+UacsaOi09fyrBHmoI/BKpFxhP+uiLVtFGuwoBpM1ufUm/AmESB5eYbRs8Y0bo7piZfpE7Rh+KnWIROwcPhqkz+xZ3SJLxX82n9PEfLECA8pAViCjRkurvRq0Qf8sHEaEx3GN6CrQjJFd2i3YNIzxcfSxsRUS3IES9aTGDcmwYYYaA1iT+DZ2yTVWq6fkZ9KndH2Q4yF9N8z7uu5x5OlZTNo7qnncH9q2MsGeiOcDDtGRQw5cYeFra+cj1ZZoMmKR9XCHmsayHJHVebdUijEY9/JoSBgVlQKEE/kItkiAu2cj8u9DL6Q9kzX9ELrZcuiPPE9vsI+pkIxOuQcSKNjG11UqS/GfnylKpo2lzftER9BZ4LUaw+mV2uc9TwV4fofWStom8fgFBMaDTZ0E5ia3pNbYCRdQgU5n9KY3/5cpodO1FozJ98LqL/RnaC1G4x2l8H+W2ac/hYuVov95hKV3AL/HxJHOzMzyjxBigIDAs9/MQzart3dJkuHJk/V4pDuTgQtZO4XRm2bIWt6exCx+1DQTpO6LEM3ds1RGYdjJPPnlXsl8121jIpm44o5x5hg5N3ItPyg6eJ9DGrGL1tSmZj36pnt3B5Xj9uiSUAqb3R4V7G8476apa1e0Hoc1lWdSkm+DpUOXa3sJFwftplHuLz3KMUFJp0yULOo93muqfgiVdkwuKyjzmRstwn60g9iXNhURQJ9EXmxDxrcXxE/5dlV7ebluofi/wFURbbTLZtbV91wS9CPUwxViddxaiBKxsCo8rob3N20ASX06IJ6m4pfVpJzBo349HM+POqXWKzYdrzpq4oOV7NFizcbCRHb94BQcJQP9ToTTtVAtC5yhK77ApoAfbxsFq+q8VDrIhR+CF0c9pEzS7kU1xB8oYHwn9zYtpOU0gmGYJTxyDBDiLX7lOcelBse9dp9zcOnu1bSOwiwHZpNuKPxkPDy1gTwdM9dpxx/Ri" />
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
<script src="../App_Themes/JS/jquery1.js" type="text/javascript"></script>
<script src="../App_Themes/JS/esic.js" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=LkSbRRtTbnpvh0g927IxkDnUNt3e2Oxr8tl396fAwV2OgYPb6ZYQiU88xDwKP7Cx3jO4QRVkc_syQlRfjyMKhhbF2TFba6j-2FNXs-j4VlYa-LTRFe9hqsZJbZKQAvJOoazoqQ2&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=8CjII1v0OLoMNKf5zGXmek6ohMvZjCCPcRcIiqYLmOOAPQf3A2BbK37eN908WIzOAUNhl-GFUaat8zUw5H5sU71mnMaV1jynd0Bm52Bzgkc6hv2pifs6DXYTIc3Q6yLOu8VXtdvpiUaWIJIPqd-YMwW_L2I1&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=qiCbui8_q4m0BAPh1b3lI6d86V5wXha8Ft6_fuycOr-BR3F96gn-WQNREw0cPcRgbEGAz_CbMJd48cFrePkO03Gv-b2cZvcNjV8dNeDlEcc6bem5L13V2qr_B_pTNMzEzV38lPOEAt26LsOPTqE9P_hFOfEmbkwTPmrIV60L2THLLMGx0&amp;t=ffffffff87636c38" type="text/javascript"></script>
<script type="text/javascript">
//<![CDATA[
function WebForm_OnSubmit() {
if (typeof(ValidatorOnSubmit) == "function" && ValidatorOnSubmit() == false) return false;
return true;
}
//]]>
</script>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="92F96F35" />
</div>
   <script type="text/javascript">
//<![CDATA[
Sys.WebForms.PageRequestManager._initialize('ctl00$ScriptManager1', 'aspnetForm', [], [], [], 90, 'ctl00');
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
                                    <div id="raw">Tuesday, October 20, 2026 1:05:58 PM</div>
                            </td><td class="homelink" align="right"><input type="image" name="ctl00$imgbtnHome" id="ctl00_imgbtnHome" tabindex="50" src="../App_Themes/Images/home.gif" alt="Home" onclick="aspnetForm.target =&#39;_self&#39;;" />
                                &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                                <input type="submit" name="ctl00$Test" value="Button" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$Test&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_Test" style="display: none;" /><input type="image" name="ctl00$imgbtnLogout" id="ctl00_imgbtnLogout" tabindex="50" src="../App_Themes/Images/logout.gif" alt="Close" onclick="aspnetForm.target =&#39;_self&#39;;" /><input type="submit" name="ctl00$dummybutton" value="" id="ctl00_dummybutton" style="border-width:0px;font-weight:bold;height:0px;width:0px;" /></td>
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
                    

    <script src="stateDist.js" type="text/javascript"></script>

    <script src="../App_Themes/JS/jquery1.js" type="text/javascript">
    </script>

    <script type="text/javascript" src="../App_Themes/JS/jquery.min.js"></script>

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

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
    </script>

    
    <div id="ctl00_HomePageContent_Panel1" onkeypress="javascript:return WebForm_FireDefaultButton(event, &#39;ctl00_HomePageContent_Save&#39;)">
			
        <table width="100%" border="0" cellpadding="1" cellspacing="0" class="internalTable">
            <tr>
                <td class="pageHeader">
                    <table width="100%" id="tblNew2">
                        <tr>
                            <td class="pageHeaderText">
                                Details of Nominee u/s 71 of ESI Act 1948/Rule 56(2) of ESI (Central) Rules,1950
                                for Payment of Cash Benefit in the Event of Death
                            </td>
                            <td valign="bottom" class="mandatoryField">
                                * Required Fields
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr id="RowCreate">
                <td class="sectionHeader">
                    <br />
                    <span id="ctl00_HomePageContent_ErrorsData" style="color:Red;font-weight:bold;"></span>
                    
                </td>
            </tr>
        </table>
        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="formlevel">
            <tr align="left" class="lastData_Section">
                <td class="leftTopFormLabel" width="15%">
                    Name :<span class="mandatoryField">*</span>
                </td>
                <td class="lastFormValue" width="30%">
                    
                    <input name="ctl00$HomePageContent$ctrlTextUserName" type="text" maxlength="45" id="ctl00_HomePageContent_ctrlTextUserName" tabindex="1" class="txtbox" onchange="RestrictSpace(this);" />
                    <span id="ctl00_HomePageContent_RequiredFieldValidator1" class="errordisplay" style="display:none;">Please Enter Name</span>
                    
                </td>
                <td class="leftTopFormLabel" nowrap="nowrap" width="15%">
                    Relationship with I.P :<span class="mandatoryField">*</span>
                </td>
                <td class="lastFormValue" width="35%" nowrap="nowrap">
                    <select name="ctl00$HomePageContent$RelationShipWithIp" id="ctl00_HomePageContent_RelationShipWithIp" tabindex="2" class="txtbox">
				<option selected="selected" value="-1">---Please Select---</option>
				<option value="1">Spouse</option>
				<option value="2">Minor dependant son</option>
				<option value="3">Dependant unmarried daughter</option>
				<option value="4">Dependant son receiving education</option>
				<option value="5">Dependant infirm son</option>
				<option value="6">Dependant infirm unmarried daughter</option>
				<option value="7">Dependant father</option>
				<option value="8">Dependant mother</option>
				<option value="39">Brother</option>
				<option value="40">Sister</option>
				<option value="41">DEPENDANT SON- RECEIVING EDUCATION</option>
				<option value="99">Others</option>

			</select>
                    <span id="ctl00_HomePageContent_RequiredFieldValidator5" class="errordisplay" style="visibility:hidden;">Please Select</span>
                </td>
            </tr>
            <tr>
                <td class="sectionHeader" colspan="4">
                    Address of Nominee
                </td>
            </tr>
            <tr align="left">
                <td class="leftTopFormLabel">
                    Address :<span class="mandatoryField">*</span>
                </td>
                <td class="lastFormValue" nowrap="nowrap">
                    
                    <input name="ctl00$HomePageContent$ctrlTextAddress1" type="text" maxlength="100" id="ctl00_HomePageContent_ctrlTextAddress1" tabindex="3" class="txtbox" onchange="RestrictSpace(this);" />
                    <span id="ctl00_HomePageContent_RequiredFieldValidator3" class="errordisplay" style="display:none;">Please Enter Address</span>
                    <span id="ctl00_HomePageContent_Address1RegularExpressionVal" class="errordisplay" style="display:none;">Enter upto 100 characters</span>
                </td>
                <td class="leftTopFormLabel">
                    State :<span class="mandatoryField">*</span>
                </td>
                <td class="lastFormValue" style="float: left;" nowrap="nowrap">
                    <select name="ctl00$HomePageContent$States" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$States\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_HomePageContent_States" class="txtbox_big">
				<option selected="selected" value="-1">--Please Select--</option>
				<option value="102">Andaman And Nicobar</option>
				<option value="23">Andhra Pradesh</option>
				<option value="24">Arunachal Pradesh</option>
				<option value="25">Assam</option>
				<option value="26">Bihar</option>
				<option value="32">Chandigarh</option>
				<option value="27">Chhattisgarh</option>
				<option value="101">Dadra and Nagar Haveli</option>
				<option value="100">Daman and Diu</option>
				<option value="20">Delhi</option>
				<option value="99">Dummy State</option>
				<option value="28">Goa</option>
				<option value="29">Gujarat</option>
				<option value="30">Haryana</option>
				<option value="1">Himachal Pradesh</option>
				<option value="98">IP State</option>
				<option value="2">Jammu and Kashmir</option>
				<option value="3">Jharkhand</option>
				<option value="21">Karnataka</option>
				<option value="4">Kerala</option>
				<option value="103">Lakshadweep</option>
				<option value="5">Madhya Pradesh</option>
				<option value="6">Maharashtra</option>
				<option value="7">Manipur</option>
				<option value="8">Meghalaya</option>
				<option value="9">Mizoram</option>
				<option value="10">Nagaland</option>
				<option value="11">Odisha</option>
				<option value="104">Outside India</option>
				<option value="12">Puducherry</option>
				<option value="13">Punjab</option>
				<option value="14">Rajasthan</option>
				<option value="15">Sikkim</option>
				<option value="16">Tamilnadu</option>
				<option value="105">Telangana</option>
				<option value="17">Tripura</option>
				<option value="18">Uttar Pradesh</option>
				<option value="31">Uttarakhand</option>
				<option value="19">Uttaranchal</option>
				<option value="22">West Bengal</option>

			</select>
                    <span id="ctl00_HomePageContent_RequiredFieldValidatorState" class="errordisplay" style="display:none;">Please Select State</span>
                </td>
            </tr>
            <tr align="left">
                <td class="leftTopFormLabel">
                </td>
                <td class="lastFormValue" nowrap="nowrap">
                    
                    <input name="ctl00$HomePageContent$ctrlTextAddress2" type="text" maxlength="45" id="ctl00_HomePageContent_ctrlTextAddress2" tabindex="4" class="txtbox" onchange="RestrictSpace(this);" />
                    <span id="ctl00_HomePageContent_Address2RegularExpressionVal" class="errordisplay" style="display:none;">Please Enter  Valid Characters</span>
                </td>
                <td class="leftTopFormLabel">
                    District :<span class="mandatoryField">*</span>
                </td>
                <td class="lastFormValue" align="left">
                <select name="ctl00$HomePageContent$Districts" onchange="javascript:setTimeout(&#39;__doPostBack(\&#39;ctl00$HomePageContent$Districts\&#39;,\&#39;\&#39;)&#39;, 0)" id="ctl00_HomePageContent_Districts" class="txtbox_big">
				<option selected="selected" value="-1">---Please Select---</option>

			</select>
                
                    
                    <span id="ctl00_HomePageContent_DistrictsRequiredFieldVal" class="errordisplay" style="display:none;">Please Select District</span>
                </td>
            </tr>
            <tr align="left">
                
                <td class="lastFormValue" align="left">
                    
                </td>
                
                <td class="lastFormValue" align="left">
                    
                </td>
            </tr>
            <tr align="left">
                <td class="leftTopFormLabel">
                </td>
                <td class="lastFormValue" nowrap="nowrap">
                    
                    <input name="ctl00$HomePageContent$ctrlTextAddress3" type="text" maxlength="45" id="ctl00_HomePageContent_ctrlTextAddress3" tabindex="5" class="txtbox" onchange="RestrictSpace(this);" />
                    <span id="ctl00_HomePageContent_Address3RegularExpressionVal" class="errordisplay" style="display:none;">Please Enter  Valid Characters</span>
                </td>
                <td class="leftTopFormLabel">
                    Pincode :
                </td>
                <td class="lastFormValue" align="left">
                    <input name="ctl00$HomePageContent$ctrlTextPin" type="text" maxlength="6" id="ctl00_HomePageContent_ctrlTextPin" tabindex="8" class="txtbox numericAlignRight" onKeyPress="return checkNumeric(event)" />
                    <span id="ctl00_HomePageContent_RegularExpressionValidator3" class="errordisplay" style="display:none;">Please Enter Valid Pin Code</span>
                </td>
            </tr>
            <tr align="left">
                <td class="leftTopFormLabel">
                    Phone No. :
                </td>
                <td class="lastFormValue" align="left">
                    <input name="ctl00$HomePageContent$ctrlTextPhoneExt" type="text" maxlength="5" id="ctl00_HomePageContent_ctrlTextPhoneExt" tabindex="9" class="txtbox_small" onKeyPress="return checkNumeric(event)" />
                    -
                    <input name="ctl00$HomePageContent$ctrlTextPhoneNumber" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTextPhoneNumber" tabindex="10" class="txtbox numericAlignRight" onKeyPress="return checkNumeric(event)" />
                    
                </td>
                <td class="leftTopFormLabel">
                    Mobile No. :
                </td>
                <td class="lastFormValue" align="left">
                    <input name="ctl00$HomePageContent$ctrlTextMobileExt" type="text" value="91" id="ctl00_HomePageContent_ctrlTextMobileExt" disabled="disabled" class="aspNetDisabled" class="txtboxdisabled_small numericAlignRight" />
                    -
                    <input name="ctl00$HomePageContent$ctrlTextMobileNumber" type="text" maxlength="10" id="ctl00_HomePageContent_ctrlTextMobileNumber" tabindex="11" class="txtbox numericAlignRight" onKeyPress="return checkNumeric(event)" />
                    <span id="ctl00_HomePageContent_RegularExpressionValidator6" class="errordisplay" style="display:none;">Please Enter Only Digits</span>
                </td>
            </tr>
            <tr>
                <td class="leftTopFormLabel">
                    Is Nominee a Family Member :
                </td>
                <td class="lastFormValue" align="left" colspan="4">
                    <table id="ctl00_HomePageContent_rbtnlistNomneeAkaFamily">
				<tr>
					<td><input id="ctl00_HomePageContent_rbtnlistNomneeAkaFamily_0" type="radio" name="ctl00$HomePageContent$rbtnlistNomneeAkaFamily" value="0" tabindex="12" /><label for="ctl00_HomePageContent_rbtnlistNomneeAkaFamily_0">Yes</label></td><td><input id="ctl00_HomePageContent_rbtnlistNomneeAkaFamily_1" type="radio" name="ctl00$HomePageContent$rbtnlistNomneeAkaFamily" value="1" checked="checked" tabindex="12" /><label for="ctl00_HomePageContent_rbtnlistNomneeAkaFamily_1">No</label></td>
				</tr>
			</table>
                </td>
                
                
                
            </tr>
            <tr id="Tr2">
                <td colspan="4" class="sectionHeader">
                    
                </td>
            </tr>
            <tr>
                <td class="lastFormValue" colspan="8" align="left" style="color:red;" >
                     <b>* NOTE : NA - Name Availability is as per Local Government Directory.</b>
                </td>
            </tr>             
        </table>
        <div class="pagesubmission" style="text-align: center">
            <div class="primary">
                <input type="submit" name="ctl00$HomePageContent$Save" value="Save" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$Save&quot;, &quot;&quot;, true, &quot;&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_Save" tabindex="16" class="btn" onkeydown="if (event.keyCode == 13) document.getElementById(&#39;ctl00_HomePageContent_Save&#39;).click()" />
                <input type="submit" name="ctl00$HomePageContent$btnClose" value="Close" onclick="window.close();" id="ctl00_HomePageContent_btnClose" tabindex="16" class="btn" onkeydown="if (event.keyCode == 13) document.getElementById(&#39;ctl00_HomePageContent_btnClose&#39;).click()" />
                
            </div>
        </div>
    
		</div>
    <div class="hiddenfields">
        <input type="hidden" name="ctl00$HomePageContent$HideData1" id="ctl00_HomePageContent_HideData1" />
        <input type="hidden" name="ctl00$HomePageContent$hidpresentdenState" id="ctl00_HomePageContent_hidpresentdenState" />
        <input type="hidden" name="ctl00$HomePageContent$hiddenpresentdistrict" id="ctl00_HomePageContent_hiddenpresentdistrict" />
        <input type="hidden" name="ctl00$HomePageContent$hiddenpresentdistrictNo" id="ctl00_HomePageContent_hiddenpresentdistrictNo" />
        <input type="hidden" name="ctl00$HomePageContent$hidpresentdenState1" id="ctl00_HomePageContent_hidpresentdenState1" />
        <input type="hidden" name="ctl00$HomePageContent$hiddenpresentdistrict1" id="ctl00_HomePageContent_hiddenpresentdistrict1" />
        
        <input type="hidden" name="ctl00$HomePageContent$Xmldatahidden" id="ctl00_HomePageContent_Xmldatahidden" />
        <input type="hidden" name="ctl00$HomePageContent$NomineeXmldata" id="ctl00_HomePageContent_NomineeXmldata" />
        <input type="hidden" name="ctl00$HomePageContent$NomineeButtonIDHash" id="ctl00_HomePageContent_NomineeButtonIDHash" />
        <input type="hidden" name="ctl00$HomePageContent$hdnXMLValidData" id="ctl00_HomePageContent_hdnXMLValidData" />
		<input type="hidden" name="ctl00$HomePageContent$hdnParentGender" id="ctl00_HomePageContent_hdnParentGender" value="M" />
    </div>

    <script src="../App_Themes/JS/JavaScript1.js" type="text/javascript"></script>

    <script type="text/javascript">

         window.onload = function () {
      try {
          if (window.opener && !window.opener.closed) {
              var genderCtrl = window.opener.document.querySelector('input[type="radio"][name*="Gender"]:checked') ||
                  window.opener.document.querySelector('input[name$="ctrlRDMale"]:checked') ||
                  window.opener.document.querySelector('input[name$="ctrlRDFemale"]:checked');

              if (genderCtrl) {
                  var currentGender = genderCtrl.value.trim().toUpperCase();
                  var hdnGen = document.getElementById('ctl00_HomePageContent_hdnParentGender');
					  
												 

          if (hdnGen) {
              var oldGen = hdnGen.value.trim().toUpperCase();

              if (oldGen !== currentGender && currentGender !== "") {
                  hdnGen.value = currentGender;
                        __doPostBack('ctl00$HomePageContent$hdnParentGender', '');
					  
													
																												  
																															  
						 
                    }
                }
            }
        }
    }
    catch (e) {
        console.log("Cross-origin or window opener access reference dropped: " + e.message);
    }

    var myObject = window.dialogArguments;

    if (myObject != undefined) {
        if (myObject.districtname != "Edit") {
            if (myObject.state != "-1") {
                if (document.getElementById("ctl00_HomePageContent_hidpresentdenState1").value == "") {
                    document.getElementById("ctl00_HomePageContent_hidpresentdenState1").value = myObject.state;
				 
													  
								
                }
            }

            if (myObject.district != "-1") {
                if (document.getElementById("ctl00_HomePageContent_hiddenpresentdistrict1").value == "") {
                    document.getElementById("ctl00_HomePageContent_hiddenpresentdistrict1").value = myObject.district;
                }
            }
        }

        if (myObject.districtNo != "") {
            document.getElementById("ctl00_HomePageContent_hiddenpresentdistrict").value = myObject.districtNo;
        }

        if (myObject.districtname == "Edit") {
            loadstate();
        }
        else {
            loadstates();
        }
    }
  };
    </script>

    

    <script type="text/javascript">
        $(document).ready(function() {
            fnbindingcontrols();
        });

        function fnbindingcontrols() {
            $("#ctl00_HomePageContent_txtAadhaarID").mask("9999/9999/9999");
            $("#ctl00_HomePageContent_txteiddate").mask("99/99/9999 99:99:99");
            $("#ctl00_HomePageContent_txteidnum").mask("9999/99999/99999");
        }
    </script>

    <script type="text/javascript" language="javascript">
        function assignAadhaarEID(rdlAdhaar) {
            document.getElementById("ctl00_HomePageContent_lblmsg").style.display = "none";
            var list = document.getElementById("ctl00_HomePageContent_rdlAdhaar");
            var rdbtnLstValues = list.getElementsByTagName("input");
            for (var i = 0; i < rdbtnLstValues.length; i++) {
                if (rdbtnLstValues[i].checked) {
                    Checkdvalue = rdbtnLstValues[i].value;
                    break;
                }
            }
            if (Checkdvalue == "2") {
                document.getElementById("ctl00_HomePageContent_txteidnum").style.display = document.getElementById("ctl00_HomePageContent_txteiddate").style.display
                    = "none";
                document.getElementById("ctl00_HomePageContent_txtAadhaarID").style.display = "block";
                document.getElementById("ctl00_HomePageContent_txteidnum").value = document.getElementById("ctl00_HomePageContent_txteiddate").value = '';
            }
            else {
                document.getElementById("ctl00_HomePageContent_txteidnum").style.display = document.getElementById("ctl00_HomePageContent_txteiddate").style.display
                    = "inline-block";
                document.getElementById("ctl00_HomePageContent_txtAadhaarID").style.display = "none";
                document.getElementById("ctl00_HomePageContent_txtAadhaarID").value = '';
            }
        }
    </script>

    

    <script type="text/javascript" language="javascript">
        function GetEmployeeNomineeData() {
            alert("Hello");
            var fileName1 = location.pathname.split("/").slice(-1);
            var dd = document.getElementById('ctl00_HomePageContent_Xmldatahidden').value;
            var xmlChild = GenerateXMLDocument_Javascript(dd);
            PageMethods.EmployeeNomineeData(xmlChild);
        }
    </script>


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
                    in 1024 x 768 pixels, Site maintained by : ESIC. Designed and Developed by CMS Computers LTD.<span id="ctl00_lblIP" style="color:White;">IP Address : 56.</span><span id="ctl00_Label1" style="color:#742902;">ASP Session ID : 0qcnasn5aunlectc1ai2cwgg</span><span id="ctl00_Label2">Your IP Address is : 10.10.17.243</span></td>
	</tr>
</table>
    </div>
    <input type="hidden" name="ctl00$hdnhmedate" id="ctl00_hdnhmedate" value="2026 10 20" />
    <input type="hidden" name="ctl00$hdnLogout" id="ctl00_hdnLogout" value="0" />
    
<script type="text/javascript">
//<![CDATA[
var Page_Validators =  new Array(document.getElementById("ctl00_HomePageContent_RequiredFieldValidator1"), document.getElementById("ctl00_HomePageContent_RequiredFieldValidator5"), document.getElementById("ctl00_HomePageContent_RequiredFieldValidator3"), document.getElementById("ctl00_HomePageContent_Address1RegularExpressionVal"), document.getElementById("ctl00_HomePageContent_RequiredFieldValidatorState"), document.getElementById("ctl00_HomePageContent_Address2RegularExpressionVal"), document.getElementById("ctl00_HomePageContent_DistrictsRequiredFieldVal"), document.getElementById("ctl00_HomePageContent_Address3RegularExpressionVal"), document.getElementById("ctl00_HomePageContent_RegularExpressionValidator3"), document.getElementById("ctl00_HomePageContent_RegularExpressionValidator6"));
//]]>
</script>

<script type="text/javascript">
//<![CDATA[
var ctl00_HomePageContent_RequiredFieldValidator1 = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidator1"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidator1");
ctl00_HomePageContent_RequiredFieldValidator1.controltovalidate = "ctl00_HomePageContent_ctrlTextUserName";
ctl00_HomePageContent_RequiredFieldValidator1.focusOnError = "t";
ctl00_HomePageContent_RequiredFieldValidator1.errormessage = "Please Enter Name";
ctl00_HomePageContent_RequiredFieldValidator1.display = "Dynamic";
ctl00_HomePageContent_RequiredFieldValidator1.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidator1.initialvalue = "";
var ctl00_HomePageContent_RequiredFieldValidator5 = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidator5"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidator5");
ctl00_HomePageContent_RequiredFieldValidator5.controltovalidate = "ctl00_HomePageContent_RelationShipWithIp";
ctl00_HomePageContent_RequiredFieldValidator5.focusOnError = "t";
ctl00_HomePageContent_RequiredFieldValidator5.errormessage = "Please Select";
ctl00_HomePageContent_RequiredFieldValidator5.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidator5.initialvalue = "-1";
var ctl00_HomePageContent_RequiredFieldValidator3 = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidator3"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidator3");
ctl00_HomePageContent_RequiredFieldValidator3.controltovalidate = "ctl00_HomePageContent_ctrlTextAddress1";
ctl00_HomePageContent_RequiredFieldValidator3.focusOnError = "t";
ctl00_HomePageContent_RequiredFieldValidator3.errormessage = "Please Enter Address";
ctl00_HomePageContent_RequiredFieldValidator3.display = "Dynamic";
ctl00_HomePageContent_RequiredFieldValidator3.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidator3.initialvalue = "";
var ctl00_HomePageContent_Address1RegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_Address1RegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_Address1RegularExpressionVal");
ctl00_HomePageContent_Address1RegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextAddress1";
ctl00_HomePageContent_Address1RegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_Address1RegularExpressionVal.errormessage = "Enter upto 100 characters";
ctl00_HomePageContent_Address1RegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_Address1RegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_Address1RegularExpressionVal.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_RequiredFieldValidatorState = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidatorState"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidatorState");
ctl00_HomePageContent_RequiredFieldValidatorState.controltovalidate = "ctl00_HomePageContent_States";
ctl00_HomePageContent_RequiredFieldValidatorState.focusOnError = "t";
ctl00_HomePageContent_RequiredFieldValidatorState.errormessage = "Please Select State";
ctl00_HomePageContent_RequiredFieldValidatorState.display = "Dynamic";
ctl00_HomePageContent_RequiredFieldValidatorState.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidatorState.initialvalue = "-1";
var ctl00_HomePageContent_Address2RegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_Address2RegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_Address2RegularExpressionVal");
ctl00_HomePageContent_Address2RegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextAddress2";
ctl00_HomePageContent_Address2RegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_Address2RegularExpressionVal.errormessage = "Please Enter  Valid Characters";
ctl00_HomePageContent_Address2RegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_Address2RegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_Address2RegularExpressionVal.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_DistrictsRequiredFieldVal = document.all ? document.all["ctl00_HomePageContent_DistrictsRequiredFieldVal"] : document.getElementById("ctl00_HomePageContent_DistrictsRequiredFieldVal");
ctl00_HomePageContent_DistrictsRequiredFieldVal.controltovalidate = "ctl00_HomePageContent_Districts";
ctl00_HomePageContent_DistrictsRequiredFieldVal.focusOnError = "t";
ctl00_HomePageContent_DistrictsRequiredFieldVal.errormessage = "Please Select District";
ctl00_HomePageContent_DistrictsRequiredFieldVal.display = "Dynamic";
ctl00_HomePageContent_DistrictsRequiredFieldVal.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_DistrictsRequiredFieldVal.initialvalue = "-1";
var ctl00_HomePageContent_Address3RegularExpressionVal = document.all ? document.all["ctl00_HomePageContent_Address3RegularExpressionVal"] : document.getElementById("ctl00_HomePageContent_Address3RegularExpressionVal");
ctl00_HomePageContent_Address3RegularExpressionVal.controltovalidate = "ctl00_HomePageContent_ctrlTextAddress3";
ctl00_HomePageContent_Address3RegularExpressionVal.focusOnError = "t";
ctl00_HomePageContent_Address3RegularExpressionVal.errormessage = "Please Enter  Valid Characters";
ctl00_HomePageContent_Address3RegularExpressionVal.display = "Dynamic";
ctl00_HomePageContent_Address3RegularExpressionVal.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_Address3RegularExpressionVal.validationexpression = "^[^~]{1,100}$";
var ctl00_HomePageContent_RegularExpressionValidator3 = document.all ? document.all["ctl00_HomePageContent_RegularExpressionValidator3"] : document.getElementById("ctl00_HomePageContent_RegularExpressionValidator3");
ctl00_HomePageContent_RegularExpressionValidator3.controltovalidate = "ctl00_HomePageContent_ctrlTextPin";
ctl00_HomePageContent_RegularExpressionValidator3.focusOnError = "t";
ctl00_HomePageContent_RegularExpressionValidator3.errormessage = "Please Enter Valid Pin Code";
ctl00_HomePageContent_RegularExpressionValidator3.display = "Dynamic";
ctl00_HomePageContent_RegularExpressionValidator3.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_RegularExpressionValidator3.validationexpression = "^[0-9]{6}$";
var ctl00_HomePageContent_RegularExpressionValidator6 = document.all ? document.all["ctl00_HomePageContent_RegularExpressionValidator6"] : document.getElementById("ctl00_HomePageContent_RegularExpressionValidator6");
ctl00_HomePageContent_RegularExpressionValidator6.controltovalidate = "ctl00_HomePageContent_ctrlTextMobileNumber";
ctl00_HomePageContent_RegularExpressionValidator6.focusOnError = "t";
ctl00_HomePageContent_RegularExpressionValidator6.errormessage = "Please Enter Only Digits";
ctl00_HomePageContent_RegularExpressionValidator6.display = "Dynamic";
ctl00_HomePageContent_RegularExpressionValidator6.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_RegularExpressionValidator6.validationexpression = "^[0-9]{10}$";
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
        
document.getElementById('ctl00_HomePageContent_RequiredFieldValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidator1'));
}
Sys.Application.add_init(function() {
    $create(AjaxControlToolkit.FilteredTextBoxBehavior, {"FilterType":13,"ValidChars":".\u0027 ","id":"ctl00_HomePageContent_ftbUserName"}, null, null, $get("ctl00_HomePageContent_ctrlTextUserName"));
});

document.getElementById('ctl00_HomePageContent_RequiredFieldValidator5').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidator5'));
}

document.getElementById('ctl00_HomePageContent_RequiredFieldValidator3').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidator3'));
}

document.getElementById('ctl00_HomePageContent_Address1RegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_Address1RegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_RequiredFieldValidatorState').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidatorState'));
}

document.getElementById('ctl00_HomePageContent_Address2RegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_Address2RegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_DistrictsRequiredFieldVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_DistrictsRequiredFieldVal'));
}

document.getElementById('ctl00_HomePageContent_Address3RegularExpressionVal').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_Address3RegularExpressionVal'));
}

document.getElementById('ctl00_HomePageContent_RegularExpressionValidator3').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RegularExpressionValidator3'));
}

document.getElementById('ctl00_HomePageContent_RegularExpressionValidator6').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RegularExpressionValidator6'));
}
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
