*** Settings ***
Library    SeleniumLibrary
Resource    ../testdata/environment.robot
Resource    ../keywords/register.robot
Test Teardown    Close All Browsers

*** Test Cases ***
Verify registration form with all input field
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome

    #Input firstname
    Wait Until Element Contains    //*[@id='header01']    REGISTRATION
    Input text    //*[@id=':R8km:']    studentFirstName
    ${firstname}=    Get Value    //*[@id=':R8km:']
    Should Be Equal    ${firstname}    studentFirstName

Verify firstName input
    [Tags]    valid
    Open browser registration form
    Wait registration load complete
    Input and verify firstname
    Reload Page

Verify lastName input
    [Tags]    valid
    Open browser registration form
    Wait registration load complete
    Input and verify lastname
    Reload Page

Verify phoneNumber input
    [Tags]    valid
    Open browser registration form
    Wait registration load complete
    Input and verify phoneNumber
    Reload Page

Verify email input
    [Tags]    valid
    Open browser registration form
    Wait registration load complete
    Input and verify email
    Reload Page

Verify password 
    [Tags]    valid
    Open browser registration form
    Wait registration load complete
    Input and verify password
    Reload Page

Verify password confirm
    [Tags]    valid
    Open browser registration form
    Wait registration load complete
    Input and verify confirm password
    Reload Page
    
# Verify firstname register 
#     [Tags]    invalid
#     Open browser registration form
#     Wait registration load complete
#     Verify firstname is empty
#     Click submit application
#     Verify firstname display error empty message
#     Reload Page
