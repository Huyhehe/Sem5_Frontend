import { AppContext } from "@/App"
import { registerAPI } from "@/utils/http"
import { setEmailToLocal } from "@/utils/localStorage"
import { Button, Form, Input } from "antd"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignUpPage = () => {
  document.title = "TravelCare | Sign Up"

  const navigator = useNavigate()
  const { setLoading, openNotification } = useContext(AppContext)

  const handleSubmit = async (newUser: any) => {
    setLoading(true)
    try {
      const user = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        phone_number: "",
        country: "",
        province: "",
        district: "",
        street_address: "",
        redirect_link: "127.0.0.1:5173/login/email-verify",
      }

      const res = await registerAPI(user)
      if (res) {
        setEmailToLocal(newUser.email)
      }
      // After done API
      // if (flag) {
      //   navigator("/login/verify")
      // }
      setLoading(false)
      openNotification("success", {
        message: "Success",
        description: `Create account successfully`,
      })
      navigator("/login/verify")
    } catch (error: any) {
      setLoading(false)
      console.log(error)
      openNotification("error", {
        message: "Error",
        description: `Something went wrong, it might be ${error.message}`,
      })
    }
  }

  return (
    <div className="signInPage-container mt-[2rem]">
      <h1 className="text-[2rem] mb-4 w-fit font-black relative after:absolute after:bottom-0 after:left-0 after:translate-y-[50%] after:w-full after:h-[1rem] after:bg-primary/25 after:-z-10">
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
            {
              type: "email",
              message: "Please enter a valid email",
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
        <div className="flex gap-1 items-center pt-4">
          <Form.Item
            name={"firstName"}
            label="First Name"
            required
            colon={false}
            className="flex justify-between w-[50%]"
            rules={[
              {
                required: true,
                message: "Please fill this field",
              },
            ]}
          >
            <Input
              placeholder="Ex: Huy"
              allowClear
              className="rounded-md hover:border-primary focus-within:border-primary shadow-none"
            />
          </Form.Item>
          <Form.Item
            name={"lastName"}
            label="Last Name"
            required
            colon={false}
            className="flex justify-between w-[50%]"
            rules={[
              {
                required: true,
                message: "Please fill this field",
              },
            ]}
          >
            <Input
              placeholder="Ex: Nguyen"
              allowClear
              className="rounded-md hover:border-primary focus-within:border-primary shadow-none"
            />
          </Form.Item>
        </div>
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
            {
              min: 6,
              message: "Password must be at least 6 characters",
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
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                )
              },
            }),
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
