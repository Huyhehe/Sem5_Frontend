import { AppContext } from "@/App"
import FormItem from "@/components/common/FormItem"
import { registerAPI } from "@/utils/http"
import { setEmailToLocal } from "@/utils/localStorage"
import { Button, Form, Input } from "antd"
import { omit } from "lodash"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { validateStringInput } from "../../utils"

const SignUpPage = () => {
  document.title = "TravelCare | Sign Up"

  const navigator = useNavigate()
  const { setLoading, openNotification } = useContext(AppContext)

  const handleSubmit = async (newUser: any) => {
    try {
      const user = {
        ...omit(newUser, ["confirmPassword"]),
        phoneNumber: null,
        countryId: null,
        provinceId: null,
        districtId: null,
        wardId: null,
        streetAddress: null,
        image: null,
      }

      const res = await registerAPI(user)
      if (res) {
        setEmailToLocal(newUser.email)
      }
      setLoading(false)
      openNotification("success", {
        message: "Success",
        description: `Create account successfully`,
      })
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
      <h1 className="text-[2rem] mb-4 w-fit font-black relative after:absolute after:bottom-0 after:left-0 after:translate-y-[50%] after:w-full after:h-[1rem] after:bg-primary/25 after:-z-10">
        Sign Up
      </h1>
      <Form onFinish={handleSubmit} size="large">
        <FormItem
          name={"email"}
          label="Email"
          required
          trim
          colon={false}
          labelCol={{ span: 24 }}
          rules={[
            {
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
          message="Email is required"
        >
          <Input
            type="email"
            placeholder="Ex: Huyhehe@gmail.com"
            allowClear
            className="rounded-md hover:border-primary focus-within:border-primary shadow-none"
          />
        </FormItem>
        <div className="flex gap-4 pt-4">
          <FormItem
            name={"firstName"}
            label="First Name"
            required
            trim
            colon={false}
            className="flex justify-between"
            message="First name is required"
            labelCol={{ span: 0 }}
            rules={[
              {
                ...validateStringInput(
                  "A name can't contains any number or special character"
                ),
              },
            ]}
          >
            <Input
              placeholder="Ex: Huy"
              allowClear
              className="rounded-md hover:border-primary focus-within:border-primary shadow-none"
            />
          </FormItem>
          <FormItem
            name={"lastName"}
            label="Last Name"
            required
            trim
            colon={false}
            className="flex justify-between w-[50%]"
            labelCol={{ span: 0 }}
            message="Last name is required"
            rules={[
              {
                ...validateStringInput(
                  "A name can't contains any number or special character"
                ),
              },
            ]}
          >
            <Input
              placeholder="Ex: Nguyen"
              allowClear
              className="rounded-md hover:border-primary focus-within:border-primary shadow-none"
            />
          </FormItem>
        </div>
        <FormItem
          name={"username"}
          label="Username"
          required
          trim
          colon={false}
          labelCol={{ span: 24 }}
          message="Username is required"
        >
          <Input
            placeholder="Ex: Huyhehe"
            allowClear
            className="rounded-md hover:border-primary focus-within:border-primary shadow-none"
          />
        </FormItem>
        <FormItem
          name={"password"}
          label="Password"
          required
          colon={false}
          labelCol={{ span: 24 }}
          message="Password is required"
          rules={[
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
        </FormItem>
        <FormItem
          name={"confirmPassword"}
          label="Confirm Password"
          required
          colon={false}
          labelCol={{ span: 24 }}
          message="Confirm password is required"
          rules={[
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
        </FormItem>
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
