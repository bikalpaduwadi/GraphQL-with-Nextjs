import React from 'react';
import classNames from 'classnames';
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';

interface TableProps {
  columns: any[];
  selectedRow: any;
  onRowClick?: (row: any) => void;
  defaultData: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ columns, defaultData, onRowClick, selectedRow }) => {
  const table = useReactTable({
    columns,
    data: defaultData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} scope="col" className="px-6 py-3">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const isSelected = row.original.id === selectedRow?.id;
            const rowClassnames = classNames(
              'bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600',
              { 'bg-red-500': isSelected }
            );

            return (
              <tr key={row.id} className={rowClassnames} onClick={() => onRowClick?.(row.original)}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
