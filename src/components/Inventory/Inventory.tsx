import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSort, SortCriteria } from './inventorySlice';
import { RootState } from '../../store';
import './Inventory.scss';

const Inventory = () => {
  const dispatch = useDispatch();
  const { items, filter, sort } = useSelector((state: RootState) => state.inventory);

  const filteredItems = filter === 'ALL' ? items : items.filter(item => item.type === filter);

  const sortedFilteredItems = [...filteredItems].sort((a, b) => {
    let sortCriteria = 'NONE';
    let sortDirection: 'ASC' | 'DESC' = 'ASC';
    if (sort !== 'NONE') {
      [sortCriteria, sortDirection] = sort.split('_') as [SortCriteria, 'ASC' | 'DESC'];
    }
  
    switch (sortCriteria) {
      case 'AZ':
        return sortDirection === 'DESC' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      case '09':
        return sortDirection === 'DESC' ? b.amount - a.amount : a.amount - b.amount;
      case 'TPE':
        return sortDirection === 'DESC' ? b.type.localeCompare(a.type) : a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  return (
    <div className="inventory-container">
      <div className="category-filter">
        <button className="category-button" onClick={() => dispatch(setFilter('ALL'))}>ALL</button>
        <button className="category-button" onClick={() => dispatch(setFilter('WPN'))}>WPN</button>
        <button className="category-button" onClick={() => dispatch(setFilter('EQP'))}>EQP</button>
        <button className="category-button" onClick={() => dispatch(setFilter('USE'))}>USE</button>
        <button className="category-button" onClick={() => dispatch(setFilter('OTHER'))}>OTHER</button>
      </div>
      <ul className="inventory-list">
        {sortedFilteredItems.map((item, index) => (
          <li className="item" key={index}>
            <span>{item.name}</span>
            <span>x{item.amount}</span>
          </li>
        ))}
      </ul>
      <div className="sort-buttons">
        <button className="sort-button" onClick={() => dispatch(setSort('AZ'))}>A-Z</button>
        <button className="sort-button" onClick={() => dispatch(setSort('09'))}>0-9</button>
        <button className="sort-button" onClick={() => dispatch(setSort('TPE'))}>TPE</button>
      </div>
    </div>
  );
};

export default Inventory;
