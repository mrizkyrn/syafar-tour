import { useState, useEffect } from 'react';
import { ReactGrid, Column, Row, CellChange, TextCell } from '@silevis/reactgrid';
import Container from '@/components/Container';
import { getAll, bulkUpdate } from '@/api/price-api';
import { useParams } from 'react-router-dom';
import '@silevis/reactgrid/styles.css';
import formatPrice from '@/utils/formatPrice';

interface PriceData {
  id: string;
  name: string;
  price: string;
}

// Function to define columns
const getColumns = (): Column[] => [
  { columnId: 'name', width: 300 }, // Name column
  { columnId: 'price', width: 200 }, // Price column
];

// Define the header row
const headerRow: Row = {
  rowId: 'header',
  cells: [
    { type: 'header', text: 'Name' },
    { type: 'header', text: 'Price' },
  ],
};

// Function to generate rows from data
const getRows = (data: PriceData[]): Row[] => [
  headerRow,
  ...data.map<Row>((item) => ({
    rowId: item.id.toString(),
    cells: [
      { type: 'text', text: item.name }, // Name cell
      { type: 'text', text: formatPrice(item.price) }, // Price cell with formatted price
    ],
  })),
];

// Function to apply changes to data
const applyChangesToData = (changes: CellChange<TextCell>[], prevData: PriceData[]): PriceData[] => {
  changes.forEach((change) => {
    const dataIndex = prevData.findIndex((ticket) => ticket.id.toString() === change.rowId); // Match rowId with id
    const fieldName = change.columnId as keyof PriceData;

    if (fieldName === 'price') {
      const rawPrice = change.newCell.text.replace(/[Rp,.]/g, '').trim();
      prevData[dataIndex][fieldName] = rawPrice;
    } else {
      prevData[dataIndex][fieldName] = change.newCell.text; // Handle text change for 'name'
    }
  });
  return [...prevData];
};

const Price: React.FC = () => {
  const [data, setData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const { type = '' } = useParams<{ type: string }>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAll(type);
        setData(
          response.data.map((item: PriceData) => ({
            id: item.id,
            name: item.name,
            price: item.price.toString(),
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Generate rows and columns
  const rows = getRows(data);
  const columns = getColumns();

  // Handle changes, only for TextCell type
  const handleChanges = (changes: CellChange<TextCell>[]) => {
    setData((prevData) => applyChangesToData(changes, prevData));
  };

  // Save changes to the server using Axios
  const saveChanges = async () => {
    const response = await bulkUpdate(
      data.map((item) => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
      })),
      type
    );
    if (response.success) {
      alert('Changes saved successfully!');
    } else {
      alert('Failed to save changes!');
    }
  };

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

export default Price;
