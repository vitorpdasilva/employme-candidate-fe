import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void //eslint-disable-line
  name: string
  prefix?: string
  defaultValue: string
}

export const NumericInput = React.forwardRef<NumericFormatProps, CustomProps>(function NumericInput(props, ref) {
  const { onChange, prefix, defaultValue, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      value={defaultValue}
      onValueChange={(values): void => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      valueIsNumericString
      prefix={prefix ?? '$'}
      max={1_000_000}
    />
  )
})
