import styled from "styled-components";
import AvatarAtom from "../atoms/AvatarAtom";
import SpanAtom from "../atoms/SpanAtom";

function Header() {
  return (
    <Wrapper>
      <Container>
        <AvatarAtom
          margin="0px 20px 0px 0px"
          alt="Logo"
          image={require("../assets/logo.png")}
          size={60}
        />
        <SpanAtom
          margin="0px 12px 0px 0px"
          weight={500}
          size="40px"
          text="Ijazah"
          color="#1C5BBA"
        />
        <SpanAtom
          margin="0px 0px 0px 0px"
          weight={500}
          size="40px"
          text="Tours"
          color="#41E93E"
        />
      </Container>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  background-color: #C1BFBF;
  height: 80px;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`

const Container = styled.div`
  display: flex;
  align-items: center;
`;
