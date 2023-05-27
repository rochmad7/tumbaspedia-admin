import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { Icon } from "../../../Component";
import { TotalCustomerChart } from "../../charts/e-commerce/EcomCharts";
import { getUsersReport } from "../../../../functions/dashboard";
import MyLoader from "../loader/Loader";

const Customer = (props) => {
  const { selectedDate } = props;
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsersReport = async (date) => {
    const response = await getUsersReport(date);
    return response.data.data;
  };

  useEffect(() => {
    let data;

    const fetchData = async () => {
      setLoading(true);

      data = await fetchUsersReport(selectedDate);

      setLoading(false);
    };

    fetchData().then(() => {
      setReportData(data);
    });
  }, [selectedDate]);

  return (
    <Card className="is-light h-100">
      <div className="nk-ecwg nk-ecwg3">
        <div className="card-inner pb-0">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Total Akun Pembeli</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
                <div className="amount">{reportData.total_buyers_count}</div>
              {/*<div className="info text-right">*/}
              {/*  <span className="change up text-danger">*/}
              {/*    <Icon name="arrow-long-up"></Icon>4.63%*/}
              {/*  </span>*/}
              {/*  <br />*/}
              {/*  <span>vs. last week</span>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
        <div className="card-inner pb-0">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Total Akun Penjual</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              <div className="amount">{reportData.total_shops_count}</div>
              {/*<div className="info text-right">*/}
              {/*  <span className="change up text-danger">*/}
              {/*    <Icon name="arrow-long-up"></Icon>4.63%*/}
              {/*  </span>*/}
              {/*  <br />*/}
              {/*  <span>vs. last week</span>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
        <div className="card-inner pb-0">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Jumlah Akun Pembeli Baru
                Bulan {selectedDate.toLocaleString("id-ID", { month: "long" })} {selectedDate.getFullYear()}</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              {loading ? MyLoader() : (

                <div className="amount">{reportData.monthly_buyers_count}</div>
              )}
              {/*<div className="info text-right">*/}
              {/*  <span className="change up text-danger">*/}
              {/*    <Icon name="arrow-long-up"></Icon>4.63%*/}
              {/*  </span>*/}
              {/*  <br />*/}
              {/*  <span>vs. last week</span>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
        <div className="card-inner pb-0">
          <div className="card-title-group">
            <div className="card-title">
              <h6 className="title">Jumlah Akun Penjual Baru
                Bulan {selectedDate.toLocaleString("id-ID", { month: "long" })} {selectedDate.getFullYear()}</h6>
            </div>
          </div>
          <div className="data">
            <div className="data-group">
              {loading ? MyLoader() : (

                <div className="amount">{reportData.monthly_shops_count}</div>
              )}
              {/*<div className="info text-right">*/}
              {/*  <span className="change up text-danger">*/}
              {/*    <Icon name="arrow-long-up"></Icon>4.63%*/}
              {/*  </span>*/}
              {/*  <br />*/}
              {/*  <span>vs. last week</span>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
        {/*<div className="nk-ecwg3-ck">*/}
        {/*  <TotalCustomerChart />*/}
        {/*</div>*/}
      </div>
    </Card>
  );
};
export default Customer;
