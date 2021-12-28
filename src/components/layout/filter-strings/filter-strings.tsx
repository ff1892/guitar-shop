import { ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilterType } from '../../../store/reducers/state-filter/selectors';
import { changeFilterStrings } from '../../../store/actions';
import { filterStringsData } from '../../../constants';
import { getIsStringMatchesTypes } from '../../../utils';
import { filterGuitarsData } from '../../../constants';


function FilterStrings(): JSX.Element {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<string[]>([]);
  const filterType = useSelector(getFilterType);

  const onFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.currentTarget.checked;
    const currentString = evt.currentTarget.dataset.strings;
    if (!currentString) {
      return;
    }
    if (isChecked) {
      setFilter((prevState) => [...prevState, currentString]);
      return;
    }
    setFilter((prevState) => prevState
      .filter((string) =>
        string !== currentString));
  };

  useEffect(() => {
    dispatch(changeFilterStrings(filter));
  }, [dispatch, filter]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {filterStringsData.map((stringCount) => {
        const stringName = `${stringCount}-strings`;
        return (
          <div className="form-checkbox catalog-filter__block-item" key={stringCount}>
            <input className="visually-hidden"
              type="checkbox"
              id={stringName}
              name={stringName}
              data-strings={stringCount}
              onChange={onFilterChange}
              disabled={!getIsStringMatchesTypes(filterType, stringCount, filterGuitarsData)}
            />
            <label htmlFor={stringName}>{stringCount}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default FilterStrings;
