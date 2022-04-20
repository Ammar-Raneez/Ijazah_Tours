import { useState } from 'react';

import CheckboxAtom from '../../../../../atoms/CheckboxAtom';
import DivAtom from '../../../../../atoms/DivAtom';
import ParagraphAtom from '../../../../../atoms/ParagraphAtom';
import { quoteCreateQuoteStyles } from '../../../../../styles';
import { SettingsSingleInput, LibraryAccomodation } from '../../../../../utils/types';

interface SearchbarProps {
  searchTerm: string;
  accomodationData: LibraryAccomodation[];
  accomodationTypesData: SettingsSingleInput[];
  roomTypesData: SettingsSingleInput[];
  roomViewsData: SettingsSingleInput[];
  roomGradingsData: SettingsSingleInput[];
}

function Searchbar({
  searchTerm,
  accomodationData,
  accomodationTypesData,
  roomTypesData,
  roomViewsData,
  roomGradingsData,
}: SearchbarProps) {
  console.log(accomodationData);

  const [checked, setChecked] = useState([
    ...accomodationTypesData,
    ...roomTypesData,
    ...roomViewsData,
    ...roomGradingsData].map((v) => ({ value: v.val, type: v.type, checked: false })));

  const onCheckboxChange = (index: number) => {
    const tempChecked = [...checked];
    tempChecked[index].checked = !checked[index].checked;
    setChecked(tempChecked);
  };

  const filterAccomodations = () => {
    let filteredAccomodations = accomodationData.filter((acc) => (
      acc.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    if (checked.some((c) => c.checked === true)) {
      const currentlyChecked = checked.filter((c) => c.checked === true);
      currentlyChecked.forEach((c) => {
        switch (c.type) {
        case 'Accomodation Types':
          filteredAccomodations = filteredAccomodations.filter((acc) => (
            acc.accomodationType === c.value
          ));
          break;
        case 'Room Types':
          filteredAccomodations = filteredAccomodations.filter((acc) => (
            Object.keys(acc.categoryValues).includes(c.value)
          ));
          break;
        case 'Room Views':
          filteredAccomodations = filteredAccomodations.filter((acc) => (
            acc.views.find((v) => v.val === c.value && v.checked)
          ));
          break;
        case 'Gradings':
          filteredAccomodations = filteredAccomodations.filter((acc) => (
            acc.gradings.find((v) => v.val === c.value && v.checked)
          ));
          break;
        default:
          break;
        }
      });
    }

    return filteredAccomodations;
  };

  const Sidebar = () => (
    <DivAtom style={quoteCreateQuoteStyles.searchBar.mainContainer}>
      <DivAtom>
        <ParagraphAtom text="Filter By" />
        <hr />
        <ParagraphAtom text="Accomodations" />
        <DivAtom style={quoteCreateQuoteStyles.searchBar.checkboxSectionContainer}>
          {accomodationTypesData.map((type, index) => (
            <CheckboxAtom
              checked={checked[index].checked}
              onChange={() => onCheckboxChange(index)}
              label={type.val}
              name={type.val}
            />
          ))}
        </DivAtom>
        <hr />
        <ParagraphAtom text="Room Types" />
        <DivAtom style={quoteCreateQuoteStyles.searchBar.checkboxSectionContainer}>
          {roomTypesData.map((type, index) => (
            <CheckboxAtom
              checked={checked[index + accomodationTypesData.length].checked}
              onChange={() => onCheckboxChange(index + accomodationTypesData.length)}
              label={type.val}
              name={type.val}
            />
          ))}
        </DivAtom>
        <hr />
        <ParagraphAtom text="Room Views" />
        <DivAtom style={quoteCreateQuoteStyles.searchBar.checkboxSectionContainer}>
          {roomViewsData.map((type, index) => (
            <CheckboxAtom
              checked={checked[index + accomodationTypesData.length + roomTypesData.length].checked}
              onChange={() => (
                onCheckboxChange(index + accomodationTypesData.length + roomTypesData.length)
              )}
              label={type.val}
              name={type.val}
            />
          ))}
        </DivAtom>
        <hr />
        <ParagraphAtom text="Gradings" />
        <DivAtom style={quoteCreateQuoteStyles.searchBar.checkboxSectionContainer}>
          {roomGradingsData.map((type, index) => (
            <CheckboxAtom
              checked={checked[
                index
                + accomodationTypesData.length
                + roomTypesData.length
                + roomViewsData.length
              ].checked}
              onChange={() => (
                onCheckboxChange(
                  index
                  + accomodationTypesData.length
                  + roomTypesData.length
                  + roomViewsData.length,
                )
              )}
              label={type.val}
              name={type.val}
            />
          ))}
        </DivAtom>
      </DivAtom>
      <DivAtom style={quoteCreateQuoteStyles.searchBar.accomodationContainer}>
        {filterAccomodations().map((acc) => (
          <ParagraphAtom text={acc.name} />
        ))}
      </DivAtom>
    </DivAtom>
  );

  return (
    <DivAtom>
      <Sidebar />
    </DivAtom>
  );
}

export default Searchbar;
