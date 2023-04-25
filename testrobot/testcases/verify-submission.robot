*** Settings ***
Library    SeleniumLibrary
Resource    ../testdata/environment.robot
Resource    ../keywords/register.robot
Test Teardown    Close All Browsers

*** Test Cases ***
# Verify registration form with all input
#     [Tags]    valid
#     Open browser registration form
#     Wait registration load complete
#     Input and verify firstname
#     Input and verify lastname
#     Input and verify phoneNumber
#     Input and verify email
#     Input and verify password    
#     Input and verify confirm password
#     Click submit application
#     Wait Until Location Contains    http://localhost:3000/login
#     Wait Until Element Contains    //*[@id='ProjectName']    TOURISTER


Verify registration form with existing email
    [Tags]    invalid
    Open browser registration form
    Wait registration load complete
    Input and verify firstname
    Input and verify lastname
    Input and verify phoneNumber
    Input and verify email
    Input and verify password    
    Input and verify confirm password
    Click submit application
    Wait Until Location Contains    http://localhost:3000/register
    Wait registration load complete

Verify registration form with single fault firstname
    [Tags]    invalid
    Open browser registration form
    Wait registration load complete
    Verify firstname is empty
    Input and verify lastname
    Input and verify phoneNumber
    Input and verify email
    Input and verify password    
    Input and verify confirm password
    Click submit application
    Verify firstname display error empty message
    Reload Page
 

