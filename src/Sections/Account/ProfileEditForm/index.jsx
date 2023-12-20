"use client"

import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"

import Button from "@/Components/Button"
import Container from "@/Components/Container"
import ProfileField from "@/Components/Account/Profile/ProfileField"
import styles from "./ProfileEditForm.module.scss"
import { checkValidPhone } from "@/Utils/helpers"

const validateField = (value, fieldType) => {
  if (fieldType === "text") {
    return value.length > 0 ? true : false
  } else if (fieldType === "email") {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return pattern.test(value)
  } else if (fieldType === "file") {
    return true
  } else if (fieldType === "tel") {
    return checkValidPhone(value).valid
  }
}

const validateAllFields = (fields) => {
  return Object.values(fields).every((field) => field.isValid)
}

const checkDataDifference = (prevData, newData) => {
  if (prevData.email !== newData.email.value) {
    return true
  }

  if (
    prevData.full_name !== `${newData.name.value} ${newData.lastname.value}`
  ) {
    return true
  }
  if (prevData.image !== newData.image.value && newData.image.value != null) {
    return true
  }
  if (prevData.phone !== checkValidPhone(newData.phone.value).value) {
    return true
  }

  return false
}

const ProfileEditForm = () => {
  const { data: sessionData, update: updateSession } = useSession()
  const imagePreviewRef = useRef()
  const [isErrorSubmit, setIsErrorSubmit] = useState()
  const [loading, setLoading] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [data, setData] = useState({
    name: {
      value: "",
      isValid: true,
      type: "text",
    },
    lastname: {
      value: "",
      isValid: true,
      type: "text",
    },
    email: {
      value: "",
      isValid: true,
      type: "email",
    },
    phone: {
      value: "",
      isValid: true,
      type: "tel",
    },
    image: {
      value: null,
      preview: null,
      isValid: true,
      type: "file",
      error: false,
    },
  })

  useEffect(() => {
    setData((prev) => {
      return {
        name: {
          ...prev.name,
          value: sessionData?.user?.full_name?.split(" ")[0] || "",
        },
        lastname: {
          ...prev.lastname,
          value: sessionData?.user?.full_name?.split(" ")[1] || "",
        },
        image: {
          ...prev.image,
          preview: sessionData?.user?.image || "",
        },
        phone: {
          ...prev.phone,
          value: sessionData?.user?.phone || "",
        },
        email: {
          ...prev.email,
          value: sessionData?.user?.email || "",
        },
      }
    })
  }, [sessionData])

  useEffect(() => {
    if (!sessionData || !data) return
    const isDifference = checkDataDifference(sessionData.user, data)
    if (isDifference) {
      setCanSubmit(validateAllFields(data))
    } else {
      setCanSubmit(false)
    }
  }, [data])

  const handleUploadFile = (e) => {
    const file = e?.target?.files[0]

    if (!file) return
    if (file?.size / 1024 <= 10240) {
      imagePreviewRef.current.src = window?.URL?.createObjectURL(file)

      setData((prev) => {
        return {
          ...prev,
          image: {
            ...prev["image"],
            value: file,
            isValid: true,
          },
        }
      })
    } else {
      setData((prev) => {
        return {
          ...prev,
          image: {
            ...prev["image"],
            value: file,
            isValid: false,
            error: "Размер файла превышает 10 МБ",
          },
        }
      })
    }
  }

  const handleChangeInput = (value, fieldName) => {
    setData((prev) => {
      return {
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value,
          isValid: validateField(value, prev[fieldName].type),
        },
      }
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setIsErrorSubmit(false)
    var myHeaders = new Headers()
    myHeaders.append(`Authorization`, `Bearer ${sessionData.user.accessToken}`)

    var formdata = new FormData()
    formdata.append("full_name", `${data.name.value} ${data.lastname.value}`)
    formdata.append("email", data.email.value)

    if (data.phone.value !== sessionData.user.phone) {
      formdata.append("phone", checkValidPhone(data.phone.value).value)
    }

    if (data.image.value) {
      formdata.append("image", data.image.value)
    }

    formdata.append("_method", "PUT")

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    }

    const result = await fetch(
      "https://gymyx.cro.codes/api/users",
      requestOptions
    )
    const response = await result.json()

    if (!result.ok) {
      if (response.phone) {
        setIsErrorSubmit("Этот телефон уже занят другим пользователем!")
      }
    } else {
      setData((prev) => {
        return {
          ...prev,
          image: {
            ...prev["image"],
            value: null,
          },
        }
      })
      updateSession(response.data)
    }
    setLoading(false)
  }

  return (
    <section className={styles["profile-edit-form"]}>
      <Container size="M">
        <div className={styles["profile-edit-form__wrapper"]}>
          <div className={styles["profile-edit-form__data"]}>
            <label className={styles["profile-edit-form__avatar"]}>
              <input
                onChange={handleUploadFile}
                type="file"
                accept=".jpg, .jpeg, .png, .pdf, .webp"
              />
              <img
                ref={imagePreviewRef}
                src={data.image.preview || "/icons/avatar.svg"}
                alt="profile image"
              />
            </label>
            <div className={styles["profile-edit-form__data-col"]}>
              <ProfileField
                prefix="Имя"
                name={"name"}
                value={data.name.value}
                onInput={handleChangeInput}
              />
              <ProfileField
                name={"lastname"}
                prefix="Фамилия"
                value={data.lastname.value}
                onInput={handleChangeInput}
              />
            </div>
          </div>
          <div className={styles["profile-edit-form__contacts"]}>
            <p className={styles["profile-edit-form__contacts-title"]}>
              Контакты
            </p>
            <div className={styles["profile-edit-form__row"]}>
              <ProfileField
                type="tel"
                name={"phone"}
                prefix="Телефон"
                value={data.phone.value}
                onInput={handleChangeInput}
              />
              <ProfileField
                type="email"
                prefix="E-mail"
                name={"email"}
                value={data.email.value}
                onInput={handleChangeInput}
              />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            size="l"
            label={loading ? "Загрузка" : "Сохранить"}
            variant="blue"
            fullSize={true}
          />
          {isErrorSubmit && (
            <p className={styles["profile-edit-form__error-field"]}>
              {isErrorSubmit}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}

export default ProfileEditForm
