import { useState } from "react";

export default function useBeforeRender(callback) {
  const [isRun, setIsRun] = useState(false);

  if (!isRun) {
    setIsRun(true);
    return callback();
  }
}
