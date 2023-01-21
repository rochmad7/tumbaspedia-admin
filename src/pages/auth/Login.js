import React, { useState } from "react";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard
} from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { login } from "../../functions/auth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const onFormSubmit = async (formData) => {
    setLoading(true);
    const loginResponse = await login(formData.email, formData.password)

    // if (formData.name === loginName && formData.passcode === pass) {
    if (loginResponse.data !== undefined) {
      const token = loginResponse.data.access_token;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userName", loginResponse.data.user.name);
      localStorage.setItem("userEmail", loginResponse.data.user.email);
      setTimeout(() => {
        window.history.pushState(
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
          "auth-login",
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
        );
        window.location.reload();
      }, 2000);
    } else {
      setTimeout(() => {
        setError("Cannot login with credentials");
        setLoading(false);
      }, 2000);
    }
  };

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Masuk" ><title>Masuk</title></Head>
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Masuk</BlockTitle>
                <BlockDes>
                  <p>Silakan masukkan email dan kata sandi Anda.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Tidak bisa masuk dengan identitas tersebut.{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="email"
                    ref={register({ required: "Kolom ini wajib diisi" })}
                    // defaultValue="info@softnio.com"
                    placeholder="Masukkan email Anda"
                    className="form-control-lg form-control"
                  />
                  {errors.email && <span className="invalid">{errors.email.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Kata sandi
                  </label>
                  {/*<Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>*/}
                  {/*  Forgot Code?*/}
                  {/*</Link>*/}
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="password"
                    // defaultValue="123456"
                    ref={register({ required: "Kolom ini wajib diisi" })}
                    placeholder="Masukkan password Anda"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Masuk"}
                </Button>
              </FormGroup>
            </Form>
            {/*<div className="form-note-s2 text-center pt-4">*/}
            {/*  {" "}*/}
            {/*  New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Create an account</Link>*/}
            {/*</div>*/}
            {/*<div className="text-center pt-4 pb-3">*/}
            {/*  <h6 className="overline-title overline-title-sap">*/}
            {/*    <span>OR</span>*/}
            {/*  </h6>*/}
            {/*</div>*/}
            {/*<ul className="nav justify-center gx-4">*/}
            {/*  <li className="nav-item">*/}
            {/*    <a*/}
            {/*      className="nav-link"*/}
            {/*      href="#socials"*/}
            {/*      onClick={(ev) => {*/}
            {/*        ev.preventDefault();*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      Facebook*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*  <li className="nav-item">*/}
            {/*    <a*/}
            {/*      className="nav-link"*/}
            {/*      href="#socials"*/}
            {/*      onClick={(ev) => {*/}
            {/*        ev.preventDefault();*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      Google*/}
            {/*    </a>*/}
            {/*  </li>*/}
            {/*</ul>*/}
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
