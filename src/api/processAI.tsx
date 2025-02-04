const processAI = async (text: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Sorry, something went wrong");
  }
};

const resetAI = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("Sorry, something went wrong");
  }
};

export { processAI, resetAI };
