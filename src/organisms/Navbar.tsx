import DivAtom from '../atoms/DivAtom';
import LinkAtom from '../atoms/LinkAtom';
import LinkTextAtom from '../atoms/LinkTextAtom';
import { navbarStyles } from '../styles';

const LINKS = [
  {
    type: 'dashboard',
    links: [
      { key: '1', text: 'Quotations', link: '/dashboard/quotations' },
      { key: '2', text: 'Guest', link: '/dashboard/guest' },
      { key: '3', text: 'Voucher', link: '/dashboard/voucher' },
    ],
  },
  {
    type: 'quote',
    links: [
      { key: '1', text: 'Quotations', link: '/quote/quotations' },
      { key: '2', text: 'Voucher', link: '/quote/voucher' },
      { key: '3', text: 'Summary', link: '/quote/summary' },
    ],
  },
  {
    type: 'library',
    links: [
      { key: '1', text: 'Accomodation', link: '/library/accomodation' },
      { key: '2', text: 'Driver', link: '/library/driver' },
      { key: '3', text: 'Guest', link: '/library/guest' },
    ],
  },
  {
    type: 'settings',
    links: [
      { key: '1', text: 'Accomodation', link: '/settings/accomodation' },
      { key: '2', text: 'Tour', link: '/settings/tour' },
      { key: '3', text: 'User Management', link: '/settings/user-management' },
    ],
  },
];

interface NavbarProps {
  type: 'quote' | 'library' | 'settings';
}

function Navbar({ type }: NavbarProps) {
  const navbarType = LINKS.find((obj) => obj.type === type);

  return (
    <DivAtom style={navbarStyles.container}>
      {navbarType?.links.map((link) => (
        <LinkAtom style={navbarStyles.link} key={link.key} to={link.link}>
          <LinkTextAtom text={link.text} />
        </LinkAtom>
      ))}
    </DivAtom>
  );
}

export default Navbar;
