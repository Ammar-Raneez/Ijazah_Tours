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
    <DivAtom style={styles.container}>
      <AvatarAtom
        image={image}
        alt="guest"
        variant="rounded"
        style={styles.avatar}
      />
      <DivAtom style={styles.innerContainer}>
        <ParagraphAtom
          style={{ ...styles.paragraph, fontWeight: titleweight }}
          text={title}
        />
        <ParagraphAtom
          style={styles.paragraph}
          text={subtitle}
        />
      </DivAtom>
    </DivAtom>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    margin: "8px",
    height: "30px",
    width: "30px",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column" as const,
  },
  paragraph: {
    margin: "0px",
    color: "#464E5F",
    fontSize: "0.875rem",
  },
};

export default GuestProfile;
