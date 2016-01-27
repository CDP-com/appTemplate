// Use this file to include any custom functions for your app.
// 
var development = 1;               // 1 this app is in development, 0 this app is in production
var appname = "appTemplate";           // This apps name / folder name _ must be unique
var btncount = 2;                   // this is the number of buttons on the home page of the app

//var currentUserDefaultCaution = "0";    // this is the global Throw caution to the wind flag for the current use

//MESSAGES
//MSG_WARNING="This button is potentially dangerous or is in testing.  To run this button you can go to the settings page and set the global caution flag or talk to your administrator."
//MSG_RUNDISABLED="This button has been disabled. You are not allowed to run it. For more information, talk to your administrator."
//MSG_USERDISABLED="This button has been disabled for Normal Users. You are not allowed to run it. For more information, talk to your administrator."


//BUTTONS
var btn0_Title = "Run This App";     // this is what is displayed on the button
var btn0_Command = "displaymessage.js";  
var btn0_CommandParms = "";
var btn0_id="btn0";
var btn0_ServiceName="DisplayMessage";
var btn0_ElevateNeeded=0;   // needed by service _ in xml file for button
var btn0_ScriptHasUI=0;     // needed by service _ in xml file for button
// Permissions for button0 
var btn0_KeyValue="button0";
var btn0_DefaultEnableButton=1;
var btn0_CurrentEnableButton=0;        // display on how it works _ Admin only can modify Current values 
var btn0_LastModifiedEnableButton="";  // update timestamp if admin modifies current value
var btn0_DefaultAllowUser=1;
var btn0_CurrentAllowUser=0;         // display on how it works _ Admin only can modify Current values 
var btn0_LastModifiedAllowUser="";   // update timestamp if admin modifies current value
var btn0_DefaultCaution=1;
var btn0_CurrentCaution=0;           // display on how it works _ Admin only can modify Current values 
var btn0_LastModifiedCaution="";     // update timestamp if admin modifies current value
var buttonname0 ="";


var btn1_Title = "Run Second App this can be very long <br> 2nd line ";     // this is what is displayed on the button
var btn1_Command = "displaymessage2.js";  
// Permissions for button0 
var btn1_DefaultEnableButton=0;
var btn1_CurrentEnableButton=0;        // display on how it works _ Admin only can modify Current values 
var btn1_LastModifiedEnableButton="";  // update timestamp if admin modifies current value
var btn1_DefaultAllowUser=0;
var btn1_CurrentAllowUser=0;         // display on how it works _ Admin only can modify Current values 
var btn1_LastModifiedAllowUser="";   // update timestamp if admin modifies current value
var btn1_DefaultCaution=0;
var btn1_CurrentCaution=0;           // display on how it works _ Admin only can modify Current values 
var btn1_LastModifiedCaution="";     // update timestamp if admin modifies current value
var buttonname1 ="";
	
	
function setbtnValue(btn,value)
{
	btn=value;
	//alert(btn+"  "+value);
}
function getbtnValue(btn)
{
	return eval(btn);
}

function ChangeSetGlobal()
{
	window.confirm("You are trying to change a global setting\nButton Not Enabled _ talk to administrator");		
	var today = new Date();
}
function ChangeGlobalInDefault()
{
	window.confirm("Global set to Default\nButton Not Enabled _ talk to administrator");
}
		
function  ChangeAllowBeta()
{
	window.confirm("Allow Beta Testing"); 
}
function  ChangeBetaDefault()
{
	window.confirm("Set Beta to Off (Default)");
		
}
	// Common Registry functions

function WriteInRegistryDW(sRegEntry, sRegValue)
{
  var regpath = sRegEntry;
  var oWSS = new ActiveXObject("WScript.Shell");
  oWSS.RegWrite(regpath, sRegValue, "REG_DWORD");
}

function WriteInRegistrySZ(sRegEntry, sRegValue)
{
  var regpath = sRegEntry;
  var oWSS = new ActiveXObject("WScript.Shell");
  oWSS.RegWrite(regpath, sRegValue, "REG_SZ");
  
}



function runService(btnName,command)
{
	var output = "";
    var UpdObj;
    var command2 = ManifestURL_Local + "," + command;
    UpdObj = new ActiveXObject( "CDPUpdater.Updater" );

    try
    {
        output = UpdObj.ExpandEnvVar( command2 );
        output = UpdObj.RequestCommand( output );
    } 
    catch (e)
    {
        alert(e.message);
    }
    finally
    {
        UpdObj = null;
    }
        
    buttonLogic( output,btnName);
}
function buttonLogic(output,buttonName)
{
	// handle Error Messages
	output = output.toUpperCase();
        if( output.substring( 0, 6 ) == "2,OK,{" )
        {
            //window.location.replace( 'main.html' );
			//$(resulttab).click();
        }
        else if( output.substring( 0, 6 ) == "2,PIPE" )
        {
            window.location.replace( 'pipedown.html' );
        }
        else if( output.substring( 0, 6 ) == "6,UPDA" )
        {
            window.location.replace( 'updating.html' );
        }
        else if( output.substring( 0, 6 ) == "3,OK,{" )
        {
            //window.location.replace( 'results.html' );
			//$(resulttab).click();
        }
        else if( output.substring( 0, 6 ) == "4,OK,{" )
        {
            //location.href = "results.html";
			//$(resulttab).click();
        }
        else if( output.substring( 0, 6 ) == "2,DENY" )
        {
            window.location.replace( 'deny.html' );
        }
        else
        {
            // alert( output.substring( 0, 6 ) );
            location.href = "unknown.html";
        }

    // handle button specific logic 
	switch (buttonName){
		default: alert("No details for "+buttonName);
	}
}

///////////////////////////////////////////////////////////////////////////////
// Function Name : RunApp
// Purpose : Check Permission before an app to run
// Parameters : AppName (Application Name)
//              ButtonNum (Button Id in this App)           
//              Computername (Domain name or Local computer name)
//              CurrentUser (Current User Name)
//              sCmd (Script/exe name to excute)
// 
///////////////////////////////////////////////////////////////////////////////
 
function RunApps( AppName, ButtonNum, Computername, CurrentUser, sCmd )
{
	var btnKey="\\button"+ButtonNum;
    var GlobalCurrentCautionPath = "HKCU\\SOFTWARE\\CDP\\SnapBack\\Apps\\CurrentCaution";  
    var AppRoot = "HKLM\\SOFTWARE\\CDP\\SnapBack\\Apps\\"; 
    var AppCurrentCautionPath = AppRoot + AppName + btnKey+ "\\CurrentCaution";
    var AppCurrentEnableButtonPath = AppRoot + AppName + btnKey+ "\\CurrentEnableButton";
    var AppCurrentAllowUserPath = AppRoot + AppName + btnKey+ "\\CurrentAllowUser";    
    var sFullpath = "";
	var stats = IsAdmin(Computername, CurrentUser)
	var buttonName="btn"+ButtonNum;
			 
	// setup command for service to run or development command to be run
	if (development)
	{
	    if (sCmd.indexOf("file:") < 0) sFullpath = fnGetDocPath();
		sFullpath += sCmd;
		sCmd = sFullpath;
		var shell = new ActiveXObject ( "WScript.Shell" );
		var sPathFoldername = shell.ExpandEnvironmentStrings( unescape( sCmd ) );
		sPathFoldername = ('"' + sPathFoldername + '"');	
   	}
	
	if (ReadFromRegistry(AppCurrentEnableButtonPath))
	{
		if (IsAdmin(Computername, CurrentUser))
		{ 
		     if (ReadFromRegistry(GlobalCurrentCautionPath))
			 { 
				// Run IT
				if(development)
				{
					shell.run("explorer.exe " + sPathFoldername, 1, false);
					shell = null;
				}
				else
				{
					// Service Call
					//runService(ServiceName);
				}
			 }
			 else 
			 {
				 // Check button Caution
				 if (ReadFromRegistry(AppCurrentCautionPath))
				 {
					 //Run It
					if(development)
					{
						shell.run("explorer.exe " + sPathFoldername, 1, false);
						shell = null;
					}
					else
					{
					// Service Call
					//runService(ServiceName);
					}
				 }
				 else {
					 alert (MSG_WARNING);
					 return;
				 }
			}
		}
		else 
		{
			// Not an admin
			if (ReadFromRegistry(AppCurrentAllowUserPath))
			{
				if (ReadFromRegistry(GlobalCurrentCautionPath))
				{ 
				// Run IT
				    if(development)
					{
						shell.run("explorer.exe " + sPathFoldername, 1, false);
						shell = null;
					}
					else
					{
					// Service Call
					//runService(ServiceName);
					}
				}
				else 
				{
					// Check button Caution
					if (ReadFromRegistry(AppCurrentCautionPath))
					{
					    //Run It
						if(development)
						{
						    shell.run("explorer.exe " + sPathFoldername, 1, false);
						    shell = null;
						}
						else
						{
							// Service Call
							//runService(ServiceName);
						}
					}
					else {
					    alert (MSG_WARNING);
					    return;
					}
				}
			}
			else
			{
				alert (MSG_USERDISABLED);
				return;
			}
					 
		} // end else not admin
	} // end enable switch		
	else {
		alert(MSG_RUNDISABLED);
		return;
	}
}



function ChangeGlobalCautionChecked()
{    
	var chkBox = document.getElementById('GlobalCaution');
	
	if (chkBox.checked) {
 	    today = Date();
		SetGlobalIniValue(GlobalPathDefaultValName, 1, "REG_DWORD");
	    SetGlobalIniValue(GlobalCurrentCautionValName, 1, "REG_DWORD");
		SetGlobalIniValue(GlobalLastModifiedCautionValName, today, "REG_SZ");
	} else {
		SetGlobalIniValue(GlobalPathDefaultValName, 0, "REG_DWORD");
		SetGlobalIniValue(GlobalCurrentCautionValName, 0, "REG_DWORD");
		SetGlobalIniValue(GlobalLastModifiedCautionValName, today, "REG_SZ");	
	}
}

function EnableButtonChecked(ButtonNum) 
{   
    today = Date();
	var btncaa="btn"+ButtonNum+"CurrentEnableButton";
	var AppRoot = "HKLM\\SOFTWARE\\CDP\\SnapBack\\Apps\\";  
	var wsh = new ActiveXObject("WScript.Shell");
	ButtonEnableButtonId = "ButtonEnableButton" + ButtonNum;	
	var chkBox = document.getElementById(ButtonEnableButtonId);
	
	if (chkBox.checked)
    {	    
		SetButtonIniValue(appname, ButtonNum, "CurrentEnableButton", 1, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "EnableButtonLastModifiedDate", today, "REG_SZ");
        btncaa=1;		
	} else {
		SetButtonIniValue(appname, ButtonNum, "CurrentEnableButton", 0, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "EnableButtonLastModifiedDate", today, "REG_SZ");
        btncaa=0;	
	}
	wsh = null;
} 


function CurrentAllowUserChecked(ButtonNum) 
{   
    today = Date();
	var AppRoot = "HKLM\\SOFTWARE\\CDP\\SnapBack\\Apps\\"; 
	var wsh = new ActiveXObject("WScript.Shell");
	var btncau="btn"+ButtonNum+"CurrentAllowUser";
	CurrentAllowUserId = "CurrentAllowUser" + ButtonNum;
	var chkBox = document.getElementById(CurrentAllowUserId);
	
	if (chkBox.checked)
    {
		SetButtonIniValue(appname, ButtonNum, "CurrentAllowUser", 1, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "AllowUserLastModifiedDate", today, "REG_SZ");
		btncau=1;
	} else {
		SetButtonIniValue(appname, ButtonNum, "CurrentAllowUser", 0, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "AllowUserLastModifiedDate", today, "REG_SZ");
		btncau=0;
	}
    wsh = null;
} 

function CurrentCautionChecked(ButtonNum) 
{   
    today = Date();
	var AppRoot = "HKLM\\SOFTWARE\\CDP\\SnapBack\\Apps\\"; 
    var AppCurrentAllowAdminPath = AppRoot + appname + "\\button" + ButtonNum + "\\CurrentCaution";
	var btnccc="btn"+ButtonNum+"CurrenCaution";
	var wsh = new ActiveXObject("WScript.Shell");
	CurrentCautionId = "CurrentCaution" + ButtonNum;
	var chkBox = document.getElementById(CurrentCautionId);
	
	if (chkBox.checked)
    {
		SetButtonIniValue(appname, ButtonNum, "CurrentCaution", 1, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "CautionLastModifiedDate", today, "REG_SZ");
		btnccc=1;
	} else {
		SetButtonIniValue(appname, ButtonNum, "CurrentCaution", 0, "REG_DWORD"); 
	    SetButtonIniValue(appname, ButtonNum, "CautionLastModifiedDate", today, "REG_SZ");
		btnccc=0;
	}
    wsh = null;
} 

function CreateButtonAdminTable()
{
	// How to handle multiple checkboxes.
	var CurrentAllowUser=0;
	var ButtonEnableButton=0;
	var CurrentCaution=0;
	var CheckBoxAllowUser="";
	var CheckBoxButtonEnableButton="";
    var CheckBoxCurrentCaution="";
	
    var btnTitle="";
	var s="<table class='tblSettings' id='tblSet' ><col width='10%'><col width='40%'><col width='50%'>";
    s+="<tr>";
	s+="<TABLE cellpadding=3 cellspacing=3 ><th>&nbsp;Button Name&nbsp;</th><th>&nbsp;Enable Button&nbsp;</th><th>&nbsp;Enable Normal User&nbsp;</th><th>&nbsp;Run without Warning&nbsp;</th>";
	
	for (i=0; i<btncount; i++){
		btnTitle="btn"+i+"_Title";
	    s+="		<tr>";
	    s+="		<td>&nbsp;";
	    s+=eval(btnTitle);
	    s+="</td><td>&nbsp;";
	    ButtonEnableButton = GetButtonIniValue(appname, i, "CurrentEnableButton");
		if (ButtonEnableButton == 1)
		{ 
	        s+="<input type='checkbox' id='ButtonEnableButton"+i+"' checked onclick='EnableButtonChecked("+i+");'>";
		}
		else
		{
			s+="<input type='checkbox' id='ButtonEnableButton"+i+"' onclick='EnableButtonChecked("+i+");'>";
		}
	    s+="</td> ";
	    s+="</td><td>&nbsp;";
	    CurrentAllowUser = GetButtonIniValue(appname, i, "CurrentAllowUser");
		if (CurrentAllowUser == 1)
		{
			s+="<input type='checkbox' id='CurrentAllowUser"+i+"' checked onclick='CurrentAllowUserChecked("+i+");'>";
		}
		else	{
			s+="<input type='checkbox' id='CurrentAllowUser"+i+"'  onclick='CurrentAllowUserChecked("+i+");'>";
		}
	    s+="</td>";
	    s+="</td><td>&nbsp;";
	    CurrentCaution  = GetButtonIniValue(appname, i, "CurrentCaution");
	    if (CurrentCaution == 1)
	    { 
		    s+="<input type='checkbox' id='CurrentCaution"+i+"' checked onclick='CurrentCautionChecked("+i+");'>"
	    }
	    else
	    {
		    s+="<input type='checkbox' id='CurrentCaution"+i+"'  onclick='CurrentCautionChecked("+i+");'>"
	    }
	    s+="</td>";
	    s+="		</tr>";
	}
	s+="</tr></table>";
    s+="</table>";
//var myTable = document.getElementById("AdminPerms");
//	myTable.insertAdjacentHTML( 'beforeend', s );
	document.write(s);
}