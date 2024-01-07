import { date } from "quasar";
import { api } from "src/boot/axios";
import { reactive } from "vue";

const attendances = reactive({
  showAddEditForm: false,
  loadingTable: false,
  loadingSubmitButton: false,
  list: [],
  users: [],
  selectedList: [],
  pagination: {
    descending: true,
    rowsPerPage: 15,
    rowsNumber: 0,
    page: 0,
  },
  columns: attendanceColumns(),
  form_columns: attendanceFormColumns(),
  form: initForm(),
  create: getUsersForAttendance,
  getList: getList,
  reset: resetForm,
  save: onSubmitForm,
});
async function onSubmitForm() {
  attendances.loadingTable = true;
  attendances.loadingSubmitButton = true;
  try {
    const res = await api.request({
      url: attendances.form.id
        ? `attendances/${attendances.form.id}`
        : `attendances`,
      method: attendances.form.id ? "patch" : "post",
      data: {
        attend_list: attendances.selectedList,
        tag: attendances.tag,
        date: attendances.selecteDate,
      },
      params: {
        ...attendances.pagination,
      },
    });

    attendances.list = res.data.data;
    attendances.pagination.rowsNumber = res.data.total;
    attendances.showAddEditForm = false;
  } catch (error) {
    console.error(error.message);
  }
  attendances.loadingTable = false;
  attendances.loadingSubmitButton = false;
}
async function getList(props) {
  attendances.loadingTable = true;
  try {
    if (props) {
      attendances.pagination = props.pagination;
    }

    const res = await api.get("attendances", {
      params: attendances.pagination,
    });
    attendances.list = res.data?.data ?? [];
    attendances.pagination.rowsNumber = res.data?.total;
  } catch (error) {
    console.error(error.message);
  }
  attendances.loadingTable = false;
}
function attendanceColumns() {
  return [
    {
      label: "Date",
      name: "date",
      align: "left",
      field: (row) => row.date,
    },
    {
      label: "tag",
      name: "tag",
      align: "left",
      field: (row) => row.tag ?? "N/A",
    },

    {
      name: "actions",
      label: "",
    },
  ];
}

function attendanceFormColumns() {
  return [
    {
      label: "name",
      name: "name",
      align: "left",
      field: (row) => row.name,
    },
    {
      label: "phone",
      name: "phone",
      align: "left",
      field: (row) => row.phone,
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
  attendances.form = {
    id: null,
    name: "",
    phone: "",
    corp: null,
  };
}
async function getUsersForAttendance() {
  try {
    const res = await api.get("attendances/create");
    attendances.users = res.data ?? [];
  } catch (error) {
    console.error(error.message);
  }
}
// function resetForm() {
//   return {
//     id: null,
//     name: '',
//   }
// }

// function attendanceColumns() {
//   return [
//     {
//       name: "first",
//       label: "first",
//       align: "left",
//       field: (row) => row.first,
//     },
//   ];
// }

export { attendances };
