//***** Use this file to set up your buttons and include any custom functions for your app *****
// 
var development = 1;                         // 1 this app is in development, 0 this app is in production
var btncount = 2;                            // This is the number of buttons on the App Home tab

//var currentUserDefaultCaution = "0";    // **This is the global Throw caution to the wind flag for the current use

/*-----------------------------------------------------*/
/*-------------- Standard App Variables ---------------*/
/*-----------------------------------------------------*/

var appname = "appTemplate";                 // This apps name / folder name which must be unique
var apptitle = "App Template (Edit Me)";     // This display title written to the HTML
var connect_link = "http://factory.snapback-apps.com/app/new-app-template/";     // The link to your App's Connect Page in the SnapBack Apps Factory

/*-----------------------------------------------------*/
/*---------------------- Buttons ----------------------*/
/*-----------------------------------------------------*/

//Setup for Button0 (The First Button)
var btn0_Title = "First Button Title";            // This is what is displayed on the button
var btn0_Description = "First Description: This App displays a message when the user clicks the button on the left.";		// This is what is displayed as the description of the button
var btn0_Command = "displaymessage0.js";
var btn0_Source = "displaymessage0.txt";    
var btn0_CommandParms = "";
var btn0_id="btn0";
var btn0_ServiceName="DisplayMessage1";
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
var btn1_Description = "Second Description: This App displays a message when the user clicks the button on the left.";		// This is what is displayed as the description of the button
var btn1_Command = "displaymessage1.js";
var btn1_Source = "displaymessage1.txt";
var btn1_CommandParms = "";
var btn1_id="btn1";
var btn1_ServiceName="DisplayMessage2";
var btn1_ElevateNeeded=0;                  	// Needed by service _ in xml file for button
var btn1_ScriptHasUI=0;                    	// Needed by service _ in xml file for button    
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





