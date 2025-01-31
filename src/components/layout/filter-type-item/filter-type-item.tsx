import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { changePage } from '../../../store/actions';
import useQuery from '../../../hooks/use-query/use-query';
import { INITIAL_PAGE, HistoryRoute } from '../../../constants';

type FilterTypeItemProps = {
  type: string,
  label: string,
  disabled: boolean,
}

function FilterTypeItem ({ type, label, disabled }: FilterTypeItemProps): JSX.Element {

  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const checkedItems = query.getAll(HistoryRoute.Type);
  const { pathname } = useLocation();

  const [isChecked, setIsChecked] = useState<boolean>(
    checkedItems.includes(type) && !disabled,
  );

  useEffect(() => {
    if (disabled && checkedItems.includes(type)) {
      query.delete(HistoryRoute.Type);
      const checkedTypes = checkedItems.filter((item) => item !== type);
      checkedTypes.forEach((item) => query.append(HistoryRoute.Type, item));
      history.replace({ pathname: pathname, search: query.toString() });
    }
    setIsChecked(checkedItems.includes(type) && !disabled);
  }, [query, checkedItems, history, pathname, type, disabled]);

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked } = evt.target;
    setIsChecked(checked);
    query.delete(HistoryRoute.Type);

    if (checked) {
      checkedItems.push(type);
      checkedItems.forEach((item) => query.append(HistoryRoute.Type, item));
    } else {
      const checkedTypes = checkedItems.filter((item) => type !== item);
      checkedTypes.forEach((item) => query.append(HistoryRoute.Type, item));
    }
    dispatch(changePage(INITIAL_PAGE));
    history.push({ pathname: HistoryRoute.InitialPagePathname, search: query.toString() });
  };

  return (
    <div className="form-checkbox catalog-filter__block-item" key={type}>
      <input className="visually-hidden"
        type="checkbox"
        id={type}
        name={type}
        checked={isChecked}
        disabled={disabled}
        onChange={onInputChange}
      />
      <label htmlFor={type}>
        {label}
      </label>
    </div>
  );
}

export default FilterTypeItem;
