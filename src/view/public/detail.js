import { useEffect, useState } from 'react';
import { Form, DatePicker, Input } from 'antd';
import axios from 'axios';

const Detail = (props) => {
  // console.log(props);
  const detail = props?.detail;

  return (
    <Form
      initialValues={{ remember: true }}
      className="form"
    >
      <Form.Item
        name="teacher"
        label="授课教师"
        initialValue={detail?.teacher}
      >
        <Input placeholder="请输入课程名" disabled />
      </Form.Item>
      <Form.Item
        name="name"
        label="课程名称"
        initialValue={detail?.name}
      >
        <Input placeholder="请输入课程名" disabled />
      </Form.Item>
      <Form.Item
        name="description"
        label="课程简介"
        initialValue={detail?.description}
      >
        <Input placeholder="请输入课程简介" disabled />
      </Form.Item>
      <Form.Item
        name="detail"
        label="课程详情"
        initialValue={detail?.detail}
      >
        <Input.TextArea maxLength={100} disabled autoSize showCount placeholder="请输入课程详情" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="联系电话"
        initialValue={detail?.phone}
      >
        <Input placeholder="请输入联系电话" disabled />
      </Form.Item>
      <Form.Item
        name="address"
        label="上课地点"
        initialValue={detail?.address}
      >
        <Input placeholder="请输入联系电话" disabled />
      </Form.Item>
      <Form.Item
        name="classdate"
        label="课程日期"
        initialValue={`${detail?.StartclassDate}--${detail?.EndclassDate}`}
      >
        <Input placeholder="请输入联系电话" disabled />
      </Form.Item>
      <Form.Item
        name="classtime"
        label="课程日期"
        initialValue={`${detail?.StartclassTime}--${detail?.EndclassTime}`}
      >
        <Input placeholder="请输入联系电话" disabled />
      </Form.Item>
    </Form>
  )
}
export default Detail;