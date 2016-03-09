//***** Use this file to set up your buttons and include any custom functions for your app *****
// 
var development = 1;                   // 1 this app is in development, 0 this app is in production
var appname = "appTemplate";           // This apps name / folder name _ must be unique
var btncount = 2;                      // This is the number of buttons on the home page of the app

//var currentUserDefaultCaution = "0";    // **This is the global Throw caution to the wind flag for the current use

/*-----------------------------------------------------*/
/*---------------------- Buttons ----------------------*/
/*-----------------------------------------------------*/

//Setup for Button0 (The First Button)
var btn0_Title = "First Button Title";            // This is what is displayed on the button
var btn0_Command = "displaymessage.js";
var btn0_Source = "displaymessage.txt";    
var btn0_CommandParms = "";
var btn0_id="btn0";
var btn0_ServiceName="DisplayMessage";
var btn0_ElevateNeeded=0;                  	// Needed by service _ in xml file for button
var btn0_ScriptHasUI=0;                    	// Needed by service _ in xml file for button
// Permissions for button0 
var btn0_KeyValue="button0";
var btn0_DefaultEnableButton=1;
var btn0_CurrentEnableButton=0;        		// Display on how it works _ Admin only can modify Current values 
var btn0_LastModifiedEnableButton="";  		// Update timestamp if admin modifies current value
var btn0_DefaultAllowUser=1;
var btn0_CurrentAllowUser=0;         		// Display on how it works _ Admin only can modify Current values 
var btn0_LastModifiedAllowUser="";   		// Update timestamp if admin modifies current value
var btn0_DefaultCaution=1;
var btn0_CurrentCaution=0;           		// Display on how it works _ Admin only can modify Current values 
var btn0_LastModifiedCaution="";     		// Update timestamp if admin modifies current value
var buttonname0 ="";

//Setup for Button1 (The Second Button)
var btn1_Title = "Second Button Title";     // this is what is displayed on the button
var btn1_Command = "displaymessage2.js";
var btn1_Source = "displaymessage2.txt";    
// Permissions for button1 
var btn1_DefaultEnableButton=0;
var btn1_CurrentEnableButton=0;        		// Display on how it works _ Admin only can modify Current values 
var btn1_LastModifiedEnableButton="";  		// Update timestamp if admin modifies current value
var btn1_DefaultAllowUser=0;
var btn1_CurrentAllowUser=0;         		// Display on how it works _ Admin only can modify Current values 
var btn1_LastModifiedAllowUser="";   		// Update timestamp if admin modifies current value
var btn1_DefaultCaution=0;
var btn1_CurrentCaution=0;           		// Display on how it works _ Admin only can modify Current values 
var btn1_LastModifiedCaution="";     		// Update timestamp if admin modifies current value
var buttonname1 ="";
	
/*-----------------------------------------------------*/
/*----------------- Custom Functions ------------------*/
/*-----------------------------------------------------*/	
//***** Use the below area for your common functions *****





