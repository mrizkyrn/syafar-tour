import { FaSortUp, FaSortDown } from 'react-icons/fa';

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: string;
  currentOrder: string;
  onSort: (key: string) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ label, sortKey, currentSort, currentOrder, onSort }) => {
  const isActive = currentSort === sortKey;
  const isAsc = isActive && currentOrder === 'asc';
  const isDesc = isActive && currentOrder === 'desc';

  return (
    <th className="text-left px-4 py-3 border-b cursor-pointer" onClick={() => onSort(sortKey)}>
      <div className="inline-flex items-center space-x-1">
        <span>
          <FaSortUp className={`-mb-[0.6rem] ${isAsc ? 'text-black' : 'text-gray-400'} w-3 h-3`} />
          <FaSortDown className={`${isDesc ? 'text-black' : 'text-gray-400'} w-3 h-3`} />
        </span>
        <span>{label}</span>
      </div>
    </th>
  );
};

export default SortableHeader;
