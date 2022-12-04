import { AppContext } from "@/App"
import { forgotPasswordAPI } from "@/utils/http"
import { setEmailToLocal } from "@/utils/localStorage"
import { Button, Form, Input } from "antd"
import { FunctionComponent, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

interface ForgotPasswordProps {}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = () => {
  const { openNotification, setLoading } = useContext(AppContext)
  const navigator = useNavigate()
  const handleSubmit = async (e: any) => {
    setLoading(true)
    try {
      const res = await forgotPasswordAPI(e.email)
      // After API done
      // if (res.user) {
      //   setEmailToLocal(e.email)
      //   navigator(`/login/verify/${res.param1}/${res.param2}`)
      // }
      setEmailToLocal(e.email)
      setLoading(false)
      navigator("/login/verify")
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
        Forgot password
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
            placeholder="Ex: huyhehe@gmail.com"
            allowClear
            className="rounded-md hover:border-primary focus-within:border-primary shadow-none"
            type="email"
          />
        </Form.Item>
        <div className="option-container flex gap-[0.5rem] justify-end">
          <span>Already remember your password?</span>
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
            Get code
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgotPassword
