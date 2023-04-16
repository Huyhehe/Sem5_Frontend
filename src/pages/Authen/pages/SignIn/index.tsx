import { AppContext } from "@/App"
import { signInAPI } from "@/utils/http"
import { setUserToLocal } from "@/utils/localStorage"
import Button from "antd/es/button/button"
import Form from "antd/es/form"
import Input from "antd/es/input"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignInPage = () => {
  document.title = "TravelCare | Sign in"
  const { openNotification, currentRoute, setCurrentRoute, setLoading } =
    useContext(AppContext)
  const navigator = useNavigate()
  const handleSubmit = async (signInData: any) => {
    setLoading(true)
    try {
      const { user } = await signInAPI(signInData)
      setUserToLocal({ ...user })
      setLoading(false)

      if (currentRoute) {
        setCurrentRoute(null)
        navigator(currentRoute)
      } else {
        navigator("/")
      }
    } catch (error: any) {
      setLoading(false)
      openNotification("error", {
        message: "Error",
        description: `Something went wrong, it might be ${error.message}`,
      })
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
          label="User name"
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
            placeholder="Ex: Huyhehe@gmail.com"
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
          <span>Don&apos;t have an account?</span>
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
