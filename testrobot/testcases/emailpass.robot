*** Settings ***
Library    SeleniumLibrary
Resource    ../testdata/environment.robot
Resource    ../keywords/register.robot
Test Teardown    Close All Browsers

*** Test Cases ***
Verify registration form with empty email field
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    ${EMPTY}

    #Input verify password
    Wait registration load complete
    Input text    //*[@id=':R9sm:']    passwordxxx
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    passwordxxx

    #Input verify confirm password
    Wait registration load complete
    Input text    //*[@id=':Ra4m:']    passwordxxx
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    passwordxxx

    Click submit application
    Verify email error empty message
    Reload Page

*** Test Cases ***
Verify registration form with no"@"" and no"."" email
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    Input text    //*[@id=':R9km:']    earthemailcom
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    earthemailcom

    #Input verify password
    Wait registration load complete
    Input text    //*[@id=':R9sm:']    passwordxxx
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    passwordxxx

    #Input verify confirm password
    Wait registration load complete
    Input text    //*[@id=':Ra4m:']    passwordxxx
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    passwordxxx

    Click submit application
    Verify email error valid message
    Reload Page

*** Test Cases ***
Verify registration form with no"@"" email
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    Input text    //*[@id=':R9km:']    earthemail.com
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    earthemail.com

    #Input verify password
    Wait registration load complete
    Input text    //*[@id=':R9sm:']    passwordxxx
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    passwordxxx

    #Input verify confirm password
    Wait registration load complete
    Input text    //*[@id=':Ra4m:']    passwordxxx
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    passwordxxx

    Click submit application
    Verify email error valid message
    Reload Page

*** Test Cases ***
Verify registration form with no"." email
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    Input text    //*[@id=':R9km:']    earth@emailcom
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    earth@emailcom

    #Input verify password
    Wait registration load complete
    Input text    //*[@id=':R9sm:']    passwordxxx
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    passwordxxx

    #Input verify confirm password
    Wait registration load complete
    Input text    //*[@id=':Ra4m:']    passwordxxx
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    passwordxxx

    Click submit application
    Verify email error valid message
    Reload Page

*** Test Cases ***
Verify registration form with an email starting with "@"
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    Input text    //*[@id=':R9km:']    @email.com
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    @email.com

    #Input verify password
    Wait registration load complete
    Input text    //*[@id=':R9sm:']    passwordxxx
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    passwordxxx

    #Input verify confirm password
    Wait registration load complete
    Input text    //*[@id=':Ra4m:']    passwordxxx
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    passwordxxx

    Click submit application
    Verify email error valid message
    Reload Page

*** Test Cases ***
Verify registration form with an email ending with "."
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    Input text    //*[@id=':R9km:']    earth@email.
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    earth@email.

    #Input verify password
    Wait registration load complete
    Input text    //*[@id=':R9sm:']    passwordxxx
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    passwordxxx

    #Input verify confirm password
    Wait registration load complete
    Input text    //*[@id=':Ra4m:']    passwordxxx
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    passwordxxx

    Click submit application
    Verify email error valid message
    Reload Page

*** Test Cases ***
Verify registration form with an email having only one character after "."
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    Input text    //*[@id=':R9km:']    earth@email.c
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    earth@email.c

    #Input verify password
    Wait registration load complete
    Input text    //*[@id=':R9sm:']    passwordxxx
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    passwordxxx

    #Input verify confirm password
    Wait registration load complete
    Input text    //*[@id=':Ra4m:']    passwordxxx
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    passwordxxx

    Click submit application
    Verify email error valid message
    Reload Page

*** Test Cases ***
Verify registration form with an email starting with @ and ending with "."
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    Input text    //*[@id=':R9km:']    @earth@email.
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    @earth@email.

    #Input verify password
    Wait registration load complete
    Input text    //*[@id=':R9sm:']    passwordxxx
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    passwordxxx

    #Input verify confirm password
    Wait registration load complete
    Input text    //*[@id=':Ra4m:']    passwordxxx
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    passwordxxx

    Click submit application
    Verify email error valid message
    Reload Page

*** Test Cases ***
Verify registration form with empty password
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    Input text    //*[@id=':R9km:']    earth@email.com
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    earth@email.com

    #Input verify password
    Wait registration load complete
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    ${empty}

    #Input verify confirm password
    Wait registration load complete
    Input text    //*[@id=':Ra4m:']    ${empty}
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    ${empty}

    Click submit application
    Verify password error empty message
    Reload Page

*** Test Cases ***
Verify registration form with invalid password
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    Input text    //*[@id=':R9km:']    earth@email.com
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    earth@email.com

    #Input verify password
    Wait registration load complete
    Input text    //*[@id=':R9sm:']    123
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    123

    #Input verify confirm password
    Wait registration load complete
    Input text    //*[@id=':Ra4m:']    123
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    123

    Click submit application
    Verify password error datatype message
    Reload Page


*** Test Cases ***
Verify registration form with empty confirm password
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    Input text    //*[@id=':R9km:']    earth@email.com
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    earth@email.com

    #Input verify password
    Wait registration load complete
    Input text    //*[@id=':R9sm:']    passwordxxx
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    passwordxxx

    #Input verify confirm password
    Wait registration load complete
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    ${empty}

    Click submit application
    Verify comfirm password error message
    Reload Page

*** Test Cases ***
Verify registration form with invalid confirm password
    [Tags]    All Input
    Open Browser    http://localhost:3000/register    chrome
    Maximize Browser Window

    #Input firstname
    Wait registration load complete
    Input text     //*[@id=':R8km:']   earth 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    earth

    #Input lastname
    Wait registration load complete
    Input text    //*[@id=':R8sm:']    Burachokviwat
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    Burachokviwat

    #Input phoneNumber
    Wait registration load complete
    Input text    //*[@id=':R9cm:']    0611111111
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    0611111111

    #Input email
    Wait registration load complete
    Input text    //*[@id=':R9km:']    earth@email.com
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    earth@email.com

    #Input verify password
    Wait registration load complete
    Input text    //*[@id=':R9sm:']    passwordxxx
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    passwordxxx

    #Input verify confirm password
    Wait registration load complete
    Input text    //*[@id=':Ra4m:']    password
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    password

    Click submit application
    Verify comfirm password error message
    Reload Page
