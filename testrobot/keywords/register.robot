*** Setting ***
Resource    ../keywords/common.robot
Resource    ../testdata/environment.robot
Resource    ../testdata/test_data.robot
Library    SeleniumLibrary

*** Keywords ***
Open browser registration form
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window
    Sleep    1

Wait registration load complete
    Wait Until Element Contains    //*[@id='header01']    ${test_data_form_name} 

Verify firstname is empty
   ${firstname}    Get Value   //*[@id=':R8km:']
    Should Be Equal    ${firstname}    ${EMPTY}

Verify lastname is empty
   ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    ${EMPTY}


Verify email is empty
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    ${EMPTY}

    
Input and verify firstname
    Input text     //*[@id=':R8km:']   ${test_data_firstname} 
    ${firstname}    Get Value    //*[@id=':R8km:'] 
    Should Be Equal    ${firstname}    ${test_data_firstname} 

Input and verify lastname
    Input text    //*[@id=':R8sm:']    ${test_data_lastname} 
    ${lastname}    Get Value    //*[@id=':R8sm:']
    Should Be Equal    ${lastname}    ${test_data_lastname} 

Input and verify phoneNumber
    Input text    //*[@id=':R9cm:']    ${test_data_phone_number}
    ${phoneNumber}    Get Value    //*[@id=':R9cm:']
    Should Be Equal    ${phoneNumber}    ${test_data_phone_number}
    Should Match Regexp   ${phoneNumber}  ^[0-9]+$  Phone number must be only digits
    Length Should Be  ${phoneNumber}  10  Phone number must be exactly 10 digits

Input and verify email
    Input text    //*[@id=':R9km:']    ${test_data_email}
    ${email}    Get Value    //*[@id=':R9km:']
    Should Be Equal    ${email}    ${test_data_email}
    Should Match Regexp  ${email}  ^[^@ ]+@[^@ ]+\.[^@ .]{2,}$  Please enter the valid email

Input and verify password
    Input text    //*[@id=':R9sm:']    ${test_data_password}
    ${password}    Get Value    //*[@id=':R9sm:']
    Should Be Equal    ${password}    ${test_data_password}    
    ${length}=    Get Length    ${password}
    Should Be True    ${length} > 7    Password must have at least 8 characters
    
Input and verify confirm password
    Input text    //*[@id=':Ra4m:']    ${test_data_password}
    ${confirm_password}    Get Value    //*[@id=':Ra4m:']
    ${password}    Get Value    //*[@id=':Ra4m:']
    Should Be Equal    ${confirm_password}    ${test_data_password}
    Should Be Equal  ${password}  ${confirm_password}  Password and confirm password fields must match

Click submit application
    SeleniumLibrary.Click Element  //*[@id='submitbtn']

# error firstname
Verify firstname display error empty message
    Wait Until Element Contains    //*[@id=':R8km:-helper-text']   Please enter your name

# error lastname
Verify lastname display error empty message
    Wait Until Element Contains    //*[@id=':R8sm:-helper-text']  Please enter your surname

# error phone number
Verify phoneNumber error empty message
    Wait Until Element Contains    //*[@id=':R9cm:-helper-text']  Please enter the phone number

 Verify phoneNumber error datatype message
    Wait Until Element Contains    //*[@id=':R9cm:-helper-text']  Phone number must be only digits

 Verify phoneNumber error valid message
    Wait Until Element Contains    //*[@id=':R9cm:-helper-text']  Please enter the valid phone number
 
# error email
Verify email error empty message
    Wait Until Element Contains    //*[@id='R9km:-helper-text']  Please enter email

 Verify email error valid message
    Wait Until Element Contains    //*[@id='R9km:-helper-text']  Please enter the valid email

 
# error password
# Verify email error empty message
#     Wait Until Element Contains    //*[@id=':R9sm:-helper-text']  Please enter password


#  Verify email error datatype message
#     Wait Until Element Contains    //*[@id=':R9sm:-helper-text']  Password must have at least 8 characters


# #confirm password
# Verify comfirm password error message
#     Wait Until Element Contains    //*[@id='Ra4m:-helper-text']  Passwords must match


# Verify message after click submit form
    # Wait Until Element Contains    //*[@id='cid_84']    ${test_data_sccess_submit_message} 