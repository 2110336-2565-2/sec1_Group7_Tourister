import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 60px;
    padding-right: 60px;
    gap: 24px;
    background-color: white;
    border-top-left-radius: 2.5rem;
    border-top-right-radius: 2.5rem
`;

export const Title = styled.h3`
    font-size: 1.4em;
    text-align: center;
    font-weight: bold;
    margin: 0px;
`;

export const Field = styled.div`
    display: grid;
    gap: 10px;
`;

export const FieldName = styled.label`
    font-size: 1em;
`;