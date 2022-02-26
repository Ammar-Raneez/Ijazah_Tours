import AvatarAtom from "../atoms/AvatarAtom";
import DivAtom from "../atoms/DivAtom";
import ParagraphAtom from "../atoms/ParagraphAtom";

interface GuestProfileProps {
  image: string;
  title: string;
  subtitle: string;
  titleweight?: number;
}

function GuestProfile({
  image,
  title,
  subtitle,
  titleweight,
}: GuestProfileProps) {
  return (
    <DivAtom style={{ display: "flex", alignItems: "center" }}>
      <AvatarAtom
        image={image}
        alt="guest"
        variant="rounded"
        style={{ margin: "8px", height: "30px", width: "30px" }}
      />
      <DivAtom style={{ display: "flex", flexDirection: "column" }}>
        <ParagraphAtom
          style={{
            fontWeight: titleweight,
            margin: "0px",
            color: "#464E5F",
            fontSize: "0.875rem",
          }}
          text={title}
        />
        <ParagraphAtom
          style={{
            margin: "0px",
            color: "#B5B5C3",
            fontSize: "0.875rem",
          }}
          text={subtitle}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default GuestProfile;
