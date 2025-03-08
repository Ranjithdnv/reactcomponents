import React from "react";

import Table from ".";

export default {
  title: "Atomic Design/organisms/Table",
  component: Table,
};

const Template = (args) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        firstName: "David",
        lastName: "Son",
      },
      {
        firstName: "Yuvan",
        lastName: "raja",
      },
    ],
    []
  );

  return <Table bordered columns={columns} data={data} setPageIndex={setPageIndex}/>;
};

export const Default = Template.bind({});
Default.args = {};
