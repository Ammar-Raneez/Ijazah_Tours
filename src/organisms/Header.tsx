import AvatarAtom from "../atoms/AvatarAtom";
import DivAtom from "../atoms/DivAtom";
import SpanAtom from "../atoms/SpanAtom";

function Header() {
  return (
    <DivAtom
      backgroundcolor="#C1BFBF"
      display="flex"
      align="center"
      padding="0 0 0 1rem"
    >
      <DivAtom display="flex" align="center">
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
      </DivAtom>
    </DivAtom>
  );
}

export default Header;
