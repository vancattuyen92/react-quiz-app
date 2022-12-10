import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//antd 
import { Input, Select, Button, Form } from 'antd';

//context
import { useAppContext } from '../contexts/AppContext';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const difficultyOptions = [
  { value: 'easy', label: 'Easy'},
  { value: 'medium', label: 'Medium'},
  { value: 'hard', label: 'Hard'}
]

const typeOptions = [
  { value: 'multiple', label: 'Multiple Choice'},
  { value: 'boolean', label: 'True/False'},
]

const { Option } = Select;

function Setting() {
  const [form] = Form.useForm();
  const [optionsCategory, setOptionsCategory] = React.useState([]);
  const navigate = useNavigate()
  const {setSettingForm} = useAppContext()
  const onFinish = (values) => {
    console.log(values);
    navigate('/question')
    setSettingForm(values)

    // form.setFieldsValue({
    //   note: 'Hello world!',
    //   gender: 'male',
    // });
  };

  React.useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => {
        const res = data.trivia_categories

        setOptionsCategory(res)
      })
  }, [])

  console.log({optionsCategory})

  return (
    <div className="center-form">
      <h1>Quiz App</h1>
      <Form  {...layout}  form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select
            placeholder="Category"
            style={{
              width: '100%', "marginBottom":"20px"
            }}
          >
            {optionsCategory.map(item => (
              <Option key={item.id} value={item.id} label={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="difficulty" label="Difficulty" rules={[{ required: true }]}>
          <Select
            placeholder="Difficulty"
            style={{
              width: '100%', "marginBottom":"20px"
            }}
            options={difficultyOptions}
          />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select
            placeholder="Type"
            style={{width: '100%', "marginBottom":"20px"}}
            options={typeOptions}
          />
        </Form.Item>
        <Form.Item name="amount" label="Number of questions" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Setting