import React, { useEffect, useRef, useState } from 'react'

const useInput = props => {
  const [value, setValue] = useState('')
  // useEffect(() => {
  // }, [value])
  const onChangeText = e => {
    const { value } = e && e.target || {}
    setValue(value)
  }
  return { value, onChangeText }
};

export { useInput };
