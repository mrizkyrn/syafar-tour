import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ReactGrid, Column, Row, CellChange, TextCell } from '@silevis/reactgrid';
import { getByType, bulkUpdate } from '@/api/user-service-api';

import Container from '@/components/Container';
import formatPrice from '@/utils/formatPrice';

import '@silevis/reactgrid/styles.css';

interface PriceData {
  id: string;
  name: string;
  price: string;
}

interface ModifiedRow {
  id: string;
  service_name: string;
  service_price: number;
}

const getColumns = (): Column[] => [
  { columnId: 'name', width: 300 },
  { columnId: 'price', width: 200 },
];

const headerRow: Row = {
  rowId: 'header',
  cells: [
    { type: 'header', text: 'Name' },
    { type: 'header', text: 'Price' },
  ],
};

const getRows = (data: PriceData[]): Row[] => [
  headerRow,
  ...data.map<Row>((item) => ({
    rowId: item.id.toString(),
    cells: [
      { type: 'text', text: item.name },
      { type: 'text', text: formatPrice(item.price) },
    ],
  })),
];

// Apply changes and track modified rows
const applyChangesToData = (
  changes: CellChange<TextCell>[],
  prevData: PriceData[],
  modifiedRows: ModifiedRow[]
): [PriceData[], ModifiedRow[]] => {
  const updatedData = [...prevData];

  changes.forEach((change) => {
    const dataIndex = updatedData.findIndex((ticket) => ticket.id === change.rowId);
    const fieldName = change.columnId as keyof PriceData;

    if (fieldName === 'price') {
      const rawPrice = change.newCell.text.replace(/[Rp,.]/g, '').trim();
      updatedData[dataIndex][fieldName] = rawPrice;
    } else {
      updatedData[dataIndex][fieldName] = change.newCell.text;
    }

    // Track modified rows
    const modifiedRowIndex = modifiedRows.findIndex(row => row.id === change.rowId);
    const newRowData = {
      id: change.rowId.toString(),
      service_name: updatedData[dataIndex].name,
      service_price: parseFloat(updatedData[dataIndex].price),
    };

    if (modifiedRowIndex !== -1) {
      modifiedRows[modifiedRowIndex] = newRowData;
    } else {
      modifiedRows.push(newRowData);
    }
  });

  return [updatedData, [...modifiedRows]];
};

const UserService: React.FC = () => {
  const [data, setData] = useState<PriceData[]>([]);
  const [modifiedRows, setModifiedRows] = useState<ModifiedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { type = '' } = useParams<{ type: string }>();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getByType(type);
      const fetchedData = response.data.map((item: any) => ({
        id: item.id,
        name: item.service_name,
        price: item.service_price,
      }));
      setData(fetchedData);
      setModifiedRows([]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleChanges = (changes: CellChange<TextCell>[]) => {
    setData((prevData) => {
      const [updatedData, updatedModifiedRows] = applyChangesToData(changes, prevData, modifiedRows);
      setModifiedRows(updatedModifiedRows);
      return updatedData;
    });
  };

  const saveChanges = async () => {
    if (modifiedRows.length === 0) {
      alert('No changes to save.');
      return;
    }

    try {
      const response = await bulkUpdate(modifiedRows);
      if (response.success) {
        alert('Changes saved successfully!');
        setModifiedRows([]);
        fetchData();
      } else {
        alert('Failed to save changes.');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('An error occurred while saving changes.');
    }
  };

  const rows = getRows(data);
  const columns = getColumns();

  return (
    <Container>
      <ReactGrid
        rows={rows}
        columns={columns}
        enableRangeSelection
        onCellsChanged={(changes) => {
          const textCellChanges = changes.filter(
            (change): change is CellChange<TextCell> => change.newCell.type === 'text'
          );
          handleChanges(textCellChanges);
        }}
      />
      <button onClick={saveChanges} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </Container>
  );
};

export default UserService;
