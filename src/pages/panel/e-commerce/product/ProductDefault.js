import React, { useEffect, useState } from "react";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import DatePicker from "react-datepicker";
import { orderData } from "./OrderData";
import {
  Block,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  BlockHead,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  TooltipComponent,
  PaginationComponent,
  PreviewAltCard,
  Row,
  Col,
  RSelect
} from "../../../../components/Component";
import { getDateStructured } from "../../../../utils/Utils";
import {
  UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody, Badge
} from "reactstrap";
import { useForm } from "react-hook-form";
import { getShops } from "../../../../functions/shop";
import { getAllTransactions } from "../../../../functions/transaction";
import { getProducts, setPromoteProduct, updateProduct } from "../../../../functions/product";
import { productData } from "./ProductData";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import moment from "moment";

const ProductDefault = () => {
  const [data, setData] = useState(productData);
  const [smOption, setSmOption] = useState(false);
  const [formData, setFormData] = useState({
    id: null, orderId: "", date: new Date(), status: "", customer: "", purchased: "", total: "", check: false
  });
  const [view, setView] = useState({
    add: false, details: false
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [confirmModal, setConfirmModal] = useState(false);
  const [promotionItem, setPromotionItem] = useState(productData);
  const [isPromoted, setIsPromoted] = useState(false);

  const fetchProducts = async (search) => {
    const transactionResponse = await getProducts("date", search, 100);
    return transactionResponse.data.data;
  };

  const promoteProduct = async (id, isPromoted) => {
    await setPromoteProduct(id, { is_promoted: isPromoted });
    setConfirmModal(false);
    await Swal.fire({
      title: "Sukses", text: isPromoted ? "Produk berhasil dipromosikan" : "Promosi produk dibatalkan"
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Changing state value when searching name
  useEffect(() => {
    let newData;
    let productData;

    // if (onSearchText !== "") {
    //   const filteredObject = orderData.filter((item) => {
    //     return item.orderId.includes(onSearchText);
    //   });
    //   setData([...filteredObject]);
    // } else {
    //   setData([...orderData]);
    // }
    const fetchData = async () => {
      newData = await fetchProducts(onSearchText);
      productData = newData;
    };

    fetchData().then(() => {
      setData(productData);
    });
  }, [onSearchText]);

  // toggle function to view order details
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false, details: type === "details" ? true : false
    });
  };

  // selects all the order
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // selects one order
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // resets forms
  const resetForm = () => {
    setFormData({
      id: null, orderId: "", date: new Date(), status: "", customer: "", purchased: "", total: "", check: false
    });
  };

  const onFormSubmit = (form) => {
    const { customer, purchased, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      total: total,
      check: false
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
  };

  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item.id === id);
    setFormData(data[index]);
  };

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    resetForm();
  };

  // function to change to approve property for an item
  const markAsDelivered = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Delivered";
    setData([...newData]);
  };

  // function to delete a Order
  const deleteOrder = (id) => {
    let defaultData = data;
    defaultData = defaultData.filter((item) => item.id !== id);
    setData([...defaultData]);
  };

  // function to delete the seletected item
  const selectorDeleteOrder = () => {
    let newData;
    newData = data.filter((item) => item.check !== true);
    setData([...newData]);
  };

  // function to change the complete property of an item
  const selectorMarkAsDelivered = () => {
    let newData;
    newData = data.map((item) => {
      if (item.check === true) item.status = "Delivered";
      return item;
    });
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  return (<React.Fragment>
      <Head title="Produk"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Produk</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Cari nama produk"
                          onChange={(e) => onFilterChange(e)}
                        />
                      </div>
                    </li>
                    {/*<li className="nk-block-tools-opt">*/}
                    {/*  <Button*/}
                    {/*    className="toggle btn-icon d-md-none"*/}
                    {/*    color="primary"*/}
                    {/*    onClick={() => {*/}
                    {/*      toggle("add");*/}
                    {/*    }}*/}
                    {/*  >*/}
                    {/*    <Icon name="plus"></Icon>*/}
                    {/*  </Button>*/}
                    {/*  <Button*/}
                    {/*    className="toggle d-none d-md-inline-flex"*/}
                    {/*    color="primary"*/}
                    {/*    onClick={() => {*/}
                    {/*      toggle("add");*/}
                    {/*    }}*/}
                    {/*  >*/}
                    {/*    <Icon name="plus"></Icon>*/}
                    {/*    <span>Add Order</span>*/}
                    {/*  </Button>*/}
                    {/*</li>*/}
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              {/*<DataTableRow className="nk-tb-col-check">*/}
              {/*  <div className="custom-control custom-control-sm custom-checkbox notext">*/}
              {/*    <input*/}
              {/*      type="checkbox"*/}
              {/*      className="custom-control-input form-control"*/}
              {/*      id="pid-all"*/}
              {/*      onChange={(e) => selectorCheck(e)}*/}
              {/*    />*/}
              {/*    <label className="custom-control-label" htmlFor="pid-all"></label>*/}
              {/*  </div>*/}
              {/*</DataTableRow>*/}
              <DataTableRow>
                <span className="sub-text">ID</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Produk</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Penjual</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Harga</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Terjual</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Kategori</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Aksi</span>
              </DataTableRow>
              {/*<DataTableRow>*/}
              {/*  <span className="sub-text">Status</span>*/}
              {/*</DataTableRow>*/}

              {/*<DataTableRow className="nk-tb-col-tools">*/}
              {/*  <ul className="nk-tb-actions gx-1 my-n1">*/}
              {/*    <li>*/}
              {/*      <UncontrolledDropdown>*/}
              {/*        <DropdownToggle tag="a" className="btn btn-trigger dropdown-toggle btn-icon mr-n1">*/}
              {/*          <Icon name="more-h"></Icon>*/}
              {/*        </DropdownToggle>*/}
              {/*        <DropdownMenu right>*/}
              {/*          <ul className="link-list-opt no-bdr">*/}
              {/*            <li>*/}
              {/*              <DropdownItem*/}
              {/*                tag="a"*/}
              {/*                href="#markasdone"*/}
              {/*                onClick={(ev) => {*/}
              {/*                  ev.preventDefault();*/}
              {/*                  selectorMarkAsDelivered();*/}
              {/*                }}*/}
              {/*              >*/}
              {/*                <Icon name="truck"></Icon>*/}
              {/*                <span>Mark As Delivered</span>*/}
              {/*              </DropdownItem>*/}
              {/*            </li>*/}
              {/*            <li>*/}
              {/*              <DropdownItem*/}
              {/*                tag="a"*/}
              {/*                href="#remove"*/}
              {/*                onClick={(ev) => {*/}
              {/*                  ev.preventDefault();*/}
              {/*                  selectorDeleteOrder();*/}
              {/*                }}*/}
              {/*              >*/}
              {/*                <Icon name="trash"></Icon>*/}
              {/*                <span>Remove Orders</span>*/}
              {/*              </DropdownItem>*/}
              {/*            </li>*/}
              {/*          </ul>*/}
              {/*        </DropdownMenu>*/}
              {/*      </UncontrolledDropdown>*/}
              {/*    </li>*/}
              {/*  </ul>*/}
              {/*</DataTableRow>*/}
            </DataTableHead>

            {currentItems.length > 0 ? currentItems.map((item) => (<DataTableItem key={item.id}>
                <DataTableRow>
                  <a href="" onClick={(ev) => ev.preventDefault()}>
                    #{item.id}
                  </a>
                </DataTableRow>
                <DataTableRow>
                  <span className="tb-sub">{item.name}</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="tb-sub text-primary">{item.shop.name}</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="tb-sub">{item.price}</span>
                </DataTableRow>
                {/*<DataTableRow size="md">*/}
                {/*  <span className="tb-sub text-primary">{item.user.name}</span>*/}
                {/*</DataTableRow>*/}
                <DataTableRow size="md">
                  <span className="tb-lead">{item.sold}</span>
                </DataTableRow>
                <DataTableRow>
                  <span className="tb-lead text-warning">{item.category.name}</span>
                </DataTableRow>
                <DataTableRow>
                    <span className="tb-sub">
                      <Button
                        color="primary"
                        size="sm"
                        className="ml-1 mt-1 mt-md-0"
                        onClick={() => {
                          setConfirmModal(true);
                          setPromotionItem(item);
                          setIsPromoted(true);
                        }}
                      >
                        <Icon name="edit" className="mr-1"></Icon>
                        Promosi
                      </Button>
                      {item.category.id === 1 ? (<>
                          <Button
                            color="danger"
                            size="sm"
                            className="ml-1 mt-1 mt-md-0"
                            onClick={() => {
                              setConfirmModal(true);
                              setPromotionItem(item);
                              setIsPromoted(false);
                            }}
                          >
                            <Icon name="trash"></Icon>
                            Batalkan Promosi
                          </Button>
                          <div style={{ display: "flex", alignItems: "flex-end" }}>
<span className="tb-sub text-primary ml-1 mt-1" style={{ fontSize: "0.8rem" }}>
Dipromosikan pada {moment(item.promoted_at).format("DD-MM-YYYY")}
</span>
                          </div>
                        </>) : null}
                    </span>
                </DataTableRow>

              </DataTableItem>)) : null}

            <Modal
              isOpen={confirmModal}
              toggle={() => setConfirmModal(false)}
              className="modal-dialog-centered"
              size="md"
              style={{ maxWidth: "400px" }}
            >
              <ModalBody className="d-flex flex-column align-items-center justify-content-center">
                <div className="position-absolute" style={{ top: "0", right: "0", padding: "12px" }}>
                  <a href="#cancel" onClick={(ev) => {
                    ev.preventDefault();
                    setConfirmModal(false);
                  }} className="close">
                    <Icon name="x" />
                  </a>
                </div>
                <div className="text-center mb-4">
                  <h5 className="title mb-0">
                    {isPromoted ? "" : "Batalkan "}Promosi Produk {promotionItem.name}?
                  </h5>
                  <Icon
                    name={isPromoted ? "check-circle" : "alert-circle"}
                    className={isPromoted ? "text-success" : "text-danger"}
                    style={{ fontSize: "5rem" }}
                  />
                </div>
                <div className="d-flex justify-content-between w-100">
                  <Button color="primary" size="lg" onClick={() => promoteProduct(promotionItem.id, isPromoted)}>
                    {!isPromoted ? "Batalkan Promosi" : "Promosi"}
                  </Button>
                  <Button className="link link-light ml-3" onClick={() => setConfirmModal(false)}>
                    Batal
                  </Button>
                </div>
              </ModalBody>
            </Modal>
          </div>
          <PreviewAltCard>
            {data.length > 0 ? (<PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />) : (<div className="text-center">
                <span className="text-silent">Transaksi tidak ditemukan</span>
              </div>)}
          </PreviewAltCard>
        </Block>

        <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add Order</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Customer Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required"
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="date">
                          Date of order
                        </label>
                        <div className="form-control-wrap">
                          <DatePicker
                            selected={formData.date}
                            className="form-control"
                            onChange={(date) => setFormData({ ...formData, date: date })}
                          />
                          {errors.date && <span className="invalid">{errors.date.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Purchased Product
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="total">
                          Total Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="total"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.total}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          Status
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[{ value: "On Hold", label: "On Hold" }, {
                              value: "Delivered",
                              label: "Delivered"
                            }]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Add Order</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-tnx-details mt-sm-3">
              <div className="nk-modal-head mb-3">
                <h5 className="title">Order Details</h5>
              </div>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Order Id</span>
                  <span className="caption-text">{formData.orderId}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Status</span>
                  <span
                    className={`dot bg-${formData.status === "Delivered" ? "success" : "warning"} d-mb-none`}
                  ></span>
                  <span
                    className={`badge badge-sm badge-dot has-bg badge-${formData.status === "Delivered" ? "success" : "warning"} d-none d-mb-inline-flex`}
                  >
                    {formData.status}
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Customer</span>
                  <span className="caption-text">{formData.customer}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Purchased Product</span>
                  <span className="caption-text">{formData.purchased}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Total Price</span>
                  <span className="caption-text">{formData.total}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>);
};

export default ProductDefault;
