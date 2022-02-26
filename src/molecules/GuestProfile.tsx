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
    <DivAtom display="flex" align="center">
      <AvatarAtom
        image={image}
        alt="guest"
        variant="rounded"
        size={30}
        margin="8px"
      />
      <DivAtom display="flex" flexdirection="column">
        <ParagraphAtom
          weight={titleweight}
          text={title}
          margin="0px"
          color="#464E5F"
          size="0.875rem"
        />
        <ParagraphAtom
          text={subtitle}
          margin="0px"
          color="#B5B5C3"
          size="0.875rem"
        />
      </DivAtom>
    </DivAtom>
  );
}

export default GuestProfile;
