import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}; 
    body{font-family: 'Gowun Dodum', sans-serif;}
`;

export default GlobalStyles;
