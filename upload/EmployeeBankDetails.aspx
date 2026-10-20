
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="ctl00_Head1"><title>
	ESIC
</title><link media="screen" href="../App_Themes/CSS/layout.css" rel="stylesheet" type="text/css" /><link rel="stylesheet" type="text/css" href="../App_Themes/CSS/CSSglobal.css" /><link rel="stylesheet" type="text/css" href="../App_Themes/CSS/csstaskhome.css" />

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
</head>
<body onload="rightclickControl()" onload="disableBackButton()" onunload="closeAll()"   oncontextmenu="return false" >
<div id="minHeight"></div>
    <form method="post" action="./EmployeeBankDetails.aspx" onsubmit="javascript:return WebForm_OnSubmit();" onkeypress="javascript:return WebForm_FireDefaultButton(event, 'ctl00_Test')" id="aspnetForm">
<div class="aspNetHidden">
<input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
<input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="+zlX2l1cKdUuwRXCmGZmjcJcgrl2QZPoA6tfITCTmNXzTqlCGU8R5xBVf+HEFzrAX6ibdEMi5pI30zkZXoAVa51H426Zj8TeyO/TY0ilUfvY6+3P5Y2Op8HfG8eIxgEmfRLCJ6eZ7baYetJ0LCOEDTdaxKSNyG9wpeev+NPReKKvGrNM8rzQiaim4+RhIrYBGmc5G6kfuWqKdTSu29MHKBPh+ATvmruk5hcYRuPKd7LZM8EKu0rPhcssbQ2PyNgjh3cXrBJBKwiNDPVcgQpJccYIpkM/L8uAFC7J+fW+6NbeWchO6AA6hpE02Pj3ka9mpHMYdRnct845kh6QitrIAj47kHGRayFKtnAeBKCGYWF+Wx6iK+5TTgLP3JImBol62PjSn1k9jrzrip1vSe7ewX8SraqDpxtc4xz1O3UtfSy92A0cvZnU7QJSxjxgVlugJ9hRCcu9dJGZJCzKfRuYs3nyMzvKCmlq7YT3am3GebjtbA9r6CgdIlU3kqLjyKT+SSIx5cQ8H4XXORmReGlAdCXMXa0DA5kIGWzF8oc0XHNfUTeKKZliLAAanQtaYrP7YrdDnN4SZBZveapgXTiEe09PQrWz0Uny4O/v0dUgB6TwsevwGffuNEP+yLVOI/p2Go65kA==" />
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


<script src="/InsuranceGlobalWebV4/WebResource.axd?d=pynGkmcFUV13He1Qd6_TZPEcwF2MLbN130Art7N7lKPSxy8K4H0W4eCuiJdyRSpPmcCZag2&amp;t=639163447714167511" type="text/javascript"></script>


<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=nv7asgRUU0tRmHNR2D6t1Jf2DS_HIF2rfS5uJ-pm13bUEGsCLuOwjdAAQk-I7XSyN6AbJbMwMXU6OJCzQM3j_4Z4YUp8vMrw9zO-Sp03XEbhfGh3ksVsK4L1AGZprjsZ3bl3lA2&amp;t=ffffffffa0bc9515" type="text/javascript"></script>
<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=D9drwtSJ4hBA6O8UhT6CQrcfOFIL4368l6__lnWkkNhUc0g9BVZTMEqAySlbHnnk0aebPE-MivGLdUCw7j8hHSq2WJ5-xST2SGpMqJt2WFxNwlTG92M_zsz89tx7WKZCDhtnap_2LQ4yQAhcrb7fHL3una01&amp;t=ffffffffe6d5a9ac" type="text/javascript"></script>
<script type="text/javascript">
//<![CDATA[
if (typeof(Sys) === 'undefined') throw new Error('ASP.NET Ajax client-side framework failed to load.');
//]]>
</script>

<script src="/InsuranceGlobalWebV4/ScriptResource.axd?d=JnUc-DEDOM5KzzVKtsL1ta6xW_2IVvnskrCosR1LtdQYSDuhfMJoTCj9P1N92QAwzZI67v0myVeDel9BgdMwDJ_VrrqTEIho-gqwrd54p81C4zt9sY5Yn00RpcURdXchh_V8NfJrtFNXJMg8kIPfTwrUWL3PifEUJIhgYej3tpQuGPZX0&amp;t=ffffffffe6d5a9ac" type="text/javascript"></script>
<script type="text/javascript">
//<![CDATA[
function WebForm_OnSubmit() {
if (typeof(ValidatorOnSubmit) == "function" && ValidatorOnSubmit() == false) return false;
return true;
}
//]]>
</script>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="C1222DE0" />
	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="IAcOcYpcFTwBmUZ8FvTsrgQxKq2LdmoVjjBaL2mMlGHjeBA8ghPqIsJazv+BhnKOFTgjuCgJkRmHsw+bEMp/W8HjKsjKc2f4IReaRPCVOiyOlQznoOT9QqPRHNJzG7c01e+dwd4+t7b8fW86fyFgC72JqxGYO6UM0/+iZKmTF4oJsJhR5WXdQNGY5mDDfCIa1ALa+Q==" />
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
                                    <div id="raw">Tuesday, October 20, 2026 1:06:18 PM</div>
                                    <div id="Div1">0</div>
                                    </td><td class="homelink" align="right">

                                    
                                            </a>&nbsp;&nbsp;
                                        &nbsp;&nbsp;
                                        
&nbsp;&nbsp;

                                            <input type="submit" name="ctl00$Test" value="Button" id="ctl00_Test" style="display:none;" /><input type="submit" name="ctl00$dummybutton" value="" id="ctl00_dummybutton" style="border-width:0px;font-weight:bold;height:0px;width:0px;" /></td>
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
<script type="text/javascript">
//<![CDATA[
Sys.WebForms.PageRequestManager._initialize('ctl00$HomePageContent$ScriptManager1', 'aspnetForm', ['fctl00$HomePageContent$UpdatePanel1',''], [], [], 90, 'ctl00');
		//]]>
</script>

    <!-- <div id="ctl00_HomePageContent_UpdatePanel1">
			-->
    <table width="100%" border="0" align="center" cellpadding="3" cellspacing="0" class="internalTable"
        id="tblUser">
        <tr>
            <td class="pageHeader" colspan="4">
                <table width="100%">
                    <tr>
                        <td class="pageHeaderText" colspan="2">Bank Details of Insured Person
                        </td>
                        <td valign="bottom" class="mandatoryField" colspan="2">* Required Fields
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr id="RowCreate">
            <td colspan="4" class="sectionHeader" style="height: 19px">
                
            </td>
        </tr>
        <tr>
            <td colspan="8" class="sectionHeader"></td>
        </tr>
    </table>
    <table width="100%" border="0" align="center" cellpadding="2" cellspacing="0" class="internalTable1"
        id="tblchallasn">
        <tr>
            <td>
                <table id="ctl00_HomePageContent_tblIfsc" width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="internalTable">
				<tr>
					<td class="leftTopFormLabel">IFSC Code :<span class="mandatoryField">*</span>
                            <input name="ctl00$HomePageContent$txtIFSCcode" type="text" maxlength="11" id="ctl00_HomePageContent_txtIFSCcode" tabindex="106" class="txtbox" />
                            <span id="ctl00_HomePageContent_RequiredFieldValidator4" style="color:Red;visibility:hidden;">Enter IFSC code</span>

                            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <input type="submit" name="ctl00$HomePageContent$btnIFSCcode" value="Search" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$btnIFSCcode&quot;, &quot;&quot;, true, &quot;search&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_btnIFSCcode" class="btn" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            
                        </td>
				</tr>
			</table>
			
            </td>
        </tr>
    </table>
    
    <table width="100%" border="0" align="center" cellpadding="2" cellspacing="0" class="internalTable" id="tblFootnote">
        <tr>
            <td colspan="8" class="leftTopFormLabel">Every Insure Person should have unique Bank Account Number. 
            </td>
        </tr>
        <tr>
            <td colspan="8" class="leftTopFormLabel">Attested & Signed by Employer copy of the front page of cheque leaflet issued by Bank or the 1st 2 pages of passbook showing the Name of the Account Holder, Account Number, Bank Name, Bank Branch, IFSC Number should be uploaded here.	</td>
        </tr>
        <tr>
            <td colspan="8" class="leftTopFormLabel">It shall be the responsibility of the Employer to provide the correct Bank Credentials of the Employee to prevent legal and administrative consequences in case of wrong or fraudulent entry. It is recommended that each Insured Person should have unique Bank Account Number.					</td>
        </tr>
    </table>
    <!--  
		</div>-->
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
                    in 1024 x 768 pixels, Site maintained by : ESIC. Designed and Developed by CMS Computers LTD. Release Version No.: V2.5.427. <span id="ctl00_lblIP" style="color:White;">IP Address : 56. </span><span id="ctl00_Label1" style="color:#742902;">ASP Session ID : 0qcnasn5aunlectc1ai2cwgg</span></td>
	</tr>
</table>
           </div>
         <input type="hidden" name="ctl00$hdnhmedate" id="ctl00_hdnhmedate" value="2026 10 20" /> 
    
<script type="text/javascript">
//<![CDATA[
var Page_Validators =  new Array(document.getElementById("ctl00_HomePageContent_RequiredFieldValidator4"));
//]]>
</script>

<script type="text/javascript">
//<![CDATA[
var ctl00_HomePageContent_RequiredFieldValidator4 = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidator4"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidator4");
ctl00_HomePageContent_RequiredFieldValidator4.controltovalidate = "ctl00_HomePageContent_txtIFSCcode";
ctl00_HomePageContent_RequiredFieldValidator4.errormessage = "Enter IFSC code";
ctl00_HomePageContent_RequiredFieldValidator4.validationGroup = "search";
ctl00_HomePageContent_RequiredFieldValidator4.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidator4.initialvalue = "";
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
        
document.getElementById('ctl00_HomePageContent_RequiredFieldValidator4').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidator4'));
}
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
