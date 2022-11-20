import { registerAPI } from "@/utils/http"
import { setEmailFromLocal } from "@/utils/localStorage"
import { Input, Form, Button } from "antd"
import { FunctionComponent } from "react"
import { Link, useNavigate } from "react-router-dom"

interface SignUpPageProps {}

const SignUpPage: FunctionComponent<SignUpPageProps> = () => {
  const navigator = useNavigate()

  const handleSubmit = async (newUser: any) => {
    if (newUser.password === newUser.confirmPassword) {
      console.log(newUser)
      try {
        const flag = await registerAPI(newUser)
        // After done API
        // if (flag) {
        //   setEmailFromLocal(newUser.email)
        //   navigator("/login/verify")
        // }
        setEmailFromLocal(newUser.email)
        navigator("/login/verify")
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="signInPage-container mt-[2rem]">
      <h1 className="text-[2rem] w-fit mb-[2rem] font-black relative after:absolute after:bottom-0 after:left-0 after:translate-y-[50%] after:w-full after:h-[1rem] after:bg-primary/25 after:-z-10">
        Sign Up
      </h1>
      <Form onFinish={handleSubmit} size="large">
        <Form.Item
          name={"email"}
          label="Email"
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
            type="email"
            placeholder="Ex: Huyhehe@gmail.com"
            allowClear
            className="rounded-md hover:border-primary focus-within:border-primary shadow-none"
          />
        </Form.Item>
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
        <Form.Item
          name={"confirmPassword"}
          label="Confirm Password"
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
            placeholder="Confirm Password"
            allowClear
            className="rounded-md hover:border-primary focus-within:border-primary shadow-none"
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
            className="bg-primary text-white rounded-md text-[1.25rem] py-[0.5rem] hover:bg-primary/70 border-none h-full"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUpPage
