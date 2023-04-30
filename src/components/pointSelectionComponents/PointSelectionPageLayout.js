import React from "react";
import Header from "./tableComponents/headingComponent/Header";
import TableLayout from "./tableComponents/TableLayout/TableLayout";

function PointSelectionPageLayout() {
  const rows = [
    [100, 100, 100, 100, 100, 100],
    [200, 200, 200, 200, 200, 200],
    [300, 300, 300, 300, 300, 300],
    [600, 600, 600, 600, 600, 600],
    [1000, 1000, 1000, 1000, 1000, 1000],
  ];

  const headings = [
    "Column 1",
    "Column 2",
    "Column 3",
    "Column 4",
    "Column 5",
    "Column 6",
  ];
  return (
    <>
      <Header />
      <TableLayout rows={rows} headings={headings} />
    </>
  );
}

export default PointSelectionPageLayout;
