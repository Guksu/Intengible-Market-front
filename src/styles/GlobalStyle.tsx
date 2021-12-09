import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}; 
    body{font-family: 'Gowun Dodum', sans-serif;}
    ::placeholder {
    font-size: 15px;
    font-family:'Gowun Dodum', sans-serif;
    text-align: center;
    }
    button{
    font-family: 'Gowun Dodum', sans-serif;
    border-radius: 10px;
    border: 2px solid black;
    margin: 1%;
    background-color: whitesmoke;
    }
`;

export default GlobalStyles;
