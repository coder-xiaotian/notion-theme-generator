import {
  Accordion, AccordionDetails,
  AccordionSummary, Box,
  Checkbox,
  FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Input,
  InputAdornment,
  MenuItem, Slider, Stack,
  SvgIcon,
  TextField
} from "@mui/material";
import SelectIcon from "../assets/svgs/select.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useContext, useState} from "react";
import {RootContext} from "../pages/_app";
import {useForm} from 'react-hook-form'

export default () => {
  const {el, selecting, setSelecting} = useContext(RootContext)
  const [selectedClass, setSelectedClass] = useState('')
  const [borderRadius, setBorderRadius] = useState('0')
  const {register, watch} = useForm<{width: number, height: number, actOnCls: string}>()
  const widthRegister = register('width')
  const heightRegister = register('height')

  return (
    <>
      <style global jsx>
        {`.${selectedClass} {
          border-radius: ${borderRadius}px !important;
        }`}
      </style>
      <div className="inline-block w-1/4 align-top h-full border-r border-r-slate-200">
        <div className="text-center">
          <Checkbox checked={selecting} onChange={(e) => setSelecting(e.target.checked)}
                    icon={<SvgIcon component={SelectIcon} inheritViewBox/>}
                    checkedIcon={<SvgIcon component={SelectIcon} color="primary" inheritViewBox/>}></Checkbox>
          {el ? (
            <form>
              <Grid container columnSpacing={2} className="justify-center">
                <Grid item>
                  <TextField label="作用于类名" select className="w-36" InputProps={{...register('actOnCls')}}>
                    {/*@ts-ignore*/}
                    {Array.prototype.map.call(el.classList, cls => <MenuItem key={cls}
                                                                             value={cls}>{cls}</MenuItem>)}
                  </TextField>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <FormLabel>宽度</FormLabel>
                </Grid>
                <Grid container item xs={8} columnSpacing={1}>
                  <Grid item xs={8}>
                    <Slider valueLabelDisplay="auto" {...widthRegister} value={watch('width')}/>
                  </Grid>
                  <Grid item xs={4}>
                    <Input type='number' {...widthRegister} endAdornment={<InputAdornment position="end">px</InputAdornment>}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <FormLabel>高度</FormLabel>
                </Grid>
                <Grid container item xs={8} columnSpacing={1}>
                  <Grid item xs={8}>
                    <Slider valueLabelDisplay="auto" {...heightRegister} value={watch('height')}/>
                  </Grid>
                  <Grid item xs={4}>
                    <Input type='number' {...heightRegister} endAdornment={<InputAdornment position="end">px</InputAdornment>}/>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          ) : null}
        </div>
      </div>
    </>
  )
}
