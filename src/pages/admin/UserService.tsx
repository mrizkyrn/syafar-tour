import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ReactGrid, CellChange, Row, Column, TextCell } from '@silevis/reactgrid';
// import { Id, MenuOption, SelectionMode } from '@silevis/reactgrid';
import { getByType, bulkUpdate } from '@/api/user-service-api';

import Container from '@/components/Container';

import '@silevis/reactgrid/styles.css';
import formatPrice from '@/utils/formatPrice';

interface UserServiceData {
  id?: string;
  name: string;
  price: string;
}

const UserService: React.FC = () => {
  const { type = '' } = useParams<{ type: string }>();

  const [userServices, setUserServices] = useState<UserServiceData[]>([]);
  const [modifiedRows, setModifiedRows] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getByType(type);
        const services = response.data.map((data: any) => ({
          id: data.id,
          name: data.service_name,
          price: data.service_price.toString(),
        }));
        setUserServices(services);
        setModifiedRows(new Set());
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
          { type: 'header', text: 'Name' },
          { type: 'header', text: 'Price' },
        ],
        height: 35,
      },
      ...userServices.map<Row>((service, idx) => ({
        rowId: idx,
        cells: [
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

      console.log(dataIndex, fieldName);

      if (fieldName === 'price') {
        const rawPrice = change.newCell.text.replace(/[Rp,.]/g, '').trim();
        prevData[dataIndex][fieldName] = rawPrice;
      } else {
        prevData[dataIndex][fieldName] = change.newCell.text;
      }
    });
    return [...prevData];
  };

  // const addRow = (data: UserServiceData[], rowId: string, after: boolean): UserServiceData[] => {
  //   const newRow: UserServiceData = {
  //     name: '',
  //     price: '0',
  //   };

  //   if (after) {
  //     return [...data.slice(0, parseInt(rowId) + 1), newRow, ...data.slice(parseInt(rowId) + 1)];
  //   } else {
  //     return [...data.slice(0, parseInt(rowId)), newRow, ...data.slice(parseInt(rowId))];
  //   }
  // };

  // const handleContextMenu = (
  //   selectionRowIds: Id[],
  //   _selectionColumnIds: Id[],
  //   selectionMode: SelectionMode,
  //   menuOptions: MenuOption[]
  // ) => {
  //   if (selectionMode === 'row') {
  //     menuOptions = [
  //       ...menuOptions,
  //       {
  //         id: 'remove-row',
  //         label: 'Remove Row',
  //         handler: () => {
  //           const updatedData = userServices.filter((_, idx) => !selectionRowIds.includes(idx));
  //           setUserServices(updatedData);
  //         },
  //       },
  //       {
  //         id: 'add-row-after',
  //         label: 'Add Row After',
  //         handler: () => {
  //           const updatedData = addRow(userServices, selectionRowIds[0].toString(), true);
  //           setUserServices(updatedData);
  //         },
  //       },
  //       {
  //         id: 'add-row-before',
  //         label: 'Add Row Before',
  //         handler: () => {
  //           const updatedData = addRow(userServices, selectionRowIds[0].toString(), false);
  //           setUserServices(updatedData);
  //         },
  //       },
  //     ];
  //   }

  //   return menuOptions;
  // };

  const handleSave = async () => {
    try {
      setLoading(true);

      const modifiedServices = userServices
        .filter((_, idx) => modifiedRows.has(idx))
        .map((service) => ({
          id: service.id,
          service_name: service.name,
          service_price: parseInt(service.price),
        }));

      console.log({
        type,
        modifiedServices,
      });

      if (!modifiedServices.length) {
        alert('No data to save');
        return;
      }

      const response = await bulkUpdate(type, modifiedServices);

      if (!response.success) {
        console.error('Error saving data:', response.message);
        alert('Error saving data');
      }

      console.log('Data saved:', response);
      alert('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setLoading(false);
      setModifiedRows(new Set());
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
        // onContextMenu={handleContextMenu}
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
