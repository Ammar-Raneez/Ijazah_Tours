interface AccomodationData {
  location: string;
  accomodation: string;
  noOfDays: number;
  specification: string;
}

interface AccomodationTableProps {
  accomodationData: AccomodationData[];
}

function AddAccomodationTable({ accomodationData }: AccomodationTableProps) {
  console.log(accomodationData)
  return <div>AddAccomodationTable</div>;
}

export default AddAccomodationTable;
