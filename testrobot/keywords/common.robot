*** Variables ***
${GLOBALTIMEOUT}     ${15}
${GLOBALWAITTIME}    ${5}
${SPEEDTIME}    ${1}
${BROWSER}       chrome

*** Keywords ***
Common Open Browser keyoniq
    Open Browser    ${URL_KEYONIQ}    ${BROWSER} 
    sleep    ${SPEEDTIME} 

Common Open new tab for keyoniq
    Open Browser   ${URL_KEYONIQ}     ${BROWSER}    alias=tab1
    sleep    ${SPEEDTIME} 

Common Open Browser keyoniq mobile
    Open Browser    ${URL_KEYONIQ_MOBILE}    ${BROWSER} 
    sleep    ${SPEEDTIME} 

Common set Maximize Browser
    Maximize Browser Window
    sleep    ${SPEEDTIME} 

Wait Until Page Is Completely Loaded
    Wait Until Page Is Completely Loaded

Click Element
    [Documentation]    ${locator} - could be any selenium locator and webelement object
    ...    ${timeout} - <optional>
    ...    Make sure that ${GLOBALTIMEOUT} can be accessed globally
    [Arguments]    ${locator}    ${timeout}=${GLOBALTIMEOUT}
    SeleniumLibrary.Wait Until Element Is Visible     ${locator}    timeout=${timeout}
    SeleniumLibrary.Click Element  ${locator}

Double Click Element
    [Arguments]    ${locator}    ${timeout}=${GLOBALTIMEOUT}
    SeleniumLibrary.Wait Until Element Is Visible     ${locator}    timeout=${timeout}
    SeleniumLibrary.Double Click Element  ${locator}

Verify Web Element Text Should Be Equal
    [Documentation]    ${locator} - could be any selenium locator and webelement object
    ...    ${expected_text} - text to be verified
    [Arguments]    ${locator}    ${expected_text}
    CommonWebKeywords.Verify Web Elements Are Visible    ${locator}
    SeleniumLibrary.Element Text Should Be    ${locator}    ${expected_text}

Verify Web Element Text Should Contain
    [Documentation]    ${locator} - could be any selenium locator and webelement object
    ...    ${expected_text} - text to be verified
    [Arguments]    ${locator}    ${expected_text}
    CommonWebKeywords.Verify Web Elements Are Visible    ${locator}
    SeleniumLibrary.Element Should Contain    ${locator}    ${expected_text}

Verify Web Elements Are Visible
    [Documentation]    This keyword verify that page contains elements specified in arguments and verify each element is visible
    ...    ${elems}    - Varargs of locators or webelements
    [Arguments]     @{elems}
    SeleniumLibrary.Wait Until Page Contains Element    @{elems}[0]    timeout=${GLOBALTIMEOUT}

    FOR    ${elem}    IN    @{elems}
        SeleniumLibrary.Wait Until Element Is Visible    ${elem}    timeout=${GLOBALTIMEOUT}
    END

Verify Web Elements Are Not Visible
    [Documentation]     Able to send argument as single variable or list variables
    [Arguments]     @{elems}
    FOR    ${elem}    IN    @{elems}
        SeleniumLibrary.Wait Until Element Is Not Visible    ${elem}     timeout=${GLOBALTIMEOUT}
    END

Test Teardown
    [Documentation]    All testcase always capture screenshot and all failed case always logs and returns the HTML source of the current page or frame.
    ${sc_fname}=    CommonKeywords.Get Valid File Name     ${TEST_NAME}
    ${status}    ${screenshot_path}    Run Keyword And Ignore Error    SeleniumLibrary.Capture Page Screenshot    ${sc_fname}_{index}.png
    Set Suite Variable    ${${TEST_NAME}}    ${screenshot_path}
    Run Keyword If Test Failed    Run Keyword And Ignore Error    SeleniumLibrary.Log Source

Keyword Teardown
    ${sc_fname}=    CommonKeywords.Get Valid File Name     ${TEST_NAME}
    Run Keyword And Ignore Error    SeleniumLibrary.Capture Page Screenshot    ${sc_fname}_{index}.png
    Run Keyword If  '${KEYWORD STATUS}'=='FAIL'   SeleniumLibrary.Log Source

Open Browser to page
    [Documentation]    Make sure that ${browser} can be accessed globally
    [Arguments]     ${url}    ${speed}=0.3
    Run Keyword If     '${browser.lower()}'=='chrome'     Open Chrome Browser to page     ${url}    ${speed}

Scroll To Element
    [Documentation]    Scroll to element using javascript function 'scrollIntoView'
    ...                ${block} defines of vertical align (start, end, center, nearest)
    [Arguments]    ${locator}    ${block}=center
    SeleniumLibrary.Wait Until Page Contains Element    ${locator}
    ${elem}=    SeleniumLibrary.Get Webelements    ${locator}
    ${s2l}=    Get Library Instance    SeleniumLibrary
    ${driver}     Evaluate    $s2l._current_browser() if "_current_browser" in dir($s2l) else $s2l._drivers.current
    Run Keyword If    '${browserName.lower()}'=='safari'    Call Method    ${driver}    execute_script    arguments[0].scrollIntoViewIfNeeded();    @{elem}[0]
    ...    ELSE    Call Method    ${driver}    execute_script    arguments[0].scrollIntoView({block: "${block}"});    @{elem}[0]

Scroll To Position Page
    [Documentation]    Scroll to position with x(left-right) and y(top-down)
    [Arguments]    ${x}    ${y}
    Execute Javascript    window.scrollTo(${x}, ${y})

Scroll And Click Element
    [Documentation]    Scroll to element using javascript function 'scrollIntoView' and click an element
    [Arguments]    ${locator}
    Scroll To Element    ${locator}
    CommonWebKeywords.Click Element    ${locator}
