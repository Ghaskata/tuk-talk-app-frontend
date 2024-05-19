import React from "react";
import { cn } from "../../lib/utils";
import { TextField } from "@mui/material";

// const Input = React.forwardRef(
//   ({ className, type, suffixIcon, suffixIconClass, prefixIcon, prefixIconClass, error, helpertext, ...props }, ref) => {
//     return (
//       <div className="form-control w-full">
//         <div className="relative overflow-hidden">
//           {prefixIcon && <span className={cn('absolute top-1/2 -translate-y-1/2 start-4 sm:start-6', prefixIconClass)}>{prefixIcon}</span>}
//           <input
//             type={"text"}
//             className={cn(
//               `w-full text-white py-3 sm:py-4 ${prefixIcon ? "ps-12 sm:ps-16" : "ps-4 sm:ps-6"} ${suffixIcon ? "pe-12 sm:pe-16" : "pe-4 sm:pe-6"} outline-none rounded-sm bg-transparent border border-gray-800/30 text-sm sm:text-base font-300 placeholder:text-base placeholder:text-white/70 disabled:cursor-not-allowed disabled:opacity-50 `,
//               className
//             )}
//             ref={ref}
//             {...props}
//           />
//           {suffixIcon && <span className={cn('absolute top-1/2 -translate-y-1/2 end-4 sm:end-6', suffixIconClass)}>{suffixIcon}</span>}
//         </div>
//         <p className="text-sm text-red mt-1 text-start">{helpertext}</p>
//       </div>
//     );
//   }
// );

// Input.displayName = "Input";

const Input = React.forwardRef(
  ({ name, placehlder, label, error, helpertext, ...props }) => {
    return (
      <TextField
        fullWidth
        error={!!error}
        name={name}
        label={label && label}
        placeholder={placehlder}
        // variant="standard"
        helperText={helpertext}
        {...props}
      />
    );
  }
);

export { Input };
