import React, { useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Col, Row } from "../../../components/Component";
import RecentOrders from "../../../components/partials/default/recent-orders/RecentOrders";
import TopProducts from "../../../components/partials/default/top-products/TopProducts";
import AverageOrder from "../../../components/partials/e-commerce/average-order/AverageOrder";
import Customer from "../../../components/partials/e-commerce/customers/Customer";
import Orders from "../../../components/partials/e-commerce/orders/Orders";
import TotalSales from "../../../components/partials/e-commerce/total-sales/TotalSales";
import StoreStatistics from "../../../components/partials/default/StoreStatistics";
import TrafficSources from "../../../components/partials/e-commerce/traffic-sources/TrafficSources";
import StoreVisitors from "../../../components/partials/e-commerce/store-visitors/StoreVisitors";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <React.Fragment>
      <Head title="Dashboard"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Dashboard</BlockTitle>
              <BlockTitle>
                <div className="card-tools mt-4">
                  <button className="btn btn-sm btn-primary"
                          onClick={() => setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))}>
                    Bulan Sebelumnya
                  </button>
                  <button className="btn btn-sm btn-info ml-2" hidden={selectedDate.getMonth() === new Date().getMonth()}
                          onClick={() => setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))}>
                    Bulan Berikutnya
                  </button>
                </div>
                <div className="card-tools mt-3">
                  <h4 className="title">{selectedDate.toLocaleString("id-ID", { month: "long" })} {selectedDate.getFullYear()}</h4>
                </div>
              </BlockTitle>

            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            <Col xxl="4" md="6">
              <TotalSales selectedDate={selectedDate} />
            </Col>
            {/*<Col xxl="4" md="6">*/}
            {/*  <AverageOrder />*/}
            {/*</Col>*/}
            <Col xxl="4" md="6">
              {/*<Row className="g-gs">*/}
              {/*  <Col xxl="12">*/}
              {/*    <Orders />*/}
              {/*  </Col>*/}
              {/*  <Col xxl="12">*/}
                  <Customer selectedDate={selectedDate} />
                {/*</Col>*/}
              {/*</Row>*/}
            </Col>
            {/*<Col xxl="8">*/}
            {/*  <RecentOrders />*/}
            {/*</Col>*/}
            {/*<Col xxl="4" md="6">*/}
            {/*  <TopProducts />*/}
            {/*</Col>*/}
            {/*<Col xxl="3" md="6">*/}
            {/*  <StoreStatistics />*/}
            {/*</Col>*/}
            {/*<Col xxl="5" lg="6">*/}
            {/*  <TrafficSources />*/}
            {/*</Col>*/}
            {/*<Col xxl="4" lg="6">*/}
            {/*  <StoreVisitors />*/}
            {/*</Col>*/}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Dashboard;
