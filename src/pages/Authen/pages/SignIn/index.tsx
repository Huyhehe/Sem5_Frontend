import { Button, Form, Input } from "antd"
import { FunctionComponent } from "react"
import { Link } from "react-router-dom"
import { loginAPI } from "@/utils/http"

interface SignInPageProps {}

const SignInPage: FunctionComponent<SignInPageProps> = () => {
  const handleSubmit = async (e: any) => {
    try {
      const user = await loginAPI(e)
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="signInPage-container mt-[2rem]">
      <h1 className="text-[2rem] w-fit mb-[2rem] font-black relative after:absolute after:bottom-0 after:left-0 after:translate-y-[50%] after:w-full after:h-[1rem] after:bg-primary/25 after:-z-10">
        Sign In
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
            className="rounded-md hover:border-primary focus-within:border-primary shadow-none"
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
            className="rounded-md hover:border-primary focus-within:border-primary shadow-none"
          />
        </Form.Item>
        <div className="option-container flex gap-[0.5rem] justify-end">
          <span>Don't have an account?</span>
          <Link
            to="/login/signUp"
            className="underline font-bold hover:text-primary"
          >
            Sign Up
          </Link>
        </div>
        <Form.Item className="mt-[2rem] h-[3rem] box-content">
          <Button
            block
            htmlType="submit"
            className="bg-primary text-white rounded-md text-[1.25rem] py-[0.5rem] hover:bg-primary/70 outline-none h-full border-none"
          >
            Sign in
          </Button>
          <Link to="/login/forgotPassword" className="font-bold text-primary">
            Forgot Password?
          </Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignInPage