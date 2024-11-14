"use client";

// import { m } from "framer-motion";
// import { Box, BoxProps, Link } from "@mui/material";
// import { alpha } from "@mui/material/styles";

// // ----------------------------------------------------------------------

// export default function SplashScreen({ sx, ...other }: BoxProps) {
//   return (
//     <Box
//       sx={{
//         right: 0,
//         width: 1,
//         bottom: 0,
//         height: 1,
//         // zIndex: 9998,
//         display: "flex",
//         position: "absolute",
//         alignItems: "center",
//         justifyContent: "center",
//         // bgcolor: "background.active",
//         bgcolor: "background.paper",
//         ...sx,
//       }}
//       {...other}
//     >
//       <m.div
//         animate={{
//           scale: [1, 0.9, 0.9, 1, 1],
//           opacity: [1, 0.48, 0.48, 1, 1],
//           borderRadius: ["25%", "25%", "50%", "50%", "25%"],
//         }}
//         transition={{
//           duration: 2,
//           ease: "easeInOut",
//           repeatDelay: 1,
//           repeat: Infinity,
//         }}
//       >
//         <Link href="/" sx={{ display: "contents" }}>
//           <Box
//             component="div"
//             sx={{
//               width: { xs: 30, md: 40 },
//               height: { xs: 30, md: 40 },
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               ...sx,
//             }}
//             {...other}
//           >
//             <img
//               src="/Eventy-logo-03.png"
//               width="100%"
//               height="100%"
//               alt="Eventy Logo"
//             />
//           </Box>
//         </Link>
//       </m.div>

//       {/* Outer circle animation */}
//       <Box
//         component={m.div}
//         animate={{
//           scale: [1.6, 1, 1, 1.6, 1.6],
//           rotate: [270, 0, 0, 270, 270],
//           opacity: [0.25, 1, 1, 1, 0.25],
//           borderRadius: ["25%", "25%", "50%", "50%", "25%"],
//         }}
//         transition={{
//           ease: "linear",
//           duration: 3.2,
//           repeat: Infinity,
//         }}
//         sx={{
//           width: 100,
//           height: 100,
//           position: "absolute",
//           border: (theme) =>
//             `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       />

//       {/* Inner circle animation */}
//       <Box
//         component={m.div}
//         animate={{
//           scale: [1, 1.2, 1.2, 1, 1],
//           rotate: [0, 270, 270, 0, 0],
//           opacity: [1, 0.25, 0.25, 0.25, 1],
//           borderRadius: ["25%", "25%", "50%", "50%", "25%"],
//         }}
//         transition={{
//           ease: "linear",
//           duration: 3.2,
//           repeat: Infinity,
//         }}
//         sx={{
//           width: 120,
//           height: 120,
//           position: "absolute",
//           border: (theme) =>
//             `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       />
//     </Box>
//   );
// }

import { useState, useEffect } from "react";
import Box, { BoxProps } from "@mui/material/Box";

// ----------------------------------------------------------------------

export default function SplashScreen({ sx, ...other }: BoxProps) {
  const [mounted, setMounted] = useState(false);

  // Set mounted state to true after the component has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering the splash screen while it's mounting
  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        right: 0,
        width: 1,
        bottom: 0,
        height: 1,
        zIndex: 9998,
        display: "flex",
        position: "absolute", // Position must be absolute to animate properly
        alignItems: "center",
        justifyContent: "center",
        // bgcolor: "background.default", // Set to any color you want
        bgcolor: "#141A21", // Set to any color you want
        ...sx,
      }}
      {...other}
    >
      <Box
        component="div"
        sx={{
          width: { xs: 30, md: 68 },
          height: { xs: 30, md: 68 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="splash-logo" // Apply the animation class for the logo
      >
        {/* Add your Logo or image */}
        <img src="/Eventy-logo-03.png" alt="Logo" />
      </Box>
      <Box component="div" className="splash-circle-one" />{" "}
      {/* First rotating circle */}
      <Box component="div" className="splash-circle-two" />{" "}
      {/* Second pulse circle */}
    </Box>
  );
}
