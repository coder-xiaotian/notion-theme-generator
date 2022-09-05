import {
  Button,
  Checkbox,
  FormLabel,
  Grid,
  Input,
  InputAdornment, List, ListItem, ListSubheader,
  MenuItem,
  Slider,
  SvgIcon,
  TextField
} from "@mui/material";
import SelectIcon from "../assets/svgs/select.svg";
import {useContext, useState} from "react";
import {RootContext} from "../pages/_app";
import {useForm} from 'react-hook-form'

const numRE = /(-?[\d]+)/
export default () => {
  const {el, setEl, selecting, setSelecting} = useContext(RootContext)
  const {register, watch, setValue, handleSubmit} = useForm({defaultValues: {
    width: 0,
    height: 0,
    actOnCls: '',
    bgColor: '#fff',
    borderRadius: 0,
    color: '#000',
  }})
  const widthRegister = register('width')
  const heightRegister = register('height')
  const borderRadiusRegister = register('borderRadius')
  const formValue = watch()
  watch((data, {name, type}) => {
    if (name === 'actOnCls') {
      setValue('width', el?.clientWidth ?? 0)
      setValue('height', el?.clientHeight ?? 0)
      setValue('bgColor', el ? getComputedStyle(el).backgroundColor ?? '#fff' : '#fff')
      setValue('borderRadius', el ? +numRE.exec(getComputedStyle(el).borderRadius)![1] ?? 0 : 0)
      setValue('color', el ? getComputedStyle(el).color ?? '#000' : '#000')
    }
  })

  const [styles, setTtyles] = useState({})
  function handleSaveStyle(value: typeof formValue) {
    setTtyles({
      ...styles,
      [value.actOnCls]: value
    })
    setEl(undefined)
  }

  function handleMouseOverStyle(cls: string) {
    document.querySelector(`.${cls}`)?.classList.add('highlight-item')
  }
  function handleMouseOutStyle(cls: string) {
    document.querySelector(`.${cls}`)?.classList.remove('highlight-item')
  }

  return (
    <>
      <style global jsx>
        {`.${formValue.actOnCls} {
            width: ${formValue.width}px !important;
            height: ${formValue.height}px !important;
            background-color: ${formValue.bgColor} !important;
            border-radius: ${formValue.borderRadius}px !important;
            color: ${formValue.color} !important;
          }
          .highlight-item {
            border: 5px solid red;
          }
        `}
      </style>
      <div className="inline-block w-1/4 align-top h-full border-r border-r-slate-200">
        <div className="text-center">
          <Checkbox checked={selecting} onChange={(e) => setSelecting(e.target.checked)}
                    icon={<SvgIcon component={SelectIcon} inheritViewBox/>}
                    checkedIcon={<SvgIcon component={SelectIcon} color="primary" inheritViewBox/>}/>
          {el ? (
            <form onSubmit={handleSubmit(handleSaveStyle)}>
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
                    <Slider valueLabelDisplay="auto" {...widthRegister as any} value={formValue.width} max={window.innerWidth}/>
                  </Grid>
                  <Grid item xs={4}>
                    <Input type='number' {...widthRegister as any} endAdornment={<InputAdornment position="end">px</InputAdornment>}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <FormLabel>高度</FormLabel>
                </Grid>
                <Grid container item xs={8} columnSpacing={1}>
                  <Grid item xs={8}>
                    <Slider valueLabelDisplay="auto" {...heightRegister as any} value={formValue.height} max={window.innerHeight}/>
                  </Grid>
                  <Grid item xs={4}>
                    <Input type='number' {...heightRegister} endAdornment={<InputAdornment position="end">px</InputAdornment>}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <FormLabel>字体色</FormLabel>
                </Grid>
                <Grid item xs={8} columnSpacing={1}>
                  <Input type="color" {...register('color')} className="w-6 h-6"/>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <FormLabel>背景色</FormLabel>
                </Grid>
                <Grid item xs={8} columnSpacing={1}>
                  <Input type="color" {...register('bgColor')} className="w-6 h-6"/>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <FormLabel>圆角</FormLabel>
                </Grid>
                <Grid container item xs={8} columnSpacing={1}>
                  <Grid item xs={8}>
                    <Slider valueLabelDisplay="auto" {...borderRadiusRegister as any} value={formValue.borderRadius} max={window.innerHeight}/>
                  </Grid>
                  <Grid item xs={4}>
                    <Input type='number' {...borderRadiusRegister} endAdornment={<InputAdornment position="end">px</InputAdornment>}/>
                  </Grid>
                </Grid>
              </Grid>
              <div>
                <Button type="submit">保存</Button>
              </div>
            </form>
          ) : (
            <List subheader={<ListSubheader>已配置样式</ListSubheader>}>
              {Object.keys(styles).map(k => <ListItem className="cursor-pointer"
                                                      onMouseOver={() => handleMouseOverStyle(k)}
                                                      onMouseOut={() => handleMouseOutStyle(k)}
                                            >.{k}</ListItem>)}
            </List>
          )}
        </div>
      </div>
    </>
  )
}
