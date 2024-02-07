import { date } from "quasar";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { reactive } from "vue";

const attendances = reactive({
  selectedDate: undefined,
  showAddEditForm: false,
  showActions: true,
  loadingTable: false,
  loadingSubmitButton: false,
  is_executive: false,
  selectedTag: "Meeting",
  list: [],
  users: [],
  selectedList: [],
  pagination: {
    descending: true,
    rowsPerPage: 15,
    rowsNumber: 0,
    page: 0,
    is_executive: false,
  },
  columns: attendanceColumns(),
  form_columns: attendanceFormColumns(),
  form: initForm(),
  create: getUsersForAttendance,
  update: getUsersForEditAttendance,
  getList: getList,
  reset: resetForm,
  save: onSubmitForm,
  show: show,
});

async function show(route, router) {
  try {
    attendances.loadingTable = true;
    const res = await api.get(`attendances/${route.params._id}`);
    attendances.form = res.data;
    console.log(res.data);
    attendances.users = res.data.users ?? [];
    attendances.is_executive = route.query.executive ? true : false;
    attendances.loadingTable = false;
  } catch (error) {
    attendances.loadingTable = false;
    Notify.create(error.response?.data?.message ?? error?.message);
  }
}
async function onSubmitForm(route, router) {
  let id = route.params._id;
  let is_executive = route.query.executive ?? 0;
  attendances.loadingTable = true;
  attendances.loadingSubmitButton = true;
  try {
    const res = await api.request({
      url: id != "add" ? `attendances/${id}` : `attendances`,
      method: id != "add" ? "patch" : "post",
      data: {
        attend_list: attendances.selectedList,
        tag: attendances.selectedTag,
        date: attendances.selectedDate,
        is_executive: attendances.is_executive,
      },
      params: {
        ...attendances.pagination,
      },
    });

    attendances.list = res.data.data;
    attendances.pagination.rowsNumber = res.data.total;
    attendances.showAddEditForm = false;
    attendances.pagination.is_executive = attendances.is_executive;
    router.push({
      name: "attendances",
    });
  } catch (error) {
    console.error(error.message);
    Notify.create(error.response?.data?.message ?? error?.message);
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
    Notify.create(error.response?.data?.message ?? error?.message);
  }
  attendances.loadingTable = false;
}
function attendanceColumns() {
  return [
    {
      label: "Date",
      name: "date",
      align: "left",
      field: (row) => date.formatDate(row.date, "Do MMM, 'YY"),
    },

    {
      label: "Att.",
      name: "no_of_attendant",
      align: "left",
      field: (row) => row.no_of_attendant ?? "N/A",
    },
    // {
    //   label: "tag",
    //   name: "tag",
    //   align: "left",
    //   field: (row) => row.tag ?? "N/A",
    // },

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
      label: "Bial",
      name: "bial",
      align: "left",
      field: (row) => row.bial,
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
async function getUsersForAttendance(route) {
  try {
    attendances.loadingTable = true;
    const res = await api.get(
      `attendances/create?executive=${route.query.executive ?? 0}`
    );
    attendances.users = res.data ?? [];

    attendances.is_executive = route.query.executive ? true : false;
    attendances.loadingTable = false;
  } catch (error) {
    attendances.loadingTable = false;
    console.error(error.message);
    Notify.create(error.response?.data?.message ?? error?.message);
  }
}
async function getUsersForEditAttendance(id) {
  try {
    attendances.loadingTable = true;
    const res = await api.get(`attendances/${id}/edit`);
    attendances.users = res.data.users ?? [];
    attendances.selectedList = res.data.attend_list ?? [];
    attendances.is_executive = res.data.is_executive;
    attendances.loadingTable = false;
  } catch (error) {
    attendances.loadingTable = false;
    console.error(error.message);
    Notify.create(error.response?.data?.message ?? error?.message);
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
