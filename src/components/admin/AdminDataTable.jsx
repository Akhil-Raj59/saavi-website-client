// src/components/admin/AdminDataTable.jsx
import React from "react";

export default function DataTable({ columns = [], data = [], actions }) {
  return (
    <div className="overflow-x-auto bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800 text-left border-b border-gray-700">
            {columns.map((c) => (
              <th key={c.key} className="p-3 text-gray-300 font-semibold uppercase tracking-wider text-xs">
                {c.label}
              </th>
            ))}
            {actions && (
              <th className="p-3 text-gray-300 font-semibold uppercase tracking-wider text-xs">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td 
                colSpan={columns.length + (actions ? 1 : 0)} 
                className="p-8 text-center text-gray-400"
              >
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <span>No records found.</span>
                </div>
              </td>
            </tr>
          )}
          {data.map((row, index) => (
            <tr 
              key={row._id || row.id || index} 
              className="border-t border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              {columns.map((c) => (
                <td key={c.key} className="p-3 align-top text-gray-300">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
              {actions && (
                <td className="p-3 align-top">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}