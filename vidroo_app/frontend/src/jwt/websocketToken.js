const websocketToken = (token) => {
  const token64 = btoa(token);
  let newtoken = "";
  for (let i = 0; i < token64.length; i++) {
    if (token64[i] === "=") continue;
    newtoken += token64[i];
  }

  return newtoken;
};

export default websocketToken;
