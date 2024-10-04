import Select from 'react-select';
import ErrorTemplate from '@/components/ErrorTemplate';
import formatPrice from '@/utils/formatPrice';
import formatDate from '@/utils/formatDate';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ReactGrid,
  CellChange,
  Row,
  Column,
  TextCell,
  Id,
  MenuOption,
  SelectionMode,
  DropPosition,
  NumberCell,
} from '@silevis/reactgrid';
import { BulkUpdateHotelRequest, HotelQueryParams, HotelResponse } from '@/types/HotelType';
import { bulkUpdateHotel, getAllHotels } from '@/api/hotel-api';
import { PeriodResponse } from '@/types/PeriodType';
import { getAllPeriods } from '@/api/period-api';
import { VendorResponse } from '@/types/VendorType';
import { getAllVendors } from '@/api/vendor-api';

const SAR_TO_IDR = 4000;

const HotelManagement = () => {
  const { city = '' } = useParams<{ city: string }>();

  const [hotels, setHotels] = useState<HotelResponse[]>([]);
  const [rowsData, setRowsData] = useState<Row[]>([]);
  const [periods, setPeriods] = useState<PeriodResponse[]>([]);
  const [vendors, setVendors] = useState<VendorResponse[]>([]);
  const [queryParams, setQueryParams] = useState<HotelQueryParams>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const [vendorResponse, periodResponse] = await Promise.all([getAllVendors(), getAllPeriods()]);

        setVendors(vendorResponse.data);
        setPeriods(periodResponse.data);

        if (vendorResponse.data.length > 0) {
          setQueryParams((prev) => ({ ...prev, vendor_id: vendorResponse.data[0].id }));
        }
        if (periodResponse.data.length > 0) {
          setQueryParams((prev) => ({ ...prev, period_id: periodResponse.data[0].id }));
        }
      } catch (error: any) {
        console.error(error);
        setError('Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setQueryParams((prev) => ({ ...prev, city: city.toUpperCase() as 'MEKKAH' | 'MADINAH' }));
  }, [city]);

  useEffect(() => {
    if (queryParams.vendor_id && queryParams.period_id) {
      const fetchHotels = async () => {
        try {
          setLoading(true);
          const response = await getAllHotels(queryParams);
          console.log(response.data);
          setHotels(response.data);
        } catch (error: any) {
          console.error(error);
          setError('Terjadi kesalahan saat mengambil data');
        } finally {
          setLoading(false);
        }
      };

      fetchHotels();
    }
  }, [queryParams]);

  useEffect(() => {
    const updatedRows: Row[] = [
      {
        rowId: 'header',
        cells: [
          { type: 'header', text: 'No' },
          { type: 'header', text: 'Double' },
          { type: 'header', text: 'Triple' },
          { type: 'header', text: 'Quad' },
          { type: 'header', text: 'Nama Hotel' },
          { type: 'header', text: 'Double (Rp)' },
          { type: 'header', text: 'Triple (Rp)' },
          { type: 'header', text: 'Quad (Rp)' },
        ],
        height: 35,
      },
      ...hotels.map<Row>((hotel, index) => {
        return {
          rowId: hotel.id,
          cells: [
            { type: 'number', value: index + 1, nonEditable: true },
            { type: 'number', value: hotel.periods[0].price_double },
            { type: 'number', value: hotel.periods[0].price_triple },
            { type: 'number', value: hotel.periods[0].price_quad },
            { type: 'text', text: hotel.name },
            { type: 'text', text: formatPrice(hotel.periods[0].price_double * SAR_TO_IDR), nonEditable: true },
            { type: 'text', text: formatPrice(hotel.periods[0].price_triple * SAR_TO_IDR), nonEditable: true },
            { type: 'text', text: formatPrice(hotel.periods[0].price_quad * SAR_TO_IDR), nonEditable: true },
          ],
          reorderable: true,
          height: 35,
        };
      }),
    ];

    setRowsData(updatedRows);
  }, [hotels]);

  const columns: Column[] = useMemo(
    () => [
      { columnId: 'no', width: 50 },
      { columnId: 'Double', width: 75 },
      { columnId: 'Triple', width: 75 },
      { columnId: 'Quad', width: 75 },
      { columnId: 'Nama Hotel', width: 200 },
      { columnId: 'Double (Rp)', width: 150 },
      { columnId: 'Triple (Rp)', width: 150 },
      { columnId: 'Quad (Rp)', width: 150 },
    ],
    []
  );

  const handleRowsReordered = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
    if (targetRowId === 'header') return;
    const currentRows = [...rowsData];

    const targetIndex = currentRows.findIndex((row) => row.rowId === targetRowId);
    const reorderedRows = currentRows.filter((row) => !rowIds.includes(row.rowId));
    const insertIndex = dropPosition === 'after' ? targetIndex + 1 : targetIndex;
    const rowsToInsert = currentRows.filter((row) => rowIds.includes(row.rowId));

    reorderedRows.splice(insertIndex, 0, ...rowsToInsert);
    const updatedRows = reorderedRows.map((row, index) => {
      if (row.rowId === 'header') return row;
      return {
        ...row,
        cells: [{ ...row.cells[0], value: index }, ...row.cells.slice(1)],
      };
    });

    setRowsData(updatedRows);
  };

  const handleCellChange = (changes: CellChange[]) => {
    changes.forEach((change) => {
      const rowIndex = rowsData.findIndex((row) => row.rowId === change.rowId);
      const cellIndex = columns.findIndex((column) => column.columnId === change.columnId);
      const updatedRows = [...rowsData];

      if (change.type === 'text') {
        updatedRows[rowIndex].cells[cellIndex] = {
          ...updatedRows[rowIndex].cells[cellIndex],
          ...{ text: change.newCell.text },
        };
      } else if (change.type === 'number') {
        updatedRows[rowIndex].cells[cellIndex] = {
          ...updatedRows[rowIndex].cells[cellIndex],
          ...{ value: change.newCell.value },
        };
      }

      setRowsData(updatedRows);
    });
  };

  const updateRowIndices = (rows: Row[]) => {
    return rows.map((row, index) => {
      if (row.rowId === 'header') return row; // Keep the header unchanged
      return {
        ...row,
        cells: [{ ...row.cells[0], value: index }, ...row.cells.slice(1)],
      };
    });
  };

  const handleAddRow = (rowId: string, after: boolean) => {
    if (rowId === 'header' && !after) return;

    const rowIndex = rowsData.findIndex((row) => row.rowId === rowId);
    const updatedRows = [...rowsData];
    const newRow: Row = {
      rowId: `new-${Date.now()}`,
      cells: [
        { type: 'number', value: rowIndex + 1, nonEditable: true },
        { type: 'number', value: 0 },
        { type: 'number', value: 0 },
        { type: 'number', value: 0 },
        { type: 'text', text: 'Unknown' },
        { type: 'text', text: '0', nonEditable: true },
        { type: 'text', text: '0', nonEditable: true },
        { type: 'text', text: '0', nonEditable: true },
      ],
      reorderable: true,
      height: 35,
    };

    updatedRows.splice(after ? rowIndex + 1 : rowIndex, 0, newRow);

    const finalRows = updateRowIndices(updatedRows);
    setRowsData(finalRows);
  };

  const handleDeleteRow = (rowId: string) => {
    if (rowId === 'header') return;

    const updatedRows = rowsData.filter((row) => row.rowId !== rowId);

    const finalRows = updateRowIndices(updatedRows);

    setRowsData(finalRows);
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
          id: 'delete-row',
          label: 'Delete Row',
          handler: () => {
            handleDeleteRow(selectionRowIds[0].toString());
          },
        },
        {
          id: 'add-row-after',
          label: 'Add Row After',
          handler: () => {
            handleAddRow(selectionRowIds[0].toString(), true);
          },
        },
        {
          id: 'add-row-before',
          label: 'Add Row Before',
          handler: () => {
            handleAddRow(selectionRowIds[0].toString(), false);
          },
        },
      ];
    }

    return menuOptions;
  };

  const handleSave = async () => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menyimpan perubahan?');
    if (!confirmed) return;

    const updatedHotels: BulkUpdateHotelRequest = {
      modified: rowsData
        .filter((row) => row.rowId !== 'header')
        .map((row) => ({
          period_id: queryParams.period_id ?? '',
          vendor_id: queryParams.vendor_id ?? '',
          city: queryParams.city ?? 'MEKKAH',
          hotel_id: row.rowId.toString(),
          name: (row.cells[4] as TextCell).text,
          order_number: (row.cells[0] as NumberCell).value,
          price_double: (row.cells[1] as NumberCell).value,
          price_triple: (row.cells[2] as NumberCell).value,
          price_quad: (row.cells[3] as NumberCell).value,
        })),
      deleted: hotels.filter((hotel) => !rowsData.map((row) => row.rowId).includes(hotel.id)).map((hotel) => hotel.id),
    };

    setLoading(true);
    toast.promise(bulkUpdateHotel(updatedHotels), {
      pending: 'Menyimpan perubahan...',
      success: {
        render() {
          setLoading(false);
          return 'Data berhasil disimpan';
        },
      },
      error: {
        render({ data }) {
          setLoading(false);
          return (data as { message: string }).message;
        },
      },
    });
  };

  if (error) return <ErrorTemplate message={error} />;

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-dark capitalize">Hotel</h1>

      <div className="flex gap-5 items-center mb-5">
        <label className="text-dark" htmlFor="period">
          Periode:
        </label>
        <Select
          name="period"
          value={periods.find((period) => period.id === queryParams.period_id) ?? null}
          options={periods}
          getOptionLabel={(period) => `${formatDate(period.start_date)} - ${formatDate(period.end_date)}`}
          getOptionValue={(period) => period.id}
          onChange={(selectedOption) => setQueryParams((prev) => ({ ...prev, period_id: selectedOption?.id ?? '' }))}
          isSearchable={false}
        />
        <label className="text-dark" htmlFor="vendor">
          Vendor:
        </label>
        <Select
          name="vendor"
          value={vendors.find((vendor) => vendor.id === queryParams.vendor_id) ?? null}
          options={vendors}
          getOptionLabel={(vendor) => vendor.name}
          getOptionValue={(vendor) => vendor.id}
          onChange={(selectedOption) => setQueryParams((prev) => ({ ...prev, vendor_id: selectedOption?.id ?? '' }))}
          isSearchable={false}
        />
      </div>

      <ReactGrid
        columns={columns}
        rows={rowsData}
        onCellsChanged={handleCellChange}
        onRowsReordered={handleRowsReordered}
        onContextMenu={handleContextMenu}
        enableRangeSelection
        enableRowSelection
      />

      <button className="bg-primary text-white px-10 py-2 rounded-md hover:bg-primaryDark mt-5" onClick={handleSave}>
        Simpan
      </button>

      {loading && <p className="text-dark mt-5">Loading...</p>}
    </div>
  );
};

export default HotelManagement;
