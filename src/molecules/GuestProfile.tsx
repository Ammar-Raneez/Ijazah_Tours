import AvatarAtom from '../atoms/AvatarAtom';
import DivAtom from '../atoms/DivAtom';
import ParagraphAtom from '../atoms/ParagraphAtom';
import { guestProfileStyles } from '../styles';

interface GuestProfileProps {
  image: string;
  title: string;
  subtitle?: string;
  titleWeight?: number;
}

function GuestProfile({
  image,
  title,
  subtitle,
  titleWeight,
}: GuestProfileProps) {
  return (
    <DivAtom style={guestProfileStyles.container}>
      <AvatarAtom
        image={image}
        alt="guest"
        variant="rounded"
        style={guestProfileStyles.avatar}
      />
      <DivAtom style={guestProfileStyles.innerContainer}>
        <ParagraphAtom
          style={{ ...guestProfileStyles.paragraph, fontWeight: titleWeight }}
          text={title}
        />
        {subtitle && (
          <ParagraphAtom style={guestProfileStyles.paragraph} text={subtitle} />
        )}
      </DivAtom>
    </DivAtom>
  );
}

export default GuestProfile;
