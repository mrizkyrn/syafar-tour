import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ReactGrid, CellChange, Row, Column, TextCell, Id, MenuOption, SelectionMode } from '@silevis/reactgrid';
import { getByType, bulkUpdate } from '@/api/user-service-api';

import Container from '@/components/Container';

import '@silevis/reactgrid/styles.css';
import formatPrice from '@/utils/formatPrice';

interface UserServiceData {
  id?: string;
  name: string;
  price: string;
  order_number?: number;
}

const UserService: React.FC = () => {
  const { type = '' } = useParams<{ type: string }>();

  const [userServices, setUserServices] = useState<UserServiceData[]>([]);
  const [modifiedRows, setModifiedRows] = useState<Set<number>>(new Set());
  const [deletedRows, setDeletedRows] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getByType(type);
        const services = response.data.map((service: any) => ({
          id: service.id,
          name: service.name,
          price: service.price.toString(),
          order_number: service.order_number,
        }));
        setUserServices(services);
        console.log(services);
        setModifiedRows(new Set());
        setDeletedRows(new Set());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const columns: Column[] = useMemo(
    () => [
      { columnId: 'no', width: 50 },
      { columnId: 'name', width: 350 },
      { columnId: 'price', width: 200 },
    ],
    []
  );

  const rows: Row[] = useMemo(
    () => [
      {
        rowId: 'header',
        cells: [
          { type: 'header', text: 'No' },
          { type: 'header', text: 'Name' },
          { type: 'header', text: 'Price' },
        ],
        height: 35,
      },
      ...userServices.map<Row>((service, idx) => ({
        rowId: idx,
        cells: [
          { type: 'number', value: idx + 1, readOnly: true },
          { type: 'text', text: service.name },
          { type: 'text', text: formatPrice(service.price) },
        ],
        height: 35,
      })),
    ],
    [userServices]
  );

  const handleChanges = (changes: CellChange<TextCell>[]) => {
    setUserServices((prevData) => {
      const updatedData = applyChangesToData(changes, prevData);

      const newModifiedRows = new Set(modifiedRows);
      changes.forEach((change) => {
        newModifiedRows.add(parseInt(change.rowId.toString()));
      });

      setModifiedRows(newModifiedRows);
      return updatedData;
    });
  };

  const applyChangesToData = (changes: CellChange<TextCell>[], prevData: UserServiceData[]): UserServiceData[] => {
    changes.forEach((change) => {
      const dataIndex = parseInt(change.rowId.toString());
      const fieldName = change.columnId as keyof UserServiceData;

      if (fieldName === 'price') {
        const rawPrice = change.newCell.text.replace(/[Rp,.]/g, '').trim();
        prevData[dataIndex][fieldName] = rawPrice;
      } else if (fieldName === 'name') {
        prevData[dataIndex][fieldName] = change.newCell.text;
      }

      prevData[dataIndex].order_number = dataIndex;
    });
    return [...prevData];
  };

  const addRow = (data: UserServiceData[], rowId: string, after: boolean): UserServiceData[] => {
    const newRow: UserServiceData = {
      name: '',
      price: '0',
      order_number: after ? parseInt(rowId) + 1 : parseInt(rowId),
    };

    if (after) {
      return [...data.slice(0, parseInt(rowId) + 1), newRow, ...data.slice(parseInt(rowId) + 1)];
    } else {
      return [...data.slice(0, parseInt(rowId)), newRow, ...data.slice(parseInt(rowId))];
    }
  };

  const removeRow = (data: UserServiceData[], selectionRowIds: Id[]): UserServiceData[] => {
    const updatedData = data.filter((_, idx) => !selectionRowIds.includes(idx));

    selectionRowIds.forEach((rowId) => {
      const serviceId = userServices[rowId as number].id;
      if (serviceId) {
        setDeletedRows((prev) => new Set(prev.add(serviceId)));
      }
    });

    return updatedData;
  };

  const handleContextMenu = (
    selectionRowIds: Id[],
    _selectionColumnIds: Id[],
    selectionMode: SelectionMode,
    menuOptions: MenuOption[]
  ) => {
    if (selectionMode === 'row') {
      menuOptions = [
        ...menuOptions,
        {
          id: 'remove-row',
          label: 'Remove Row',
          handler: () => {
            const updatedData = removeRow(userServices, selectionRowIds);
            setUserServices(updatedData);
          },
        },
        {
          id: 'add-row-after',
          label: 'Add Row After',
          handler: () => {
            const updatedData = addRow(userServices, selectionRowIds[0].toString(), true);
            setUserServices(updatedData);
          },
        },
        {
          id: 'add-row-before',
          label: 'Add Row Before',
          handler: () => {
            const updatedData = addRow(userServices, selectionRowIds[0].toString(), false);
            setUserServices(updatedData);
          },
        },
      ];
    }

    return menuOptions;
  };

  const handleSave = async () => {
    const modifiedData = userServices.map((service, idx) => ({
      id: service.id,
      name: service.name,
      price: parseInt(service.price),
      order_number: idx + 1,
    }));

    const deletedData = Array.from(deletedRows);

    console.log({
      type,
      modifiedData,
      deletedRows: Array.from(deletedRows),
    });

    if (!modifiedRows.size && !deletedRows.size) {
      alert('No data to save');
      return;
    }

    const confirmSave = window.confirm('Are you sure you want to save the changes?');

    if (!confirmSave) {
      return;
    }

    try {
      setLoading(true);

      const response = await bulkUpdate(type, modifiedData, deletedData);

      if (!response.success) {
        console.error('Error saving data:', response.message);
        alert('Error saving data');
      } else {
        console.log('Data saved:', response);
        alert('Data saved successfully');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setLoading(false);
      setModifiedRows(new Set());
      setDeletedRows(new Set());
    }
  };

  if (loading) {
    return <p className="mt-10 mx-auto">Loading...</p>;
  }

  return (
    <Container>
      <h1 className="text-3xl font-semibold mb-6">{type.replace(/-/g, ' ').toUpperCase()}</h1>
      <ReactGrid
        rows={rows}
        columns={columns}
        onCellsChanged={(changes) => {
          const textCellChanges = changes.filter(
            (change): change is CellChange<TextCell> => change.newCell.type === 'text'
          );
          handleChanges(textCellChanges);
        }}
        onContextMenu={handleContextMenu}
        enableRangeSelection
        enableRowSelection
      />

      <button onClick={handleSave} className="bg-primary text-white px-4 py-2 mt-4">
        Save
      </button>
    </Container>
  );
};

export default UserService;
