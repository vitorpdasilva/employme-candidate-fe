import React from "react"
import { NumericFormat, NumericFormatProps } from "react-number-format"

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void //eslint-disable-line
  name: string
  prefix?: string
}

export const NumericInput = React.forwardRef<NumericFormatProps, CustomProps>(function NumericInput(
  props,
  ref
) {
  const { onChange, prefix, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      valueIsNumericString
      prefix={prefix ?? "$"}
      max={1_000_000}
    />
  )
})
