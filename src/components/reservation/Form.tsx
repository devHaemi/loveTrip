import { Fragment, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Select from '@/components/shared/Select'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import { Hotel, ReservationForm } from '@/models/hotel'

type FormData = {
  [key: string]: string
}

function Form({
  forms,
  onSubmit,
  buttonLabel,
}: {
  forms: Hotel['forms']
  onSubmit: (formValues: FormData) => void
  buttonLabel: string
}) {
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: 'onBlur',
  })

  const component = useCallback(
    (form: ReservationForm) => {
      if (form.type === 'TEXT_FIELD') {
        return (
          <TextField
            label={form.label}
            helpMessage={
              (formState.errors[form.id]?.message as string) || form.helpMessage
            }
            hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else if (form.type === 'SELECT') {
        return (
          <Select
            label={form.label}
            options={form.options}
            // hasError={formState.errors[form.id] != null}
            {...register(form.id, {
              required: form.required,
              pattern: VALIDATION_MESSAGE_MAP[form.id],
            })}
          />
        )
      } else {
        return null
      }
    },
    [formState.errors, register],
  )

  return (
    <div style={{ padding: 24 }}>
      <Text bold={true}>예약정보</Text>

      <Spacing size={16} />

      <form>
        {forms.map((form) => {
          return (
            <Fragment key={form.id}>
              {component(form)}
              <Spacing size={8} />
            </Fragment>
          )
        })}
      </form>

      <Spacing size={80} />

      <FixedBottomButton label={buttonLabel} onClick={handleSubmit(onSubmit)} />
    </div>
  )
}

const VALIDATION_MESSAGE_MAP: {
  [key: string]: { value: RegExp; message: string }
} = {
  name: {
    value: /^[가-힣]+$/,
    message: '한글명을 확인해주세요',
  },
  phone: {
    value: /^\d+$/,
    message: '휴대전화번호를 확인해주세요',
  },
  email: {
    value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: '이메일 형식을 확인해주세요',
  },
}

export default Form
