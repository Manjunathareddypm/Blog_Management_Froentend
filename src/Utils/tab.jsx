import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { selectTypeOfBlog } from '../redux/Slice/HomeDashboardSlice';
export default function SelectSmall(props) {
    const dispatch = useDispatch()
    const valueOfType = useSelector((c) => { return c.allBlogReducer.typeOfBlog })

    const handleChange = (event) => {
        dispatch(selectTypeOfBlog(event.target.value))
    };

    React.useEffect(() => {
        dispatch(selectTypeOfBlog("Other"))
    }, [])
    return (
        <div>
            <FormControl sx={{ width: '155px' }} size="small">
                <InputLabel id="demo-select-small">Select Category</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={props.value?props.value:valueOfType}
                    label="Sort by relevance"
                    defaultValue={valueOfType}
                    onChange={handleChange}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                        getcontentanchorel: null,
                    }}
                >

                    <MenuItem value={"Sports"}>Sports</MenuItem>
                    <MenuItem value={"Music"}>Music</MenuItem>
                    <MenuItem value={"Fitness"}>Fitness</MenuItem>
                    <MenuItem value={"Food"}>Food</MenuItem>
                    <MenuItem value={"Travel"}>Travel</MenuItem>
                    <MenuItem value={"Politics"}>Politics</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>

                </Select>
            </FormControl>
        </div>
    );
}
