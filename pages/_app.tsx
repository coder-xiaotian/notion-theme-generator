// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

import '../styles/globals.css'
import type {AppProps} from 'next/app'
import { useEffect, useRef, useState} from "react";
import {
  createTheme,
  Popover,
  ThemeProvider
} from "@mui/material";
import StyleConfig from "../components/StyleConfig";
import {initContext} from "../utils/hooks";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {size: 'small'}
    },
    MuiSelect: {
      defaultProps: {size: 'small'}
    },
    MuiInputLabel: {
      defaultProps: {size: 'small'}
    },
    MuiFormControlLabel: {
      defaultProps: {labelPlacement: 'start'}
    },
    MuiGrid: {
      defaultProps: {className: "items-center"}
    }
  }
})

function useRootHook() {
  const [selecting, setSelecting] = useState(false)
  const [el, setEl] = useState<HTMLElement>()

  return {
    el,
    setEl,
    selecting,
    setSelecting
  }
}
export const RootContext = initContext(useRootHook)

function MyApp({Component, pageProps}: AppProps) {
  const pageRef = useRef<HTMLDivElement>(null)
  const {el, setEl, selecting, setSelecting} = useRootHook()
  const [anchorEl, setAnchorEl] = useState<HTMLElement>()

  useEffect(() => {
    function handleClick(e) {
      e.target.style.background = e.target.obg
      e.target.removeEventListener('click', handleClick)
      setEl(e.target)
      setSelecting(false)
      setAnchorEl(undefined)
    }

    function mouseoverFn(e) {
      e.target.obg = e.target.obg ? e.target.obg : e.target.style.background
      e.target.style.background = 'rgb(47 195 255 / 45%)'
      e.target.addEventListener('click', handleClick, false)
      setAnchorEl(e.target)
    }

    function mouseoutFn(e) {
      e.target.style.background = e.target.obg
      e.target.removeEventListener('click', handleClick)
      setAnchorEl(undefined)
    }

    if (selecting) {
      pageRef.current?.addEventListener('mouseover', mouseoverFn, false)
      pageRef.current?.addEventListener('mouseout', mouseoutFn, false)
    } else {
      pageRef.current?.removeEventListener('mouseover', mouseoverFn)
      pageRef.current?.removeEventListener('mouseout', mouseoutFn)
    }

    return () => {
      pageRef.current?.removeEventListener('mouseover', mouseoverFn)
      pageRef.current?.removeEventListener('mouseout', mouseoutFn)
    }
  }, [selecting])

  return (
      <ThemeProvider theme={theme}>
        <RootContext.Provider value={{
          el,
          setEl,
          selecting,
          setSelecting
        }}>
          <>
            <StyleConfig/>
            <div ref={pageRef} className="inline-block w-3/4 h-full align-top overflow-auto">
              <Component {...pageProps} />
            </div>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={!!anchorEl}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              disableRestoreFocus
            >
              <div className="flex space-between items-center px-2 py-1">
          <span
            className="max-w-[200px]">{anchorEl && `${anchorEl.tagName.toLowerCase()}.${Array.prototype.join.call(anchorEl.classList, '.')}`}</span>
                <span className="inline-block ml-2">{anchorEl && `${anchorEl.clientWidth} x ${anchorEl.clientHeight}`}</span>
              </div>
            </Popover>
          </>
        </RootContext.Provider>
      </ThemeProvider>
  )
}

export default MyApp
