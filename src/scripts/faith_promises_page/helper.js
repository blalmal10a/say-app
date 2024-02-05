import { date } from "quasar";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { reactive } from "vue";

const faith_promises = reactive({
  detail: {},
  createDialog: false,
  selectedDate: undefined,
  showAddEditForm: false,
  loadingTable: false,
  loadingSubmitButton: false,
  is_executive: false,
  payment_status: "All",
  selectedTag: "Fellowship",
  list: [],
  users: [],
  all_members: [],
  selectedList: [],
  paid_list: [],
  pagination: {
    descending: true,
    rowsPerPage: 15,
    rowsNumber: 0,
    page: 0,
  },
  columns: faith_promiseColumns(),
  form_columns: faith_promiseFormColumns(),
  form: initForm(),
  create: getUsersForFaithPromise,
  update: getUsersForEditFaithPromise,
  getList: getList,
  reset: resetForm,
  save: onSubmitForm,
  onSelectPaymentFilter,
  show,
  onBlurAmount,
  checkMonthExists
});

async function checkMonthExists(index, router) {
  try {
    faith_promises.loadingTable = true;
    faith_promises.selectedDate = date.formatDate((new Date()).setMonth(index, 1), 'YYYY-MM-DD')
    const { data } = await api.get(`faith-promises/check-month-exists?date=${faith_promises.selectedDate}`)

    router.push({
      name: 'faith-promise-detail',
      params: {
        _id: data._id
      }
    })
    const route = {
      params: { ...data }
    }
    await faith_promises.show(route)
    faith_promises.createDialog = false;

  } catch (error) {
    if (error.response?.status == 404) faith_promises.createDialog = false;
    //
  }
}

async function onBlurAmount(data, route) {

  if (data.amount == '') return;

  const payment = {
    user_id: data._id,
    amount: data.amount,
    faith_promise_id: route.params?._id,
  }
  api.post('faith-promise-payments', payment);
}

async function show(route, router) {
  try {
    faith_promises.loadingTable = true;
    const res = await api.get(`faith-promises/${route.params._id}`);

    faith_promises.detail = res.data;
    faith_promises.users = res.data.pending;
    faith_promises.paid_list = res.data.paid;
    faith_promises.loadingTable = false;
    faith_promises.selectedDate = res.data.month;
  } catch (error) {
    faith_promises.loadingTable = false;
    console.error(error.message);
  }
}
function onSelectPaymentFilter(data) {
  if (data == "All") faith_promises.users = [...faith_promises.all_members];
  else if (data == "Pending") {
    faith_promises.users = faith_promises.all_members.filter((user) => {
      if (user.amount < 1) return user;
    });
  } else if (data == "Paid") {
    faith_promises.users = faith_promises.all_members.filter((user) => {
      if (user.amount >= 1) return user;
    });
  }
}
async function onSubmitForm(route, router, pending) {
  try {
    let id = route.params._id ?? faith_promises.detail?._id;
    faith_promises.loadingSubmitButton = true;
    const res = await api.patch(`faith-promises/${id}`)

    faith_promises.detail = res.data
    faith_promises.loadingSubmitButton = false;
  } catch (error) {
    faith_promises.loadingSubmitButton = false;

  }
  return;


  let is_executive = route.query.executive ?? 0;
  faith_promises.loadingTable = true;
  faith_promises.loadingSubmitButton = true;
  try {
    const res = await api.request({
      url: id != "add" ? `faith-promises/${id}` : `faith-promises`,
      method: id != "add" ? "patch" : "post",
      data: {
        faith_promise_data: faith_promises.users,
        month: faith_promises.selectedDate,
        pending,
      },
      params: {
        ...faith_promises.pagination,
      },
    });

    // faith_promises.list = [...res.data.data];
    // faith_promises.pagination.rowsNumber = res.data.total;
    faith_promises.showAddEditForm = false;
    router.push({
      name: "faith-promises",
    });
  } catch (error) {
    console.error(error.message);
    Notify.create(error.response?.data?.message ?? error?.message);
  }
  faith_promises.loadingTable = false;
  faith_promises.loadingSubmitButton = false;
}
async function getList(props) {
  faith_promises.loadingTable = true;
  try {
    if (props) {
      faith_promises.pagination = props.pagination;
    }

    const res = await api.get("faith-promises", {
      params: faith_promises.pagination,
    });
    faith_promises.list = res.data?.data ?? [];
    faith_promises.pagination.rowsNumber = res.data?.total;
  } catch (error) {
    console.error(error.message);
    Notify.create(error.response?.data?.message ?? error?.message);
  }
  faith_promises.loadingTable = false;
}
function faith_promiseColumns() {
  return [
    {
      label: "Month",
      name: "month",
      align: "left",
      field: (row) => date.formatDate(row.month, "MMMM, YYYY"),
    },
    {
      label: "Amount",
      name: "amount",
      align: "left",
      field: (row) => row.total_amount ? `₹${row.total_amount}` : 'N/A',
    },

    {
      name: "actions",
      label: "",
    },
  ];
}

function faith_promiseFormColumns() {
  return [
    {
      label: "name",
      name: "name",
      align: "left",
      field: (row) => row.name ?? row.user?.name,
    },
    {
      label: "Amount",
      name: "amount",
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
  faith_promises.form = {
    id: null,
    name: "",
    phone: "",
    corp: null,
  };
}
async function getUsersForFaithPromise(route) {
  try {
    faith_promises.loadingTable = true
    const res = await api.get(
      `faith-promises/create?executive=${route.query.executive ?? 0}`
    );
    faith_promises.users = res.data ?? [];

    faith_promises.all_members = [...res.data];
    faith_promises.is_executive = route.query.executive ? true : false;
    faith_promises.loadingTable = false
  } catch (error) {
    faith_promises.loadingTable = false
    console.error(error.message);
    Notify.create(error.response?.data?.message ?? error?.message);
  }
}
async function getUsersForEditFaithPromise(id) {
  try {
    faith_promises.loadingTable = true;
    const res = await api.get(`faith-promises/${id}/edit`);

    faith_promises.users = res.data.details ?? [];
    faith_promises.all_members = [...res.data.details];

    // faith_promises.is_executive = route.query.executive ? true : false;
    // faith_promises.users = res.data.users ?? [];
    // faith_promises.selectedList = res.data.attend_list ?? [];
    // faith_promises.is_executive = res.data.is_executive;
    faith_promises.selectedDate = res.data.month;
    faith_promises.loadingTable = false;
  } catch (error) {
    faith_promises.loadingTable = false;
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

// function faith_promiseColumns() {
//   return [
//     {
//       name: "first",
//       label: "first",
//       align: "left",
//       field: (row) => row.first,
//     },
//   ];
// }

export { faith_promises };
