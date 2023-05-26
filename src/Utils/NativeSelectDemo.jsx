import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTypeOfBlog } from '../redux/Slice/HomeDashboardSlice';

export default function NativeSelectDemo(props) {
  const [value, setValue] = useState("All");
  const dispatch = useDispatch()
  const onChangeOfValue = (e) => {
    setValue(e.target.value)
    props.setValueOfTypeInChild(e.target.value)
    props.value(e.target.value)
    dispatch(selectTypeOfBlog(e.target.value))
  }
  const valueFromType = useSelector((c) => {
    return c.allBlogReducer.typeOfBlog
  })

  return (
    <Box sx={{ width: 120, marginLeft: "10px", marginTop: '10px' }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Type
        </InputLabel>
        <NativeSelect
          onChange={onChangeOfValue}
          value={valueFromType}
        >
          <option value={"All"}>All</option>
          <option value={"Music"}>Music</option>
          <option value={"Fitness"}>Fitness</option>
          <option value={"Food"}>Food</option>
          <option value={"Sports"}>Sports</option>
          <option value={"Travel"}>Travel</option>
          <option value={"Politics"}>Politics</option>
          <option value={"Other"}>Other</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}