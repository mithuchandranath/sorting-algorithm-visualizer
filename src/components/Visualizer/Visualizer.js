import React, { useState, useEffect } from "react";
import { Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BubbleSort from "../../algorithms/BubbleSort";

const useStyles = makeStyles(theme => ({
  sortingElement: {
    maxWidth: "100px",
    //minWidth: "1px",
    margin: theme.spacing(0.1),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0.25),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(0.1),
    },
    flexGrow: 1,
    flexShrink: 1
  }
}));

const initElementArrConfig = (elementArr) => {
  const arrMax = Math.max(...elementArr);
  const defaultElementColor = "primary";
  const elementArrConfig = [];
/*   return elementArr.map(v => {
    return { value: v, height: Math.ceil(v * (90 / arrMax) + 10), color: defaultElementColor };
  }); */

  for(let v of elementArr) {
    elementArrConfig.push({value: v, height: Math.ceil(v * (90 / arrMax) + 10), color: defaultElementColor })
  }
  
  //return [{value:80, height:"100", color:  "primary"}];
  return elementArrConfig;
}

export default props => {
  const classes = useStyles();
  const { currentSort, elementArr } = props;
  const sortingClass = { BubbleSort };
  const [bgColor, setBgColor] = useState("error");
  const colors = ["primary", "secondary", "info"];
  const [elementArrConfig, setElementArrConfig] = useState([]);
  //console.log(bgColor, intElementArrConfig());


  useEffect(() => {
    //alert(props.currentSort);
   // console.log(elementArrConfig, 'dd');
    //console.log(typeof BubbleSort);
    setElementArrConfig(initElementArrConfig(elementArr));
    //console.log(elementArrConfig);
    console.log('elemnetn arr');

  }, [elementArr]);

  useEffect(() => {
    
    if (currentSort) {
      //alert(currentSort);
      console.log(new sortingClass[currentSort]());
      for (let i = 0; i < elementArrConfig.length; i++) {
        setTimeout(() => {
         //setBgColor(colors[Math.floor(Math.random() * 3)]);
          elementArrConfig[i].color = colors[Math.floor(Math.random() * 3)];
          
          setElementArrConfig(previousElementArrConfig => {
            previousElementArrConfig[i].color = colors[Math.floor(Math.random() * 3)];
            console.log(previousElementArrConfig);
            return [...previousElementArrConfig];
          })
          console.log(i);
        }, 1000*i);

      }

      elementArrConfig.forEach(element => {
        
      });
    } 
  },[currentSort]);


  const run = () => {
    

  }

  return (
    <Container
      display="flex"
      style={{ height: "90%" }}
      maxWidth="lg"
      disableGutters
    >
      <button type="button" onClick={run}>run</button>
      <Box
        style={{ height: "100%" }}
        display="flex"
        flexWrap="nowrap"
        alignItems="flex-end"
        justifyContent="center"
      >
        {elementArrConfig.map((v, i) => {
          return (<Box
            height={v.height + "%"}
            key={i}
            className={classes.sortingElement}
            bgcolor={v.color + ".main"}
            textAlign="center"
          ></Box>);
        })}
      </Box>
    </Container>
  );
};
