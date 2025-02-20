import { Modal, Button, message } from "antd";
import React, { useState } from "react";
import UserIcon from "../../Icons/User";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [loading, setloading] = useState(false);
  const [step, setStep] = useState(false);
  function onSubmit(data) {
    console.log(data);
    setloading(true);
    axios
      .post(`https://gateway.texnomart.uz/api/common/v1/user/register`, data)
      .then((res) => {
        console.log(res.data);

        message.success("ishladi");
        setStep(true);

        setloading(false);
      });
  }
  return (
    <>
      <Button
        onClick={() => {
          setisModalOpen(true);
        }}
      >
        <UserIcon />
      </Button>
      <Modal
        open={isModalOpen}
        onOk={() => {
          setisModalOpen(false);
        }}
        onCancel={() => {
          setisModalOpen(false);
        }}
        footer={false}
      >
        <h1> Kirish yoki ro'yxatdan o'tish</h1>
        {step === false ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-2 flex flex-col gap-2"
          >
            <div className="text-lg flex flex-col gap1">
              <label>Telefon</label>
              <input
                className="border border-gray-500"
                type="number"
                size="large"
                {...register("example")}
              />
            </div>
            <div className=" text-lg flex flex-col gap1">
              <label>Ism</label>
              <input
                className="border border-gray-500"
                size="large"
                {...register("first_name", { required: true })}
              />
            </div>
            <div className="flex justify-center ">
              <Button
                htmlType="submit"
                type="primary"
                className="custom-buttom"
                size="large"
                loading={loading}
              >
                KODNI OLISH
              </Button>
            </div>
          </form>
        ) : (
          <div
            onOk={() => {
              setisModalOpen(false);
            }}
            onCancel={() => {
              setisModalOpen(false);
            }}
            footer={false}
            className="mt-2 flex flex-col gap-2"
          >
            <input
              className="border border-gray-500"
              type="number"
              size="large"
            />
            <Button
              htmlType="submit"
              type="primary"
              className="custom-buttom"
              size="large"
              loading={loading}
            >
              SMS kodni kiriting
               Raqamga kod yuborildi
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
export default Login;
