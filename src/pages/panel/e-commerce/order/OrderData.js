export const orderData = [
  {
    id: 0,
    quantity: 0,
    total: "",
    status: "",
    created_at: "",
    shop: {
      id: 1,
      name: "",
    },
    user: {
      id: 1,
      name: "",
    },
    product: {
      id: 1,
      name: "",
    }
  },
];

export const statusOptions = [
  { value: "Paid", label: "Paid" },
  { value: "Due", label: "Due" },
  { value: "Canceled", label: "Cancelled" },
];

export const filterStatus = [
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "deleted", label: "Deleted" },
  { value: "rejected", label: "Rejected" },
];
