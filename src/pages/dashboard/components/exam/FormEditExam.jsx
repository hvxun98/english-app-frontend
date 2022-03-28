import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { updateExam } from "../../../../services/examService";
import { listQuestionRequest } from "../../../../services/gameService";
import { notificationWarning } from "../../../../utils/Notification";
import { getUserInfo } from "../../../../utils/storage";
import QuestionDetailItem from "./QuestionDetailItem";
import "./style.scss";

const FormEditExam = ({ examId, category, setRefech }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [examInfo, setExamInfo] = useState();
  const [mode, setMode] = useState("view");
  const currentUser = getUserInfo();

  const handleEditExam = (value) => {
    console.log(value);
    Swal.fire({
      title: "Are you sure you want to exit?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          examId: examId,
          examName: value?.examName,
          totalTime: value?.time,
        };
        setLoading(true);
        updateExam(
          payload,
          (res) => {
            setLoading(false);
            setIsModalVisible(false);
            setRefech(Date.now());
            console.log(res);
          },
          (err) => console.log(err.response)
        );
      }
    });
  };

  useEffect(() => {
    if (examId) {
      listQuestionRequest(
        {
          examId: examId,
          userId: currentUser?.id,
        },
        (res) => {
          console.log(res);
          setExamInfo(res.data);
        },
        () => {
          notificationWarning("Can not get exam info");
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId]);

  return (
    <div>
      <Button
        className="btn-action mb-2"
        type="primary"
        onClick={() => setIsModalVisible(true)}
      >
        View
      </Button>
      <Modal
        title="Exam Infomation"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        width={1000}
      >
        <Spin spinning={loading}>
          <Form
            onFinish={handleEditExam}
            initialValues={{
              examName: examInfo?.examName,
              time: examInfo?.totalTime,
            }}
            className="form-edit-exam"
          >
            <div className="row">
              <div className="col-md-4">
                <Form.Item
                  style={{ width: "100%" }}
                  name="examName"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your category name!",
                    },
                    {
                      max: 50,
                      message: "Category name too long!",
                    },
                  ]}
                >
                  <Input
                    disabled={mode === "view"}
                    placeholder="Enter category name"
                  />
                </Form.Item>
              </div>
              <div className="col-md-3">
                <label>
                  Category: <b>{category}</b>
                </label>
              </div>
              <div className="col-md-2">
                <Form.Item
                  style={{ width: "100%" }}
                  name="time"
                  label="Time"
                  rules={[
                    {
                      required: true,
                      message: "Please input time!",
                    },
                    () => ({
                      validator(_, value) {
                        if (!/\D/.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Please enter the number!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    disabled={mode === "view"}
                    placeholder="Enter category name"
                  />
                </Form.Item>
              </div>
              <div className="col-md-2">
                <label>
                  Point: <b>{examInfo?.totalPoint}</b>
                </label>
              </div>
            </div>

            <div className="row">
              {examInfo?.data?.length > 0 &&
                examInfo?.data.map((item, index) => (
                  <QuestionDetailItem item={item} index={index} key={index} />
                ))}
            </div>

            <Form.Item>
              <Button
                htmlType="button"
                className="btn-dashboard-outline mt-2"
                onClick={() => setIsModalVisible(false)}
              >
                Close
              </Button>
              {mode === "view" && (
                <Button
                  htmlType="button"
                  className="btn-dashboard mt-2 ml-2"
                  onClick={() => setMode("edit")}
                >
                  Edit
                </Button>
              )}
              {mode === "edit" && (
                <Button htmlType="submit" className="btn-dashboard mt-2 ml-2">
                  Done
                </Button>
              )}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default FormEditExam;
