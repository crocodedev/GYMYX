"use client"

import cookie from "js-cookie"

import Input from "@/Components/Input"
import AccountCheckBox from "@/Components/Account/Login/AccountCheckBox"
import AccountRepeatCode from "@/Components/Account/Login/AccountRepeatCode"
import Button from "@/Components/Button"

import styles from "./AccountLoginForm.module.scss"
import { useCallback, useRef, useState } from "react"
import { checkValidPhone, formatPhoneNumber } from "@/Utils/helpers"

const INIT_FORM_DATA = {
  phone: {
    value: "",
    valid: false,
  },
  agreePolicy: false,
  code: null,
  receivedCode: null,
}

const AccountLoginForm = ({ handleToogleModal }) => {
  const inputRef = useRef()
  const inputCodeRef = useRef()
  const [data, setData] = useState(INIT_FORM_DATA)

  const handleChangePhone = useCallback(() => {
    const phone = checkValidPhone(inputRef.current.value)
    setData((prev) => {
      return {
        ...prev,
        phone: {
          value: phone.value,
          valid: phone.valid,
        },
      }
    })
  }, [])

  const handleChangeCode = useCallback(() => {
    setData((prev) => {
      return {
        ...prev,
        code: inputCodeRef.current.value,
      }
    })
  }, [])

  const handleChangeAgreePolicy = useCallback(() => {
    setData((prev) => {
      return {
        ...prev,
        agreePolicy: !prev.agreePolicy,
      }
    })
  })

  const handleResetForm = () => {
    setData(INIT_FORM_DATA)
  }

  const handleSubmitLogin = async () => {
    try {
      const response = await fetch("https://gymyx.cro.codes/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: data.phone.value }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const result = await response.json()
      setData((prev) => {
        return {
          ...prev,
          receivedCode: result.data.code,
        }
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleSubmitCheckCode = async () => {
    try {
      const response = await fetch(
        "https://gymyx.cro.codes/api/users/auth/code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: data.code }),
        }
      )
      const result = await response.json()

      if (!response.ok) {
        if (result?.message === "Unauthorized") {
          handleToogleModal()
        }
        return
      }

      console.log('OKKKKK ')
      cookie.set("access_token", result?.data.access_token, {
        expires: result?.data.expires_in,
      })
    } catch (error) {
      console.log(
        "ERROR =>",
        error?.message === "Unauthorized",
        error,
        error?.message
      )
    }
  }

  return (
    <div className={styles["account-login-form"]}>
      <div className={styles["account-login-form__wrapper"]}>
        <div className={styles["account-login-form__logo"]}>
          <img src="/icons/loginFormIcon.svg" />
        </div>
        <h1 className={styles["account-login-form__title"]}>
          Войти или зарегистрироваться
        </h1>
        {!data.receivedCode && (
          <Input
            type="tel"
            refElement={inputRef}
            onChange={handleChangePhone}
            placeholder={"Номер телефона"}
          />
        )}
        {data.receivedCode && (
          <Input
            refElement={inputCodeRef}
            onChange={handleChangeCode}
            placeholder={"Код из SMS"}
            maxLength={4}
          />
        )}
        {!data.receivedCode && (
          <Button
            onClick={handleSubmitLogin}
            disabled={data.phone.valid && data.agreePolicy ? false : true}
            className={styles["account-login-form__btn"]}
            size="l"
            variant="blue"
            icon="arrow"
            label={"Продолжить"}
          />
        )}
        {data.receivedCode && (
          <Button
            disabled={data.code ? (data.code.length < 4 ? true : false) : true}
            onClick={handleSubmitCheckCode}
            className={styles["account-login-form__btn"]}
            size="l"
            variant="blue"
            label={"Подтвердить"}
          />
        )}
        {!data.receivedCode && (
          <AccountCheckBox
            value={data.agreePolicy}
            onChange={handleChangeAgreePolicy}
          />
        )}
        {data.receivedCode && (
          <AccountRepeatCode
            handleClickChange={handleResetForm}
            handleClick={handleSubmitLogin}
            targetPhone={formatPhoneNumber(data.phone.value)}
          />
        )}
      </div>
    </div>
  )
}

export default AccountLoginForm
