import Header from "../components/Header.jsx";
import Main from "../components/Main.jsx";
import Footer from "../components/Footer.jsx";
import Button from "../components/Button.jsx";
import Div from "../components/Div.jsx";
import CopyrightText from "../components/CopyrightText.jsx";
import useTheme from "../hooks/useTheme.js";
import "../styles/PublicLayout.css";

export default function PublicLayout({children}) {
  const { toggleTheme } = useTheme();
  
  return (
    <Div className="public-layout">
      <Header className="public-header">
        <Button
          className="button-outline button-small"
          onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </Header>

      <Main className="public-main">
        {children}
      </Main>

      <Footer className="public-footer">
        <CopyrightText />
      </Footer>
    </Div>
  );
}
