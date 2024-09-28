import { FaTrashAlt, FaEdit, FaCopy } from 'react-icons/fa';

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({ onEdit, onDelete, onDuplicate }) => {
  return (
    <div className="flex space-x-2">
      <button onClick={onEdit} className="text-blue-500 hover:underline">
        <FaEdit />
      </button>
      <button onClick={onDelete} className="text-red-500 hover:underline">
        <FaTrashAlt />
      </button>
      {onDuplicate && (
        <button onClick={onDuplicate} className="text-green-500 hover:underline">
          <FaCopy />
        </button>
      )}
    </div>
  );
};

export default TableActions;
