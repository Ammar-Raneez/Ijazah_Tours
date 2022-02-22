import DivAtom from "../../atoms/DivAtom";
import QuotationsTable from "./QuotationsTable";

function Quotations() {
  return (
    <DivAtom backgroundcolor="#E5E5E5" padding="1rem" display="flex">
      <DivAtom
        backgroundcolor="white"
        borderradius="0.5rem"
        padding="1rem"
        flex={1}
      >
        <QuotationsTable
          columns={["QUOTES", "EARNINGS", "COMMISION", "", ""]}
          flexcontainer="false"
          rowdata={DUMMY_DATA}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Quotations;

const DUMMY_DATA = [
  [
    {
      image: require("../../assets/logo.png"),
      title: "Brad Simmons",
      subtitle: "HTML CSS ReactJS",
    },
    {
      title: "$2500",
      subtitle: "In Process",
    },
    {
      title: "$520",
      subtitle: "Paid",
    },
    {
      quote: '',
      status: 'Approved'
    }
  ],
  [
    {
      image: require("../../assets/logo.png"),
      title: "Brad Simmons",
      subtitle: "HTML CSS ReactJS",
    },
    {
      title: "$2500",
      subtitle: "In Process",
    },
    {
      title: "$520",
      subtitle: "Paid",
    },
    {
      quote: '',
      status: 'Approved'
    }
  ],
  [
    {
      image: require("../../assets/logo.png"),
      title: "Brad Simmons",
      subtitle: "HTML CSS ReactJS",
    },
    {
      title: "$2500",
      subtitle: "In Process",
    },
    {
      title: "$520",
      subtitle: "Paid",
    },
    {
      quote: '',
      status: 'In Progress'
    }
  ],
];
