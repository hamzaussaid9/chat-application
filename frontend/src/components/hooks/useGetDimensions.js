import React from "react";

const useGetDimensions = () => {
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    React.useEffect(()=>{
        const handleResize = () => setDimensions({width: window.innerWidth, height: window.innerHeight});
        window.addEventListener('resize', handleResize);
        return ()=> window.removeEventListener('resize', handleResize);
    },[dimensions])

  return dimensions;
}

export default useGetDimensions;