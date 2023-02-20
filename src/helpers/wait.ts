/**
 * Wait provided millsec
 */
const wait = async (millsec = 1000): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, millsec);
  });
};

export default wait;
