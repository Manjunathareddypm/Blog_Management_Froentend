import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setrelevanceType } from '../redux/Slice/HomeDashboardSlice';
export default function NativeSelectDemo1(props) {
  const [value, setValue] = useState("All");
  const dispatch = useDispatch()
  const valueOfType = useSelector((c)=>{
    return c.allBlogReducer.typeOfBlog
  })
  const onChangeOfValue = (e)=>{
      setValue(e.target.value)
      dispatch(setrelevanceType(e.target.value))
      props.value(valueOfType)
  }
  return (
    <Box sx={{ width: 120 ,marginLeft:"35px",marginTop:'10px'}}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          By relevance
        </InputLabel>
        <NativeSelect
          defaultValue={"All"}
          onChange={onChangeOfValue}
       
        >
          <option value={"All"}>All</option>
          <option value={"Latest"}>Latest</option>
          <option value={"lowToHigh"}>Low-HighLikes</option>
          <option value={"highToLow"}>High-LowLikes</option>
          
        </NativeSelect>
      </FormControl>
    </Box>
  );
}