import { useEffect, useState } from "react";
import DivAtom from "../../../../atoms/DivAtom";
import CreateQuotationNavbar from "../../../../organisms/quote/quotation/CreateQuotationNavbar";
import { quoteCreateQuoteStyles } from "../../../../styles";

function CreateQuotation() {
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setContainerHeight(window.innerHeight - 180);
    const heightListener = window.addEventListener("resize", () => {
      setContainerHeight(window.innerHeight - 180);
    });

    const removeEventListeners = () => {
      window.removeEventListener("resize", heightListener as any);
    };

    return removeEventListeners();
  }, [containerHeight]);

  return (
    <DivAtom>
        <CreateQuotationNavbar />
    </DivAtom>
  );
}

export default CreateQuotation