import { Button, Form, Input } from "antd"
import { FunctionComponent, useRef } from "react"
import "../styles.css"

interface CodeFieldProps {}

const CodeField: FunctionComponent<CodeFieldProps> = () => {
  const formRef = useRef(null)

  const handleSubmit = (e: any) => {
    let code = ""
    for (const [key, value] of Object.entries(e)) {
      code += value
    }
    console.log(code)
  }
  const handleOnchange = (e: any, i: number) => {
    if (e.target.value !== "") {
      // e.target.classList.add("border-black")

      if (i < 3) {
        const input = document.getElementById(
          `input${i + 1}`
        ) as HTMLInputElement
        input.focus()
      }
    }
  }
  const handleEnterAgain = () => {
    // ;[0, 1, 2, 3].forEach((i) => {
    //   const input = document.getElementById(`input${i}`) as HTMLInputElement
    //   input.value = ""
    // })
    formRef?.current?.resetFields()
    const input = document.getElementById(`input0`) as HTMLInputElement
    input.focus()
  }t
  return (
    <div className="code-input-field">
      <Form
        ref={formRef}
        className="flex flex-col gap-2 w-fit"
        onFinish={handleSubmit}
      >
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <Form.Item key={i} name={`input${i}`}>
              <Input
                maxLength={1}
                bordered={false}
                className="input-field"
                onChange={(e) => handleOnchange(e, i)}
              />
            </Form.Item>
          ))}
        </div>
        <span
          onClick={handleEnterAgain}
          className="flex items-center gap-2 font-bold cursor-pointer"
        >
          Enter again
        </span>
        <Form.Item className="mt-[2rem] h-[3rem] box-content">
          <Button
            block
            htmlType="submit"
            className="bg-primary text-white rounded-md text-[1.25rem] py-[0.5rem] hover:bg-primary/70 border-none h-full"
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CodeField
