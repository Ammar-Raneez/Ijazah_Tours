import DivAtom from "../atoms/DivAtom";
import LinkAtom from "../atoms/LinkAtom";
import LinkTextAtom from "../atoms/LinkTextAtom";

const LINKS = [
  {
    type: "dashboard",
    links: [
      { key: "1", text: "Quotations", link: "/dashboard/quotations" },
      { key: "2", text: "Guest", link: "/dashboard/guest" },
      { key: "3", text: "Voucher", link: "/dashboard/voucher" },
    ],
  },
  {
    type: "quote",
    links: [
      { key: "1", text: "Quotations", link: "/quote/quotations" },
      { key: "2", text: "Voucher", link: "/quote/voucher" },
      { key: "3", text: "Summary", link: "/quote/summary" },
    ],
  },
  {
    type: "library",
    links: [
      { key: "1", text: "Accomodation", link: "/library/accomodation" },
      { key: "2", text: "Driver", link: "/library/driver" },
      { key: "3", text: "Guest", link: "/library/guest" },
    ],
  },
];

interface NavbarProps {
  type: "dashboard" | "quote" | "library";
}

function Navbar({ type }: NavbarProps) {
  const navbarType = LINKS.find((obj) => obj.type === type);

  return (
    <DivAtom
      backgroundcolor="#4283e4"
      display="flex"
      width="100%"
      height="3rem"
    >
      {navbarType?.links.map((link) => (
        <LinkAtom
          padding="0px 10px 0px 10px"
          margin="0px 10px 0px 10px"
          key={link.key}
          to={link.link}
        >
          <LinkTextAtom text={link.text} />
        </LinkAtom>
      ))}
    </DivAtom>
  );
}

export default Navbar;
