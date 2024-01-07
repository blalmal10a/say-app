import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { reactive } from "vue";

const designations = reactive({
  list: [],
  pagination: {
    rowsPerPage: 15,
    rowsNumber: 0,
    page: 0,
    descending: false,
    orderBy: "order",
  },
  columns: designationColumns(),
  getList: getList,
  showAddEditForm: false,
  form: initForm(),
  reset: resetForm,
  add: onSubmitForm,
  loadingTable: false,
  loadingSubmitButton: false,
});
async function onSubmitForm() {
  designations.loadingTable = true;
  designations.loadingSubmitButton = true;

  try {
    const res = await api.request({
      url: designations.form.id
        ? `designations/${designations.form.id}`
        : `designations`,
      method: designations.form.id ? "patch" : "post",
      data: {
        ...designations.form,
      },
      params: {
        ...designations.pagination,
      },
    });

    designations.list = res.data.data;
    designations.pagination.rowsNumber = res.data.total;
    designations.showAddEditForm = false;
  } catch (error) {
    console.error(error.message);
    Notify.create(error.response?.data?.message ?? error?.message);
  }
  designations.loadingTable = false;
  designations.loadingSubmitButton = false;
}
async function getList(props) {
  designations.loadingTable = true;
  try {
    if (props) {
      designations.pagination = props.pagination;
    }

    const res = await api.get("designations", {
      params: designations.pagination,
    });
    designations.list = res.data?.data ?? [];
    designations.pagination.rowsNumber = res.data?.total;
  } catch (error) {
    console.error(error.message);
    Notify.create(error.response?.data?.message ?? error?.message);
  }
  designations.loadingTable = false;
}
function designationColumns() {
  return [
    {
      name: "name",
      label: "name",
      align: "left",
      field: (row) => row.name,
    },

    // {
    //   name: "phone",
    //   label: "phone",
    //   align: "left",
    //   field: (row) => row.phone,
    // },

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
  designations.form = {
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

// function designationColumns() {
//   return [
//     {
//       name: "first",
//       label: "first",
//       align: "left",
//       field: (row) => row.first,
//     },
//   ];
// }

export { designations };
