import ErrorTemplate from '@/components/ErrorTemplate';
import formatPrice from '@/utils/formatPrice';

import { useEffect, useMemo, useState } from 'react';
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
import {
  bulkUpdateAirlines,
  bulkUpdateEquipments,
  bulkUpdateHandlingDomestics,
  bulkUpdateHandlingSaudis,
  bulkUpdateManasik,
  bulkUpdateMuthawifs,
  bulkUpdateSiskopatuh,
  bulkUpdateTours,
  bulkUpdateTransportations,
  bulkUpdateVisas,
  getAllAirlines,
  getAllEquipments,
  getAllHandlingDomestics,
  getAllHandlingSaudis,
  getAllManasik,
  getAllMuthawifs,
  getAllSiskopatuh,
  getAllTours,
  getAllTransportations,
  getAllVisas,
} from '@/api/mitra-package-option-api';
import { BulkUpdateMitraPackageOptionRequest, MitraPackageOptionResponse } from '@/types/MitraPackageOptionType';
import { getAllExchangeRates } from '@/api/exchange-rate-api';

const formatUSD = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

const apiMap: Record<string, () => Promise<any>> = {
  pesawat: getAllAirlines,
  visa: getAllVisas,
  transportasi: getAllTransportations,
  muthawif: getAllMuthawifs,
  'handling-saudi': getAllHandlingSaudis,
  'handling-domestik': getAllHandlingDomestics,
  siskopatuh: getAllSiskopatuh,
  perlengkapan: getAllEquipments,
  wisata: getAllTours,
  manasik: getAllManasik,
};

const updateApiMap: Record<string, (data: BulkUpdateMitraPackageOptionRequest) => Promise<any>> = {
  pesawat: bulkUpdateAirlines,
  visa: bulkUpdateVisas,
  transportasi: bulkUpdateTransportations,
  muthawif: bulkUpdateMuthawifs,
  'handling-saudi': bulkUpdateHandlingSaudis,
  'handling-domestik': bulkUpdateHandlingDomestics,
  siskopatuh: bulkUpdateSiskopatuh,
  perlengkapan: bulkUpdateEquipments,
  wisata: bulkUpdateTours,
  manasik: bulkUpdateManasik,
};

const MitraPackageManagement = () => {
  const { type } = useParams();

  const [datas, setDatas] = useState<MitraPackageOptionResponse[]>([]);
  const [rowsData, setRowsData] = useState<Row[]>([]);
  const [sarToIdr, setSarToIdr] = useState(0);
  const [usdToIdr, setUsdToIdr] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllExchangeRates();
        setSarToIdr(response.data.find((rate: { currency: string }) => rate.currency === 'SAR')?.rate_idr || 0);
        setUsdToIdr(response.data.find((rate: { currency: string }) => rate.currency === 'USD')?.rate_idr || 0);
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
    const fetchData = async () => {
      if (!type) return;

      setLoading(true);
      setError('');

      try {
        const fetchApi = apiMap[type];

        if (!fetchApi) {
          setError(`Tipe ${type} tidak ditemukan`);
          return;
        }

        const response = await fetchApi();
        if (response?.data) {
          setDatas(response.data);
        } else {
          throw new Error('Data tidak valid');
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat mengambil data';
        setError(`${errorMessage} untuk tipe ${type}`);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  useEffect(() => {
    const updatedRows: Row[] = [
      {
        rowId: 'header',
        cells: [
          { type: 'header', text: 'No' },
          { type: 'header', text: 'Nama' },
          { type: 'header', text: 'Harga (SAR)' },
          { type: 'header', text: 'Harga (IDR)' },
          { type: 'header', text: 'Harga (USD)' },
        ],
        height: 30,
      },
      ...datas.map<Row>((data, index) => ({
        rowId: data.id,
        cells: [
          { type: 'number', value: index + 1, nonEditable: true },
          { type: 'text', text: data.name },
          { type: 'text', text: (data.price_idr / sarToIdr).toFixed(2) },
          { type: 'text', text: formatPrice(data.price_idr) },
          { type: 'text', text: formatUSD(data.price_idr / usdToIdr) },
        ],
        reorderable: true,
        height: 30,
      })),
    ];
    console.log(updatedRows);
    setRowsData(updatedRows);
  }, [datas, sarToIdr, usdToIdr]);

  const columns: Column[] = useMemo(
    () => [
      { columnId: 'no', width: 50 },
      { columnId: 'name', width: 250 },
      { columnId: 'price_sar', width: 150 },
      { columnId: 'price_idr', width: 150 },
      { columnId: 'price_usd', width: 150 },
    ],
    []
  );

  const handleRowsReordered = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
    if (targetRowId === 'header') return;
    const currentRows = [...rowsData];

    const targetIndex = currentRows.findIndex((row) => row.rowId === targetRowId);
    const reorderedRows = currentRows.filter((row) => !rowIds.includes(row.rowId));
    const insertIndex = dropPosition === 'after' ? targetIndex - rowIds.length + 1 : targetIndex;
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

  const updatePriceCells = (
    rows: Row[],
    rowIndex: number,
    sarIndex: number,
    idrIndex: number,
    usdIndex: number,
    sarValue: string,
    price_idr: number
  ) => {
    rows[rowIndex].cells[sarIndex] = { type: 'text', text: sarValue };
    rows[rowIndex].cells[idrIndex] = { type: 'text', text: formatPrice(price_idr) };
    rows[rowIndex].cells[usdIndex] = { type: 'text', text: formatUSD(price_idr / usdToIdr) };
  };

  const handleCellChange = (changes: CellChange[]) => {
    const updatedRows = [...rowsData];

    changes.forEach((change) => {
      const rowIndex = rowsData.findIndex((row) => row.rowId === change.rowId);
      const sarIndex = columns.findIndex((column) => column.columnId === 'price_sar');
      const idrIndex = columns.findIndex((column) => column.columnId === 'price_idr');
      const usdIndex = columns.findIndex((column) => column.columnId === 'price_usd');

      if (change.type === 'text') {
        if (change.columnId === 'price_sar') {
          const price_idr = Number(change.newCell.text) * sarToIdr;
          updatePriceCells(updatedRows, rowIndex, sarIndex, idrIndex, usdIndex, change.newCell.text, price_idr);
        } else if (change.columnId === 'price_idr') {
          const price_idr = Number(change.newCell.text.replace(/\D/g, ''));
          updatePriceCells(
            updatedRows,
            rowIndex,
            sarIndex,
            idrIndex,
            usdIndex,
            (price_idr / sarToIdr).toFixed(2),
            price_idr
          );
        } else if (change.columnId === 'price_usd') {
          const price_idr = Number(change.newCell.text.replace(/\D/g, '')) * usdToIdr;
          updatePriceCells(
            updatedRows,
            rowIndex,
            sarIndex,
            idrIndex,
            usdIndex,
            (price_idr / sarToIdr).toFixed(2),
            price_idr
          );
        } else {
          const columnIndex = columns.findIndex((column) => column.columnId === change.columnId);
          updatedRows[rowIndex].cells[columnIndex] = { type: 'text', text: change.newCell.text };
        }
      }
    });

    setRowsData(updatedRows);
  };

  const updateRowIndices = (rows: Row[]) => {
    return rows.map((row, index) => {
      if (row.rowId === 'header') return row;
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
        { type: 'text', text: '' },
        { type: 'text', text: '0' },
        { type: 'text', text: formatPrice(0) },
        { type: 'text', text: formatUSD(0) },
      ],
      reorderable: true,
      height: 30,
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
    if (!type) return;

    const confirmed = window.confirm('Apakah anda yakin ingin menyimpan perubahan?');
    if (!confirmed) return;

    const updatedDatas: BulkUpdateMitraPackageOptionRequest = {
      created: rowsData
        .filter((row) => typeof row.rowId === 'string' && row.rowId.startsWith('new-'))
        .map((row) => ({
          name: (row.cells[1] as TextCell).text,
          price_idr: Number((row.cells[3] as TextCell).text.replace(/\D/g, '')),
          order_number: (row.cells[0] as NumberCell).value,
        })),
      modified: rowsData
        .filter((row) => typeof row.rowId === 'string' && !row.rowId.startsWith('new-') && row.rowId !== 'header')
        .map((row) => ({
          id: row.rowId.toString(),
          name: (row.cells[1] as TextCell).text,
          price_idr: Number((row.cells[3] as TextCell).text.replace(/\D/g, '')),
          order_number: (row.cells[0] as NumberCell).value,
        })),
      deleted: datas.filter((data) => !rowsData.some((row) => row.rowId === data.id)).map((data) => data.id),
    };

    const savePromise = updateApiMap[type];

    if (!savePromise) {
      setError(`Tipe ${type} tidak ditemukan`);
      return;
    }

    setLoading(true);

    try {
      await toast.promise(savePromise(updatedDatas), {
        pending: 'Menyimpan perubahan...',
        success: 'Data berhasil disimpan',
        error: {
          render({ data }) {
            return `Terjadi kesalahan: ${(data as { message: string }).message}`;
          },
        },
      });
    } catch (error) {
      console.error(error);
      setError('Gagal menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  if (error) return <ErrorTemplate message={error} />;
  if (datas.length === 0 && !loading) return <p className="text-dark mt-5">Data tidak ditemukan</p>;

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-dark capitalize">{type?.replace('-', ' ')}</h1>
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
        Save
      </button>

      {loading && <p className="text-dark mt-5">Loading...</p>}
    </div>
  );
};

export default MitraPackageManagement;
