import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { reactive } from "vue";

const users = reactive({
  list: [],
  pagination: {
    rowsPerPage: 15,
    rowsNumber: 0,
    page: 0,
    descending: true,
  },
  columns: userColumns(),
  getList: getList,
  showAddEditForm: false,
  form: initForm(),
  reset: resetForm,
  add: onSubmitForm,
  loadingTable: false,
  loadingSubmitButton: false,
});
async function onSubmitForm() {
  users.loadingTable = true;
  users.loadingSubmitButton = true;

  try {
    const res = await api.request({
      url: users.form.id ? `users/${users.form.id}` : `users`,
      method: users.form.id ? "patch" : "post",
      data: {
        ...users.form,
      },
      params: {
        ...users.pagination,
      },
    });

    users.list = res.data.data;
    users.pagination.rowsNumber = res.data.total;
    users.showAddEditForm = false;
  } catch (error) {
    console.error(error.message);
    Notify.create(error.response?.data?.message ?? error?.message);
  }
  users.loadingTable = false;
  users.loadingSubmitButton = false;
}
async function getList(props) {
  users.loadingTable = true;
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
    Notify.create(error.response?.data?.message ?? error?.message);
  }
  users.loadingTable = false;
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

    {
      name: "actions",
      label: "",
    },
  ];
}

function initForm() {
  return {
    id: null,
    name: "",
    phone: "",
    corp: null,
  };
}
function resetForm() {
  users.form = {
    id: null,
    name: "",
    phone: "",
    corp: null,
  };
}

// function resetForm() {
//   return {
//     id: null,
//     name: '',
//   }
// }

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
