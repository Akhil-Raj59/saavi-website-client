// src/components/admin/DataTable.jsx
import React from "react";

export default function DataTable({ columns = [], data = [], actions }) {
  return (
    <div className="overflow-x-auto bg-white border rounded">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-left">
            {columns.map((c) => <th key={c.key} className="p-3">{c.label}</th>)}
            {actions && <th className="p-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr><td colSpan={columns.length + 1} className="p-4 text-center text-slate-500">No records found.</td></tr>
          )}
          {data.map((row) => (
            <tr key={row._id || row.id} className="border-t">
              {columns.map((c) => <td key={c.key} className="p-3 align-top">{c.render ? c.render(row) : row[c.key]}</td>)}
              {actions && <td className="p-3">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
