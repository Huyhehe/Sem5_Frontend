import { Input, Form, Button } from "antd"
import { FunctionComponent } from "react"
import { Link } from "react-router-dom"

interface SignUpPageProps {}

const SignUpPage: FunctionComponent<SignUpPageProps> = () => {
  const handleSubmit = (e: any) => {
    console.log(e)
  }

  return (
    <div className="signInPage-container mt-[2rem]">
      <h1 className="text-[2rem] w-fit mb-[2rem] font-black relative after:absolute after:bottom-0 after:left-0 after:translate-y-[50%] after:w-full after:h-[1rem] after:bg-primary/25 after:-z-10">
        Sign Up
      </h1>
      <Form onFinish={handleSubmit} size="large">
        <Form.Item
          name={"username"}
          label="Username"
          required
          colon={false}
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please fill this field",
            },
          ]}
        >
          <Input
            placeholder="Ex: Huyhehe"
            allowClear
            className="rounded-md hover:border-primary focus-within:border-primary outline-primary"
          />
        </Form.Item>
        <Form.Item
          name={"password"}
          label="Password"
          required
          colon={false}
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please fill this field",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            allowClear
            className="rounded-md hover:border-primary focus-within:border-primary outline-primary"
          />
        </Form.Item>
        <div className="option-container flex gap-[0.5rem] justify-end">
          <span>Already have an account?</span>
          <Link
            to="/login/signIn"
            className="underline font-bold hover:text-primary"
          >
            Sign In
          </Link>
        </div>
        <Form.Item className="mt-[2rem] h-[3rem] box-content">
          <Button
            block
            htmlType="submit"
            className="bg-primary text-white rounded-md text-[1.25rem] py-[0.5rem] hover:bg-primary/70 outline-none h-full"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUpPage
