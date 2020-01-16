import React, { useEffect, useRef, useState } from 'react'

const useInput = (content, setContent) => {
  const [value, setValue] = useState(content)
  // useEffect(() => {
  // }, [value])
  const onChangeText = e => {
    const { value } = e && e.target || {}
    setValue(value)
  }
  return { value, onChangeText }
};

export { useInput };
