import { api } from "src/boot/axios";
import { reactive } from "vue";

const users = reactive({
  list: [],
  pagination: {
    rowsPerPage: 15,
    rowsNumber: 0,
    page: 0,
  },
  columns: userColumns(),
  getList: getList,
});

async function getList(props) {
  try {
    if (props) {
      users.pagination = props.pagination;
    }

    const res = await api.get("users", {
      params: users.pagination,
    });
    users.list = res.data?.data ?? [];
    users.pagination.rowsNumber = res.data?.total;
  } catch (error) {
    console.error(error.message);
  }
}
function userColumns() {
  return [
    {
      name: "name",
      label: "name",
      align: "left",
      field: (row) => row.name,
    },

    {
      name: "phone",
      label: "phone",
      align: "left",
      field: (row) => row.phone,
    },
  ];
}

// function userColumns() {
//   return [
//     {
//       name: "first",
//       label: "first",
//       align: "left",
//       field: (row) => row.first,
//     },
//   ];
// }

export { users };
