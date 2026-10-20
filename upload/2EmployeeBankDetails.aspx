
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
    <form method="post" action="./EmployeeBankDetails.aspx" onsubmit="javascript:return WebForm_OnSubmit();" onkeypress="javascript:return WebForm_FireDefaultButton(event, 'ctl00_Test')" id="aspnetForm" enctype="multipart/form-data">
<div class="aspNetHidden">
<input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
<input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="h97UaqDmoCyd/X5baDut85cfpVwSVE8xz3dxI7Rk5Q8GCaoNHRoJ5GFykx4frCr3EXeuQ4/9XzIGDJIh5yNIWuOC7iF53hTRT2tLZnEx3Pz4zcdiWCRBKtF2OI9Ee5M/7UdR3tNw2jzPVjR0YH9RQwwt8Wg4V9MNxyRUxbAZFLy21uLOM0j0Rz0hok3mCMgu9qwqwdbs+3NkDteDbjA9N2lC6AfqGRQvOkqy9JMNqBLwbRgG1b+UBwLiTTm0/r/ShnbwLuP8I4APjxmUCEKIS29HPLAS3/+/JP1wItMhrrrhOF0hkC2bd4PJLAQudUE1yjdMEgu5h/2q4zqD5MRJ/WmokpPuJMzeSHvUOgkrso/Y6KcEb2KePAmLWCswAPCOziCy4l7TAQ4W2VoL0H2G4oGDP+39LxIZVSp73JTrHV8K/xZ8ty4o2FhSnEpZW2bdMFYsKu0FkvP+lsdRDk1XYgtdRRXZScMTCgvQz1fXHpirCyxIENrOxwqPBnAO6fRLeDGA45+y424NXJA65eJ02MiwF0tEtEFMozFNuSEr42DpDv9oEwd09a6lNe63qG2pnYdCDpvjlS/9ULRfFx3zBgPNWMflTAMkeCfDe7YI3XG+e/inSqEaOQQnbeId0CG+hkMLM9JgeiZnxAKGaT4C6RJ8IewT42GZBq6zmhyFd7j6zzltchiQ49lL0NdBIM1VcfSgkc1Qn1fS7aWdQQ/ZOibac6JxbqJtRQuMzIVvZMtJKjDvKy54xH38poSTsgUxGfISnTuoGB2wMtSvPt425HnLb9XTJmseBVWRuthy34s+xpxOSVE49oTIfF+WFzwv299YegflSO4yoZdp6jPb2tZQVIRzMfyRGVI2vbDshNJAlPjD7tzO343tEmecPppJ5T7c01svZ2tLrzG2oARFO99qNTG3aXNpB4VlH9xNYg3z7NO62Mg7wN/P5H7yWx3Onnm+orbqgerXuoS6ixQFXaieb9Td0+BZl0Sn/v0oE6djKo+5K7d34Xfx6RmP9+rf81XggICT3GWb/To0eSoOUZ/6nq8=" />
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
	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="YvuRefZY70q85aTHBPeU/d+3ZcQyBv+ndIzaIA9O9ViJSgFS/PdkeTT2NbYxZdUrHfrUejlMuiAkN2FOLFf7VQu8Ia7oNfXTUGVItQmKzAnSpi2POauSaE68raM09T/DcxKpEPytAIx/4oCnqC82FZOOhHWbZ9pWrV6CIp5D5DjR6E2HeFlJYRsRrlfeiPyEM1icDD/pg0I3LhvqcVbXvPnkC7TeYqwY/lcBN+2fLqoaGp1lmkjckKI2dybhDNzbo4LzRwpn10ibJp1H4GAr8paGWFmJxapTtwrbDmEoAwDcAv42wtIwUJP8h03z7LQOTc7oCffnYkYaR/h31vd/vKnhcfeGxXMS126Tj4b6QsGMzOV7NEQb/J4jndnwVJOjLyQdq83PLshKmDY8cM643fkqi/0l8P77sh9DGi38hTUS9LjNLu/3K9oSP61UzEs7KYzM47erqXTBnOvPvxnc/4lAFXF0bboTkHX/Iblr7etuJFtinrh3FzDSB9i5H1quXRQM8APQr/N/apVBQJOmrKhZThk=" />
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
                                    <div id="raw">Tuesday, October 20, 2026 1:14:11 PM</div>
                                    <div id="Div1">0</div>
                                    </td><td class="homelink" align="right"><input type="image" name="ctl00$imgbtnHome" id="ctl00_imgbtnHome" tabindex="50" src="../App_Themes/Images/home.gif" alt="Home" onclick="aspnetForm.target =&#39;_self&#39;;" />

                                    
                                            </a>&nbsp;&nbsp;
                                        &nbsp;&nbsp;
                                        
&nbsp;&nbsp;

                                            <input type="submit" name="ctl00$Test" value="Button" id="ctl00_Test" style="display:none;" /><input type="image" name="ctl00$imgbtnLogout" id="ctl00_imgbtnLogout" tabindex="50" src="../App_Themes/Images/logout.gif" alt="Close" onclick="aspnetForm.target =&#39;_self&#39;;" /><input type="submit" name="ctl00$dummybutton" value="" id="ctl00_dummybutton" style="border-width:0px;font-weight:bold;height:0px;width:0px;" /></td>
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
                            <input name="ctl00$HomePageContent$txtIFSCcode" type="text" value="BARB0VESUXX" maxlength="11" id="ctl00_HomePageContent_txtIFSCcode" tabindex="106" class="txtbox" />
                            <span id="ctl00_HomePageContent_RequiredFieldValidator4" style="color:Red;visibility:hidden;">Enter IFSC code</span>

                            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <input type="submit" name="ctl00$HomePageContent$btnIFSCcode" value="Search" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$btnIFSCcode&quot;, &quot;&quot;, true, &quot;search&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_btnIFSCcode" class="btn" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            
                        </td>
				</tr>
			</table>
			
            </td>
        </tr>
    </table>
    <table id="ctl00_HomePageContent_Table1" width="100%" border="0" align="center" cellspacing="0" cellpadding="3" class="internalTable">
				<tr id="ctl00_HomePageContent_Tr3" align="center">
					<td>
                <table width="100%" border="1" align="center" cellpadd ing="0" cellspacing="0" id="Table4">
                    <tr>
                        <td colspan="8" align="center">Bank Details of Insured Person
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="leftTopFormLabel">Bank Name :<span class="mandatoryField">*</span>
                        </td>
                        <td colspan="2" class="lastFormValue">
                            <textarea name="ctl00$HomePageContent$txt_Bank_Name_in_Records" rows="2" cols="20" maxlength="50" id="ctl00_HomePageContent_txt_Bank_Name_in_Records" disabled="disabled" tabindex="104" class="aspNetDisabled txtbox numericAlignRight" style="background-color:#CCCCCC;width:150px;">
BANK OF BARODA</textarea>
                            <span id="ctl00_HomePageContent_RequiredFieldValidator1" style="color:Red;visibility:hidden;">Enter Bank Name </span>
                            <span id="ctl00_HomePageContent_RegularExpressionValidator1" class="errordisplay" style="display:none;">Enter Only Alphabets And Spaces</span>
                        </td>
                        <td colspan="2" class="leftTopFormLabel">Branch Name:<span class="mandatoryField">*</span>
                        </td>
                        <td colspan="2" class="lastFormValue">
                            <textarea name="ctl00$HomePageContent$txtbranch_name" rows="2" cols="20" maxlength="50" id="ctl00_HomePageContent_txtbranch_name" disabled="disabled" tabindex="104" class="aspNetDisabled txtbox numericAlignRight" style="background-color:#CCCCCC;width:150px;">
VESU BRANCH, DIST.SURAT</textarea>
                            <span id="ctl00_HomePageContent_rfvBranch_Name" style="color:Red;visibility:hidden;">Enter Branch Name</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="leftTopFormLabel">Account Number:<span class="mandatoryField">*</span>
                        </td>
                        <td colspan="2" class="lastFormValue">
                            <input name="ctl00$HomePageContent$txtacc_number" type="text" maxlength="20" id="ctl00_HomePageContent_txtacc_number" tabindex="105" class="txtbox numericAlignRight" />
                            <span id="ctl00_HomePageContent_RequiredFieldValidator2" style="color:Red;visibility:hidden;">Enter Account Number</span>
                            <span id="ctl00_HomePageContent_valAccNo" class="errordisplay" style="display:none;">Please Enter only numerics</span>
                        </td>
                        <td colspan="2" class="leftTopFormLabel">IFSC :<span class="mandatoryField">*</span>
                        </td>
                        <td colspan="2" class="lastFormValue">
                            <input name="ctl00$HomePageContent$txtifsc" type="text" value="BARB0VESUXX" maxlength="11" id="ctl00_HomePageContent_txtifsc" disabled="disabled" tabindex="106" class="aspNetDisabled txtbox numericAlignRight" style="background-color:#CCCCCC;" />
                            <span id="ctl00_HomePageContent_RequiredFieldValidator3" style="color:Red;visibility:hidden;">Enter IFSC Code</span>
                            <span id="ctl00_HomePageContent_valifsc" class="errordisplay" style="display:none;">allowed format is : aaaa0XXXXXX , X implies alpha numeric value</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="leftTopFormLabel">MICR Code:
                        </td>
                        <td colspan="2" class="lastFormValue">
                            <input name="ctl00$HomePageContent$txtmicr" type="text" maxlength="20" id="ctl00_HomePageContent_txtmicr" tabindex="107" class="txtbox" />
                            <span id="ctl00_HomePageContent_valmicr" class="errordisplay" style="display:none;">Enter only nuemeric</span>
                        </td>
                        <td colspan="2" class="leftTopFormLabel">Account Type:<span class="mandatoryField">*</span>
                        </td>
                        <td colspan="2" class="lastFormValue">
                            <select name="ctl00$HomePageContent$ddlAccountType" id="ctl00_HomePageContent_ddlAccountType">
						<option selected="selected" value="0">--Select Account Type--</option>
						<option value="2">Savings</option>
						<option value="3">Current</option>
						<option value="4">Others</option>

					</select>
                            <span id="ctl00_HomePageContent_RequiredFieldValidator5" style="color:Red;visibility:hidden;">Select Account Type</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="leftTopFormLabel">Document:
                        </td>
                        <td colspan="4" class="lastFormValue">
                            <div id="ctl00_HomePageContent_pnlUpload">
						
                                <input type="file" name="ctl00$HomePageContent$ctrlFISelectFile" id="ctl00_HomePageContent_ctrlFISelectFile" />
                                <input type="submit" name="ctl00$HomePageContent$btnUpload" value="Upload" id="ctl00_HomePageContent_btnUpload" class="btn" />
                                <span id="ctl00_HomePageContent_StatusLabel" style="color:Red;"></span>
                                

                                <input type="hidden" name="ctl00$HomePageContent$ctrlFileName" id="ctl00_HomePageContent_ctrlFileName" />
                                
                            
					</div>
                            
                            
                            <br />
                            <span id="ctl00_HomePageContent_lblfooterMessage1" style="color:Red;font-weight:bold;">Note:Document type allowed pdf, jpg & jpeg.</span>
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span id="ctl00_HomePageContent_lblfooterMessage2" style="color:Red;font-weight:bold;">Maximum Size is 200 KB for uploading documents.</span>

                        </td>
                    </tr>
                </table>
            </td>
				</tr>
				<tr>
					<td colspan="8" class="pageFooter1">
                <input type="submit" name="ctl00$HomePageContent$btnsubmit" value="Submit" onclick="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$HomePageContent$btnsubmit&quot;, &quot;&quot;, true, &quot;submit&quot;, &quot;&quot;, false, false))" id="ctl00_HomePageContent_btnsubmit" class="btn" />
                <input type="submit" name="ctl00$HomePageContent$Button1" value="Reset" id="ctl00_HomePageContent_Button1" class="btn" />
                <input type="hidden" name="ctl00$HomePageContent$hdndate" id="ctl00_HomePageContent_hdndate" />
                <input type="button" class="btn" title="Close" value="Close" id="btnCancel"
                    onkeydown="return doClick(this.id,event);" onclick="window.close();" />
                <br />
            </td>
				</tr>
				<tr id="ctl00_HomePageContent_Tr1">
					<td colspan="8" class="sectionHeader">
                
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
                    in 1024 x 768 pixels, Site maintained by : ESIC. Designed and Developed by CMS Computers LTD. Release Version No.: V2.5.427. <span id="ctl00_lblIP" style="color:White;">IP Address : 57. </span><span id="ctl00_Label1" style="color:#742902;">ASP Session ID : 0qcnasn5aunlectc1ai2cwgg</span></td>
	</tr>
</table>
           </div>
         <input type="hidden" name="ctl00$hdnhmedate" id="ctl00_hdnhmedate" value="2026 10 20" /> 
    
<script type="text/javascript">
//<![CDATA[
var Page_Validators =  new Array(document.getElementById("ctl00_HomePageContent_RequiredFieldValidator4"), document.getElementById("ctl00_HomePageContent_RequiredFieldValidator1"), document.getElementById("ctl00_HomePageContent_RegularExpressionValidator1"), document.getElementById("ctl00_HomePageContent_rfvBranch_Name"), document.getElementById("ctl00_HomePageContent_RequiredFieldValidator2"), document.getElementById("ctl00_HomePageContent_valAccNo"), document.getElementById("ctl00_HomePageContent_RequiredFieldValidator3"), document.getElementById("ctl00_HomePageContent_valifsc"), document.getElementById("ctl00_HomePageContent_valmicr"), document.getElementById("ctl00_HomePageContent_RequiredFieldValidator5"));
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
var ctl00_HomePageContent_RequiredFieldValidator1 = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidator1"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidator1");
ctl00_HomePageContent_RequiredFieldValidator1.controltovalidate = "ctl00_HomePageContent_txt_Bank_Name_in_Records";
ctl00_HomePageContent_RequiredFieldValidator1.errormessage = "Enter Bank Name ";
ctl00_HomePageContent_RequiredFieldValidator1.validationGroup = "submit";
ctl00_HomePageContent_RequiredFieldValidator1.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidator1.initialvalue = "";
var ctl00_HomePageContent_RegularExpressionValidator1 = document.all ? document.all["ctl00_HomePageContent_RegularExpressionValidator1"] : document.getElementById("ctl00_HomePageContent_RegularExpressionValidator1");
ctl00_HomePageContent_RegularExpressionValidator1.controltovalidate = "ctl00_HomePageContent_txt_Bank_Name_in_Records";
ctl00_HomePageContent_RegularExpressionValidator1.errormessage = "Enter Only Alphabets And Spaces";
ctl00_HomePageContent_RegularExpressionValidator1.display = "Dynamic";
ctl00_HomePageContent_RegularExpressionValidator1.validationGroup = "submit";
ctl00_HomePageContent_RegularExpressionValidator1.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_RegularExpressionValidator1.validationexpression = "^[a-zA-Z\\s]+$";
var ctl00_HomePageContent_rfvBranch_Name = document.all ? document.all["ctl00_HomePageContent_rfvBranch_Name"] : document.getElementById("ctl00_HomePageContent_rfvBranch_Name");
ctl00_HomePageContent_rfvBranch_Name.controltovalidate = "ctl00_HomePageContent_txtbranch_name";
ctl00_HomePageContent_rfvBranch_Name.errormessage = "Enter Branch Name";
ctl00_HomePageContent_rfvBranch_Name.validationGroup = "submit";
ctl00_HomePageContent_rfvBranch_Name.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_rfvBranch_Name.initialvalue = "";
var ctl00_HomePageContent_RequiredFieldValidator2 = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidator2"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidator2");
ctl00_HomePageContent_RequiredFieldValidator2.controltovalidate = "ctl00_HomePageContent_txtacc_number";
ctl00_HomePageContent_RequiredFieldValidator2.errormessage = "Enter Account Number";
ctl00_HomePageContent_RequiredFieldValidator2.validationGroup = "submit";
ctl00_HomePageContent_RequiredFieldValidator2.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidator2.initialvalue = "";
var ctl00_HomePageContent_valAccNo = document.all ? document.all["ctl00_HomePageContent_valAccNo"] : document.getElementById("ctl00_HomePageContent_valAccNo");
ctl00_HomePageContent_valAccNo.controltovalidate = "ctl00_HomePageContent_txtacc_number";
ctl00_HomePageContent_valAccNo.errormessage = "Please Enter only numerics";
ctl00_HomePageContent_valAccNo.display = "Dynamic";
ctl00_HomePageContent_valAccNo.validationGroup = "submit";
ctl00_HomePageContent_valAccNo.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_valAccNo.validationexpression = "^[0-9]{3,20}$";
var ctl00_HomePageContent_RequiredFieldValidator3 = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidator3"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidator3");
ctl00_HomePageContent_RequiredFieldValidator3.controltovalidate = "ctl00_HomePageContent_txtifsc";
ctl00_HomePageContent_RequiredFieldValidator3.errormessage = "Enter IFSC Code";
ctl00_HomePageContent_RequiredFieldValidator3.validationGroup = "submit";
ctl00_HomePageContent_RequiredFieldValidator3.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidator3.initialvalue = "";
var ctl00_HomePageContent_valifsc = document.all ? document.all["ctl00_HomePageContent_valifsc"] : document.getElementById("ctl00_HomePageContent_valifsc");
ctl00_HomePageContent_valifsc.controltovalidate = "ctl00_HomePageContent_txtifsc";
ctl00_HomePageContent_valifsc.errormessage = "allowed format is : aaaa0XXXXXX , X implies alpha numeric value";
ctl00_HomePageContent_valifsc.display = "Dynamic";
ctl00_HomePageContent_valifsc.validationGroup = "submit";
ctl00_HomePageContent_valifsc.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_valifsc.validationexpression = "[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$";
var ctl00_HomePageContent_valmicr = document.all ? document.all["ctl00_HomePageContent_valmicr"] : document.getElementById("ctl00_HomePageContent_valmicr");
ctl00_HomePageContent_valmicr.controltovalidate = "ctl00_HomePageContent_txtmicr";
ctl00_HomePageContent_valmicr.errormessage = "Enter only nuemeric";
ctl00_HomePageContent_valmicr.display = "Dynamic";
ctl00_HomePageContent_valmicr.validationGroup = "submit";
ctl00_HomePageContent_valmicr.evaluationfunction = "RegularExpressionValidatorEvaluateIsValid";
ctl00_HomePageContent_valmicr.validationexpression = "^[0-9]{1,20}$";
var ctl00_HomePageContent_RequiredFieldValidator5 = document.all ? document.all["ctl00_HomePageContent_RequiredFieldValidator5"] : document.getElementById("ctl00_HomePageContent_RequiredFieldValidator5");
ctl00_HomePageContent_RequiredFieldValidator5.controltovalidate = "ctl00_HomePageContent_ddlAccountType";
ctl00_HomePageContent_RequiredFieldValidator5.errormessage = "Select Account Type";
ctl00_HomePageContent_RequiredFieldValidator5.validationGroup = "submit";
ctl00_HomePageContent_RequiredFieldValidator5.evaluationfunction = "RequiredFieldValidatorEvaluateIsValid";
ctl00_HomePageContent_RequiredFieldValidator5.initialvalue = "0";
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

document.getElementById('ctl00_HomePageContent_RequiredFieldValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidator1'));
}

document.getElementById('ctl00_HomePageContent_RegularExpressionValidator1').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RegularExpressionValidator1'));
}

document.getElementById('ctl00_HomePageContent_rfvBranch_Name').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_rfvBranch_Name'));
}

document.getElementById('ctl00_HomePageContent_RequiredFieldValidator2').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidator2'));
}

document.getElementById('ctl00_HomePageContent_valAccNo').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_valAccNo'));
}

document.getElementById('ctl00_HomePageContent_RequiredFieldValidator3').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidator3'));
}

document.getElementById('ctl00_HomePageContent_valifsc').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_valifsc'));
}

document.getElementById('ctl00_HomePageContent_valmicr').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_valmicr'));
}

document.getElementById('ctl00_HomePageContent_RequiredFieldValidator5').dispose = function() {
    Array.remove(Page_Validators, document.getElementById('ctl00_HomePageContent_RequiredFieldValidator5'));
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
