import React from 'react'

export const Table = ({ children }) => {
    return (
        <div className="rounded-lg">
            <table className="w-full mt-4 table-auto border-collapse bg-white shadow-md rounded-lg">
                {children}
            </table>
        </div>
    );
}

export const TableHeader = ({ children }) => {
    return <thead className="bg-gray-200 opacity-60">{children}</thead>;
};

export const TableRow = ({ children }) => {
    return <tr className="even:bg-gray-50 odd:bg-white hover:bg-gray-100">{children}</tr>;
};

export const TableHead = ({ children }) => {
    return <th className="text-left text-black p-4 font-semibold">{children}</th>;
};

export const TableBody = ({ children }) => {
    return <tbody className="divide-y divide-gray-200">{children}</tbody>;
};

export const TableCell = ({ children }) => {
    return <td className="p-4">{children}</td>;
};